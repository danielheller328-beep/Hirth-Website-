function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group website kit — Properties listing page
const {
  SectionHeader: PropsSectionHeader,
  PropertyCard: PropsPropertyCard
} = window.HirthGroupDesignSystem_c76dea;
const PROP_TABS = [['for-sale', 'For Sale'], ['for-lease', 'For Lease'], ['closed', 'Closed'], ['leased', 'Leased']];

// ---- Powerful "Sold Listings" header — shown only on the Closed tab ----
function SoldHeader({
  go,
  status,
  tabs,
  countFor
}) {
  const stats = [['150', 'Properties Sold', '+'], ['$522,000,000', 'Closed Volume', '+'], ['200', 'Transactions', '+']];
  return /*#__PURE__*/React.createElement("section", {
    className: "texture-map watermark-logo",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--navy-900)',
      padding: '92px var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true",
    style: {
      color: 'rgba(255,255,255,0.03)'
    }
  }, "Sold"), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '-30%',
      right: '-10%',
      width: '60%',
      height: '160%',
      background: 'radial-gradient(closest-side, rgba(27,156,216,0.16), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal-up"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-semibold) 13px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--blue-400)',
      margin: 0
    }
  }, "Track Record"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '52px',
      height: '2px',
      background: 'var(--blue-500)',
      margin: '18px 0 22px'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      color: '#fff',
      lineHeight: 1.04,
      paddingBottom: '0.1em',
      margin: 0,
      fontSize: 'clamp(52px, 7vw, 104px)',
      letterSpacing: '-0.01em'
    }
  }, "Sold Listings"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-inverse-secondary)',
      marginTop: '20px',
      fontSize: 'var(--text-body-lg)',
      maxWidth: '620px'
    }
  }, "Half a billion closed and counting. Every deal below is a property The Hirth Group took to the finish line across greater Los Angeles and beyond.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28px',
      marginTop: '44px',
      flexWrap: 'wrap'
    }
  }, tabs.map(([key, lbl]) => /*#__PURE__*/React.createElement("a", {
    key: key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('properties-' + key);
    },
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '12px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: key === status ? '#fff' : 'var(--text-inverse-secondary)',
      textDecoration: 'none',
      paddingBottom: '16px',
      display: 'inline-flex',
      gap: '7px',
      alignItems: 'baseline',
      borderBottom: key === status ? '2px solid var(--blue-500)' : '2px solid transparent'
    }
  }, lbl)))));
}

