/* ══════════════════════════════════════════════════════════════════════════
   THE HIRTH GROUP · FLYER ENGINE
   10-lib.js — typesetting, texture, colour and geometry primitives

   Everything is painted at export resolution: the pixels you see on the page
   are the pixels that land in the PNG. No upscaling, no screenshot step.

   The two things that separate a designed flyer from a templated one are
   (a) line breaking and (b) vertical rhythm. Both are handled here rather
   than left to greedy wrapping and eyeballed offsets.
   ══════════════════════════════════════════════════════════════════════════ */

const FW = 1080, FH = 1080;          /* feed  1:1  */
const SW = 1080, SH = 1920;          /* story 9:16 */
const SANS  = "'Space Grotesk'";
const SERIF = "Fraunces";

/* ── geometry ─────────────────────────────────────────────────────────── */
const snap = v => Math.round(v);
const hair = v => Math.round(v) + 0.5;               /* crisp 1px rule       */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/* deterministic noise so a post looks identical on every reload */
function rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

/* ── colour ───────────────────────────────────────────────────────────── */
function hex2rgb(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgba(h, a) { const c = hex2rgb(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
function mix(h1, h2, t) {
  const a = hex2rgb(h1), b = hex2rgb(h2);
  return `rgb(${snap(lerp(a[0], b[0], t))},${snap(lerp(a[1], b[1], t))},${snap(lerp(a[2], b[2], t))})`;
}

/* ══ TYPE ═════════════════════════════════════════════════════════════════
   Chrome's ctx.letterSpacing appends the tracking after the final glyph,
   which throws centred and right-aligned text off by exactly one tracking
   unit. Every measurement here compensates, so optical alignment holds at
   any tracking value.
   ═══════════════════════════════════════════════════════════════════════ */
function setTrack(c, t) { if ('letterSpacing' in c) c.letterSpacing = (t || 0) + 'px'; }

function font(weight, size, family, style) {
  return `${style ? style + ' ' : ''}${weight} ${size}px ${family}`;
}
/* shorthand builders used all through the layouts */
const FS = (w, s, st) => font(w, s, SERIF, st);   /* Fraunces  */
const FN = (w, s, st) => font(w, s, SANS, st);    /* Grotesk   */

function measure(c, text, f, track) {
  c.save(); c.font = f; setTrack(c, track || 0);
  const w = c.measureText(String(text)).width - (track || 0);
  c.restore();
  return w;
}
function metrics(c, text, f, track) {
  c.save(); c.font = f; setTrack(c, track || 0);
  const m = c.measureText(String(text));
  c.restore();
  return {
    w: m.width - (track || 0),
    cap: m.actualBoundingBoxAscent || 0,
    desc: m.actualBoundingBoxDescent || 0
  };
}

/* draw one line. o = {font, fill, align, base, track, alpha, shadow} */
function text(c, str, x, y, o) {
  o = o || {};
  c.save();
  if (o.font) c.font = o.font;
  c.fillStyle = o.fill || '#fff';
  c.textAlign = 'left';
  c.textBaseline = o.base || 'alphabetic';
  setTrack(c, o.track || 0);
  if (o.alpha != null) c.globalAlpha = o.alpha;
  if (o.shadow) { c.shadowColor = o.shadow[0]; c.shadowBlur = o.shadow[1]; c.shadowOffsetY = o.shadow[2] || 0; }
  const w = c.measureText(String(str)).width - (o.track || 0);
  let dx = 0;
  if (o.align === 'center') dx = -w / 2;
  else if (o.align === 'right') dx = -w;
  c.fillText(String(str), x + dx, y);
  c.restore();
  return w;
}

/* ── line breaking ────────────────────────────────────────────────────────
   Minimum-raggedness breaking (Knuth-Plass without hyphenation). Greedy
   wrapping produces the lopsided headline that reads as "auto-generated";
   this balances the rag and refuses to leave a single word on the last
   line, which is the single biggest tell in machine-set display type.
   ─────────────────────────────────────────────────────────────────────── */
function breakLines(c, str, maxW, f, track, opts) {
  opts = opts || {};
  const words = String(str).trim().split(/\s+/);
  if (!words.length) return [];
  c.save(); c.font = f; setTrack(c, track || 0);
  const tr = track || 0;
  const wordW = words.map(w => c.measureText(w).width - tr);
  const spaceW = c.measureText(' ').width - tr;
  c.restore();

  /* width of words[i..j] set on one line */
  const lineW = (i, j) => {
    let w = 0;
    for (let k = i; k <= j; k++) w += wordW[k];
    return w + spaceW * (j - i);
  };

  const n = words.length;
  const INF = 1e18;
  const cost = new Array(n + 1).fill(INF);
  const back = new Array(n + 1).fill(0);
  cost[n] = 0;
  const lastLineFree = opts.lastLineFree !== false;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      const w = lineW(i, j);
      if (w > maxW && j > i) break;               /* overfull: stop extending  */
      const isLast = (j === n - 1);
      let slack = maxW - w;
      let bad;
      if (w > maxW) bad = 1e12;                   /* single word wider than box */
      else if (isLast && lastLineFree) {
        /* a last line holding one short word is the orphan we're avoiding */
        bad = (j === i && n > 2) ? 4e5 : 0;
      } else bad = slack * slack;
      const tot = bad + cost[j + 1];
      if (tot < cost[i]) { cost[i] = tot; back[i] = j + 1; }
    }
  }
  const out = [];
  let i = 0, guard = 0;
  while (i < n && guard++ < 200) {
    const j = back[i] || (i + 1);
    out.push(words.slice(i, j).join(' '));
    i = j;
  }
  return out;
}

/* fit a display string into a box: returns {size, lines, leading, height} */
function fitBlock(c, str, box, o) {
  o = o || {};
  const weight = o.weight || 600, fam = o.family || SERIF, style = o.style || '';
  const track = o.track || 0, lead = o.leading || 1.05;
  const maxLines = o.maxLines || 6;
  let size = o.max || 140;
  const min = o.min || 30;
  while (size > min) {
    const f = font(weight, size, fam, style);
    const lines = breakLines(c, str, box.w, f, track, o);
    if (lines.length <= maxLines && lines.length * size * lead <= box.h) {
      let over = false;
      for (const l of lines) if (measure(c, l, f, track) > box.w + 0.5) over = true;
      if (!over) return { size, lines, leading: size * lead, height: lines.length * size * lead, font: f };
    }
    size -= 2;
  }
  const f = font(weight, min, fam, style);
  const lines = breakLines(c, str, box.w, f, track, o);
  return { size: min, lines, leading: min * lead, height: lines.length * min * lead, font: f };
}

/* paint a fitted block. anchor: 'left'|'center'|'right' */
function drawBlock(c, blk, x, y, o) {
  o = o || {};
  let yy = y;
  blk.lines.forEach(l => {
    text(c, l, x, yy, {
      font: blk.font, fill: o.fill || '#fff', align: o.align || 'left',
      base: 'top', track: o.track || 0, alpha: o.alpha, shadow: o.shadow
    });
    yy += blk.leading;
  });
  return yy;
}

/* body copy: wrap at a fixed size and paint on a rhythm */
function para(c, str, x, y, maxW, o) {
  o = o || {};
  const f = o.font || FN(400, 30);
  const lines = breakLines(c, str, maxW, f, o.track || 0);
  const lead = o.leading || 44;
  let yy = y;
  lines.forEach(l => {
    text(c, l, x, yy, { font: f, fill: o.fill || '#fff', align: o.align || 'left', base: 'top', track: o.track || 0, alpha: o.alpha });
    yy += lead;
  });
  return yy;
}
function paraHeight(c, str, maxW, o) {
  o = o || {};
  const f = o.font || FN(400, 30);
  return breakLines(c, str, maxW, f, o.track || 0).length * (o.leading || 44);
}

/* letterspaced micro-caps — the label voice used by every art direction */
function caps(c, str, x, y, o) {
  o = o || {};
  const size = o.size || 19;
  return text(c, String(str).toUpperCase(), x, y, {
    font: font(o.weight || 600, size, o.family || SANS),
    fill: o.fill || '#fff', align: o.align || 'left', base: o.base || 'middle',
    track: o.track != null ? o.track : size * 0.19, alpha: o.alpha
  });
}

/* ── shapes ───────────────────────────────────────────────────────────── */
function rr(c, x, y, w, h, r) {
  r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
function line(c, x1, y1, x2, y2, col, w) {
  c.save(); c.strokeStyle = col; c.lineWidth = w || 1;
  c.beginPath();
  if (Math.abs(y1 - y2) < 0.01 && (w || 1) <= 1.2) { c.moveTo(x1, hair(y1)); c.lineTo(x2, hair(y2)); }
  else if (Math.abs(x1 - x2) < 0.01 && (w || 1) <= 1.2) { c.moveTo(hair(x1), y1); c.lineTo(hair(x2), y2); }
  else { c.moveTo(x1, y1); c.lineTo(x2, y2); }
  c.stroke(); c.restore();
}
function rule(c, x, y, w, col, weight) { line(c, x, y, x + w, y, col, weight || 1); }
function vrule(c, x, y, h, col, weight) { line(c, x, y, x, y + h, col, weight || 1); }

function diamond(c, cx, cy, r, col) {
  c.save(); c.fillStyle = col; c.beginPath();
  c.moveTo(cx, cy - r); c.lineTo(cx + r, cy); c.lineTo(cx, cy + r); c.lineTo(cx - r, cy);
  c.closePath(); c.fill(); c.restore();
}

/* registration / crop marks — the printer's tell that this came off a press */
function cropMarks(c, w, h, inset, len, col, weight) {
  const i = inset, L = len || 26;
  [[i, i, 1, 1], [w - i, i, -1, 1], [i, h - i, 1, -1], [w - i, h - i, -1, -1]].forEach(m => {
    line(c, m[0], m[1], m[0] + m[2] * L, m[1], col, weight || 1);
    line(c, m[0], m[1], m[0], m[1] + m[3] * L, col, weight || 1);
  });
}

/* ── texture ══════════════════════════════════════════════════════════════
   A flat canvas gradient reads as digital. Real print has tooth. The grain
   tile is generated once and pattern-filled, which keeps 30+ flyers on the
   page fast while still putting noise on every square inch.
   ═══════════════════════════════════════════════════════════════════════ */
const _grainCache = {};
function grainTile(dark) {
  const key = dark ? 'd' : 'l';
  if (_grainCache[key]) return _grainCache[key];
  const S = 256, cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const cx = cv.getContext('2d');
  const im = cx.createImageData(S, S);
  const r = rng(dark ? 9137 : 4421);
  for (let i = 0; i < S * S; i++) {
    const v = r();
    /* weight toward mid so the tile has fine tooth, not salt-and-pepper */
    const n = snap(128 + (v - 0.5) * 210);
    im.data[i * 4] = n; im.data[i * 4 + 1] = n; im.data[i * 4 + 2] = n;
    im.data[i * 4 + 3] = 255;
  }
  cx.putImageData(im, 0, 0);
  _grainCache[key] = cv;
  return cv;
}
function grain(c, w, h, amount, dark) {
  c.save();
  c.globalCompositeOperation = dark ? 'overlay' : 'multiply';
  c.globalAlpha = amount;
  const p = c.createPattern(grainTile(dark), 'repeat');
  c.fillStyle = p; c.fillRect(0, 0, w, h);
  c.restore();
}
/* fibrous paper: grain plus a very low-frequency tonal drift */
function paper(c, w, h, base, seed) {
  c.fillStyle = base; c.fillRect(0, 0, w, h);
  const r = rng(seed || 7);
  c.save();
  for (let i = 0; i < 5; i++) {
    const g = c.createRadialGradient(r() * w, r() * h, 0, r() * w, r() * h, w * (0.5 + r() * 0.5));
    g.addColorStop(0, `rgba(0,0,0,${0.012 + r() * 0.016})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
  }
  c.restore();
  grain(c, w, h, 0.055, false);
}
function vignette(c, w, h, strength, cx, cy) {
  const g = c.createRadialGradient(cx || w / 2, cy || h * 0.44, 0, cx || w / 2, cy || h * 0.44, Math.max(w, h) * 0.78);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.62, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${strength})`);
  c.fillStyle = g; c.fillRect(0, 0, w, h);
}
function bloom(c, w, h, col, x, y, r, a) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(col, a));
  g.addColorStop(0.55, rgba(col, a * 0.28));
  g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(0, 0, w, h);
}
/* engraved hairline field — the security-print look under a headline */
function hatch(c, x, y, w, h, col, gap, angle) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.strokeStyle = col; c.lineWidth = 1;
  const g = gap || 7, a = angle == null ? -Math.PI / 4 : angle;
  const len = (w + h) * 1.5;
  const dx = Math.cos(a), dy = Math.sin(a);
  for (let i = -len; i < len; i += g) {
    c.beginPath();
    c.moveTo(x + i * -dy - dx * len, y + i * dx - dy * len);
    c.lineTo(x + i * -dy + dx * len, y + i * dx + dy * len);
    c.stroke();
  }
  c.restore();
}

