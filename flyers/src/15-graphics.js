/* ══════════════════════════════════════════════════════════════════════════
   15-graphics.js — the pictures

   Type on a flat field is a poster; type on an image is a piece of design.
   There is no stock photography here and there never will be — the page has
   to work offline and every pixel has to be ours. So the imagery is drawn:
   engraved rosettes off the security-printing tradition, isometric massing
   the way a developer sketches a block, contour fields, halftone screens.
   All of it parametric and seeded, so a post's picture belongs to that post
   and comes back identical on every reload.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── guilloché ────────────────────────────────────────────────────────────
   The rosette engraved on share certificates and banknotes: two rotating
   radii tracing a hypotrochoid, repeated with a small phase shift so the
   line crossings build the moiré. Hairlines only — it must read as engraving,
   never as a gradient.
   ─────────────────────────────────────────────────────────────────────── */
function guilloche(c, cx, cy, R, o) {
  o = o || {};
  const rings = o.rings || 5, petals = o.petals || 11;
  const inner = o.inner == null ? 0.62 : o.inner;
  const arm = o.arm == null ? 0.30 : o.arm;
  const steps = o.steps || 1400;
  c.save();
  c.lineWidth = o.weight || 1;
  c.strokeStyle = o.color || 'rgba(255,255,255,.10)';
  if (o.alpha != null) c.globalAlpha = o.alpha;
  for (let k = 0; k < rings; k++) {
    const phase = (k / rings) * (Math.PI * 2 / petals);
    const scale = 1 - k * (o.decay == null ? 0.055 : o.decay);
    c.beginPath();
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2;
      const rr = R * scale;
      /* hypotrochoid: big circle radius rr, rolling circle rr*(1-inner) */
      const d = rr * (1 - inner);
      const x = cx + (rr - d) * Math.cos(t + phase) + rr * arm * Math.cos(((rr - d) / d) * (t + phase));
      const y = cy + (rr - d) * Math.sin(t + phase) - rr * arm * Math.sin(((rr - d) / d) * (t + phase));
      i ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath();
    c.stroke();
  }
  c.restore();
}

/* a plain engraved ring set, used as a seal or a target */
function engravedRings(c, cx, cy, r0, r1, count, col, weight) {
  c.save();
  c.strokeStyle = col; c.lineWidth = weight || 1;
  for (let i = 0; i < count; i++) {
    c.beginPath();
    c.arc(cx, cy, r0 + (r1 - r0) * (i / (count - 1)), 0, Math.PI * 2);
    c.stroke();
  }
  c.restore();
}

/* ── isometric massing ────────────────────────────────────────────────────
   How the block gets drawn on a napkin before anybody models it: a grid of
   parcels extruded to different heights, two faces shaded, one lit. The
   subject of every one of these posts, drawn rather than described.
   ─────────────────────────────────────────────────────────────────────── */
function isoMassing(c, cx, baseY, cell, cols, rows, seed, o) {
  o = o || {};
  const r = rng(seed);
  const top = o.top || '#2C6E96', left = o.left || '#153B55', right = o.right || '#0E2739';
  const edge = o.edge || 'rgba(255,255,255,.18)';
  const kx = cell, ky = cell * 0.5;
  const heights = [];
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const v = r();
    /* a couple of towers, a lot of low-rise — a real block, not a bar chart */
    const h = v > 0.90 ? cell * (2.6 + r() * 1.9)
      : v > 0.66 ? cell * (1.1 + r() * 0.9)
        : v > 0.24 ? cell * (0.36 + r() * 0.5)
          : 0;
    heights.push({ i, j, h, hero: v > 0.90 });
  }
  /* painter's algorithm: far cells first */
  heights.sort((a, b) => (a.i + a.j) - (b.i + b.j));
  c.save();
  if (o.alpha != null) c.globalAlpha = o.alpha;
  heights.forEach(p => {
    if (p.h <= 0) return;
    const x = cx + (p.i - p.j) * kx * 0.5;
    const y = baseY + (p.i + p.j) * ky * 0.5;
    const hh = p.h;
    /* right face */
    c.fillStyle = p.hero && o.heroRight ? o.heroRight : right;
    c.beginPath();
    c.moveTo(x, y); c.lineTo(x + kx * .5, y - ky * .5);
    c.lineTo(x + kx * .5, y - ky * .5 - hh); c.lineTo(x, y - hh);
    c.closePath(); c.fill();
    /* left face */
    c.fillStyle = p.hero && o.heroLeft ? o.heroLeft : left;
    c.beginPath();
    c.moveTo(x, y); c.lineTo(x - kx * .5, y - ky * .5);
    c.lineTo(x - kx * .5, y - ky * .5 - hh); c.lineTo(x, y - hh);
    c.closePath(); c.fill();
    /* roof */
    c.fillStyle = p.hero && o.heroTop ? o.heroTop : top;
    c.beginPath();
    c.moveTo(x, y - hh);
    c.lineTo(x + kx * .5, y - ky * .5 - hh);
    c.lineTo(x, y - ky - hh);
    c.lineTo(x - kx * .5, y - ky * .5 - hh);
    c.closePath(); c.fill();
    if (edge) {
      c.strokeStyle = edge; c.lineWidth = 1;
      c.beginPath();
      c.moveTo(x, y - hh); c.lineTo(x + kx * .5, y - ky * .5 - hh);
      c.lineTo(x, y - ky - hh); c.lineTo(x - kx * .5, y - ky * .5 - hh);
      c.closePath(); c.stroke();
      c.beginPath(); c.moveTo(x, y - hh); c.lineTo(x, y); c.stroke();
    }
  });
  c.restore();
}

