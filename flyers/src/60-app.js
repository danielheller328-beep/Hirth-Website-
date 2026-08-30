/* ══════════════════════════════════════════════════════════════════════════
   60-app.js — the run, and the page around it

   The rotation is computed from the date, not stored. Every other Monday the
   page draws a different set: different topics from the bank, and a different
   art direction assigned to each one. Nobody has to publish anything for that
   to happen — open it after the changeover and it has already changed.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── the run ──────────────────────────────────────────────────────────────
   A set lasts a fortnight. The index is computed from the date rather than
   stored, so the change happens on its own: the Monday a run begins, every
   piece on the page is new, and it then holds for fourteen days — long
   enough to actually publish seven pieces instead of racing the next batch.
   ─────────────────────────────────────────────────────────────────────── */
const RUN_WEEKS = 2;
const EPOCH = Date.UTC(2024, 0, 1);            /* a Monday */
function mondayOf(d) {
  const u = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = new Date(u).getUTCDay();          /* 0 Sun … 6 Sat */
  return u - ((dow + 6) % 7) * 864e5;
}
function weekIndex(d) {
  return Math.floor((mondayOf(d || new Date()) - EPOCH) / (RUN_WEEKS * 7 * 864e5));
}
/* the Monday the run containing this date began */
function runStart(d) {
  return EPOCH + weekIndex(d) * RUN_WEEKS * 7 * 864e5;
}
function weekLabel(d) {
  const a = new Date(runStart(d)), b = new Date(runStart(d) + (RUN_WEEKS * 7 - 1) * 864e5);
  const f = (x, withYear) => x.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: withYear ? 'numeric' : undefined, timeZone: 'UTC'
  });
  return f(a) + ' – ' + f(b, true);
}
function nextMondayLabel() {
  const m = runStart(new Date()) + RUN_WEEKS * 7 * 864e5;
  return new Date(m).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/* ?week=N previews any week — used to check next Monday's set before it lands.
   ?max=N limits how many carousels are painted, for a fast look on a slow machine. */
const QS = new URLSearchParams(location.search);
const WEEK_N = QS.has('week') && !isNaN(parseInt(QS.get('week'), 10))
  ? parseInt(QS.get('week'), 10) : weekIndex();
const MAXPOSTS = QS.has('max') ? Math.max(1, parseInt(QS.get('max'), 10) || 1) : Infinity;

/* seven written posts across fourteen days — every other day, which is the
   cadence that actually gets kept, and it names the real date rather than a
   weekday that no longer says which of the two weeks it means */
const LI_OFFSETS = [0, 2, 4, 7, 9, 11, 13];
function liDayLabel(i) {
  const d = new Date(runStart(new Date()) + LI_OFFSETS[i] * 864e5);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/* ── rotation ─────────────────────────────────────────────────────────────
   Seven pieces a run, and seven is the whole fortnight: three posts and four
   stories. Six topics carry it — two run as carousels, four run as stories,
   and no topic ever runs as both in the same set. Publishing the same
   argument twice, once square and once tall, was the thing that made the set
   look padded.

   How far the window walks each run matters more than it looks. Step seven
   posts into a bank of twenty-one and the same seven travel together forever,
   because seven divides twenty-one — three distinct weeks, then a loop. The
   step has to share no factor with the bank, so stepFor() walks up from the
   number wanted until it finds one that does not, and the whole bank is
   turned over before any grouping comes back.

   The art direction is assigned from the week number plus the slot, so a
   topic that does come round again comes round in a different world.
   ─────────────────────────────────────────────────────────────────────── */
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
function stepFor(len, want) {
  let s = Math.max(1, want % len || len);
  for (let i = 0; i < len; i++, s = s % len + 1) if (gcd(s, len) === 1) return s;
  return 1;
}

const WEEK_CONTENT_N = 6;               /* 2 carousels + 4 stories */
const WEEK_LI_N = 7;                    /* enough to space across a fortnight */

function pickContent() {
  const step = stepFor(CONTENT.length, WEEK_CONTENT_N);
  const out = [];
  for (let i = 0; i < WEEK_CONTENT_N; i++) {
    const p = CONTENT[(WEEK_N * step + i) % CONTENT.length];
    out.push(Object.assign({}, p, { ad: AD[AD_ORDER[(WEEK_N * 7 + i) % AD_ORDER.length]] }));
  }
  return out;
}
/* Listings are kept in the bank but are not surfaced. */
function pickLinkedIn() {
  const step = stepFor(LINKEDIN.length, WEEK_LI_N);
  const out = [];
  for (let i = 0; i < WEEK_LI_N; i++) {
    const p = LINKEDIN[(WEEK_N * step + i) % LINKEDIN.length];
    out.push(Object.assign({}, p, { day: liDayLabel(i), slot: i + 1 }));
  }
  return out;
}

/* ── a quote slide, in whichever world the post is wearing ─────────────── */
function quoteSlide(c, ad, P, S) {
  const B = stage(c, ad, S, { label: 'Client Review' });
  const cx = S.w / 2;
  stars(c, cx, B.y + 46, 21, 56, ad.accent);
  const q = fitBlock(c, '“' + P.quote + '”', { w: B.w * .92, h: B.h * .56 }, {
    weight: 500, family: SERIF, style: 'italic', max: 50, min: 28, leading: 1.38, maxLines: 9
  });
  let y = B.y + 132 + Math.max(0, (B.h * .56 - q.height) / 2);
  drawBlock(c, q, cx, y, { fill: ad.ink, align: 'center' });
  y += q.height + 44;
  rule(c, cx - 40, y, 80, ad.accent, 2);
  y += 52;
  text(c, P.by, cx, y, { font: FS(600, 40), fill: ad.ink, align: 'center', base: 'middle' });
  caps(c, P.byRole, cx, y + 42, { size: 14, fill: ad.muted, align: 'center', track: 3 });
}

/* ── painting ─────────────────────────────────────────────────────────── */
function canvasEl(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h; c.className = 'cv';
  return c;
}
function paint(fn, w, h) {
  const cv = canvasEl(w, h);
  fn(cv.getContext('2d'));
  return cv;
}
function frameMeta(P, i, total, w, h) {
  return {
    w, h, M: M0, seed: hashStr((P.id || P.addr || 'x') + ':' + i) % 100000,
    rnd: rng(hashStr((P.id || P.addr || 'x') + ':' + i + ':' + WEEK_N)),
    no: String(i + 1).padStart(2, '0'), total: String(total).padStart(2, '0'),
    sheetNo: String(i + 1).padStart(2, '0')
  };
}
/* ── a post is three frames ───────────────────────────────────────────────
   The cover states it, the middle argues it, the last one asks for the call.

   The middle is where a set stops looking designed and starts looking
   generated, because for a long time it was the same six ruled rows of
   bolded lead-in on every post. Six shapes now carry it — the ruled rows,
   the figure, a single sentence set huge, three numbered points instead of
   six, a reading column with margin notes, and the two sides weighed
   against each other. A post is handed one by its own id, so a topic keeps
   its shape when it comes round again but its neighbour never shares it.
   ─────────────────────────────────────────────────────────────────────── */
const SLIDES_PER_POST = 3;
function midFrame(P, L, bump) {
  if (P.review) return quoteSlide;
  /* weigh needs a genuine pair of numbers; it is not offered to a post that
     has none rather than being made to invent one */
  const bag = [L.points, L.figure, statementSlide, sequenceSlide, marginSlide];
  if (P.figurePair && P.figurePair.length === 2) bag.push(weighSlide);
  return bag[(hashStr(P.id + ':mid') + (bump || 0)) % bag.length];
}
function contentSlides(P) {
  const ad = P.ad, L = LAYOUT[ad.id], total = SLIDES_PER_POST;
  const mid = P.mid || midFrame(P, L);
  return [
    paint(c => L.cover(c, ad, P, frameMeta(P, 0, total, FW, FH)), FW, FH),
    paint(c => mid(c, ad, P, frameMeta(P, 1, total, FW, FH)), FW, FH),
    paint(c => L.ask(c, ad, P, frameMeta(P, 2, total, FW, FH)), FW, FH)
  ];
}

/* ── the week, assembled ──────────────────────────────────────────────── */
const WEEK = {
  content: pickContent(),
  linkedin: pickLinkedIn()
};
/* ── the flyers ───────────────────────────────────────────────────────────
   These are the ones that land: his face on the sheet, one sentence set as
   large as it will go, the signature block along the foot. So they are the
   bulk of the run rather than a single house piece at the top of it — four
   flyers, three square for the feed and one tall for a story.

   Each takes a different statement and a different cut, so four flyers in a
   run are four different posters and not one poster four times. Twelve
   statements against seven cuts: a statement is eighty-four runs away from
   meeting the same cut a second time.
   ─────────────────────────────────────────────────────────────────────── */
const FLYERS_PER_RUN = 4;
WEEK.flyers = (function () {
  const step = stepFor(POSTERS.length, FLYERS_PER_RUN);
  const out = [];
  for (let i = 0; i < FLYERS_PER_RUN; i++) {
    const P = POSTERS[(WEEK_N * step + i) % POSTERS.length];
    /* the cuts are walked apart inside the run so no two flyers in the same
       set arrive in the same treatment */
    const cutIndex = WEEK_N * FLYERS_PER_RUN + i * 2;
    const cut = posterCut(cutIndex);
    out.push(Object.assign({}, P, {
      poster: true, who: 'dh',
      cutIndex: cutIndex,
      cutName: cut.name,
      tall: i === FLYERS_PER_RUN - 1,        /* the last one runs as a story */
      title: stripRich(P.line),
      adName: 'Press · ' + cut.name,
      stats: [[HOUSE.deals, 'Transactions'], [HOUSE.volume, 'Sales Volume'], ['LA', 'Market']]
    }));
  }
  return out;
})();
WEEK.poster = WEEK.flyers[0];

/* one carousel and two topic stories carry the written side of the run */
WEEK.carousels = (function () {
  const out = WEEK.content.slice(0, 1);
  /* two posts side by side must not arrive in the same container, however the
     hash falls — the second is walked on until it differs. Compared by name,
     not by identity: each art direction owns its own points and figure, so
     two different functions can still be the same shape. */
  out.forEach((P, i) => {
    let bump = 0, fn = midFrame(P, LAYOUT[P.ad.id]);
    while (i && out.slice(0, i).some(q => q.mid.name === fn.name) && bump < 8)
      fn = midFrame(P, LAYOUT[P.ad.id], ++bump);
    P.mid = fn;
  });
  return out;
})();

WEEK.stories = (function () {
  const out = WEEK.content.slice(1, 3).map((P, i) => ({
    id: 'st-' + P.id, title: stripRich(P.title), ad: P.ad, story: true,
    kind: P.topic, cap: P.cap, tags: P.tags, stats: P.stats,
    draw: c => (P.review ? storyReview(c, P.ad, P, frameMeta(P, 9, 1, SW, SH))
      : i % 2 ? storyFigure(c, P.ad, P, frameMeta(P, 9, 1, SW, SH))
        : storyStatement(c, P.ad, P, frameMeta(P, 9, 1, SW, SH)))
  }));

  /* every third run the last topic story gives way to the house piece */
  if (WEEK_N % 3 === 0 && out.length > 1) {
    const teamAd = AD[AD_ORDER[(WEEK_N * 3 + 1) % AD_ORDER.length]];
    out[out.length - 1] = {
      id: 'st-team', title: 'The Team', ad: teamAd, story: true, kind: 'The House',
      stats: [[HOUSE.volume, 'Sales Volume'], [HOUSE.deals, 'Transactions'], ['LA', 'Market']],
      draw: c => storyTeam(c, teamAd, frameMeta({ id: 'team' }, 0, 1, SW, SH)),
      cap: `197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

We are not the loudest team in the room. We are the one that finds the deal everyone else walked past — and gets it closed. Valuation, disposition and 1031 guidance, start to finish.

310.300.2838 · HirthGroup.com`,
      tags: '#CommercialRealEstate #CRE #RealEstateInvesting #LosAngelesRealEstate #LARealEstate #CREBroker #InvestmentProperty #1031Exchange #CommercialProperty #DealFlow #ValueAdd #MultiTenant #HirthGroup #KWCommercial #NNN #CREDeals'
    };
  }
  return out;
})();

/* ══ page ═════════════════════════════════════════════════════════════════ */
const esc = s => String(s == null ? '' : s).replace(/&(?![a-z]+;)/g, '&amp;').replace(/</g, '&lt;');
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 46);

/* ── downloading ──────────────────────────────────────────────────────────
   Every file here is a data: URL, not a blob: URL, and that is the whole
   fix.

   This page is normally read inside a frame with a strict content policy on
   it. Such a policy lists the URL schemes the page may load things from, and
   `data:` is on that list — it has to be, because the fonts and the logo in
   this very page are data: URLs and they arrive fine. `blob:` is a different
   scheme and is routinely not on the list. When it is missing, a blob image
   never loads and a blob download never starts, and neither failure says
   anything: no error, no console, nothing. Which is exactly what a download
   button that does nothing looks like.

   canvas.toDataURL hands back the PNG as a data: URL directly. It is bigger
   on the wire than a blob and it is synchronous, but it loads under the
   policy, it saves under the policy, and it needs no object URL to be
   created, held or revoked. Being synchronous is a second benefit: the
   anchor is armed in the same tick it is painted, so there is never a moment
   where the file exists but the link does not.
   ─────────────────────────────────────────────────────────────────────── */
function canvasURL(cv) {
  return cv.toDataURL('image/png');
}
function textURL(t) {
  return 'data:text/plain;charset=utf-8,' + encodeURIComponent(t);
}

/* the painted canvas, handed over as an image the browser will let you save */
function swapToImage(cv, url, alt) {
  if (!cv.parentNode) return;
  const im = new Image();
  im.className = 'cv';
  im.alt = alt || '';
  im.decoding = 'async';
  im.onload = () => { if (cv.parentNode) cv.parentNode.replaceChild(im, cv); };
  im.src = url;
}

/* ── getting a file out ───────────────────────────────────────────────────
   Downloading is a permission, and the frame this page is read in does not
   grant it. Nothing about the download can be written better — the browser
   refuses the category.

   But downloading is not the only way a file leaves a page. Two others need
   no permission at all, and between them they cover every device:

     · the share sheet — navigator.share with a File opens the operating
       system's own sheet, which on a phone has Save Image on it. This is
       the one that matters, because a phone is where these get posted.

     · the clipboard — an image written to the clipboard can be pasted into
       anything. This is the one that matters on a computer.

   And underneath both, the image itself: press and hold it, or right-click
   it. That has always worked and always will, because it is not a feature.

   The download link stays for the browsers that do allow it. It is now the
   third option rather than the only one.
   ─────────────────────────────────────────────────────────────────────── */

/* the PNG bytes back out of the data: URL, without a network request —
   fetch() would be simpler and is exactly what a strict policy blocks */
function dataToBlob(url) {
  const bin = atob(url.slice(url.indexOf(',') + 1));
  const a = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
  return new Blob([a], { type: 'image/png' });
}
function shotBlob(s) { return s.blob || (s.blob = dataToBlob(s.url)); }
function shotFile(s) { return new File([shotBlob(s)], s.name, { type: 'image/png' }); }

/* ── saving ───────────────────────────────────────────────────────────────
   The page is read inside a frame, and frame code is not allowed to start a
   download itself — which is why every version of a download button failed
   silently. The host provides the way through: window.claude.downloads.save
   hands the file to the viewer, who is shown the name and size and accepts
   or declines. That is the sanctioned route, and it is the one that works.

   Read this page on the website instead of in the frame and there is no
   host to ask, so it falls back to an ordinary link, which is allowed there.
   One function, both places.

   The host allows one prompt at a time and rate-limits a burst of them, so a
   three-slide post is saved one file after another. The important part is
   what "busy" means: it is the host saying not yet, not the viewer saying no.
   Treating it as a refusal is how a post that should have produced three
   files produced one. It waits and asks again, backing off each time, and
   only an actual decline stops the run.
   ─────────────────────────────────────────────────────────────────────── */
function pause(ms) { return new Promise(r => setTimeout(r, ms)); }
function hostSave() {
  return window.claude && window.claude.downloads && window.claude.downloads.save
    ? window.claude.downloads : null;
}
/* → 'saved' | 'declined' | 'busy' | 'failed' */
async function saveShot(s) {
  const host = hostSave();
  if (host) {
    try {
      await host.save({ filename: s.name, data: shotBlob(s) });
      return 'saved';
    } catch (e) {
      const c = (e && e.code) || 'unavailable';
      if (c === 'declined') return 'declined';
      if (c === 'rate_limited') return 'busy';
      if (c === 'bad_request' || c === 'too_large' || c === 'rejected_extension'
        || c === 'extension_not_enabled' || c === 'transform_error') return 'failed';
      /* unavailable / lifecycle — try the link instead */
    }
  }
  /* no host: nothing has been awaited yet on this path, so the click is
     still the user's and an ordinary link is allowed */
  const a = document.createElement('a');
  a.href = s.url; a.download = s.name; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); a.remove();
  return 'saved';
}
/* one file, waiting out a busy host rather than giving up on it */
async function saveOne(s) {
  for (let tries = 0; ; tries++) {
    const r = await saveShot(s);
    if (r !== 'busy' || tries >= 5) return r;
    await pause(700 + tries * 500);
  }
}

