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
   Seven pieces a week, and seven is the whole week: three posts and four
   stories. Three topics carry it — two of them run as carousels and all
   three run as stories, which is the split he actually publishes.

   The step is coprime with the bank size, so the bank is exhausted before
   anything repeats. The art direction is assigned from the week number plus
   the slot, so a topic that does come round again comes round in a different
   world.
   ─────────────────────────────────────────────────────────────────────── */
const WEEK_CONTENT_N = 3;
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
/* ── a post is three frames ───────────────────────────────────────────────
   The cover states it, the middle argues it, the last one asks for the call.
   Three is what a reader will actually swipe through, and it forces the
   middle frame to be the best of the three rather than the second of two.

   Which middle frame it gets is decided by the post itself, not the slot: a
   review runs the quote, and everything else runs points or the figure
   depending on its own id. So two posts side by side in the same week are
   built differently, not just coloured differently.
   ─────────────────────────────────────────────────────────────────────── */
const SLIDES_PER_POST = 3;
function contentSlides(P) {
  const ad = P.ad, L = LAYOUT[ad.id], total = SLIDES_PER_POST;
  const mid = P.review ? quoteSlide
    : (hashStr(P.id + ':mid') % 2 ? L.figure : L.points);
  return [
    paint(c => L.cover(c, ad, P, frameMeta(P, 0, total, FW, FH)), FW, FH),
    paint(c => mid(c, ad, P, frameMeta(P, 1, total, FW, FH)), FW, FH),
    paint(c => L.ask(c, ad, P, frameMeta(P, 2, total, FW, FH)), FW, FH)
  ];
}

/* ── the week, assembled ──────────────────────────────────────────────── */
const WEEK = {
  content: pickContent(),
  linkedin: pickLinkedIn()
};
/* the poster — the house piece, one statement a week */
WEEK.poster = (function () {
  const P = POSTERS[WEEK_N % POSTERS.length];
  return Object.assign({}, P, {
    poster: true, who: 'dh',
    /* the cut turns independently of the statement, and seven cuts against six
       statements share no factor — forty-two weeks before a statement meets
       the same portrait treatment twice */
    cutIndex: WEEK_N,
    cutName: posterCut(WEEK_N).name,
    title: stripRich(P.line),
    adName: 'Press · ' + posterCut(WEEK_N).name,
    stats: [[HOUSE.deals, 'Transactions'], [HOUSE.volume, 'Sales Volume'], ['LA', 'Market']]
  });
})();

/* the stories — four of them: one for each of the week's three topics, and a
   house piece that alternates between the poster and the team, so the fourth
   slot is never the same thing two weeks running */
WEEK.stories = (function () {
  const out = WEEK.content.map((P, i) => ({
    id: 'st-' + P.id, title: stripRich(P.title), ad: P.ad, story: true,
    kind: P.topic, cap: P.cap, tags: P.tags, stats: P.stats,
    draw: c => (P.review ? storyReview(c, P.ad, P, frameMeta(P, 9, 1, SW, SH))
      : i % 2 ? storyFigure(c, P.ad, P, frameMeta(P, 9, 1, SW, SH))
        : storyStatement(c, P.ad, P, frameMeta(P, 9, 1, SW, SH)))
  }));

  const pp = WEEK.poster;
  if (WEEK_N % 2 === 0) {
    out.push({
      id: 'st-poster', title: pp.title, story: true, kind: 'Poster',
      adName: 'Press · ' + pp.cutName, cap: pp.cap, tags: pp.tags, stats: pp.stats,
      draw: c => posterStory(c, pp, frameMeta({ id: pp.id }, 1, 1, SW, SH))
    });
  } else {
    const teamAd = AD[AD_ORDER[(WEEK_N * 3 + 1) % AD_ORDER.length]];
    out.push({
      id: 'st-team', title: 'The Team', ad: teamAd, story: true, kind: 'The House',
      stats: [[HOUSE.volume, 'Sales Volume'], [HOUSE.deals, 'Transactions'], ['LA', 'Market']],
      draw: c => storyTeam(c, teamAd, frameMeta({ id: 'team' }, 0, 1, SW, SH)),
      cap: `197+ transactions. $471 Million+ in sales volume. Greater Los Angeles.

We are not the loudest team in the room. We are the one that finds the deal everyone else walked past — and gets it closed. Valuation, disposition and 1031 guidance, start to finish.

310.300.2838 · HirthGroup.com`,
      tags: '#CommercialRealEstate #CRE #RealEstateInvesting #LosAngelesRealEstate #LARealEstate #CREBroker #InvestmentProperty #1031Exchange #CommercialProperty #DealFlow #ValueAdd #MultiTenant #HirthGroup #KWCommercial #NNN #CREDeals'
    });
  }
  return out;
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


/* Everything lives on one page now, which means twenty-eight canvases would
   otherwise be painted before the first one is on screen. Each card paints
   when it scrolls into view instead — the page opens instantly and the
   browser never holds more pixels than it is showing. */
const _paintQueue = [];
let _observer = null;
function whenVisible(el, fn) {
  if (!('IntersectionObserver' in window)) { fn(); return; }
  if (!_observer) {
    _observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        _observer.unobserve(e.target);
        const job = _paintQueue.find(j => j.el === e.target);
        if (job) { job.fn(); job.done = true; }
      });
    }, { rootMargin: '600px 0px' });
  }
  _paintQueue.push({ el, fn });
  _observer.observe(el);
}

