/* ══════════════════════════════════════════════════════════════════════════
   60-app.js — the week, and the page around it

   The rotation is computed from the date, not stored. Every Monday the page
   draws a different set: different posts from the bank, and a different art
   direction assigned to each one. Nobody has to publish anything for that to
   happen — open it next week and it has already changed.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── the week ─────────────────────────────────────────────────────────── */
const EPOCH = Date.UTC(2024, 0, 1);            /* a Monday */
function mondayOf(d) {
  const u = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const dow = new Date(u).getUTCDay();          /* 0 Sun … 6 Sat */
  return u - ((dow + 6) % 7) * 864e5;
}
function weekIndex(d) { return Math.floor((mondayOf(d || new Date()) - EPOCH) / (7 * 864e5)); }
function weekLabel(d) {
  const m = mondayOf(d || new Date());
  const a = new Date(m), b = new Date(m + 6 * 864e5);
  const f = (x, withYear) => x.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: withYear ? 'numeric' : undefined, timeZone: 'UTC'
  });
  return f(a) + ' – ' + f(b, true);
}
function nextMondayLabel() {
  const m = mondayOf(new Date()) + 7 * 864e5;
  return new Date(m).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/* ?week=N previews any week — used to check next Monday's set before it lands.
   ?max=N limits how many carousels are painted, for a fast look on a slow machine. */
const QS = new URLSearchParams(location.search);
const WEEK_N = QS.has('week') && !isNaN(parseInt(QS.get('week'), 10))
  ? parseInt(QS.get('week'), 10) : weekIndex();
const MAXPOSTS = QS.has('max') ? Math.max(1, parseInt(QS.get('max'), 10) || 1) : Infinity;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/* ── rotation ─────────────────────────────────────────────────────────────
   Five content posts a week. The step is coprime with the bank size, so the
   bank is exhausted before anything repeats. The art direction is assigned
   from the week number plus the slot, so a post that does come round again
   comes round in a different world.
   ─────────────────────────────────────────────────────────────────────── */
const WEEK_CONTENT_N = 5;
function pickContent() {
  const out = [];
  for (let i = 0; i < WEEK_CONTENT_N; i++) {
    const p = CONTENT[(WEEK_N * WEEK_CONTENT_N + i) % CONTENT.length];
    out.push(Object.assign({}, p, { ad: AD[AD_ORDER[(WEEK_N * 7 + i) % AD_ORDER.length]] }));
  }
  return out;
}
/* Listings are kept in the bank but are not surfaced as their own section.
   To bring them back, add a `listings` entry to TABS below. */
function pickLinkedIn() {
  const out = [];
  for (let i = 0; i < 7; i++) {
    const p = LINKEDIN[(WEEK_N * 7 + i) % LINKEDIN.length];
    out.push(Object.assign({}, p, { day: DAYS[i] }));
  }
  return out;
}

/* ── a quote slide, in whichever world the post is wearing ─────────────── */
function quoteSlide(c, ad, P, S) {
  const B = stage(c, ad, S, { label: 'Client Review' });
  const cx = S.w / 2;
  stars(c, cx, B.y + 46, 21, 56, ad.accent);
  const q = fitBlock(c, '“' + P.quote + '”', { w: B.w * .92, h: B.h * .56 }, {
    weight: 500, family: SERIF, style: 'italic', max: 50, min: 28, leading: 1.38, maxLines: 9
  });
  let y = B.y + 132 + Math.max(0, (B.h * .56 - q.height) / 2);
  drawBlock(c, q, cx, y, { fill: ad.ink, align: 'center' });
  y += q.height + 44;
  rule(c, cx - 40, y, 80, ad.accent, 2);
  y += 52;
  text(c, P.by, cx, y, { font: FS(600, 40), fill: ad.ink, align: 'center', base: 'middle' });
  caps(c, P.byRole, cx, y + 42, { size: 14, fill: ad.muted, align: 'center', track: 3 });
}

/* ── painting ─────────────────────────────────────────────────────────── */
function canvasEl(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h; c.className = 'cv';
  return c;
}
function paint(fn, w, h) {
  const cv = canvasEl(w, h);
  fn(cv.getContext('2d'));
  return cv;
}
function frameMeta(P, i, total, w, h) {
  return {
    w, h, M: M0, seed: hashStr((P.id || P.addr || 'x') + ':' + i) % 100000,
    rnd: rng(hashStr((P.id || P.addr || 'x') + ':' + i + ':' + WEEK_N)),
    no: String(i + 1).padStart(2, '0'), total: String(total).padStart(2, '0'),
    sheetNo: String(i + 1).padStart(2, '0')
  };
}
/* Four feed frames, then the same post cut for stories — one carousel, so
   the vertical never has to be hunted for in a separate section. */
function contentSlides(P, idx) {
  const ad = P.ad, L = LAYOUT[ad.id], total = 4;
  const story = P.review ? (c => storyReview(c, ad, P, frameMeta(P, 9, 1, SW, SH)))
    : (idx % 2 ? (c => storyFigure(c, ad, P, frameMeta(P, 9, 1, SW, SH)))
      : (c => storyStatement(c, ad, P, frameMeta(P, 9, 1, SW, SH))));
  return [
    paint(c => L.cover(c, ad, P, frameMeta(P, 0, total, FW, FH)), FW, FH),
    paint(c => (P.review ? quoteSlide(c, ad, P, frameMeta(P, 1, total, FW, FH))
      : L.points(c, ad, P, frameMeta(P, 1, total, FW, FH))), FW, FH),
    paint(c => (P.review ? L.points(c, ad, P, frameMeta(P, 2, total, FW, FH))
      : L.figure(c, ad, P, frameMeta(P, 2, total, FW, FH))), FW, FH),
    paint(c => L.ask(c, ad, P, frameMeta(P, 3, total, FW, FH)), FW, FH),
    paint(story, SW, SH)
  ];
}

/* ── the week, assembled ──────────────────────────────────────────────── */
const WEEK = {
  content: pickContent(),
  linkedin: pickLinkedIn()
};
/* the house piece — the team, as a story */
WEEK.house = (function () {
  const ad = AD[AD_ORDER[(WEEK_N * 3 + 1) % AD_ORDER.length]];
  return [{
    id: 'team', kind: 'Story', title: 'The Team', ad, story: true,
    stats: [[HOUSE.volume, 'Sales Volume'], [HOUSE.deals, 'Transactions'], ['LA', 'Market']],
    draw: c => storyTeam(c, ad, frameMeta({ id: 'team' }, 0, 1, SW, SH)),
    cap: `197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

We are not the loudest team in the room. We are the one that finds the deal everyone else walked past — and gets it closed. Valuation, disposition and 1031 guidance, start to finish.

310.300.2838 · HirthGroup.com`,
    tags: '#CommercialRealEstate #CRE #RealEstateInvesting #LosAngelesRealEstate #LARealEstate #CREBroker #InvestmentProperty #1031Exchange #CommercialProperty #DealFlow #ValueAdd #MultiTenant #HirthGroup #KWCommercial #NNN #CREDeals'
  }];
})();

/* ══ page ═════════════════════════════════════════════════════════════════ */
const esc = s => String(s == null ? '' : s).replace(/&(?![a-z]+;)/g, '&amp;').replace(/</g, '&lt;');
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 46);