/* ── contour field ────────────────────────────────────────────────────────
   A topographic reading of a surface built from three sine terms. Reads as
   land, as a heat map, or as a rate curve depending on what sits over it.
   ─────────────────────────────────────────────────────────────────────── */
function contourField(c, x, y, w, h, seed, o) {
  o = o || {};
  const r = rng(seed);
  const lines = o.lines || 26, step = o.step || 6;
  const a1 = 0.6 + r(), a2 = 0.8 + r() * 1.4, a3 = 1.2 + r() * 2;
  const p1 = r() * 6.28, p2 = r() * 6.28, p3 = r() * 6.28;
  c.save();
  c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.lineWidth = o.weight || 1;
  if (o.alpha != null) c.globalAlpha = o.alpha;
  for (let k = 0; k < lines; k++) {
    const t = k / (lines - 1);
    c.strokeStyle = typeof o.color === 'function' ? o.color(t) : (o.color || 'rgba(255,255,255,.10)');
    c.beginPath();
    for (let px = 0; px <= w; px += step) {
      const u = px / w;
      const amp = h * (o.amp == null ? 0.16 : o.amp);
      const yy = y + h * t
        + Math.sin(u * a1 * 6.28 + p1) * amp * 0.5
        + Math.sin(u * a2 * 6.28 + p2 + t * 2.2) * amp * 0.32
        + Math.sin(u * a3 * 6.28 + p3 - t * 1.4) * amp * 0.18;
      px ? c.lineTo(x + px, yy) : c.moveTo(x + px, yy);
    }
    c.stroke();
  }
  c.restore();
}

/* ── halftone screen ──────────────────────────────────────────────────────
   A printed tint: dot radius driven by a density function, on a rotated
   screen so it never looks like a CSS pattern.
   ─────────────────────────────────────────────────────────────────────── */
function halftone(c, x, y, w, h, o) {
  o = o || {};
  const pitch = o.pitch || 13, ang = o.angle == null ? -0.32 : o.angle;
  const maxR = o.maxR || pitch * 0.46;
  const density = o.density || (u => 1 - u);
  c.save();
  c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.fillStyle = o.color || 'rgba(255,255,255,.2)';
  if (o.alpha != null) c.globalAlpha = o.alpha;
  const diag = Math.hypot(w, h);
  const cos = Math.cos(ang), sin = Math.sin(ang);
  for (let v = -diag; v < diag; v += pitch) {
    for (let u = -diag; u < diag; u += pitch) {
      const px = x + w / 2 + u * cos - v * sin;
      const py = y + h / 2 + u * sin + v * cos;
      if (px < x - pitch || px > x + w + pitch || py < y - pitch || py > y + h + pitch) continue;
      const d = clamp(density((px - x) / w, (py - y) / h), 0, 1);
      const rr = maxR * d;
      if (rr < 0.35) continue;
      c.beginPath(); c.arc(px, py, rr, 0, 6.284); c.fill();
    }
  }
  c.restore();
}

/* ── strata ───────────────────────────────────────────────────────────────
   Horizon bands with a soft edge — a skyline abstracted down to tone. Cheap
   ground for a frame that needs depth but must not compete with the type.
   ─────────────────────────────────────────────────────────────────────── */
