// The Hirth Group website kit — Contact, Team, Services, Testimonials pages
const { SectionHeader: PgSectionHeader, Eyebrow: PgEyebrow, Button: PgButton, TextField: PgTextField, ContactRow: PgContactRow, TestimonialQuote: PgQuote } = window.HirthGroupDesignSystem_c76dea;

// Jarvis / arc-reactor HUD — layered SVG rings (beaded outer, tick marks,
// segmented + dashed rings, glowing core) with the Hirth mark at center.
window.HudReactor = function HudReactor({ size = 260, speaking = false }) {
  const BLUE = '#1b9cd8';
  const polar = (cx, cy, r, deg) => { const a = (deg - 90) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
  const beads = Array.from({ length: 96 }, (_, i) => { const [x, y] = polar(100, 100, 95, i * 3.75); return <circle key={i} cx={x} cy={y} r={i % 8 === 0 ? 1.9 : 1.15} fill={BLUE} opacity={i % 8 === 0 ? 0.95 : 0.55} />; });
  const ticks = Array.from({ length: 60 }, (_, i) => { const deg = i * 6; const [x1, y1] = polar(100, 100, 82, deg); const [x2, y2] = polar(100, 100, i % 5 === 0 ? 72 : 77, deg); return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={BLUE} strokeWidth={i % 5 === 0 ? 1.4 : 0.7} opacity={i % 5 === 0 ? 0.85 : 0.4} />; });
  const dots = Array.from({ length: 40 }, (_, i) => { const [x, y] = polar(100, 100, 66, i * 9); return <circle key={i} cx={x} cy={y} r="1" fill={BLUE} opacity="0.5" />; });
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <style>{'@keyframes hg-spin{to{transform:rotate(360deg)}}@keyframes hg-spin-r{to{transform:rotate(-360deg)}}@keyframes hg-pulse{0%,100%{opacity:.45}50%{opacity:.95}}@keyframes hg-glow{0%,100%{opacity:.55;transform:scale(.97)}50%{opacity:1;transform:scale(1.03)}}@keyframes hg-talk{0%{opacity:.7;transform:scale(.96)}25%{opacity:1;transform:scale(1.1)}50%{opacity:.82;transform:scale(1.0)}75%{opacity:1;transform:scale(1.12)}100%{opacity:.7;transform:scale(.96)}}.hgr{transform-origin:100px 100px}'}</style>
      <svg viewBox="0 0 200 200" width={size} height={size} style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 6px rgba(27,156,216,0.45))', overflow: 'visible' }}>
        <defs>
          <radialGradient id="hgcore" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="#eaf7ff" stopOpacity="0.9" />
            <stop offset="34%" stopColor={BLUE} stopOpacity="0.85" />
            <stop offset="70%" stopColor="#0f2a38" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0a141a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="hgr" style={{ animation: 'hg-spin 40s linear infinite' }}>{beads}</g>
        <circle className="hgr" cx="100" cy="100" r="88" fill="none" stroke={BLUE} strokeWidth="0.6" opacity="0.35" />
        <g className="hgr" style={{ animation: 'hg-spin-r 24s linear infinite' }}>{ticks}</g>
        {/* broken accent arc, like the reference */}
        <path className="hgr" d="M100 12 A88 88 0 0 1 176 64" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" opacity="0.9" style={{ animation: 'hg-spin 8s linear infinite' }} />
        <circle className="hgr" cx="100" cy="70" r="70" fill="none" stroke={BLUE} strokeWidth="0.5" opacity="0.25" style={{ transformOrigin: '100px 100px' }} />
        <g className="hgr" style={{ animation: 'hg-spin 30s linear infinite' }}>{dots}</g>
        {/* segmented inner ring */}
        <circle className="hgr" cx="100" cy="100" r="54" fill="none" stroke={BLUE} strokeWidth="9" strokeDasharray="15 9" opacity="0.85" style={{ animation: 'hg-spin-r 14s linear infinite' }} />
        {/* dashed ring */}
        <circle className="hgr" cx="100" cy="100" r="42" fill="none" stroke={BLUE} strokeWidth="1.4" strokeDasharray="3 5" opacity="0.7" style={{ animation: 'hg-spin 10s linear infinite' }} />
        <circle cx="100" cy="100" r="34" fill="url(#hgcore)" style={{ transformOrigin: '100px 100px', animation: (speaking ? 'hg-talk 0.5s ease-in-out infinite' : 'hg-glow 3.4s ease-in-out infinite') }} />
        <circle className="hgr" cx="100" cy="100" r="30" fill="none" stroke={BLUE} strokeWidth="0.8" opacity="0.55" style={{ animation: 'hg-pulse 2.4s ease-in-out infinite' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="../assets/logo-hirth-white.png" alt="The Hirth Group" style={{ width: '30%', opacity: 0.97, filter: 'drop-shadow(0 0 8px rgba(27,156,216,0.6))', animation: speaking ? 'hg-talk 0.5s ease-in-out infinite' : 'none' }} />
      </div>
    </div>
  );
}

function ContactPage() {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  const [sent, setSent] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({ name: '', phone: '', email: '', interest: 'Selling a property', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const firstName = (form.name || '').trim().split(/\s+/)[0] || 'there';

  // Every submission is emailed to info@hirthgroup.com. Opens the visitor's
  // email app pre-addressed and pre-filled — works with no server or signup.
  const submit = () => {
    setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Please add your name and email.'); return; }
    const first = form.name.trim().split(/\s+/)[0];
    // Jarvis-style spoken greeting — composed, low, British-butler cadence
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const speak = () => {
          const u = new SpeechSynthesisUtterance('Thank you, ' + first + '. Your message has been received. The Hirth Group will be in touch shortly.');
          const vs = synth.getVoices();
          // prefer refined British male voices first (closest to Jarvis)
          const prefer = ['Daniel', 'Arthur', 'Oliver', 'Google UK English Male', 'Microsoft Ryan', 'Microsoft George', 'Microsoft Guy', 'Alex'];
          u.voice = vs.find(v => prefer.some(p => v.name.includes(p)) && /en/i.test(v.lang))
                 || vs.find(v => /en-GB/i.test(v.lang) && /male/i.test(v.name))
                 || vs.find(v => /en-GB/i.test(v.lang))
                 || vs.find(v => /male/i.test(v.name))
                 || vs.find(v => /^en/i.test(v.lang)) || null;
          u.rate = 0.86; u.pitch = 0.72; u.volume = 1;
          u.onstart = () => setSpeaking(true);
          u.onend = () => setSpeaking(false);
          u.onerror = () => setSpeaking(false);
          synth.speak(u);
        };
        if (synth.getVoices().length) speak(); else synth.addEventListener('voiceschanged', speak, { once: true });
      }
    } catch (e) {}
    const subject = 'New inquiry from HirthGroup.com — ' + (form.interest || 'Contact');
    const body =
      'Name: ' + form.name + '\n' +
      'Phone: ' + (form.phone || '—') + '\n' +
      'Email: ' + form.email + '\n' +
      'Interested in: ' + (form.interest || '—') + '\n\n' +
      'Message:\n' + (form.message || '—');
    window.location.href = 'mailto:info@hirthgroup.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
    setSent(true);
  };

  return (
    <main data-screen-label="Contact">
      <section className="page-head texture-map watermark-logo" style={{ padding: '56px var(--container-pad)' }}>
        <span className="ghost-word" aria-hidden="true">Contact</span>
      </section>
      <section className="container r-2col" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-10)', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '72px' }}>
        <div className="reveal-up" style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)', padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <PgTextField label="Full Name" placeholder="Jane Doe" value={form.name} onChange={set('name')} />
              <PgTextField label="Phone" type="tel" placeholder="(310) 555-0100" value={form.phone} onChange={set('phone')} />
              <PgTextField label="Email" type="email" placeholder="jane@example.com" style={{ gridColumn: '1 / -1' }} value={form.email} onChange={set('email')} />
              <PgTextField label="I'm Interested In" options={['Selling a property', 'Buying a property', 'Leasing', '1031 Exchange', 'Asset valuation', 'Requesting an OM (Offering Memorandum)']} style={{ gridColumn: '1 / -1' }} value={form.interest} onChange={set('interest')} />
              <PgTextField label="Message" multiline placeholder="Tell us about your property or goals&hellip;" style={{ gridColumn: '1 / -1' }} value={form.message} onChange={set('message')} />
              {error ? <p style={{ gridColumn: '1 / -1', color: '#c0392b', fontSize: '14px', margin: 0 }}>{error}</p> : null}
              {sent ? <p style={{ gridColumn: '1 / -1', color: 'var(--blue-500)', fontSize: '14px', margin: 0 }}>Your message is ready in your email app — just hit send and we&rsquo;ll be in touch shortly.</p> : null}
              <div><PgButton variant="primary" size="lg" onClick={sending ? undefined : submit}>{sending ? 'Sending…' : 'Send Message'}</PgButton></div>
            </div>
        </div>
        <aside className="r-contact-aside" style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingTop: '8px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <window.HudReactor size={230} speaking={speaking} />
          </div>
          <PgEyebrow>Get in Touch</PgEyebrow>
          <PgContactRow icon="phone" label="Tel" value="310-300-2838" href="tel:3103002838" />
          <PgContactRow icon="mail" label="Email" value="info@hirthgroup.com" href="mailto:info@hirthgroup.com" />
          <PgContactRow icon="map-pin" label="Office" value="439 N. Canon Drive, Suite 300, Beverly Hills, CA 90210" />
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            In Strategic Partnership with KW Commercial<br />CA DRE 01428775
          </div>
        </aside>
      </section>
    </main>
  );
}

