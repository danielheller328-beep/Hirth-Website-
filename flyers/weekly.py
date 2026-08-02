#!/usr/bin/env python3
"""
Record the week's rotation and keep the built pages current.

The page works out its own rotation from the date in the browser, so nothing
has to run for new posts to appear on a Monday. This script exists so there is
also a written record in the repository: which topics went out, in which art
direction, in which week. It writes flyers/week.json and prepends a row to
flyers/ARCHIVE.md.

The rotation maths here mirrors 60-app.js exactly. If you change the pick in
one place, change it in the other.

    python3 flyers/weekly.py            # this week
    python3 flyers/weekly.py --week 118 # a specific week index
"""

import argparse
import datetime as dt
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"

EPOCH = dt.date(2024, 1, 1)          # a Monday — same anchor as the page
WEEK_CONTENT_N = 3     # three topics a week: two carousels, three stories
AD_ORDER = ["atelier", "midnight", "blueprint", "signal", "dossier", "nocturne"]
AD_NAMES = {"atelier": "Atelier", "midnight": "Midnight", "blueprint": "Blueprint",
            "signal": "Signal", "dossier": "Dossier", "nocturne": "Nocturne"}


def monday_of(d: dt.date) -> dt.date:
    return d - dt.timedelta(days=d.weekday())


def week_index(d: dt.date) -> int:
    return (monday_of(d) - EPOCH).days // 7


def read_content():
    """Pull the post ids and topics straight out of the bank."""
    text = (SRC / "50-content.js").read_text(encoding="utf-8")
    block = text.split("const CONTENT = [", 1)[1].split("\n];", 1)[0]
    posts = re.findall(r"^\{ id: '([^']+)', topic: '([^']+)'", block, re.M)
    if not posts:
        sys.exit("could not read the content bank — has the entry format changed?")
    return posts


def read_listings():
    text = (SRC / "50-content.js").read_text(encoding="utf-8")
    block = text.split("const LISTINGS = [", 1)[1].split("\n];", 1)[0]
    return re.findall(r"^\{ id: '([^']+)',.*?title: '([^']+)'", block, re.M | re.S)


def read_linkedin():
    text = (SRC / "50-content.js").read_text(encoding="utf-8")
    block = text.split("const LINKEDIN = [", 1)[1].split("\n];", 1)[0]
    return re.findall(r"^\{ topic: '([^']+)', title: '([^']+)'", block, re.M)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--week", type=int, default=None,
                    help="week index to record (default: the current one)")
    args = ap.parse_args()

    today = dt.date.today()
    wn = args.week if args.week is not None else week_index(today)
    monday = EPOCH + dt.timedelta(weeks=wn)
    sunday = monday + dt.timedelta(days=6)

    content, listings, linkedin = read_content(), read_listings(), read_linkedin()

    picked = []
    for i in range(WEEK_CONTENT_N):
        pid, topic = content[(wn * WEEK_CONTENT_N + i) % len(content)]
        ad = AD_ORDER[(wn * 7 + i) % len(AD_ORDER)]
        picked.append({"id": pid, "topic": topic, "art_direction": AD_NAMES[ad]})

    li = []
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for i in range(7):
        topic, title = linkedin[(wn * 7 + i) % len(linkedin)]
        li.append({"day": days[i], "topic": topic, "title": title})

    payload = {
        "week": wn,
        "starts": monday.isoformat(),
        "ends": sunday.isoformat(),
        "recorded": today.isoformat(),
        "carousels": picked,
        "listings": [{"id": i, "title": t} for i, t in listings],
        "linkedin": li,
        "bank": {"content": len(content), "linkedin": len(linkedin), "listings": len(listings)},
    }
    (ROOT / "week.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")

    # archive — newest first, one block per week, never rewritten
    archive = ROOT / "ARCHIVE.md"
    header = "# Weekly rotation archive\n\nWhat the kit put out, week by week. Written by `flyers/weekly.py`.\n"
    existing = archive.read_text(encoding="utf-8") if archive.exists() else header
    marker = "## Week %d " % wn
    if marker not in existing:
        rows = "\n".join(
            "| %s | %s | %s |" % (p["id"], p["topic"], p["art_direction"]) for p in picked
        )
        entry = (
            "\n## Week %d · %s – %s\n\n"
            "| Post | Topic | Art direction |\n|---|---|---|\n%s\n\n"
            "LinkedIn: %s\n"
            % (wn, monday.strftime("%d %b %Y"), sunday.strftime("%d %b %Y"), rows,
               ", ".join(x["title"] for x in li))
        )
        body = existing[len(header):] if existing.startswith(header) else existing
        archive.write_text(header + entry + body, encoding="utf-8")
        print("archived week %d" % wn)
    else:
        print("week %d already archived" % wn)

    print("week %d · %s – %s" % (wn, monday, sunday))
    for p in picked:
        print("  %-10s %-16s %s" % (p["id"], p["topic"], p["art_direction"]))


if __name__ == "__main__":
    main()
