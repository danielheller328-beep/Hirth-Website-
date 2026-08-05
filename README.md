# The Hirth Group — hirthgroup.com

Static site. No build step: `index.html` + `styles.css` + `tokens/` + `assets/`.

## Deploy (GitHub Pages)
**`index.html` must sit at the REPO ROOT, not inside a folder.** If the repo looks
like `repo/hirthgroup-site/index.html`, Pages returns "File not found" for
hirthgroup.com — move the contents up one level so it's `repo/index.html`.

Then: Settings → Pages → Source = `Deploy from a branch`, Branch = `main`, Folder = `/ (root)`.
(If you'd rather keep the subfolder, set Folder = `/docs` and rename the folder to `docs`.)

Included for Pages:
- `.nojekyll` — required, or Pages hides `_ds_bundle.js` and the `assets/` tree
- `CNAME` — the `hirthgroup.com` custom domain
- `404.html` — forwards legacy Wix deep links to the right section

Any other static host (Netlify, Vercel) serves the folder as-is.

## Structure
- `index.html` — all pages (home, listings, profile, contact) + listing data
- `styles.css`, `tokens/*.css` — design tokens and styles
- `assets/photos/closed/` — 183 closed-deal photos, auto-matched to listings by
  filename slug `<street number>-<first street word>.jpg` (e.g. `1440-manchester.jpg`).
  To add one: drop the file in and add its name to `window.CLOSED_PHOTO_FILES` in `index.html`.
- `assets/photos/sale/`, `lease/`, `leased/` — active and leased listing photos
- `assets/maps/`, `assets/fonts/`, `assets/logo-*.png`

## TODO
- `assets/flyers/` is not in this repo yet. Five lease listings link to PDFs:
  `3618-tweedy.pdf`, `2001-hawkins.pdf`, `3311-motor.pdf`, `727-labrea.pdf`,
  `1058-gardena.pdf`. Drop them in `assets/flyers/` to make the flyer viewer work.
