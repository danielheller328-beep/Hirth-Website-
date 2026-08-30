/* ══════════════════════════════════════════════════════════════════════════
   45-poster.js — PRESS: the screen-printed portrait poster

   The house piece. Daniel set large and bleeding off a corner, big type on
   the open field, the mark top-left and the contact line along the foot.

   The photograph runs as shot — no screen, no duotone, no filter. The frame
   masks it to a shape and crops it, and that is the whole treatment.

   Two files, one shoot. `dh` is the head-and-shoulders crop, for anything
   circular. `dhero` is the full frame — head to hip, on the open floor — and
   it is what makes the tall plates possible: a column, an arch, a full bleed
   down one side of the sheet. Both are large enough now that nothing is
   enlarged past its own pixels.
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

   The only processing is a size cap. An unedited photograph blown up much
   past its own resolution goes soft, so plateSize() reads the cap off the
   file itself and refuses to draw one bigger than that. Swap in a larger
   photograph and every plate in every cut grows on its own.
   ─────────────────────────────────────────────────────────────────────── */
const MAX_UPSCALE = 1.5;

function plateSize(img, want) {
  if (!img) return want;
  return Math.min(want, img.naturalWidth * MAX_UPSCALE);
}
function plateShape(c, shape, x, y, w, h) {
  c.beginPath();
  if (shape === 'circle') c.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, 6.284);
  else if (shape === 'arch') {
    const rr = Math.min(w / 2, h);
    c.moveTo(x, y + h); c.lineTo(x, y + rr);
    c.arc(x + w / 2, y + rr, rr, Math.PI, 0);
    c.lineTo(x + w, y + h); c.closePath();
  } else if (shape === 'round') {
    const r = Math.min(w, h) * .06;
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r);
    c.closePath();
  } else c.rect(x, y, w, h);
}

/* ── clarity ──────────────────────────────────────────────────────────────
   Bicubic enlargement is soft by construction — it invents the in-between
   pixels by averaging, which is exactly what "blurry" means. An unsharp mask
   puts the edge contrast back: blur a copy, subtract it from the original to
   isolate the edges, then add those edges back at strength.

   It only runs when the plate is actually bigger than the pixels behind it.
   A photograph drawn at or below its own resolution needs nothing, and
   sharpening one that does not need it is how a face starts to look etched.
   The scale decides, not the caller. Cached either way.
   ─────────────────────────────────────────────────────────────────────── */
const _faceCache = {};
function sharpFace(img, key, w, h, zoom, fx, fy) {
  const ck = [key, Math.round(w), Math.round(h), zoom, fx, fy].join('|');
  if (_faceCache[ck]) return _faceCache[ck];
  const W = Math.ceil(w), H = Math.ceil(h);
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const c = cv.getContext('2d');
  c.imageSmoothingEnabled = true;
  c.imageSmoothingQuality = 'high';
  const iw = img.naturalWidth, ih = img.naturalHeight;
  const scale = Math.max(W / iw, H / ih) * (zoom || 1);
  const dw = iw * scale, dh = ih * scale;
  /* fx/fy say which point of the photograph to bring to the middle of the
     plate — but only as far as the photograph can travel and still cover it.
     Without the clamp a plate the picture exactly fills slides off its own
     edge and opens a band of whatever is behind. */
  const ox = clamp(W / 2 - dw * fx, Math.min(0, W - dw), 0);
  const oy = clamp(H / 2 - dh * fy, Math.min(0, H - dh), 0);
  c.drawImage(img, ox, oy, dw, dh);

  /* drawn at or under 1:1 — the photograph is already as sharp as it gets */
  if (scale <= 1.02) { _faceCache[ck] = cv; return cv; }

  const im = c.getImageData(0, 0, W, H), d = im.data;
  const src = new Uint8ClampedArray(d);
  const amount = clamp((scale - 1) * 1.2, 0, .85), radius = 1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (src[i + 3] < 8) continue;
      for (let k = 0; k < 3; k++) {
        /* 3x3 box blur of the neighbourhood */
        let sum = 0, n = 0;
        for (let dy = -radius; dy <= radius; dy++) {
          const yy = y + dy; if (yy < 0 || yy >= H) continue;
          for (let dx = -radius; dx <= radius; dx++) {
            const xx = x + dx; if (xx < 0 || xx >= W) continue;
            sum += src[(yy * W + xx) * 4 + k]; n++;
          }
        }
        const blur = sum / n;
        d[i + k] = clamp(src[i + k] + (src[i + k] - blur) * amount, 0, 255);
      }
    }
  }
  c.putImageData(im, 0, 0);
  _faceCache[ck] = cv;
  return cv;
}