/* ── a whole post, in one go ──────────────────────────────────────────────
   Every save the host confirms is one file, so three slides is three
   confirmations. There is no arguing with that — the only way to make one
   action produce every slide is to stop using that route when a better one
   exists. Three do, and they are tried hardest-first:

     1 · the share sheet. navigator.share takes every file in one call and
         needs no permission at all. On a phone that is one tap and then
         Save 3 Images — all of them, at once, into the camera roll. This is
         the one that matters, because a phone is where these get posted.

     2 · one file. A .pptx carries the slides as full-bleed pages, and a
         .pptx is on the list of extensions the host accepts, which a zip
         and a PDF are not. One file is one confirmation.

     3 · ordinary links, when there is no host at all — on the website the
         browser asks once for the set and then all of them land.

   Only if none of those is available does it fall back to one at a time,
   and then it says so rather than pretending that was the plan.
   ─────────────────────────────────────────────────────────────────────── */
async function saveDeck(shots, btn, base) {
  if (shots.length < 2) return saveShots(shots, btn);

  /* 1 · every file, one share sheet, no permission — synchronous up to the
     call, so the tap is still the user's */
  if (shareShots(shots, btn, base)) return;

  const old = btn.textContent;
  const host = hostSave();

  /* 3 · no host: ordinary links, one browser prompt for the set */
  if (!host) {
    btn.disabled = true;
    for (let i = 0; i < shots.length; i++) {
      const a = document.createElement('a');
      a.href = shots[i].url; a.download = shots[i].name; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
    }
    btn.disabled = false;
    flash(btn, 'All ' + shots.length + ' saved ✓');
    return;
  }

  /* 2 · one file, one confirmation. Whether a view takes a .pptx and whether
     it takes a .docx are separate answers, so it asks for both before it
     gives up on the idea of one download. */
  for (let f = 0; f < DECK_FORMATS.length; f++) {
    btn.disabled = true;
    btn.textContent = 'Packing ' + shots.length + ' slides…';
    let deck = null;
    try { deck = await DECK_FORMATS[f].make(shots); } catch (e) { deck = null; }
    btn.disabled = false;
    btn.textContent = old;
    if (!deck) continue;

    const r = await saveOne({ name: base + '.' + DECK_FORMATS[f].ext, blob: deck });
    if (r === 'saved') { flash(btn, 'All ' + shots.length + ' saved ✓'); return; }
    if (r === 'declined') { flash(btn, 'Cancelled'); return; }
    /* refused — try the next container */
  }

  /* nothing here will carry more than one file at a time. Say so, once,
     rather than letting three prompts look like a bug. */
  const note = document.createElement('p');
  note.className = 'sheethint onefile';
  note.textContent = 'This browser only lets one file through at a time, so the '
    + shots.length + ' slides come one after another. On a phone, or on '
    + HOUSE.site + '/flyers, they all come at once.';
  if (btn.parentNode && !btn.parentNode.parentNode.querySelector('.onefile'))
    btn.parentNode.parentNode.insertBefore(note, btn.parentNode);
  await saveShots(shots, btn);
}
/* every slide, one after another. Only a decline stops it early. */
async function saveShots(shots, btn) {
  const old = btn.textContent, many = shots.length > 1;
  btn.disabled = true;
  let done = 0, verdict = 'saved';
  for (let i = 0; i < shots.length; i++) {
    if (many) btn.textContent = 'Saving ' + (i + 1) + ' of ' + shots.length + '…';
    verdict = await saveOne(shots[i]);
    if (verdict !== 'saved') break;
    done++;
    if (i < shots.length - 1) await pause(450);   /* don't trip the limiter */
  }
  btn.disabled = false;
  btn.textContent = old;
  flash(btn, verdict === 'saved' ? (many ? 'All ' + done + ' saved ✓' : 'Saved ✓')
    : done ? done + ' of ' + shots.length + ' saved'
      : verdict === 'declined' ? 'Cancelled' : 'Could not save');
}
/* synchronous, so it can be asked inside a click without spending it */
function canShareFiles(files) {
  try { return !!(navigator.canShare && navigator.share && navigator.canShare({ files })); }
  catch (e) { return false; }
}
function shareShots(shots, btn, title) {
  const files = shots.map(shotFile);
  if (!canShareFiles(files)) return false;
  navigator.share({ files, title: title || '' })
    .then(() => flash(btn, 'Shared ✓'))
    .catch(() => { });
  return true;
}
function copyImage(s, btn) {
  try {
    navigator.clipboard.write([new ClipboardItem({ 'image/png': dataToBlob(s.url) })])
      .then(() => flash(btn, 'Copied ✓'))
      .catch(() => flash(btn, 'Hold the image'));
  } catch (e) { flash(btn, 'Hold the image'); }
}

