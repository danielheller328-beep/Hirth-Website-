/* ══════════════════════════════════════════════════════════════════════════
   40-listings.js — listing flyers, the site plan, and the 9:16 stories

   A listing carousel is art-directed as a sequence rather than four copies of
   one frame: photograph, then the case, then the site, then the ask. The
   middle two borrow whichever art direction the week assigned the post, so a
   listing never looks like last week's listing.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── the status rail that runs under a listing hero ───────────────────── */
function statRail(c, ad, stats, y, w, h, o) {
  o = o || {};
  c.fillStyle = o.bg || 'rgba(4,14,21,.90)';
  c.fillRect(0, y, w, h);
  rule(c, 0, y, w, o.top || rgba('#C6A461', .75), 2);
  const n = stats.length, cw = w / n;
  stats.forEach((s, i) => {
    const cx = cw * i + cw / 2;
    if (i) vrule(c, cw * i, y + 26, h - 52, 'rgba(255,255,255,.14)', 1);
    let sz = n > 4 ? 38 : 44, f = FS(600, sz);
    while (measure(c, s[0], f, 0) > cw - 30 && sz > 18) { sz -= 1; f = FS(600, sz); }
    text(c, s[0], cx, y + h * .42, { font: f, fill: '#F3EEE3', align: 'center', base: 'middle' });
    caps(c, s[1], cx, y + h * .74, { size: 13, fill: 'rgba(243,238,227,.62)', align: 'center', track: 2.6 });
  });
}

/* ── 1 · the hero ─────────────────────────────────────────────────────── */
function listingHero(c, L, S) {
  const ad = AD.nocturne, M = S.M;
  nocturneField(c, ad, S, L.photo);
  const railH = 168, bottom = S.h - railH;
  logoLockup(c, M, M - 6, 214, 'white');
  /* status line, set as a rule and caps rather than a coloured pill */
  const label = L.closed ? 'JUST CLOSED' : 'JUST LISTED';
  const lw = measure(c, label, FN(700, 21), 6.5);
  caps(c, label, S.w - M, M + 26, { size: 21, weight: 700, fill: ad.accent, align: 'right', track: 6.5 });
  rule(c, S.w - M - lw, M + 48, lw, ad.accent, 2);

  let y = bottom - 56;
  /* price */
  const pf = FS(600, 96);
  text(c, L.price, M, y, { font: pf, fill: '#F3EEE3', base: 'alphabetic', shadow: ['rgba(0,0,0,.6)', 30, 8] });
  const pw = measure(c, L.price, pf, 0);
  caps(c, L.closed ? 'sale price' : 'offered at', M + pw + 24, y - 14, { size: 15, fill: ad.accent, track: 3.6 });
  y -= 116;
  const addr = fitBlock(c, L.addr, { w: S.w - M * 2, h: 210 }, {
    weight: 600, family: SERIF, max: 82, min: 40, leading: 1.06, maxLines: 2
  });
  y -= addr.height - addr.size * .22;
  drawBlock(c, addr, M, y, { fill: '#F3EEE3', shadow: ['rgba(0,0,0,.5)', 26, 6] });
  y -= 46;
  caps(c, L.cityline, M, y, { size: 17, fill: 'rgba(243,238,227,.72)', track: 4.4 });
  y -= 44;
  caps(c, L.useShort, M, y, { size: 15, fill: ad.accent, track: 3.6 });
  statRail(c, ad, L.stats.slice(0, L.closed ? 4 : 5), bottom, S.w, railH);
}

/* ── 2 · the case (highlights, in the week's art direction) ───────────── */
function listingCase(c, ad, L, S) {
  const P = {
    topic: L.closed ? 'Just Closed' : 'Just Listed',
    pointsTitle: L.closed ? 'The transaction' : 'The opportunity',
    points: L.highlights.slice(0, 6)
  };
  LAYOUT[ad.id].points(c, ad, P, S);
}

