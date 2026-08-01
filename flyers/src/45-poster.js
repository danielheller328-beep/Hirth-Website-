/* ══════════════════════════════════════════════════════════════════════════
   45-poster.js — PRESS: the screen-printed portrait poster

   The house piece. Daniel set large and bleeding off a corner, big type on
   the open field, the mark top-left and the contact line along the foot.

   The photograph runs as shot — no screen, no duotone, no filter. The frame
   masks it to a shape and crops it, and that is the whole treatment.

   The one constraint is resolution: the headshot on file is 240 x 240, so the
   plates are capped at roughly 2x that. Drop a larger headshot into
   assets/dh.png and every plate in every cut grows on its own.
   ══════════════════════════════════════════════════════════════════════════ */

const PRESS = {
  id: 'press', name: 'Press',
  paper: '#08161F', ink: '#F4EFE3', body: '#AEBFC9', muted: '#71838F',
  accent: '#C6A461', accent2: '#6FB6E8',
  plate: ['#0A1E2B', '#F2ECE0']          /* duotone: shadow, highlight */
};

/* ── the plate ────────────────────────────────────────────────────────────
   The photograph, as shot. No screen, no duotone, no filter — the frame just
   masks it to a shape and crops it.

   The only processing is a size cap. The headshot on file is 240 x 240, and
   an unedited photograph blown up past roughly 2x starts to look soft, so
   plateSize() refuses to draw one larger than that. It reads the cap off the
   file itself: drop a 1500px headshot into assets/dh.png and every plate in
   every cut gets correspondingly bigger on its own, with no other change.
   ─────────────────────────────────────────────────────────────────────── */
const MAX_UPSCALE = 2.2;

function plateSize(img, want) {
  if (!img) return want;
  return Math.min(want, img.naturalWidth * MAX_UPSCALE);
}

function plateShape(c, shape, x, y, w, h) {
  c.beginPath();
  if (shape === 'circle') c.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, 6.284);
  else if (shape === 'arch') {
    const rr = w / 2;
    c.moveTo(x, y + h); c.lineTo(x, y + rr);
    c.arc(x + rr, y + rr, rr, Math.PI, 0);
    c.lineTo(x + w, y + h); c.closePath();
  } else c.rect(x, y, w, h);
}

/* o.shape 'circle'|'rect'|'arch' · o.zoom · o.fx/fy focus point */
function portraitPhoto(c, img, x, y, w, h, o) {
  o = o || {};
  c.save();
  if (o.shadow) {
    c.save();
    c.shadowColor = o.shadow[0]; c.shadowBlur = o.shadow[1]; c.shadowOffsetY = o.shadow[2] || 0;
    c.fillStyle = 'rgba(0,0,0,1)';
    plateShape(c, o.shape || 'circle', x, y, w, h);
    c.fill();
    c.restore();
  }
  plateShape(c, o.shape || 'circle', x, y, w, h);
  c.clip();

  /* the mount the photograph sits on, where the source has transparency */
  if (o.paper) { c.fillStyle = o.paper; c.fillRect(x, y, w, h); }

  const zoom = o.zoom || 1;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(w / iw, h / ih) * zoom;
  const dw = iw * scale, dh = ih * scale;
  const fx = o.fx == null ? .5 : o.fx, fy = o.fy == null ? .5 : o.fy;
  c.imageSmoothingEnabled = true;
  c.imageSmoothingQuality = 'high';
  c.drawImage(img, x + w / 2 - dw * fx, y + h / 2 - dh * fy, dw, dh);
  c.restore();

  if (o.edge) {
    c.save();
    c.strokeStyle = o.edge; c.lineWidth = o.edgeWidth || 3;
    plateShape(c, o.shape || 'circle', x, y, w, h);
    c.stroke(); c.restore();
  }
}

/* the poster ground: deep field, one bloom, a screened corner, heavy tooth */
function pressGround(c, w, h, seed) {
  const g = c.createLinearGradient(0, 0, w * .4, h);
  g.addColorStop(0, '#0D2534'); g.addColorStop(.55, '#081824'); g.addColorStop(1, '#040E16');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  bloom(c, w, h, '#3E93C4', w * .18, h * .12, w * .9, .20);
  bloom(c, w, h, '#C6A461', w * .92, h * .96, w * .6, .12);
  halftone(c, 0, h * .30, w, h * .70, {
    color: 'rgba(255,255,255,.055)', pitch: 16, maxR: 5.4,
    density: (u, v) => clamp(v * 1.1, 0, 1)
  });
  vignette(c, w, h, .46);
  grain(c, w, h, .13, true);
}