function openSheet(shots, title, cap, tags) {
  const ov = document.createElement('div');
  ov.className = 'sheet';
  const box = document.createElement('div');
  box.className = 'sheetbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Save ' + title);

  const head = document.createElement('div');
  head.className = 'sheethead';
  const h = document.createElement('strong');
  h.textContent = shots.length > 1 ? shots.length + ' slides' : 'Save this';
  const x = document.createElement('button');
  x.className = 'sheetx'; x.textContent = '✕'; x.setAttribute('aria-label', 'Close');
  head.append(h, x);
  box.appendChild(head);

  /* whether the phone route exists is decided once, here, and the wording
     underneath follows it — no instructions for a button that is not there */
  const sharing = canShareFiles(shots.map(shotFile));

  if (sharing) {
    const r0 = document.createElement('div');
    r0.className = 'row sheetsave';
    const all = document.createElement('button');
    all.className = 'primary wide';
    all.textContent = shots.length > 1
      ? '⇪ Save all ' + shots.length + ' to Photos'
      : '⇪ Save to Photos';
    all.onclick = () => shareShots(shots, all, title);
    r0.appendChild(all);
    box.appendChild(r0);
  }

  const hint = document.createElement('p');
  hint.className = 'sheethint';
  hint.textContent = sharing
    ? 'Save to Photos opens your phone’s own share sheet — choose Save Image. ' +
      'You can also press and hold any image below.'
    : 'Press and hold an image to save it, or right-click it and choose Save Image As. ' +
      'Copy image puts it on the clipboard to paste straight into a post. Download works ' +
      'where the browser allows it.';
  box.appendChild(hint);

  shots.forEach((s, k) => {
    const fig = document.createElement('figure');
    fig.className = 'sheetfig';
    const im = new Image();
    im.src = s.url; im.alt = title + (shots.length > 1 ? ' — slide ' + (k + 1) : '');
    const row = document.createElement('div');
    row.className = 'row sheetfigrow';

    if (sharing) {
      const sh = document.createElement('button');
      sh.className = 'copy'; sh.textContent = '⇪ Save';
      sh.onclick = () => shareShots([s], sh, s.name);
      row.appendChild(sh);
    }
    const ci = document.createElement('button');
    ci.className = 'copy'; ci.textContent = '⧉ Copy image';
    ci.onclick = () => copyImage(s, ci);
    row.appendChild(ci);

    const dl = document.createElement('button');
    dl.className = 'copy'; dl.textContent = '↓ Download';
    dl.onclick = () => saveShots([s], dl);
    row.appendChild(dl);

    if (shots.length > 1) {
      const n = document.createElement('span');
      n.className = 'signum'; n.textContent = 'Slide ' + (k + 1);
      row.appendChild(n);
    }
    fig.append(im, row);
    box.appendChild(fig);
  });

  if (cap) {
    const r = document.createElement('div');
    r.className = 'row sheetrow';
    const cb = document.createElement('button');
    cb.className = 'copy'; cb.textContent = 'Copy caption';
    cb.onclick = e => copy(cap, e.target);
    r.appendChild(cb);
    if (tags) {
      const tb = document.createElement('button');
      tb.className = 'copy'; tb.textContent = 'Copy tags';
      tb.onclick = e => copy(tags, e.target);
      r.appendChild(tb);
    }
    box.appendChild(r);
  }

  ov.appendChild(box);
  const close = () => {
    ov.remove();
    document.body.style.overflow = '';
    removeEventListener('keydown', esckey);
  };
  const esckey = e => { if (e.key === 'Escape') close(); };
  x.onclick = close;
  ov.onclick = e => { if (e.target === ov) close(); };
  addEventListener('keydown', esckey);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(ov);
  x.focus();
}
function flash(btn, label) {
  const old = btn.textContent;
  btn.textContent = label; btn.classList.add('done');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1500);
}
function copy(t, btn, label) {
  navigator.clipboard.writeText(t)
    .then(() => flash(btn, label || 'Copied'))
    .catch(() => flash(btn, 'Press ⌘C'));
}

