// The Hirth Group website kit — Daniel Hirth profile page
const { Eyebrow: ProfEyebrow, ContactRow: ProfContactRow, Button: ProfButton, Stat: ProfStat } = window.HirthGroupDesignSystem_c76dea;

function ProfilePage({ go }) {
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return (
    <main data-screen-label="Daniel Hirth Profile">
      {/* Profile header on navy */}
      <section className="page-head texture-map watermark-logo" style={{ paddingBottom: '0' }}>
        <div className="container r-2col" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '72px', alignItems: 'end' }}>
          <div className="tilt3d reveal-clip" style={{ paddingTop: '64px' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid rgba(201,162,77,0.35)', boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,77,0.12)' }}>
              <img className="r-portrait" src="../assets/photos/daniel-hirth-portrait.png" alt="Daniel Hirth" style={{ width: '100%', display: 'block' }} />
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--gold), var(--gold-200), transparent)' }}></span>
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 62%, rgba(8,16,22,0.55) 100%)', pointerEvents: 'none' }}></span>
              <span style={{ position: 'absolute', left: '18px', bottom: '16px', font: 'var(--weight-semibold) 10px var(--font-sans)', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--gold-200)' }}>Beverly Hills · Est. 2012</span>
              <span className="cinema-sweep" aria-hidden="true"></span>
            </div>
          </div>
          <div className="reveal-right" style={{ padding: '88px 0', transitionDelay: '160ms' }}>
            <ProfEyebrow tone="gold">{DANIEL.role}</ProfEyebrow>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', color: '#fff', margin: '14px 0 0' }}>{DANIEL.name}</h1>
            <div style={{ width: '64px', height: '2px', background: 'linear-gradient(90deg, var(--gold), var(--gold-200))', margin: '22px 0 32px' }}></div>
            <div className="r-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 48px', maxWidth: '560px' }}>
              <ProfContactRow inverse icon="phone" label="Direct" value={DANIEL.phone} href="tel:3103002838" />
              <ProfContactRow inverse icon="printer" label="Fax" value={DANIEL.fax} />
              <ProfContactRow inverse icon="mail" label="Email" value={DANIEL.email} href={'mailto:' + DANIEL.email} />
              <ProfContactRow inverse icon="badge-check" label="License" value={DANIEL.license.replace('License ', '')} />
            </div>
          </div>
        </div>
        {/* career stat strip — animated count-up */}
        <div style={{ borderTop: '1px solid rgba(201,162,77,0.22)', marginTop: '40px', background: 'linear-gradient(180deg, transparent, rgba(201,162,77,0.04))' }}>
          <div className="container r-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'transparent', paddingTop: '24px', paddingBottom: '24px' }}>
            {[['$525,000,000', '+', 'Career Volume'], ['200', '+', 'Transactions'], ['2012', '', 'In the Business Since']].map(([v, suf, l], i) => (
              <div key={l} style={{ borderLeft: i ? '1px solid rgba(201,162,77,0.18)' : 'none' }}>
                <ProfStat value={v} suffix={suf} label={l} inverse={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="container r-bio" style={{ paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-9)', display: 'grid', gridTemplateColumns: '1fr 720px 1fr', gap: '32px' }}>
        <div></div>
        <article className="reveal-lines">
          <p style={{ '--i': 0, font: 'var(--weight-medium) 12px var(--font-sans)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--gold-600, #a67c1f)', margin: '0 0 20px' }}>About Daniel</p>
          <p className="bio-lede" style={{
            '--i': 1,
            fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: 1.5,
            color: 'var(--text-primary)', marginBottom: '40px',
          }}>{DANIEL.bio[0]}</p>
          {DANIEL.bio.slice(1).map((para, i) => (
            <p key={i} style={{
              '--i': i + 2,
              fontSize: 'var(--text-body-lg)', lineHeight: 'var(--leading-body)',
              color: 'var(--text-secondary)', marginBottom: '28px',
            }}>{para}</p>
          ))}
          <div style={{ '--i': DANIEL.bio.length + 2, display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid var(--border-subtle)', paddingTop: '32px', marginTop: '8px' }}>
            <img src="../assets/logo-hirth-group.png" alt="" style={{ height: '54px', width: 'auto', opacity: 0.9 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text-primary)', margin: 0 }}>Daniel Hirth</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '2px 0 0', letterSpacing: '0.04em' }}>Principal · The Hirth Group</p>
            </div>
          </div>
          <div style={{ paddingTop: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <ProfButton variant="outline" onClick={() => go('about-team')}>&larr; Back to Team</ProfButton>
            <ProfButton variant="primary" onClick={() => go('contact')}>Work with Daniel</ProfButton>
          </div>
        </article>
        <div></div>
      </section>
    </main>
  );
}

window.ProfilePage = ProfilePage;