/* ── a card ───────────────────────────────────────────────────────────────
   One tile: the slides on top, then everything you need to publish them —
   the caption, the link, the hashtags, and the buttons underneath. The whole
   post is downloadable as a set, and every slide is downloadable on its own,
   because sometimes you only want to re-post frame two.
   ─────────────────────────────────────────────────────────────────────── */
function postCard(i, P, slidesFn, eyebrow) {
  const a = document.createElement('article');
  a.className = 'card' + (P.story ? ' story' : '');
  a.id = 'post-' + (P.id || i);
  const base = 'hirth-' + slug(stripRich(P.title));

  const media = document.createElement('div');
  media.className = 'media';
  media.innerHTML = '<div class="car placeholder"><span class="spin"></span></div>';
  a.appendChild(media);

  let cvs = null;
  const slides = () => (cvs || (cvs = slidesFn()));
  whenVisible(a, () => {
    const real = carousel(slides(), stripRich(P.title));
    a.replaceChild(real, media);
  });

  const b = document.createElement('div');
  b.className = 'body';
  b.innerHTML =
    '<div class="topline"><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
    '<span class="eyebrow">' + esc(eyebrow) + '</span></div>' +
    '<h2>' + esc(stripRich(P.title)) + '</h2>' +
    (P.ad || P.adName ? '<div class="adtag" title="Art direction">' +
      esc(P.ad ? P.ad.name : P.adName) + '</div>' : '');
  if (P.stats) {
    const s = document.createElement('div');
    s.className = 'strip';
    s.innerHTML = P.stats.slice(0, 3).map(x =>
      '<div><span class="v">' + esc(x[0]) + '</span><span class="l">' + esc(x[1]) + '</span></div>').join('');
    b.appendChild(s);
  }
  if (P.cap) {
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = P.cap;
    b.appendChild(cap);
  }
  const link = document.createElement('a');
  link.className = 'sitelink';
  link.href = 'https://' + HOUSE.site;
  link.target = '_blank'; link.rel = 'noopener';
  link.textContent = HOUSE.site;
  b.appendChild(link);
  if (P.tags) {
    const t = document.createElement('div');
    t.className = 'tagline2';
    t.textContent = P.tags;
    b.appendChild(t);
  }

  /* row one — the post as a package, and the two things you paste */
  const row = document.createElement('div');
  row.className = 'row';
  const dlBtn = document.createElement('button');
  dlBtn.className = 'primary';
  dlBtn.textContent = P.story ? '↓ Download story' : '↓ Download post';
  dlBtn.onclick = async () => {
    const cv = slides();
    dlBtn.disabled = true;
    const old = dlBtn.textContent; dlBtn.textContent = 'Saving…';
    for (let k = 0; k < cv.length; k++) await saveCanvas(cv[k], slideName(base, cv, k));
    if (P.cap) saveText(P.cap + '\n\n' + (P.tags || ''), base + '-caption.txt');
    dlBtn.textContent = 'Saved ✓'; dlBtn.classList.add('done');
    setTimeout(() => { dlBtn.textContent = old; dlBtn.disabled = false; dlBtn.classList.remove('done'); }, 1700);
  };
  row.appendChild(dlBtn);
  if (P.cap) {
    const cb = document.createElement('button');
    cb.className = 'copy'; cb.textContent = 'Copy caption';
    cb.onclick = e => copy(P.cap, e.target);
    row.appendChild(cb);
  }
  if (P.tags) {
    const tb = document.createElement('button');
    tb.className = 'copy'; tb.textContent = 'Copy tags';
    tb.onclick = e => copy(P.tags, e.target);
    row.appendChild(tb);
  }
  b.appendChild(row);

  /* row two — the slides on their own. Painted lazily, so this row is built
     from the slide count the card was told to expect, not from the canvases. */
  const n = P.slideCount || 1;
  if (n > 1) {
    const r2 = document.createElement('div');
    r2.className = 'row slides';
    const all = document.createElement('button');
    all.className = 'copy wide';
    all.textContent = '↓ Download all ' + n + ' slides';
    all.onclick = async e => {
      const cv = slides();
      e.target.disabled = true;
      for (let k = 0; k < cv.length; k++) await saveCanvas(cv[k], slideName(base, cv, k));
      e.target.disabled = false; flash(e.target, 'Saved ✓');
    };
    r2.appendChild(all);
    for (let k = 0; k < n; k++) {
      const one = document.createElement('button');
      one.className = 'copy slim';
      one.textContent = 'Slide ' + (k + 1) + ' ↓';
      one.onclick = async e => {
        const cv = slides();
        if (!cv[k]) return;
        e.target.disabled = true;
        await saveCanvas(cv[k], slideName(base, cv, k));
        e.target.disabled = false; flash(e.target, '✓');
      };
      r2.appendChild(one);
    }
    b.appendChild(r2);
  }

  a.appendChild(b);
  return a;
}
function slideName(base, cvs, k) {
  const tall = cvs[k].height > cvs[k].width;
  return base + (cvs.length === 1 ? (tall ? '-story' : '') : '-' + (k + 1)) + '.png';
}