function carousel(cvs, label) {
  const n = cvs.length;
  const w = document.createElement('div');
  w.className = 'media' + (n > 1 ? '' : ' single');
  w.innerHTML =
    '<div class="car" tabindex="0" role="group" aria-label="' + esc(label) + '">' +
    '<div class="track"></div>' +
    (n > 1 ? '<button class="nav prev" aria-label="Previous">‹</button>' +
      '<button class="nav next" aria-label="Next">›</button>' +
      '<div class="dots"></div>' : '') +
    '</div>';
  const track = w.querySelector('.track');
  cvs.forEach(cv => {
    const s = document.createElement('div');
    s.className = 'slide'; s.appendChild(cv); track.appendChild(s);
  });
  if (n > 1) {
    const dw = w.querySelector('.dots');
    dw.innerHTML = cvs.map((_, i) => '<button class="dot' + (i ? '' : ' on') + '" aria-label="Slide ' + (i + 1) + '"></button>').join('');
    const dots = dw.querySelectorAll('.dot');
    const prev = w.querySelector('.prev'), next = w.querySelector('.next');
    let i = 0;
    const go = k => {
      i = clamp(k, 0, n - 1);
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      prev.disabled = i === 0; next.disabled = i === n - 1;
    };
    prev.onclick = () => go(i - 1); next.onclick = () => go(i + 1);
    dots.forEach((d, j) => d.onclick = () => go(j));
    const car = w.querySelector('.car');
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });
    let x0 = null;
    car.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
    car.addEventListener('touchend', e => {
      if (x0 === null) return;
      const d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 44) go(i + (d < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
    go(0);
  }
  return w;
}


/* Everything lives on one page now, which means twenty-eight canvases would
   otherwise be painted before the first one is on screen. Each card paints
   when it scrolls into view instead — the page opens instantly and the
   browser never holds more pixels than it is showing. */
const _paintQueue = [];
let _observer = null;
function whenVisible(el, fn) {
  if (!('IntersectionObserver' in window)) { fn(); return; }
  if (!_observer) {
    _observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        _observer.unobserve(e.target);
        const job = _paintQueue.find(j => j.el === e.target);
        if (job) { job.fn(); job.done = true; }
      });
    }, { rootMargin: '600px 0px' });
  }
  _paintQueue.push({ el, fn });
  _observer.observe(el);
}

