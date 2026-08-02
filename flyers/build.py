#!/usr/bin/env python3
"""
Assemble the Hirth weekly social kit into self-contained pages.

Two outputs, same parts:

  flyers/index.html     full standalone page, for the website
  flyers/artifact.html  body-only fragment, for publishing as a Claude Artifact
                        (the artifact host supplies doctype/head/body itself)

Everything is inlined — fonts, logos, photographs — so the page works with no
network at all. Run it after editing anything under flyers/src or flyers/assets:

    python3 flyers/build.py
"""

import base64
import mimetypes
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
ASSETS = ROOT / "assets"

# key in ASSET_SRC -> file on disk
ASSET_MAP = {
    "logoColor": "color.png",
    "logoWhite": "white.png",
    "dh": "dh.jpg",       # head-and-shoulders, for circular plates and rosters
    "dhero": "dhero.jpg",  # the full portrait, for the poster's tall plates
    "ar": "ar.png",
    "ed": "ed.png",
    # people yes, buildings no
}

FONT_FACES = [
    ("Fraunces", "100 900", "normal", "fraunces-var.woff2"),
    ("Space Grotesk", "400 500", "normal", "space-grotesk-400.woff2"),
    ("Space Grotesk", "600 700", "normal", "space-grotesk-600.woff2"),
]

# concatenated in this order; the numeric prefixes are the dependency order
SCRIPTS = ["10-lib.js", "15-graphics.js", "20-brand.js", "30-slides.js", "40-listings.js", "45-poster.js",
           "50-content.js", "60-app.js"]


def data_uri(path: pathlib.Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix == ".woff2":
        mime = "font/woff2"
    return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode("ascii"))


def build_fonts() -> str:
    out = []
    for family, weight, style, filename in FONT_FACES:
        p = ASSETS / filename
        if not p.exists():
            sys.exit("missing font: %s" % p)
        out.append(
            "@font-face{font-family:'%s';font-style:%s;font-weight:%s;font-display:swap;"
            "src:url(%s) format('woff2')}" % (family, style, weight, data_uri(p))
        )
    return "\n".join(out)


def build_assets() -> str:
    pairs = []
    for key, filename in ASSET_MAP.items():
        p = ASSETS / filename
        if not p.exists():
            sys.exit("missing asset: %s" % p)
        pairs.append('%s:"%s"' % (key, data_uri(p)))
    return "const ASSET_SRC={%s};" % ",".join(pairs)


def build_script() -> str:
    parts = []
    for name in SCRIPTS:
        p = SRC / name
        if not p.exists():
            sys.exit("missing source: %s" % p)
        parts.append("/* ---- %s ---- */\n%s" % (name, p.read_text(encoding="utf-8")))
    return "\n\n".join(parts)


def main() -> None:
    shell = (SRC / "page.html").read_text(encoding="utf-8")
    css = (SRC / "page.css").read_text(encoding="utf-8")

    logo = data_uri(ASSETS / "white.png")

    body = shell
    body = body.replace("/*FONTS*/", build_fonts())
    body = body.replace("/*CSS*/", css)
    body = body.replace("/*LOGO*/", logo)
    body = body.replace("/*ASSETS*/", build_assets())
    body = body.replace("/*APP*/", build_script())

    for token in ("/*FONTS*/", "/*CSS*/", "/*LOGO*/", "/*ASSETS*/", "/*APP*/"):
        if token in body:
            sys.exit("placeholder never filled: %s" % token)

    (ROOT / "artifact.html").write_text(body, encoding="utf-8")

    # the standalone page needs the document furniture the artifact host adds,
    # and its <title> belongs in the head rather than repeated in the body
    title = re.search(r"<title>(.*?)</title>", body, re.S)
    body_only = re.sub(r"^\s*<title>.*?</title>\s*", "", body, count=1, flags=re.S)
    standalone = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        "<meta charset=\"utf-8\">\n"
        "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n"
        "<meta name=\"robots\" content=\"noindex\">\n"
        "<meta name=\"description\" content=\"The Hirth Group — the week's social posts, "
        "designed and captioned. Rebuilds itself every Monday.\">\n"
        + ("<title>%s</title>\n" % title.group(1) if title else "")
        + "</head>\n<body>\n" + body_only + "\n</body>\n</html>\n"
    )
    (ROOT / "index.html").write_text(standalone, encoding="utf-8")

    kb = lambda p: "%.0f KB" % (p.stat().st_size / 1024)
    print("built flyers/artifact.html  %s" % kb(ROOT / "artifact.html"))
    print("built flyers/index.html     %s" % kb(ROOT / "index.html"))


if __name__ == "__main__":
    main()
