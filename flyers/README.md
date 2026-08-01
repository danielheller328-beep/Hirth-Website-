# The Hirth Group — weekly social kit

A self-contained page that produces the week's posts. Three sections:

- **Posts** — five content carousels of four frames each, plus the house
  poster. 1080 × 1080.
- **Stories** — 1080 × 1920. One for every post in the week, plus the poster
  and the team.
- **LinkedIn** — seven written posts, one a day.

Every frame is drawn on canvas at export resolution — what you see on screen is
the pixel data that lands in the PNG.

**Open `flyers/index.html`.** Nothing to install, nothing to run.

---

## It changes itself every Monday

The rotation is computed from the date in the browser, not published from
anywhere. Open the page next Monday and it has already changed:

- **Different posts.** Five topics are drawn from a bank of sixteen. The step
  is coprime with the bank size, so all sixteen go out before any repeat —
  about four months of unique weeks.
- **Different look.** Each post is assigned one of six art directions, keyed to
  the week number. A topic that does come round again comes round in a
  different visual world, so it does not read as a repeat.
- **Different LinkedIn.** Seven pieces a week from a bank of twenty-one.

Nothing has to run for this to happen. The GitHub Action is only bookkeeping —
see *Automation* below.

Preview any week with `?week=N`, e.g. `index.html?week=140`. The week number is
shown in the page header.

---

## The six art directions

The complaint that a set of posts "looks templated" is really a complaint that
one layout got recoloured seven times. So the brand is expressed as six
complete worlds instead. Each has its own paper, palette, ornament, header,
footer **and its own four layouts** — twenty-four distinct compositions, not
one composition with six palettes.

| | Feel | Ground | Accent | Headline |
|---|---|---|---|---|
| **Atelier** | printed prospectus | uncoated cream | deep blue / bronze | Fraunces |
| **Midnight** | quiet, low-anchored | near-black, one bloom | cold blue | Fraunces |
| **Blueprint** | drawing set, title block | prussian + cyan grid | cyan | Fraunces |
| **Signal** | Swiss, 12-column grid | white | flat blue | Space Grotesk |
| **Dossier** | pulled file, stamped | manila, punch holes | oxide red | Fraunces |
| **Nocturne** | photography-led | duotone / deep teal | gold | Fraunces |

### The imagery is drawn, not sourced

There is no stock photography and there never will be — the page has to work
offline and every pixel has to be the firm's own. So `src/15-graphics.js` draws
it: guilloché rosettes off the security-printing tradition (Atelier, Dossier),
isometric massing the way a developer sketches a block (Blueprint), contour
fields and volumetric light (Midnight), halftone screens (Signal), engraved
horizons and gold foil (Nocturne). All parametric and seeded from the post id,
so a post's picture belongs to that post and is identical on every reload.

### Headlines shift voice mid-sentence

Wrap a phrase in `*asterisks*` in a `title` or `cta` and it is set italic and in
the accent, with the line breaker measuring each run in its own font. A headline
set in one weight of one face is a headline a machine set; the clause that
carries the argument should look like it does.

### The poster

A seventh art direction, **Press**, carries the house piece: Daniel set large
and bleeding off a corner, one statement in Fraunces at poster scale, the mark
top-left, the contact line along the foot. Six statements rotate, one a week,
so it changes with everything else. It appears in both sections — 1:1 in Posts,
9:16 in Stories.

**The photograph runs as shot** — no screen, no duotone, no filter. The frame
masks it and crops it, and that is the whole treatment.

Two things follow from the source file, which is 240 x 240 and already masked
to a circle:

- **Plates are capped at about 2x the source.** An unedited photograph blown up
  past that looks soft. `plateSize()` reads the cap off the file, so dropping a
  larger headshot into `assets/dh.png` makes every plate in every cut grow on
  its own, with no other change.
- **The mount is circular in every cut.** The source has a circular alpha mask,
  so a rectangular or arched plate shows the cut-out edge and reads as a sticker
  pasted on. A proper rectangular headshot on a plain background would unlock
  full-bleed treatments — worth shooting if it comes up.

Four cuts rotate independently of the statement, so the portrait is not in the
same place two weeks running: **Rondel** (large, bleeding off the bottom-right),
**Card** (mounted on a printed card that carries the contact details),
**Inverse** (cream stock, dark type, photograph left) and **Medallion**
(smaller, ringed, the words taking the frame). Twelve weeks before a statement
meets the same cut twice.