function saveCanvas(cv, name) {
  return new Promise(res => cv.toBlob(b => {
    const u = URL.createObjectURL(b), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => { URL.revokeObjectURL(u); res(); }, 420);
  }, 'image/png'));
}
function saveText(t, name) {
  const b = new Blob([t], { type: 'text/plain' }), u = URL.createObjectURL(b);
  const a = document.createElement('a');
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 420);
}
function flash(btn, label) {
  const old = btn.textContent;
  btn.textContent = label; btn.classList.add('done');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('done'); }, 1500);
}
function copy(t, btn, label) {
  navigator.clipboard.writeText(t)
    .then(() => flash(btn, label || 'Copied'))
    .catch(() => flash(btn, 'Press ⌘C'));
}

function carousel(cvs, label) {
  const n = cvs.length;
  const w = document.createElement('div');
  w.className = 'media' + (n > 1 ? '' : ' single');
  w.innerHTML =
    '<div class="car" tabindex="0" role="group" aria-label="' + esc(label) + '">' +
    '<div class="track"></div>' +
    (n > 1 ? '<button class="nav prev" aria-label="Previous">‹</button>' +
      '<button class="nav next" aria-label="Next">›</button>' +
      '<div class="dots"></div>' : '') +
    '</div>';
  const track = w.querySelector('.track');
  cvs.forEach(cv => {
    const s = document.createElement('div');
    s.className = 'slide'; s.appendChild(cv); track.appendChild(s);
  });
  if (n > 1) {
    const dw = w.querySelector('.dots');
    dw.innerHTML = cvs.map((_, i) => '<button class="dot' + (i ? '' : ' on') + '" aria-label="Slide ' + (i + 1) + '"></button>').join('');
    const dots = dw.querySelectorAll('.dot');
    const prev = w.querySelector('.prev'), next = w.querySelector('.next');
    let i = 0;
    const go = k => {
      i = clamp(k, 0, n - 1);
      track.style.transform = 'translateX(' + (-i * 100) + '%)';
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      prev.disabled = i === 0; next.disabled = i === n - 1;
    };
    prev.onclick = () => go(i - 1); next.onclick = () => go(i + 1);
    dots.forEach((d, j) => d.onclick = () => go(j));
    const car = w.querySelector('.car');
    car.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === 'ArrowRight') go(i + 1);
    });
    let x0 = null;
    car.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
    car.addEventListener('touchend', e => {
      if (x0 === null) return;
      const d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 44) go(i + (d < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
    go(0);
  }
  return w;
}

function panel(label, body, btnLabel, isTags) {
  const p = document.createElement('div');
  p.className = 'panel';
  p.innerHTML = '<div class="phead"><span class="plabel">' + esc(label) + '</span>' +
    '<button class="copy">' + esc(btnLabel || 'Copy') + '</button></div>' +
    '<div class="ptext' + (isTags ? ' tags' : '') + '"></div>';
  p.querySelector('.ptext').textContent = body;
  p.querySelector('.copy').onclick = e => copy(body, e.target);
  return p;
}

function postCard(i, P, cvs, eyebrow) {
  const a = document.createElement('article');
  a.className = 'card' + (P.story ? ' story' : '');
  a.id = 'post-' + (P.id || i);
  a.appendChild(carousel(cvs, stripRich(P.title)));
  const b = document.createElement('div');
  b.className = 'body';
  b.innerHTML =
    '<div class="topline"><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
    '<span class="eyebrow">' + esc(eyebrow) + '</span>' +
    (P.ad ? '<span class="adtag" title="Art direction">' + esc(P.ad.name) + '</span>' : '') + '</div>' +
    '<h2>' + esc(stripRich(P.title)) + '</h2>';
  if (P.stats) {
    const s = document.createElement('div');
    s.className = 'strip';
    s.innerHTML = P.stats.slice(0, 3).map(x =>
      '<div><span class="v">' + esc(x[0]) + '</span><span class="l">' + esc(x[1]) + '</span></div>').join('');
    b.appendChild(s);
  }
  if (P.cap) b.appendChild(panel('Caption', P.cap, 'Copy caption'));
  if (P.tags) b.appendChild(panel('Hashtags · first comment', P.tags, 'Copy', true));
  const row = document.createElement('div');
  row.className = 'row';
  const dlBtn = document.createElement('button');
  dlBtn.className = 'primary';
  dlBtn.textContent = '↓ Save post (' + cvs.length + ' PNG)';
  dlBtn.onclick = async () => {
    dlBtn.disabled = true;
    const old = dlBtn.textContent; dlBtn.textContent = 'Saving…';
    for (let k = 0; k < cvs.length; k++)
      await saveCanvas(cvs[k], 'hirth-' + slug(stripRich(P.title)) +
        (k === cvs.length - 1 && cvs[k].height > cvs[k].width ? '-story' : '-' + (k + 1)) + '.png');
    if (P.cap) saveText(P.cap + '\n\n' + (P.tags || ''), 'hirth-' + slug(stripRich(P.title)) + '-caption.txt');
    dlBtn.textContent = 'Saved ✓'; dlBtn.classList.add('done');
    setTimeout(() => { dlBtn.textContent = old; dlBtn.disabled = false; dlBtn.classList.remove('done'); }, 1700);
  };
  row.appendChild(dlBtn);
  b.appendChild(row);
  a.appendChild(b);
  return a;
}

function liCard(i, P) {
  const a = document.createElement('article');
  a.className = 'card text';
  const b = document.createElement('div');
  b.className = 'body';
  b.innerHTML =
    '<div class="topline"><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
    '<span class="eyebrow">' + esc(P.day.toUpperCase()) + ' · ' + esc(P.topic.toUpperCase()) + '</span></div>' +
    '<h2>' + esc(P.title) + '</h2>';
  const post = document.createElement('div');
  post.className = 'lipost'; post.textContent = P.body;
  b.appendChild(post);
  const tags = P.tags || LI_TAGS;
  const t = document.createElement('div');
  t.className = 'litags'; t.textContent = tags;
  b.appendChild(t);
  const row = document.createElement('div');
  row.className = 'row';
  const mk = (cls, label, fn) => {
    const x = document.createElement('button');
    x.className = cls; x.textContent = label; x.onclick = fn; return x;
  };
  row.append(
    mk('primary', '⧉ Copy post', e => copy(P.title + '\n\n' + P.body + '\n\n' + tags, e.target)),
    mk('copy', 'Copy hashtags', e => copy(tags, e.target)),
    mk('copy', '↓ Save .txt', e => {
      saveText(P.title + '\n\n' + P.body + '\n\n' + tags, 'hirth-linkedin-' + P.day.toLowerCase() + '.txt');
      flash(e.target, 'Saved ✓');
    })
  );
  b.appendChild(row);
  a.appendChild(b);
  return a;
}

/* ── tabs ─────────────────────────────────────────────────────────────── */
const TABS = {
  posts: {
    name: 'Posts', head: 'Five carousels · four feed frames and a story each',
    items: () => WEEK.content.concat(WEEK.house),
    build: (P, i) => P.story
      ? postCard(i, P, [paint(P.draw, SW, SH)], 'STORY · 9:16 · THE HOUSE')
      : postCard(i, P, contentSlides(P, i),
        'CAROUSEL · 4 FRAMES + STORY · ' + P.topic.toUpperCase())
  },
  linkedin: {
    name: 'LinkedIn', head: 'One post a day, Monday to Sunday',
    items: () => WEEK.linkedin,
    build: (P, i) => liCard(i, P)
  }
};
let active = 'posts';
const built = {};

function buildTab(key) {
  if (built[key]) return built[key];
  const host = document.createElement('div');
  host.style.display = 'contents';
  const T = TABS[key];
  T.items().slice(0, MAXPOSTS).forEach((P, i) => host.appendChild(T.build(P, i)));
  built[key] = host;
  return host;
}
function render() {
  const sw = document.getElementById('switch');
  sw.innerHTML = '';
  Object.keys(TABS).forEach(k => {
    const b = document.createElement('button');
    b.setAttribute('aria-selected', String(k === active));
    b.innerHTML = TABS[k].name + '<span class="ct">' + TABS[k].items().length + '</span>';
    b.onclick = () => {
      if (active === k) return;
      active = k; render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    sw.appendChild(b);
  });
  document.getElementById('sectionHead').textContent = TABS[active].head;
  const posts = document.getElementById('posts');
  posts.innerHTML = '';
  posts.appendChild(buildTab(active));
}

/* ── boot ─────────────────────────────────────────────────────────────── */
function loadImages() {
  const keys = Object.keys(ASSET_SRC);
  return Promise.all(keys.map(k => new Promise(res => {
    const im = new Image();
    im.onload = () => { IMG[k] = im; res(); };
    im.onerror = () => res();
    im.src = ASSET_SRC[k];
  })));
}
(async function boot() {
  document.getElementById('weekRange').textContent = weekLabel();
  document.getElementById('nextDrop').textContent = nextMondayLabel();
  document.getElementById('weekNo').textContent = 'WEEK ' + WEEK_N;
  /* Canvas does not trigger a font download. document.fonts.ready only settles
     the faces the DOM has already asked for, so every face the flyers use has
     to be requested explicitly first — otherwise canvas silently falls back to
     Times and the whole set ships in the wrong typeface. */
  try {
    if (document.fonts) {
      await Promise.all([
        '400 40px Fraunces', '500 40px Fraunces', '600 40px Fraunces',
        'italic 400 40px Fraunces', 'italic 500 40px Fraunces',
        '400 40px "Space Grotesk"', '500 40px "Space Grotesk"',
        '600 40px "Space Grotesk"', '700 40px "Space Grotesk"'
      ].map(f => document.fonts.load(f).catch(() => { })));
      await document.fonts.ready;
    }
  } catch (e) { }
  try { await loadImages(); } catch (e) { }
  render();
  document.body.classList.add('ready');
})();
