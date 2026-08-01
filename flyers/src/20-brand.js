/* ══════════════════════════════════════════════════════════════════════════
   20-brand.js — the house, and the six art directions it prints in

   A single template applied to seven posts reads as a template. So the brand
   is expressed as six complete visual worlds instead: each has its own paper,
   palette, ornament, header, footer and compositional logic. A post is
   assigned one, and the assignment rotates every week — so the same content
   never looks the same twice, and no two posts in a week look like siblings.
   ══════════════════════════════════════════════════════════════════════════ */

const HOUSE = {
  name: 'THE HIRTH GROUP',
  agent: 'Daniel Hirth',
  role: 'Managing Director',
  phone: '310.300.2838',
  dre: 'CA DRE 01515796',
  site: 'HIRTHGROUP.COM',
  firm: 'KW COMMERCIAL',
  market: 'GREATER LOS ANGELES',
  volume: '$471M+',
  deals: '197+'
};

const TEAM = [
  { key: 'dh', name: 'Daniel Hirth', role: 'Managing Director', phone: '310.300.2838', dre: 'CA DRE 01515796' },
  { key: 'ar', name: 'Alex Reyhan', role: 'Advisor · CRE', phone: '310.300.3181', dre: 'CA DRE 02005428' },
  { key: 'ed', name: 'Ethan Donel', role: 'Senior Associate', phone: '310.300.3179', dre: 'CA DRE 02059315' }
];

/* ── asset registry (populated by the loader in 60-app.js) ─────────────── */
const IMG = {};

/* Header geometry, shared by every world. The lockup is a 1000×569 file, so a
   190px placement is 108px tall — everything below keys off that one number. */
const LOGO_W = 190, LOGO_Y = 58, LOGO_H = Math.round(LOGO_W * 0.569);
const HEAD_RULE = LOGO_Y + LOGO_H + 24;      /* 190 */

/* ── the mark ─────────────────────────────────────────────────────────────
   The real artwork is embedded. Drawn fallback kept only so a missing file
   degrades to something on-brand rather than to nothing.
   ─────────────────────────────────────────────────────────────────────── */
function logoLockup(c, x, y, w, mode, align) {
  const img = IMG[mode === 'white' ? 'logoWhite' : 'logoColor'];
  if (img) {
    const h = w * img.naturalHeight / img.naturalWidth;
    let dx = x;
    if (align === 'center') dx = x - w / 2;
    else if (align === 'right') dx = x - w;
    c.drawImage(img, dx, y, w, h);
    return y + h;
  }
  /* fallback wordmark */
  const col = mode === 'white' ? '#fff' : '#0C9BDC';
  const h = w * 0.19;
  text(c, 'HIRTH', align === 'center' ? x : (align === 'right' ? x - w : x), y + h,
    { font: FS(600, h), fill: col, align: align === 'center' ? 'center' : 'left', track: h * 0.012 });
  return y + h * 1.5;
}

/* wordmark set in type — used where the PNG would be too heavy for the space */
function wordmark(c, x, y, size, col, dim, align) {
  const g = dim || rgba('#ffffff', .55);
  const w1 = measure(c, 'THE ', FN(500, size * 0.72), size * 0.24);
  if (align === 'center') {
    const total = w1 + measure(c, 'HIRTH GROUP', FS(600, size), size * 0.04);
    x -= total / 2;
  }
  text(c, 'THE', x, y, { font: FN(500, size * 0.72), fill: g, base: 'alphabetic', track: size * 0.24 });
  text(c, 'HIRTH GROUP', x + w1, y, { font: FS(600, size), fill: col, base: 'alphabetic', track: size * 0.04 });
}

/* ══ ART DIRECTIONS ═══════════════════════════════════════════════════════
   Each entry is a complete world. `ground` paints the field, `header` and
   `footer` are the fixed furniture, and the tokens below them drive every
   layout so a slide never has to know which world it is in.
   ═══════════════════════════════════════════════════════════════════════ */

const AD = {};