function liCard(i, P) {
  const a = document.createElement('article');
  a.className = 'card text';
  a.id = 'post-li-' + i;
  const b = document.createElement('div');
  b.className = 'body';
  b.innerHTML =
    '<div class="topline"><span class="num">' + String(i + 1).padStart(2, '0') + '</span>' +
    '<span class="eyebrow">LINKEDIN · ' + esc(P.day.toUpperCase()) + ' · ' + esc(P.topic.toUpperCase()) + '</span></div>' +
    '<h2>' + esc(P.title) + '</h2>' +
    '<div class="adtag">Written</div>';

  /* a LinkedIn card reads the same as a carousel card — caption, link,
     hashtags, buttons — so the page has one shape, not two */
  const tags = P.tags || liTags(P.topic);
  const full = P.title + '\n\n' + P.body;
  const cap = document.createElement('div');
  cap.className = 'cap'; cap.textContent = full;
  b.appendChild(cap);
  const link = document.createElement('a');
  link.className = 'sitelink';
  link.href = 'https://' + HOUSE.site; link.target = '_blank'; link.rel = 'noopener';
  link.textContent = HOUSE.site;
  b.appendChild(link);
  const t = document.createElement('div');
  t.className = 'tagline2'; t.textContent = tags;
  b.appendChild(t);

  const row = document.createElement('div');
  row.className = 'row';
  const dl = document.createElement('button');
  dl.className = 'primary';
  dl.textContent = '↓ Download post';
  dl.onclick = e => {
    saveText(full + '\n\n' + tags, 'hirth-linkedin-' + P.day.toLowerCase() + '.txt');
    flash(e.target, 'Saved ✓');
  };
  const cb = document.createElement('button');
  cb.className = 'copy'; cb.textContent = 'Copy caption';
  cb.onclick = e => copy(full, e.target);
  const tb = document.createElement('button');
  tb.className = 'copy'; tb.textContent = 'Copy tags';
  tb.onclick = e => copy(tags, e.target);
  row.append(dl, cb, tb);
  b.appendChild(row);
  a.appendChild(b);
  return a;
}

/* ── the page ─────────────────────────────────────────────────────────────
   Two sections. The week is seven pieces — three posts and four stories, in
   one run, because a story is not a different kind of work from a post and
   should not sit behind a tab. LinkedIn is its own section underneath: it is
   written, not designed, and it is published somewhere else.
   ─────────────────────────────────────────────────────────────────────── */
function buildFeed() {
  const host = document.getElementById('posts');
  host.innerHTML = '';
  let n = 0;

  /* the poster leads — it is the house piece, and it is the one with his face */
  const pp = WEEK.poster;
  pp.slideCount = 1;
  host.appendChild(postCard(n++, pp,
    () => [paint(c => posterFrame(c, pp, frameMeta({ id: pp.id }, 0, 1, FW, FH)), FW, FH)],
    'POSTER · ' + pp.cutName.toUpperCase() + ' CUT'));

  const carousels = WEEK.content.slice(0, Math.min(2, MAXPOSTS));
  carousels.forEach(P => {
    P.slideCount = SLIDES_PER_POST;
    host.appendChild(postCard(n++, P, () => contentSlides(P),
      'CAROUSEL · ' + SLIDES_PER_POST + ' SLIDES · ' + P.topic.toUpperCase()));
  });

  const stories = WEEK.stories.slice(0, MAXPOSTS === Infinity ? 4 : MAXPOSTS);
  stories.forEach(P => {
    P.slideCount = 1;
    host.appendChild(postCard(n++, P, () => [paint(P.draw, SW, SH)],
      'STORY · 9:16 · ' + String(P.kind).toUpperCase()));
  });

  const liHost = document.getElementById('liposts');
  liHost.innerHTML = '';
  WEEK.linkedin.forEach((P, i) => liHost.appendChild(liCard(i, P)));

  const posts = 1 + carousels.length;
  document.getElementById('sectionHead').textContent =
    (posts + stories.length) + ' pieces — ' + posts + ' posts, ' + stories.length + ' stories';
  document.getElementById('weekRange').textContent =
    weekLabel() + '  ·  next set ' + nextMondayLabel();
  document.getElementById('liNote').textContent =
    WEEK.linkedin.length + ' written posts — one a day';
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
  buildFeed();
  document.body.classList.add('ready');
})();