/* ── a card ───────────────────────────────────────────────────────────────
   One tile: the slides on top, then everything you need to publish them —
   the caption, the link, the hashtags, and the buttons underneath. The whole
   post is downloadable as a set, and every slide is downloadable on its own,
   because sometimes you only want to re-post frame two.
   ─────────────────────────────────────────────────────────────────────── */
function postCard(i, P, slidesFn, eyebrow) {
  const a = document.createElement('article');
  a.className = 'card' + (P.story ? ' story' : '');
  a.id = 'post-' + (P.id || i);
  const base = 'hirth-' + slug(stripRich(P.title));

  const media = document.createElement('div');
  media.className = 'media';
  media.innerHTML = '<div class="car placeholder"><span class="spin"></span></div>';
  a.appendChild(media);

  /* Every file is one PNG. Nothing is zipped: a zip is the wrong thing to
     hand a phone — it lands in Files, not Photos, and you cannot post from
     it. One image is what you actually put on Instagram. */
  const nSlides = P.slideCount || 1;
  const title = stripRich(P.title);
  let shots = null;                          /* [{ name, url }] once painted */

  const dlBtn = document.createElement('button');
  dlBtn.className = 'primary wide';
  dlBtn.textContent = nSlides > 1
    ? '↓ Download all ' + nSlides + ' slides'
    : (P.story ? '↓ Download story' : '↓ Download post');
  if (nSlides > 1) dlBtn.title = 'One file — ' + nSlides + ' pages, one per slide';
  dlBtn.onclick = () => {
    if (!shots) { flash(dlBtn, 'Preparing…'); return; }
    saveDeck(shots, dlBtn, base);
  };

  const slideBtns = nSlides > 1
    ? Array.from({ length: nSlides }, (_, k) => {
      const b = document.createElement('button');
      b.className = 'copy slim';
      b.textContent = 'Slide ' + (k + 1) + ' ↓';
      b.onclick = () => { if (shots && shots[k]) saveShots([shots[k]], b); };
      return b;
    })
    : [];

  /* and the other ways out, a tap away: bigger, shareable, holdable */
  const moreBtn = document.createElement('button');
  moreBtn.className = 'copy';
  moreBtn.textContent = '⤢ Other ways';
  moreBtn.onclick = () => { if (shots) openSheet(shots, title, P.cap, P.tags); };

  /* encoding a 1080-square PNG is not free, so the loop yields between
     slides and the card stays scrollable while it works */
  async function armAll(cvs) {
    const out = [];
    for (let k = 0; k < cvs.length; k++) {
      if (k) await new Promise(r => setTimeout(r, 0));
      const name = slideName(base, cvs, k), url = canvasURL(cvs[k]);
      out.push({ name, url });
      /* and the slide itself becomes a real image rather than a canvas. A
         canvas cannot be saved by right-clicking it and cannot be saved at
         all by long-pressing it on a phone. An <img> can, on every platform,
         with nothing needing to be permitted. */
      swapToImage(cvs[k], url, title + ' — ' + (k + 1));
    }
    shots = out;
    dlBtn.classList.add('ready');
  }

  whenVisible(a, () => {
    const cvs = slidesFn();
    const car = carousel(cvs, title);
    /* tapping the slide itself opens the same sheet */
    car.querySelector('.car').addEventListener('click', e => {
      if (e.target.closest('.nav') || e.target.closest('.dot')) return;
      if (shots) openSheet(shots, title, P.cap, P.tags);
    });
    a.replaceChild(car, media);
    armAll(cvs);
  });

  const b = document.createElement('div');
  b.className = 'body';
  /* No heading, no numbering, no art-direction tag, no stat strip. The
     headline is already set on the slide in ninety-point type, and the
     numbers are already on the slide too — repeating them underneath in
     grey was the page describing its own work back to you. What is left is
     what you actually need in order to publish: the caption, the link, the
     hashtags, the files. */
  if (P.cap) {
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = P.cap;
    b.appendChild(cap);
  }
  const link = document.createElement('a');
  link.className = 'sitelink';
  link.href = 'https://' + HOUSE.site;
  link.target = '_blank'; link.rel = 'noopener';
  link.textContent = HOUSE.site;
  b.appendChild(link);
  if (P.tags) {
    const t = document.createElement('div');
    t.className = 'tagline2';
    t.textContent = P.tags;
    b.appendChild(t);
  }

  /* row one — the file, and the two things you paste */
  const row = document.createElement('div');
  row.className = 'row';
  row.appendChild(dlBtn);
  if (P.cap) {
    const cb = document.createElement('button');
    cb.className = 'copy'; cb.textContent = 'Copy caption';
    cb.onclick = e => copy(P.cap, e.target);
    row.appendChild(cb);
  }
  if (P.tags) {
    const tb = document.createElement('button');
    tb.className = 'copy'; tb.textContent = 'Copy tags';
    tb.onclick = e => copy(P.tags, e.target);
    row.appendChild(tb);
  }
  row.appendChild(moreBtn);
  b.appendChild(row);

  /* row two — the slides one at a time, for when you only want frame two */
  if (slideBtns.length) {
    const r2 = document.createElement('div');
    r2.className = 'row slides';
    slideBtns.forEach(l => r2.appendChild(l));
    b.appendChild(r2);
  }

  a.appendChild(b);
  return a;
}
function slideName(base, cvs, k) {
  const tall = cvs[k].height > cvs[k].width;
  return base + (cvs.length === 1 ? (tall ? '-story' : '') : '-' + (k + 1)) + '.png';
}

