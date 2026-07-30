// The Hirth Group website kit — HomePage
const { Button, SectionHeader, Eyebrow, StatBand, PropertyCard, TestimonialQuote } = window.HirthGroupDesignSystem_c76dea;

function RotatingTestimonial() {
  const items = window.TESTIMONIALS || [];
  const [i, setI] = React.useState(0);
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % items.length);
        setShow(true);
      }, 450);
    }, 6000);
    return () => clearInterval(id);
  }, [items.length]);
  const t = items[i] || { quote: '', attribution: '' };
  return (
    <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <div style={{ opacity: show ? 1 : 0, transition: 'opacity 450ms var(--ease-out)' }}>
        <TestimonialQuote quote={t.quote} attribution={t.attribution} />
      </div>
    </div>
  );
}

function HomePage({ go, countUp = true }) {
  return (
    <main data-screen-label="Home">
      {/* Hero — cinematic Earth → LA descent on real maps */}
      <window.DiveHero go={go} />

      {/* Stat band */}
      <section className="statband3d texture-map watermark-logo" style={{ position: 'relative', borderTop: '1px solid var(--border-inverse)', padding: '64px var(--container-pad)', background: 'linear-gradient(160deg, #16323f 0%, #0b1820 100%)' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 120% at 18% 50%, rgba(43,182,187,0.14), transparent 60%), radial-gradient(60% 120% at 82% 50%, rgba(205,163,95,0.13), transparent 60%)', pointerEvents: 'none' }}></div>
        <div className="reveal-up" style={{ position: 'relative' }}>
        <StatBand stats={[
          { value: '$525,000,000', suffix: '+', label: 'Sold', countUp },
          { value: '200', suffix: '+', label: 'Transactions', countUp },
          { value: '10', suffix: '+', label: 'Years in LA County', countUp },
        ]} />
        </div>
      </section>

      {/* Featured listings */}
      <section className="container bg-dots watermark-logo on-light" style={{ position: 'relative', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>
        <span className="ghost-word" aria-hidden="true">Listings</span>
        <div className="reveal-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '48px' }}>
          <SectionHeader eyebrow="Featured Listings" title="Currently on the Market" />
          <Button variant="outline" onClick={() => go('properties-for-sale')}>View All</Button>
        </div>
        <div className="r-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {FEATURED.map((l, i) => (
            <div className="tilt3d reveal3d" style={{ transitionDelay: (i * 110) + 'ms' }} key={l.title + '-' + i}><PropertyCard {...l} onOpen={() => window.HirthOpenListing(l)} /></div>
          ))}
        </div>
      </section>

      {/* Trusted brokers */}
      <section className="watermark-logo bg-diag" style={{ background: 'var(--band-alt)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container r-2col" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '72px', alignItems: 'center', paddingTop: 'var(--space-9)', paddingBottom: 'var(--space-9)' }}>
          <div className="tilt3d"><img src="../assets/photos/team.png" alt="The Hirth Group team" style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-overlay)' }} /></div>
          <div className="reveal-up" style={{ transitionDelay: '120ms' }}>
            <SectionHeader eyebrow="Your Trusted Brokers" title="Advisory, Not Just Brokerage" />
            <div style={{ width: '52px', height: '2px', background: 'linear-gradient(90deg, var(--gold-500), var(--gold-300))', margin: '20px 0 0' }}></div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 'var(--leading-body)', margin: '24px 0 32px', fontSize: 'var(--text-body-lg)' }}>
              At The Hirth Group, we specialize in retail, industrial, office, and multifamily properties across the greater Los Angeles market. Whether you&rsquo;re a first-time investor or a seasoned owner looking to 1031 into your next asset, we deliver the clarity and strategy you need to make the right move.
            </p>
            <Button variant="primary" onClick={() => go('about-team')}>Meet the Team</Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container bg-diag" style={{ position: 'relative', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>
        <span className="ghost-word" aria-hidden="true">Services</span>
        <div className="reveal-up">
          <SectionHeader align="center" eyebrow="Our Services" title="One Team Across the Whole Deal"
            lede="From first valuation to closing table — three disciplines, one accountable team." />
        </div>
        <div className="r-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px', marginTop: '60px' }}>
          {SERVICES.map((s, i) => (
            <a key={s.title} href="#" onClick={(e) => { e.preventDefault(); go('about-services'); }} className="svc-card reveal3d" style={{ '--svc-accent': s.accent, transitionDelay: (i * 130) + 'ms' }}>
              <div className="svc-media" style={{ position: 'relative', aspectRatio: '5 / 3', overflow: 'hidden' }}>
                <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,20,26,0.05) 0%, rgba(10,20,26,0.34) 55%, rgba(10,20,26,0.92) 100%)' }}></div>
                <span className="svc-num" aria-hidden="true">0{i + 1}</span>
                <div className="svc-badge" style={{ background: s.accent }}>
                  <i data-lucide={s.icon} style={{ width: '20px', height: '20px', color: '#0a141a' }}></i>
                </div>
                <h3 style={{ position: 'absolute', left: '26px', right: '26px', bottom: '20px', fontFamily: 'var(--font-display)', fontSize: '25px', color: '#fff', margin: 0, lineHeight: 1.1 }}>{s.title}</h3>
              </div>
              <div style={{ padding: '24px 26px 26px' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 'var(--leading-body)', margin: 0 }}>{s.blurb}</p>
                <ul style={{ listStyle: 'none', margin: '20px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {s.points.map((pt) => (
                    <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: 'var(--text-primary)' }}>
                      <i data-lucide="check" style={{ width: '15px', height: '15px', color: s.accent, flex: 'none' }}></i>{pt}
                    </li>
                  ))}
                </ul>
                <span className="svc-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '24px', font: 'var(--weight-semibold) 11px var(--font-sans)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: s.accent }}>
                  Learn More <span className="svc-arrow">&rarr;</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonial band */}
      <section className="texture-map bg-rings" style={{ position: 'relative', background: 'linear-gradient(165deg, #1a2c3a 0%, #0e1a22 60%, #0a141a 100%)', padding: '96px var(--container-pad)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(50% 80% at 50% 0%, rgba(123,106,160,0.18), transparent 60%)', pointerEvents: 'none' }}></div>
        <span className="ghost-word gold" aria-hidden="true" style={{ right: 'auto', left: '8px', top: '14px', bottom: 'auto' }}>Clients</span>
        <div className="reveal-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', width: '100%' }}>
        <RotatingTestimonial />
        <Button variant="outline-inverse" onClick={() => go('about-testimonials')}>Read More</Button>
        </div>
      </section>
    </main>
  );
}

window.HomePage = HomePage;
