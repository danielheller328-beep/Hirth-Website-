/* ══════════════════════════════════════════════════════════════════════════
   47-featured.js — the seven

   Three posts and four stories. Every one hand-composed rather than poured
   into a slot, and every one built on something real: the drone shot of Olive
   Avenue, the closing on Saviers Road, the man himself.

   Fewer, larger, and photograph-led where there is a photograph worth leading
   with.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── grading ──────────────────────────────────────────────────────────────
   Not a filter. A contrast curve, a little saturation and a split tone —
   what any photographer does to a raw frame before it goes to print. The
   building still looks like the building.

   `src` crops the source before anything else, which is how the Hirth
   watermark and the dark disc baked into the corner of olive.jpg are kept
   out of frame.
   ─────────────────────────────────────────────────────────────────────── */
const _gradeCache = {};
function gradePhoto(img, key, w, h, o) {
  o = o || {};
  const ck = [key, w, h, o.contrast, o.sat, o.focusY, (o.src || []).join(',')].join('|');
  if (_gradeCache[ck]) return _gradeCache[ck];

  const cv = document.createElement('canvas');
  cv.width = Math.ceil(w); cv.height = Math.ceil(h);
  const c = cv.getContext('2d');
  c.imageSmoothingEnabled = true;
  c.imageSmoothingQuality = 'high';

  const s = o.src || [0, 0, img.naturalWidth, img.naturalHeight];
  const sc = Math.max(w / s[2], h / s[3]);
  const dw = s[2] * sc, dh = s[3] * sc;
  const fy = o.focusY == null ? .5 : o.focusY, fx = o.focusX == null ? .5 : o.focusX;
  c.drawImage(img, s[0], s[1], s[2], s[3],
    (w - dw) * fx, (h - dh) * fy, dw, dh);

  const im = c.getImageData(0, 0, cv.width, cv.height), d = im.data;
  const contrast = o.contrast == null ? 1.22 : o.contrast;
  const sat = o.sat == null ? 1.14 : o.sat;
  const shadow = hex2rgb(o.shadow || '#0B2233');     /* cool shadows  */
  const high = hex2rgb(o.highlight || '#FFF6E4');    /* warm highlights */
  const split = o.split == null ? .16 : o.split;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
    /* contrast about mid grey */
    r = clamp((r - .5) * contrast + .5, 0, 1);
    g = clamp((g - .5) * contrast + .5, 0, 1);
    b = clamp((b - .5) * contrast + .5, 0, 1);
    /* saturation about luminance */
    const l = r * .299 + g * .587 + b * .114;
    r = clamp(l + (r - l) * sat, 0, 1);
    g = clamp(l + (g - l) * sat, 0, 1);
    b = clamp(l + (b - l) * sat, 0, 1);
    /* split tone: cool into the shadows, warm into the highlights */
    const t = l * l;
    r = clamp(r + ((1 - t) * (shadow[0] / 255 - .5) + t * (high[0] / 255 - .5)) * split, 0, 1);
    g = clamp(g + ((1 - t) * (shadow[1] / 255 - .5) + t * (high[1] / 255 - .5)) * split, 0, 1);
    b = clamp(b + ((1 - t) * (shadow[2] / 255 - .5) + t * (high[2] / 255 - .5)) * split, 0, 1);
    d[i] = r * 255; d[i + 1] = g * 255; d[i + 2] = b * 255;
  }
  c.putImageData(im, 0, 0);
  _gradeCache[ck] = cv;
  return cv;
}

/* olive.jpg carries a logo and a dark disc burned into the top of the frame;
   everything below them is the photograph */
const OLIVE_SRC = [0, 150, 478, 610];

const GOLD = '#C6A461', GOLD_HI = '#F0DFAE', CREAM = '#F5F0E6';