/* ── 3 · the site plan ────────────────────────────────────────────────────
   Drawn as a plan rather than pasted as a map: arterials, block fills, the
   parcel called out, and distances set as dimension lines.
   ─────────────────────────────────────────────────────────────────────── */
function listingSite(c, L, S) {
  const ad = AD.blueprint, M = S.M;
  const B = stage(c, ad, S, { label: 'Site', sheet: '03' });
  cropMarks(c, S.w, S.h, 26, 22, rgba('#59C6F2', .4), 1);
  const r = rng(hashStr(L.id || L.addr));

  const px0 = B.x, py0 = B.y + 6, pw = B.w, ph = B.bottom - py0 - 96;
  c.save();
  c.beginPath(); c.rect(px0, py0, pw, ph); c.clip();
  c.fillStyle = 'rgba(6,26,40,.55)'; c.fillRect(px0, py0, pw, ph);

  /* block fills */
  const gx = 5 + Math.floor(r() * 2), gy = 4 + Math.floor(r() * 2);
  for (let i = 0; i < gx; i++) for (let j = 0; j < gy; j++) {
    if (r() > .42) continue;
    const bx = px0 + pw / gx * i + 8, by = py0 + ph / gy * j + 8;
    c.fillStyle = rgba('#59C6F2', .05 + r() * .05);
    c.fillRect(bx, by, pw / gx - 16, ph / gy - 16);
  }
  /* the street network */
  for (let i = 1; i < gx; i++) vrule(c, px0 + pw / gx * i, py0, ph, rgba('#8CCDF0', .18), 1);
  for (let j = 1; j < gy; j++) rule(c, px0, py0 + ph / gy * j, pw, rgba('#8CCDF0', .18), 1);

  /* two arterials, one of them named */
  const ax = px0 + pw * (0.34 + r() * 0.22), ay = py0 + ph * (0.44 + r() * 0.18);
  c.fillStyle = 'rgba(140,205,240,.16)';
  c.fillRect(px0, ay - 11, pw, 22);
  c.fillRect(ax - 10, py0, 20, ph);
  line(c, px0, ay, px0 + pw, ay, rgba('#59C6F2', .5), 1);
  line(c, ax, py0, ax, py0 + ph, rgba('#59C6F2', .5), 1);

  /* street names — a plan without them is a pattern */
  const street = (String(L.addr).replace(/^[\d\s\u2013\-]+/, '') || 'Main Street').trim();
  const cross = (L.markers && L.markers[0] && L.markers[0][0]) || 'Cross Street';
  c.save();
  c.globalAlpha = .8;
  caps(c, street, px0 + 26, ay - 1, { size: 15, fill: rgba('#8CCDF0', .85), track: 3.4 });
  c.translate(ax - 1, py0 + ph - 26); c.rotate(-Math.PI / 2);
  caps(c, cross, 0, 0, { size: 14, fill: rgba('#8CCDF0', .7), track: 3.2 });
  c.restore();

  /* the parcel */
  const sx = ax + 10, sy = ay - 11;
  c.save();
  c.fillStyle = rgba('#59C6F2', .22);
  c.fillRect(sx + 12, sy - 92, 108, 84);
  c.strokeStyle = ad.accent; c.lineWidth = 2;
  c.strokeRect(hair(sx + 12), hair(sy - 92), 108, 84);
  hatch(c, sx + 12, sy - 92, 108, 84, rgba('#59C6F2', .28), 8, -Math.PI / 4);
  c.restore();
  c.restore();

  /* callout to the parcel */
  const lw = measure(c, L.addr, FN(700, 24), .4) + 40;
  const lx = clamp(sx + 66 - lw / 2, B.x + 4, B.x + B.w - lw - 4), ly = sy - 178;
  line(c, sx + 66, sy - 92, sx + 66, ly + 46, ad.accent, 1);
  c.save(); c.fillStyle = '#0A2437'; c.strokeStyle = ad.accent; c.lineWidth = 1.5;
  c.fillRect(lx, ly, lw, 46); c.strokeRect(hair(lx), hair(ly), lw, 46); c.restore();
  text(c, L.addr, lx + lw / 2, ly + 24, { font: FN(700, 24), fill: ad.ink, align: 'center', base: 'middle', track: .4 });

  /* distances, as a dimension schedule */
  let y = py0 + ph + 30;
  caps(c, 'distances', B.x, y, { size: 13, fill: ad.accent, track: 3 });
  rule(c, B.x + 116, y, B.w - 116, ad.ruleSoft, 1);
  y += 34;
  const marks = (L.markers || []).slice(0, 4), cw = B.w / Math.max(1, marks.length);
  marks.forEach((m, i) => {
    const x = B.x + cw * i;
    if (i) vrule(c, x - 12, y - 6, 52, ad.ruleSoft, 1);
    caps(c, m[0], x, y + 8, { size: 13, fill: ad.body, track: 2.4 });
    text(c, m[1], x, y + 38, { font: FN(600, 25), fill: ad.ink, base: 'middle' });
  });
}