function liCard(i, P) {
  const a = document.createElement('article');
  a.className = 'card text';
  a.id = 'post-li-' + i;
  const b = document.createElement('div');
  b.className = 'body';
  /* the one label that survives, because it is the only thing here that is
     not already in the copy: which day it goes out */
  b.innerHTML = '<div class="eyebrow">' + esc(P.day.toUpperCase()) + '</div>';

  /* a LinkedIn card reads the same as a carousel card — caption, link,
     hashtags, buttons — so the page has one shape, not two */
  const tags = P.tags || liTags(P.topic);
  const full = P.title + '\n\n' + P.body;
  const cap = document.createElement('div');
  cap.className = 'cap'; cap.textContent = full;
  b.appendChild(cap);
  const link = document.createElement('a');
  link.className = 'sitelink';
  link.href = 'https://' + HOUSE.site; link.target = '_blank'; link.rel = 'noopener';
  link.textContent = HOUSE.site;
  b.appendChild(link);
  const t = document.createElement('div');
  t.className = 'tagline2'; t.textContent = tags;
  b.appendChild(t);

  const row = document.createElement('div');
  row.className = 'row';
  /* text, so it is ready the moment it is built — same save route */
  const dl = document.createElement('button');
  dl.className = 'primary';
  dl.textContent = '↓ Download post';
  dl.onclick = () => saveShots([{
    name: 'hirth-linkedin-' + String(P.slot).padStart(2, '0') + '.txt',
    url: textURL(full + '\n\n' + tags),
    blob: new Blob([full + '\n\n' + tags], { type: 'text/plain;charset=utf-8' })
  }], dl);
  const cb = document.createElement('button');
  cb.className = 'copy'; cb.textContent = 'Copy caption';
  cb.onclick = e => copy(full, e.target);
  const tb = document.createElement('button');
  tb.className = 'copy'; tb.textContent = 'Copy tags';
  tb.onclick = e => copy(tags, e.target);
  row.append(dl, cb, tb);
  b.appendChild(row);
  a.appendChild(b);
  return a;
}

