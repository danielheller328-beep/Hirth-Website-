function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group website kit — HomePage
const {
  Button,
  SectionHeader,
  Eyebrow,
  StatBand,
  PropertyCard,
  TestimonialQuote
} = window.HirthGroupDesignSystem_c76dea;
function RotatingTestimonial() {
  const items = window.TESTIMONIALS || [];
  const [i, setI] = React.useState(0);
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI(p => (p + 1) % items.length);
        setShow(true);
      }, 450);
    }, 6000);
    return () => clearInterval(id);
  }, [items.length]);
  const t = items[i] || {
    quote: '',
    attribution: ''
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: show ? 1 : 0,
      transition: 'opacity 450ms var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(TestimonialQuote, {
    quote: t.quote,
    attribution: t.attribution
  })));
}
function HomePage({
  go,
  countUp = true
}) {
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Home"
  }, /*#__PURE__*/React.createElement(window.DiveHero, {
    go: go
  }), /*#__PURE__*/React.createElement("section", {
    className: "statband3d texture-map watermark-logo",
    style: {
      position: 'relative',
      borderTop: '1px solid var(--border-inverse)',
      padding: '64px var(--container-pad)',
      background: 'linear-gradient(160deg, #16323f 0%, #0b1820 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(60% 120% at 18% 50%, rgba(43,182,187,0.14), transparent 60%), radial-gradient(60% 120% at 82% 50%, rgba(205,163,95,0.13), transparent 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(StatBand, {
    stats: [{
      value: '$525,000,000',
      suffix: '+',
      label: 'Sold',
      countUp
    }, {
      value: '200',
      suffix: '+',
      label: 'Transactions',
      countUp
    }, {
      value: '10',
      suffix: '+',
      label: 'Years in LA County',
      countUp
    }]
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container bg-dots watermark-logo on-light",
    style: {
      position: 'relative',
      paddingTop: 'var(--space-10)',
      paddingBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Listings"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: '24px',
      marginBottom: '48px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Featured Listings",
    title: "Currently on the Market"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go('properties-for-sale')
  }, "View All")), /*#__PURE__*/React.createElement("div", {
    className: "r-grid-4",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px'
    }
  }, FEATURED.map((l, i) => /*#__PURE__*/React.createElement("div", {
    className: "tilt3d reveal3d",
    style: {
      transitionDelay: i * 110 + 'ms'
    },
    key: l.title + '-' + i
  }, /*#__PURE__*/React.createElement(PropertyCard, _extends({}, l, {
    onOpen: () => window.HirthOpenListing(l)
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "watermark-logo bg-diag",
    style: {
      background: 'var(--band-alt)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container r-2col",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: '72px',
      alignItems: 'center',
      paddingTop: 'var(--space-9)',
      paddingBottom: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tilt3d"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/photos/team.png",
    alt: "The Hirth Group team",
    loading: "lazy",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-overlay)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      transitionDelay: '120ms'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Your Trusted Brokers",
    title: "Advisory, Not Just Brokerage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '52px',
      height: '2px',
      background: 'linear-gradient(90deg, var(--gold-500), var(--gold-300))',
      margin: '20px 0 0'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      lineHeight: 'var(--leading-body)',
      margin: '24px 0 32px',
      fontSize: 'var(--text-body-lg)'
    }
  }, "At The Hirth Group, we specialize in retail, industrial, office, and multifamily properties across the greater Los Angeles market. Whether you\u2019re a first-time investor or a seasoned owner looking to 1031 into your next asset, we deliver the clarity and strategy you need to make the right move."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('about-team')
  }, "Meet the Team")))), /*#__PURE__*/React.createElement("section", {
    className: "container bg-diag",
    style: {
      position: 'relative',
      paddingTop: 'var(--space-10)',
      paddingBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Services"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    align: "center",
    eyebrow: "Our Services",
    title: "One Team Across the Whole Deal",
    lede: "From first valuation to closing table \u2014 three disciplines, one accountable team."
  })), /*#__PURE__*/React.createElement("div", {
    className: "r-grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '28px',
      marginTop: '60px'
    }
  }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: s.title,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('about-services');
    },
    className: "svc-card reveal3d",
    style: {
      '--svc-accent': s.accent,
      transitionDelay: i * 130 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-media",
    style: {
      position: 'relative',
      aspectRatio: '5 / 3',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.image,
    alt: s.title,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(10,20,26,0.05) 0%, rgba(10,20,26,0.34) 55%, rgba(10,20,26,0.92) 100%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "svc-num",
    "aria-hidden": "true"
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    className: "svc-badge",
    style: {
      background: s.accent
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": s.icon,
    style: {
      width: '20px',
      height: '20px',
      color: '#0a141a'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      position: 'absolute',
      left: '26px',
      right: '26px',
      bottom: '20px',
      fontFamily: 'var(--font-display)',
      fontSize: '25px',
      color: '#fff',
      margin: 0,
      lineHeight: 1.1
    }
  }, s.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 26px 26px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      fontSize: '15px',
      lineHeight: 'var(--leading-body)',
      margin: 0
    }
  }, s.blurb), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: '20px 0 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, s.points.map(pt => /*#__PURE__*/React.createElement("li", {
    key: pt,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '13.5px',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: '15px',
      height: '15px',
      color: s.accent,
      flex: 'none'
    }
  }), pt))), /*#__PURE__*/React.createElement("span", {
    className: "svc-cta",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '24px',
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: s.accent
    }
  }, "Learn More ", /*#__PURE__*/React.createElement("span", {
    className: "svc-arrow"
  }, "\u2192"))))))), /*#__PURE__*/React.createElement("section", {
    className: "texture-map bg-rings",
    style: {
      position: 'relative',
      background: 'linear-gradient(165deg, #1a2c3a 0%, #0e1a22 60%, #0a141a 100%)',
      padding: '96px var(--container-pad)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(50% 80% at 50% 0%, rgba(123,106,160,0.18), transparent 60%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ghost-word gold",
    "aria-hidden": "true",
    style: {
      right: 'auto',
      left: '8px',
      top: '14px',
      bottom: 'auto'
    }
  }, "Clients"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(RotatingTestimonial, null), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    onClick: () => go('about-testimonials')
  }, "Read More"))));
}
window.HomePage = HomePage;