/* the scrim that lets type sit on a photograph without a box behind it */
function cineScrim(c, w, h, o) {
  o = o || {};
  let g = c.createLinearGradient(0, 0, 0, h * (o.topStop || .34));
  g.addColorStop(0, 'rgba(4,14,22,' + (o.top == null ? .74 : o.top) + ')');
  g.addColorStop(1, 'rgba(4,14,22,0)');
  c.fillStyle = g; c.fillRect(0, 0, w, h * (o.topStop || .34));
  const bs = o.botStop == null ? .34 : o.botStop;
  g = c.createLinearGradient(0, h * bs, 0, h);
  g.addColorStop(0, 'rgba(4,14,22,0)');
  g.addColorStop(.34, 'rgba(4,14,22,.42)');
  g.addColorStop(.62, 'rgba(4,14,22,.80)');
  g.addColorStop(1, 'rgba(4,14,22,' + (o.bot == null ? .96 : o.bot) + ')');
  c.fillStyle = g; c.fillRect(0, h * bs, w, h * (1 - bs));
  /* a wash in from the left so the flush-left type never fights the picture */
  g = c.createLinearGradient(0, 0, w * .72, 0);
  g.addColorStop(0, 'rgba(4,14,22,.52)');
  g.addColorStop(1, 'rgba(4,14,22,0)');
  c.fillStyle = g; c.fillRect(0, h * (bs - .06), w, h * (1 - bs + .06));
  if (o.vignette !== false) vignette(c, w, h, .34);
}

/* the rail of numbers along the foot of a listing */
function dealRail(c, stats, y, w, h) {
  c.save();
  c.fillStyle = 'rgba(3,12,19,.72)'; c.fillRect(0, y, w, h);
  c.restore();
  foilRule(c, 0, y, w, 2, GOLD, GOLD_HI);
  const n = stats.length, cw = w / n;
  stats.forEach((s, i) => {
    const cx = cw * i + cw / 2;
    if (i) vrule(c, cw * i, y + 26, h - 52, 'rgba(245,240,230,.16)', 1);
    let sz = n > 4 ? 40 : 46;
    while (measure(c, s[0], FS(600, sz), 0) > cw - 30 && sz > 18) sz -= 1;
    text(c, s[0], cx, y + h * .40, { font: FS(600, sz), fill: CREAM, align: 'center', base: 'middle' });
    caps(c, s[1], cx, y + h * .74, { size: 13, fill: 'rgba(245,240,230,.6)', align: 'center', track: 2.8 });
  });
}

/* ══════════════════════════════════════════════════════════════════════════
   POST 1 · the listing — the photograph carries it
   ══════════════════════════════════════════════════════════════════════════ */
function featureListing(c, L, S) {
  const w = S.w, h = S.h, M = 72;
  const img = L.photo && IMG[L.photo];
  if (img) {
    c.drawImage(gradePhoto(img, L.photo + '-feed', w, h, {
      src: L.photoSrc, focusY: L.photoFocus == null ? .78 : L.photoFocus,
      contrast: 1.26, sat: 1.18
    }), 0, 0);
  } else {
    AD.nocturne.ground(c, w, h, S.seed);
  }
  const railH = 156, bottom = h - railH;
  cineScrim(c, w, h, { botStop: .30, bot: .96 });
  grain(c, w, h, .07, true);

  logoLockup(c, M, 56, 214, 'white');
  const label = L.closed ? 'JUST CLOSED' : 'JUST LISTED';
  const lw = measure(c, label, FN(700, 22), 7);
  caps(c, label, w - M, 92, { size: 22, weight: 700, fill: GOLD, align: 'right', track: 7 });
  foilRule(c, w - M - lw, 114, lw, 2, GOLD, GOLD_HI);

  /* the address, set as large as two lines will allow */
  const num = (String(L.addr).match(/^[\d\s–-]+/) || [''])[0].trim();
  const street = String(L.addr).slice(num.length).trim();
  let y = bottom - 62;

  text(c, L.price, M, y, {
    font: FS(600, 76), fill: GOLD, base: 'alphabetic', shadow: ['rgba(0,0,0,.7)', 24, 6]
  });
  const pw = measure(c, L.price, FS(600, 76), 0);
  caps(c, L.closed ? 'sale price' : 'offered at', M + pw + 26, y - 12,
    { size: 14, fill: 'rgba(245,240,230,.72)', track: 3.6 });
  y -= 104;

  let ss = 74;
  while (measure(c, street, FS(600, ss), 0) > w - M * 2 && ss > 34) ss -= 2;
  text(c, street, M, y, { font: FS(600, ss), fill: CREAM, base: 'alphabetic', shadow: ['rgba(0,0,0,.6)', 22, 6] });
  y -= ss * 1.02;
  let ns = 152;
  while (measure(c, num, FS(600, ns), 0) > w - M * 2 && ns > 50) ns -= 3;
  text(c, num, M, y, { font: FS(600, ns), fill: CREAM, base: 'alphabetic', shadow: ['rgba(0,0,0,.6)', 30, 8] });
  y -= ns * .82;
  foilRule(c, M, y, 150, 3, GOLD, GOLD_HI);
  y -= 28;
  caps(c, L.cityline + '   ·   ' + L.useShort, M, y, {
    size: 15, fill: 'rgba(245,240,230,.8)', track: 4.2, base: 'alphabetic'
  });

  dealRail(c, L.stats.slice(0, 5), bottom, w, railH);
}