/* ── 4 · the ask ──────────────────────────────────────────────────────── */
function listingAsk(c, ad, L, S) {
  const P = {
    ctaKicker: L.closed ? 'Own something similar?' : 'Want the full package?',
    cta: L.closed ? 'We have the buyer list for this asset class.'
      : 'Ask for the offering memorandum.',
    topic: L.useShort
  };
  LAYOUT[ad.id].ask(c, ad, P, S);
}

/* ══════════════════════════════════════════════════════════════════════════
   STORIES · 9:16
   Same six worlds, re-composed for the taller frame. A story is one idea,
   so these are deliberately sparser than the feed slides.
   ══════════════════════════════════════════════════════════════════════════ */
function storyStage(c, ad, S, label) {
  ad.ground(c, S.w, S.h, S.seed);
  const M = S.M;
  const top = logoLockup(c, S.w / 2, 128, 300, ad.logo === 'white' ? 'white' : 'color', 'center');
  let y = top + 46;
  if (label) {
    if (ad.id === 'signal') {
      const tw = measure(c, label.toUpperCase(), FN(700, 19), 5) + 60;
      c.fillStyle = ad.accent; c.fillRect(S.w / 2 - tw / 2, y - 24, tw, 50);
      caps(c, label, S.w / 2, y + 1, { size: 19, weight: 700, fill: '#fff', align: 'center', track: 5 });
    } else if (ad.id === 'atelier' || ad.id === 'dossier') {
      caps(c, label, S.w / 2, y, { size: 18, fill: ad.accent, align: 'center', track: 5 });
      const tw = measure(c, label.toUpperCase(), FN(600, 18), 5);
      rule(c, S.w / 2 - tw / 2 - 46, y, 30, ad.rule, 1);
      rule(c, S.w / 2 + tw / 2 + 16, y, 30, ad.rule, 1);
    } else {
      const tw = measure(c, label.toUpperCase(), FN(700, 19), 5) + 62;
      c.save(); c.strokeStyle = ad.accent; c.lineWidth = 1.5;
      c.strokeRect(hair(S.w / 2 - tw / 2), hair(y - 25), tw, 50); c.restore();
      caps(c, label, S.w / 2, y, { size: 19, weight: 700, fill: ad.accent, align: 'center', track: 5 });
    }
    y += 46;
  }
  return { x: M, y, w: S.w - M * 2, bottom: S.h - 300 };
}
function storyFoot(c, ad, S, rows, cta) {
  const M = S.M, n = (rows || []).length;
  const ctaTop = S.h - 212;
  const rowsBottom = cta ? ctaTop - 34 : S.h - 118;
  let y = rowsBottom - n * 96;
  (rows || []).forEach(r => {
    rule(c, M, y, S.w - M * 2, ad.ruleSoft, 1);
    caps(c, r[1], M, y + 48, { size: 18, fill: ad.muted, track: 3.4 });
    text(c, r[0], S.w - M, y + 48, { font: FS(600, 44), fill: ad.ink, align: 'right', base: 'middle' });
    y += 96;
  });
  if (n) rule(c, M, y, S.w - M * 2, ad.ruleSoft, 1);
  if (cta) ctaMark(c, ad, cta, S.w / 2, ctaTop, { size: 29, h: 88, pad: 52 });
  caps(c, HOUSE.site + '   ·   ' + HOUSE.phone, S.w / 2, S.h - 70,
    { size: 19, fill: ad.muted, align: 'center', track: 3.8 });
}
/* where a story's own content has to stop so the foot has room */
function storyCeiling(S, rowCount, hasCta) {
  return (hasCta ? S.h - 246 : S.h - 118) - rowCount * 96 - 40;
}

