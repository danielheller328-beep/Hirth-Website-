/* ══════════════════════════════════════════════════════════════════════════
   45-poster.js — PRESS: the screen-printed portrait poster

   The house piece. Daniel set large and bleeding off a corner, big type on
   the open field, the mark top-left and the contact line along the foot.

   On the treatment: the headshot on file is 240px square and already masked
   to a circle, so blowing it up straight would be visibly soft. It is printed
   instead — a duotone plate under a coarse halftone screen, the way a
   portrait gets reproduced on a press. At this dot pitch the source
   resolution stops mattering and the softness reads as ink, not as a bad
   crop. Drop a larger headshot into assets/ and the same code prints it finer;
   nothing else has to change.
   ══════════════════════════════════════════════════════════════════════════ */

const PRESS = {
  id: 'press', name: 'Press',
  paper: '#08161F', ink: '#F4EFE3', body: '#AEBFC9', muted: '#71838F',
  accent: '#C6A461', accent2: '#6FB6E8',
  plate: ['#0A1E2B', '#F2ECE0']          /* duotone: shadow, highlight */
};

/* ── the plate ────────────────────────────────────────────────────────────
   Printed as a positive on a cream rondel: the disc is inked flat, then dark
   dots are laid over it with radius tracking darkness, which is how a
   portrait actually reproduces on a press. The earlier negative screen made
   the bright office window behind him print solid while his face dropped out
   — on a light ground the window simply falls away to clean paper and the
   face carries the tone, so no cutout is needed at all.
   ─────────────────────────────────────────────────────────────────────── */
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