function TeamPage({ go }) {
  const team = [
    { name: 'Daniel Hirth', role: 'Managing Director', photo: '../assets/photos/daniel-hirth-portrait.png', accent: 'var(--blue-400)', page: 'daniel-hirth',
      bio: ['Born and raised in Los Angeles, Daniel was introduced to real estate at a very young age — riding alongside his father collecting rents, overseeing renovations, and managing commercial properties. After graduating from California State University, Northridge, he began his career at Marcus & Millichap in 2012, mastering the acquisition and disposition of retail, industrial, multifamily, office, and land assets.', 'With over 200 transactions totaling more than $520 million in closed sales, Daniel acts as a trusted advisor — strategically restructuring his clients’ portfolios so their equity works efficiently. He also mentors the next generation of professionals at The Hirth Group, building a team where each agent brings unique strengths to better serve clients.'] },
    { name: 'Alex Reyhan', role: 'Vice President', photo: '../assets/photos/team-alex-reyhan.png', accent: 'var(--teal-400)',
      bio: ['Born and raised in Southern California, Alex Reyhan brings a deep understanding of the region’s dynamic real estate market. Since joining The Hirth Group in 2015, he has been instrumental in acquisitions, dispositions, and leasing across retail, shopping centers, industrial, mixed-use, office, and land — with a track record exceeding $500 million in closed transactions.', 'His marquee deals include the Abbot Kinney Portfolio ($29.3M), Hollywood & Western Petco ($30.4M), Main Street, Santa Ana ($18.6M), and Main Street, Venice ($8.9M). A UCLA history graduate, Alex pairs sharp deal structuring with a relationship-first approach, and is deeply involved in the Los Angeles Jewish community.'] },
    { name: 'Ethan Donel', role: 'Senior Associate', photo: '../assets/photos/team-ethan-donel.png', accent: 'var(--gold-500)',
      bio: ['Ethan Donel is a Los Angeles native whose genuine interest in commercial real estate has fueled his career from a very young age. He joined The Hirth Group in 2019 as an Investment Associate, spearheading retail, mixed-use, office, industrial, land, and multifamily deals — specializing in dispositions, acquisitions, and leasing across the San Fernando Valley from Woodland Hills to Burbank.', 'With diligence, charisma, and the mentorship of Daniel Hirth and Alex Reyhan, Ethan quickly became a Senior Associate. He collaborates closely with clients to deliver professional market research and the deal information crucial to sound business decisions, consistently going above and beyond to provide timely, exceptional service.'] },
  ];
  return (
    <main data-screen-label="The Team">
      <section className="page-head texture-map watermark-logo" style={{ padding: '76px var(--container-pad)' }}>
        <div className="reveal-up" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <PgSectionHeader inverse eyebrow="About" title="The Team" lede="A boutique bench of specialists — each agent brings a distinct skillset to our clients’ deals." />
        </div>
      </section>
      {team.map((m, i) => {
        return (
          <section key={m.name} className="team-row" style={{ background: i % 2 ? 'var(--surface-inverse)' : 'transparent', borderTop: '1px solid var(--border-inverse)' }}>
            <div className="container r-2col" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '56px', alignItems: 'center', paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-8)' }}>
              <div className="reveal-clip tilt3d" style={{ order: 0, position: 'relative', maxWidth: '320px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-inverse)', boxShadow: 'var(--shadow-overlay)', background: 'var(--navy-900)' }}>
                <img src={m.photo} alt={m.name} style={{ width: '100%', display: 'block', aspectRatio: '1 / 1.06', objectFit: 'cover', objectPosition: 'center top' }} />
                <span className="cinema-sweep" aria-hidden="true"></span>
                <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, ' + m.accent + ', transparent)' }}></span>
              </div>
              <div className="reveal-up" style={{ order: 1, transitionDelay: '140ms' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-medium)', fontSize: '12px', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: m.accent, margin: 0 }}>{m.role}</p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 4vw, 46px)', color: i % 2 ? '#fff' : 'var(--text-primary)', margin: '12px 0 0', lineHeight: 1.1 }}>{m.name}</h2>
                <div style={{ width: '52px', height: '2px', background: m.accent, margin: '22px 0' }}></div>
                {m.bio.map((para, j) => (
                  <p key={j} style={{ fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)', color: i % 2 ? 'var(--text-inverse-secondary)' : 'var(--text-secondary)', margin: j ? '18px 0 0' : 0 }}>{para}</p>
                ))}
                <div style={{ marginTop: '30px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  {m.page ? <PgButton variant={i % 2 ? 'outline-inverse' : 'primary'} onClick={() => go(m.page)}>Read Full Bio</PgButton> : null}
                  <PgButton variant={i % 2 ? 'outline-inverse' : 'outline'} onClick={() => go('contact')}>Get in Touch</PgButton>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}

function ServicesPage({ go }) {
  return (
    <main data-screen-label="Services">
      <section className="page-head texture-map watermark-logo" style={{ padding: '76px var(--container-pad)' }}>
        <span className="ghost-word" aria-hidden="true">Advisory</span>
        <div className="reveal-up" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <PgSectionHeader inverse eyebrow="What We Do" title="Sales, Leasing &amp; 1031 Exchange" lede="One team across the whole deal — acquisition &amp; disposition, landlord leasing, and tax-deferred exchange advisory." />
        </div>
      </section>
      <section className="container" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
        {SERVICES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={s.title} className="r-svc-row r-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
              <div className="reveal-up tilt3d" style={{ order: 0, position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-overlay)' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '440px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,20,26,0.85) 100%)' }}></div>
                <div className="svc-badge" style={{ background: s.accent, position: 'absolute', left: '24px', top: '24px', width: '50px', height: '50px', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 22px rgba(0,0,0,0.35)' }}>
                  <i data-lucide={s.icon} style={{ width: '22px', height: '22px', color: '#0a141a' }}></i>
                </div>
                <span style={{ position: 'absolute', right: '22px', bottom: '14px', fontFamily: 'var(--font-display)', fontSize: '92px', lineHeight: 1, color: '#fff', opacity: 0.22 }}>0{i + 1}</span>
              </div>
              <div className="reveal-up" style={{ order: 1, transitionDelay: '110ms' }}>
                <p style={{ font: 'var(--weight-medium) 12px var(--font-sans)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: s.accent, margin: 0 }}>Service 0{i + 1}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.6vw, 44px)', color: 'var(--text-primary)', margin: '12px 0 0', lineHeight: 1.1 }}>{s.title}</h3>
                <div style={{ width: '52px', height: '2px', background: s.accent, margin: '22px 0' }}></div>
                {s.body.map((para, j) => (
                  <p key={j} style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)', margin: j ? '18px 0 0' : 0 }}>{para}</p>
                ))}
                <ul style={{ listStyle: 'none', margin: '26px 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
                  {s.points.map((pt) => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13.5px', fontWeight: 'var(--weight-medium)', color: 'var(--text-primary)' }}>
                      <i data-lucide="check" style={{ width: '15px', height: '15px', color: s.accent, flex: 'none' }}></i>{pt}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: '32px' }}><PgButton variant="primary" onClick={() => go('contact')}>Start a Conversation</PgButton></div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

function TestimonialCarousel() {
  const items = window.TESTIMONIALS || [];
  const [i, setI] = React.useState(0);
  const n = items.length;
  const go = (next) => setI((p) => (p + next + n) % n);
  const touch = React.useRef(null);
  const onStart = (e) => { touch.current = e.touches[0].clientX; };
  const onEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touch.current = null;
  };
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
  const arrow = {
    background: 'none', border: 0, cursor: 'pointer', color: 'var(--text-inverse-secondary)',
    fontSize: '32px', lineHeight: 1, padding: '12px', transition: 'color 150ms var(--ease-out)',
    flexShrink: 0,
  };
  const t = items[i] || { quote: '', attribution: '' };
  return (
    <div style={{ width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
      <div
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}
      >
        <button style={arrow} aria-label="Previous" onClick={() => go(-1)}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--blue-400)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-inverse-secondary)')}
        >&larr;</button>
        <div style={{ flex: 1, minHeight: '340px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PgQuote key={i} inverse={false} quote={t.quote} attribution={t.attribution} />
        </div>
        <button style={arrow} aria-label="Next" onClick={() => go(1)}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--blue-400)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-inverse-secondary)')}
        >&rarr;</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '36px' }}>
        {items.map((_, d) => (
          <button key={d} aria-label={'Testimonial ' + (d + 1)} onClick={() => setI(d)}
            style={{
              width: '9px', height: '9px', borderRadius: '50%', padding: 0, cursor: 'pointer',
              border: d === i ? '1.5px solid var(--text-primary)' : 0,
              background: d === i ? 'transparent' : 'var(--border-subtle)',
              transition: 'all 150ms var(--ease-out)',
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}

function TestimonialsPage() {
  return (
    <main data-screen-label="Testimonials">
      <section className="page-head texture-map watermark-logo" style={{ padding: '76px var(--container-pad)' }}>
        <span className="ghost-word" aria-hidden="true">Clients</span>
        <div className="reveal-up" style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <PgSectionHeader inverse eyebrow="About" title="Testimonials" lede="In our clients’ words." />
        </div>
      </section>
      <section className="container reveal-up" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-10)' }}>
        <TestimonialCarousel />
      </section>
    </main>
  );
}

Object.assign(window, { ContactPage, TeamPage, ServicesPage, TestimonialsPage });
