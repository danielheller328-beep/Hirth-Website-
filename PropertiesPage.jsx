// The Hirth Group website kit — Properties listing page
const { SectionHeader: PropsSectionHeader, PropertyCard: PropsPropertyCard } = window.HirthGroupDesignSystem_c76dea;

const PROP_TABS = [
  ['for-sale', 'For Sale'],
  ['for-lease', 'For Lease'],
  ['closed', 'Closed'],
  ['leased', 'Leased'],
];

// ---- Powerful "Sold Listings" header — shown only on the Closed tab ----
function SoldHeader({ go, status, tabs, countFor }) {
  const stats = [
    ['150', 'Properties Sold', '+'],
    ['$522,000,000', 'Closed Volume', '+'],
    ['200', 'Transactions', '+'],
  ];
  return (
    <section className="texture-map watermark-logo" style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy-900)', padding: '92px var(--container-pad) 0' }}>
      <span className="ghost-word" aria-hidden="true" style={{ color: 'rgba(255,255,255,0.03)' }}>Sold</span>
      {/* sweep accents */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '-30%', right: '-10%', width: '60%', height: '160%', background: 'radial-gradient(closest-side, rgba(27,156,216,0.16), transparent 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'relative', maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div className="reveal-up">
          <p style={{ font: 'var(--weight-semibold) 13px var(--font-sans)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--blue-400)', margin: 0 }}>Track Record</p>
          <div style={{ width: '52px', height: '2px', background: 'var(--blue-500)', margin: '18px 0 22px' }}></div>
          <h1 style={{ fontFamily: 'var(--font-display)', color: '#fff', lineHeight: 1.04, paddingBottom: '0.1em', margin: 0, fontSize: 'clamp(52px, 7vw, 104px)', letterSpacing: '-0.01em' }}>Sold Listings</h1>
          <p style={{ color: 'var(--text-inverse-secondary)', marginTop: '20px', fontSize: 'var(--text-body-lg)', maxWidth: '620px' }}>
            Half a billion closed and counting. Every deal below is a property The Hirth Group took to the finish line across greater Los Angeles and beyond.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '28px', marginTop: '44px', flexWrap: 'wrap' }}>
          {tabs.map(([key, lbl]) => (
            <a key={key} href="#" onClick={(e) => { e.preventDefault(); go('properties-' + key); }} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-medium)',
              fontSize: '12px', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
              color: key === status ? '#fff' : 'var(--text-inverse-secondary)',
              textDecoration: 'none', paddingBottom: '16px', display: 'inline-flex', gap: '7px', alignItems: 'baseline',
              borderBottom: key === status ? '2px solid var(--blue-500)' : '2px solid transparent',
            }}>{lbl}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Uniform, premium sold card — photo + real address + SOLD, clickable.
