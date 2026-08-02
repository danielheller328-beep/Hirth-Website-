/* ══════════════════════════════════════════════════════════════════════════
   30-slides.js — the compositions

   Four slide roles carry every content post:

       cover   the statement          points  the enumerated detail
       figure  the number             ask     the close

   Each of the six art directions composes all four its own way, on its own
   drawn imagery, with its own ornament. Twenty-four compositions, not one
   composition recoloured six times.

   Headlines are set mixed-style: the clause carrying the argument is wrapped
   in *asterisks* in the copy and comes out italic and in the accent, with the
   line breaker measuring each run in its own font.
   ══════════════════════════════════════════════════════════════════════════ */

const M0 = 68;                       /* page margin at 1080 */

/* set the field and the fixed furniture; hand back the live content box */
function stage(c, ad, S, o) {
  o = o || {};
  const w = S.w, h = S.h, M = S.M;
  ad.ground(c, w, h, S.seed);
  if (o.art) o.art();                       /* imagery goes under the furniture */
  if (o.header !== false) ad.header(c, w, h, { M, label: o.label, sheet: S.sheetNo });
  if (o.footer !== false) ad.footer(c, w, h, { M, sheet: S.sheetNo, ref: o.ref });
  const top = { atelier: 222, signal: 226, dossier: 224, blueprint: 214, midnight: 208, nocturne: 208 }[ad.id];
  const botMap = { atelier: M + 92, midnight: 150, blueprint: M + 138, signal: 128, dossier: M + 96, nocturne: 152 };
  return { x: M, y: top, w: w - M * 2, h: (h - botMap[ad.id]) - top, bottom: h - botMap[ad.id] };
}

/* a two-line raised initial, set on the cap height of the first line */
function dropCap(c, str, x, y, maxW, o) {
  o = o || {};
  const size = o.size || 27, lead = o.leading || 41;
  const first = str.trim()[0];
  const rest = str.trim().slice(1);
  const capSize = o.capSize || lead * 2.05;
  const capW = measure(c, first, FS(600, capSize), 0);
  text(c, first, x, y + lead * 1.62, { font: FS(600, capSize), fill: o.capFill || o.fill, base: 'alphabetic' });
  const indent = capW + 14;
  /* the first two lines are set short to clear the initial */
  const lines = breakLines(c, rest, maxW - indent, FN(400, size), 0);
  let yy = y, used = 0;
  const head = [];
  while (used < 2 && lines.length) { head.push(lines.shift()); used++; }
  head.forEach(l => {
    text(c, l, x + indent, yy, { font: FN(400, size), fill: o.fill, base: 'top' });
    yy += lead;
  });
  if (lines.length) {
    const remainder = lines.join(' ');
    yy = para(c, remainder, x, yy, maxW, { font: FN(400, size), fill: o.fill, leading: lead });
  }
  return yy;
}

/* the emphasis colour each world uses inside a headline */
function emColour(ad) {
  return { atelier: ad.accent, midnight: ad.accent, blueprint: ad.accent, signal: ad.accent, dossier: ad.accent, nocturne: ad.accent }[ad.id];
}

/* ══════════════════════════════════════════════════════════════════════════
   1 · ATELIER — the printed prospectus
   guilloché rosette · raised initial · marginalia · hanging folio
   ══════════════════════════════════════════════════════════════════════════ */
