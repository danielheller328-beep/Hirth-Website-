/* ══════════════════════════════════════════════════════════════════════════
   47-featured.js — the seven

   Three posts and four stories. Every one hand-composed rather than poured
   into a slot, and every one built on something real: the drone shot of Olive
   Avenue, the closing on Saviers Road, the man himself.

   Fewer, larger, and photograph-led where there is a photograph worth leading
   with.
   ══════════════════════════════════════════════════════════════════════════ */

const GOLD = '#C6A461', GOLD_HI = '#F0DFAE', CREAM = '#F5F0E6';
const FOIL = '#B08D4A', FOIL_HI = '#F6E7BC';

/* ── the ground every announcement is struck on ───────────────────────────
   No photography of any building, ever. A property photograph is either a
   drone frame nobody has, a street capture with a pole through it, or a stock
   image that cannot be licensed for a commercial post — so the frames are
   engraved instead, the way a tombstone or a share certificate is.
   ─────────────────────────────────────────────────────────────────────── */
function engravedGround(c, w, h, seed, o) {
  o = o || {};
  const g = c.createLinearGradient(0, 0, w * .45, h);
  g.addColorStop(0, o.a || '#143852'); g.addColorStop(.48, o.b || '#0A2032');
  g.addColorStop(1, o.c || '#04101A');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  bloom(c, w, h, GOLD, w * (o.bx == null ? .5 : o.bx), h * (o.by == null ? .42 : o.by), w * .9, .14);
  bloom(c, w, h, '#3E93C4', w * .08, h * .06, w * .7, .12);
  vignette(c, w, h, .48);
  grain(c, w, h, .11, true);
}

/* the double engraved border a certificate carries */
function engravedBorder(c, w, h, inset) {
  const i = inset == null ? 40 : inset;
  c.save();
  c.strokeStyle = rgba(GOLD, .38); c.lineWidth = 1;
  c.strokeRect(hair(i), hair(i), w - i * 2, h - i * 2);
  c.strokeStyle = rgba(GOLD, .16); c.lineWidth = 1;
  c.strokeRect(hair(i + 12), hair(i + 12), w - (i + 12) * 2, h - (i + 12) * 2);
  c.restore();
  [[i, i, 1, 1], [w - i, i, -1, 1], [i, h - i, 1, -1], [w - i, h - i, -1, -1]]
    .forEach(m => {
      line(c, m[0], m[1], m[0] + m[2] * 26, m[1], rgba(GOLD, .6), 1.5);
      line(c, m[0], m[1], m[0], m[1] + m[3] * 26, rgba(GOLD, .6), 1.5);
    });
}

/* a label with a foil rule either side, centred */
function struckLabel(c, str, cx, y, o) {
  o = o || {};
  const size = o.size || 20, tr = o.track || 9;
  const lw = measure(c, str.toUpperCase(), FN(700, size), tr);
  foilRule(c, cx - lw / 2 - 62, y - 7, 46, 2, FOIL, FOIL_HI);
  foilRule(c, cx + lw / 2 + 16, y - 7, 46, 2, FOIL, FOIL_HI);
  caps(c, str, cx, y, { size, weight: 700, fill: GOLD, align: 'center', track: tr });
}

/* the rail of numbers along the foot */
function dealRail(c, stats, y, w, h) {
  c.save();
  c.fillStyle = 'rgba(2,9,15,.72)'; c.fillRect(0, y, w, h);
  c.restore();
  foilRule(c, 0, y, w, 2, FOIL, FOIL_HI);
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
   POST 1 · the listing — struck, asymmetric, flush left

   Deliberately not the same composition as the closing. That one is centred
   and symmetrical because a closing is a record; this one runs off a heavy
   foil rule down the left because a listing is an offer.
   ══════════════════════════════════════════════════════════════════════════ */
function featureListing(c, L, S) {
  const w = S.w, h = S.h, M = 96;
  engravedGround(c, w, h, S.seed, { bx: .78, by: .34 });
  /* the seal sits high and right, where the field would otherwise be dead */
  guilloche(c, w * .74, h * .34, w * .40, {
    rings: 9, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .28), weight: 1
  });
  engravedRings(c, w * .74, h * .34, w * .29, w * .38, 4, rgba(GOLD, .20), 1);
  isoMassing(c, w * .74, h * .34, 44, 4, 4, S.seed, {
    top: 'rgba(198,164,97,.30)', left: 'rgba(20,58,84,.52)', right: 'rgba(10,34,52,.58)',
    edge: 'rgba(198,164,97,.22)', alpha: .95
  });
  const railH = 156, bottom = h - railH;
  let g = c.createLinearGradient(0, 0, w * .78, 0);
  g.addColorStop(0, 'rgba(3,12,20,.82)'); g.addColorStop(1, 'rgba(3,12,20,0)');
  c.fillStyle = g; c.fillRect(0, 0, w, bottom);

  engravedBorder(c, w, h, 40);
  /* the spine */
  foilRule(c, M - 34, 200, 4, bottom - 300, FOIL, FOIL_HI);

  logoLockup(c, M, 84, 214, 'white');

  const label = L.closed ? 'JUST CLOSED' : 'NOW AVAILABLE';
  const lw = measure(c, label, FN(700, 20), 8);
  caps(c, label, w - M, 138, { size: 20, weight: 700, fill: GOLD, align: 'right', track: 8 });
  foilRule(c, w - M - lw, 160, lw, 2, FOIL, FOIL_HI);

  const num = (String(L.addr).match(/^[\d\s–-]+/) || [''])[0].trim();
  const street = String(L.addr).slice(num.length).trim();

  let y = bottom - 74;
  const pf = FS(600, 92);
  foilText(c, L.price, M, y, { font: pf, base: 'alphabetic' });
  const pw = measure(c, L.price, pf, 0);
  caps(c, 'offered at', M + pw + 28, y - 16, { size: 14, fill: 'rgba(245,240,230,.6)', track: 3.8 });
  y -= 128;

  let ss = 78;
  while (measure(c, street, FS(600, ss), 0) > w - M * 2 && ss > 34) ss -= 2;
  text(c, street, M, y, { font: FS(600, ss), fill: CREAM, base: 'alphabetic' });
  y -= ss * 1.04;
  let ns = 168;
  while (measure(c, num, FS(600, ns), 0) > w - M * 2 && ns > 54) ns -= 3;
  text(c, num, M, y, { font: FS(600, ns), fill: CREAM, base: 'alphabetic' });
  y -= ns * .86;
  caps(c, L.cityline, M, y, { size: 16, fill: GOLD, track: 4.6, base: 'alphabetic' });
  y -= 36;
  caps(c, L.useShort, M, y, { size: 14, fill: 'rgba(245,240,230,.6)', track: 4, base: 'alphabetic' });

  dealRail(c, L.stats.slice(0, 5), bottom, w, railH);
}