// Uniform, premium sold card — photo + real address + SOLD, clickable.
function SoldCard({
  l,
  i
}) {
  const [hover, setHover] = React.useState(false);
  const src = l.image ? window.__ASSET ? window.__ASSET(l.image) : l.image : null;
  // Deterministic texture pick from the closed-portfolio gallery, so a card
  // always shows the same backdrop across reloads.
  const pool = window.SOLD_PHOTOS || [];
  const raw = !src && pool.length ? pool[Math.abs(i) % pool.length] : null;
  const tex = raw ? window.__ASSET ? window.__ASSET(raw) : raw : null;
  return /*#__PURE__*/React.createElement("article", {
    onClick: () => {
      if (window.__soldLightbox) window.__soldLightbox(l);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      aspectRatio: '4 / 3',
      overflow: 'hidden',
      cursor: 'pointer',
      borderRadius: '4px',
      background: 'var(--navy-900)',
      boxShadow: hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: hover ? 'translateY(-5px)' : 'none',
      transition: 'transform 300ms var(--ease-out), box-shadow 300ms var(--ease-out)'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: l.title,
    loading: "lazy",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 600ms var(--ease-out)',
      transform: hover ? 'scale(1.06)' : 'none'
    }
  }) :
  /*#__PURE__*/
  /* No address-verified photo yet. Rather than an empty frame, the plate is
     backed by a dimmed shot from Hirth's own closed-portfolio gallery —
     read as brand texture behind the type, NOT as a photo of this address
     (which would misrepresent the listing). Replaced automatically the
     moment a correctly-named photo lands — see PHOTOS-README.md. */
  React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(155deg, #1a2c38 0%, #0d1a22 55%, #081116 100%)'
    }
  }, tex ? /*#__PURE__*/React.createElement("img", {
    src: tex,
    alt: "",
    "aria-hidden": "true",
    loading: "lazy",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: hover ? 0.3 : 0.22,
      filter: 'grayscale(0.55) contrast(1.05)',
      transition: 'opacity 400ms var(--ease-out), transform 600ms var(--ease-out)',
      transform: hover ? 'scale(1.05)' : 'none'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(155deg, rgba(26,44,56,0.72) 0%, rgba(13,26,34,0.86) 55%, rgba(8,17,22,0.94) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.5,
      background: 'radial-gradient(120% 90% at 78% 8%, rgba(27,156,216,0.22), transparent 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '18px',
      right: '18px',
      top: '50%',
      transform: 'translateY(-58%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__ASSET ? window.__ASSET('../assets/logo-hirth-white.png') : '../assets/logo-hirth-white.png',
    alt: "",
    style: {
      width: '34%',
      opacity: 0.2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '30px',
      height: '2px',
      background: 'var(--blue-500)',
      margin: '16px 0 12px'
    }
  }), l.dealType ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 12.5px var(--font-sans)',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.62)',
      margin: 0,
      lineHeight: 1.5
    }
  }, l.dealType) : null)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px',
      zIndex: 3,
      font: 'var(--weight-semibold) 10px var(--font-sans)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'rgba(12,22,28,0.82)',
      padding: '6px 11px',
      borderRadius: '2px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backdropFilter: 'blur(2px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: 'var(--emerald-500, #1f8a5b)'
    }
  }), "Sold"), l.title ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
      padding: '58px 18px 16px',
      background: 'linear-gradient(180deg, transparent 0%, rgba(8,15,20,0.55) 40%, rgba(8,15,20,0.95) 100%)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '19px',
      lineHeight: 1.18,
      color: '#fff',
      margin: 0,
      textWrap: 'pretty'
    }
  }, l.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 13px var(--font-sans)',
      color: 'rgba(255,255,255,0.8)',
      margin: '5px 0 0',
      letterSpacing: '0.01em'
    }
  }, l.meta), l.price && /^\$/.test(l.price) ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-semibold) 15px var(--font-sans)',
      color: 'var(--blue-400)',
      margin: '9px 0 0',
      letterSpacing: '0.01em'
    }
  }, l.price, l.dealCount ? /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.6)',
      marginLeft: '10px'
    }
  }, l.dealCount, " closings") : null) : null) : null);
}
const SOLD_PAGE_SIZE = 20;
function PropertiesPage({
  status = 'for-sale',
  go
}) {
  const label = PROP_TABS.find(([k]) => k === status)[1];
  const isClosed = status === 'closed';
  const [lightbox, setLightbox] = React.useState(null);
  const [soldShown, setSoldShown] = React.useState(SOLD_PAGE_SIZE);
  React.useEffect(() => {
    setSoldShown(SOLD_PAGE_SIZE);
  }, [status]);
  React.useEffect(() => {
    window.__soldLightbox = setLightbox;
    return () => {
      if (window.__soldLightbox === setLightbox) window.__soldLightbox = null;
    };
  }, []);
  const countFor = k => k === 'closed' ? window.SOLD_LIST ? window.SOLD_LIST.length : 0 : LISTINGS.filter(l => l.status === k || k === 'for-sale' && l.status === 'in-escrow').length;
  const items = LISTINGS.filter(l => l.status === status || status === 'for-sale' && l.status === 'in-escrow');
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": 'Properties — ' + label
  }, isClosed ? /*#__PURE__*/React.createElement(SoldHeader, {
    go: go,
    status: status,
    tabs: PROP_TABS,
    countFor: countFor
  }) : /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      padding: '76px var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal-up"
  }, /*#__PURE__*/React.createElement(PropsSectionHeader, {
    inverse: true,
    eyebrow: "Properties",
    title: label,
    rule: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-inverse-secondary)',
      marginTop: '18px',
      fontSize: 'var(--text-body-lg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: '22px'
    }
  }, countFor(status)), " active ", label.toLowerCase(), " record", countFor(status) === 1 ? '' : 's', " across greater Los Angeles.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28px',
      marginTop: '40px',
      flexWrap: 'wrap'
    }
  }, PROP_TABS.map(([key, lbl]) => /*#__PURE__*/React.createElement("a", {
    key: key,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('properties-' + key);
    },
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '12px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: key === status ? '#fff' : 'var(--text-inverse-secondary)',
      textDecoration: 'none',
      paddingBottom: '16px',
      display: 'inline-flex',
      gap: '7px',
      alignItems: 'baseline',
      borderBottom: key === status ? '2px solid var(--blue-500)' : '2px solid transparent'
    }
  }, lbl))))), /*#__PURE__*/React.createElement("section", {
    className: "container",
    style: {
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-10)',
      minHeight: '420px'
    }
  }, items.length ? /*#__PURE__*/React.createElement(React.Fragment, null, status === 'for-sale' || status === 'for-lease' ? /*#__PURE__*/React.createElement(window.PropertiesMap, {
    items: items,
    label: label
  }) : null, isClosed ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "r-grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '30px'
    }
  }, window.SOLD_LIST.slice(0, soldShown).map((l, i) => /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      transitionDelay: i % 3 * 50 + 'ms'
    },
    key: 'sold-' + i
  }, /*#__PURE__*/React.createElement(SoldCard, {
    l: l,
    i: i
  })))), soldShown < window.SOLD_LIST.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '48px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSoldShown(n => n + SOLD_PAGE_SIZE),
    style: {
      background: 'transparent',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-primary)',
      font: 'var(--weight-medium) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      padding: '14px 34px',
      borderRadius: '2px',
      cursor: 'pointer'
    }
  }, "See More (", window.SOLD_LIST.length - soldShown, " remaining)")) : null) : /*#__PURE__*/React.createElement("div", {
    className: "r-grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '32px'
    }
  }, items.map((l, i) => /*#__PURE__*/React.createElement("div", {
    className: "tilt3d reveal3d",
    style: {
      transitionDelay: i % 3 * 90 + 'ms'
    },
    key: l.title + '-' + i
  }, /*#__PURE__*/React.createElement(PropsPropertyCard, _extends({}, l, {
    onOpen: () => window.HirthOpenListing(l)
  })))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '96px 0',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '24px',
      color: 'var(--text-secondary)'
    }
  }, "Records from the live site go here."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      marginTop: '12px'
    }
  }, "The ", label.toLowerCase(), " archive isn\u2019t included in this kit \u2014 populate it from hirthgroup.com/", status, "."))), lightbox ? ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => setLightbox(null),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(8,14,18,0.93)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5vh 5vw',
      cursor: 'zoom-out',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--navy-900)',
      borderRadius: '6px',
      overflow: 'hidden',
      maxWidth: '820px',
      width: '100%',
      maxHeight: '88vh',
      boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
      cursor: 'default',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '16 / 10',
      background: '#0a141a',
      flex: 'none'
    }
  }, lightbox.image ? /*#__PURE__*/React.createElement("img", {
    src: window.__ASSET ? window.__ASSET(lightbox.image) : lightbox.image,
    alt: lightbox.title,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(160deg, #16242e, #0a141a)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__ASSET ? window.__ASSET('../assets/logo-hirth-white.png') : '../assets/logo-hirth-white.png',
    alt: "",
    style: {
      width: '40%',
      opacity: 0.3
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '16px',
      left: '16px',
      font: 'var(--weight-semibold) 10px var(--font-sans)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'rgba(12,22,28,0.82)',
      padding: '6px 11px',
      borderRadius: '2px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: 'var(--emerald-500, #1f8a5b)'
    }
  }), "Sold")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 30px 30px',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-semibold) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--blue-400)',
      margin: 0
    }
  }, "Closed Transaction"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '28px',
      color: '#fff',
      margin: '10px 0 0',
      lineHeight: 1.12
    }
  }, lightbox.headline || lightbox.title || 'Sold by The Hirth Group'), (() => {
    const sub = lightbox.headline && lightbox.title ? lightbox.title + (lightbox.meta ? ' · ' + lightbox.meta : '') : lightbox.meta || '';
    return sub ? /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-inverse-secondary)',
        margin: '8px 0 0',
        fontSize: '15px'
      }
    }, sub) : null;
  })(), lightbox.price && /^\$/.test(lightbox.price) || lightbox.dealType || lightbox.representation ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 34px',
      marginTop: '18px'
    }
  }, lightbox.price && /^\$/.test(lightbox.price) ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 10px var(--font-sans)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: 0
    }
  }, lightbox.dealCount ? 'Highest Sale Price' : 'Sale Price'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '24px',
      color: 'var(--blue-400)',
      margin: '4px 0 0'
    }
  }, lightbox.price), lightbox.dealCount ? /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 12.5px var(--font-sans)',
      color: 'var(--text-inverse-secondary)',
      margin: '4px 0 0'
    }
  }, lightbox.dealCount, " separate closings at this property") : null) : null, lightbox.dealType ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 10px var(--font-sans)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: 0
    }
  }, "Property Type"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '15px',
      color: '#fff',
      margin: '6px 0 0'
    }
  }, lightbox.dealType)) : null, lightbox.representation ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 10px var(--font-sans)',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: 0
    }
  }, "Represented"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '15px',
      color: '#fff',
      margin: '6px 0 0'
    }
  }, lightbox.representation)) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '2px',
      background: 'var(--blue-500)',
      margin: '20px 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: '0 0 10px'
    }
  }, "About This Property"), lightbox.description && lightbox.description.length ? lightbox.description.map((para, pi) => /*#__PURE__*/React.createElement("p", {
    key: pi,
    style: {
      color: 'rgba(244,247,249,0.82)',
      fontSize: '14.5px',
      lineHeight: 'var(--leading-body)',
      margin: pi ? '14px 0 0' : 0
    }
  }, para)) : /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(244,247,249,0.82)',
      fontSize: '14.5px',
      lineHeight: 'var(--leading-body)',
      margin: 0
    }
  }, lightbox.tagline || 'The Hirth Group represented ' + (lightbox.representation ? 'the ' + lightbox.representation.toLowerCase() : 'our client') + ' in the closing of ' + (lightbox.title || 'this property') + (lightbox.meta ? ' in ' + lightbox.meta.split(',')[0] : '') + '.' + (lightbox.dealType ? ' A ' + lightbox.dealType.toLowerCase() + ' transaction' : '') + (lightbox.price && /^\$/.test(lightbox.price) ? (lightbox.dealType ? ', closed at ' : ' closed at ') + lightbox.price + '.' : lightbox.dealType ? '.' : '') + ' For full details on this transaction, please get in touch with our team.'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLightbox(null),
    style: {
      marginTop: '24px',
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.22)',
      color: '#fff',
      font: 'var(--weight-medium) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      padding: '11px 22px',
      borderRadius: '2px',
      cursor: 'pointer'
    }
  }, "Close")))), document.body) : null);
}
window.PropertiesPage = PropertiesPage;