New statements go in `POSTERS` in `src/45-poster.js`: `kicker`, `line`
(`*emphasis*` allowed), `cap`, `tags`.

### Listings

Listing records and their frames (photographic hero, drawn site plan) are still
in the source, but no longer have their own section. To bring them back, add a
`listings` entry to `TABS` in `src/60-app.js`.

---

## Adding to it

Everything lives in `flyers/src/`. After any edit, run:

```bash
python3 flyers/build.py
```

**A new content post** — add an entry to `CONTENT` in `src/50-content.js`. It
picks up an art direction automatically and enters the rotation on the next
week that reaches it. The fields:

| Field | What it drives |
|---|---|
| `topic`, `kicker` | the labels in the header and above the headline |
| `title`, `sub` | frame 1 — the statement (`*emphasis*` allowed) and its deck |
| `pointsTitle`, `points` | frame 2 — six `[lead-in, rest]` pairs |
| `figure` *or* `figurePair` | frame 3 — one number, or two side by side |
| `figureSub`, `figureLabel`, `figureKicker` | the labels around it |
| `bars` | optional bar chart, `[{k, v, t, hi}]` |
| `pull` | the line under the number |
| `ctaKicker`, `cta` | frame 4 |
| `stats` | the three figures used on covers and in the page UI |
| `cap`, `tags` | the caption and the first-comment hashtags |

**A new listing** — add to `LISTINGS` in the same file. If it has a
photograph, drop the file in `flyers/assets/` and register it in `ASSET_MAP`
in `build.py`, then reference the key as `photo`.

**A new LinkedIn piece** — add to `LINKEDIN`. Twenty-one entries means three
weeks before a repeat; more entries push that out.

**House details** (phone, licence, team) live in `HOUSE` and `TEAM` at the top
of `src/20-brand.js`. Change them once and every frame follows.

---

## The files

```
flyers/
  index.html      built — the standalone page (open this)
  artifact.html   built — same page as a body-only fragment, for publishing
  build.py        inlines fonts, logos and photographs into both
  weekly.py       records the rotation to week.json and ARCHIVE.md
  week.json       what went out this week
  ARCHIVE.md      the running record
  assets/         fonts, logo artwork, headshots, property photography
  src/
    10-lib.js     canvas typesetting, mixed-style headlines, texture, geometry
    15-graphics.js the drawn imagery — guilloché, massing, contours, halftone
    20-brand.js   house details, the mark, the six art directions
    30-slides.js  the twenty-four compositions
    40-listings.js listing frames, the site plan, the stories
    45-poster.js  the Press poster, its four cuts and the portrait mount
    50-content.js the bank
    60-app.js     the week's rotation and the page around it
```

Two things in `10-lib.js` do most of the work of making this not look
generated:

- **`breakLines`** breaks display type by minimum raggedness rather than
  greedily, and refuses to leave one short word alone on the last line. Greedy
  wrapping is the single clearest tell in machine-set headlines.
- **`grain` / `paper`** put tooth on every square inch. Flat canvas gradients
  read as digital; print has texture.
- **`fitRich` / `drawRich`** break a mixed roman-and-italic headline as one
  paragraph, measuring each run in its own font rather than approximating.

One thing worth knowing if you touch the engine: **canvas does not trigger a
font download.** `document.fonts.ready` only settles faces the DOM has already
asked for, so `60-app.js` explicitly loads every weight before painting.
Remove that and the whole set silently ships in Times.

---

## Automation

`.github/workflows/weekly-flyers.yml` runs Mondays at 13:07 UTC, and on any
push that touches `flyers/src`, `flyers/assets` or the scripts. It rebuilds the
pages and writes the week's rotation to `week.json` and `ARCHIVE.md`, then
commits only if something actually changed.

To be clear about what depends on what: **the weekly rotation does not depend
on this job.** The page works the week out for itself. If the Action is
disabled, paused for repository inactivity, or fails, the posts still change on
Monday. The job exists so the built pages stay in step with the source and so
there is a written record of what went out.

`publish-latest-html.yml` — the workflow that promotes an uploaded HTML file to
the live site — explicitly skips `flyers/`. Without that guard it would mistake
this page for a new website upload and copy it over the root `index.html`.
