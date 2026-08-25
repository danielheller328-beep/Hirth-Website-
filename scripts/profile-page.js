// The Hirth Group website kit — Daniel Hirth profile page
const {
  Eyebrow: ProfEyebrow,
  ContactRow: ProfContactRow,
  Button: ProfButton,
  Stat: ProfStat
} = window.HirthGroupDesignSystem_c76dea;
function ProfilePage({
  go
}) {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Daniel Hirth Profile"
  }, /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      paddingBottom: '0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container r-2col",
    style: {
      display: 'grid',
      gridTemplateColumns: '380px 1fr',
      gap: '72px',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tilt3d reveal-clip",
    style: {
      paddingTop: '64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      border: '1px solid rgba(201,162,77,0.35)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,162,77,0.12)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "r-portrait",
    src: "../assets/photos/daniel-hirth-portrait.png",
    alt: "Daniel Hirth",
    style: {
      width: '100%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200), transparent)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 62%, rgba(8,16,22,0.55) 100%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '18px',
      bottom: '16px',
      font: 'var(--weight-semibold) 10px var(--font-sans)',
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--gold-200)'
    }
  }, "Beverly Hills \xB7 Est. 2012"), /*#__PURE__*/React.createElement("span", {
    className: "cinema-sweep",
    "aria-hidden": "true"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reveal-right",
    style: {
      padding: '88px 0',
      transitionDelay: '160ms'
    }
  }, /*#__PURE__*/React.createElement(ProfEyebrow, {
    tone: "gold"
  }, DANIEL.role), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(40px, 5vw, 60px)',
      color: '#fff',
      margin: '14px 0 0'
    }
  }, DANIEL.name), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '64px',
      height: '2px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))',
      margin: '22px 0 32px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "r-grid-2",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px 48px',
      maxWidth: '560px'
    }
  }, /*#__PURE__*/React.createElement(ProfContactRow, {
    inverse: true,
    icon: "phone",
    label: "Direct",
    value: DANIEL.phone,
    href: "tel:3103002838"
  }), /*#__PURE__*/React.createElement(ProfContactRow, {
    inverse: true,
    icon: "printer",
    label: "Fax",
    value: DANIEL.fax
  }), /*#__PURE__*/React.createElement(ProfContactRow, {
    inverse: true,
    icon: "mail",
    label: "Email",
    value: DANIEL.email,
    href: 'mailto:' + DANIEL.email
  }), /*#__PURE__*/React.createElement(ProfContactRow, {
    inverse: true,
    icon: "badge-check",
    label: "License",
    value: DANIEL.license.replace('License ', '')
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(201,162,77,0.22)',
      marginTop: '40px',
      background: 'linear-gradient(180deg, transparent, rgba(201,162,77,0.04))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container r-grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1px',
      background: 'transparent',
      paddingTop: '24px',
      paddingBottom: '24px'
    }
  }, [['$525,000,000', '+', 'Career Volume'], ['200', '+', 'Transactions'], ['2012', '', 'In the Business Since']].map(([v, suf, l], i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      borderLeft: i ? '1px solid rgba(201,162,77,0.18)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(ProfStat, {
    value: v,
    suffix: suf,
    label: l,
    inverse: true
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "container r-bio",
    style: {
      paddingTop: 'var(--space-9)',
      paddingBottom: 'var(--space-9)',
      display: 'grid',
      gridTemplateColumns: '1fr 720px 1fr',
      gap: '32px'
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("article", {
    className: "reveal-lines"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      '--i': 0,
      font: 'var(--weight-medium) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-600, #a67c1f)',
      margin: '0 0 20px'
    }
  }, "About Daniel"), /*#__PURE__*/React.createElement("p", {
    className: "bio-lede",
    style: {
      '--i': 1,
      fontFamily: 'var(--font-display)',
      fontSize: '28px',
      lineHeight: 1.5,
      color: 'var(--text-primary)',
      marginBottom: '40px'
    }
  }, DANIEL.bio[0]), DANIEL.bio.slice(1).map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      '--i': i + 2,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-secondary)',
      marginBottom: '28px'
    }
  }, para)), /*#__PURE__*/React.createElement("div", {
    style: {
      '--i': DANIEL.bio.length + 2,
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '32px',
      marginTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-hirth-group.png",
    alt: "",
    loading: "lazy",
    style: {
      height: '54px',
      width: 'auto',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, "Daniel Hirth"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      margin: '2px 0 0',
      letterSpacing: '0.04em'
    }
  }, "Principal \xB7 The Hirth Group"))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: '32px',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(ProfButton, {
    variant: "outline",
    onClick: () => go('about-team')
  }, "\u2190 Back to Team"), /*#__PURE__*/React.createElement(ProfButton, {
    variant: "primary",
    onClick: () => go('contact')
  }, "Work with Daniel"))), /*#__PURE__*/React.createElement("div", null)));
}
window.ProfilePage = ProfilePage;