function storyStatement(c, ad, P, S) {
  const B = storyStage(c, ad, S, P.storyLabel || P.topic);
  const serif = ad.id !== 'signal';
  const head = fitRich(c, P.storyTitle || P.title, { w: B.w, h: 520 }, {
    roman: s => serif ? FS(600, s) : FN(700, s),
    italic: s => serif ? FS(600, s, 'italic') : FN(500, s, 'italic'),
    max: 108, min: 46, leading: serif ? 1.06 : 1.0, maxLines: 6, track: serif ? 0 : -1.4
  });
  let y = B.y + 90;
  drawRich(c, head, S.w / 2, y, { fill: ad.ink, emFill: ad.accent, align: 'center' });
  y += head.height + 40;
  rule(c, S.w / 2 - 60, y, 120, ad.accent, 3);
  y += 56;
  para(c, P.sub, S.w / 2, y, B.w * .92, {
    font: FN(400, 31), fill: ad.body, leading: 47, align: 'center'
  });
  storyFoot(c, ad, S, (P.stats || []).slice(0, 2), P.storyCta || ('Call or text ' + HOUSE.phone));
}

function storyFigure(c, ad, P, S) {
  const B = storyStage(c, ad, S, P.figureLabel || P.topic);
  const cy = B.y + 300;
  if (P.figurePair) {
    [0, 1].forEach(i => {
      const px = S.w / 2 + (i ? 1 : -1) * S.w * .21;
      text(c, P.figurePair[i], px, cy, { font: FS(600, 210), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figurePairLabels[i], px, cy + 142, { size: 19, fill: ad.accent, align: 'center', track: 3.6 });
    });
    vrule(c, S.w / 2, cy - 100, 200, ad.rule, 1);
  } else {
    let sz = 250;
    while (measure(c, P.figure, FS(600, sz), 0) > B.w && sz > 80) sz -= 6;
    text(c, P.figure, S.w / 2, cy, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
    caps(c, P.figureSub, S.w / 2, cy + sz * .48, { size: 20, fill: ad.accent, align: 'center', track: 4 });
  }
  para(c, P.pull, S.w / 2, cy + 300, B.w * .94, {
    font: FS(400, 36, 'italic'), fill: ad.body, leading: 54, align: 'center'
  });
  storyFoot(c, ad, S, (P.stats || []).slice(0, 2), P.storyCta || ('Call or text ' + HOUSE.phone));
}

function storyListing(c, L, S) {
  const ad = AD.nocturne, M = S.M;
  nocturneField(c, ad, S, L.photo);
  logoLockup(c, S.w / 2, 118, 300, 'white', 'center');
  const label = L.closed ? 'JUST CLOSED' : 'JUST LISTED';
  const lw = measure(c, label, FN(700, 22), 6.5);
  caps(c, label, S.w / 2, 300, { size: 22, weight: 700, fill: ad.accent, align: 'center', track: 6.5 });
  rule(c, S.w / 2 - lw / 2, 324, lw, ad.accent, 2);

  let y = S.h - 470;
  const addr = fitBlock(c, L.addr, { w: S.w - M * 2, h: 260 }, {
    weight: 600, family: SERIF, max: 96, min: 44, leading: 1.06, maxLines: 3
  });
  drawBlock(c, addr, S.w / 2, y - addr.height, { fill: ad.ink, align: 'center', shadow: ['rgba(0,0,0,.5)', 26, 6] });
  caps(c, L.cityline, S.w / 2, y - addr.height - 52, { size: 19, fill: 'rgba(243,238,227,.7)', align: 'center', track: 4.6 });
  text(c, L.price, S.w / 2, y + 96, { font: FS(600, 104), fill: ad.ink, align: 'center', base: 'middle', shadow: ['rgba(0,0,0,.5)', 26, 6] });
  caps(c, L.useShort, S.w / 2, y + 172, { size: 19, fill: ad.accent, align: 'center', track: 4.2 });
  statRail(c, ad, L.stats.slice(0, 3), S.h - 190, S.w, 190);
}

function storyTeam(c, ad, S) {
  const B = storyStage(c, ad, S, 'The Team');
  let y = B.y + 70;
  text(c, 'Built on', S.w / 2, y, { font: FS(600, 92), fill: ad.ink, align: 'center', base: 'top' });
  text(c, 'repeat business', S.w / 2, y + 96, { font: FS(600, 92), fill: ad.ink, align: 'center', base: 'top' });
  y += 236;
  caps(c, HOUSE.firm + '  ·  ' + HOUSE.market, S.w / 2, y, { size: 19, fill: ad.accent, align: 'center', track: 4 });
  y += 40;
  const ceil = storyCeiling(S, 2, true);
  const step = Math.max(154, (ceil - y) / TEAM.length);
  TEAM.forEach((t, i) => {
    const ry = y + step * i + (step - 124) / 2, face = IMG[t.key];
    rule(c, S.M, ry - (step - 124) / 2, S.w - S.M * 2, ad.ruleSoft, 1);
    if (face) circleImg(c, face, 200, ry + 62, 60, ad.rule, 2);
    text(c, t.name, 292, ry + 42, { font: FS(600, 46), fill: ad.ink, base: 'middle' });
    caps(c, t.role, 292, ry + 86, { size: 17, fill: ad.accent, track: 3 });
    text(c, t.phone, S.w - S.M, ry + 62, { font: FN(500, 26), fill: ad.body, align: 'right', base: 'middle' });
  });
  storyFoot(c, ad, S, [[HOUSE.volume, 'Sales Volume'], [HOUSE.deals, 'Transactions']], 'Call or text ' + HOUSE.phone);
}

function storyReview(c, ad, P, S) {
  const B = storyStage(c, ad, S, 'Client Review');
  const q = fitBlock(c, '“' + P.quote + '”', { w: B.w * .96, h: 640 }, {
    weight: 500, family: SERIF, style: 'italic', max: 58, min: 32, leading: 1.36, maxLines: 11
  });
  /* centre the quote group between the label and the stat rows */
  const ceil = storyCeiling(S, 2, true);
  const groupH = 98 + q.height + 48 + 56 + 46;
  const top = B.y + Math.max(40, (ceil - B.y - groupH) / 2);
  stars(c, S.w / 2, top, 26, 68, ad.accent);
  let y = top + 98;
  drawBlock(c, q, S.w / 2, y, { fill: ad.ink, align: 'center' });
  y += q.height + 48;
  rule(c, S.w / 2 - 44, y, 88, ad.accent, 2);
  y += 56;
  text(c, P.by, S.w / 2, y, { font: FS(600, 46), fill: ad.ink, align: 'center', base: 'middle' });
  caps(c, P.byRole, S.w / 2, y + 46, { size: 17, fill: ad.muted, align: 'center', track: 3.4 });
  storyFoot(c, ad, S, [[HOUSE.deals, 'Transactions'], [HOUSE.volume, 'Sales Volume']], 'Thinking of selling?');
}
