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
function portraitPlate(c, img, cx, cy, r, o) {
  o = o || {};
  const pitch = o.pitch || 10;
  const size = Math.ceil(r * 2);
  const off = document.createElement('canvas');
  off.width = off.height = size;
  const oc = off.getContext('2d');
  oc.drawImage(img, 0, 0, size, size);
  const px = oc.getImageData(0, 0, size, size).data;

  const x0 = cx - r, y0 = cy - r;
  const sample = (sx, sy) => {
    const i = ((sy | 0) * size + (sx | 0)) * 4;
    if (px[i + 3] < 90) return null;
    return (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255;
  };

  /* Auto-levels off the plate's own histogram. A headshot lit for a website
     occupies maybe half the available range; printed straight, the skin sits
     in a band too narrow for the screen to describe a face with, and the whole
     portrait collapses to hair-and-suit. Stretching the 2nd–98th percentile
     across the full range is what a platemaker would do before burning it. */
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
  /* the rondel — flat ink, the paper the portrait prints on */
  c.beginPath(); c.arc(cx, cy, r, 0, 6.284); c.clip();
  c.fillStyle = o.paper || '#F1EBDF';
  c.fillRect(x0, y0, size, size);

  /* a faint duotone under the screen holds the modelling */
  c.globalAlpha = o.plateAlpha == null ? 0.22 : o.plateAlpha;
  const duo = duotone(img, (o.plate || PRESS.plate)[0], (o.plate || PRESS.plate)[1],
    (o.key || 'dh') + '-plate', size, size);
  c.drawImage(duo, x0, y0, size, size);
  c.globalAlpha = 1;

  /* the screen — dark ink, radius by darkness */
  c.fillStyle = o.ink || '#0B1E2B';
  const ang = o.angle == null ? -0.38 : o.angle;
  const cos = Math.cos(ang), sin = Math.sin(ang);
  const span = size * 1.5;
  const lift = o.lift == null ? 0.06 : o.lift;   /* highlights that print clean */
  for (let v = -span; v < span; v += pitch) {
    for (let u = -span; u < span; u += pitch) {
      const sx = r + u * cos - v * sin, sy = r + u * sin + v * cos;
      if (sx < 0 || sy < 0 || sx >= size || sy >= size) continue;
      const lum = sample(sx, sy);
      if (lum === null) continue;
      const dark = clamp(Math.pow(1 - levels(lum), o.gamma == null ? 0.85 : o.gamma) - lift, 0, 1);
      const rr = pitch * 0.72 * dark;
      if (rr < 0.4) continue;
      c.beginPath();
      c.arc(x0 + sx, y0 + sy, rr, 0, 6.284);
      c.fill();
    }
  }
  c.restore();

  /* the plate edge */
  if (o.edge) {
    c.save();
    c.strokeStyle = o.edge; c.lineWidth = o.edgeWidth || 3;
    c.beginPath(); c.arc(cx, cy, r, 0, 6.284); c.stroke();
    c.restore();
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

/* ── the feed poster · 1080 × 1080 ────────────────────────────────────── */
function posterFrame(c, P, S) {
  const w = S.w, h = S.h, M = S.M;
  pressGround(c, w, h, S.seed);

  /* the portrait, bleeding off the bottom-right corner */
  const face = IMG[P.who || 'dh'];
  const r = 332, cx = 880, cy = 872;
  if (face) {
    engravedRings(c, cx, cy, r + 16, r + 46, 3, rgba('#C6A461', .20), 1);
    portraitPlate(c, face, cx, cy, r, {
      key: P.who || 'dh', pitch: 5, gamma: 0.95, lift: .075, angle: -0.38,
      edge: rgba('#C6A461', .8), edgeWidth: 3
    });
  }

  logoLockup(c, M, LOGO_Y, 210, 'white');
  caps(c, P.kicker || 'The Hirth Group', w - M, LOGO_Y + 46, {
    size: 14, fill: PRESS.accent, align: 'right', track: 4
  });

  /* the words */
  const head = fitRich(c, P.line, { w: w - M * 2 - 24, h: 300 }, {
    roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
    max: 104, min: 46, leading: 1.02, maxLines: 3
  });
  let y = 246;
  foilRule(c, M, y - 34, 128, 3, '#C6A461', '#F0DFAE');
  drawRich(c, head, M, y, {
    fill: PRESS.ink, emFill: '#E7CE93', shadow: ['rgba(2,10,16,.8)', 28, 8]
  });

  /* the signature block, along the foot on the open side */
  const by = h - 150;
  rule(c, M, by, 300, rgba('#C6A461', .5), 1);
  text(c, HOUSE.agent, M, by + 46, {
    font: FS(600, 42), fill: PRESS.ink, base: 'middle', shadow: ['rgba(2,10,16,.7)', 18, 4]
  });
  caps(c, HOUSE.role, M, by + 82, { size: 13, fill: PRESS.accent, track: 3.2 });
  caps(c, HOUSE.phone + '   ·   ' + HOUSE.site, M, by + 112, { size: 14, fill: PRESS.body, track: 3 });
  caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, M, by + 140, { size: 11, fill: PRESS.muted, track: 2.6 });
}

/* ── the poster as a story · 1080 × 1920 ──────────────────────────────── */
function posterStory(c, P, S) {
  const w = S.w, h = S.h, M = S.M;
  pressGround(c, w, h, S.seed);

  const face = IMG[P.who || 'dh'];
  const r = 432, cx = 906, cy = h - 372;   /* bleeding off the bottom-right */
  if (face) {
    engravedRings(c, cx, cy, r + 18, r + 54, 3, rgba('#C6A461', .20), 1);
    portraitPlate(c, face, cx, cy, r, {
      key: P.who || 'dh', pitch: 6, gamma: 0.95, lift: .075, angle: -0.38,
      edge: rgba('#C6A461', .8), edgeWidth: 3
    });
  }

  logoLockup(c, M, 120, 250, 'white');
  caps(c, P.kicker || 'The Hirth Group', M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });

  const head = fitRich(c, P.line, { w: w - M * 2, h: 560 }, {
    roman: s => FS(600, s), italic: s => FS(600, s, 'italic'),
    max: 138, min: 58, leading: 1.0, maxLines: 4
  });
  foilRule(c, M, 430, 150, 3, '#C6A461', '#F0DFAE');
  drawRich(c, head, M, 486, {
    fill: PRESS.ink, emFill: '#E7CE93', shadow: ['rgba(2,10,16,.8)', 34, 10]
  });

  /* the signature keeps to the open left column so the plate can bleed */
  const by = h - 300;
  rule(c, M, by, 360, rgba('#C6A461', .55), 1);
  text(c, HOUSE.agent, M, by + 56, {
    font: FS(600, 54), fill: PRESS.ink, base: 'middle', shadow: ['rgba(2,10,16,.7)', 20, 5]
  });
  caps(c, HOUSE.role, M, by + 100, { size: 16, fill: PRESS.accent, track: 3.4 });
  caps(c, HOUSE.phone + '   ·   ' + HOUSE.site, M, by + 142, { size: 17, fill: PRESS.body, track: 3.2 });
  caps(c, HOUSE.dre, M, by + 176, { size: 12, fill: PRESS.muted, track: 2.6 });
}

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