/* a light press ground, for the cut that prints on paper instead of ink */
function pressGroundLight(c, w, h, seed) {
  paper(c, w, h, '#EFE8DA', seed);
  const g = c.createLinearGradient(0, 0, w * .4, h);
  g.addColorStop(0, 'rgba(255,255,255,.55)');
  g.addColorStop(1, 'rgba(150,138,116,.16)');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  halftone(c, 0, h * .3, w, h * .7, {
    color: 'rgba(20,40,55,.05)', pitch: 16, maxR: 5.4,
    density: (u, v) => clamp(v * 1.1, 0, 1)
  });
  vignette(c, w, h, .10);
}

/* the signature block, in whichever polarity the cut is printed */
function pressSig(c, x, y, o) {
  o = o || {};
  const ink = o.ink || PRESS.ink, dim = o.body || PRESS.body, faint = o.muted || PRESS.muted;
  const sh = o.shadow || ['rgba(2,10,16,.7)', 18, 4];
  const align = o.align || 'left';
  rule(c, align === 'right' ? x - 300 : align === 'center' ? x - 150 : x, y, 300,
    o.accentRule || rgba('#C6A461', .55), 1);
  text(c, HOUSE.agent, x, y + 46, {
    font: FS(600, o.size || 42), fill: ink, base: 'middle', align, shadow: sh
  });
  caps(c, HOUSE.role, x, y + 82, { size: 13, fill: o.accent || PRESS.accent, track: 3.2, align });
  caps(c, HOUSE.phone + '   ·   ' + HOUSE.site, x, y + 112, { size: 14, fill: dim, track: 3, align });
  caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, x, y + 140, { size: 11, fill: faint, track: 2.6, align });
}

/* the headline, set to the cut's measure */
function pressHead(c, P, x, y, boxW, maxSize, o) {
  o = o || {};
  const head = fitRich(c, P.line, { w: boxW, h: o.boxH || 340 }, {
    roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
    max: maxSize, min: 44, leading: 1.02, maxLines: o.maxLines || 4
  });
  foilRule(c, o.align === 'right' ? x - 128 : x, y - 34, 128, 3,
    o.foil || '#C6A461', o.foilHi || '#F0DFAE');
  drawRich(c, head, x, y, {
    fill: o.ink || PRESS.ink, emFill: o.em || '#E7CE93',
    align: o.align, shadow: o.shadow === false ? null : (o.shadow || ['rgba(2,10,16,.8)', 28, 8])
  });
  return head;
}

/* ══════════════════════════════════════════════════════════════════════════
   THE CUTS

   The poster comes round every week, so the portrait cannot be the same
   portrait every week. Four cuts rotate independently of the statement — a
   different plate shape, a different crop of his face, a different polarity
   of ink. Twelve weeks before a statement meets the same cut twice.
   ══════════════════════════════════════════════════════════════════════════ */