/* ── 1 · ATELIER ──────────────────────────────────────────────────────────
   Uncoated cream stock, ink-black Fraunces, hairline rules, a folio in the
   corner. The look of a printed prospectus rather than a social graphic.
   ─────────────────────────────────────────────────────────────────────── */
AD.atelier = {
  id: 'atelier', name: 'Atelier',
  dark: false, logo: 'color',
  paper: '#F2ECE1', ink: '#15181C', body: '#4A4740', muted: '#8A8578',
  accent: '#1C5C86', accent2: '#B08447',
  rule: 'rgba(21,24,28,.18)', ruleSoft: 'rgba(21,24,28,.10)',
  panel: 'rgba(21,24,28,.045)',
  ground(c, w, h, seed) {
    paper(c, w, h, this.paper, seed);
    /* a barely-there tonal wash so the field isn't dead flat */
    const g = c.createLinearGradient(0, 0, w * .3, h);
    g.addColorStop(0, 'rgba(255,255,255,.5)');
    g.addColorStop(1, 'rgba(150,138,116,.10)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    vignette(c, w, h, .07);
  },
  header(c, w, h, o) {
    const M = o.M;
    logoLockup(c, M, LOGO_Y, LOGO_W, 'color');
    caps(c, o.label || '', w - M, LOGO_Y + 46, { size: 15, fill: this.muted, align: 'right', track: 3.4 });
    rule(c, M, HEAD_RULE, w - M * 2, this.rule, 1);
  },
  footer(c, w, h, o) {
    const M = o.M, y = h - M - 34;
    rule(c, M, y - 26, w - M * 2, this.rule, 1);
    rule(c, M, y - 22, w - M * 2, this.ruleSoft, 1);
    const bits = [HOUSE.agent.toUpperCase(), HOUSE.phone, HOUSE.site, HOUSE.dre];
    const f = FN(500, 17), tr = 2.6;
    let tot = 0; const ws = bits.map(b => { const m = measure(c, b, f, tr); tot += m; return m; });
    const gap = (w - M * 2 - tot) / (bits.length - 1);
    let x = M;
    bits.forEach((b, i) => {
      text(c, b, x, y + 14, { font: f, fill: this.body, base: 'middle', track: tr });
      if (i < bits.length - 1) diamond(c, x + ws[i] + gap / 2, y + 13, 3, this.accent2);
      x += ws[i] + gap;
    });
  }
};

/* ── 2 · MIDNIGHT ─────────────────────────────────────────────────────────
   Near-black with a single cold bloom. Enormous negative space, one accent,
   type doing all the work. The quiet one in the set.
   ─────────────────────────────────────────────────────────────────────── */
AD.midnight = {
  id: 'midnight', name: 'Midnight',
  dark: true, logo: 'white',
  paper: '#070B10', ink: '#F5F7F9', body: '#A8B4BE', muted: '#6C7A86',
  accent: '#79BDEA', accent2: '#C6A461',
  rule: 'rgba(255,255,255,.13)', ruleSoft: 'rgba(255,255,255,.07)',
  panel: 'rgba(255,255,255,.04)',
  ground(c, w, h, seed) {
    const g = c.createLinearGradient(0, 0, w * .5, h);
    g.addColorStop(0, '#0C1620'); g.addColorStop(.55, '#080D13'); g.addColorStop(1, '#05080C');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    bloom(c, w, h, '#2E7FB8', w * .74, h * .12, w * .9, .30);
    bloom(c, w, h, '#C6A461', w * .06, h * .98, w * .55, .07);
    vignette(c, w, h, .40, w * .5, h * .46);
    grain(c, w, h, .10, true);
  },
  header(c, w, h, o) {
    const M = o.M;
    logoLockup(c, M, LOGO_Y, LOGO_W, 'white');
    if (o.label) {
      const tw = measure(c, o.label.toUpperCase(), FN(600, 15), 3.6);
      rule(c, w - M - tw - 40, LOGO_Y + 46, 26, this.accent, 2);
      caps(c, o.label, w - M, LOGO_Y + 46, { size: 15, fill: this.accent, align: 'right', track: 3.6 });
    }
  },
  footer(c, w, h, o) {
    const M = o.M, y = h - 118;
    rule(c, 0, y, w, this.ruleSoft, 1);
    caps(c, HOUSE.agent + '  ·  ' + HOUSE.role, M, y + 44, { size: 16, fill: this.body, track: 2.8 });
    caps(c, HOUSE.dre, M, y + 76, { size: 14, fill: this.muted, track: 2.6 });
    text(c, HOUSE.phone, w - M, y + 46, { font: FN(600, 30), fill: this.ink, align: 'right', base: 'middle' });
    caps(c, HOUSE.site, w - M, y + 78, { size: 14, fill: this.accent, align: 'right', track: 3 });
  }
};

/* ── 3 · BLUEPRINT ────────────────────────────────────────────────────────
   Drafting board. Cyan grid on prussian ground, dimension lines with real
   witness ticks, and a title block borrowed straight from a drawing set.
   ─────────────────────────────────────────────────────────────────────── */
AD.blueprint = {
  id: 'blueprint', name: 'Blueprint',
  dark: true, logo: 'white',
  paper: '#0A2437', ink: '#EAF5FC', body: '#9FC6DE', muted: '#6E9AB6',
  accent: '#59C6F2', accent2: '#FFFFFF',
  rule: 'rgba(140,205,240,.22)', ruleSoft: 'rgba(140,205,240,.11)',
  panel: 'rgba(140,205,240,.07)',
  ground(c, w, h, seed) {
    const g = c.createLinearGradient(0, 0, w * .4, h);
    g.addColorStop(0, '#0D2C43'); g.addColorStop(1, '#071A28');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    /* fine grid, heavier every fifth line — as on a real sheet */
    for (let i = 0, x = 0; x <= w; x += 27, i++)
      vrule(c, x, 0, h, i % 5 ? 'rgba(140,205,240,.055)' : 'rgba(140,205,240,.12)', 1);
    for (let i = 0, y = 0; y <= h; y += 27, i++)
      rule(c, 0, y, w, i % 5 ? 'rgba(140,205,240,.055)' : 'rgba(140,205,240,.12)', 1);
    bloom(c, w, h, '#59C6F2', w * .2, h * .18, w * .8, .12);
    vignette(c, w, h, .34);
    grain(c, w, h, .08, true);
  },
  header(c, w, h, o) {
    const M = o.M;
    logoLockup(c, M, LOGO_Y, LOGO_W, 'white');
    if (o.label) {
      const t = o.label.toUpperCase(), tw = measure(c, t, FN(600, 14), 3.4);
      c.save(); c.strokeStyle = this.accent; c.lineWidth = 1;
      c.strokeRect(hair(w - M - tw - 28), hair(LOGO_Y + 29), tw + 34, 34); c.restore();
      caps(c, t, w - M - 17, LOGO_Y + 46, { size: 14, fill: this.accent, align: 'right', track: 3.4 });
    }
  },
  /* architectural title block */
  footer(c, w, h, o) {
    const M = o.M, bh = 104, y = h - M - bh;
    c.save();
    c.strokeStyle = this.rule; c.lineWidth = 1;
    c.strokeRect(hair(M), hair(y), w - M * 2, bh);
    const cells = [
      ['CLIENT', HOUSE.name],
      ['CONTACT', HOUSE.phone],
      ['LICENCE', HOUSE.dre.replace('CA DRE ', '')],
      ['SHEET', o.sheet || '01']
    ];
    const cw = (w - M * 2) / cells.length;
    cells.forEach((cell, i) => {
      const x = M + cw * i;
      if (i) vrule(c, x, y, bh, this.rule, 1);
      caps(c, cell[0], x + 20, y + 32, { size: 12, fill: this.muted, track: 2.6 });
      let sz = 21, t = cell[1];
      while (measure(c, t, FN(600, sz), .4) > cw - 40 && sz > 12) sz -= 1;
      text(c, t, x + 20, y + 72, { font: FN(600, sz), fill: this.ink, base: 'middle', track: .4 });
    });
    c.restore();
  }
};

/* ── 4 · SIGNAL ───────────────────────────────────────────────────────────
   International Typographic Style: white sheet, twelve columns, one flat
   accent field, everything flush left, nothing decorative anywhere.
   ─────────────────────────────────────────────────────────────────────── */
AD.signal = {
  id: 'signal', name: 'Signal',
  dark: false, logo: 'color',
  paper: '#FFFFFF', ink: '#0E1114', body: '#3C4248', muted: '#8B939A',
  accent: '#0B62C4', accent2: '#E8412E',
  rule: 'rgba(14,17,20,.14)', ruleSoft: 'rgba(14,17,20,.07)',
  panel: '#F1F3F5',
  ground(c, w, h, seed) {
    c.fillStyle = this.paper; c.fillRect(0, 0, w, h);
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(14,17,20,.02)'); g.addColorStop(1, 'rgba(14,17,20,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    grain(c, w, h, .028, false);
  },
  header(c, w, h, o) {
    const M = o.M;
    c.fillStyle = this.accent; c.fillRect(M, LOGO_Y + 26, 46, 46);
    logoLockup(c, M + 74, LOGO_Y, LOGO_W, 'color');
    caps(c, o.label || '', w - M, LOGO_Y + 46, { size: 14, fill: this.muted, align: 'right', track: 3.2 });
    rule(c, M, HEAD_RULE, w - M * 2, this.rule, 1);
  },
  footer(c, w, h, o) {
    const bh = 94, y = h - bh, M = o.M;
    c.fillStyle = this.ink; c.fillRect(0, y, w, bh);
    c.fillStyle = this.accent; c.fillRect(0, y, w, 5);
    caps(c, HOUSE.agent + ' · ' + HOUSE.role, M, y + 40, { size: 16, fill: '#fff', track: 2.6 });
    caps(c, HOUSE.dre + '  ·  ' + HOUSE.firm, M, y + 68, { size: 13, fill: 'rgba(255,255,255,.5)', track: 2.4 });
    text(c, HOUSE.phone, w - M, y + 40, { font: FN(600, 27), fill: '#fff', align: 'right', base: 'middle' });
    caps(c, HOUSE.site, w - M, y + 68, { size: 13, fill: 'rgba(255,255,255,.5)', align: 'right', track: 2.8 });
  }
};

/* ── 5 · DOSSIER ──────────────────────────────────────────────────────────
   Manila stock, oxide-red stamp, ruled data. Reads as a file somebody pulled
   rather than a graphic somebody posted.
   ─────────────────────────────────────────────────────────────────────── */
AD.dossier = {
  id: 'dossier', name: 'Dossier',
  dark: false, logo: 'color',
  paper: '#DDD6C6', ink: '#1F1D19', body: '#4E4A41', muted: '#847D6E',
  accent: '#A6432B', accent2: '#1C5C86',
  rule: 'rgba(31,29,25,.22)', ruleSoft: 'rgba(31,29,25,.11)',
  panel: 'rgba(31,29,25,.05)',
  ground(c, w, h, seed) {
    paper(c, w, h, this.paper, seed);
    /* fold shadow down the left third — the sheet has been handled */
    const g = c.createLinearGradient(0, 0, w * .34, 0);
    g.addColorStop(0, 'rgba(90,78,56,.14)'); g.addColorStop(1, 'rgba(90,78,56,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    grain(c, w, h, .085, false);
    vignette(c, w, h, .12);
  },
  header(c, w, h, o) {
    const M = o.M;
    logoLockup(c, M, LOGO_Y, LOGO_W, 'color');
    /* the stamp */
    const t = (o.label || 'FILE').toUpperCase();
    const tw = measure(c, t, FN(700, 17), 4.2);
    c.save();
    c.translate(w - M - tw / 2 - 22, LOGO_Y + 48); c.rotate(-0.045);
    c.strokeStyle = rgba(this.accent, .8); c.lineWidth = 2.5;
    c.strokeRect(hair(-tw / 2 - 20), hair(-21), tw + 40, 42);
    c.strokeStyle = rgba(this.accent, .35); c.lineWidth = 1;
    c.strokeRect(hair(-tw / 2 - 26), hair(-27), tw + 52, 54);
    caps(c, t, 0, 1, { size: 17, weight: 700, fill: rgba(this.accent, .88), align: 'center', track: 4.2 });
    c.restore();
    rule(c, M, HEAD_RULE, w - M * 2, this.rule, 1.5);
  },
  footer(c, w, h, o) {
    const M = o.M, y = h - M - 46;
    rule(c, M, y - 8, w - M * 2, this.rule, 1.5);
    const cells = [['REF', o.ref || 'HG-' + (o.sheet || '01')], ['CONTACT', HOUSE.phone], ['WEB', HOUSE.site]];
    const cw = (w - M * 2) / cells.length;
    cells.forEach((cell, i) => {
      const x = M + cw * i;
      caps(c, cell[0], x, y + 22, { size: 12, fill: this.muted, track: 2.6 });
      text(c, cell[1], x, y + 50, { font: FN(600, 20), fill: this.ink, base: 'middle' });
    });
  }
};

/* ── 6 · NOCTURNE ─────────────────────────────────────────────────────────
   Photography-led. Duotone imagery, cream type, one gold hairline. This is
   the world listings live in; the content posts borrow it for the big
   single-image statements.
   ─────────────────────────────────────────────────────────────────────── */
AD.nocturne = {
  id: 'nocturne', name: 'Nocturne',
  dark: true, logo: 'white',
  paper: '#061722', ink: '#F3EEE3', body: '#B9C6CE', muted: '#7C8B96',
  accent: '#C6A461', accent2: '#6FB6E8',
  rule: 'rgba(243,238,227,.18)', ruleSoft: 'rgba(243,238,227,.09)',
  panel: 'rgba(6,23,34,.62)',
  duo: ['#06202F', '#EDF2F4'],
  ground(c, w, h, seed) {
    const g = c.createLinearGradient(0, 0, w * .35, h);
    g.addColorStop(0, '#0C2C3E'); g.addColorStop(.5, '#082030'); g.addColorStop(1, '#04101A');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    bloom(c, w, h, '#C6A461', w * .18, h * .82, w * .8, .10);
    bloom(c, w, h, '#3E93C4', w * .82, h * .10, w * .7, .16);
    vignette(c, w, h, .42);
    grain(c, w, h, .11, true);
  },
  header(c, w, h, o) {
    const M = o.M;
    logoLockup(c, M, LOGO_Y, LOGO_W, 'white');
    if (o.label) {
      caps(c, o.label, w - M, LOGO_Y + 40, { size: 14, fill: this.accent, align: 'right', track: 4 });
      const tw = measure(c, o.label.toUpperCase(), FN(600, 14), 4);
      rule(c, w - M - tw, LOGO_Y + 58, tw, rgba(this.accent, .5), 1);
    }
  },
  footer(c, w, h, o) {
    const M = o.M, y = h - 116;
    rule(c, M, y, w - M * 2, rgba(this.accent, .45), 1);
    caps(c, HOUSE.agent, M, y + 40, { size: 17, fill: this.ink, track: 3 });
    caps(c, HOUSE.dre, M, y + 70, { size: 13, fill: this.muted, track: 2.6 });
    text(c, HOUSE.phone, w - M, y + 42, { font: FN(600, 29), fill: this.ink, align: 'right', base: 'middle' });
    caps(c, HOUSE.site, w - M, y + 72, { size: 13, fill: this.accent, align: 'right', track: 3 });
  }
};

const AD_ORDER = ['atelier', 'midnight', 'blueprint', 'signal', 'dossier', 'nocturne'];

/* ── shared furniture, styled by whichever world is active ─────────────── */

/* the ordinal that sits behind a composition */
function ghostNumeral(c, n, x, y, size, col) {
  text(c, n, x, y, { font: FS(600, size), fill: col, align: 'center', base: 'middle' });
}

/* a stat row — every art direction draws it differently */
function statRow(c, ad, stats, x, y, w, o) {
  o = o || {};
  const n = stats.length, cw = w / n;
  const vSize = o.vSize || (n > 3 ? 40 : 48);
  stats.forEach((s, i) => {
    const cx = x + cw * i;
    if (i && o.divider !== false) vrule(c, cx, y + 4, o.h || 74, ad.ruleSoft, 1);
    let f = FS(600, vSize), sz = vSize;
    while (measure(c, s[0], f, 0) > cw - 34 && sz > 20) { sz -= 1; f = FS(600, sz); }
    text(c, s[0], cx + (o.center ? cw / 2 : 22), y + 34, {
      font: f, fill: o.vCol || ad.ink, align: o.center ? 'center' : 'left', base: 'middle'
    });
    caps(c, s[1], cx + (o.center ? cw / 2 : 22), y + (o.h || 74) - 8, {
      size: 13, fill: o.kCol || ad.muted, align: o.center ? 'center' : 'left', track: 2.6
    });
  });
}

/* a call-to-action pill / bar, in the idiom of each world */
function ctaMark(c, ad, label, cx, y, o) {
  o = o || {};
  const f = FN(700, o.size || 27), tr = 1.4;
  const tw = measure(c, label, f, tr), pad = o.pad || 46, h = o.h || 82;
  const w = tw + pad * 2;
  const x = cx - w / 2;
  if (ad.id === 'signal') {
    c.fillStyle = ad.accent; c.fillRect(x, y, w, h);
    text(c, label, cx, y + h / 2, { font: f, fill: '#fff', align: 'center', base: 'middle', track: tr });
  } else if (ad.id === 'atelier' || ad.id === 'dossier') {
    c.save(); c.strokeStyle = ad.ink; c.lineWidth = 1.5;
    c.strokeRect(hair(x), hair(y), w, h);
    c.strokeStyle = rgba(ad.id === 'dossier' ? '#A6432B' : '#1C5C86', .55); c.lineWidth = 1;
    c.strokeRect(hair(x + 6), hair(y + 6), w - 12, h - 12); c.restore();
    text(c, label, cx, y + h / 2, { font: f, fill: ad.ink, align: 'center', base: 'middle', track: tr });
  } else if (ad.id === 'blueprint') {
    c.save(); c.strokeStyle = ad.accent; c.lineWidth = 1.5;
    c.strokeRect(hair(x), hair(y), w, h);
    c.fillStyle = rgba('#59C6F2', .10); c.fillRect(x, y, w, h); c.restore();
    /* witness ticks */
    line(c, x - 16, y + h / 2, x - 4, y + h / 2, ad.accent, 1);
    line(c, x + w + 4, y + h / 2, x + w + 16, y + h / 2, ad.accent, 1);
    text(c, label, cx, y + h / 2, { font: f, fill: ad.ink, align: 'center', base: 'middle', track: tr });
  } else {
    rr(c, x, y, w, h, h / 2);
    c.fillStyle = ad.id === 'nocturne' ? ad.accent : ad.accent;
    c.fill();
    text(c, label, cx, y + h / 2, {
      font: f, fill: ad.id === 'nocturne' ? '#10202B' : '#08131C',
      align: 'center', base: 'middle', track: tr
    });
  }
  return y + h;
}

/* section eyebrow — kicker above a headline */
function kicker(c, ad, label, x, y, o) {
  o = o || {};
  const col = o.fill || ad.accent;
  if (o.align === 'center') {
    const tw = measure(c, label.toUpperCase(), FN(600, 16), 4);
    caps(c, label, x, y, { size: 16, fill: col, align: 'center', track: 4 });
    rule(c, x - tw / 2 - 42, y, 26, col, 1);
    rule(c, x + tw / 2 + 16, y, 26, col, 1);
    return;
  }
  c.fillStyle = col; c.fillRect(x, y - 5, 22, 3);
  caps(c, label, x + 38, y, { size: 16, fill: col, track: 4 });
}