/* ══════════════════════════════════════════════════════════════════════════
   POST 2 · the closing — a tombstone, the way a closing is announced

   No photograph. The one on file for Saviers is a street-level capture with a
   pole through the middle of it, and a closed deal is about the transaction
   anyway, not the elevation.
   ══════════════════════════════════════════════════════════════════════════ */
function featureClosing(c, L, S) {
  const w = S.w, h = S.h, M = 84, cx = w / 2;
  const g = c.createLinearGradient(0, 0, w * .4, h);
  g.addColorStop(0, '#123246'); g.addColorStop(.5, '#0A1F2E'); g.addColorStop(1, '#050F18');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  bloom(c, w, h, GOLD, cx, h * .42, w * .8, .13);
  guilloche(c, cx, h * .45, w * .42, {
    rings: 8, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .16), weight: 1
  });
  engravedRings(c, cx, h * .45, w * .30, w * .40, 4, rgba(GOLD, .13), 1);
  vignette(c, w, h, .45);
  grain(c, w, h, .10, true);

  c.save();
  c.strokeStyle = rgba(GOLD, .35); c.lineWidth = 1;
  c.strokeRect(hair(40), hair(40), w - 80, h - 80);
  c.strokeStyle = rgba(GOLD, .16); c.lineWidth = 1;
  c.strokeRect(hair(52), hair(52), w - 104, h - 104);
  c.restore();

  logoLockup(c, cx, 96, 236, 'white', 'center');

  let y = 300;
  const lab = 'CLOSED';
  const lw = measure(c, lab, FN(700, 20), 9);
  foilRule(c, cx - lw / 2 - 60, y - 7, 44, 2, GOLD, GOLD_HI);
  foilRule(c, cx + lw / 2 + 16, y - 7, 44, 2, GOLD, GOLD_HI);
  caps(c, lab, cx, y, { size: 20, weight: 700, fill: GOLD, align: 'center', track: 9 });

  y += 78;
  const addr = fitBlock(c, L.addr, { w: w - M * 2, h: 200 }, {
    weight: 600, family: SERIF, max: 82, min: 40, leading: 1.06, maxLines: 2
  });
  y = drawBlock(c, addr, cx, y, { fill: CREAM, align: 'center' });
  y += 12;
  caps(c, L.cityline, cx, y, { size: 15, fill: 'rgba(245,240,230,.62)', align: 'center', track: 4.4 });

  /* the number, which is the whole point of the announcement */
  y += 90;
  let ps = 156;
  while (measure(c, L.price, FS(600, ps), 0) > w - M * 2 && ps > 60) ps -= 3;
  const priceY = y + ps * .36;
  text(c, L.price, cx, priceY, {
    font: FS(600, ps), fill: CREAM, align: 'center', base: 'middle',
    shadow: ['rgba(0,0,0,.5)', 30, 8]
  });
  y = priceY + ps * .50;
  caps(c, L.closedNote || 'Represented seller and buyer', cx, y, {
    size: 16, fill: GOLD, align: 'center', track: 4
  });

  /* the facts, as a ledger */
  y += 74;
  const facts = L.stats.slice(1, 4);
  const cw = (w - M * 2) / facts.length;
  rule(c, M, y - 26, w - M * 2, rgba(CREAM, .16), 1);
  facts.forEach((f, i) => {
    const fx = M + cw * i + cw / 2;
    if (i) vrule(c, M + cw * i, y - 12, 80, rgba(CREAM, .14), 1);
    text(c, f[0], fx, y + 22, { font: FS(600, 38), fill: CREAM, align: 'center', base: 'middle' });
    caps(c, f[1], fx, y + 56, { size: 12, fill: 'rgba(245,240,230,.55)', align: 'center', track: 2.8 });
  });
  rule(c, M, y + 82, w - M * 2, rgba(CREAM, .16), 1);

  caps(c, HOUSE.agent + '   ·   ' + HOUSE.phone + '   ·   ' + HOUSE.site, cx, h - 128,
    { size: 14, fill: 'rgba(245,240,230,.72)', align: 'center', track: 3.4 });
  caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, cx, h - 96,
    { size: 11, fill: 'rgba(245,240,230,.38)', align: 'center', track: 2.6 });
}