/* o.shape 'circle'|'rect'|'arch' · o.zoom · o.fx/fy focus · o.invert polarity */
function portraitPlate(c, img, x, y, w, h, o) {
  o = o || {};
  const pitch = o.pitch || 6;
  const sw = Math.ceil(w), sh = Math.ceil(h);
  const off = document.createElement('canvas');
  off.width = sw; off.height = sh;
  const oc = off.getContext('2d');

  /* crop: scale the source about a focus point so the face can be framed
     tight on one cut and loose on the next */
  const zoom = o.zoom || 1;
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(sw / iw, sh / ih) * zoom;
  const dw = iw * scale, dh = ih * scale;
  const fx = o.fx == null ? .5 : o.fx, fy = o.fy == null ? .5 : o.fy;
  oc.drawImage(img, sw / 2 - dw * fx, sh / 2 - dh * fy, dw, dh);
  const px = oc.getImageData(0, 0, sw, sh).data;

  const sample = (ix, iy) => {
    const i = ((iy | 0) * sw + (ix | 0)) * 4;
    if (px[i + 3] < 90) return null;
    return (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
  };

  /* Auto-levels off the plate's own histogram. A headshot lit for a website
     occupies maybe half the available range; printed straight, the skin sits
     in a band too narrow for the screen to describe a face with, and the whole
     portrait collapses to hair-and-suit. Stretching the 2nd–98th percentile
     across the range is what a platemaker would do before burning it. */
  const hist = new Uint32Array(256);
  let count = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 90) continue;
    hist[(px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) | 0]++;
    count++;
  }
  let lo = 0, hi = 255, acc = 0;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc > count * 0.02) { lo = i; break; } }
  acc = 0;
  for (let i = 255; i >= 0; i--) { acc += hist[i]; if (acc > count * 0.02) { hi = i; break; } }
  const loN = lo / 255, hiN = Math.max(loN + 0.05, hi / 255);
  const levels = v => clamp((v - loN) / (hiN - loN), 0, 1);

  c.save();
  plateShape(c, o.shape || 'circle', x, y, w, h);
  c.clip();

  if (o.paper) { c.fillStyle = o.paper; c.fillRect(x, y, w, h); }

  if (o.plateAlpha) {
    c.globalAlpha = o.plateAlpha;
    const duo = duotone(off, (o.plate || PRESS.plate)[0], (o.plate || PRESS.plate)[1],
      (o.key || 'dh') + '|' + zoom + '|' + fx + '|' + fy, sw, sh);
    c.drawImage(duo, x, y, w, h);
    c.globalAlpha = 1;
  }

  c.fillStyle = o.ink || '#0B1E2B';
  const ang = o.angle == null ? -0.38 : o.angle;
  const cos = Math.cos(ang), sin = Math.sin(ang);
  const span = Math.hypot(sw, sh);
  const lift = o.lift == null ? 0.06 : o.lift;
  const invert = !!o.invert;                 /* light ink on a dark ground */
  for (let v = -span; v < span; v += pitch) {
    for (let u = -span; u < span; u += pitch) {
      const ix = sw / 2 + u * cos - v * sin, iy = sh / 2 + u * sin + v * cos;
      if (ix < 0 || iy < 0 || ix >= sw || iy >= sh) continue;
      const lum = sample(ix, iy);
      if (lum === null) continue;
      const t = invert ? levels(lum) : 1 - levels(lum);
      const d = clamp(Math.pow(t, o.gamma == null ? 0.95 : o.gamma) - lift, 0, 1);
      const rr = pitch * 0.72 * d;
      if (rr < 0.4) continue;
      c.beginPath();
      c.arc(x + ix, y + iy, rr, 0, 6.284);
      c.fill();
    }
  }
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
  rule(c, align === 'right' ? x - 300 : x, y, 300, o.accentRule || rgba('#C6A461', .55), 1);
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

  /* 1 · RONDEL — a struck coin, bleeding off the bottom-right */
  { id: 'rondel', name: 'Rondel',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const d = 664, x = 548, y = 540;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 16, d / 2 + 46, 3, rgba('#C6A461', .20), 1);
        portraitPlate(c, face, x, y, d, d, {
          key: P.who || 'dh', shape: 'circle', pitch: 5, gamma: .95, lift: .075,
          paper: '#F1EBDF', plateAlpha: .22, edge: rgba('#C6A461', .8), edgeWidth: 3
        });
      }
      logoLockup(c, M, LOGO_Y, 210, 'white');
      caps(c, P.kicker, w - M, LOGO_Y + 46, { size: 14, fill: PRESS.accent, align: 'right', track: 4 });
      pressHead(c, P, M, 246, w - M * 2 - 24, 104, { boxH: 300, maxLines: 3 });
      pressSig(c, M, h - 150);
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const d = 864, x = 474, y = h - 804;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 18, d / 2 + 54, 3, rgba('#C6A461', .20), 1);
        portraitPlate(c, face, x, y, d, d, {
          key: P.who || 'dh', shape: 'circle', pitch: 6, gamma: .95, lift: .075,
          paper: '#F1EBDF', plateAlpha: .22, edge: rgba('#C6A461', .8), edgeWidth: 3
        });
      }
      logoLockup(c, M, 120, 250, 'white');
      caps(c, P.kicker, M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 486, w - M * 2, 138, { boxH: 560, maxLines: 4 });
      pressSig(c, M, h - 300);
    } },

  /* 2 · COLUMN — a full-height plate down the right, cropped tight to the face */
  { id: 'column', name: 'Column',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      const px = 588;
      if (face) {
        portraitPlate(c, face, px, 0, w - px, h, {
          key: P.who || 'dh', shape: 'rect', pitch: 5, gamma: .95, lift: .06,
          zoom: 1.02, fy: .46, paper: '#F1EBDF', plateAlpha: .22
        });
        foilRule(c, px - 2, 0, 4, h, '#C6A461', '#F0DFAE');
      }
      logoLockup(c, M, LOGO_Y, 196, 'white');
      caps(c, P.kicker, M, LOGO_Y + 150, { size: 14, fill: PRESS.accent, track: 4 });
      pressHead(c, P, M, 306, px - M - 40, 78, { boxH: 470, maxLines: 6 });
      pressSig(c, M, h - 200, { size: 36 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      const py = 1010;
      if (face) {
        portraitPlate(c, face, 0, py, w, h - py, {
          key: P.who || 'dh', shape: 'rect', pitch: 6, gamma: .95, lift: .06,
          zoom: 1.0, fy: .40, paper: '#F1EBDF', plateAlpha: .22
        });
        foilRule(c, 0, py - 2, w, 4, '#C6A461', '#F0DFAE');
      }
      logoLockup(c, M, 130, 250, 'white');
      caps(c, P.kicker, M, 310, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 420, w - M * 2, 128, { boxH: 480, maxLines: 4 });
      pressSig(c, M, py - 190);
    } },

  /* 3 · INVERSE — printed on paper: dark ink, cream stock, the plate on the left */
  { id: 'inverse', name: 'Inverse',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGroundLight(c, w, h, S.seed);
      const pw = 470;
      if (face) {
        portraitPlate(c, face, -30, 0, pw, h, {
          key: P.who || 'dh', shape: 'rect', pitch: 5, gamma: 1.0, lift: .05,
          zoom: 1.04, fx: .50, fy: .47, ink: '#12303F', plateAlpha: .16,
          plate: ['#12303F', '#EFE8DA']
        });
        foilRule(c, pw - 32, 0, 3, h, '#9A7A3E', '#D8BE84');
      }
      logoLockup(c, w - M, LOGO_Y, 196, 'color', 'right');
      caps(c, P.kicker, w - M, LOGO_Y + 150, { size: 14, fill: '#9A7A3E', align: 'right', track: 4 });
      pressHead(c, P, w - M, 292, w - pw - M - 40, 82, {
        boxH: 440, maxLines: 6, align: 'right', ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, w - M, h - 200, {
        align: 'right', size: 36, ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGroundLight(c, w, h, S.seed);
      const py = 980;
      if (face) {
        portraitPlate(c, face, 0, py, w, h - py, {
          key: P.who || 'dh', shape: 'rect', pitch: 6, gamma: 1.0, lift: .05,
          zoom: 1.0, fy: .40, ink: '#12303F', plateAlpha: .16, plate: ['#12303F', '#EFE8DA']
        });
        foilRule(c, 0, py - 3, w, 3, '#9A7A3E', '#D8BE84');
      }
      logoLockup(c, M, 130, 250, 'color');
      caps(c, P.kicker, M, 306, { size: 16, fill: '#9A7A3E', track: 4.4 });
      pressHead(c, P, M, 420, w - M * 2, 128, {
        boxH: 460, maxLines: 4, ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, M, py - 200, {
        ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    } },

  /* 4 · ECLIPSE — no paper at all: he is screened straight onto the ground in
     light ink, under an arch, and emerges out of the dark */
  { id: 'eclipse', name: 'Eclipse',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const pw = 470, ph = 566;
        portraitPlate(c, face, w - pw - 40, h - ph, pw, ph, {
          key: P.who || 'dh', shape: 'arch', pitch: 5, gamma: 1.0, lift: .06,
          zoom: 1.0, fy: .46, paper: '#EDE4D2', ink: '#14384C',
          plateAlpha: .18, plate: ['#14384C', '#EDE4D2']
        });
        c.save(); c.strokeStyle = rgba('#C6A461', .55); c.lineWidth = 2;
        plateShape(c, 'arch', w - pw - 40, h - ph, pw, ph); c.stroke(); c.restore();
      }
      logoLockup(c, M, LOGO_Y, 210, 'white');
      caps(c, P.kicker, w - M, LOGO_Y + 46, { size: 14, fill: PRESS.accent, align: 'right', track: 4 });
      pressHead(c, P, M, 250, w - M * 2 - 24, 88, { boxH: 300, maxLines: 3 });
      pressSig(c, M, h - 210, { size: 38 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGround(c, w, h, S.seed);
      if (face) {
        const pw = 700, ph = 840;
        portraitPlate(c, face, (w - pw) / 2, h - ph - 260, pw, ph, {
          key: P.who || 'dh', shape: 'arch', pitch: 6, gamma: 1.0, lift: .06,
          zoom: 1.0, fy: .46, paper: '#EDE4D2', ink: '#14384C',
          plateAlpha: .18, plate: ['#14384C', '#EDE4D2']
        });
        c.save(); c.strokeStyle = rgba('#C6A461', .5); c.lineWidth = 2;
        plateShape(c, 'arch', (w - pw) / 2, h - ph - 260, pw, ph); c.stroke(); c.restore();
      }
      logoLockup(c, M, 120, 250, 'white');
      caps(c, P.kicker, M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 430, w - M * 2, 122, { boxH: 380, maxLines: 3 });
      pressSig(c, M, h - 200);
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