const POSTER_CUTS = [

  /* 1 · RONDEL — the photograph large, bleeding off the bottom-right */
  { id: 'rondel', name: 'Rondel',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const d = plateSize(face, 528), x = w - d * .72, y = h - d * .74;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 18, d / 2 + 54, 3, rgba('#C6A461', .22), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#C6A461', .85), edgeWidth: 3,
          shadow: ['rgba(0,0,0,.65)', 46, 14]
        });
      }
      logoLockup(c, M, LOGO_Y, 210, 'white');
      caps(c, P.kicker, w - M, LOGO_Y + 46, { size: 14, fill: PRESS.accent, align: 'right', track: 4 });
      pressHead(c, P, M, 250, w - M * 2 - 24, 100, { boxH: 300, maxLines: 3 });
      pressSig(c, M, h - 200);
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const d = plateSize(face, 528), x = w - d * .78, y = h - d - 300;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 20, d / 2 + 62, 3, rgba('#C6A461', .22), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#C6A461', .85), edgeWidth: 3,
          shadow: ['rgba(0,0,0,.65)', 50, 16]
        });
      }
      logoLockup(c, M, 120, 250, 'white');
      caps(c, P.kicker, M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 470, w - M * 2, 132, { boxH: 500, maxLines: 4 });
      pressSig(c, M, h - 230);
    } },

  /* 2 · CARD — the photograph mounted on a printed card laid on the sheet.
     The card carries the contact details, so the poster does not repeat them. */
  { id: 'card', name: 'Card',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      const cw = 396, ch = 620, cx = w - cw - 56, cy = h - ch - 56;
      c.save();
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 48; c.shadowOffsetY = 16;
      c.fillStyle = '#F2ECE0'; c.fillRect(cx, cy, cw, ch);
      c.restore();
      c.save();
      c.strokeStyle = rgba('#9A7A3E', .55); c.lineWidth = 1;
      c.strokeRect(hair(cx + 14), hair(cy + 14), cw - 28, ch - 28);
      c.restore();
      if (face) {
        const d = plateSize(face, 300);
        portraitPhoto(c, face, cx + (cw - d) / 2, cy + 44, d, d, {
          shape: 'circle', edge: rgba('#14222B', .18), edgeWidth: 2
        });
      }
      let ty = cy + 44 + plateSize(face, 300) + 62;
      text(c, HOUSE.agent, cx + cw / 2, ty, {
        font: FS(600, 36), fill: '#14222B', align: 'center', base: 'middle'
      });
      caps(c, HOUSE.role, cx + cw / 2, ty + 34, { size: 12, fill: '#9A7A3E', align: 'center', track: 3 });
      rule(c, cx + 70, ty + 60, cw - 140, 'rgba(20,34,43,.18)', 1);
      text(c, HOUSE.phone, cx + cw / 2, ty + 92, {
        font: FN(600, 26), fill: '#14222B', align: 'center', base: 'middle'
      });
      caps(c, HOUSE.site, cx + cw / 2, ty + 124, { size: 11, fill: '#6A7480', align: 'center', track: 2.8 });

      logoLockup(c, M, LOGO_Y, 200, 'white');
      caps(c, P.kicker, M, LOGO_Y + 152, { size: 14, fill: PRESS.accent, track: 4 });
      pressHead(c, P, M, 300, cx - M - 46, 74, { boxH: 470, maxLines: 6 });
      caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, M, h - 96, { size: 11, fill: PRESS.muted, track: 2.6 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      const cw = w - M * 2, ch = 470, cx = M, cy = h - ch - 150;
      c.save();
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 52; c.shadowOffsetY = 18;
      c.fillStyle = '#F2ECE0'; c.fillRect(cx, cy, cw, ch);
      c.restore();
      c.save();
      c.strokeStyle = rgba('#9A7A3E', .55); c.lineWidth = 1;
      c.strokeRect(hair(cx + 16), hair(cy + 16), cw - 32, ch - 32);
      c.restore();
      const d = plateSize(face, 320);
      if (face) portraitPhoto(c, face, cx + 56, cy + (ch - d) / 2, d, d, {
        shape: 'circle', edge: rgba('#14222B', .18), edgeWidth: 2
      });
      const tx = cx + 56 + d + 48;
      text(c, HOUSE.agent, tx, cy + ch / 2 - 52, { font: FS(600, 46), fill: '#14222B', base: 'middle' });
      caps(c, HOUSE.role, tx, cy + ch / 2 - 8, { size: 14, fill: '#9A7A3E', track: 3 });
      rule(c, tx, cy + ch / 2 + 22, cw - (tx - cx) - 56, 'rgba(20,34,43,.18)', 1);
      text(c, HOUSE.phone, tx, cy + ch / 2 + 66, { font: FN(600, 34), fill: '#14222B', base: 'middle' });
      caps(c, HOUSE.site, tx, cy + ch / 2 + 104, { size: 12, fill: '#6A7480', track: 2.8 });

      logoLockup(c, M, 130, 250, 'white');
      caps(c, P.kicker, M, 310, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 430, w - M * 2, 122, { boxH: 460, maxLines: 4 });
      caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, M, h - 88, { size: 12, fill: PRESS.muted, track: 2.6 });
    } },

  /* 3 · INVERSE — printed on paper: cream stock, dark type, photograph left */
  { id: 'inverse', name: 'Inverse',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGroundLight(c, w, h, S.seed);
      if (face) {
        const d = plateSize(face, 528), x = -d * .18, y = h - d * .92;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 18, d / 2 + 52, 3, rgba('#9A7A3E', .28), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#9A7A3E', .8), edgeWidth: 3,
          shadow: ['rgba(70,58,38,.30)', 42, 12]
        });
      }
      logoLockup(c, w - M, LOGO_Y, 200, 'color', 'right');
      caps(c, P.kicker, w - M, LOGO_Y + 152, { size: 14, fill: '#9A7A3E', align: 'right', track: 4 });
      pressHead(c, P, w - M, 300, w - M * 2 - 24, 94, {
        boxH: 340, maxLines: 3, align: 'right', ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, w - M, h - 210, {
        align: 'right', size: 38, ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGroundLight(c, w, h, S.seed);
      if (face) {
        const d = plateSize(face, 528), x = -d * .16, y = h - d - 300;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 20, d / 2 + 58, 3, rgba('#9A7A3E', .28), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#9A7A3E', .8), edgeWidth: 3,
          shadow: ['rgba(70,58,38,.30)', 46, 14]
        });
      }
      logoLockup(c, M, 130, 250, 'color');
      caps(c, P.kicker, M, 306, { size: 16, fill: '#9A7A3E', track: 4.4 });
      pressHead(c, P, M, 430, w - M * 2, 126, {
        boxH: 460, maxLines: 4, ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, M, h - 240, {
        ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    } },

  /* 4 · MEDALLION — smaller, centred, ringed; the words take the frame */
  { id: 'medallion', name: 'Medallion',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      guilloche(c, w * .78, h * .70, 330, {
        rings: 7, petals: 11, inner: .68, arm: .24, color: rgba('#C6A461', .16), weight: 1
      });
      if (face) {
        const d = plateSize(face, 384), x = w - d - 92, y = h - d - 168;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 16, d / 2 + 60, 4, rgba('#C6A461', .3), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#C6A461', .9), edgeWidth: 3,
          shadow: ['rgba(0,0,0,.6)', 42, 12]
        });
      }
      logoLockup(c, M, LOGO_Y, 210, 'white');
      caps(c, P.kicker, w - M, LOGO_Y + 46, { size: 14, fill: PRESS.accent, align: 'right', track: 4 });
      pressHead(c, P, M, 250, w - M * 2 - 24, 96, { boxH: 320, maxLines: 3 });
      pressSig(c, M, h - 230, { size: 38 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      guilloche(c, w / 2, h * .62, 420, {
        rings: 8, petals: 13, inner: .68, arm: .24, color: rgba('#C6A461', .14), weight: 1
      });
      if (face) {
        const d = plateSize(face, 440), x = (w - d) / 2, y = h - d - 470;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 18, d / 2 + 70, 4, rgba('#C6A461', .3), 1);
        portraitPhoto(c, face, x, y, d, d, {
          shape: 'circle', edge: rgba('#C6A461', .9), edgeWidth: 3,
          shadow: ['rgba(0,0,0,.6)', 46, 14]
        });
      }
      logoLockup(c, w / 2, 120, 250, 'white', 'center');
      caps(c, P.kicker, w / 2, 300, { size: 16, fill: PRESS.accent, align: 'center', track: 4.4 });
      pressHead(c, P, w / 2, 400, w - M * 2, 116, { boxH: 400, maxLines: 3, align: 'center' });
      pressSig(c, w / 2, h - 220, { align: 'center' });
    } }
];

