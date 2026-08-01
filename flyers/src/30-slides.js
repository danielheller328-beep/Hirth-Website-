/* ══════════════════════════════════════════════════════════════════════════
   30-slides.js — the compositions

   Four slide roles carry every content post:

       cover   the statement          points  the enumerated detail
       figure  the number             ask     the close

   Each of the six art directions composes all four its own way. That is 24
   distinct compositions rather than one template with six colour schemes,
   which is the whole point: two posts in the same week never rhyme.
   ══════════════════════════════════════════════════════════════════════════ */

const M0 = 68;                       /* page margin at 1080 */

/* set the field and the fixed furniture; hand back the live content box */
function stage(c, ad, S, o) {
  o = o || {};
  const w = S.w, h = S.h, M = S.M;
  ad.ground(c, w, h, S.seed);
  if (o.beforeChrome) o.beforeChrome();
  if (o.header !== false) ad.header(c, w, h, { M, label: o.label, sheet: S.sheetNo });
  if (o.footer !== false) ad.footer(c, w, h, { M, sheet: S.sheetNo, ref: o.ref });
  const top = { atelier: 222, signal: 226, dossier: 224, blueprint: 214, midnight: 208, nocturne: 208 }[ad.id];
  const botMap = { atelier: M + 92, midnight: 150, blueprint: M + 138, signal: 128, dossier: M + 96, nocturne: 152 };
  return { x: M, y: top, w: w - M * 2, h: (h - botMap[ad.id]) - top, bottom: h - botMap[ad.id] };
}

/* ══════════════════════════════════════════════════════════════════════════
   1 · ATELIER — the printed prospectus
   ══════════════════════════════════════════════════════════════════════════ */