/* ══════════════════════════════════════════════════════════════════════════
   STORY 1 · the listing, full bleed — 9:16 suits the drone frame almost
   exactly, so it is barely cropped
   ══════════════════════════════════════════════════════════════════════════ */
function featureListingStory(c, L, S) {
  const w = S.w, h = S.h, M = 76;
  const img = L.photo && IMG[L.photo];
  if (img) {
    c.drawImage(gradePhoto(img, L.photo + '-story', w, h, {
      src: L.photoSrc, focusY: L.photoFocus == null ? .72 : L.photoFocus,
      contrast: 1.26, sat: 1.18
    }), 0, 0);
  } else AD.nocturne.ground(c, w, h, S.seed);
  const railH = 190, bottom = h - railH;
  cineScrim(c, w, h, { topStop: .28, top: .82, botStop: .38, bot: .96 });
  grain(c, w, h, .07, true);

  logoLockup(c, w / 2, 108, 264, 'white', 'center');
  const label = L.closed ? 'JUST CLOSED' : 'JUST LISTED';
  const lw = measure(c, label, FN(700, 24), 8);
  caps(c, label, w / 2, 312, { size: 24, weight: 700, fill: GOLD, align: 'center', track: 8 });
  foilRule(c, w / 2 - lw / 2, 340, lw, 2, GOLD, GOLD_HI);

  const num = (String(L.addr).match(/^[\d\s–-]+/) || [''])[0].trim();
  const street = String(L.addr).slice(num.length).trim();

  let y = bottom - 84;
  text(c, L.price, M, y, {
    font: FS(600, 96), fill: GOLD, base: 'alphabetic', shadow: ['rgba(0,0,0,.7)', 26, 8]
  });
  caps(c, L.closed ? 'sale price' : 'offered at', M, y + 40,
    { size: 15, fill: 'rgba(245,240,230,.7)', track: 4, base: 'alphabetic' });
  y -= 132;

  let ss = 84;
  while (measure(c, street, FS(600, ss), 0) > w - M * 2 && ss > 36) ss -= 2;
  text(c, street, M, y, { font: FS(600, ss), fill: CREAM, base: 'alphabetic', shadow: ['rgba(0,0,0,.6)', 24, 6] });
  y -= ss * 1.02;
  let ns = 184;
  while (measure(c, num, FS(600, ns), 0) > w - M * 2 && ns > 60) ns -= 4;
  text(c, num, M, y, { font: FS(600, ns), fill: CREAM, base: 'alphabetic', shadow: ['rgba(0,0,0,.6)', 34, 10] });
  y -= ns * .82;
  foilRule(c, M, y, 168, 3, GOLD, GOLD_HI);
  y -= 32;
  caps(c, L.cityline, M, y, { size: 17, fill: 'rgba(245,240,230,.82)', track: 4.6, base: 'alphabetic' });
  y -= 40;
  caps(c, L.useShort, M, y, { size: 15, fill: GOLD, track: 4, base: 'alphabetic' });

  dealRail(c, L.stats.slice(0, 3), bottom, w, railH);
}