/* ── images ───────────────────────────────────────────────────────────── */
function coverImg(c, img, x, y, w, h, focusY) {
  const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.drawImage(img, x + (w - dw) / 2, y + (h - dh) * (focusY == null ? 0.5 : focusY), dw, dh);
  c.restore();
}
function circleImg(c, img, cx, cy, r, ringCol, ringW) {
  c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip();
  const s = Math.max(2 * r / img.naturalWidth, 2 * r / img.naturalHeight);
  c.drawImage(img, cx - img.naturalWidth * s / 2, cy - img.naturalHeight * s / 2,
    img.naturalWidth * s, img.naturalHeight * s);
  c.restore();
  if (ringCol) {
    c.save(); c.strokeStyle = ringCol; c.lineWidth = ringW || 2;
    c.beginPath(); c.arc(cx, cy, r, 0, 7); c.stroke(); c.restore();
  }
}
/* duotone: luminance remapped between two brand colours, cached by key */
const _duoCache = {};
function duotone(img, shadow, light, key, w, h) {
  const ck = key + '|' + shadow + '|' + light + '|' + w + 'x' + h;
  if (_duoCache[ck]) return _duoCache[ck];
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const c = cv.getContext('2d');
  coverImg(c, img, 0, 0, w, h);
  const im = c.getImageData(0, 0, w, h), d = im.data;
  const s = hex2rgb(shadow), l = hex2rgb(light);
  for (let i = 0; i < d.length; i += 4) {
    let t = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
    t = Math.pow(t, 0.92);
    d[i] = s[0] + (l[0] - s[0]) * t;
    d[i + 1] = s[1] + (l[1] - s[1]) * t;
    d[i + 2] = s[2] + (l[2] - s[2]) * t;
  }
  c.putImageData(im, 0, 0);
  _duoCache[ck] = cv;
  return cv;
}