function strata(c, x, y, w, h, seed, o) {
  o = o || {};
  const r = rng(seed), bands = o.bands || 7;
  c.save();
  c.beginPath(); c.rect(x, y, w, h); c.clip();
  for (let i = 0; i < bands; i++) {
    const t = i / bands;
    const by = y + h * (0.24 + t * 0.76) + (r() - 0.5) * h * 0.05;
    const g = c.createLinearGradient(0, by - h * 0.10, 0, by + h * 0.16);
    const a = (o.alpha || 0.10) * (0.4 + t * 0.9);
    g.addColorStop(0, rgba(o.color || '#ffffff', 0));
    g.addColorStop(1, rgba(o.color || '#ffffff', a));
    c.fillStyle = g;
    c.fillRect(x, by - h * 0.10, w, h * 0.26);
  }
  c.restore();
}

/* ── foil ─────────────────────────────────────────────────────────────────
   A metallic sweep for rules and hairlines, so gold reads as stamped rather
   than as a flat swatch.
   ─────────────────────────────────────────────────────────────────────── */
function foilRule(c, x, y, w, weight, base, hi) {
  const g = c.createLinearGradient(x, y, x + w, y);
  g.addColorStop(0, rgba(base, .35));
  g.addColorStop(0.28, hi);
  g.addColorStop(0.52, base);
  g.addColorStop(0.74, hi);
  g.addColorStop(1, rgba(base, .35));
  c.save(); c.fillStyle = g; c.fillRect(x, y, w, weight || 3); c.restore();
}

/* ── redaction, paperclip, tab — the Dossier's props ──────────────────── */
function redaction(c, x, y, w, h, col) {
  c.save();
  c.fillStyle = col;
  c.fillRect(x, y, w, h);
  /* the ink is never perfectly opaque at the edges */
  c.globalAlpha = .35;
  c.fillRect(x - 3, y + 2, w + 6, h - 4);
  c.restore();
}
function paperclip(c, x, y, s, col) {
  c.save();
  c.translate(x, y); c.scale(s / 24, s / 24); c.rotate(0.12);
  c.strokeStyle = col; c.lineWidth = 2.6; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath();
  c.moveTo(0, 26); c.lineTo(0, 6);
  c.arc(5, 6, 5, Math.PI, 0);
  c.lineTo(10, 30);
  c.arc(4.5, 30, 5.5, 0, Math.PI);
  c.lineTo(-1, 10);
  c.stroke();
  c.restore();
}
function fileTab(c, x, y, w, h, label, fill, ink) {
  c.save();
  c.fillStyle = fill;
  c.beginPath();
  c.moveTo(x, y + h); c.lineTo(x + 14, y); c.lineTo(x + w - 14, y);
  c.lineTo(x + w, y + h); c.closePath(); c.fill();
  caps(c, label, x + w / 2, y + h / 2 + 2, { size: 13, weight: 700, fill: ink, align: 'center', track: 3 });
  c.restore();
}

/* ── north arrow and scale bar — the Blueprint's props ─────────────────── */
function northArrow(c, cx, cy, r, col, ink) {
  c.save();
  c.strokeStyle = col; c.lineWidth = 1;
  c.beginPath(); c.arc(cx, cy, r, 0, 6.284); c.stroke();
  c.fillStyle = col;
  c.beginPath();
  c.moveTo(cx, cy - r * .74); c.lineTo(cx + r * .34, cy + r * .44);
  c.lineTo(cx, cy + r * .2); c.closePath(); c.fill();
  c.globalAlpha = .45;
  c.beginPath();
  c.moveTo(cx, cy - r * .74); c.lineTo(cx - r * .34, cy + r * .44);
  c.lineTo(cx, cy + r * .2); c.closePath(); c.fill();
  c.globalAlpha = 1;
  caps(c, 'N', cx, cy - r - 13, { size: 12, fill: ink || col, align: 'center', track: 1 });
  c.restore();
}
function scaleBar(c, x, y, w, col, ink, label) {
  const seg = w / 4;
  for (let i = 0; i < 4; i++) {
    c.fillStyle = i % 2 ? 'transparent' : col;
    if (i % 2 === 0) c.fillRect(x + seg * i, y, seg, 7);
  }
  c.save(); c.strokeStyle = col; c.lineWidth = 1;
  c.strokeRect(hair(x), hair(y), w, 7); c.restore();
  caps(c, label || 'scale', x, y + 24, { size: 11, fill: ink || col, track: 2.4 });
}

/* ── sheet coordinates — letters across, numbers down ─────────────────── */
function sheetCoords(c, x, y, w, h, col) {
  const cols = 'ABCDEFGH', n = 6;
  for (let i = 0; i < n; i++) {
    caps(c, cols[i], x + (w / n) * (i + .5), y - 12, { size: 11, fill: col, align: 'center', track: 1.6 });
    caps(c, String(i + 1), x - 16, y + (h / n) * (i + .5), { size: 11, fill: col, align: 'center', track: 1.6 });
  }
}