function SoldCard({ l, i }) {
  const [hover, setHover] = React.useState(false);
  const src = l.image ? (window.__ASSET ? window.__ASSET(l.image) : l.image) : null;
  // Deterministic texture pick from the closed-portfolio gallery, so a card
  // always shows the same backdrop across reloads.
  const pool = window.SOLD_PHOTOS || [];
  const raw = (!src && pool.length) ? pool[Math.abs(i) % pool.length] : null;
  const tex = raw ? (window.__ASSET ? window.__ASSET(raw) : raw) : null;
  return (
    <article
      onClick={() => { if (window.__soldLightbox) window.__soldLightbox(l); }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', cursor: 'pointer',
        borderRadius: '4px', background: 'var(--navy-900)',
        boxShadow: hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hover ? 'translateY(-5px)' : 'none', transition: 'transform 300ms var(--ease-out), box-shadow 300ms var(--ease-out)',
      }}>
      {src ? (
        <img src={src} alt={l.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms var(--ease-out)', transform: hover ? 'scale(1.06)' : 'none' }} />
      ) : (
        /* No address-verified photo yet. Rather than an empty frame, the plate is
           backed by a dimmed shot from Hirth's own closed-portfolio gallery —
           read as brand texture behind the type, NOT as a photo of this address
           (which would misrepresent the listing). Replaced automatically the
           moment a correctly-named photo lands — see PHOTOS-README.md. */
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg, #1a2c38 0%, #0d1a22 55%, #081116 100%)' }}>
          {tex ? (
            <img src={tex} alt="" aria-hidden="true" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hover ? 0.3 : 0.22, filter: 'grayscale(0.55) contrast(1.05)', transition: 'opacity 400ms var(--ease-out), transform 600ms var(--ease-out)', transform: hover ? 'scale(1.05)' : 'none' }} />
          ) : null}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg, rgba(26,44,56,0.72) 0%, rgba(13,26,34,0.86) 55%, rgba(8,17,22,0.94) 100%)' }}></div>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.5, background: 'radial-gradient(120% 90% at 78% 8%, rgba(27,156,216,0.22), transparent 60%)' }}></div>
          {/* One centered group — mark above rule above label — so the plate reads
              as a composed lockup instead of two elements at opposite corners. */}
          <div style={{ position: 'absolute', left: '18px', right: '18px', top: '50%', transform: 'translateY(-58%)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src={window.__ASSET ? window.__ASSET('../assets/logo-hirth-white.png') : '../assets/logo-hirth-white.png'} alt="" style={{ width: '34%', opacity: 0.2 }} />
            <div style={{ width: '30px', height: '2px', background: 'var(--blue-500)', margin: '16px 0 12px' }}></div>
            {l.dealType ? (
              <p style={{ font: 'var(--weight-medium) 12.5px var(--font-sans)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)', margin: 0, lineHeight: 1.5 }}>{l.dealType}</p>
            ) : null}
          </div>
        </div>
      )}
      <span style={{
        position: 'absolute', top: '14px', left: '14px', zIndex: 3,
        font: 'var(--weight-semibold) 10px var(--font-sans)', letterSpacing: '0.18em', textTransform: 'uppercase',
        color: '#fff', background: 'rgba(12,22,28,0.82)', padding: '6px 11px', borderRadius: '2px',
        display: 'inline-flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(2px)',
      }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--emerald-500, #1f8a5b)' }}></span>Sold</span>
      {l.title ? (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, padding: '58px 18px 16px', background: 'linear-gradient(180deg, transparent 0%, rgba(8,15,20,0.55) 40%, rgba(8,15,20,0.95) 100%)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', lineHeight: 1.18, color: '#fff', margin: 0, textWrap: 'pretty' }}>{l.title}</h3>
        <p style={{ font: '400 13px var(--font-sans)', color: 'rgba(255,255,255,0.8)', margin: '5px 0 0', letterSpacing: '0.01em' }}>{l.meta}</p>
        {l.price && /^\$/.test(l.price) ? (
          <p style={{ font: 'var(--weight-semibold) 15px var(--font-sans)', color: 'var(--blue-400)', margin: '9px 0 0', letterSpacing: '0.01em' }}>
            {l.price}
            {l.dealCount ? <span style={{ font: 'var(--weight-medium) 11px var(--font-sans)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginLeft: '10px' }}>{l.dealCount} closings</span> : null}
          </p>
        ) : null}
      </div>
      ) : null}
    </article>
  );
}

function PropertiesPage({ status = 'for-sale', go }) {
  const label = PROP_TABS.find(([k]) => k === status)[1];
  const isClosed = status === 'closed';
  const [lightbox, setLightbox] = React.useState(null);
  React.useEffect(() => {
    window.__soldLightbox = setLightbox;
    return () => { if (window.__soldLightbox === setLightbox) window.__soldLightbox = null; };
  }, []);
  const countFor = (k) => k === 'closed' ? (window.SOLD_LIST ? window.SOLD_LIST.length : 0) : LISTINGS.filter((l) => l.status === k || (k === 'for-sale' && l.status === 'in-escrow')).length;
  const items = LISTINGS.filter((l) => l.status === status || (status === 'for-sale' && l.status === 'in-escrow'));
  return (
    <main data-screen-label={'Properties — ' + label}>
      {isClosed ? (
        <SoldHeader go={go} status={status} tabs={PROP_TABS} countFor={countFor} />
      ) : (
      <section className="page-head texture-map watermark-logo" style={{ padding: '76px var(--container-pad) 0' }}>
        <span className="ghost-word" aria-hidden="true">{label}</span>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <div className="reveal-up">
            <PropsSectionHeader inverse eyebrow="Properties" title={label} rule={true} />
            <p style={{ color: 'var(--text-inverse-secondary)', marginTop: '18px', fontSize: 'var(--text-body-lg)' }}>
              <span style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '22px' }}>{countFor(status)}</span> active {label.toLowerCase()} record{countFor(status) === 1 ? '' : 's'} across greater Los Angeles.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '28px', marginTop: '40px', flexWrap: 'wrap' }}>
            {PROP_TABS.map(([key, lbl]) => (
              <a key={key} href="#" onClick={(e) => { e.preventDefault(); go('properties-' + key); }} style={{
                fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-medium)',
                fontSize: '12px', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase',
                color: key === status ? '#fff' : 'var(--text-inverse-secondary)',
                textDecoration: 'none', paddingBottom: '16px', display: 'inline-flex', gap: '7px', alignItems: 'baseline',
                borderBottom: key === status ? '2px solid var(--blue-500)' : '2px solid transparent',
              }}>{lbl}</a>
            ))}
          </div>
        </div>
      </section>
      )}
      <section className="container" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-10)', minHeight: '420px' }}>
        {items.length ? (
          <React.Fragment>
            {(status === 'for-sale' || status === 'for-lease') ? <window.PropertiesMap items={items} label={label} /> : null}
            {isClosed ? (
              <div className="r-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {window.SOLD_LIST.map((l, i) => <div className="reveal-up" style={{ transitionDelay: ((i % 3) * 50) + 'ms' }} key={'sold-' + i}><SoldCard l={l} i={i} /></div>)}
              </div>
            ) : (
              <div className="r-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                {items.map((l, i) => <div className="tilt3d reveal3d" style={{ transitionDelay: ((i % 3) * 90) + 'ms' }} key={l.title + '-' + i}><PropsPropertyCard {...l} onOpen={() => window.HirthOpenListing(l)} /></div>)}
              </div>
            )}
          </React.Fragment>
        ) : (
          <div style={{ textAlign: 'center', padding: '96px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--text-secondary)' }}>Records from the live site go here.</p>
            <p style={{ fontSize: '14px', marginTop: '12px' }}>The {label.toLowerCase()} archive isn&rsquo;t included in this kit — populate it from hirthgroup.com/{status}.</p>
          </div>
        )}
      </section>
      {lightbox ? ReactDOM.createPortal((
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, zIndex: 99999, background: 'rgba(8,14,18,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vh 5vw', cursor: 'zoom-out', backdropFilter: 'blur(4px)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--navy-900)', borderRadius: '6px', overflow: 'hidden', maxWidth: '820px', width: '100%', maxHeight: '88vh', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', cursor: 'default', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 10', background: '#0a141a', flex: 'none' }}>
              {lightbox.image ? (
                <img src={window.__ASSET ? window.__ASSET(lightbox.image) : lightbox.image} alt={lightbox.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #16242e, #0a141a)' }}>
                  <img src={window.__ASSET ? window.__ASSET('../assets/logo-hirth-white.png') : '../assets/logo-hirth-white.png'} alt="" style={{ width: '40%', opacity: 0.3 }} />
                </div>
              )}
              <span style={{ position: 'absolute', top: '16px', left: '16px', font: 'var(--weight-semibold) 10px var(--font-sans)', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', background: 'rgba(12,22,28,0.82)', padding: '6px 11px', borderRadius: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--emerald-500, #1f8a5b)' }}></span>Sold</span>
            </div>
            <div style={{ padding: '26px 30px 30px', overflowY: 'auto' }}>
              <p style={{ font: 'var(--weight-semibold) 12px var(--font-sans)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--blue-400)', margin: 0 }}>Closed Transaction</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', margin: '10px 0 0', lineHeight: 1.12 }}>{lightbox.headline || lightbox.title || 'Sold by The Hirth Group'}</h3>
              {/* subtitle never repeats the h3: only prepend the address when the
                  heading resolved to a headline instead of the address itself */}
              {(() => {
                const sub = lightbox.headline && lightbox.title
                  ? lightbox.title + (lightbox.meta ? ' · ' + lightbox.meta : '')
                  : (lightbox.meta || '');
                return sub ? <p style={{ color: 'var(--text-inverse-secondary)', margin: '8px 0 0', fontSize: '15px' }}>{sub}</p> : null;
              })()}
              {(lightbox.price && /^\$/.test(lightbox.price)) || lightbox.dealType || lightbox.representation ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 34px', marginTop: '18px' }}>
                  {lightbox.price && /^\$/.test(lightbox.price) ? (
                    <div>
                      <p style={{ font: 'var(--weight-medium) 10px var(--font-sans)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-inverse-secondary)', margin: 0 }}>{lightbox.dealCount ? 'Highest Sale Price' : 'Sale Price'}</p>
                      <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--blue-400)', margin: '4px 0 0' }}>{lightbox.price}</p>
                      {lightbox.dealCount ? <p style={{ font: '400 12.5px var(--font-sans)', color: 'var(--text-inverse-secondary)', margin: '4px 0 0' }}>{lightbox.dealCount} separate closings at this property</p> : null}
                    </div>
                  ) : null}
                  {lightbox.dealType ? (
                    <div>
                      <p style={{ font: 'var(--weight-medium) 10px var(--font-sans)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-inverse-secondary)', margin: 0 }}>Property Type</p>
                      <p style={{ fontSize: '15px', color: '#fff', margin: '6px 0 0' }}>{lightbox.dealType}</p>
                    </div>
                  ) : null}
                  {lightbox.representation ? (
                    <div>
                      <p style={{ font: 'var(--weight-medium) 10px var(--font-sans)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-inverse-secondary)', margin: 0 }}>Represented</p>
                      <p style={{ fontSize: '15px', color: '#fff', margin: '6px 0 0' }}>{lightbox.representation}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div style={{ width: '40px', height: '2px', background: 'var(--blue-500)', margin: '20px 0' }}></div>
              <p style={{ font: 'var(--weight-semibold) 11px var(--font-sans)', letterSpacing: 'var(--tracking-eyebrow)', textTransform: 'uppercase', color: 'var(--text-inverse-secondary)', margin: '0 0 10px' }}>About This Property</p>
              {(lightbox.description && lightbox.description.length) ? (
                lightbox.description.map((para, pi) => (
                  <p key={pi} style={{ color: 'rgba(244,247,249,0.82)', fontSize: '14.5px', lineHeight: 'var(--leading-body)', margin: pi ? '14px 0 0' : 0 }}>{para}</p>
                ))
              ) : (
                <p style={{ color: 'rgba(244,247,249,0.82)', fontSize: '14.5px', lineHeight: 'var(--leading-body)', margin: 0 }}>
                  {lightbox.tagline || (
                    'The Hirth Group represented ' + (lightbox.representation ? 'the ' + lightbox.representation.toLowerCase() : 'our client')
                    + ' in the closing of ' + (lightbox.title || 'this property') + (lightbox.meta ? ' in ' + lightbox.meta.split(',')[0] : '') + '.'
                    + (lightbox.dealType ? ' A ' + lightbox.dealType.toLowerCase() + ' transaction' : '')
                    + (lightbox.price && /^\$/.test(lightbox.price) ? (lightbox.dealType ? ', closed at ' : ' closed at ') + lightbox.price + '.' : (lightbox.dealType ? '.' : ''))
                    + ' For full details on this transaction, please get in touch with our team.'
                  )}
                </p>
              )}
              <button onClick={() => setLightbox(null)} style={{ marginTop: '24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', font: 'var(--weight-medium) 12px var(--font-sans)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', padding: '11px 22px', borderRadius: '2px', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      ), document.body) : null}
    </main>
  );
}

window.PropertiesPage = PropertiesPage;