/* ── small drawn marks ────────────────────────────────────────────────── */
function icon(c, kind, cx, cy, size, col, weight) {
  c.save(); c.translate(cx, cy); c.scale(size / 24, size / 24);
  c.strokeStyle = col; c.fillStyle = col;
  c.lineWidth = (weight || 1.7) * (24 / size) * (size / 24);
  c.lineWidth = weight || 1.7;
  c.lineJoin = 'round'; c.lineCap = 'round';
  switch (kind) {
    case 'pin':
      c.beginPath(); c.moveTo(0, 10); c.bezierCurveTo(-8, 0, -8, -4, -8, -5);
      c.arc(0, -5, 8, Math.PI, 0); c.bezierCurveTo(8, -4, 8, 0, 0, 10); c.closePath(); c.fill();
      c.globalCompositeOperation = 'destination-out';
      c.beginPath(); c.arc(0, -5, 3.1, 0, 7); c.fill(); break;
    case 'bldg':
      c.strokeRect(-9, -8, 8.5, 18); c.strokeRect(1, -2, 8.5, 12);
      [[-7, -5], [-3.5, -5], [-7, -1], [-3.5, -1], [-7, 3], [-3.5, 3], [3, 1], [6.5, 1], [3, 5], [6.5, 5]]
        .forEach(p => c.fillRect(p[0], p[1], 2, 2)); break;
    case 'globe':
      c.beginPath(); c.arc(0, 0, 9, 0, 7); c.stroke();
      c.beginPath(); c.ellipse(0, 0, 4, 9, 0, 0, 7); c.stroke();
      c.beginPath(); c.moveTo(-9, 0); c.lineTo(9, 0); c.moveTo(-7.6, -4.6); c.lineTo(7.6, -4.6);
      c.moveTo(-7.6, 4.6); c.lineTo(7.6, 4.6); c.stroke(); break;
    case 'phone':
      c.beginPath(); c.moveTo(-7, -9); c.lineTo(-2, -9); c.lineTo(0, -4); c.lineTo(-3, -1.5);
      c.bezierCurveTo(-1, 2.5, 2, 5.5, 6, 7.5); c.lineTo(8.5, 4.5); c.lineTo(13, 6.5);
      c.lineTo(13, 11); c.stroke(); break;
    case 'arrow':
      c.beginPath(); c.moveTo(-9, 0); c.lineTo(9, 0); c.moveTo(3, -6); c.lineTo(9, 0);
      c.lineTo(3, 6); c.stroke(); break;
    case 'check':
      c.beginPath(); c.moveTo(-8, 0.5); c.lineTo(-2.5, 6); c.lineTo(8.5, -6); c.stroke(); break;
    case 'hands':
      c.beginPath(); c.moveTo(-11, -2); c.lineTo(-5, -6); c.lineTo(1, -2); c.lineTo(6, 2);
      c.lineTo(3, 5); c.lineTo(-1, 2); c.stroke();
      c.beginPath(); c.moveTo(11, -2); c.lineTo(5, -6); c.lineTo(0, -3); c.stroke(); break;
  }
  c.restore();
}