const L_atelier = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, {
      label: P.topic,
      art: () => {
        /* the engraving runs off the bottom-right corner, as it would on a
           certificate — cropped, not centred and decorative */
        guilloche(c, S.w * 1.0, S.h * 0.86, S.w * 0.50, {
          rings: 7, petals: 13, inner: .66, arm: .27,
          color: rgba('#1C5C86', .26), weight: 1
        });
        guilloche(c, S.w * 1.0, S.h * 0.86, S.w * 0.33, {
          rings: 5, petals: 8, inner: .58, arm: .34,
          color: rgba('#B08447', .24), weight: 1
        });
      }
    });
    const head = fitRich(c, P.title, { w: B.w * .94, h: B.h * .50 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 126, min: 46, leading: 1.02, maxLines: 5
    });
    /* the whole block is set as one optical unit and centred in the field —
       a short deck must not leave a dead band above the furniture */
    const deckH = paraHeight(c, P.sub, B.w * .70, { font: FN(400, 27), leading: 41 }) + 41;
    const groupH = head.height + 32 + 3 + 42 + deckH;
    let y = B.y + Math.max(52, (B.h - 60 - groupH) / 2);
    kicker(c, ad, P.kicker || 'The Brief', B.x, y - 42, { fill: ad.accent });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 32;
    rule(c, B.x, y, 128, ad.accent, 3);
    y += 42;
    dropCap(c, P.sub, B.x, y, B.w * .70, {
      size: 27, leading: 41, fill: ad.body, capFill: ad.accent
    });
    /* marginalia, set vertically in the outer margin */
    c.save();
    c.translate(S.w - 30, B.bottom - 66); c.rotate(-Math.PI / 2);
    caps(c, 'The Hirth Group · ' + HOUSE.market, 0, 0, { size: 12, fill: ad.muted, track: 3.4 });
    c.restore();
    /* the folio, hung below the furniture rule */
    rule(c, B.x, B.bottom - 46, B.w, ad.ruleSoft, 1);
    caps(c, P.topic, B.x, B.bottom - 20, { size: 13, fill: ad.muted, track: 3 });
    text(c, S.no + ' / ' + S.total, B.x + B.w, B.bottom - 20, {
      font: FS(600, 17), fill: ad.accent, align: 'right', base: 'middle'
    });
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, { label: 'The Detail' });
    let y = B.y + 6;
    text(c, P.pointsTitle || 'In practice', B.x, y, { font: FS(600, 56), fill: ad.ink, base: 'top' });
    y += 74;
    rule(c, B.x, y, B.w, ad.rule, 1.5); y += 8;
    const rows = P.points.slice(0, 6);
    const rowH = (B.bottom - y - 12) / rows.length;
    rows.forEach((r, i) => {
      const ry = y + rowH * i;
      if (i) rule(c, B.x, ry, B.w, ad.ruleSoft, 1);
      /* oldstyle folio in the margin, hung outside the text column */
      text(c, String(i + 1).padStart(2, '0'), B.x, ry + rowH / 2, {
        font: FS(600, 30), fill: ad.accent, base: 'middle', alpha: .9
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
    const cx = S.w / 2;
    const B = stage(c, ad, S, {
      label: P.figureLabel || 'The Number',
      art: () => guilloche(c, cx, S.h * .44, S.w * .40, {
        rings: 7, petals: 9, inner: .7, arm: .22,
        color: rgba('#1C5C86', .13), weight: 1
      })
    });
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
    /* An engraved calling card, struck on the sheet. The whole close is one
       object rather than a row of faces and a button. */
    const cx = S.w / 2;
    const B = stage(c, ad, S, {
      label: 'Contact',
      art: () => guilloche(c, cx, S.h * .52, S.w * .44, {
        rings: 8, petals: 11, inner: .7, arm: .22,
        color: rgba('#1C5C86', .14), weight: 1
      })
    });
    const cardW = B.w * .86, cardH = B.h * .82;
    const cardX = cx - cardW / 2, cardY = B.y + (B.h - cardH) / 2;
    c.save();
    c.shadowColor = 'rgba(60,50,32,.20)'; c.shadowBlur = 40; c.shadowOffsetY = 14;
    c.fillStyle = '#FAF6EE'; c.fillRect(cardX, cardY, cardW, cardH);
    c.restore();
    c.save();
    c.strokeStyle = rgba('#1C5C86', .5); c.lineWidth = 1;
    c.strokeRect(hair(cardX + 14), hair(cardY + 14), cardW - 28, cardH - 28);
    c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(cardX + 20), hair(cardY + 20), cardW - 40, cardH - 40);
    c.restore();
    /* corner fleurons */
    [[cardX + 20, cardY + 20], [cardX + cardW - 20, cardY + 20],
     [cardX + 20, cardY + cardH - 20], [cardX + cardW - 20, cardY + cardH - 20]]
      .forEach(pt => diamond(c, pt[0], pt[1], 4, ad.accent2));

    const head = fitRich(c, P.cta, { w: cardW - 130, h: 190 }, {
      roman: s => FS(600, s, 'italic'), italic: s => FS(600, s),
      max: 54, min: 30, leading: 1.16, maxLines: 3
    });
    const groupH = 42 + head.height + 34 + 44 + 128 + 74 + 34;
    let y = cardY + Math.max(54, (cardH - groupH) / 2);
    caps(c, P.ctaKicker || 'Thinking about a deal?', cx, y, {
      size: 14, fill: ad.muted, align: 'center', track: 4.2
    });
    y += 42;
    y = drawRich(c, head, cx, y, { fill: ad.ink, emFill: ad.accent, align: 'center' });
    y += 34;
    rule(c, cx - 44, y, 88, ad.accent, 2);
    y += 44;
    const face = IMG.dh;
    if (face) circleImg(c, face, cx, y + 52, 50, ad.rule, 1.5);
    y += 128;
    text(c, HOUSE.agent, cx, y, { font: FS(600, 40), fill: ad.ink, align: 'center', base: 'middle' });
    caps(c, HOUSE.role, cx, y + 34, { size: 12, fill: ad.accent, align: 'center', track: 3 });
    y += 74;
    text(c, HOUSE.phone, cx, y, { font: FN(600, 30), fill: ad.ink, align: 'center', base: 'middle' });
    caps(c, HOUSE.site + '   ·   ' + HOUSE.dre, cx, y + 34, {
      size: 11, fill: ad.muted, align: 'center', track: 2.8
    });
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   2 · MIDNIGHT — quiet, low-anchored, one accent
   contour field · outlined word bleeding off the frame · volumetric light
   ══════════════════════════════════════════════════════════════════════════ */
function outlineWord(c, str, x, y, size, col, weight, track) {
  c.save();
  c.font = FS(600, size);
  setTrack(c, track || 0);
  c.strokeStyle = col;
  c.lineWidth = weight || 1.5;
  c.textBaseline = 'alphabetic';
  c.strokeText(str, x, y);
  c.restore();
}
const L_midnight = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, {
      label: P.topic,
      art: () => {
        contourField(c, 0, S.h * .10, S.w, S.h * .46, S.seed, {
          lines: 30, color: t => rgba('#79BDEA', .04 + t * .07), amp: .30, weight: 1
        });
        /* the topic, set enormous in outline and cropped by the right edge */
        const word = (P.figure && String(P.figure).length <= 5 ? P.figure : P.topic.split(' ')[0]).toUpperCase();
        outlineWord(c, word, S.w * .30, S.h * .40, 300, rgba('#FFFFFF', .055), 2, 4);
      }
    });
    vrule(c, B.x - 26, B.y, B.h, ad.ruleSoft, 1);
    const head = fitRich(c, P.title, { w: B.w * .92, h: B.h * .5 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 118, min: 46, leading: 1.03, maxLines: 5
    });
    const subH = paraHeight(c, P.sub, B.w * .66, { font: FN(400, 28), leading: 42 });
    let y = B.bottom - subH - 46 - head.height;
    c.fillStyle = ad.accent; c.fillRect(B.x - 26, y + 14, 3, head.height - 8);
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 46;
    para(c, P.sub, B.x, y, B.w * .66, { font: FN(400, 28), fill: ad.body, leading: 42 });
    caps(c, S.no + ' / ' + S.total, S.w - S.M, B.y + 2, { size: 14, fill: ad.muted, align: 'right', track: 3 });
  },

  points(c, ad, P, S) {
    const B = stage(c, ad, S, {
      label: 'The Detail',
      art: () => contourField(c, 0, S.h * .52, S.w, S.h * .48, S.seed + 7, {
        lines: 22, color: t => rgba('#79BDEA', .02 + t * .04), amp: .22
      })
    });
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
    const split = S.w * .50;
    const B = stage(c, ad, S, {
      label: P.figureLabel || 'The Number',
      art: () => {
        c.save();
        c.fillStyle = 'rgba(255,255,255,.028)';
        c.fillRect(0, 0, split, S.h);
        c.restore();
        /* a shaft of light across the left panel */
        const g = c.createLinearGradient(0, S.h * .1, split, S.h * .8);
        g.addColorStop(0, 'rgba(121,189,234,.10)');
        g.addColorStop(.5, 'rgba(121,189,234,.02)');
        g.addColorStop(1, 'rgba(121,189,234,0)');
        c.fillStyle = g; c.fillRect(0, 0, split, S.h);
        contourField(c, split, 0, S.w - split, S.h, S.seed + 3, {
          lines: 18, color: t => rgba('#79BDEA', .02 + t * .035), amp: .3
        });
      }
    });
    vrule(c, split, B.y - 40, B.bottom - B.y + 80, ad.rule, 1);
    const cy = (B.y + B.bottom) / 2 - (P.bars ? 70 : 0);
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
    /* One portrait, printed on a pale plate down the right, rather than three
       thumbnails in a row. The person you are calling, not the org chart. */
    const B = stage(c, ad, S, { label: 'Contact' });
    const face = IMG.dh;
    const pw = plateSize(face, 420), ph = pw * 1.24;
    const px = S.w - pw;
    if (face) {
      portraitPhoto(c, face, px, S.h - ph, pw, ph, {
        key: 'dh', shape: 'rect', zoom: 1.06, fy: .46, paper: '#0A1119',
        shadow: ['rgba(0,0,0,.6)', 40, 12]
      });
      c.fillStyle = ad.accent; c.fillRect(px - 3, S.h - ph, 3, ph);
      c.fillStyle = ad.accent; c.fillRect(px, S.h - ph - 3, pw, 3);
    }
    let y = B.y + 26;
    kicker(c, ad, P.ctaKicker || 'Thinking about a deal?', B.x, y + 8);
    y += 58;
    const head = fitRich(c, P.cta, { w: B.w * .82, h: 300 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 66, min: 34, leading: 1.08, maxLines: 5
    });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 56;
    rule(c, B.x, y, px - B.x - 40, ad.rule, 1);
    y += 46;
    text(c, HOUSE.agent, B.x, y, { font: FS(600, 44), fill: ad.ink, base: 'middle' });
    caps(c, HOUSE.role, B.x, y + 38, { size: 13, fill: ad.accent, track: 3.2 });
    y += 86;
    text(c, HOUSE.phone, B.x, y, { font: FN(600, 40), fill: ad.ink, base: 'middle' });
    caps(c, HOUSE.site + '  ·  ' + HOUSE.dre, B.x, y + 38, { size: 12, fill: ad.muted, track: 2.8 });
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   3 · BLUEPRINT — the drawing set
   isometric massing · dimension lines · north arrow · scale bar · coordinates
   ══════════════════════════════════════════════════════════════════════════ */
function dimLine(c, x1, y, x2, col, label, labelCol, ground) {
  line(c, x1, y, x2, y, col, 1);
  [[x1, 1], [x2, -1]].forEach(e => {
    line(c, e[0], y - 7, e[0], y + 7, col, 1);
    line(c, e[0], y, e[0] + e[1] * 13, y - 5, col, 1);
    line(c, e[0], y, e[0] + e[1] * 13, y + 5, col, 1);
  });
  if (label) {
    const w = measure(c, label.toUpperCase(), FN(600, 13), 2.6) + 22;
    c.save(); c.fillStyle = ground || '#0A2437'; c.fillRect((x1 + x2) / 2 - w / 2, y - 11, w, 22); c.restore();
    caps(c, label, (x1 + x2) / 2, y, { size: 13, fill: labelCol || col, align: 'center', track: 2.6 });
  }
}
const L_blueprint = {
  cover(c, ad, P, S) {
    const B = stage(c, ad, S, {
      label: P.topic,
      art: () => {
        /* the block, extruded — the subject of every one of these posts */
        isoMassing(c, S.w * .52, 512, 70, 6, 6, S.seed, {
          top: 'rgba(89,198,242,.30)', left: 'rgba(20,66,96,.72)', right: 'rgba(12,42,62,.80)',
          heroTop: 'rgba(89,198,242,.62)', heroLeft: 'rgba(30,92,132,.85)', heroRight: 'rgba(18,58,84,.9)',
          edge: 'rgba(140,205,240,.22)', alpha: .95
        });
        /* fade the tops into the sheet rather than letting the header crop them */
        let g = c.createLinearGradient(0, 150, 0, 330);
        g.addColorStop(0, 'rgba(9,33,50,.96)'); g.addColorStop(1, 'rgba(9,33,50,0)');
        c.fillStyle = g; c.fillRect(0, 140, S.w, 200);
        g = c.createLinearGradient(0, 330, 0, 660);
        g.addColorStop(0, 'rgba(7,26,40,0)'); g.addColorStop(1, 'rgba(7,26,40,.92)');
        c.fillStyle = g; c.fillRect(0, 330, S.w, 340);
      }
    });
    cropMarks(c, S.w, S.h, 26, 22, rgba('#59C6F2', .45), 1);
    sheetCoords(c, B.x, B.y - 8, B.w, B.h, rgba('#8CCDF0', .30));
    northArrow(c, S.w - S.M - 22, B.y + 40, 22, rgba('#59C6F2', .7), ad.body);

    const head = fitRich(c, P.title, { w: B.w - 40, h: 300 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 96, min: 42, leading: 1.05, maxLines: 4
    });
    const noteH = paraHeight(c, P.sub, B.w * .74, { font: FN(400, 26), leading: 40 });
    const boxH = head.height + 52;
    let y = B.bottom - noteH - 56 - boxH - 40;
    c.save(); c.strokeStyle = ad.rule; c.lineWidth = 1;
    c.strokeRect(hair(B.x), hair(y), B.w, boxH);
    c.fillStyle = 'rgba(7,26,40,.72)'; c.fillRect(B.x + 1, y + 1, B.w - 2, boxH - 2); c.restore();
    line(c, B.x, y, B.x + 26, y + 26, ad.rule, 1);
    drawRich(c, head, B.x + 26, y + 26, { fill: ad.ink, emFill: ad.accent });
    y += boxH + 14;
    dimLine(c, B.x, y + 14, B.x + B.w, ad.accent, 'block frontage', ad.body, '#0B2739');
    y += 54;
    caps(c, 'note', B.x, y, { size: 13, fill: ad.accent, track: 3 });
    rule(c, B.x + 66, y, B.w - 66, ad.ruleSoft, 1);
    y += 26;
    para(c, P.sub, B.x, y, B.w * .74, { font: FN(400, 26), fill: ad.body, leading: 40 });
    scaleBar(c, B.x + B.w - 150, B.bottom - 24, 150, rgba('#59C6F2', .6), ad.muted, 'not to scale');
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
    const B = stage(c, ad, S, {
      label: P.figureLabel || 'Measure',
      art: () => isoMassing(c, S.w * .5, S.h - 150, 58, 5, 5, S.seed + 5, {
        top: 'rgba(89,198,242,.10)', left: 'rgba(20,66,96,.28)', right: 'rgba(12,42,62,.32)',
        edge: 'rgba(140,205,240,.10)', alpha: .8
      })
    });
    const cx = S.w / 2, cy = B.y + B.h * .34;
    if (P.figurePair) {
      [0, 1].forEach(i => {
        const px = cx + (i ? 1 : -1) * S.w * .20;
        text(c, P.figurePair[i], px, cy, { font: FS(600, 168), fill: ad.ink, align: 'center', base: 'middle' });
        caps(c, P.figurePairLabels[i], px, cy + 116, { size: 14, fill: ad.accent, align: 'center', track: 3.2 });
      });
      dimLine(c, cx - S.w * .32, cy + 168, cx + S.w * .32, ad.accent, 'the window', ad.body, '#0B2739');
    } else {
      let sz = 208;
      while (measure(c, P.figure, FS(600, sz), 0) > B.w * .82 && sz > 70) sz -= 5;
      const tw = measure(c, P.figure, FS(600, sz), 0);
      text(c, P.figure, cx, cy, { font: FS(600, sz), fill: ad.ink, align: 'center', base: 'middle' });
      vrule(c, cx - tw / 2 - 30, cy - sz * .42, sz * .84, ad.ruleSoft, 1);
      vrule(c, cx + tw / 2 + 30, cy - sz * .42, sz * .84, ad.ruleSoft, 1);
      dimLine(c, cx - tw / 2 - 30, cy + sz * .60, cx + tw / 2 + 30, ad.accent, P.figureSub, ad.body, '#0B2739');
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
    const head = fitRich(c, P.cta, { w: B.w * .9, h: 200 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 70, min: 38, leading: 1.1, maxLines: 3
    });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 50;
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
   4 · SIGNAL — Swiss grid, sans headline, flat colour, halftone screen
   ══════════════════════════════════════════════════════════════════════════ */
const L_signal = {
  cover(c, ad, P, S) {
    const colW = (S.w - M0 * 2) / 12;
    const slot = 7;
    const B = stage(c, ad, S, {
      label: P.topic,
      art: () => {
        /* the flat field: full-bleed to the top-right corner */
        c.fillStyle = ad.accent;
        c.fillRect(M0 + colW * slot, 0, colW * (12 - slot) + M0, 372);
        /* screened tint stepping down out of it */
        halftone(c, M0 + colW * slot, 372, colW * (12 - slot) + M0, 196, {
          color: ad.accent, pitch: 15, maxR: 6.0, alpha: .6,
          density: (u, v) => Math.pow(1 - v, 1.35)
        });
      }
    });
    /* an oversized ordinal cropped by the right edge, sitting in the field */
    text(c, S.no, S.w - 18, 300, {
      font: FN(700, 250), fill: 'rgba(255,255,255,.22)', align: 'right', base: 'alphabetic', track: -10
    });
    let y = B.y + 180;
    caps(c, P.kicker || 'The Brief', B.x, y, { size: 15, fill: ad.accent, track: 3.6 });
    y += 40;
    const head = fitRich(c, P.title, { w: colW * 11, h: 400 }, {
      roman: s => FN(700, s), italic: s => FN(500, s, 'italic'),
      max: 100, min: 40, leading: .99, maxLines: 5, track: -1.6
    });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 36;
    rule(c, B.x, y, B.w, ad.ink, 3);
    y += 32;
    para(c, P.sub, B.x + colW * 6, y, colW * 6, { font: FN(400, 25), fill: ad.body, leading: 38 });
    caps(c, S.no + ' — ' + S.total, B.x, y + 8, { size: 14, fill: ad.muted, track: 3 });
    /* the figures take the left half only — the deck already owns columns 7–12,
       and two figures set large read better here than three set small */
    if (P.stats) {
      const half = colW * 5.4, sy = B.bottom - 84, cw = half / 2;
      rule(c, B.x, sy - 26, half, ad.rule, 1);
      P.stats.slice(0, 2).forEach((st, i) => {
        const sx = B.x + cw * i;
        if (i) vrule(c, sx - 22, sy - 12, 76, ad.ruleSoft, 1);
        let sz = 40;
        while (measure(c, st[0], FN(700, sz), -1) > cw - 34 && sz > 18) sz -= 1;
        text(c, st[0], sx, sy + 22, { font: FN(700, sz), fill: ad.ink, base: 'middle', track: -1 });
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
    const B = stage(c, ad, S, {
      label: P.figureLabel || 'The Number',
      art: () => halftone(c, 0, S.h * .40, S.w, S.h * .52, {
        color: ad.accent, pitch: 17, maxR: 7.4, alpha: .5,
        density: (u, v) => clamp(1 - v * 1.25, 0, 1)
      })
    });
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
      /* the label goes under the ink, not under a fraction of the point size */
      const ink = inkBox(c, P.figure, FN(700, sz), -6);
      text(c, P.figure, B.x, y + ink.ascent, { font: FN(700, sz), fill: ad.ink, track: -6 });
      y += ink.ascent + ink.descent + 40;
      caps(c, P.figureSub, B.x, y, { size: 16, fill: ad.accent, track: 3.4 });
      y += 44;
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
    /* No portraits here. In this world the close is the number, set as large
       as the sheet allows, on a flat field. */
    const B = stage(c, ad, S, { label: 'Contact' });
    const colW = B.w / 12;
    c.fillStyle = ad.accent;
    c.fillRect(B.x + colW * 8, 0, colW * 4 + S.M, B.y - 22);
    halftone(c, B.x + colW * 8, B.y - 22, colW * 4 + S.M, 150, {
      color: ad.accent, pitch: 15, maxR: 6, alpha: .55,
      density: (u, v) => Math.pow(1 - v, 1.35)
    });
    let y = B.y + 18;
    caps(c, P.ctaKicker || 'Thinking about a deal?', B.x, y, { size: 15, fill: ad.accent, track: 3.6 });
    y += 46;
    const head = fitRich(c, P.cta, { w: colW * 9, h: 190 }, {
      roman: s => FN(700, s), italic: s => FN(500, s, 'italic'),
      max: 60, min: 32, leading: 1.06, maxLines: 3, track: -1.2
    });
    drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    /* the lower half hangs off the foot of the field, not off the headline */
    let sz = 150;
    while (measure(c, HOUSE.phone, FN(700, sz), -5) > B.w && sz > 60) sz -= 4;
    const cellY = B.bottom - 52;
    const numY = cellY - 46 - sz * .52;
    rule(c, B.x, cellY - 34, B.w, ad.rule, 1);
    text(c, HOUSE.phone, B.x, numY, {
      font: FN(700, sz), fill: ad.ink, base: 'middle', track: -5
    });
    caps(c, 'call or text', B.x, numY - sz * .56, { size: 14, fill: ad.muted, track: 3.4 });
    rule(c, B.x, numY - sz * .56 - 40, B.w, ad.ink, 3);
    y = cellY;
    const cells = [[HOUSE.agent, HOUSE.role], [HOUSE.site, 'Web'], [HOUSE.dre.replace('CA DRE ', ''), 'Licence']];
    const cw = B.w / 3;
    cells.forEach((cell, i) => {
      const x = B.x + cw * i;
      if (i) vrule(c, x - 20, y - 10, 60, ad.ruleSoft, 1);
      text(c, cell[0], x, y + 12, { font: FN(700, 22), fill: ad.ink, base: 'middle' });
      caps(c, cell[1], x, y + 42, { size: 11, fill: ad.muted, track: 2.4 });
    });
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   5 · DOSSIER — the file
   paperclip · index tab · oxide seal · redaction · ruled table
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
    const B = stage(c, ad, S, {
      label: P.topic,
      art: () => {
        /* the seal, struck off the right edge */
        guilloche(c, S.w * .86, S.h * .68, 250, {
          rings: 7, petals: 7, inner: .60, arm: .30,
          color: rgba('#A6432B', .26), weight: 1
        });
        engravedRings(c, S.w * .86, S.h * .68, 228, 256, 3, rgba('#A6432B', .3), 1);
        caps(c, 'THE HIRTH GROUP', S.w * .86, S.h * .68, {
          size: 13, fill: rgba('#A6432B', .34), align: 'center', track: 4
        });
      }
    });
    punchHoles(c, ad, S.h);
    fileTab(c, 300, 6, 176, 44, 'FILE ' + S.no, rgba('#A6432B', .82), '#F2ECE1');
    paperclip(c, B.x + 6, 6, 46, 'rgba(90,84,72,.75)');
    let y = B.y + 24;
    caps(c, 'SUBJECT', B.x, y, { size: 12, fill: ad.muted, track: 3 });
    rule(c, B.x + 96, y, B.w - 96, ad.ruleSoft, 1);
    y += 38;
    const head = fitRich(c, P.title, { w: B.w * .94, h: B.h * .44 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 112, min: 44, leading: 1.03, maxLines: 5
    });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
    y += 12;
    /* the oxide swipe, struck with a slight taper as a roller would leave it */
    c.save(); c.fillStyle = rgba('#A6432B', .82);
    c.beginPath(); c.moveTo(B.x, y + 6); c.lineTo(B.x + B.w * .46, y);
    c.lineTo(B.x + B.w * .46, y + 15); c.lineTo(B.x, y + 21); c.closePath(); c.fill(); c.restore();
    y += 62;
    caps(c, 'summary', B.x, y, { size: 12, fill: ad.accent, track: 3 });
    y += 28;
    const subH = paraHeight(c, P.sub, B.w * .70 - 26, { font: FN(400, 27), leading: 41 });
    vrule(c, B.x, y, subH, ad.rule, 2);
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
    const cx = S.w / 2;
    const B = stage(c, ad, S, {
      label: P.figureLabel || 'Exhibit',
      art: () => guilloche(c, cx, S.h * .44, 300, {
        rings: 5, petals: 9, inner: .64, arm: .28,
        color: rgba('#1F1D19', .07), weight: 1
      })
    });
    punchHoles(c, ad, S.h);
    const boxW = B.w * .82, boxH = P.figurePair ? 300 : 268;
    const pullH = paraHeight(c, P.pull, B.w * .82, { font: FS(400, 32, 'italic'), leading: 47 });
    let y = B.y + Math.max(20, (B.h - (52 + boxH + 62 + pullH)) / 2);
    caps(c, P.figureKicker || P.topic, cx, y, { size: 14, fill: ad.muted, align: 'center', track: 3.6 });
    y += 52;
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
    const head = fitRich(c, P.cta, { w: B.w * .9, h: 200 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 70, min: 38, leading: 1.1, maxLines: 3
    });
    y = drawRich(c, head, B.x, y, { fill: ad.ink, emFill: ad.accent });
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
   6 · NOCTURNE — photography-led, gold foil, strata
   ══════════════════════════════════════════════════════════════════════════ */
function nocturneField(c, ad, S, key, focus) {
  const img = key && IMG[key];
  if (img) {
    const duo = duotone(img, ad.duo[0], ad.duo[1], key, S.w, S.h);
    c.drawImage(duo, 0, 0);
    c.save(); c.globalCompositeOperation = 'multiply';
    c.fillStyle = 'rgba(8,26,38,.28)'; c.fillRect(0, 0, S.w, S.h); c.restore();
  } else {
    ad.ground(c, S.w, S.h, S.seed);
    /* no photograph: an engraved horizon carries the field instead */
    strata(c, 0, S.h * .30, S.w, S.h * .62, S.seed, { color: '#C6A461', alpha: .10, bands: 8 });
    c.save();
    c.strokeStyle = rgba('#C6A461', .16); c.lineWidth = 1;
    for (let i = 0; i < 22; i++) {
      c.beginPath();
      c.arc(S.w * 1.02, S.h * .18, S.w * (.30 + i * .036), Math.PI * .58, Math.PI * 1.42);
      c.stroke();
    }
    c.restore();
  }
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
    const head = fitRich(c, P.title, { w: S.w - M * 2, h: S.h * .40 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 116, min: 44, leading: 1.02, maxLines: 5
    });
    const subH = paraHeight(c, P.sub, (S.w - M * 2) * .74, { font: FN(400, 27), leading: 41 });
    let y = bottom - subH - 44 - head.height;
    foilRule(c, M, y - 36, 132, 3, '#C6A461', '#F0DFAE');
    y = drawRich(c, head, M, y, {
      fill: ad.ink, emFill: '#E4C98A', shadow: ['rgba(0,0,0,.55)', 24, 6]
    });
    y += 40;
    para(c, P.sub, M, y, (S.w - M * 2) * .74, { font: FN(400, 27), fill: ad.body, leading: 41 });
  },

  points(c, ad, P, S) {
    const M = S.M, split = S.w * .42;
    ad.ground(c, S.w, S.h, S.seed);
    const img = P.photo && IMG[P.photo];
    if (img) {
      const duo = duotone(img, ad.duo[0], ad.duo[1], P.photo, split, S.h);
      c.drawImage(duo, 0, 0);
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(8,26,38,.30)'; c.fillRect(0, 0, split, S.h); c.restore();
    } else {
      c.fillStyle = 'rgba(255,255,255,.035)'; c.fillRect(0, 0, split, S.h);
      guilloche(c, split * .5, S.h * .5, split * .66, {
        rings: 6, petals: 11, inner: .66, arm: .26, color: rgba('#C6A461', .14), weight: 1
      });
      strata(c, 0, S.h * .5, split, S.h * .5, S.seed + 2, { color: '#C6A461', alpha: .09, bands: 6 });
    }
    foilRule(c, split - 1, 0, 2, S.h, '#C6A461', '#F0DFAE');
    c.save();
    c.translate(56, S.h - 96); c.rotate(-Math.PI / 2);
    caps(c, P.topic, 0, 0, { size: 15, fill: ad.accent, track: 4.4 });
    c.restore();
    logoLockup(c, split + 44, LOGO_Y, 186, 'white');
    const rx = split + 44, rw = S.w - M - rx;
    let y = M + 128;
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
    engravedRings(c, cx, cy, 250, 330, 5, rgba('#C6A461', .13), 1);
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
    foilRule(c, cx - 60, y - 42, 120, 2, '#C6A461', '#F0DFAE');
    para(c, '“' + P.pull + '”', cx, y, (S.w - M * 2) * .88, {
      font: FS(400, 31, 'italic'), fill: ad.body, leading: 46, align: 'center'
    });
  },

  ask(c, ad, P, S) {
    /* Photography closes this world, the same way it opens it — not a row of
       circular headshots on a flat ground. */
    nocturneField(c, ad, S, P.photo);
    const M = S.M, cx = S.w / 2;
    c.save();
    c.fillStyle = 'rgba(4,16,24,.42)'; c.fillRect(0, 0, S.w, S.h);
    c.restore();
    logoLockup(c, M, LOGO_Y, 204, 'white');
    caps(c, 'Contact', S.w - M, LOGO_Y + 40, { size: 14, fill: ad.accent, align: 'right', track: 4 });

    const bottom = S.h - 152;
    const head = fitRich(c, P.cta, { w: S.w - M * 2, h: 320 }, {
      roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
      max: 88, min: 42, leading: 1.04, maxLines: 4
    });
    let y = bottom - 250 - head.height;
    caps(c, P.ctaKicker || 'Thinking about a deal?', M, y - 40, { size: 15, fill: ad.accent, track: 4.2 });
    y = drawRich(c, head, M, y, {
      fill: ad.ink, emFill: '#E4C98A', shadow: ['rgba(0,0,0,.6)', 26, 8]
    });
    y += 40;
    foilRule(c, M, y, 132, 3, '#C6A461', '#F0DFAE');
    y += 44;
    const face = IMG.dh;
    if (face) circleImg(c, face, M + 46, y + 40, 46, rgba('#C6A461', .75), 2);
    text(c, HOUSE.agent, M + 116, y + 26, { font: FS(600, 34), fill: ad.ink, base: 'middle' });
    caps(c, HOUSE.role, M + 116, y + 58, { size: 12, fill: ad.accent, track: 2.8 });
    text(c, HOUSE.phone, S.w - M, y + 30, {
      font: FN(600, 42), fill: ad.ink, align: 'right', base: 'middle',
      shadow: ['rgba(0,0,0,.5)', 18, 4]
    });
    caps(c, HOUSE.site, S.w - M, y + 64, { size: 13, fill: ad.accent, align: 'right', track: 3 });
    /* no house footer on this one — the block above already carries the number,
       and printing it twice on one frame reads as an oversight */
    rule(c, M, S.h - 92, S.w - M * 2, rgba('#C6A461', .3), 1);
    caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm + '  ·  ' + HOUSE.market, M, S.h - 58,
      { size: 11, fill: ad.muted, track: 2.6 });
  },
};

const LAYOUT = {
  atelier: L_atelier, midnight: L_midnight, blueprint: L_blueprint,
  signal: L_signal, dossier: L_dossier, nocturne: L_nocturne
};