/* ── the listing as a story ───────────────────────────────────────────── */
function featureListingStory(c, L, S) {
  const w = S.w, h = S.h, M = 104;
  engravedGround(c, w, h, S.seed, { bx: .5, by: .30 });
  guilloche(c, w / 2, h * .30, w * .60, {
    rings: 9, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .16), weight: 1
  });
  isoMassing(c, w * .5, h * .80, 84, 5, 5, S.seed, {
    top: 'rgba(198,164,97,.15)', left: 'rgba(20,58,84,.32)', right: 'rgba(10,34,52,.38)',
    edge: 'rgba(198,164,97,.11)', alpha: .75
  });
  const railH = 190, bottom = h - railH;
  const g = c.createLinearGradient(0, h * .34, 0, bottom);
  g.addColorStop(0, 'rgba(3,12,20,0)'); g.addColorStop(1, 'rgba(3,12,20,.9)');
  c.fillStyle = g; c.fillRect(0, h * .34, w, bottom - h * .34);
  engravedBorder(c, w, h, 46);

  logoLockup(c, w / 2, 150, 280, 'white', 'center');
  struckLabel(c, L.closed ? 'Just Closed' : 'Now Available', w / 2, 330, { size: 22, track: 10 });

  const num = (String(L.addr).match(/^[\d\s–-]+/) || [''])[0].trim();
  const street = String(L.addr).slice(num.length).trim();

  let y = bottom - 96;
  const pf = FS(600, 116);
  const pw = measure(c, L.price, pf, 0);
  foilText(c, L.price, w / 2, y, { font: pf, base: 'alphabetic', align: 'center' });
  caps(c, 'offered at', w / 2, y + 48, { size: 15, fill: 'rgba(245,240,230,.6)', align: 'center', track: 4 });
  y -= 150;

  let ss = 86;
  while (measure(c, street, FS(600, ss), 0) > w - M * 2 && ss > 36) ss -= 2;
  text(c, street, w / 2, y, { font: FS(600, ss), fill: CREAM, align: 'center', base: 'alphabetic' });
  y -= ss * 1.04;
  let ns = 196;
  while (measure(c, num, FS(600, ns), 0) > w - M * 2 && ns > 60) ns -= 4;
  text(c, num, w / 2, y, { font: FS(600, ns), fill: CREAM, align: 'center', base: 'alphabetic' });
  y -= ns * .88;
  foilRule(c, w / 2 - 90, y - 14, 180, 2, FOIL, FOIL_HI);
  y -= 44;
  caps(c, L.cityline + '   ·   ' + L.useShort, w / 2, y, {
    size: 16, fill: GOLD, align: 'center', track: 4.4, base: 'alphabetic'
  });

  dealRail(c, L.stats.slice(0, 3), bottom, w, railH);
}

/* ══════════════════════════════════════════════════════════════════════════
   POST 2 · the closing — a tombstone, the way a closing is announced

   No photograph. The one on file for Saviers is a street-level capture with a
   pole through the middle of it, and a closed deal is about the transaction
   anyway, not the elevation.
   ══════════════════════════════════════════════════════════════════════════ */
function featureClosing(c, L, S) {
  const w = S.w, h = S.h, M = 84, cx = w / 2;
  engravedGround(c, w, h, S.seed, { bx: .5, by: .44 });
  guilloche(c, cx, h * .45, w * .42, {
    rings: 8, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .16), weight: 1
  });
  engravedRings(c, cx, h * .45, w * .30, w * .40, 4, rgba(GOLD, .13), 1);
  engravedBorder(c, w, h, 40);

  logoLockup(c, cx, 96, 236, 'white', 'center');

  let y = 300;
  struckLabel(c, 'Closed', cx, y, { size: 20, track: 9 });

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
  foilText(c, L.price, cx, priceY, { font: FS(600, ps), align: 'center', base: 'middle' });
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
  engravedGround(c, w, h, S.seed, { bx: .5, by: .46 });
  guilloche(c, cx, h * .48, w * .56, {
    rings: 9, petals: 13, inner: .69, arm: .23, color: rgba(GOLD, .15), weight: 1
  });
  engravedRings(c, cx, h * .48, w * .40, w * .54, 4, rgba(GOLD, .12), 1);
  engravedBorder(c, w, h, 46);

  logoLockup(c, cx, 150, 280, 'white', 'center');

  let y = 430;
  struckLabel(c, 'Closed', cx, y, { size: 22, track: 10 });

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
  foilText(c, L.price, cx, y, { font: FS(600, ps), align: 'center', base: 'middle' });
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