/* ── the two places ───────────────────────────────────────────────────────
   The designed week and the written week are different jobs on different
   days, so they are not one long scroll with a heading in the middle —
   they are two views, and only one is on screen at a time.
   ─────────────────────────────────────────────────────────────────────── */
const VIEWS = [
  { id: 'week', tab: 'The run', panel: 'view-week' },
  { id: 'li', tab: 'LinkedIn', panel: 'view-li' }
];
function buildSwitch() {
  const host = document.getElementById('switch');
  host.innerHTML = '';
  const counts = { week: WEEK.flyers.length + WEEK.carousels.length + WEEK.stories.length,
                   li: WEEK.linkedin.length };
  const btns = VIEWS.map(v => {
    const b = document.createElement('button');
    b.id = 'tab-' + v.id;
    b.setAttribute('role', 'tab');
    b.innerHTML = esc(v.tab) + '<span class="ct">' + counts[v.id] + '</span>';
    host.appendChild(b);
    return b;
  });
  const show = i => {
    VIEWS.forEach((v, j) => {
      document.getElementById(v.panel).hidden = j !== i;
      btns[j].setAttribute('aria-selected', j === i ? 'true' : 'false');
    });
    if (location.hash.slice(1) !== VIEWS[i].id) history.replaceState(null, '', '#' + VIEWS[i].id);
  };
  btns.forEach((b, i) => b.onclick = () => {
    show(i);
    document.getElementById('switch').scrollIntoView({ block: 'start' });
  });
  const want = VIEWS.findIndex(v => v.id === location.hash.slice(1));
  show(want < 0 ? 0 : want);
}