/* a drawn five-pointed star, so reviews don't depend on emoji rendering */
function star(c, cx, cy, r, col) {
  c.save(); c.fillStyle = col; c.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r * 0.42 : r;
    const x = cx + Math.cos(a) * rad, y = cy + Math.sin(a) * rad;
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath(); c.fill(); c.restore();
}
function stars(c, cx, cy, r, gap, col, n) {
  n = n || 5;
  const total = (n - 1) * gap;
  for (let i = 0; i < n; i++) star(c, cx - total / 2 + i * gap, cy, r, col);
}

/* ── data marks drawn on canvas (no chart library, no image) ───────────── */
function barSet(c, x, y, w, h, values, o) {
  o = o || {};
  const n = values.length, gap = o.gap == null ? 18 : o.gap;
  const bw = (w - gap * (n - 1)) / n;
  const max = Math.max.apply(null, values.map(v => v.v));
  values.forEach((v, i) => {
    const bh = Math.max(4, h * (v.v / max));
    const bx = x + i * (bw + gap), by = y + h - bh;
    c.fillStyle = v.hi ? (o.hi || '#4A93D1') : (o.base || 'rgba(255,255,255,.18)');
    if (o.round) { rr(c, bx, by, bw, bh, Math.min(8, bw / 2)); c.fill(); }
    else c.fillRect(bx, by, bw, bh);
    if (o.label !== false) {
      caps(c, v.k, bx + bw / 2, y + h + 30, { size: 15, fill: o.labelCol || 'rgba(255,255,255,.55)', align: 'center', track: 2.4 });
      text(c, v.t || v.v, bx + bw / 2, by - 18, {
        font: FN(600, o.valueSize || 24), fill: v.hi ? (o.hi || '#4A93D1') : (o.valueCol || '#fff'),
        align: 'center', base: 'alphabetic'
      });
    }
  });
}

/* timeline / gantt rail used by the process posts */
function railMarks(c, x, y, w, marks, o) {
  o = o || {};
  rule(c, x, y, w, o.rail || 'rgba(255,255,255,.22)', 2);
  marks.forEach(m => {
    const mx = x + w * m.t;
    c.fillStyle = m.hi ? (o.hi || '#4A93D1') : (o.dot || '#fff');
    c.beginPath(); c.arc(mx, y, m.hi ? 11 : 7, 0, 7); c.fill();
    if (m.hi) { c.strokeStyle = rgba(o.hi || '#4A93D1', .35); c.lineWidth = 10; c.beginPath(); c.arc(mx, y, 17, 0, 7); c.stroke(); }
    text(c, m.v, mx, y - 34, { font: FS(600, o.vSize || 46), fill: o.vCol || '#fff', align: 'center', base: 'alphabetic' });
    caps(c, m.k, mx, y + 40, { size: 15, fill: o.kCol || 'rgba(255,255,255,.55)', align: 'center', track: 2.4 });
  });
}
