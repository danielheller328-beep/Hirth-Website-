/* ══════════════════════════════════════════════════════════════════════════
   VOICE — a pass over the finished banks, run once at load.

   Two habits had crept into every caption in the kit, and both are the kind
   of thing a reader clocks in half a second without being able to name:

   1. The caption opened by saying, word for word, what the artwork already
      said in seventy-point type. On a feed the image lands first, so the
      first line of the caption is the only line most people read before the
      "more" link — spending it on a restatement wastes the one sentence
      that was doing work. The second paragraph was almost always the better
      hook anyway, so this drops the echo and lets it lead.

   2. Fifteen hashtags, of which eight were the same eight on every post.
      A tag wall is what an account does when it is posting at a feed rather
      than to people, and past four or five they stop earning their space.
      This keeps the tags a post is actually about and drops the filler.

   Both run over the banks rather than being hand-applied, so anything added
   later inherits them, and neither one edits artwork — only the words that
   go in the caption box.
   ═══════════════════════════════════════════════════════════════════════ */

/* the tags that appeared on nearly everything, and so distinguished nothing */
const TAG_FILLER = [
  'cre', 'crebroker', 'kwcommercial', 'investmentproperty', 'realestatetips',
  'realestateinvesting', 'commercialproperty', 'larealestate', 'realestatestrategy',
  'commercialrealestate'
];
const TAG_KEEP = 5;          /* topical tags kept, before the brand tag */
const ECHO_RATIO = 0.85;     /* how much of a paragraph must be in the headline */
const ECHO_MIN_WORDS = 4;    /* below this, a match is coincidence, not an echo */

function voiceWords(s) {
  return String(s || '')
    .replace(/[*_]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .toLowerCase()
    .replace(/[^a-z0-9%.\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/* how much of `para` is already present in `ref` — containment, not equality,
   so a line that adds one word to the headline still reads as an echo */
function echoes(para, ref) {
  const p = voiceWords(para), r = voiceWords(ref);
  if (p.length < ECHO_MIN_WORDS || !r.length) return false;
  const pool = r.slice();
  let hit = 0;
  for (const w of p) {
    const i = pool.indexOf(w);
    if (i > -1) { pool.splice(i, 1); hit++; }
  }
  return hit / p.length >= ECHO_RATIO;
}

/* drop leading paragraphs that only repeat what the artwork already says.
   Leading only: a restatement in the middle of a caption is usually the
   writer landing a point, not padding. Never strips a caption below two
   paragraphs — a caption with nothing left is worse than a redundant one. */
function deEcho(cap, refs) {
  const parts = String(cap || '').split(/\n\s*\n/);
  let i = 0;
  while (i < parts.length - 2 && refs.some(r => r && echoes(parts[i], r))) i++;
  return i ? parts.slice(i).join('\n\n') : cap;
}

/* keep what the post is about, drop what every post carries. #HirthGroup is
   held back and re-appended so the brand tag survives the cut and lands last,
   where a reader's eye stops rather than where it skims. */
function trimTags(tags) {
  const all = String(tags || '').split(/\s+/).filter(t => t.charAt(0) === '#');
  if (!all.length) return tags;
  const brand = all.some(t => t.toLowerCase() === '#hirthgroup');
  const keep = all.filter(t => {
    const k = t.slice(1).toLowerCase();
    return k !== 'hirthgroup' && TAG_FILLER.indexOf(k) === -1;
  });
  /* a post whose every tag was filler still needs tags — fall back to its own
     list rather than emitting the brand tag alone */
  const body = (keep.length ? keep : all.filter(t => t.toLowerCase() !== '#hirthgroup'))
    .slice(0, TAG_KEEP);
  return body.concat(brand ? ['#HirthGroup'] : []).join(' ');
}

(function applyVoice() {
  const banks = [
    [typeof POSTERS !== 'undefined' ? POSTERS : null, P => [P.line]],
    [typeof CONTENT !== 'undefined' ? CONTENT : null, P => [P.title, P.sub]],
    [typeof LISTINGS !== 'undefined' ? LISTINGS : null, P => [P.title, P.sub]]
  ];
  for (const [bank, refsOf] of banks) {
    if (!bank) continue;
    for (const P of bank) {
      if (P.cap) P.cap = deEcho(P.cap, refsOf(P));
      if (P.tags) P.tags = trimTags(P.tags);
    }
  }
})();