/* ── the page ─────────────────────────────────────────────────────────────
   The week is seven pieces — three posts and four stories, in one run,
   because a story is not a different kind of work from a post.
   ─────────────────────────────────────────────────────────────────────── */
function buildFeed() {
  const host = document.getElementById('posts');
  host.innerHTML = '';
  let n = 0;

  /* the flyers lead, because they are the ones that land */
  const flyers = WEEK.flyers.slice(0, MAXPOSTS === Infinity ? WEEK.flyers.length : MAXPOSTS);
  flyers.forEach(P => {
    P.slideCount = 1;
    P.story = P.tall;                      /* a tall flyer is a story card */
    const W = P.tall ? SW : FW, H = P.tall ? SH : FH;
    const draw = P.tall ? posterStory : posterFrame;
    host.appendChild(postCard(n++, P,
      () => [paint(c => draw(c, P, frameMeta({ id: P.id }, 0, 1, W, H)), W, H)],
      'FLYER · ' + (P.tall ? '9:16 · ' : '') + P.cutName.toUpperCase() + ' CUT'));
  });

  const carousels = WEEK.carousels.slice(0, Math.min(1, MAXPOSTS));
  carousels.forEach(P => {
    P.slideCount = SLIDES_PER_POST;
    host.appendChild(postCard(n++, P, () => contentSlides(P),
      'CAROUSEL · ' + SLIDES_PER_POST + ' SLIDES · ' + P.topic.toUpperCase()));
  });

  const stories = WEEK.stories.slice(0, MAXPOSTS === Infinity ? 2 : MAXPOSTS);
  stories.forEach(P => {
    P.slideCount = 1;
    host.appendChild(postCard(n++, P, () => [paint(P.draw, SW, SH)],
      'STORY · 9:16 · ' + String(P.kind).toUpperCase()));
  });

  const liHost = document.getElementById('liposts');
  liHost.innerHTML = '';
  WEEK.linkedin.forEach((P, i) => liHost.appendChild(liCard(i, P)));

  const total = flyers.length + carousels.length + stories.length;
  document.getElementById('sectionHead').textContent =
    total + ' pieces — ' + flyers.length + ' flyers, ' + carousels.length +
    ' carousel, ' + stories.length + ' stories';
  document.getElementById('weekRange').textContent =
    weekLabel() + '  ·  next set ' + nextMondayLabel();
  document.getElementById('liNote').textContent =
    WEEK.linkedin.length + ' written posts for the fortnight';
}

/* ── boot ─────────────────────────────────────────────────────────────── */
function loadImages() {
  const keys = Object.keys(ASSET_SRC);
  return Promise.all(keys.map(k => new Promise(res => {
    const im = new Image();
    im.onload = () => { IMG[k] = im; res(); };
    im.onerror = () => res();
    im.src = ASSET_SRC[k];
  })));
}
(async function boot() {
  /* Canvas does not trigger a font download. document.fonts.ready only settles
     the faces the DOM has already asked for, so every face the flyers use has
     to be requested explicitly first — otherwise canvas silently falls back to
     Times and the whole set ships in the wrong typeface. */
  try {
    if (document.fonts) {
      await Promise.all([
        '400 40px Fraunces', '500 40px Fraunces', '600 40px Fraunces',
        'italic 400 40px Fraunces', 'italic 500 40px Fraunces',
        '400 40px "Space Grotesk"', '500 40px "Space Grotesk"',
        '600 40px "Space Grotesk"', '700 40px "Space Grotesk"'
      ].map(f => document.fonts.load(f).catch(() => { })));
      await document.fonts.ready;
    }
  } catch (e) { }
  try { await loadImages(); } catch (e) { }
  buildFeed();
  buildSwitch();
  document.body.classList.add('ready');
})();