/* ══════════════════════════════════════════════════════════════════════════
   STORY 2 · the closing, as a certificate
   ══════════════════════════════════════════════════════════════════════════ */
function featureClosingStory(c, L, S) {
  const w = S.w, h = S.h, M = 96, cx = w / 2;
  const g = c.createLinearGradient(0, 0, w * .5, h);
  g.addColorStop(0, '#123246'); g.addColorStop(.5, '#0A1F2E'); g.addColorStop(1, '#050F18');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  bloom(c, w, h, GOLD, cx, h * .46, w, .14);
  guilloche(c, cx, h * .48, w * .56, {
    rings: 9, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .15), weight: 1
  });
  engravedRings(c, cx, h * .48, w * .40, w * .54, 4, rgba(GOLD, .12), 1);
  vignette(c, w, h, .46);
  grain(c, w, h, .10, true);

  c.save();
  c.strokeStyle = rgba(GOLD, .35); c.lineWidth = 1;
  c.strokeRect(hair(46), hair(46), w - 92, h - 92);
  c.strokeStyle = rgba(GOLD, .16); c.lineWidth = 1;
  c.strokeRect(hair(60), hair(60), w - 120, h - 120);
  c.restore();

  logoLockup(c, cx, 150, 280, 'white', 'center');

  let y = 430;
  const lab = 'CLOSED';
  const lw = measure(c, lab, FN(700, 22), 10);
  foilRule(c, cx - lw / 2 - 66, y - 8, 48, 2, GOLD, GOLD_HI);
  foilRule(c, cx + lw / 2 + 18, y - 8, 48, 2, GOLD, GOLD_HI);
  caps(c, lab, cx, y, { size: 22, weight: 700, fill: GOLD, align: 'center', track: 10 });

  y += 96;
  const addr = fitBlock(c, L.addr, { w: w - M * 2, h: 260 }, {
    weight: 600, family: SERIF, max: 92, min: 44, leading: 1.06, maxLines: 2
  });
  y = drawBlock(c, addr, cx, y, { fill: CREAM, align: 'center' });
  y += 16;
  caps(c, L.cityline, cx, y, { size: 17, fill: 'rgba(245,240,230,.62)', align: 'center', track: 4.6 });

  y += 150;
  let ps = 186;
  while (measure(c, L.price, FS(600, ps), 0) > w - M * 2 && ps > 70) ps -= 4;
  text(c, L.price, cx, y, {
    font: FS(600, ps), fill: CREAM, align: 'center', base: 'middle', shadow: ['rgba(0,0,0,.5)', 34, 10]
  });
  y += ps * .54;
  caps(c, L.closedNote || 'Represented seller and buyer', cx, y,
    { size: 18, fill: GOLD, align: 'center', track: 4.2 });

  y += 120;
  const facts = L.stats.slice(1, 4);
  rule(c, M, y - 40, w - M * 2, rgba(CREAM, .16), 1);
  facts.forEach((f, i) => {
    const fy = y + i * 92;
    caps(c, f[1], M, fy, { size: 15, fill: 'rgba(245,240,230,.55)', track: 3.2 });
    text(c, f[0], w - M, fy, { font: FS(600, 42), fill: CREAM, align: 'right', base: 'middle' });
    rule(c, M, fy + 44, w - M * 2, rgba(CREAM, .12), 1);
  });

  caps(c, HOUSE.agent + '   ·   ' + HOUSE.phone, cx, h - 190,
    { size: 17, fill: CREAM, align: 'center', track: 3.6 });
  caps(c, HOUSE.site + '  ·  ' + HOUSE.dre, cx, h - 148,
    { size: 12, fill: 'rgba(245,240,230,.45)', align: 'center', track: 2.8 });
}