const L_atelier = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.topic });
    /* oversized folio, set behind everything */
    text(c, S.no, S.w - S.M + 6, B.bottom - 70, {
      font: FS(600, 280), fill: rgba('#1C5C86', .07), align: 'right', base: 'alphabetic'
    });
    kicker(c, ad, P.kicker || 'The Brief', B.x, B.y + 18, { fill: ad.accent });
    const head = fitBlock(c, P.title, { w: B.w * .94, h: B.h * .52 }, {
      weight: 600, family: SERIF, max: 128, min: 48, leading: 1.02, maxLines: 5
    });
    let y = B.y + 66;
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 34;
    rule(c, B.x, y, 128, ad.accent, 3); y += 40;
    y = para(c, P.sub, B.x, y, B.w * .68, {
      font: FN(400, 29), fill: ad.body, leading: 43
    });
    /* the printer's furniture at the foot of the field */
    const bits = [P.topic.toUpperCase(), 'THE HIRTH GROUP', HOUSE.market];
    rule(c, B.x, B.bottom - 46, B.w, ad.ruleSoft, 1);
    let x = B.x;
    bits.forEach((b, i) => {
      const bw = caps(c, b, x, B.bottom - 20, { size: 13, fill: ad.muted, track: 3 });
      x += bw + 26;
      if (i < bits.length - 1) { diamond(c, x - 13, B.bottom - 21, 2.5, ad.accent2); }
    });
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'The Detail' });
    let y = B.y + 10;
    text(c, P.pointsTitle || 'In practice', B.x, y, { font: FS(600, 58), fill: ad.ink, base: 'top' });
    y += 78;
    rule(c, B.x, y, B.w, ad.rule, 1.5); y += 8;
    const rows = P.points.slice(0, 6);
    const avail = B.bottom - y - 12;
    const rowH = avail / rows.length;
    rows.forEach((r, i) => {
      const ry = y + rowH * i;
      if (i) rule(c, B.x, ry, B.w, ad.ruleSoft, 1);
      text(c, String(i + 1).padStart(2, '0'), B.x, ry + rowH / 2, {
        font: FS(600, 30), fill: ad.accent, base: 'middle'
      });
      const tx = B.x + 76, tw = B.w - 76;
      const lead = measure(c, r[0], FN(700, 26), 0);
      const lines = breakLines(c, r[0] + ' ' + r[1], tw, FN(400, 26), 0);
      let ty = ry + rowH / 2 - (lines.length - 1) * 19;
      lines.forEach((l, k) => {
        if (k === 0) {
          text(c, r[0], tx, ty, { font: FN(700, 26), fill: ad.ink, base: 'middle' });
          text(c, l.slice(r[0].length), tx + lead, ty, { font: FN(400, 26), fill: ad.body, base: 'middle' });
        } else text(c, l, tx, ty, { font: FN(400, 26), fill: ad.body, base: 'middle' });
        ty += 38;
      });
    });
  },

  figure(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.figureLabel || 'The Number' });
    const cx = S.w / 2;
    const pullH = paraHeight(c, '“' + P.pull + '”', B.w * .82, { font: FS(400, 34, 'italic'), leading: 50 });
    const figH = P.figurePair ? 430 : 400;
    let y = B.y + Math.max(20, (B.h - (figH + 112 + pullH)) / 2);
    caps(c, P.figureKicker || P.topic, cx, y, { size: 16, fill: ad.muted, align: 'center', track: 4.4 });
    y += 44;
    rule(c, cx - 190, y, 380, ad.rule, 1);
    if (P.figurePair) {
      const py = y + 150;
      [0, 1].forEach(i => {
        const px = cx + (i ? 1 : -1) * S.w * .19;
        text(c, P.figurePair[i], px, py, { font: FS(600, 176), fill: ad.ink, align: 'center', base: 'middle' });
        caps(c, P.figurePairLabels[i], px, py + 118, { size: 15, fill: ad.accent, align: 'center', track: 3.4 });
      });
      vrule(c, cx, py - 76, 152, ad.rule, 1);
      y = py + 176;
    } else {
      let sz = 240;
      while (measure(c, P.figure, FS(600, sz), 0) > B.w * .92 && sz > 80) sz -= 6;
      const py = y + sz * .62;
      text(c, P.figure, cx, py, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figureSub, cx, py + sz * .48, { size: 16, fill: ad.accent, align: 'center', track: 4 });
      y = py + sz * .48 + 56;
    }
    rule(c, cx - 190, y, 380, ad.rule, 1);
    y += 56;
    para(c, '“' + P.pull + '”', cx, y, B.w * .82, {
      font: FS(400, 34, 'italic'), fill: ad.body, leading: 50, align: 'center'
    });
  },

  ask(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Contact' });
    const cx = S.w / 2;
    let y = B.y + 22;
    caps(c, P.ctaKicker || 'Thinking about a deal?', cx, y, { size: 16, fill: ad.accent, align: 'center', track: 4.4 });
    y += 40;
    const head = fitBlock(c, P.cta, { w: B.w * .86, h: 190 }, {
      weight: 600, family: SERIF, style: 'italic', max: 66, min: 38, leading: 1.14, maxLines: 3
    });
    y = drawBlock(c, head, cx, y, { fill: ad.ink, align: 'center' });
    y += 30;
    diamond(c, cx, y, 4, ad.accent2);
    y += 40;
    const cw = B.w / 3;
    TEAM.forEach((t, i) => {
      const px = B.x + cw * i + cw / 2, face = IMG[t.key];
      if (face) circleImg(c, face, px, y + 62, 58, ad.rule, 1.5);
      else { c.fillStyle = ad.panel; c.beginPath(); c.arc(px, y + 62, 58, 0, 7); c.fill(); }
      text(c, t.name, px, y + 158, { font: FS(600, 28), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, t.role, px, y + 188, { size: 12, fill: ad.accent, align: 'center', track: 2.6 });
      text(c, t.phone, px, y + 218, { font: FN(400, 19), fill: ad.muted, align: 'center', base: 'middle' });
    });
    ctaMark(c, ad, 'Call or text ' + HOUSE.phone, cx, B.bottom - 96, { size: 26 });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   2 · MIDNIGHT — quiet, low-anchored, one accent
   ══════════════════════════════════════════════════════════════════════════ */
const L_midnight = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.topic });
    vrule(c, B.x - 26, B.y, B.h, ad.ruleSoft, 1);
    const head = fitBlock(c, P.title, { w: B.w * .92, h: B.h * .5 }, {
      weight: 600, family: SERIF, max: 120, min: 46, leading: 1.03, maxLines: 5
    });
    const subH = paraHeight(c, P.sub, B.w * .66, { font: FN(400, 28), leading: 42 });
    /* anchored to the foot of the field: the air sits above the type */
    let y = B.bottom - subH - 46 - head.height;
    c.fillStyle = ad.accent; c.fillRect(B.x - 26, y + 14, 3, head.height - 8);
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 46;
    para(c, P.sub, B.x, y, B.w * .66, { font: FN(400, 28), fill: ad.body, leading: 42 });
    caps(c, S.no + ' / ' + S.total, S.w - S.M, B.y + 2, { size: 14, fill: ad.muted, align: 'right', track: 3 });
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'The Detail' });
    let y = B.y + 6;
    text(c, P.pointsTitle || 'In practice', B.x, y, { font: FS(600, 52), fill: ad.ink, base: 'top' });
    y += 90;
    const rows = P.points.slice(0, 6);
    const rowH = (B.bottom - y) / rows.length;
    rows.forEach((r, i) => {
      const ry = y + rowH * i;
      const ind = i * 14;                     /* the staircase indent */
      rule(c, B.x + ind, ry, B.w - ind, i ? ad.ruleSoft : ad.rule, 1);
      text(c, String(i + 1).padStart(2, '0'), S.w - S.M, ry + rowH / 2 + 4, {
        font: FS(600, 46), fill: rgba('#79BDEA', .30), align: 'right', base: 'middle'
      });
      const tx = B.x + ind, tw = B.w - ind - 96;
      const lead = measure(c, r[0], FN(700, 25), 0);
      const lines = breakLines(c, r[0] + ' ' + r[1], tw, FN(400, 25), 0);
      let ty = ry + rowH / 2 - (lines.length - 1) * 18;
      lines.forEach((l, k) => {
        if (k === 0) {
          text(c, r[0], tx, ty, { font: FN(700, 25), fill: ad.ink, base: 'middle' });
          text(c, l.slice(r[0].length), tx + lead, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        } else text(c, l, tx, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        ty += 36;
      });
    });
  },

  figure(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.figureLabel || 'The Number', footer: true });
    const split = S.w * .50;
    /* left field carries the number, right field the reasoning */
    c.save(); c.fillStyle = 'rgba(255,255,255,.028)'; c.fillRect(0, B.y - 40, split, B.bottom - B.y + 80); c.restore();
    vrule(c, split, B.y - 40, B.bottom - B.y + 80, ad.rule, 1);
    const cy = (B.y + B.bottom) / 2;
    if (P.figurePair) {
      text(c, P.figurePair[0], split / 2, cy - 62, { font: FS(600, 128), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figurePairLabels[0], split / 2, cy + 12, { size: 14, fill: ad.accent, align: 'center', track: 3.2 });
      text(c, P.figurePair[1], split / 2, cy + 96, { font: FS(600, 128), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figurePairLabels[1], split / 2, cy + 170, { size: 14, fill: ad.accent, align: 'center', track: 3.2 });
    } else {
      let sz = 172;
      while (measure(c, P.figure, FS(600, sz), 0) > split - 84 && sz > 56) sz -= 4;
      text(c, P.figure, split / 2, cy - 18, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figureSub, split / 2, cy + sz * .46, { size: 15, fill: ad.accent, align: 'center', track: 3.4 });
    }
    if (P.bars) {
      barSet(c, S.M, B.bottom - 168, split - S.M * 2, 118, P.bars, {
        hi: ad.accent, base: 'rgba(255,255,255,.10)', labelCol: ad.muted,
        valueCol: ad.body, valueSize: 20, gap: 20, round: true
      });
    }
    const rx = split + 52, rw = S.w - S.M - rx;
    let y = B.y + 14;
    caps(c, P.figureKicker || P.topic, rx, y, { size: 14, fill: ad.muted, track: 3.4 });
    y += 44;
    const q = fitBlock(c, P.pull, { w: rw, h: B.bottom - y - 40 }, {
      weight: 500, family: SERIF, style: 'italic', max: 42, min: 24, leading: 1.36, maxLines: 9
    });
    drawBlock(c, q, rx, y, { fill: ad.ink });
  },

  ask(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Contact' });
    let y = B.y + 16;
    kicker(c, ad, P.ctaKicker || 'Thinking about a deal?', B.x, y + 8);
    y += 54;
    const head = fitBlock(c, P.cta, { w: B.w * .88, h: 210 }, {
      weight: 600, family: SERIF, max: 74, min: 40, leading: 1.1, maxLines: 3
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 58;
    /* square crops, flush to the grid — no circles anywhere in this world */
    const gap = 22, sq = (B.w - gap * 2) / 3;
    TEAM.forEach((t, i) => {
      const px = B.x + (sq + gap) * i, face = IMG[t.key];
      c.save(); c.beginPath(); c.rect(px, y, sq, sq); c.clip();
      if (face) coverImg(c, face, px, y, sq, sq, .34);
      else { c.fillStyle = ad.panel; c.fillRect(px, y, sq, sq); }
      const g = c.createLinearGradient(0, y + sq * .45, 0, y + sq);
      g.addColorStop(0, 'rgba(5,9,13,0)'); g.addColorStop(1, 'rgba(5,9,13,.85)');
      c.fillStyle = g; c.fillRect(px, y, sq, sq);
      c.restore();
      c.save(); c.strokeStyle = ad.ruleSoft; c.lineWidth = 1; c.strokeRect(hair(px), hair(y), sq, sq); c.restore();
      text(c, t.name.split(' ')[0], px + 16, y + sq - 44, { font: FS(600, 26), fill: '#fff', base: 'middle' });
      caps(c, t.role, px + 16, y + sq - 18, { size: 11, fill: ad.accent, track: 2.2 });
    });
    y += sq + 44;
    ctaMark(c, ad, 'Call or text ' + HOUSE.phone, S.w / 2, Math.min(y, B.bottom - 88), { size: 26 });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   3 · BLUEPRINT — the drawing set
   ══════════════════════════════════════════════════════════════════════════ */
function dimLine(c, x1, y, x2, col, label, labelCol) {
  line(c, x1, y, x2, y, col, 1);
  [[x1, 1], [x2, -1]].forEach(e => {
    line(c, e[0], y - 7, e[0], y + 7, col, 1);
    line(c, e[0], y, e[0] + e[1] * 13, y - 5, col, 1);
    line(c, e[0], y, e[0] + e[1] * 13, y + 5, col, 1);
  });
  if (label) {
    const w = measure(c, label.toUpperCase(), FN(600, 13), 2.6) + 22;
    c.save(); c.fillStyle = '#0A2437'; c.fillRect((x1 + x2) / 2 - w / 2, y - 11, w, 22); c.restore();
    caps(c, label, (x1 + x2) / 2, y, { size: 13, fill: labelCol || col, align: 'center', track: 2.6 });
  }
}
const L_blueprint = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.topic });
    cropMarks(c, S.w, S.h, 26, 22, rgba('#59C6F2', .45), 1);
    let y = B.y + 40;
    dimLine(c, B.x, y, B.x + B.w, ad.accent, 'sheet width', ad.body);
    y += 46;
    const head = fitBlock(c, P.title, { w: B.w - 40, h: B.h * .46 }, {
      weight: 600, family: SERIF, max: 112, min: 44, leading: 1.05, maxLines: 5
    });
    /* the headline is drawn as a component, boxed and dimensioned */
    const boxH = head.height + 56;
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(B.x), hair(y), B.w, boxH);
    c.fillStyle = rgba('#59C6F2', .05); c.fillRect(B.x, y, B.w, boxH); c.restore();
    line(c, B.x, y, B.x + 26, y + 26, ad.rule, 1);
    drawBlock(c, head, B.x + 26, y + 28, { fill: ad.ink });
    /* the note is hung off the foot of the field, not stacked under the box —
       otherwise a short headline leaves a dead band across the middle */
    const noteH = paraHeight(c, P.sub, B.w * .78, { font: FN(400, 27), leading: 41 });
    y = Math.max(y + boxH + 40, B.bottom - noteH - 34);
    caps(c, 'note', B.x, y - 26, { size: 13, fill: ad.accent, track: 3 });
    rule(c, B.x + 66, y - 26, B.w - 66, ad.ruleSoft, 1);
    para(c, P.sub, B.x, y, B.w * .78, { font: FN(400, 27), fill: ad.body, leading: 41 });
    /* left-hand scale rail */
    const rt = B.y + 40, rb = B.bottom - 10;
    vrule(c, B.x - 30, rt, rb - rt, ad.rule, 1);
    for (let t = rt; t <= rb; t += (rb - rt) / 8) line(c, B.x - 36, t, B.x - 24, t, ad.ruleSoft, 1);
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Schedule' });
    let y = B.y + 4;
    text(c, P.pointsTitle || 'Sequence', B.x, y, { font: FS(600, 50), fill: ad.ink, base: 'top' });
    y += 82;
    const rows = P.points.slice(0, 6);
    const rowH = (B.bottom - y - 6) / rows.length;
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(B.x), hair(y), B.w, rowH * rows.length); c.restore();
    rows.forEach((r, i) => {
      const ry = y + rowH * i;
      if (i) rule(c, B.x, ry, B.w, ad.ruleSoft, 1);
      if (i % 2) { c.save(); c.fillStyle = rgba('#59C6F2', .045); c.fillRect(B.x + 1, ry + 1, B.w - 2, rowH - 2); c.restore(); }
      vrule(c, B.x + 96, y, rowH * rows.length, ad.ruleSoft, 1);
      caps(c, String(i + 1).padStart(2, '0'), B.x + 34, ry + rowH / 2, { size: 22, weight: 600, fill: ad.accent, track: 1.5 });
      const tx = B.x + 122, tw = B.w - 122 - 30;
      const lead = measure(c, r[0], FN(700, 25), 0);
      const lines = breakLines(c, r[0] + ' ' + r[1], tw, FN(400, 25), 0);
      let ty = ry + rowH / 2 - (lines.length - 1) * 18;
      lines.forEach((l, k) => {
        if (k === 0) {
          text(c, r[0], tx, ty, { font: FN(700, 25), fill: ad.ink, base: 'middle' });
          text(c, l.slice(r[0].length), tx + lead, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        } else text(c, l, tx, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        ty += 36;
      });
    });
  },

  figure(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.figureLabel || 'Measure' });
    const cx = S.w / 2, cy = B.y + B.h * .36;
    if (P.figurePair) {
      [0, 1].forEach(i => {
        const px = cx + (i ? 1 : -1) * S.w * .20;
        text(c, P.figurePair[i], px, cy, { font: FS(600, 168), fill: ad.ink, align: 'center', base: 'middle' });
        caps(c, P.figurePairLabels[i], px, cy + 116, { size: 14, fill: ad.accent, align: 'center', track: 3.2 });
      });
      dimLine(c, cx - S.w * .32, cy + 168, cx + S.w * .32, ad.accent, 'the window', ad.body);
    } else {
      let sz = 208;
      while (measure(c, P.figure, FS(600, sz), 0) > B.w * .82 && sz > 70) sz -= 5;
      const tw = measure(c, P.figure, FS(600, sz), 0);
      text(c, P.figure, cx, cy, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
      /* extension lines out to the measured value */
      vrule(c, cx - tw / 2 - 30, cy - sz * .42, sz * .84, ad.ruleSoft, 1);
      vrule(c, cx + tw / 2 + 30, cy - sz * .42, sz * .84, ad.ruleSoft, 1);
      dimLine(c, cx - tw / 2 - 30, cy + sz * .60, cx + tw / 2 + 30, ad.accent, P.figureSub, ad.body);
    }
    let y = cy + (P.figurePair ? 226 : 200);
    if (P.bars) {
      barSet(c, B.x + 40, y, B.w - 80, 148, P.bars, {
        hi: ad.accent, base: 'rgba(140,205,240,.16)', labelCol: ad.muted, valueCol: ad.ink, gap: 22
      });
      y += 210;
    }
    para(c, P.pull, cx, Math.min(y, B.bottom - 96), B.w * .84, {
      font: FN(400, 27), fill: ad.body, leading: 40, align: 'center'
    });
  },

  ask(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Contact' });
    let y = B.y + 10;
    caps(c, P.ctaKicker || 'Thinking about a deal?', B.x, y + 10, { size: 15, fill: ad.accent, track: 3.6 });
    y += 48;
    const head = fitBlock(c, P.cta, { w: B.w * .9, h: 200 }, {
      weight: 600, family: SERIF, max: 70, min: 38, leading: 1.1, maxLines: 3
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 50;
    /* the roster, drawn as a component schedule */
    const cellH = 132, cw = B.w / 3;
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(B.x), hair(y), B.w, cellH); c.restore();
    TEAM.forEach((t, i) => {
      const px = B.x + cw * i, face = IMG[t.key];
      if (i) vrule(c, px, y, cellH, ad.rule, 1);
      if (face) {
        c.save(); c.beginPath(); c.rect(px + 18, y + 20, 92, 92); c.clip();
        coverImg(c, face, px + 18, y + 20, 92, 92, .32); c.restore();
        c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1; c.strokeRect(hair(px + 18), hair(y + 20), 92, 92); c.restore();
      }
      text(c, t.name, px + 126, y + 48, { font: FS(600, 25), fill: ad.ink, base: 'middle' });
      caps(c, t.role, px + 126, y + 76, { size: 11, fill: ad.accent, track: 2.2 });
      text(c, t.phone, px + 126, y + 102, { font: FN(400, 18), fill: ad.body, base: 'middle' });
    });
    y += cellH + 46;
    ctaMark(c, ad, 'Call or text ' + HOUSE.phone, S.w / 2, Math.min(y, B.bottom - 86), { size: 25 });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   4 · SIGNAL — Swiss grid, sans headline, one flat accent field
   ══════════════════════════════════════════════════════════════════════════ */
const L_signal = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.topic });
    const colW = B.w / 12;
    /* the accent field: a full-bleed column block, position varies by post */
    const slot = 8 + (S.rnd() > .5 ? 1 : 0);
    c.fillStyle = ad.accent;
    c.fillRect(B.x + colW * slot, 0, colW * (12 - slot) + S.M, B.y - 22);
    let y = B.y + 14;
    caps(c, P.kicker || 'The Brief', B.x, y, { size: 15, fill: ad.accent, track: 3.6 });
    y += 40;
    const head = fitBlock(c, P.title, { w: B.w * .96, h: B.h * .56 }, {
      weight: 700, family: SANS, max: 104, min: 40, leading: .99, maxLines: 5, track: -1.6
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink, track: -1.6 });
    y += 40;
    rule(c, B.x, y, B.w, ad.ink, 3);
    y += 34;
    /* deck sits in the right six columns only — the grid stays visible */
    para(c, P.sub, B.x + colW * 6, y, colW * 6, { font: FN(400, 25), fill: ad.body, leading: 38 });
    caps(c, S.no + ' — ' + S.total, B.x, y + 8, { size: 14, fill: ad.muted, track: 3 });
    /* the figures fill the left half rather than leaving it dead */
    if (P.stats) {
      const sy = B.bottom - 96;
      rule(c, B.x, sy - 24, colW * 5, ad.rule, 1);
      P.stats.slice(0, 3).forEach((st, i) => {
        const sx = B.x + colW * 1.7 * i;
        text(c, st[0], sx, sy + 22, { font: FN(700, 38), fill: ad.ink, base: 'middle', track: -1 });
        caps(c, st[1], sx, sy + 58, { size: 12, fill: ad.muted, track: 2.4 });
      });
    }
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'The Detail' });
    let y = B.y + 8;
    text(c, P.pointsTitle || 'In practice', B.x, y, {
      font: FN(700, 50), fill: ad.ink, base: 'top', track: -1
    });
    y += 84;
    const rows = P.points.slice(0, 6);
    const cols = 2, rn = Math.ceil(rows.length / cols);
    const cw = B.w / cols, chH = (B.bottom - y) / rn;
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(B.x), hair(y), B.w, chH * rn); c.restore();
    rows.forEach((r, i) => {
      const cxi = i % cols, ryi = Math.floor(i / cols);
      const x = B.x + cw * cxi, ry = y + chH * ryi;
      if (cxi) vrule(c, x, y, chH * rn, ad.rule, 1);
      if (ryi) rule(c, B.x, ry, B.w, ad.rule, 1);
      c.fillStyle = ad.accent; c.fillRect(x + 26, ry + 26, 26, 5);
      text(c, String(i + 1).padStart(2, '0'), x + cw - 26, ry + 42, {
        font: FN(700, 22), fill: ad.muted, align: 'right', base: 'middle', track: 1
      });
      const tw = cw - 52;
      const lead = breakLines(c, r[0], tw, FN(700, 24), 0);
      const bodyH = paraHeight(c, r[1], tw, { font: FN(400, 22), leading: 31 });
      const blockH = lead.length * 32 + 4 + bodyH;
      let ty = ry + Math.max(58, (chH - blockH) / 2 + 8);
      lead.forEach(l => { text(c, l, x + 26, ty, { font: FN(700, 24), fill: ad.ink, base: 'top' }); ty += 32; });
      ty += 4;
      para(c, r[1], x + 26, ty, tw, { font: FN(400, 22), fill: ad.body, leading: 31 });
    });
  },

  figure(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.figureLabel || 'The Number' });
    let y = B.y + 16;
    caps(c, P.figureKicker || P.topic, B.x, y, { size: 15, fill: ad.accent, track: 3.6 });
    y += 46;
    if (P.figurePair) {
      [0, 1].forEach(i => {
        const px = B.x + (B.w / 2) * i;
        text(c, P.figurePair[i], px, y + 130, { font: FN(700, 168), fill: i ? ad.accent : ad.ink, base: 'middle', track: -5 });
        caps(c, P.figurePairLabels[i], px, y + 236, { size: 15, fill: ad.body, track: 3 });
      });
      y += 290;
    } else {
      let sz = 230;
      while (measure(c, P.figure, FN(700, sz), -6) > B.w && sz > 80) sz -= 6;
      text(c, P.figure, B.x, y + sz * .56, { font: FN(700, sz), fill: ad.ink, base: 'middle', track: -6 });
      y += sz * .56 + 44;
      caps(c, P.figureSub, B.x, y, { size: 16, fill: ad.accent, track: 3.4 });
      y += 46;
    }
    rule(c, B.x, y, B.w, ad.ink, 3); y += 40;
    if (P.bars) {
      barSet(c, B.x, y, B.w * .72, 132, P.bars, {
        hi: ad.accent, base: '#DDE2E7', labelCol: ad.muted, valueCol: ad.ink, gap: 26
      });
      y += 196;
    }
    para(c, P.pull, B.x, Math.min(y, B.bottom - 110), B.w * .84, {
      font: FN(400, 26), fill: ad.body, leading: 39
    });
  },

  ask(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Contact' });
    let y = B.y + 12;
    caps(c, P.ctaKicker || 'Thinking about a deal?', B.x, y + 8, { size: 15, fill: ad.accent, track: 3.6 });
    y += 50;
    const head = fitBlock(c, P.cta, { w: B.w * .94, h: 210 }, {
      weight: 700, family: SANS, max: 72, min: 38, leading: 1.04, maxLines: 3, track: -1.4
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink, track: -1.4 });
    y += 44;
    rule(c, B.x, y, B.w, ad.ink, 3); y += 40;
    const gap = 20, sq = (B.w - gap * 2) / 3;
    TEAM.forEach((t, i) => {
      const px = B.x + (sq + gap) * i, face = IMG[t.key];
      if (face) { c.save(); c.beginPath(); c.rect(px, y, sq, sq * .92); c.clip(); coverImg(c, face, px, y, sq, sq * .92, .3); c.restore(); }
      else { c.fillStyle = ad.panel; c.fillRect(px, y, sq, sq * .92); }
      text(c, t.name, px, y + sq * .92 + 34, { font: FN(700, 23), fill: ad.ink, base: 'middle' });
      caps(c, t.role, px, y + sq * .92 + 62, { size: 11, fill: ad.muted, track: 2.2 });
    });
    y += sq * .92 + 96;
    const bh = 84;
    c.fillStyle = ad.accent; c.fillRect(B.x, Math.min(y, B.bottom - bh), B.w, bh);
    const by = Math.min(y, B.bottom - bh);
    text(c, 'Call or text ' + HOUSE.phone, B.x + 30, by + bh / 2, { font: FN(700, 28), fill: '#fff', base: 'middle' });
    icon(c, 'arrow', B.x + B.w - 44, by + bh / 2, 26, '#fff', 2);
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   5 · DOSSIER — the file
   ══════════════════════════════════════════════════════════════════════════ */
function punchHoles(c, ad, h) {
  [0.28, 0.5, 0.72].forEach(t => {
    c.save();
    c.fillStyle = 'rgba(31,29,25,.16)';
    c.beginPath(); c.arc(30, h * t, 13, 0, 7); c.fill();
    c.fillStyle = 'rgba(255,255,255,.35)';
    c.beginPath(); c.arc(30, h * t - 2, 13, 0, 7); c.fill();
    c.restore();
  });
}
const L_dossier = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.topic, beforeChrome: null });
    punchHoles(c, ad, S.h);
    let y = B.y + 24;
    /* typed reference line */
    caps(c, 'SUBJECT', B.x, y, { size: 12, fill: ad.muted, track: 3 });
    rule(c, B.x + 96, y, B.w - 96, ad.ruleSoft, 1);
    y += 38;
    const head = fitBlock(c, P.title, { w: B.w * .94, h: B.h * .48 }, {
      weight: 600, family: SERIF, max: 116, min: 44, leading: 1.03, maxLines: 5
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 12;
    /* the oxide swipe under the headline */
    c.save(); c.fillStyle = rgba('#A6432B', .82);
    c.beginPath(); c.moveTo(B.x, y + 6); c.lineTo(B.x + B.w * .46, y);
    c.lineTo(B.x + B.w * .46, y + 15); c.lineTo(B.x, y + 21); c.closePath(); c.fill(); c.restore();
    y += 62;
    caps(c, 'summary', B.x, y, { size: 12, fill: ad.accent, track: 3 });
    y += 28;
    vrule(c, B.x, y, paraHeight(c, P.sub, B.w * .70 - 26, { font: FN(400, 27), leading: 41 }), ad.rule, 2);
    para(c, P.sub, B.x + 26, y, B.w * .70 - 26, { font: FN(400, 27), fill: ad.body, leading: 41 });
    if (P.stats) {
      const sy = B.bottom - 86;
      rule(c, B.x, sy - 20, B.w, ad.rule, 1.5);
      const cw = B.w / 3;
      P.stats.slice(0, 3).forEach((st, i) => {
        const sx = B.x + cw * i;
        if (i) vrule(c, sx - 20, sy - 6, 74, ad.ruleSoft, 1);
        caps(c, st[1], sx, sy + 12, { size: 12, fill: ad.muted, track: 2.8 });
        text(c, st[0], sx, sy + 48, { font: FS(600, 38), fill: ad.ink, base: 'middle' });
      });
    }
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Findings' });
    punchHoles(c, ad, S.h);
    let y = B.y + 10;
    text(c, P.pointsTitle || 'Findings', B.x, y, { font: FS(600, 52), fill: ad.ink, base: 'top' });
    y += 84;
    const rows = P.points.slice(0, 6);
    const headH = 42, rowH = (B.bottom - y - headH) / rows.length;
    /* table head */
    c.fillStyle = rgba('#1F1D19', .085); c.fillRect(B.x, y, B.w, headH);
    caps(c, 'item', B.x + 20, y + headH / 2, { size: 12, fill: ad.muted, track: 3 });
    caps(c, 'note', B.x + 120, y + headH / 2, { size: 12, fill: ad.muted, track: 3 });
    rule(c, B.x, y + headH, B.w, ad.rule, 1.5);
    rows.forEach((r, i) => {
      const ry = y + headH + rowH * i;
      if (i % 2) { c.fillStyle = 'rgba(255,255,255,.30)'; c.fillRect(B.x, ry, B.w, rowH); }
      if (i) rule(c, B.x, ry, B.w, ad.ruleSoft, 1);
      text(c, String(i + 1).padStart(2, '0'), B.x + 20, ry + rowH / 2, {
        font: FN(700, 22), fill: ad.accent, base: 'middle', track: 1
      });
      const tx = B.x + 100, tw = B.w - 120;
      const lead = measure(c, r[0], FN(700, 25), 0);
      const lines = breakLines(c, r[0] + ' ' + r[1], tw, FN(400, 25), 0);
      let ty = ry + rowH / 2 - (lines.length - 1) * 18;
      lines.forEach((l, k) => {
        if (k === 0) {
          text(c, r[0], tx, ty, { font: FN(700, 25), fill: ad.ink, base: 'middle' });
          text(c, l.slice(r[0].length), tx + lead, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        } else text(c, l, tx, ty, { font: FN(400, 25), fill: ad.body, base: 'middle' });
        ty += 36;
      });
    });
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1.5;
    c.strokeRect(hair(B.x), hair(y), B.w, headH + rowH * rows.length); c.restore();
  },

  figure(c, ad, P, S) {
    const B = stage(c, ad, S, { label: P.figureLabel || 'Exhibit' });
    punchHoles(c, ad, S.h);
    const cx = S.w / 2;
    const boxW = B.w * .82, boxH = P.figurePair ? 300 : 268;
    const pullH = paraHeight(c, P.pull, B.w * .82, { font: FS(400, 32, 'italic'), leading: 47 });
    let y = B.y + Math.max(20, (B.h - (52 + boxH + 62 + pullH)) / 2);
    caps(c, P.figureKicker || P.topic, cx, y, { size: 14, fill: ad.muted, align: 'center', track: 3.6 });
    y += 52;
    /* the stamp */
    c.save();
    c.translate(cx, y + boxH / 2); c.rotate(-0.022);
    c.strokeStyle = rgba('#A6432B', .75); c.lineWidth = 3;
    c.strokeRect(hair(-boxW / 2), hair(-boxH / 2), boxW, boxH);
    c.strokeStyle = rgba('#A6432B', .3); c.lineWidth = 1;
    c.strokeRect(hair(-boxW / 2 + 9), hair(-boxH / 2 + 9), boxW - 18, boxH - 18);
    if (P.figurePair) {
      [0, 1].forEach(i => {
        const px = (i ? 1 : -1) * boxW * .22;
        text(c, P.figurePair[i], px, -14, { font: FS(600, 128), fill: ad.ink, align: 'center', base: 'middle' });
        caps(c, P.figurePairLabels[i], px, 74, { size: 13, fill: ad.accent, align: 'center', track: 3 });
      });
      vrule(c, 0, -boxH / 2 + 40, boxH - 80, rgba('#1F1D19', .18), 1);
    } else {
      let sz = 156;
      while (measure(c, P.figure, FS(600, sz), 0) > boxW - 96 && sz > 54) sz -= 4;
      text(c, P.figure, 0, -12, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, P.figureSub, 0, sz * .44 + 16, { size: 14, fill: ad.accent, align: 'center', track: 3.2 });
    }
    c.restore();
    y += boxH + 62;
    rule(c, B.x + B.w * .14, y - 26, B.w * .72, ad.ruleSoft, 1);
    para(c, P.pull, cx, y, B.w * .82, {
      font: FS(400, 32, 'italic'), fill: ad.body, leading: 47, align: 'center'
    });
  },

  ask(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'Contact' });
    punchHoles(c, ad, S.h);
    let y = B.y + 14;
    caps(c, P.ctaKicker || 'Thinking about a deal?', B.x, y + 8, { size: 14, fill: ad.accent, track: 3.4 });
    y += 46;
    const head = fitBlock(c, P.cta, { w: B.w * .9, h: 200 }, {
      weight: 600, family: SERIF, max: 70, min: 38, leading: 1.1, maxLines: 3
    });
    y = drawBlock(c, head, B.x, y, { fill: ad.ink });
    y += 42;
    caps(c, 'prepared by', B.x, y, { size: 12, fill: ad.muted, track: 3 });
    rule(c, B.x + 130, y, B.w - 130, ad.ruleSoft, 1);
    y += 26;
    const rowH = 106;
    TEAM.forEach((t, i) => {
      const ry = y + rowH * i, face = IMG[t.key];
      if (i) rule(c, B.x, ry, B.w, ad.ruleSoft, 1);
      if (face) circleImg(c, face, B.x + 38, ry + rowH / 2, 34, rgba('#1F1D19', .22), 1.5);
      text(c, t.name, B.x + 92, ry + rowH / 2 - 12, { font: FS(600, 27), fill: ad.ink, base: 'middle' });
      caps(c, t.role, B.x + 92, ry + rowH / 2 + 18, { size: 12, fill: ad.accent, track: 2.4 });
      text(c, t.phone, B.x + B.w, ry + rowH / 2 - 10, { font: FN(600, 22), fill: ad.ink, align: 'right', base: 'middle' });
      caps(c, t.dre, B.x + B.w, ry + rowH / 2 + 18, { size: 11, fill: ad.muted, align: 'right', track: 2.2 });
    });
    y += rowH * 3 + 30;
    ctaMark(c, ad, 'Call or text ' + HOUSE.phone, S.w / 2, Math.min(y, B.bottom - 84), { size: 25 });
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   6 · NOCTURNE — photography-led
   ══════════════════════════════════════════════════════════════════════════ */
function nocturneField(c, ad, S, key, focus) {
  const img = key && IMG[key];
  if (img) {
    const duo = duotone(img, ad.duo[0], ad.duo[1], key, S.w, S.h);
    c.drawImage(duo, 0, 0);
    c.save(); c.globalCompositeOperation = 'multiply';
    c.fillStyle = 'rgba(8,26,38,.42)'; c.fillRect(0, 0, S.w, S.h); c.restore();
  } else {
    ad.ground(c, S.w, S.h, S.seed);
    /* when there is no photograph, an engraved arc carries the field */
    c.save();
    c.strokeStyle = rgba('#C6A461', .16); c.lineWidth = 1;
    for (let i = 0; i < 22; i++) {
      c.beginPath();
      c.arc(S.w * 1.02, S.h * .18, S.w * (.30 + i * .036), Math.PI * .58, Math.PI * 1.42);
      c.stroke();
    }
    c.restore();
  }
  /* scrims top and bottom so the furniture always has ground to sit on */
  let g = c.createLinearGradient(0, 0, 0, S.h * .30);
  g.addColorStop(0, 'rgba(4,16,24,.78)'); g.addColorStop(1, 'rgba(4,16,24,0)');
  c.fillStyle = g; c.fillRect(0, 0, S.w, S.h * .30);
  g = c.createLinearGradient(0, S.h * .40, 0, S.h);
  g.addColorStop(0, 'rgba(4,16,24,0)'); g.addColorStop(.62, 'rgba(4,16,24,.72)'); g.addColorStop(1, 'rgba(4,16,24,.94)');
  c.fillStyle = g; c.fillRect(0, S.h * .40, S.w, S.h * .60);
  grain(c, S.w, S.h, .09, true);
}
const L_nocturne = {
  cover(c, ad, P, S) {
    nocturneField(c, ad, S, P.photo);
    const M = S.M;
    ad.header(c, S.w, S.h, { M, label: P.topic });
    ad.footer(c, S.w, S.h, { M });
    const bottom = S.h - 152;
    const head = fitBlock(c, P.title, { w: S.w - M * 2, h: S.h * .40 }, {
      weight: 600, family: SERIF, max: 118, min: 44, leading: 1.02, maxLines: 5
    });
    const subH = paraHeight(c, P.sub, (S.w - M * 2) * .74, { font: FN(400, 27), leading: 41 });
    let y = bottom - subH - 44 - head.height;
    rule(c, M, y - 34, 118, ad.accent, 3);
    y = drawBlock(c, head, M, y, { fill: ad.ink, shadow: ['rgba(0,0,0,.55)', 24, 6] });
    y += 40;
    para(c, P.sub, M, y, (S.w - M * 2) * .74, { font: FN(400, 27), fill: ad.body, leading: 41 });
  },

  points(c, ad, P, S) {
    const M = S.M, split = S.w * .42;
    ad.ground(c, S.w, S.h, S.seed);
    /* photographic column on the left, list on the right */
    const img = P.photo && IMG[P.photo];
    if (img) {
      const duo = duotone(img, ad.duo[0], ad.duo[1], P.photo, split, S.h);
      c.drawImage(duo, 0, 0);
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(8,26,38,.34)'; c.fillRect(0, 0, split, S.h); c.restore();
    } else {
      c.fillStyle = 'rgba(255,255,255,.035)'; c.fillRect(0, 0, split, S.h);
      hatch(c, 0, 0, split, S.h, rgba('#C6A461', .07), 14, -Math.PI / 3);
    }
    vrule(c, split, 0, S.h, rgba('#C6A461', .5), 1);
    c.save();
    c.translate(56, S.h - 96); c.rotate(-Math.PI / 2);
    caps(c, P.topic, 0, 0, { size: 15, fill: ad.accent, track: 4.4 });
    c.restore();
    logoLockup(c, split + 44, M - 6, 186, 'white');
    const rx = split + 44, rw = S.w - M - rx;
    let y = M + 96;
    text(c, P.pointsTitle || 'In practice', rx, y, { font: FS(600, 46), fill: ad.ink, base: 'top' });
    y += 76;
    const rows = P.points.slice(0, 6);
    const rowH = (S.h - 150 - y) / rows.length;
    rows.forEach((r, i) => {
      const ry = y + rowH * i;
      rule(c, rx, ry, rw, i ? ad.ruleSoft : rgba('#C6A461', .45), 1);
      const lead = measure(c, r[0], FN(700, 23), 0);
      const lines = breakLines(c, r[0] + ' ' + r[1], rw, FN(400, 23), 0);
      let ty = ry + rowH / 2 - (lines.length - 1) * 17;
      lines.forEach((l, k) => {
        if (k === 0) {
          text(c, r[0], rx, ty, { font: FN(700, 23), fill: ad.ink, base: 'middle' });
          text(c, l.slice(r[0].length), rx + lead, ty, { font: FN(400, 23), fill: ad.body, base: 'middle' });
        } else text(c, l, rx, ty, { font: FN(400, 23), fill: ad.body, base: 'middle' });
        ty += 34;
      });
    });
    rule(c, rx, S.h - 150, rw, rgba('#C6A461', .45), 1);
    caps(c, HOUSE.phone + '   ·   ' + HOUSE.site, rx, S.h - 110, { size: 15, fill: ad.body, track: 3 });
  },

  figure(c, ad, P, S) {
    nocturneField(c, ad, S, P.photo2 || P.photo);
    const M = S.M;
    ad.header(c, S.w, S.h, { M, label: P.figureLabel || 'The Number' });
    ad.footer(c, S.w, S.h, { M });
    const cx = S.w / 2, cy = S.h * .46;
    if (P.figurePair) {
      [0, 1].forEach(i => {
        const px = cx + (i ? 1 : -1) * S.w * .20;
        text(c, P.figurePair[i], px, cy, {
          font: FS(600, 178), fill: ad.ink, align: 'center', base: 'middle', shadow: ['rgba(0,0,0,.5)', 30, 8]
        });
        caps(c, P.figurePairLabels[i], px, cy + 122, { size: 15, fill: ad.accent, align: 'center', track: 3.4 });
      });
      vrule(c, cx, cy - 84, 168, rgba('#C6A461', .5), 1);
    } else {
      let sz = 226;
      while (measure(c, P.figure, FS(600, sz), 0) > S.w - M * 2 - 40 && sz > 74) sz -= 6;
      text(c, P.figure, cx, cy, {
        font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle', shadow: ['rgba(0,0,0,.5)', 34, 10]
      });
      caps(c, P.figureSub, cx, cy + sz * .46, { size: 16, fill: ad.accent, align: 'center', track: 4 });
    }
    const y = S.h - 152 - 130;
    rule(c, cx - 60, y - 40, 120, rgba('#C6A461', .55), 1);
    para(c, '“' + P.pull + '”', cx, y, (S.w - M * 2) * .88, {
      font: FS(400, 31, 'italic'), fill: ad.body, leading: 46, align: 'center'
    });
  },

  ask(c, ad, P, S) {
    ad.ground(c, S.w, S.h, S.seed);
    const M = S.M, cx = S.w / 2;
    c.save();
    c.strokeStyle = rgba('#C6A461', .12); c.lineWidth = 1;
    for (let i = 0; i < 16; i++) { c.beginPath(); c.arc(cx, S.h * .42, 180 + i * 42, 0, 7); c.stroke(); }
    c.restore();
    let y = logoLockup(c, cx, M - 4, 236, 'white', 'center') + 34;
    caps(c, P.ctaKicker || 'Thinking about a deal?', cx, y, { size: 15, fill: ad.accent, align: 'center', track: 4.2 });
    y += 44;
    const head = fitBlock(c, P.cta, { w: (S.w - M * 2) * .9, h: 210 }, {
      weight: 600, family: SERIF, max: 74, min: 40, leading: 1.1, maxLines: 3
    });
    y = drawBlock(c, head, cx, y, { fill: ad.ink, align: 'center' });
    y += 34;
    rule(c, cx - 46, y, 92, rgba('#C6A461', .6), 1);
    y += 46;
    const cw = (S.w - M * 2) / 3;
    TEAM.forEach((t, i) => {
      const px = M + cw * i + cw / 2, face = IMG[t.key];
      if (face) circleImg(c, face, px, y + 62, 60, rgba('#C6A461', .7), 2);
      text(c, t.name, px, y + 162, { font: FS(600, 27), fill: ad.ink, align: 'center', base: 'middle' });
      caps(c, t.role, px, y + 192, { size: 11, fill: ad.accent, align: 'center', track: 2.4 });
      text(c, t.phone, px, y + 220, { font: FN(400, 19), fill: ad.muted, align: 'center', base: 'middle' });
    });
    y += 262;
    ctaMark(c, ad, 'Call or text ' + HOUSE.phone, cx, Math.min(y, S.h - 152 - 92), { size: 26 });
    ad.footer(c, S.w, S.h, { M });
  }
};

const LAYOUT = {
  atelier: L_atelier, midnight: L_midnight, blueprint: L_blueprint,
  signal: L_signal, dossier: L_dossier, nocturne: L_nocturne
};