/* o.shape 'circle'|'rect'|'arch' · o.zoom · o.fx/fy focus point · o.key */
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
  const fx = o.fx == null ? .5 : o.fx, fy = o.fy == null ? .5 : o.fy;
  c.drawImage(sharpFace(img, o.key || 'dh', w, h, zoom, fx, fy), x, y);
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
   portrait every week. Seven cuts rotate independently of the statement — a
   different plate shape, a different crop, a different polarity of ink, and
   in three of them a standing figure rather than a head in a circle. Seven
   and six share no factor, so it is forty-two weeks before a statement meets
   the same cut a second time.
   ══════════════════════════════════════════════════════════════════════════ */

/* the feather that lets a bled plate leave the sheet instead of stopping on
   it — the ground colour pulled back across the plate's inboard edge */
function plateFeather(c, x, y, w, h, col, side, run) {
  const r = run || 150;
  const g = side === 'right'
    ? c.createLinearGradient(x + w, y, x + w - r, y)
    : c.createLinearGradient(x, y, x + r, y);
  g.addColorStop(0, rgba(col, .92)); g.addColorStop(1, rgba(col, 0));
  c.fillStyle = g; c.fillRect(x, y, w, h);
}

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
          key: 'dh', shape: 'circle', edge: rgba('#C6A461', .85), edgeWidth: 3,
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
          key: 'dh', shape: 'circle', edge: rgba('#C6A461', .85), edgeWidth: 3,
          shadow: ['rgba(0,0,0,.65)', 50, 16]
        });
      }
      logoLockup(c, M, 120, 250, 'white');
      caps(c, P.kicker, M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 470, w - M * 2, 132, { boxH: 500, maxLines: 4 });
      pressSig(c, M, h - 230);
    } },

  /* 2 · COLUMN — the standing figure run full height off the right edge, the
     photograph feathered into the ground so it leaves the sheet rather than
     stopping on it. The words hold the whole left column. */
  { id: 'column', name: 'Column',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGround(c, w, h, S.seed);
      const pw = 452, px = w - pw;
      if (face) {
        portraitPhoto(c, face, px, 0, pw, h, { key: 'hero', shape: 'rect', fx: .52, fy: .40 });
        plateFeather(c, px, 0, 220, h, '#081824', 'left', 220);
        line(c, hair(px), 0, hair(px), h, rgba('#C6A461', .40), 1);
      }
      logoLockup(c, M, LOGO_Y, 200, 'white');
      caps(c, P.kicker, M, LOGO_Y + 150, { size: 14, fill: PRESS.accent, track: 4 });
      pressHead(c, P, M, 300, px - M - 54, 82, { boxH: 430, maxLines: 5 });
      pressSig(c, M, h - 210, { size: 38 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGround(c, w, h, S.seed);
      const pw = 520, px = w - pw, py = 880;
      if (face) {
        portraitPhoto(c, face, px, py, pw, h - py, { key: 'hero', shape: 'rect', fx: .52, fy: .34 });
        plateFeather(c, px, py, 200, h - py, '#081824', 'left', 200);
        line(c, hair(px), py, hair(px), h, rgba('#C6A461', .40), 1);
      }
      logoLockup(c, M, 120, 250, 'white');
      caps(c, P.kicker, M, 300, { size: 16, fill: PRESS.accent, track: 4.4 });
      pressHead(c, P, M, 440, w - M * 2, 130, { boxH: 380, maxLines: 3 });
      pressSig(c, M, h - 300, { size: 38 });
    } },

  /* 3 · CARD — the photograph mounted on a printed card laid on the sheet.
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
          key: 'dh', shape: 'circle', edge: rgba('#14222B', .18), edgeWidth: 2
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
        key: 'dh', shape: 'circle', edge: rgba('#14222B', .18), edgeWidth: 2
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

  /* 4 · ARCH — the figure standing in a niche, on a ruled floor. The only cut
     where he is a whole person rather than a head, and the frame says so. */
  { id: 'arch', name: 'Arch',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGround(c, w, h, S.seed);
      const aw = 404, ah = 640, ax = w - aw - 92, ay = h - ah - 148;
      if (face) {
        c.save();
        c.strokeStyle = rgba('#C6A461', .28); c.lineWidth = 1;
        plateShape(c, 'arch', ax - 20, ay - 20, aw + 40, ah + 40); c.stroke();
        plateShape(c, 'arch', ax - 40, ay - 40, aw + 80, ah + 80); c.stroke();
        c.restore();
        portraitPhoto(c, face, ax, ay, aw, ah, {
          key: 'hero', shape: 'arch', fx: .5, fy: .40,
          edge: rgba('#C6A461', .8), edgeWidth: 2, shadow: ['rgba(0,0,0,.6)', 44, 14]
        });
      }
      rule(c, ax - 96, ay + ah + 1, aw + 192, rgba('#C6A461', .42), 2);
      rule(c, ax - 62, ay + ah + 13, aw + 124, rgba('#C6A461', .18), 1);
      logoLockup(c, M, LOGO_Y, 200, 'white');
      caps(c, P.kicker, M, LOGO_Y + 150, { size: 14, fill: PRESS.accent, track: 4 });
      pressHead(c, P, M, 300, ax - M - 78, 78, { boxH: 400, maxLines: 5 });
      pressSig(c, M, h - 200, { size: 36 });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGround(c, w, h, S.seed);
      const aw = 600, ah = 850, ax = (w - aw) / 2, ay = 780;
      if (face) {
        c.save();
        c.strokeStyle = rgba('#C6A461', .26); c.lineWidth = 1;
        plateShape(c, 'arch', ax - 24, ay - 24, aw + 48, ah + 48); c.stroke();
        plateShape(c, 'arch', ax - 48, ay - 48, aw + 96, ah + 96); c.stroke();
        c.restore();
        portraitPhoto(c, face, ax, ay, aw, ah, {
          key: 'hero', shape: 'arch', fx: .5, fy: .40,
          edge: rgba('#C6A461', .8), edgeWidth: 2, shadow: ['rgba(0,0,0,.6)', 48, 16]
        });
      }
      rule(c, ax - 110, ay + ah + 1, aw + 220, rgba('#C6A461', .42), 2);
      logoLockup(c, w / 2, 130, 250, 'white', 'center');
      caps(c, P.kicker, w / 2, 310, { size: 16, fill: PRESS.accent, align: 'center', track: 4.4 });
      pressHead(c, P, w / 2, 420, w - M * 2, 108, { boxH: 320, maxLines: 3, align: 'center' });
      pressSig(c, w / 2, h - 190, { align: 'center', size: 36 });
    } },

  /* 5 · INVERSE — printed on paper: cream stock, dark type, photograph left */
  { id: 'inverse', name: 'Inverse',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG[P.who || 'dh'];
      pressGroundLight(c, w, h, S.seed);
      if (face) {
        const d = plateSize(face, 528), x = -d * .06, y = h - d * .92;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 18, d / 2 + 52, 3, rgba('#9A7A3E', .28), 1);
        portraitPhoto(c, face, x, y, d, d, {
          key: 'dh', shape: 'circle', edge: rgba('#9A7A3E', .8), edgeWidth: 3,
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
        const d = plateSize(face, 528), x = -d * .05, y = h - d - 300;
        engravedRings(c, x + d / 2, y + d / 2, d / 2 + 20, d / 2 + 58, 3, rgba('#9A7A3E', .28), 1);
        portraitPhoto(c, face, x, y, d, d, {
          key: 'dh', shape: 'circle', edge: rgba('#9A7A3E', .8), edgeWidth: 3,
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

  /* 6 · STANDING — cream stock again, but the whole figure this time, mounted
     as a print with a hairline border and the words set against it, right. */
  { id: 'standing', name: 'Standing',
    feed(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGroundLight(c, w, h, S.seed);
      const pw = 424, ph = 704, px = M + 10, py = h - ph - 116;
      if (face) {
        portraitPhoto(c, face, px, py, pw, ph, {
          key: 'hero', shape: 'round', fx: .5, fy: .40,
          edge: rgba('#9A7A3E', .55), edgeWidth: 2, shadow: ['rgba(70,58,38,.30)', 40, 14]
        });
        c.save();
        c.strokeStyle = rgba('#9A7A3E', .35); c.lineWidth = 1;
        c.strokeRect(hair(px - 14), hair(py - 14), pw + 28, ph + 28);
        c.restore();
      }
      logoLockup(c, w - M, LOGO_Y, 200, 'color', 'right');
      caps(c, P.kicker, w - M, LOGO_Y + 150, { size: 14, fill: '#9A7A3E', align: 'right', track: 4 });
      pressHead(c, P, w - M, 300, w - (px + pw) - 54 - M, 74, {
        boxH: 430, maxLines: 6, align: 'right', ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, w - M, h - 212, {
        align: 'right', size: 36, ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    },
    story(c, P, S) {
      const w = S.w, h = S.h, M = S.M, face = IMG.dhero || IMG.dh;
      pressGroundLight(c, w, h, S.seed);
      const pw = 520, ph = 880, px = M, py = 860;
      if (face) {
        portraitPhoto(c, face, px, py, pw, ph, {
          key: 'hero', shape: 'round', fx: .5, fy: .40,
          edge: rgba('#9A7A3E', .55), edgeWidth: 2, shadow: ['rgba(70,58,38,.30)', 44, 16]
        });
        c.save();
        c.strokeStyle = rgba('#9A7A3E', .35); c.lineWidth = 1;
        c.strokeRect(hair(px - 16), hair(py - 16), pw + 32, ph + 32);
        c.restore();
      }
      logoLockup(c, M, 130, 250, 'color');
      caps(c, P.kicker, M, 306, { size: 16, fill: '#9A7A3E', track: 4.4 });
      pressHead(c, P, M, 430, w - M * 2, 116, {
        boxH: 340, maxLines: 3, ink: '#14222B', em: '#1C5C86',
        foil: '#9A7A3E', foilHi: '#D8BE84', shadow: false
      });
      pressSig(c, px + pw + 52, 1280, {
        size: 34, ink: '#14222B', body: '#4A5560', muted: '#8A9299',
        accent: '#9A7A3E', accentRule: 'rgba(154,122,62,.6)', shadow: null
      });
    } },

  /* 7 · MEDALLION — smaller, centred, ringed; the words take the frame */
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
          key: 'dh', shape: 'circle', edge: rgba('#C6A461', .9), edgeWidth: 3,
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
          key: 'dh', shape: 'circle', edge: rgba('#C6A461', .9), edgeWidth: 3,
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

Daniel Hirth · Principal
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

Daniel Hirth · Principal
310.300.2838 · HirthGroup.com`,
    tags: '#ThinkingOfSelling #CommercialRealEstate #CRE #SellCommercial #BrokerOpinionOfValue #PropertyValuation #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty #RealEstateStrategy #1031Exchange #DaysOnMarket' },

  { id: 'p-quiet', kicker: 'How We Work',
    line: 'The best deals I have done *never hit a platform.*',
    cap: `The best deals I have done never hit a platform.

An owner mentions to somebody that they are tired. A broker who already knows the buyer for that specific asset picks up the phone. It trades in three weeks and you never saw it, because there was nothing to see.

You do not get on that call by refreshing listing alerts. You get on it by being the specific answer to a question somebody is about to ask.

Daniel Hirth · The Hirth Group
310.300.2838 · HirthGroup.com`,
    tags: '#OffMarket #DealFlow #PocketListing #CommercialRealEstate #CRE #CREBroker #InvestmentProperty #BuyerRepresentation #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #CommercialProperty #RealEstateInvesting #SanFernandoValley' },

  { id: 'p-third', kicker: 'Pricing',
    line: 'Nobody buys the third price cut. *They wait for the fourth.*',
    cap: `Nobody buys the third price cut. They wait for the fourth.

Cut once and the market reads it as a correction. Cut twice and it reads as a problem. Cut three times and every buyer watching has learned that waiting is free — so they wait, and you cut again, and you have trained them to.

The number that works is the one you open at. Everything after it is negotiating against yourself in public.

Daniel Hirth · Principal
310.300.2838`,
    tags: '#Pricing #DaysOnMarket #SellCommercial #CommercialRealEstate #CRE #ListingStrategy #PropertyValuation #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty #ThinkingOfSelling #BrokerOpinionOfValue' },

  { id: 'p-answer', kicker: 'Due Diligence',
    line: 'Ask me what is wrong with it. *I will tell you.*',
    cap: `Ask me what is wrong with it. I will tell you.

Every building has something. The roof is at the end of its life, the parking is non-conforming, the anchor tenant has two years left and an option nobody has read. None of that kills a deal. Finding it in week six does.

A broker who only tells you what is good about a building is not representing you. They are marketing at you.

Daniel Hirth · The Hirth Group · 310.300.2838`,
    tags: '#DueDiligence #CommercialRealEstate #CRE #BuyerRepresentation #InvestmentProperty #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #Underwriting #CommercialProperty #RealEstateInvesting #DealFlow #ValueAdd' },

  { id: 'p-nineteen', kicker: 'The Record',
    line: 'Nineteen years in one market. *That is the whole edge.*',
    cap: `Nineteen years in one market. That is the whole edge.

I know which corners absorb space and which ones have been quietly dying for a decade. I know which owners have been approached eleven times and which have never been asked. That is not something you read off a platform — it is a map you build one deal at a time.

197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

Daniel Hirth · Principal
310.300.2838 · HirthGroup.com`,
    tags: '#LosAngelesRealEstate #LARealEstate #CommercialRealEstate #CRE #CREBroker #InvestmentProperty #DealFlow #HirthGroup #KWCommercial #CommercialProperty #RealEstateInvesting #SanFernandoValley #IndustrialRealEstate #RetailRealEstate #SoldByHirth' },

  { id: 'p-honest', kicker: 'Valuation',
    line: 'An honest number first. *Even when it is not the one you want.*',
    cap: `An honest number first — even when it is not the one you want.

An appraisal tells you what a building was worth. A broker should tell you what it will trade for, to the buyers who are actually in the market this quarter, at the rates they are actually being quoted.

Those are different jobs, and only one of them helps you decide.

No listing agreement, no obligation. Just the number.

Daniel Hirth · 310.300.2838 · HirthGroup.com`,
    tags: '#PropertyValuation #BrokerOpinionOfValue #CommercialRealEstate #CRE #SellCommercial #CREBroker #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty #RealEstateStrategy #ThinkingOfSelling #CapRate #CommercialProperty' },

  { id: 'p-return', kicker: 'The Business',
    line: 'Built on the second deal. *Not the first one.*',
    cap: `Built on the second deal, not the first one.

Anybody can win a listing. The business that lasts is the one where the same owner calls you again four years later, and then sends you their partner.

That only happens if the first deal was run straight — including the parts where the honest answer cost us something.

197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

Daniel Hirth · The Hirth Group · 310.300.2838`,
    tags: '#CommercialRealEstate #CRE #CREBroker #ClientFirst #HirthGroup #KWCommercial #LosAngelesRealEstate #LARealEstate #InvestmentProperty #RealEstateInvesting #CommercialProperty #DealFlow #SoldByHirth #Testimonial #RealEstateStrategy' },

  /* The six above all argue a principle in the same register — Daniel stating
     how the business ought to work. Four of these run in a fortnight, back to
     back, and six variations on one voice reads as one voice. These six break
     the shape on purpose: a specific street, a buyer instead of a seller, an
     hour of the actual job, a joke, a tenant, and a deal that did not happen. */

  { id: 'p-corner', kicker: 'Submarkets',
    line: 'One mile north on the same street. *A different market.*',
    cap: `Sepulveda in Van Nuys and Sepulveda in Sherman Oaks are the same street and not the same market. Neither are the two ends of Lankershim.

Rents diverge, absorption diverges, and the buyer pool diverges — and none of it shows up in a search radius, which is how a building gets priced off comps from a mile away that have nothing to do with it.

That is not something you can look up. It is the part you have to have walked.

Daniel Hirth · The Hirth Group · 310.300.2838`,
    tags: '#Submarket #SanFernandoValley #LosAngelesRealEstate #IndustrialRealEstate #Absorption #HirthGroup' },

  { id: 'p-buyer', kicker: 'For Buyers',
    line: 'You lose on the deal *you never saw.*',
    cap: `The building you overpaid for is rarely the expensive mistake. The expensive one is the building that traded quietly in March to somebody who was on a list you were not on.

You cannot outbid a deal you never heard about. And the owners worth buying from are not the ones running a process — they are the ones who have not decided to sell yet.

If you are buying in LA this year, the useful question is not what is listed. It is who knows you are looking.

Daniel Hirth · 310.300.2838 · HirthGroup.com`,
    tags: '#BuyerRepresentation #OffMarket #DealFlow #LosAngelesRealEstate #CommercialRealEstate #HirthGroup' },

  { id: 'p-tuesday', kicker: 'The Job',
    line: 'Most of this job is *phone calls nobody sees.*',
    cap: `A normal Tuesday: four owners who are not selling, one who might be in eighteen months, a lender who tells me what is actually getting quoted this week, and a tenant rep who mentions his client is outgrowing a space in Sun Valley.

None of that closes anything. All of it is why the call in November has an answer ready.

The deal is the visible part. The nineteen years of calls underneath it are the product.

Daniel Hirth · Principal
310.300.2838 · HirthGroup.com`,
    tags: '#CREBroker #DealFlow #LosAngelesRealEstate #BrokerLife #CommercialRealEstate #HirthGroup' },

  { id: 'p-drone', kicker: 'How We Work',
    line: 'No drone footage. *Just the number.*',
    cap: `Nobody has ever bought a building because the video had a sunset in it.

Buyers want the rent roll, the trailing twelve, what the taxes reassess to, and what the last three comparable assets actually traded at. Give them that in week one and the good ones move in week two.

Marketing is not the job. Being right about the price is the job.

Daniel Hirth · The Hirth Group
310.300.2838 · CA DRE 01515796`,
    tags: '#SellCommercial #ListingStrategy #PropertyValuation #CommercialRealEstate #LosAngelesRealEstate #HirthGroup' },

  { id: 'p-rent', kicker: 'Owner-Users',
    line: 'Every month you rent, *you are funding a landlord’s retirement.*',
    cap: `If your business has been in the same space six years and you are still signing renewals, run the other number once.

SBA money puts an owner-user into a building for around ten percent down. The payment often lands near the rent you are already paying — except the principal is yours, the appreciation is yours, and in year fifteen you own an asset instead of a stack of expired leases.

It does not pencil for everybody. It pencils for more people than run it.

Daniel Hirth · 310.300.2838`,
    tags: '#OwnerUser #SBA #IndustrialRealEstate #CommercialRealEstate #LosAngelesRealEstate #HirthGroup' },

  { id: 'p-walkaway', kicker: 'The Business',
    line: 'The deal I talked you out of *is why you called back.*',
    cap: `In 2019 I told a client to walk from a building he wanted. The roof was at the end of its life and the anchor had an option nobody had read carefully.

That cost me the commission. He has since bought two more through us and sent his brother.

A broker who has never talked you out of anything has not been reading the file. He has been reading the room.

197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

Daniel Hirth · The Hirth Group · 310.300.2838`,
    tags: '#CREBroker #DueDiligence #ClientFirst #CommercialRealEstate #LosAngelesRealEstate #HirthGroup' }
];