function posterCut(weekN) { return POSTER_CUTS[Math.abs(weekN) % POSTER_CUTS.length]; }
function posterFrame(c, P, S) { posterCut(P.cutIndex == null ? 0 : P.cutIndex).feed(c, P, S); }
function posterStory(c, P, S) { posterCut(P.cutIndex == null ? 0 : P.cutIndex).story(c, P, S); }

/* ── the words ────────────────────────────────────────────────────────────
   Poster copy, not caption copy: three or four lines, short enough to set
   enormous, and the clause that carries the argument marked for emphasis.
   One is picked per week, so the poster changes with everything else.
   ─────────────────────────────────────────────────────────────────────── */
const POSTERS = [
  { id: 'p-worth', kicker: 'Broker’s Opinion of Value',
    line: 'Know what it is worth *before you need to.*',
    cap: `Know what it's worth before you need to.

Most owners find out what their building is worth at the worst possible moment — when a loan is maturing, when a partner wants out, when a tenant leaves. By then the number is not a decision, it is a constraint.

A broker's opinion of value costs nothing and takes a week. Current market, real comps, no obligation, no listing agreement attached to it.

Daniel Hirth · The Hirth Group
310.300.2838 · HirthGroup.com`,
    tags: '#BrokerOpinionOfValue #CommercialRealEstate #CRE #PropertyValuation #SellCommercial #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #ThinkingOfSelling #RealEstateStrategy #1031Exchange #CommercialProperty' },

  { id: 'p-number', kicker: 'How We Work',
    line: 'The first number you hear should be *the true one.*',
    cap: `The first number you hear should be the true one.

It is easy to win a listing by agreeing with whatever the owner hopes it is worth. It is also how a building sits on the market for fourteen months and sells for less than the first offer.

We would rather have the uncomfortable conversation in week one than the expensive one in month twelve.

197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

Daniel Hirth · 310.300.2838`,
    tags: '#CommercialRealEstate #CRE #SellCommercial #PropertyValuation #RealEstateStrategy #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #ListingStrategy #InvestmentProperty #ThinkingOfSelling #DaysOnMarket #BrokerOpinionOfValue' },

  { id: 'p-record', kicker: 'The Record',
    line: '197 deals. $471 million. *One phone number.*',
    cap: `197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

Not the loudest team in the room — the one that finds the deal everyone else walked past, and gets it closed. Valuation, disposition and 1031 guidance, start to finish.

Daniel Hirth · Managing Director
310.300.2838 · HirthGroup.com · CA DRE 01515796`,
    tags: '#CommercialRealEstate #CRE #RealEstateInvesting #LosAngelesRealEstate #LARealEstate #CREBroker #InvestmentProperty #1031Exchange #CommercialProperty #DealFlow #ValueAdd #HirthGroup #KWCommercial #NNN #SoldByHirth' },

  { id: 'p-cost', kicker: 'Pricing',
    line: 'Every seller has a number. *Know what yours costs.*',
    cap: `Every seller has a number. That is fine. Just know what the number costs to defend.

Fourteen months of carry. A vacancy you cover the whole time. A rate environment that does not wait for you. Buyers who move on and do not come back.

Holding out is a decision with a price on it. Most owners never see the invoice, because nobody puts the cost of waiting on the same page as the price.

That is the conversation worth having before you list.

Daniel Hirth · 310.300.2838`,
    tags: '#CommercialRealEstate #CRE #Pricing #SellCommercial #PropertyValuation #RealEstateStrategy #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #DaysOnMarket #InvestmentProperty #ThinkingOfSelling #BrokerOpinionOfValue' },

  { id: 'p-la', kicker: 'The Market',
    line: 'Commercial real estate in Los Angeles. *That is the whole list.*',
    cap: `Commercial real estate in Los Angeles. That is the whole list.

No relocation division, no residential arm, no second market we are learning on your deal. Retail, industrial, multifamily, mixed-use and land, in Greater LA, which is the only market we have spent nineteen years in.

Depth beats breadth when the question is what a specific parcel on a specific corner will actually trade for.

Daniel Hirth · The Hirth Group · 310.300.2838`,
    tags: '#LosAngelesRealEstate #LARealEstate #CommercialRealEstate #CRE #CREBroker #InvestmentProperty #SanFernandoValley #IndustrialRealEstate #RetailRealEstate #MultiFamily #HirthGroup #KWCommercial #CommercialProperty #DealFlow #1031Exchange' },

  { id: 'p-call', kicker: 'Thinking of Selling?',
    line: 'The conversation is free. *The mistake is not.*',
    cap: `The conversation is free. The mistake is not.

Mispricing a building by ten percent does not cost you ten percent — it costs you the first three weeks, which is when the buyers with money and a mandate actually look. They do not come back for the price cut.

Call before you decide the number, not after. No listing agreement, no obligation, no pressure.

Daniel Hirth · Managing Director
310.300.2838 · HirthGroup.com`,
    tags: '#ThinkingOfSelling #CommercialRealEstate #CRE #SellCommercial #BrokerOpinionOfValue #PropertyValuation #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty #RealEstateStrategy #1031Exchange #DaysOnMarket' }
];
