/* @ds-bundle: {"format":3,"namespace":"HirthGroupDesignSystem_c76dea","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ContactRow","sourcePath":"components/core/ContactRow.jsx"},{"name":"PropertyCard","sourcePath":"components/core/PropertyCard.jsx"},{"name":"Eyebrow","sourcePath":"components/core/SectionHeader.jsx"},{"name":"SectionHeader","sourcePath":"components/core/SectionHeader.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"StatBand","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TestimonialQuote","sourcePath":"components/core/TestimonialQuote.jsx"},{"name":"TextField","sourcePath":"components/core/TextField.jsx"},{"name":"NavBar","sourcePath":"components/site/NavBar.jsx"},{"name":"SiteFooter","sourcePath":"components/site/SiteFooter.jsx"}],"sourceHashes":{"assets/maps/map-bounds.js":"c85dfcd322e1","components/core/Button.jsx":"be0a8ff2f00b","components/core/ContactRow.jsx":"8db953b1c817","components/core/PropertyCard.jsx":"f82a299efcb3","components/core/SectionHeader.jsx":"189516fde980","components/core/Stat.jsx":"eefe7e4a0a69","components/core/Tag.jsx":"a9b520112c2d","components/core/TestimonialQuote.jsx":"6fb3dac11e01","components/core/TextField.jsx":"3f648b2c8ea6","components/site/NavBar.jsx":"98db6a171608","components/site/SiteFooter.jsx":"ba596a1f681e","deploy/assets/maps/map-bounds.js":"c85dfcd322e1","ui_kits/website/DiveHero.jsx":"a8929c8f53ca","ui_kits/website/HomePage.jsx":"c453f7b6de14","ui_kits/website/MapSections.jsx":"aabdd8508643","ui_kits/website/Pages.jsx":"49f8a836f34d","ui_kits/website/ProfilePage.jsx":"50b52e5e8718","ui_kits/website/PropertiesPage.jsx":"7ae68a684fb7","ui_kits/website/data.jsx":"5b9feb9eb46c","ui_kits/website/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HirthGroupDesignSystem_c76dea = window.HirthGroupDesignSystem_c76dea || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/maps/map-bounds.js
try { (() => {
window.MAP_BOUNDS = {
  "hero": {
    "west": -118.828125,
    "east": -117.7734375,
    "north": 34.30714385628804,
    "south": 33.7243396617476
  },
  "valley": {
    "west": -118.4765625,
    "east": -118.212890625,
    "north": 34.30714385628804,
    "south": 34.161818161230386
  },
  "westside": {
    "west": -118.564453125,
    "east": -118.30078125,
    "north": 34.08906131584995,
    "south": 33.943359946578816
  },
  "southla": {
    "west": -118.388671875,
    "east": -118.125,
    "north": 34.08906131584995,
    "south": 33.943359946578816
  },
  "earth": {
    "west": -180,
    "east": 180,
    "north": 85.0511287798066,
    "south": -85.0511287798066
  },
  "west": {
    "west": -146.25,
    "east": -101.25,
    "north": 48.922499263758255,
    "south": 11.178401873711792
  },
  "socal": {
    "west": -120.9375,
    "east": -115.3125,
    "north": 36.5978891330702,
    "south": 31.95216223802496
  },
  "locator": {
    "west": -118.828125,
    "east": -117.7734375,
    "north": 34.161818161230386,
    "south": 33.578014746144
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/maps/map-bounds.js", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group — Button
function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  children,
  style,
  target,
  rel,
  download,
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-semibold)',
    fontSize: size === 'lg' ? '13px' : '12px',
    letterSpacing: 'var(--tracking-caps)',
    textTransform: 'uppercase',
    padding: size === 'lg' ? '16px 32px' : '12px 24px',
    borderRadius: 'var(--radius-xs)',
    border: '1px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-inverse)'
    },
    accent: {
      background: 'var(--action-accent)',
      color: '#fff'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)'
    },
    'outline-inverse': {
      background: 'transparent',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.35)'
    }
  };
  const hovers = {
    primary: {
      background: 'var(--action-primary-hover)'
    },
    accent: {
      background: 'var(--action-accent-hover)'
    },
    outline: {
      borderColor: 'var(--border-strong)',
      background: 'var(--grey-50)'
    },
    'outline-inverse': {
      borderColor: '#fff',
      background: 'rgba(255,255,255,0.08)'
    }
  };
  const [hover, setHover] = React.useState(false);
  const css = {
    ...base,
    ...variants[variant],
    ...(hover ? hovers[variant] : null),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    target: target,
    rel: rel,
    download: download,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/ContactRow.jsx
try { (() => {
// The Hirth Group — ContactRow (icon + label + value)
// Icons: Lucide via CDN — host page must load https://unpkg.com/lucide@latest
// and call lucide.createIcons() after render (see card/kit examples).
function ContactRow({
  icon = 'phone',
  label,
  value,
  href,
  inverse = false
}) {
  const inner = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: '18px',
      height: '18px',
      flex: 'none',
      marginTop: '3px',
      color: 'var(--blue-500)'
    }
  }), /*#__PURE__*/React.createElement("span", null, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '11px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-inverse-secondary)' : 'var(--text-muted)',
      marginBottom: '3px'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      lineHeight: 1.5,
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)'
    }
  }, value)));
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      textDecoration: 'none',
      display: 'block'
    }
  }, inner) : /*#__PURE__*/React.createElement("div", null, inner);
}
Object.assign(__ds_scope, { ContactRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ContactRow.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeader.jsx
try { (() => {
// The Hirth Group — Eyebrow + SectionHeader
function Eyebrow({
  tone = 'accent',
  children,
  style
}) {
  const colors = {
    accent: 'var(--text-accent)',
    muted: 'var(--text-muted)',
    inverse: 'var(--blue-400)',
    gold: 'var(--gold-200)'
  };
  return /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: 'var(--text-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: colors[tone],
      margin: 0,
      ...style
    }
  }, children);
}
function SectionHeader({
  eyebrow,
  title,
  lede,
  inverse = false,
  align = 'left',
  rule = true,
  style
}) {
  const center = align === 'center';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      alignItems: center ? 'center' : 'flex-start',
      textAlign: center ? 'center' : 'left',
      maxWidth: center ? '720px' : '640px',
      margin: center ? '0 auto' : undefined,
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement(Eyebrow, {
    tone: inverse ? 'inverse' : 'accent'
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 'var(--text-h2)',
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-display)',
      margin: 0,
      color: inverse ? '#fff' : 'var(--text-primary)'
    }
  }, title), rule ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '2px',
      background: 'var(--rule-accent)'
    }
  }) : null, lede ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--leading-body)',
      margin: 0,
      color: inverse ? 'var(--text-inverse-secondary)' : 'var(--text-secondary)'
    }
  }, lede) : null);
}
Object.assign(__ds_scope, { Eyebrow, SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group — Stat figure
// Figures glide up to their value when scrolled into view (once) — they start
// near the target (~90%), never zero, and settle gently over ~2s. Big numbers
// rise in clean rounded steps (e.g. whole millions) so trailing digits don't churn.
// Respects prefers-reduced-motion (renders the final value immediately).

function useCountUp(value, duration = 10000, startFraction = 0.9) {
  // Split "$522,000,000" into prefix "$", number 522000000, and a flag for comma grouping.
  const match = String(value).match(/^([^0-9]*)([\d,\.]+)(.*)$/);
  const prefix = match ? match[1] : '';
  const tail = match ? match[3] : '';
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : null;
  const grouped = match ? match[2].includes(',') : false;
  const decimals = match && match[2].includes('.') ? (match[2].split('.')[1] || '').length : 0;
  // Quantize lightly so the climb is smooth (small increments, no big leaps).
  const step = target ? Math.max(Math.pow(10, Math.floor(Math.log10(target)) - 4), decimals ? Math.pow(10, -decimals) : 1) : 1;
  const fmtExact = n => {
    const fixed = n.toFixed(decimals);
    const out = grouped ? Number(fixed).toLocaleString('en-US', {
      minimumFractionDigits: decimals
    }) : fixed;
    return prefix + out + tail;
  };
  const fmt = n => fmtExact(Math.round(n / step) * step);
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(target === null ? value : fmt(target * startFraction));
  const startedRef = React.useRef(false);
  React.useEffect(() => {
    if (target === null) {
      setDisplay(value);
      return;
    }
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(fmtExact(target));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const from = target * startFraction;
      const t0 = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 2.2); // slow, even climb that gently settles — no fast jump
        setDisplay(p < 1 ? fmt(from + (target - from) * eased) : fmtExact(target));
        if (p >= 1) clearInterval(anim);
      };
      const anim = setInterval(tick, 1000 / 60);
      tick();
      timers.push(() => clearInterval(anim));
    };
    // Trigger via interval poll (rAF/IntersectionObserver can be dead in embedded
    // iframes — the reveal system avoids them for the same reason). Fires run()
    // once the figure scrolls to ~90% up the viewport.
    const timers = [];
    const poll = setInterval(() => {
      if (startedRef.current) {
        clearInterval(poll);
        return;
      }
      const r = el.getBoundingClientRect();
      if (window.innerHeight < 10 || r.top < window.innerHeight * 0.9 && r.bottom > 0) run();
    }, 120);
    timers.push(() => clearInterval(poll));
    return () => timers.forEach(fn => fn());
  }, [value]);
  return [ref, display];
}
function Stat({
  value,
  suffix = '',
  label,
  inverse = true,
  size = 'md',
  countUp = true
}) {
  const figSize = size === 'lg' ? 'clamp(64px, 7vw, 96px)' : 'clamp(48px, 5.2vw, 72px)';
  const [ref, display] = useCountUp(value);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: figSize,
      lineHeight: 1.02,
      color: inverse ? '#fff' : 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em',
      position: 'relative',
      display: 'inline-block',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      visibility: 'hidden'
    }
  }, value, suffix || ''), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, countUp ? display : value, suffix ? /*#__PURE__*/React.createElement("span", {
    className: "stat-plus",
    style: {
      color: inverse ? 'var(--gold-300)' : 'var(--text-accent)'
    }
  }, suffix) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '12.5px',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--gold-400)' : 'var(--text-muted)',
      marginTop: '14px'
    }
  }, label));
}
function StatBand({
  stats,
  size = 'md'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'clamp(40px, 7vw, 96px)'
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "stat-div",
    style: {
      width: '1px',
      height: '72px',
      background: 'var(--border-inverse)'
    }
  }) : null, /*#__PURE__*/React.createElement(Stat, _extends({}, s, {
    size: size
  })))));
}
Object.assign(__ds_scope, { Stat, StatBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
// The Hirth Group — status Tag chip
function Tag({
  status = 'for-sale',
  children,
  style
}) {
  const map = {
    'for-sale': {
      background: 'var(--status-available)',
      color: '#fff',
      border: '1px solid transparent'
    },
    'for-lease': {
      background: 'var(--blue-50)',
      color: 'var(--blue-700)',
      border: '1px solid var(--blue-100)'
    },
    'in-escrow': {
      background: 'var(--navy-700)',
      color: '#fff',
      border: '1px solid transparent'
    },
    closed: {
      background: 'var(--status-closed)',
      color: '#fff',
      border: '1px solid transparent'
    },
    leased: {
      background: 'var(--grey-100)',
      color: 'var(--grey-700)',
      border: '1px solid transparent'
    },
    neutral: {
      background: 'var(--grey-100)',
      color: 'var(--grey-700)',
      border: '1px solid transparent'
    }
  };
  const labels = {
    'for-sale': 'For Sale',
    'for-lease': 'For Lease',
    'in-escrow': 'In Escrow',
    closed: 'Sold',
    leased: 'Leased'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '11px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      padding: '6px 12px',
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      ...map[status],
      ...style
    }
  }, children || labels[status]);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/PropertyCard.jsx
try { (() => {
// The Hirth Group — PropertyCard

function PropertyCard({
  image,
  title,
  meta,
  price,
  status = 'for-sale',
  href = '#',
  style,
  placeholderLogo = '../../assets/logo-hirth-white.png',
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  const media = image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: hover ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--duration-slow) var(--ease-out)'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'radial-gradient(120% 120% at 50% 18%, var(--navy-700) 0%, var(--navy-900) 55%, var(--navy-950) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transform: hover ? 'scale(1.03)' : 'scale(1)',
      transition: 'transform var(--duration-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: placeholderLogo,
    alt: "",
    style: {
      height: '40%',
      maxHeight: '92px',
      width: 'auto',
      opacity: 0.92
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '34px',
      height: '2px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-semibold) 10px var(--font-sans)',
      letterSpacing: '0.26em',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)'
    }
  }, status === 'closed' ? 'Sold by The Hirth Group' : status === 'leased' ? 'Leased by The Hirth Group' : 'The Hirth Group'));
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: e => {
      if (onOpen) {
        e.preventDefault();
        onOpen({
          image,
          title,
          meta,
          price,
          status
        });
      }
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'block',
      textDecoration: 'none',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--duration-base) var(--ease-out), transform var(--duration-base) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '3 / 2',
      overflow: 'hidden'
    }
  }, media, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    status: status,
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: '3px',
      width: hover ? '100%' : '0%',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))',
      transition: 'width var(--duration-base) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px 24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: 'var(--leading-heading)',
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, title), meta ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '11.5px',
      color: 'var(--text-muted)',
      margin: '8px 0 0',
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  }, meta) : null, (() => {
    const priceColor = status === 'closed' || status === 'leased' ? 'var(--text-muted)' : 'var(--gold-200)';
    const label = price ? price : status === 'closed' ? 'SOLD' : status === 'leased' ? 'LEASED' : status === 'for-lease' ? 'FOR LEASE' : status === 'in-escrow' ? 'IN ESCROW' : 'Contact for Price';
    const isStatus = !price;
    return /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: isStatus ? 'var(--weight-bold)' : 'var(--weight-semibold)',
        fontSize: isStatus ? '13px' : '16px',
        letterSpacing: isStatus ? '0.16em' : '0.01em',
        textTransform: isStatus ? 'uppercase' : 'none',
        color: priceColor,
        margin: '14px 0 0',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, (status === 'closed' || status === 'leased') && isStatus ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: status === 'closed' ? 'var(--status-closed, #1f7a4d)' : 'var(--grey-500)'
      }
    }) : null, label);
  })()));
}
Object.assign(__ds_scope, { PropertyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PropertyCard.jsx", error: String((e && e.message) || e) }); }

// components/core/TestimonialQuote.jsx
try { (() => {
// The Hirth Group — TestimonialQuote
function TestimonialQuote({
  quote,
  attribution,
  inverse = true,
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      maxWidth: '780px',
      textAlign: 'center',
      ...style
    }
  }, null, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: 1.5,
      letterSpacing: '0.005em',
      color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)'
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: '24px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '12px',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-inverse-secondary)' : 'var(--text-muted)'
    }
  }, "\u2014 ", attribution));
}
Object.assign(__ds_scope, { TestimonialQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TestimonialQuote.jsx", error: String((e && e.message) || e) }); }

// components/core/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group — TextField (input / textarea / select)
function TextField({
  label,
  type = 'text',
  placeholder,
  multiline = false,
  options,
  inverse = false,
  value,
  onChange,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    color: inverse ? '#fff' : 'var(--text-primary)',
    background: inverse ? 'rgba(255,255,255,0.06)' : 'var(--surface-card)',
    border: '1px solid ' + (focus ? 'var(--blue-500)' : inverse ? 'var(--border-inverse)' : 'var(--border-strong)'),
    boxShadow: focus ? '0 0 0 3px var(--focus-ring)' : 'none',
    borderRadius: 'var(--radius-xs)',
    padding: '13px 16px',
    outline: 'none',
    transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? '120px' : undefined
  };
  const common = {
    placeholder,
    value,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: fieldStyle
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginBottom: '8px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '11px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: inverse ? 'var(--text-inverse-secondary)' : 'var(--text-secondary)'
    }
  }, label) : null, multiline ? /*#__PURE__*/React.createElement("textarea", common) : options ? /*#__PURE__*/React.createElement("select", common, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, common)));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextField.jsx", error: String((e && e.message) || e) }); }

// components/site/NavBar.jsx
try { (() => {
// The Hirth Group — NavBar (sticky site header)
function NavBar({
  active = 'home',
  onNavigate,
  logoSrc = 'assets/logo-hirth-white.png',
  transparent = false
}) {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const [open, setOpen] = React.useState(null); // 'properties' | 'about' | null
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const go = page => e => {
    e.preventDefault();
    setOpen(null);
    setMobileOpen(false);
    onNavigate && onNavigate(page);
  };
  const linkStyle = isActive => ({
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '12px',
    letterSpacing: 'var(--tracking-caps)',
    textTransform: 'uppercase',
    color: isActive ? '#fff' : 'var(--text-inverse-secondary)',
    textDecoration: 'none',
    padding: '8px 2px',
    position: 'relative',
    borderBottom: isActive ? '2px solid var(--blue-500)' : '2px solid transparent',
    transition: 'color var(--duration-fast) var(--ease-out)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  });
  const menu = (id, label, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    },
    onMouseEnter: () => setOpen(id),
    onMouseLeave: () => setOpen(null)
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: linkStyle(active.startsWith(id))
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '8px',
      transform: open === id ? 'rotate(180deg)' : 'none',
      transition: 'transform var(--duration-fast)'
    }
  }, "\u25BE")), open === id ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: '-12px',
      minWidth: '184px',
      background: 'var(--navy-800)',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-overlay)',
      padding: '8px 0',
      zIndex: 50
    }
  }, items.map(([page, lbl]) => /*#__PURE__*/React.createElement("a", {
    key: page,
    href: "#",
    onClick: go(page),
    style: {
      display: 'block',
      padding: '10px 18px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '11px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: active === page ? 'var(--blue-400)' : 'var(--text-inverse-secondary)',
      textDecoration: 'none'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = '#fff';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = active === page ? 'var(--blue-400)' : 'var(--text-inverse-secondary)';
    }
  }, lbl))) : null);
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: transparent ? 'rgba(20, 36, 46, 0.85)' : 'var(--navy-900)',
      backdropFilter: transparent ? 'blur(12px)' : 'none',
      borderBottom: '1px solid var(--border-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      height: '88px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('home'),
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "The Hirth Group",
    style: {
      height: '68px',
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "nav-toggle",
    "aria-label": "Menu",
    onClick: () => setMobileOpen(v => !v),
    style: {
      display: 'none',
      background: 'transparent',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-xs)',
      width: '44px',
      height: '44px',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '5px',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '20px',
      height: '1.5px',
      background: '#fff',
      transition: 'transform .25s',
      transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '20px',
      height: '1.5px',
      background: '#fff',
      opacity: mobileOpen ? 0 : 1,
      transition: 'opacity .2s'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '20px',
      height: '1.5px',
      background: '#fff',
      transition: 'transform .25s',
      transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-desktop",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('home'),
    style: linkStyle(active === 'home')
  }, "Home"), menu('properties', 'Properties', [['properties-for-sale', 'For Sale'], ['properties-for-lease', 'For Lease'], ['properties-closed', 'Closed'], ['properties-leased', 'Leased']]), menu('about', 'About', [['about-team', 'The Team'], ['about-services', 'Services'], ['about-testimonials', 'Testimonials']]), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('contact'),
    style: linkStyle(active === 'contact')
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('contact'),
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '11px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: '#fff',
      textDecoration: 'none',
      border: '1px solid var(--blue-500)',
      borderRadius: 'var(--radius-xs)',
      padding: '11px 20px',
      whiteSpace: 'nowrap',
      transition: 'background var(--duration-fast) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--blue-600)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, "310.300.2838"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingLeft: '4px'
    }
  }, [['facebook', 'https://www.facebook.com/HirthGroup/'], ['linkedin', 'https://www.linkedin.com/in/daniel-hirth-10376936/'], ['instagram', 'https://www.instagram.com/hirthgroup/']].map(([n, href]) => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: href,
    target: "_blank",
    rel: "noopener",
    "aria-label": n,
    style: {
      color: 'var(--text-inverse-secondary)',
      display: 'inline-flex',
      transition: 'color var(--duration-fast)',
      cursor: 'pointer'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = '#fff';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-inverse-secondary)';
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": n,
    style: {
      width: '16px',
      height: '16px'
    }
  })))))), mobileOpen ? /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile",
    style: {
      borderTop: '1px solid var(--border-inverse)',
      background: 'var(--navy-900)',
      padding: '12px var(--container-pad) 24px'
    }
  }, [['home', 'Home'], ['properties-for-sale', 'For Sale'], ['properties-for-lease', 'For Lease'], ['properties-closed', 'Closed'], ['properties-leased', 'Leased'], ['about-team', 'The Team'], ['about-services', 'Services'], ['about-testimonials', 'Testimonials'], ['contact', 'Contact']].map(([page, lbl]) => /*#__PURE__*/React.createElement("a", {
    key: page,
    href: "#",
    onClick: go(page),
    style: {
      display: 'block',
      padding: '14px 4px',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: '13px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: active === page ? 'var(--blue-400)' : 'var(--text-inverse-secondary)',
      textDecoration: 'none'
    }
  }, lbl)), /*#__PURE__*/React.createElement("a", {
    href: "tel:3103002838",
    style: {
      display: 'inline-flex',
      marginTop: '20px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: '12px',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: '#fff',
      textDecoration: 'none',
      border: '1px solid var(--blue-500)',
      borderRadius: 'var(--radius-xs)',
      padding: '12px 22px'
    }
  }, "Call 310.300.2838")) : null);
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/site/SiteFooter.jsx
try { (() => {
// The Hirth Group — SiteFooter (navy footer with subscribe)

function SiteFooter({
  logoSrc = 'assets/logo-hirth-white.png',
  onNavigate
}) {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);
  const subscribe = () => {
    if (/.+@.+\..+/.test(email)) setSubscribed(true);
  };
  const go = page => e => {
    e.preventDefault();
    onNavigate && onNavigate(page);
  };
  const colTitle = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-medium)',
    fontSize: '11px',
    letterSpacing: 'var(--tracking-eyebrow)',
    textTransform: 'uppercase',
    color: 'var(--text-inverse-secondary)',
    margin: '0 0 18px'
  };
  const link = {
    display: 'block',
    marginBottom: '12px',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--text-inverse)',
    textDecoration: 'none',
    opacity: 0.9
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--navy-950)',
      color: 'var(--text-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px var(--container-pad) 0',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.4fr',
      gap: '48px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "The Hirth Group",
    style: {
      height: '112px',
      width: 'auto',
      marginBottom: '20px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      lineHeight: 1.7,
      color: 'var(--text-inverse-secondary)',
      maxWidth: '280px'
    }
  }, "Commercial real estate brokerage \u2014 retail, industrial, office & multifamily across greater Los Angeles.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: colTitle
  }, "Properties"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('properties-for-sale'),
    style: link
  }, "For Sale"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('properties-for-lease'),
    style: link
  }, "For Lease"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('properties-closed'),
    style: link
  }, "Closed"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go('properties-leased'),
    style: link
  }, "Leased")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: colTitle
  }, "Get in Touch"), /*#__PURE__*/React.createElement("a", {
    href: "tel:3103002838",
    style: link
  }, "310-300-2838"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@hirthgroup.com",
    style: link
  }, "info@hirthgroup.com"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...link,
      opacity: 0.7
    }
  }, "439 N. Canon Drive, Suite 300", /*#__PURE__*/React.createElement("br", null), "Beverly Hills, CA 90210")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: colTitle
  }, "Never Miss a Deal"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      lineHeight: 1.7,
      color: 'var(--text-inverse-secondary)',
      margin: '0 0 16px'
    }
  }, "Subscribe for first access to new listings."), subscribed ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '13px 16px',
      border: '1px solid var(--blue-500)',
      borderRadius: 'var(--radius-xs)',
      background: 'rgba(27,156,216,0.1)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: '18px',
      height: '18px',
      color: 'var(--blue-400)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      color: 'var(--text-inverse)'
    }
  }, "You\u2019re on the list \u2014 watch your inbox.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      subscribe();
    },
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextField, {
    inverse: true,
    type: "email",
    placeholder: "Email address",
    value: email,
    onChange: e => setEmail(e.target.value),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "accent",
    onClick: subscribe
  }, "Subscribe")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '18px',
      marginTop: '24px'
    }
  }, [['facebook', 'https://www.facebook.com/HirthGroup/'], ['linkedin', 'https://www.linkedin.com/in/daniel-hirth-10376936/'], ['instagram', 'https://www.instagram.com/hirthgroup/']].map(([name, href]) => /*#__PURE__*/React.createElement("a", {
    key: name,
    href: href,
    "aria-label": name,
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'var(--text-inverse-secondary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-xs)',
      transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = '#fff';
      e.currentTarget.style.borderColor = 'var(--blue-500)';
      e.currentTarget.style.background = 'rgba(27,156,216,0.12)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-inverse-secondary)';
      e.currentTarget.style.borderColor = 'var(--border-inverse)';
      e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: '18px',
      height: '18px'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '48px auto 0',
      padding: '24px var(--container-pad)',
      borderTop: '1px solid var(--border-inverse)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: 'var(--grey-500)'
    }
  }, "\xA9 2026 by The Hirth Group"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12px',
      color: 'var(--grey-500)'
    }
  }, "In Strategic Partnership with KW Commercial \xB7 CA DRE 01428775")));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/site/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// deploy/assets/maps/map-bounds.js
try { (() => {
window.MAP_BOUNDS = {
  "hero": {
    "west": -118.828125,
    "east": -117.7734375,
    "north": 34.30714385628804,
    "south": 33.7243396617476
  },
  "valley": {
    "west": -118.4765625,
    "east": -118.212890625,
    "north": 34.30714385628804,
    "south": 34.161818161230386
  },
  "westside": {
    "west": -118.564453125,
    "east": -118.30078125,
    "north": 34.08906131584995,
    "south": 33.943359946578816
  },
  "southla": {
    "west": -118.388671875,
    "east": -118.125,
    "north": 34.08906131584995,
    "south": 33.943359946578816
  },
  "earth": {
    "west": -180,
    "east": 180,
    "north": 85.0511287798066,
    "south": -85.0511287798066
  },
  "west": {
    "west": -146.25,
    "east": -101.25,
    "north": 48.922499263758255,
    "south": 11.178401873711792
  },
  "socal": {
    "west": -120.9375,
    "east": -115.3125,
    "north": 36.5978891330702,
    "south": 31.95216223802496
  },
  "locator": {
    "west": -118.828125,
    "east": -117.7734375,
    "north": 34.161818161230386,
    "south": 33.578014746144
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "deploy/assets/maps/map-bounds.js", error: String((e && e.message) || e) }); }

// ui_kits/website/DiveHero.jsx
try { (() => {
// The Hirth Group website kit — DiveHero: cinematic Earth → LA scroll descent.
// 2D compositor-only build: every animated element moves with transform/opacity
// alone (pre-tinted map images, zero runtime filters, no WebGL) so the dive runs
// at full frame rate on any machine. Real cartography throughout (CARTO/OSM).
// Static contexts (no rendering frames / reduced motion) skip the dive and render
// the normal LA-map hero — content is never hidden. The descent is one-way per
// session: once you land in LA, the hero pins and never flies back to space.
const {
  Button: DiveButton,
  Eyebrow: DiveEyebrow
} = window.HirthGroupDesignSystem_c76dea;
const diveMercY = lat => {
  const r = lat * Math.PI / 180;
  return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2;
};
const DIVE_LA = {
  lat: 34.05,
  lon: -118.25
};
const diveFrac = b => {
  const yN = diveMercY(b.north),
    yS = diveMercY(b.south);
  return {
    x: (DIVE_LA.lon - b.west) / (b.east - b.west),
    y: (diveMercY(DIVE_LA.lat) - yN) / (yS - yN)
  };
};
const EF = diveFrac(window.MAP_BOUNDS.earth);
function DiveHero({
  go
}) {
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cleanup = null;
    const t = setTimeout(() => {
      const framesOk = document.documentElement.classList.contains('anim-ok');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!framesOk || reduced) return; // static fallback

      const planet = wrap.querySelector('.dive-planet-wrap');
      const glint = wrap.querySelector('.dive-la-glint');
      const starsEl = wrap.querySelector('.dive-stars');
      const layers = {
        socal: wrap.querySelector('.dive-socal')
      };
      const intro = wrap.querySelector('.dive-intro');
      const label = wrap.querySelector('.dive-label');
      const hint = wrap.querySelector('.dive-hint');
      const finalEl = wrap.querySelector('.dive-final');
      const B = window.MAP_BOUNDS;
      wrap.classList.add('dive-on');

      // ---------- layout ----------
      let D = 0;
      const place = () => {
        const vw = window.innerWidth,
          vh = window.innerHeight;
        D = Math.round(Math.min(vw, vh) * 0.74);
        planet.style.width = D + 'px';
        planet.style.height = D + 'px';
        planet.style.left = vw / 2 - D / 2 + 'px';
        planet.style.top = vh / 2 - D / 2 + vh * 0.03 + 'px';
        planet.style.transformOrigin = EF.x * 100 + '% ' + EF.y * 100 + '%';
        const S = 1.28 * Math.max(vw, vh);
        [['socal', B.socal]].forEach(([k, b]) => {
          const f = diveFrac(b),
            el = layers[k];
          el.style.width = S + 'px';
          el.style.height = S + 'px';
          el.style.left = vw / 2 - f.x * S + 'px';
          el.style.top = vh / 2 - f.y * S + 'px';
          el.style.transformOrigin = f.x * 100 + '% ' + f.y * 100 + '%';
        });
      };

      // ---------- scroll-driven timeline (all eased, all overlapping) ----------
      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
      const ss = t => {
        t = clamp(t, 0, 1);
        return t * t * (3 - 2 * t);
      };
      const seg = (p, a, b) => ss((p - a) / (b - a));
      let target = 0,
        prog = 0;
      let done = false; // one-way ratchet per page load — every fresh load starts at Earth
      // Scroll-jack: while descending we LOCK the page and drive progress from wheel/
      // touch deltas — so no matter how fast the user flings, they cannot skip past the
      // dive to the footer. Progress is clamped 0→1; the page releases only on landing.
      const SENS = 1 / 2600;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      const onWheel = e => {
        if (done) return;
        e.preventDefault();
        target = clamp(target + e.deltaY * SENS, 0, 1);
      };
      let touchY = null;
      const onTouchStart = e => {
        touchY = e.touches[0].clientY;
      };
      const onTouchMove = e => {
        if (done) return;
        e.preventDefault();
        const y = e.touches[0].clientY;
        if (touchY != null) target = clamp(target + (touchY - y) * SENS * 2.2, 0, 1);
        touchY = y;
      };
      const onKey = e => {
        if (done) return;
        if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
          e.preventDefault();
          target = clamp(target + 0.14, 0, 1);
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          e.preventDefault();
          target = clamp(target - 0.14, 0, 1);
        }
      };
      const releaseLock = () => {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        window.removeEventListener('wheel', onWheel, {
          passive: false
        });
        window.removeEventListener('touchmove', onTouchMove, {
          passive: false
        });
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('keydown', onKey);
      };
      const onScroll = () => {
        if (done) target = 1;
      };
      const setFlat = (el, p, inA, inB, outA, outB, sA, sB) => {
        const o = seg(p, inA, inB) * (1 - seg(p, outA, outB));
        if (o < 0.004) {
          if (el.style.visibility !== 'hidden') {
            el.style.visibility = 'hidden';
            el.style.opacity = 0;
          }
          return;
        }
        el.style.visibility = 'visible';
        el.style.opacity = o;
        // modest per-layer scale — the cross-dissolve between progressively zoomed
        // real maps carries the descent, so we never rasterize an extreme size
        el.style.transform = 'translateZ(0) scale(' + Math.pow(3.0, seg(p, sA, sB)).toFixed(4) + ')';
      };
      const LABELS = [[0.05, 0.42, 'Earth'], [0.6, 0.82, 'Southern California']];
      let raf = 0;
      let last = 0;
      // Smooth the raw scroll target itself (wheel notches arrive as big discrete
      // jumps); we low-pass the target, then critically-damp the displayed prog
      // toward it — two stages of easing turn stepped input into glass-smooth motion.
      let smoothTarget = 0;
      const loop = now => {
        if (disposed) return;
        const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
        last = now;
        smoothTarget += (target - smoothTarget) * (1 - Math.exp(-dt * 5.0));
        const k = 1 - Math.exp(-dt * 4.2); // gentle glide, ~230ms time-constant
        prog += (smoothTarget - prog) * k;
        if (Math.abs(smoothTarget - prog) < 0.0003 && Math.abs(target - smoothTarget) < 0.0003) {
          prog = smoothTarget = target;
        }
        if (!done && prog >= 0.985) {
          done = true;
          wrap.classList.add('dive-done');
          prog = 1;
          target = 1;
          releaseLock();
          window.scrollTo({
            top: 0
          });
        }
        const p = prog;

        // planet: gentle idle bob, then a single accelerating zoom anchored on LA
        const e1 = seg(p, 0.02, 0.5);
        const drift = seg(p, 0.04, 0.46);
        const zoom = 1 + Math.pow(seg(p, 0.0, 0.52), 1.5) * 2.2; // 1 → 3.2, smooth
        const tx = (0.5 - EF.x) * D * drift;
        const ty = (0.5 - EF.y) * D * drift + 7 * Math.sin(now * 0.0006) * (1 - e1);
        const planetO = 1 - seg(p, 0.46, 0.6);
        planet.style.transform = 'translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0) scale(' + zoom.toFixed(4) + ')';
        planet.style.opacity = planetO;
        planet.style.visibility = planetO < 0.004 ? 'hidden' : 'visible';
        glint.style.opacity = seg(p, 0.16, 0.34) * planetO;
        starsEl.style.opacity = 1 - seg(p, 0.3, 0.52);
        setFlat(layers.socal, p, 0.46, 0.6, 0.82, 0.92, 0.5, 0.86);
        const io = 1 - seg(p, 0.02, 0.13);
        intro.style.opacity = io;
        hint.style.opacity = io;
        let lt = '',
          lo = 0;
        for (const [a, b, txt] of LABELS) {
          const o = seg(p, a, a + 0.05) * (1 - seg(p, b, b + 0.05));
          if (o > lo) {
            lo = o;
            lt = txt;
          }
        }
        if (lt) label.textContent = lt;
        label.style.opacity = lo;
        const fo = seg(p, 0.86, 0.96);
        finalEl.style.opacity = fo;
        finalEl.style.pointerEvents = fo > 0.6 ? 'auto' : 'none';
        finalEl.classList.toggle('show', fo > 0.12);
        raf = requestAnimationFrame(loop);
      };
      let disposed = false;
      place();
      onScroll();
      raf = requestAnimationFrame(loop);
      const onResize = () => {
        place();
        onScroll();
      };
      window.addEventListener('wheel', onWheel, {
        passive: false
      });
      window.addEventListener('touchstart', onTouchStart, {
        passive: true
      });
      window.addEventListener('touchmove', onTouchMove, {
        passive: false
      });
      window.addEventListener('keydown', onKey);
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      window.addEventListener('resize', onResize, {
        passive: true
      });
      cleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        releaseLock();
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }, 180);
    return () => {
      clearTimeout(t);
      if (cleanup) cleanup();
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    className: "dive-wrap",
    style: {
      marginTop: '-88px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dive-sticky",
    style: {
      overflow: 'hidden',
      background: 'radial-gradient(120% 120% at 50% 30%, #0d1822 0%, #04080c 70%)'
    }
  }, /*#__PURE__*/React.createElement(window.HeroMapBackdrop, null), /*#__PURE__*/React.createElement("div", {
    className: "dive-layer dive-socal",
    style: {
      position: 'absolute',
      zIndex: 19,
      backgroundImage: 'url(../../assets/maps/dive-socal-blue.png)',
      backgroundSize: '100% 100%',
      willChange: 'transform, opacity',
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dive-stars",
    style: {
      zIndex: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dive-planet-wrap",
    style: {
      position: 'absolute',
      zIndex: 30,
      willChange: 'transform, opacity',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dive-planet",
    style: {
      backgroundImage: 'url(../../assets/maps/earth-mercator-blue.png)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dive-la-glint",
    style: {
      left: EF.x * 100 + '%',
      top: EF.y * 100 + '%',
      opacity: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dive-intro",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '28px',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-hirth-white.png",
    alt: "The Hirth Group",
    style: {
      height: '210px',
      width: 'auto',
      filter: 'drop-shadow(0 0 60px rgba(27,156,216,0.45)) drop-shadow(0 18px 40px rgba(0,0,0,0.6))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '56px',
      height: '2px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 13px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: 0
    }
  }, "Commercial Real Estate \xB7 Los Angeles, California")), /*#__PURE__*/React.createElement("div", {
    className: "dive-label",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '96px',
      zIndex: 52,
      textAlign: 'center',
      font: 'var(--weight-medium) 12px var(--font-sans)',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.78)',
      textShadow: '0 1px 6px rgba(0,0,0,0.8)',
      pointerEvents: 'none',
      opacity: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "dive-hint",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '36px',
      zIndex: 52,
      textAlign: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: '0.26em',
      textTransform: 'uppercase',
      color: 'var(--blue-400)'
    }
  }, "Scroll to Descend"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '1px',
      height: '34px',
      margin: '12px auto 0',
      background: 'linear-gradient(180deg, var(--blue-400), transparent)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "dive-final",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 48,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      position: 'relative',
      width: '100%',
      paddingTop: '88px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "fx",
    src: "../../assets/logo-hirth-white.png",
    alt: "The Hirth Group",
    style: {
      height: '108px',
      width: 'auto',
      marginBottom: '30px',
      filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.55))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fx",
    style: {
      transitionDelay: '90ms'
    }
  }, /*#__PURE__*/React.createElement(DiveEyebrow, {
    tone: "inverse"
  }, "Commercial Real Estate \xB7 Greater Los Angeles")), /*#__PURE__*/React.createElement("h1", {
    className: "hero-h1 fx",
    style: {
      transitionDelay: '180ms',
      fontSize: 'clamp(44px, 5vw, 64px)',
      lineHeight: 'var(--leading-display)',
      color: '#fff',
      maxWidth: '820px',
      margin: '20px 0 0'
    }
  }, "Half a Billion Closed and Counting"), /*#__PURE__*/React.createElement("div", {
    className: "fx",
    style: {
      transitionDelay: '230ms',
      width: '64px',
      height: '3px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))',
      margin: '26px 0 0',
      borderRadius: '2px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "fx",
    style: {
      transitionDelay: '270ms',
      fontSize: 'var(--text-body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'rgba(244,247,249,0.85)',
      maxWidth: '560px',
      margin: '24px 0 40px'
    }
  }, "LA\u2019s go-to brokers for retail, industrial, office & multifamily \u2014 advisory built on market depth, straight talk, and relentless follow-through."), /*#__PURE__*/React.createElement("div", {
    className: "fx",
    style: {
      transitionDelay: '360ms',
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(DiveButton, {
    variant: "accent",
    size: "lg",
    onClick: () => go('properties-for-sale')
  }, "View Listings"), /*#__PURE__*/React.createElement(DiveButton, {
    variant: "outline-inverse",
    size: "lg",
    onClick: () => go('contact')
  }, "Get in Touch")))), /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'absolute',
      right: '14px',
      bottom: '10px',
      zIndex: 53,
      font: '400 10px var(--font-sans)',
      color: 'rgba(255,255,255,0.35)',
      margin: 0,
      pointerEvents: 'none'
    }
  }, "Maps \xA9 OpenStreetMap contributors \xB7 \xA9 CARTO")));
}
window.DiveHero = DiveHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DiveHero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
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
    src: "../../assets/photos/team.png",
    alt: "The Hirth Group team",
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
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement(TestimonialQuote, {
    quote: "We received multiple offers and our property sold quickly. The entire selling experience far exceeded our expectations. We highly recommend The Hirth Group.",
    attribution: "Susan Kassabian"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    onClick: () => go('about-testimonials')
  }, "Read More"))));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/MapSections.jsx
try { (() => {
// The Hirth Group website kit — real-map 3D sections.
// Map imagery: stitched CARTO dark basemap tiles (© OpenStreetMap contributors,
// © CARTO) — real LA street maps, generated in assets/maps/. Bounds in map-bounds.js.
const {
  SectionHeader: MapSectionHeader
} = window.HirthGroupDesignSystem_c76dea;
const mercY = lat => {
  const r = lat * Math.PI / 180;
  return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2;
};

// Real deal locations from the inventory (city centroids).
const HERO_MARKERS = [{
  name: 'Hirth Group HQ',
  lat: 34.0696,
  lon: -118.3963,
  hq: true,
  label: true
}, {
  name: 'Burbank',
  lat: 34.1808,
  lon: -118.3090,
  label: true
}, {
  name: 'North Hollywood',
  lat: 34.1720,
  lon: -118.3769,
  label: true
}, {
  name: 'Van Nuys',
  lat: 34.1899,
  lon: -118.4514
}, {
  name: 'Tarzana',
  lat: 34.1734,
  lon: -118.5550
}, {
  name: 'Hollywood',
  lat: 34.0980,
  lon: -118.3290
}, {
  name: 'Venice',
  lat: 33.9850,
  lon: -118.4695,
  label: true
}, {
  name: 'Culver City',
  lat: 34.0211,
  lon: -118.3965
}, {
  name: 'Inglewood',
  lat: 33.9617,
  lon: -118.3531,
  label: true
}, {
  name: 'South LA',
  lat: 33.9740,
  lon: -118.2780
}, {
  name: 'South Gate',
  lat: 33.9547,
  lon: -118.2120,
  label: true
}, {
  name: 'El Monte',
  lat: 34.0490,
  lon: -118.0440
}, {
  name: 'Anaheim',
  lat: 33.8366,
  lon: -117.9143,
  label: true
}];
function HeroMapBackdrop() {
  const b = window.MAP_BOUNDS.hero;
  const yN = mercY(b.north),
    yS = mercY(b.south);
  const pos = m => ({
    left: ((m.lon - b.west) / (b.east - b.west) * 100).toFixed(2) + '%',
    top: ((mercY(m.lat) - yN) / (yS - yN) * 100).toFixed(2) + '%'
  });
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      perspective: '1200px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-cursor-par": "16",
    style: {
      position: 'absolute',
      inset: 0,
      willChange: 'transform'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '128%',
      aspectRatio: '3 / 2',
      transform: 'translate(-50%, -54%) rotateX(calc(var(--depth-3d, 1) * 9deg)) scale(1.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "map-tint",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'url(../../assets/maps/la-hero-dark.png)',
      backgroundSize: '100% 100%'
    }
  }), HERO_MARKERS.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    className: "mk",
    style: pos(m)
  }, /*#__PURE__*/React.createElement("span", {
    className: "mk-ring",
    style: {
      animationDelay: i * 0.4 + 's'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mk-dot",
    style: m.hq ? {
      background: '#fff',
      width: '11px',
      height: '11px'
    } : null
  }), m.label ? /*#__PURE__*/React.createElement("span", {
    className: "mk-lbl"
  }, m.name) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(62% 72% at 50% 52%, rgba(12,22,28,calc(var(--scrim-a, 0.78) * 0.9)) 0%, rgba(12,22,28,calc(var(--scrim-a, 0.78) * 0.42)) 58%, rgba(12,22,28,0.1) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(125% 95% at 58% 42%, transparent 48%, rgba(12,22,28,0.92) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(12,22,28,0.75) 0%, transparent 22%, transparent 72%, rgba(12,22,28,0.88) 100%)'
    }
  }));
}

// ---- Market coverage: 3D map cards that rise into view on scroll ----
const SUBMARKETS = [{
  key: 'valley',
  name: 'The Valley',
  line: 'Burbank · North Hollywood · Van Nuys',
  accent: 'var(--gold-500)',
  cities: ['Burbank', 'North Hollywood', 'Van Nuys', 'Sun Valley', 'Valley Village', 'Tarzana']
}, {
  key: 'westside',
  name: 'The Westside',
  line: 'Venice · Culver City · Santa Monica',
  accent: 'var(--teal-400)',
  cities: ['Venice', 'Culver City', 'Beverly Hills', '90064', '90025', '90035']
}, {
  key: 'southla',
  name: 'South LA & Gateway',
  line: 'Inglewood · South Gate · Gardena',
  accent: 'var(--emerald-500)',
  cities: ['Inglewood', 'South Gate', 'Gardena', 'Lynwood', 'Huntington Park', '90047', '90003', '90001']
}];
function MarketCoverage() {
  // Scroll-reveal is handled by the global rect-check driver in index.html
  // (data-in / data-done attributes) — no observer needed here.

  const count = cities => LISTINGS.filter(l => cities.some(c => (l.title + ' ' + l.meta).includes(c))).length;
  return /*#__PURE__*/React.createElement("section", {
    className: "container bg-rings",
    style: {
      position: 'relative',
      paddingTop: 'var(--space-9)',
      paddingBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Coverage"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up"
  }, /*#__PURE__*/React.createElement(MapSectionHeader, {
    align: "center",
    eyebrow: "Market Coverage",
    title: "We Know Every Corner of LA",
    lede: "Every map is real \u2014 these are the submarkets where our transactions closed."
  })), /*#__PURE__*/React.createElement("div", {
    className: "r-grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '28px',
      marginTop: '56px'
    }
  }, SUBMARKETS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.key,
    className: "reveal3d tilt3d",
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      aspectRatio: '3 / 2.6',
      boxShadow: 'var(--shadow-overlay)',
      border: '1px solid var(--navy-700)',
      transitionDelay: i * 140 + 'ms',
      ['--mk']: s.accent
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: '../../assets/maps/' + s.key + '-dark.png',
    alt: s.name + ' map',
    className: "map-tint",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(12,22,28,0.15) 0%, transparent 26%, rgba(12,22,28,0.9) 80%, rgba(12,22,28,0.97) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(120% 80% at 50% 120%, color-mix(in srgb, ' + s.accent + ' 30%, transparent), transparent 60%)',
      mixBlendMode: 'screen'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, ' + s.accent + ', transparent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '24px 26px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '40px',
      lineHeight: 1,
      color: '#fff'
    }
  }, count(s.cities), /*#__PURE__*/React.createElement("span", {
    style: {
      color: s.accent
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      margin: '6px 0 14px'
    }
  }, "Deals on record"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '32px',
      height: '2px',
      background: s.accent,
      marginBottom: '14px'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '22px',
      color: '#fff'
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 12.5px var(--font-sans)',
      color: 'var(--text-inverse-secondary)',
      marginTop: '6px',
      letterSpacing: '0.04em'
    }
  }, s.line))))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      marginTop: '28px',
      font: '400 11px var(--font-sans)',
      color: 'var(--text-muted)',
      letterSpacing: '0.04em'
    }
  }, "Maps \xA9 OpenStreetMap contributors \xB7 \xA9 CARTO"));
}
Object.assign(window, {
  HeroMapBackdrop,
  MarketCoverage,
  PropertiesMap
});

// ---- Properties locator map: real LA map with a clickable pin per listing ----
const CITY_COORDS = {
  'Beverly Hills': [34.0696, -118.3963],
  'Inglewood': [33.9617, -118.3531],
  'North Hollywood': [34.1720, -118.3769],
  'Burbank': [34.1808, -118.3090],
  'Los Angeles': [34.0430, -118.2890],
  'Van Nuys': [34.1899, -118.4514],
  'Anaheim': [33.8366, -117.9143],
  'South Gate': [33.9547, -118.2120],
  'Culver City': [34.0211, -118.3965],
  'Venice': [33.9850, -118.4695],
  'Tarzana': [34.1734, -118.5550],
  'Sun Valley': [34.2178, -118.3705],
  'Valley Village': [34.1601, -118.3968],
  'El Monte': [34.0686, -118.0276],
  'Gardena': [33.8883, -118.3090],
  'Huntington Park': [33.9819, -118.2251],
  'Santa Ana': [33.7455, -117.8677],
  'Rialto': [34.1064, -117.3703]
};
function resolveCoords(meta) {
  for (const city in CITY_COORDS) {
    if (meta && meta.includes(city)) return CITY_COORDS[city];
  }
  return null;
}

// Approximate rooftop coordinates per listing address (for-sale set is exact-ish;
// others fall back to city centroid with jitter so no two pins stack).
const ADDR_COORDS = {
  '144 N Clark Drive': [34.0726, -118.3870],
  '4761 W Century Blvd': [33.9456, -118.3700],
  '5142 Lankershim Boulevard': [34.1668, -118.3690],
  '2221–2225 W Olive Avenue': [34.1690, -118.3372],
  '1627 Poinsettia Place': [34.0982, -118.3490],
  '6825 Kester Avenue': [34.1980, -118.4480],
  '330 Hillcrest Boulevard': [33.9620, -118.3530],
  '8625 Avalon Boulevard': [33.9610, -118.2654],
  '6543 Lankershim Boulevard': [34.1928, -118.3690],
  '2321 Filbert Street': [37.8120, -122.2840],
  '8621 Bellanca Avenue': [33.9576, -118.3792],
  '2501 Ball Road': [33.8170, -117.8920],
  '310 N La Brea Avenue': [33.9655, -118.3522],
  '6104 S. Wilton Place': [33.9840, -118.3110],
  '8212 S. Western Avenue': [33.9620, -118.3088]
};
function PropertiesMap({
  items,
  label
}) {
  const [view, setView] = React.useState('road'); // 'road' | 'sat'
  const mapRef = React.useRef(null);
  const elRef = React.useRef(null);
  const layersRef = React.useRef({});

  // resolve a coordinate for each listing (precise table → city centroid + jitter)
  const seen = {};
  const pts = items.map(l => {
    let c = ADDR_COORDS[l.title] || resolveCoords(l.meta);
    if (!c) return null;
    const key = c.join();
    const n = seen[key] || 0;
    seen[key] = n + 1;
    if (n) {
      const a = n * 1.2,
        r = 0.006 * Math.ceil(n / 2);
      c = [c[0] + Math.sin(a) * r, c[1] + Math.cos(a) * r];
    }
    return {
      l,
      lat: c[0],
      lng: c[1]
    };
  }).filter(Boolean);
  React.useEffect(() => {
    if (!window.L || !elRef.current) return;
    const L = window.L;
    // init once
    if (!mapRef.current) {
      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
        zoomControl: true
      }).setView([33.92, -118.1], 9);
      const road = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        attribution: '© OpenStreetMap © CARTO'
      });
      const sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Esri, Maxar, Earthstar Geographics'
      });
      const labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        pane: 'shadowPane'
      });
      road.addTo(map);
      layersRef.current = {
        road,
        sat,
        labels,
        markers: L.layerGroup().addTo(map)
      };
      mapRef.current = map;
    }
    const {
      markers
    } = layersRef.current;
    markers.clearLayers();
    const L2 = window.L;
    const bounds = [];
    pts.forEach(p => {
      const icon = L2.divIcon({
        className: 'hg-pin',
        html: '<span class="hg-pin-dot"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      const m = L2.marker([p.lat, p.lng], {
        icon,
        title: p.l.title
      }).addTo(markers);
      m.bindPopup('<strong>' + p.l.title + '</strong><br><span class="hg-pop-meta">' + (p.l.meta || '') + '</span><br><a class="hg-pop-link" href="#" onclick="window.HirthOpenListing(window.__pinLookup[\'' + p.l.title.replace(/'/g, "\\'") + '\']);return false;">View details →</a>', {
        closeButton: false
      });
      m.on('mouseover', function () {
        this.openPopup();
      });
      bounds.push([p.lat, p.lng]);
    });
    // build a lookup for popup click → open listing
    window.__pinLookup = window.__pinLookup || {};
    pts.forEach(p => {
      window.__pinLookup[p.l.title] = p.l;
    });
    // fit to LA-area pins (exclude far-flung like Oakland so LA stays framed)
    const la = bounds.filter(b => b[0] < 35 && b[0] > 33);
    if (la.length) mapRef.current.fitBounds(la, {
      padding: [40, 40],
      maxZoom: 11
    });
    setTimeout(() => mapRef.current && mapRef.current.invalidateSize(), 200);
  }, [items]);
  React.useEffect(() => {
    if (!mapRef.current || !layersRef.current.road) return;
    const {
      road,
      sat,
      labels,
      map
    } = layersRef.current;
    const m = mapRef.current;
    if (view === 'sat') {
      m.removeLayer(road);
      sat.addTo(m);
      labels.addTo(m);
    } else {
      m.removeLayer(sat);
      m.removeLayer(labels);
      road.addTo(m);
    }
  }, [view]);
  return /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      marginBottom: '48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "locator",
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-overlay)',
      aspectRatio: '21 / 9',
      background: 'var(--navy-950)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: elRef,
    className: "hg-map",
    style: {
      position: 'absolute',
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '20px',
      left: '22px',
      zIndex: 500,
      pointerEvents: 'none',
      background: 'linear-gradient(135deg, rgba(10,20,26,0.92), rgba(10,20,26,0.55))',
      padding: '14px 20px',
      borderRadius: 'var(--radius-sm)',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: 0
    }
  }, "On the Map"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '24px',
      color: '#fff',
      margin: '6px 0 0'
    }
  }, pts.length, " ", label, " Across LA")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '20px',
      right: '22px',
      zIndex: 500,
      display: 'flex',
      borderRadius: 'var(--radius-xs)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-card)'
    }
  }, [['road', 'Map'], ['sat', 'Satellite']].map(([v, lbl]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => setView(v),
    style: {
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      padding: '9px 16px',
      border: 'none',
      cursor: 'pointer',
      background: view === v ? 'var(--blue-500)' : 'rgba(10,20,26,0.9)',
      color: view === v ? '#fff' : 'var(--text-inverse-secondary)',
      transition: 'background var(--duration-fast)'
    }
  }, lbl)))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/MapSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pages.jsx
try { (() => {
// The Hirth Group website kit — Contact, Team, Services, Testimonials pages
const {
  SectionHeader: PgSectionHeader,
  Eyebrow: PgEyebrow,
  Button: PgButton,
  TextField: PgTextField,
  ContactRow: PgContactRow,
  TestimonialQuote: PgQuote
} = window.HirthGroupDesignSystem_c76dea;
function ContactPage() {
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const [form, setForm] = React.useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Selling a property',
    message: ''
  });
  const set = k => e => setForm(f => ({
    ...f,
    [k]: e.target.value
  }));

  // Web3Forms — emails every submission to info@hirthgroup.com. Replace the
  // access key below with the one Web3Forms emails you (see note in chat).
  const ACCESS_KEY = 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';
  const submit = async () => {
    setError('');
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please add your name and email.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'New inquiry from HirthGroup.com — ' + (form.interest || 'Contact'),
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          email: form.email,
          interest: form.interest,
          message: form.message
        })
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        setError('Something went wrong. Please call 310-300-2838 or email info@hirthgroup.com.');
      }
    } catch (e) {
      setError('Network error. Please call 310-300-2838 or email info@hirthgroup.com.');
    } finally {
      setSending(false);
    }
  };
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Contact"
  }, /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      padding: '76px var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Contact"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(PgSectionHeader, {
    inverse: true,
    eyebrow: "Contact Us",
    title: "Let\u2019s Talk About Your Property",
    lede: "Whether you\u2019re selling, buying, leasing, or planning a 1031 exchange \u2014 we usually reply the same day."
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container r-2col",
    style: {
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-10)',
      display: 'grid',
      gridTemplateColumns: '1fr 400px',
      gap: '72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-card)',
      padding: '40px'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '26px'
    }
  }, "Thank you."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-secondary)',
      marginTop: '12px'
    }
  }, "Your message was sent to our team \u2014 we\u2019ll be in touch shortly, usually the same day.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement(PgTextField, {
    label: "Full Name",
    placeholder: "Jane Doe",
    value: form.name,
    onChange: set('name')
  }), /*#__PURE__*/React.createElement(PgTextField, {
    label: "Phone",
    type: "tel",
    placeholder: "(310) 555-0100",
    value: form.phone,
    onChange: set('phone')
  }), /*#__PURE__*/React.createElement(PgTextField, {
    label: "Email",
    type: "email",
    placeholder: "jane@example.com",
    style: {
      gridColumn: '1 / -1'
    },
    value: form.email,
    onChange: set('email')
  }), /*#__PURE__*/React.createElement(PgTextField, {
    label: "I'm Interested In",
    options: ['Selling a property', 'Buying a property', 'Leasing', '1031 Exchange', 'Asset valuation', 'Requesting an OM (Offering Memorandum)'],
    style: {
      gridColumn: '1 / -1'
    },
    value: form.interest,
    onChange: set('interest')
  }), /*#__PURE__*/React.createElement(PgTextField, {
    label: "Message",
    multiline: true,
    placeholder: "Tell us about your property or goals\u2026",
    style: {
      gridColumn: '1 / -1'
    },
    value: form.message,
    onChange: set('message')
  }), error ? /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: '1 / -1',
      color: '#c0392b',
      fontSize: '14px',
      margin: 0
    }
  }, error) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PgButton, {
    variant: "primary",
    size: "lg",
    onClick: sending ? undefined : submit
  }, sending ? 'Sending…' : 'Send Message')))), /*#__PURE__*/React.createElement("aside", {
    className: "r-contact-aside",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      paddingTop: '8px'
    }
  }, /*#__PURE__*/React.createElement(PgEyebrow, null, "Get in Touch"), /*#__PURE__*/React.createElement(PgContactRow, {
    icon: "phone",
    label: "Tel",
    value: "310-300-2838",
    href: "tel:3103002838"
  }), /*#__PURE__*/React.createElement(PgContactRow, {
    icon: "mail",
    label: "Email",
    value: "info@hirthgroup.com",
    href: "mailto:info@hirthgroup.com"
  }), /*#__PURE__*/React.createElement(PgContactRow, {
    icon: "map-pin",
    label: "Office",
    value: "439 N. Canon Drive, Suite 300, Beverly Hills, CA 90210"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '24px',
      fontSize: '13px',
      color: 'var(--text-muted)',
      lineHeight: 1.7
    }
  }, "In Strategic Partnership with KW Commercial", /*#__PURE__*/React.createElement("br", null), "CA DRE 01428775"))));
}
function TeamPage({
  go
}) {
  const team = [{
    name: 'Daniel Hirth',
    role: 'Managing Director',
    photo: '../../assets/photos/daniel-hirth-portrait.png',
    accent: 'var(--blue-400)',
    page: 'daniel-hirth',
    bio: ['Born and raised in Los Angeles, Daniel was introduced to real estate at a very young age — riding alongside his father collecting rents, overseeing renovations, and managing commercial properties. After graduating from California State University, Northridge, he began his career at Marcus & Millichap in 2012, mastering the acquisition and disposition of retail, industrial, multifamily, office, and land assets.', 'With over 200 transactions totaling more than $520 million in closed sales, Daniel acts as a trusted advisor — strategically restructuring his clients’ portfolios so their equity works efficiently. He also mentors the next generation of professionals at The Hirth Group, building a team where each agent brings unique strengths to better serve clients.']
  }, {
    name: 'Alex Reyhan',
    role: 'Vice President',
    photo: '../../assets/photos/team-alex-reyhan.png',
    accent: 'var(--teal-400)',
    bio: ['Born and raised in Southern California, Alex Reyhan brings a deep understanding of the region’s dynamic real estate market. Since joining The Hirth Group in 2015, he has been instrumental in acquisitions, dispositions, and leasing across retail, shopping centers, industrial, mixed-use, office, and land — with a track record exceeding $500 million in closed transactions.', 'His marquee deals include the Abbot Kinney Portfolio ($29.3M), Hollywood & Western Petco ($30.4M), Main Street, Santa Ana ($18.6M), and Main Street, Venice ($8.9M). A UCLA history graduate, Alex pairs sharp deal structuring with a relationship-first approach, and is deeply involved in the Los Angeles Jewish community.']
  }, {
    name: 'Ethan Donel',
    role: 'Senior Associate',
    photo: '../../assets/photos/team-ethan-donel.png',
    accent: 'var(--gold-500)',
    bio: ['Ethan Donel is a Los Angeles native whose genuine interest in commercial real estate has fueled his career from a very young age. He joined The Hirth Group in 2019 as an Investment Associate, spearheading retail, mixed-use, office, industrial, land, and multifamily deals — specializing in dispositions, acquisitions, and leasing across the San Fernando Valley from Woodland Hills to Burbank.', 'With diligence, charisma, and the mentorship of Daniel Hirth and Alex Reyhan, Ethan quickly became a Senior Associate. He collaborates closely with clients to deliver professional market research and the deal information crucial to sound business decisions, consistently going above and beyond to provide timely, exceptional service.']
  }];
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "The Team"
  }, /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      padding: '76px var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(PgSectionHeader, {
    inverse: true,
    eyebrow: "About",
    title: "The Team",
    lede: "A boutique bench of specialists \u2014 each agent brings a distinct skillset to our clients\u2019 deals."
  }))), team.map((m, i) => {
    return /*#__PURE__*/React.createElement("section", {
      key: m.name,
      className: "team-row",
      style: {
        background: i % 2 ? 'var(--surface-inverse)' : 'transparent',
        borderTop: '1px solid var(--border-inverse)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container r-2col",
      style: {
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '56px',
        alignItems: 'center',
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-8)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "reveal-clip tilt3d",
      style: {
        order: 0,
        position: 'relative',
        maxWidth: '320px',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        border: '1px solid var(--border-inverse)',
        boxShadow: 'var(--shadow-overlay)',
        background: 'var(--navy-900)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: m.photo,
      alt: m.name,
      style: {
        width: '100%',
        display: 'block',
        aspectRatio: '1 / 1.06',
        objectFit: 'cover',
        objectPosition: 'center top'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "cinema-sweep",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, ' + m.accent + ', transparent)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "reveal-up",
      style: {
        order: 1,
        transitionDelay: '140ms'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--weight-medium)',
        fontSize: '12px',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: m.accent,
        margin: 0
      }
    }, m.role), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(34px, 4vw, 46px)',
        color: i % 2 ? '#fff' : 'var(--text-primary)',
        margin: '12px 0 0',
        lineHeight: 1.1
      }
    }, m.name), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '52px',
        height: '2px',
        background: m.accent,
        margin: '22px 0'
      }
    }), m.bio.map((para, j) => /*#__PURE__*/React.createElement("p", {
      key: j,
      style: {
        fontSize: 'var(--text-body-lg)',
        lineHeight: 'var(--leading-body)',
        color: i % 2 ? 'var(--text-inverse-secondary)' : 'var(--text-secondary)',
        margin: j ? '18px 0 0' : 0
      }
    }, para)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '30px',
        display: 'flex',
        gap: '14px',
        flexWrap: 'wrap'
      }
    }, m.page ? /*#__PURE__*/React.createElement(PgButton, {
      variant: i % 2 ? 'outline-inverse' : 'primary',
      onClick: () => go(m.page)
    }, "Read Full Bio") : null, /*#__PURE__*/React.createElement(PgButton, {
      variant: i % 2 ? 'outline-inverse' : 'outline',
      onClick: () => go('contact')
    }, "Get in Touch")))));
  }));
}
function ServicesPage({
  go
}) {
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Services"
  }, /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      padding: '76px var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Advisory"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(PgSectionHeader, {
    inverse: true,
    eyebrow: "What We Do",
    title: "Sales, Leasing & 1031 Exchange",
    lede: "One team across the whole deal \u2014 acquisition & disposition, landlord leasing, and tax-deferred exchange advisory."
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container",
    style: {
      paddingTop: 'var(--space-9)',
      paddingBottom: 'var(--space-10)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-9)'
    }
  }, SERVICES.map((s, i) => {
    const flip = i % 2 === 1;
    return /*#__PURE__*/React.createElement("div", {
      key: s.title,
      className: "r-svc-row r-2col",
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "reveal-up tilt3d",
      style: {
        order: 0,
        position: 'relative',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-overlay)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: s.image,
      alt: s.title,
      style: {
        width: '100%',
        height: '440px',
        objectFit: 'cover',
        display: 'block'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 40%, rgba(10,20,26,0.85) 100%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "svc-badge",
      style: {
        background: s.accent,
        position: 'absolute',
        left: '24px',
        top: '24px',
        width: '50px',
        height: '50px',
        borderRadius: 'var(--radius-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 22px rgba(0,0,0,0.35)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": s.icon,
      style: {
        width: '22px',
        height: '22px',
        color: '#0a141a'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: '22px',
        bottom: '14px',
        fontFamily: 'var(--font-display)',
        fontSize: '92px',
        lineHeight: 1,
        color: '#fff',
        opacity: 0.22
      }
    }, "0", i + 1)), /*#__PURE__*/React.createElement("div", {
      className: "reveal-up",
      style: {
        order: 1,
        transitionDelay: '110ms'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--weight-medium) 12px var(--font-sans)',
        letterSpacing: 'var(--tracking-eyebrow)',
        textTransform: 'uppercase',
        color: s.accent,
        margin: 0
      }
    }, "Service 0", i + 1), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(32px, 3.6vw, 44px)',
        color: 'var(--text-primary)',
        margin: '12px 0 0',
        lineHeight: 1.1
      }
    }, s.title), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '52px',
        height: '2px',
        background: s.accent,
        margin: '22px 0'
      }
    }), s.body.map((para, j) => /*#__PURE__*/React.createElement("p", {
      key: j,
      style: {
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-body-lg)',
        lineHeight: 'var(--leading-body)',
        margin: j ? '18px 0 0' : 0
      }
    }, para)), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: '26px 0 0',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px 22px'
      }
    }, s.points.map(pt => /*#__PURE__*/React.createElement("li", {
      key: pt,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        fontSize: '13.5px',
        fontWeight: 'var(--weight-medium)',
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
    }), pt))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '32px'
      }
    }, /*#__PURE__*/React.createElement(PgButton, {
      variant: "primary",
      onClick: () => go('contact')
    }, "Start a Conversation"))));
  })));
}
function TestimonialsPage() {
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "Testimonials"
  }, /*#__PURE__*/React.createElement("section", {
    className: "page-head texture-map watermark-logo",
    style: {
      padding: '76px var(--container-pad)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ghost-word",
    "aria-hidden": "true"
  }, "Clients"), /*#__PURE__*/React.createElement("div", {
    className: "reveal-up",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(PgSectionHeader, {
    inverse: true,
    eyebrow: "About",
    title: "Testimonials",
    lede: "In our clients\u2019 words."
  }))), /*#__PURE__*/React.createElement("section", {
    className: "container reveal-up",
    style: {
      paddingTop: 'var(--space-9)',
      paddingBottom: 'var(--space-10)',
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(PgQuote, {
    inverse: false,
    quote: TESTIMONIAL_FULL,
    attribution: "Susan Kassabian"
  })));
}
Object.assign(window, {
  ContactPage,
  TeamPage,
  ServicesPage,
  TestimonialsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProfilePage.jsx
try { (() => {
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
    src: "../../assets/photos/daniel-hirth-portrait.png",
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
    src: "../../assets/logo-hirth-group.png",
    alt: "",
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
  }, "Managing Director \xB7 The Hirth Group"))), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProfilePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PropertiesPage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// The Hirth Group website kit — Properties listing page
const {
  SectionHeader: PropsSectionHeader,
  PropertyCard: PropsPropertyCard
} = window.HirthGroupDesignSystem_c76dea;
const PROP_TABS = [['for-sale', 'For Sale'], ['for-lease', 'For Lease'], ['closed', 'Closed'], ['leased', 'Leased']];
function PropertiesPage({
  status = 'for-sale',
  go
}) {
  const label = PROP_TABS.find(([k]) => k === status)[1];
  const countFor = k => LISTINGS.filter(l => l.status === k || k === 'for-sale' && l.status === 'in-escrow').length;
  const items = LISTINGS.filter(l => l.status === status || status === 'for-sale' && l.status === 'in-escrow');
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": 'Properties — ' + label
  }, /*#__PURE__*/React.createElement("section", {
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
  }, lbl, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: key === status ? 'var(--blue-400)' : 'var(--text-muted)'
    }
  }, countFor(key))))))), /*#__PURE__*/React.createElement("section", {
    className: "container",
    style: {
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-10)',
      minHeight: '420px'
    }
  }, items.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.PropertiesMap, {
    items: items,
    label: label
  }), /*#__PURE__*/React.createElement("div", {
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
  }, "The ", label.toLowerCase(), " archive isn\u2019t included in this kit \u2014 populate it from hirthgroup.com/", status, "."))));
}
window.PropertiesPage = PropertiesPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PropertiesPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.jsx
try { (() => {
// The Hirth Group website kit — shared data
// Full property inventory pulled from hirthgroup.com (June 2026):
// /for-sale (15), /for-lease (5), /closed (~55). Prices/specs are not published
// in the live feeds — intentionally omitted; do not invent figures.
// Listings without a copied photo render the branded navy placeholder.
const P = '../../assets/photos/';
const S = '../../assets/photos/sale/';
const LSE = '../../assets/photos/lease/';
const LEA = '../../assets/photos/leased/';
const CLO = '../../assets/photos/closed/';
const LISTINGS = [
// ---- FOR SALE ----
{
  title: '11771 Washington Blvd',
  meta: 'Whittier, CA 90606',
  status: 'for-sale',
  image: S + '11771-washington.jpg',
  price: '$2,250,000',
  headline: 'Corner Lot Retail Building',
  specs: ['±984 SF Building', '±15,397 SF Lot', 'LCC3BE* Zoning', '10.91% Cap', '12.16% Pro Forma Cap', 'Corner Lot'],
  description: ['11771 Washington Blvd presents a rare opportunity to acquire a high-yield commercial investment positioned on a large infill parcel along one of Southeast Los Angeles County\u2019s primary commercial corridors. Located in the City of Whittier, the property consists of approximately 984 square feet of existing commercial improvements situated on an expansive \u00b115,397 square-foot lot with flexible LCC3BE* zoning, offering exceptional long-term functionality, owner-user utility, and redevelopment potential.', 'The asset is currently occupied under a gross lease structure generating strong in-place cash flow, while also benefiting from built-in contractual rent increases that ownership has not yet fully implemented, creating immediate upside for a new investor. The property is offered at an attractive 10.91% current capitalization rate with projected upside to approximately 12.16% pro forma capitalization rate through the implementation of contractual lease escalations alone.', 'Strategically positioned along Washington Boulevard, the property benefits from excellent visibility, strong traffic exposure, and immediate accessibility to Interstate 605, Interstate 5, and State Route 60. The surrounding trade area is supported by a dense mix of residential neighborhoods, industrial operators, automotive businesses, retail users, and commercial service providers that continue to drive strong demand throughout the Southeast Los Angeles County market.', 'The combination of durable in-place income, contractual revenue growth, flexible zoning, and intrinsic land value positions 11771 Washington Boulevard as a uniquely attractive opportunity for investors, owner-users, and redevelopment-oriented buyers alike.']
}, {
  title: '4761 W Century Blvd',
  meta: 'Inglewood, CA 90304',
  status: 'for-sale',
  image: S + '4761-century.jpg',
  price: '$2,500,000',
  headline: 'Automotive Property',
  tagline: 'Owner-User or Investor — Flexible Automotive & Commercial Zoning on Century Blvd',
  specs: ['5,010 SF Building', '10,032 SF Lot', '~15-Car Gated Parking', 'Rear Roll-Up Door'],
  description: ['Alex Reyhan and Daniel Hirth of The Hirth Group have been exclusively selected to market for sale 4761 W Century Blvd, Inglewood, CA 90304 — a 5,010 SF automotive property situated on 10,032 SF of land. The property is currently occupied by a rental car company and was previously utilized for automotive-related uses, with zoning that allows a broad range of commercial operations, including light automotive services such as glass tinting, audio and electronics installation, security system installation, and similar uses. The site features rear alley access, secured gated parking for approximately 15 vehicles, dedicated office space, and one ground-level roll-up door at the rear.', '4761 W Century Blvd is strategically positioned in the southwestern portion of Inglewood along Century Boulevard, one of the city’s primary and most heavily traveled corridors. Average traffic counts exceed 43,000 vehicles per day, with volumes increasing following the development of SoFi Stadium and the opening of the Intuit Dome. The property benefits from strong surrounding demographics, with over 264,000 residents within a three-mile radius and a median household income exceeding $72,000, anchored by national tenants including Taco Bell, Starbucks, Dollar Tree, El Pollo Loco, Panda Express, McDonald’s, and Carl’s Jr.']
}, {
  title: '5142 Lankershim Boulevard',
  meta: 'North Hollywood, CA 91601',
  status: 'for-sale',
  image: S + '5142-lankershim.jpg',
  price: '$2,150,000',
  headline: 'Multi-tenant Retail Building',
  tagline: 'Trophy North Hollywood Arts District Asset — Owner-User Ready with SBA Financing as Little as 10% Down',
  specs: ['±4,295 SF Building', '±5,823 SF Lot', 'C4 Zoned', 'Built 1945 / Reno 2016', '6 On-Site Spaces'],
  description: ['The Hirth Group, comprised of Ethan Donel, Alex Reyhan, and Daniel Hirth, has been exclusively retained by ownership to facilitate the sale of 5142 Lankershim Boulevard, a trophy asset located in the heart of the North Hollywood Arts District.', 'The subject property consists of a ±4,295 square foot building situated on a ±5,823 square foot C4-zoned lot. Originally constructed in 1945 and substantially renovated in 2016, the property is partially occupied, with Cloud 9 Nails leasing ±695 square feet on a month-to-month basis, while the remaining ±3,600 square feet is delivered vacant, offering immediate occupancy and flexibility for an owner-user.', 'The property features strong frontage along Lankershim Boulevard with expansive storefront exposure and prominent signage opportunities. The vacant portion offers an open, highly adaptable layout with an 11’3” clear height, while six (6) on-site parking spaces further enhance usability. Recent capital improvements include new HVAC units, upgraded plumbing, and updated electrical systems.']
}, {
  title: '2221–2225 W Olive Avenue',
  meta: 'Burbank, CA 91506',
  status: 'for-sale',
  image: P + 'listing-olive-ave.jpg',
  price: '$4,500,000',
  headline: 'Mixed-Use Opportunity | Retail, Office & Residential Income',
  tagline: 'Fully Stabilized Income | 18 Total Units Across Retail, Office, and Residential Components',
  specs: ['±7,478 SF Building', '±10,100 SF Land', '11 Office / 5 Retail / 2 Apt', '6.20% CAP', '7.27% Pro Forma'],
  description: ['The Hirth Group’s team, comprised of Ethan Donel, Alex Reyhan, and Daniel Hirth, has been exclusively retained by ownership to present 2221–2225 W. Olive Avenue, a fully occupied multi-tenant mixed-use investment opportunity featuring retail, office, and residential units in the heart of Burbank, California.', 'Situated on two contiguous parcels totaling ±10,100 SF of land, the property encompasses ±7,478 SF of building with eleven (11) office suites, five (5) retail storefronts, and two (2) apartment units. All commercial tenants operate on NNN leases, providing investors with a diversified and stable income stream. The asset offers significant upside potential through rent adjustments and tenant repositioning, with a projected pro forma yield of 7.27%. In addition, the property’s strong current CAP rate of 6.20% offers an attractive in-place return rarely found in the Burbank market.', 'Ideally positioned along Olive Avenue just minutes from the 134 Ventura Freeway, the property sits at the center of the “Media Capital of the World,” anchored by Disney, Warner Bros., and NBC Universal — with continued investment including the Warner Bros. Ranch Lot expansion and the $1.1 billion Burbank Airport modernization.']
}, {
  title: '1627 Poinsettia Place',
  meta: 'Los Angeles, CA 90046',
  status: 'for-sale',
  image: S + '1627-poinsettia.jpg',
  price: '$5,100,000',
  headline: '20-Unit Apartment Building',
  tagline: 'Premier Hollywood Infill Location',
  specs: ['20 Units', '±14,817 SF', '8,436 SF Lot', 'Built 1965 / LAR3', '24 Subterranean Spaces', '37% Upside'],
  description: ['Elijah Suval and Daniel Hirth of The Hirth Group have been exclusively selected to market for sale 1627 N Poinsettia Pl, Los Angeles, CA 90046 — a 20-unit apartment building consisting of approximately 14,817 SF of building on an estimated 8,436 SF lot. Built in 1965 and zoned LAR3, the property features a newly installed elevator and 24 subterranean parking spaces, offering security and convenience. With over 37% rental upside, this asset presents a compelling value-add opportunity through strategic renovations and unit turnovers.', '1627 N Poinsettia Pl is positioned in the heart of Hollywood, surrounded by dense residential neighborhoods and a strong rental base driven by the entertainment, technology, and creative industries. The area offers walkable access to Sunset Boulevard, Hollywood & Highland, and Runyon Canyon, along with close proximity to major employment hubs including Netflix, Sunset Gower Studios, and ViacomCBS.', '*Buyer to perform own due diligence and verify all information.']
}, {
  title: '6825 Kester Avenue',
  meta: 'Van Nuys, CA 91405',
  status: 'for-sale',
  image: S + '6825-kester.jpg',
  price: '$1,550,000',
  headline: '28-Unit Development Opportunity',
  tagline: '28 Buildable Units | 3 Designated for Extremely Low Income | TOC Tier 3',
  specs: ['28 Buildable Units', '<$56K / Buildable Unit', 'C1.5-1VL TOC Tier 3', '20,514 SF Buildable', 'Opportunity Zone'],
  description: ['Ethan Donel, Alex Reyhan, and Daniel Hirth are pleased to present 6825 Kester Avenue, an exceptional shovel-ready multifamily development opportunity located in the heart of Van Nuys, California. The property is strategically positioned just off the corner of Vanowen Street and North Kester Avenue, within one of the most active and diverse submarkets in the San Fernando Valley.', 'With RTI approved plans in place, a developer can immediately break ground on a 28-unit multifamily building priced at under $56,000 per buildable unit. The design includes twenty-three (23) primary residential units and five (5) fitness rooms with existing plumbing and infrastructure that can be converted into ADUs to reach the full 28-unit potential.', 'The property is zoned C1.5-1VL TOC Tier 3 with a FAR of 2.34:1, permitting 20,514 square feet of buildable area, and is located within an opportunity zone allowing developers to receive federal tax incentives. With the upcoming Metro Light Rail extension along Van Nuys Boulevard, the neighborhood is poised for long-term appreciation.']
}, {
  title: '330 Hillcrest Boulevard',
  meta: 'Inglewood, CA 90301',
  status: 'for-sale',
  image: S + '330-hillcrest.jpg',
  price: '$1,750,000',
  headline: 'Multi-Tenant Medical/Office Building',
  tagline: 'Well-Positioned Medical/Office Asset in Inglewood’s Explosive Growth Corridor',
  specs: ['5,500 SF Building', '11,550 SF Lot', '2 Units', 'Built 1955 / INC1', 'On-Site Parking'],
  description: ['Elijah Suval and Daniel Hirth of The Hirth Group have been exclusively selected to market for sale 330 E Hillcrest Blvd, Inglewood, CA 90301 — a multi-tenant medical/office building consisting of 5,500 SF of building on an 11,550 SF lot. The property is configured with two units, one measuring 3,500 SF and leased to a long-standing dental practice, and the other totaling 2,000 SF and currently vacant, offering flexibility for an owner-user or new tenant. Built in 1955 and zoned INC1, the property provides ample on-site parking in the rear along with additional street parking.', '330 E Hillcrest Blvd sits at the epicenter of Inglewood’s explosive growth corridor, just south of West Manchester Blvd and east of South Market Street. The property is surrounded by hundreds of brand-new luxury apartments, with more projects breaking ground nearby. Immediately adjacent is a major mixed-use development featuring 65 luxury residential units and ground-floor retail.', 'Positioned minutes from SoFi Stadium, the Intuit Dome, The Kia Forum, and Hollywood Park, this location captures the momentum of one of Los Angeles’ fastest-growing submarkets. *Buyer to perform own due diligence and verify all information.']
}, {
  title: '8625 Avalon Boulevard',
  meta: 'Los Angeles, CA 90003',
  status: 'for-sale',
  image: S + '8625-avalon.jpg',
  price: '$3,095,000',
  headline: 'Industrial Building',
  tagline: 'Two-Building Configuration: ±14,880 SF across two freestanding industrial structures with flexible layouts and functional design.',
  specs: ['±14,880 SF', '25,218 SF Lot', 'Two Freestanding Buildings', 'LAM1 Zoned', 'Multiple Roll-Up Doors'],
  description: ['8625 Avalon Boulevard presents an exceptional opportunity to acquire a versatile light-industrial property in the heart of South Los Angeles, combining immediate in-place income with significant value-add potential. The property consists of two freestanding concrete-tilt-up buildings totaling approximately 14,880 square feet on a 25,218 square-foot lot, zoned LAM1 — ideal for manufacturing, warehousing, or creative industrial uses.', 'With one space currently occupied by a stable tenant and the other delivered vacant, this asset provides flexibility for a wide range of investor or owner-user strategies. The buildings feature multiple roll-up doors, a secure gated yard, ample parking, and functional layouts suited for modern industrial users.', 'Positioned along Avalon Boulevard just north of Manchester Avenue, the property benefits from excellent frontage and accessibility, with immediate access to the I-110, I-105, and I-10 freeways — offering fast connectivity to Downtown Los Angeles, LAX, and the Ports of Los Angeles and Long Beach.']
}, {
  title: '6543 Lankershim Boulevard',
  meta: 'North Hollywood, CA 91606',
  status: 'for-sale',
  image: S + '6543-lankershim.jpg',
  price: '$1,800,000',
  headline: 'Preschool/Daycare Center',
  tagline: 'Fantastic Owner-User Opportunity | SBA Financing with as Little as 10% Down',
  specs: ['±3,103 SF Building', '±9,380 SF Lot', 'LAC2 Zoned', '3 Classrooms', 'Playground + Kitchen'],
  description: ['The Hirth Group’s team, consisting of Ethan Donel, Alex Reyhan, and Daniel Hirth, has been exclusively retained by ownership to facilitate the sale of 6543 Lankershim Boulevard, North Hollywood, CA 91606. This ±3,103 SF educational facility is situated on an estimated ±9,380 SF lot zoned LAC2, offering excellent frontage and visibility along Lankershim Boulevard with prominent signage, a secure front entrance, and convenient alley access at the rear. The property features three (3) large classrooms, one (1) administrative office, three (3) bathrooms, a spacious reception area, and a fully equipped kitchen, plus a central playground and open activity area.', 'With the building currently featuring a month-to-month tenant, 6543 Lankershim Boulevard presents an excellent opportunity for an owner/user to capitalize on the strong demand for educational facilities. For an owner/user taking advantage of SBA financing with as little as 10% down, this is an ideal chance to own prime real estate in a highly desirable pocket of the San Fernando Valley.', 'Note: Per title, building is ±3,088 square feet. Buyers advised to independently verify all information, measurements, and permitted uses with the City of Los Angeles.']
}, {
  title: '2321 Filbert Street',
  meta: 'Oakland, CA 94607',
  status: 'for-sale',
  image: P + 'listing-2321-filbert.jpg',
  price: '$4,650,000',
  headline: 'Fully Built Commercial Kitchen',
  tagline: 'Attractive Yield: 7.57% in-place year 1 cap rate with scheduled growth to 7.70% and a blended ~8.05% return over the remaining lease.',
  specs: ['Turnkey Chef Kitchen', 'Leased to Always Fishing Inc.', '7.57% Year 1 Cap', '~8.05% Blended Return'],
  description: ['2321 Filbert Street represents a rare investment opportunity: a fully improved, turnkey chef\u2019s kitchen and catering production facility in the heart of Oakland. Leased to Always Fishing Inc., a seasoned operator with a strong foothold in the culinary and catering sector, the property offers stable cash flow, a high replacement-cost build-out, and long-term market relevance.', 'The existing lease provides an attractive 7.57% year 1 cap rate, with scheduled rent increases elevating the return to 7.70% in 2026. Averaged across the remaining term, investors benefit from a blended return of ~8.05% \u2014 a yield rarely available in today\u2019s Bay Area market for stabilized assets.', 'Note: Buyers are advised to independently verify all information, measurements, and permitted uses with the City of Oakland.']
}, {
  title: '8621 Bellanca Avenue',
  meta: 'Los Angeles, CA 90045',
  status: 'for-sale',
  image: S + '8621-bellanca.jpg',
  price: '$4,350,000',
  headline: 'Commercial-Flex Building',
  tagline: 'Freestanding 11,798 SF Commercial-Flex Building on a Large ±20,981 SF Lot',
  specs: ['11,798 SF Building', '±20,981 SF Lot', 'Built 1961 / LAMR1', '27-Car Gated Parking', 'Verizon Cell Tower Lease'],
  description: ['8621 Bellanca Avenue, Los Angeles, CA 90045 is a freestanding commercial-flex building with 11,798 SF on 20,981 SF of land. Built in 1961 and zoned LAMR1, it is in excellent condition with major upgrades, offering strong potential for office, creative office, commercial, or flex uses. Perfect for owner-users needing customizable space or investors seeking value-add opportunities, it provides ample room for reconfiguration. The subject property contains two points of ingress and egress as well as gated parking for 27 vehicles. Upgrades include new electrical wiring in December 2022 with mini-split provisions, a 2019 roof, 2023 windows, floors, ceilings, and lighting, plus wrought-iron fencing from 2019–2023.', '8621 Bellanca Avenue is strategically located in the heart of Westchester, adjacent to the booming LAX and Playa Vista submarkets. This dynamic location places the property within minutes of Los Angeles International Airport, the 405 and 105 freeways, and the Metro K Line. The area is surrounded by top-tier amenities including The Campus at Playa Vista, Runway Playa Vista, and Silicon Beach tech giants like Google, YouTube, and Amazon Studios.', '*A Verizon cell tower is located on the south side of the property. The lease agreement extends until November 30, 2029, with current monthly payments of $7,020, subject to 5% annual increases. Verizon is presently in its second option period and holds two additional 5-year renewal options.']
}, {
  title: '2501 Ball Road',
  meta: 'Anaheim, CA 92806',
  status: 'for-sale',
  image: S + '2501-ball.jpg',
  price: '$8,894,000',
  headline: '7-Eleven',
  tagline: 'Premier Anaheim Location | Direct Access from the 57 Freeway on E Ball Rd',
  specs: ['Brand-New 7-Eleven', '15-Yr Absolute NNN', '±35,283 SF Lot', '4.25% CAP', '7.5% Rent Increases'],
  description: ['We are pleased to present an exceptional opportunity to acquire a brand-new 7-Eleven in the heart of Anaheim, CA. This newly constructed retail asset is secured by a 15-year absolute NNN lease with three (3) five-year extension options and built-in 7.5% rent increases every five years — offering investors long-term stability, zero landlord responsibilities, and consistent income growth.', 'Strategically located along the highly trafficked Ball Road corridor near the 57 Freeway, the property sits on a ±35,283 SF lot and benefits from excellent visibility and accessibility in a premier retail trade area. This trophy location is surrounded by national tenants, dense residential neighborhoods, and strong daytime traffic, ensuring long-term tenant success and high consumer demand.', 'Priced at $8,894,000, the offering provides a 4.25% CAP rate on current income, making it an ideal fit for investors seeking passive income backed by an institutional-quality tenant and irreplaceable real estate. Note: Buyers are advised to independently verify all information, measurements, and permitted uses with the City of Anaheim.']
}, {
  title: '310 N La Brea Avenue',
  meta: 'Inglewood, CA 90302',
  status: 'for-sale',
  image: S + '310-la-brea.jpg',
  price: '$1,050,000',
  headline: 'Auto Repair Property',
  tagline: 'Rare Auto-Repair Property with Four (4) Auto Bays | 3-Phase Electrical with 400 Amps',
  specs: ['2,973 SF Building', '4,787 SF Lot', '4 Auto Bays', '400A 3-Phase Power', '~6-Car Parking'],
  description: ['Elijah Suval and Daniel Hirth of The Hirth Group have been exclusively selected to market for sale — 310 N La Brea Ave, Inglewood, CA 90302. This prime auto repair property boasts 2,973 SF of building on an estimated 4,787 SF lot. The subject property has four (4) auto bays and parking for approximately six (6) vehicles. There is 400 amps of 3-Phase power, providing ample capacity for lifts, air compressors, welders, and other high-powered auto repair machinery. All in all, this is an amazing opportunity for an owner/user or savvy auto repair investor looking for prime retail space in Inglewood’s ever-evolving market.', 'Ideally situated just north of Florence Avenue and south of Hyde Park Boulevard, this property sits in the heart of Inglewood, surrounded by a wave of new developments and thriving businesses. Nearby residential projects include The Astra and DeMilo apartment complexes, while major venues such as SoFi Stadium, Intuit Dome, The Forum, and Hollywood Park Casino further enhance the area’s appeal. The property also benefits from strong national retail presence, with Target, Walgreens, Superior Grocers, AutoZone, Little Caesars, and CVS all located nearby.', '*Buyer to verify all information.']
}, {
  title: '6104 S. Wilton Place',
  meta: 'Los Angeles, CA 90047',
  status: 'for-sale',
  image: S + '6104-wilton.jpg',
  price: '$419,000',
  headline: 'Development Opportunity',
  tagline: 'Perfect Land Banking Opportunity or Development Opportunity',
  specs: ['4,137 SF Lot', 'R1 Zoned', '~40% Delivered Vacant', '“Van Ness” Neighborhood'],
  description: ['6104 S. Wilton Place, Los Angeles, CA 90047, is a rare 4,137 SF R1-zoned lot nestled in the quiet “Van Ness” neighborhood of South LA. This property offers tremendous potential for developers and investors alike! Approximately 40% of the parcel, currently used by a neighboring tenant, will be delivered vacant at the close of escrow, providing an adaptable space for future use. Situated just off W. Slauson Ave. and S. Western Ave., enjoy seamless access to major thoroughfares, public transportation, and key employment hubs.', 'Surrounded by single-family homes and emerging developments, this property is in the path of progress, making it a prime investment for appreciation. With an increasing demand for housing and a rapidly evolving market, this lot is perfect for a developer or savvy investor looking to capitalize on future growth.', '*Buyer to verify all information. The backyard also contains an electrical pole.']
}, {
  title: '8212 S. Western Avenue',
  meta: 'Los Angeles, CA 90047',
  status: 'in-escrow',
  image: S + '8212-western.jpg',
  price: '$3,500,000',
  headline: 'A 89-Unit Development Opportunity',
  tagline: 'Attractive Price Per Buildable Unit: $39,326 / Buildable Unit',
  specs: ['23,434 SF Land', 'C2-1VL-CPIO', '58–89 Units', 'TOC Tier 1 / FAR 2.75:1', '~64,444 SF Buildable'],
  description: ['8212 S Western Avenue is located on the Northeast corner of W 83rd Street and S Western Avenue. The subject property boasts roughly 23,434 SF of land zoned C2-1VL-CPIO on a hard corner. 8212 S Western Avenue allows a developer the opportunity to build 58 units by right or 89 units exercising the TOC Tier 1 incentives, which include a 50% density bonus and an FAR increase of 2.75:1, totaling approximately 64,444 SF of buildable SF with only 8 units being designated to extremely low income, for less than $40,000 per buildable unit.', '8212 S Western Avenue is just blocks away from the well-known intersection of Manchester Avenue and S Western Ave. The submarket is gentrifying rapidly, recognized by the national tenants surrounding the subject property, such as Ralphs, O’Reilly Auto Parts, WSS Shoe Store, Taco Bell, Jiffy Lube, McDonald’s, KFC, Chase Bank, Domino’s Pizza, Smart & Final, and Wells Fargo, to name a few.', 'Note: Buyer to perform their own due diligence and verify all information.']
},
// ---- FOR LEASE ---- (photos cropped from hirthgroup.com/for-lease grid, in listed order)
{
  title: '3618 Tweedy Blvd',
  meta: 'South Gate, CA · 900 SF Retail',
  status: 'for-lease',
  image: LSE + '3618-tweedy.jpg',
  flyer: '../../assets/flyers/3618-tweedy.pdf'
}, {
  title: '2001 Hawkins Circle',
  meta: 'Los Angeles, CA 90001 · Industrial',
  status: 'for-lease',
  image: LSE + '2001-hawkins.jpg',
  flyer: '../../assets/flyers/2001-hawkins.pdf'
}, {
  title: '3311 Motor Avenue',
  meta: 'Los Angeles, CA 90034 · Retail',
  status: 'for-lease',
  image: LSE + '3311-motor.jpg',
  flyer: '../../assets/flyers/3311-motor.pdf'
}, {
  title: '727 La Brea Avenue',
  meta: 'Los Angeles, CA 90028 · Retail / Office',
  status: 'for-lease',
  image: LSE + '727-labrea.jpg',
  flyer: '../../assets/flyers/727-labrea.pdf'
}, {
  title: '1058 Gardena Boulevard',
  meta: 'Gardena, CA 90247 · Retail',
  status: 'for-lease',
  image: LSE + '1058-gardena.jpg',
  flyer: '../../assets/flyers/1058-gardena.pdf'
},
// ---- LEASED ---- (photos cropped from hirthgroup.com/leased gallery)
{
  title: 'Commercial Building',
  meta: 'Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l01.jpg'
}, {
  title: 'Emerald City Plaza',
  meta: 'Multi-Tenant Retail · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l02.jpg'
}, {
  title: 'Gardena Boulevard',
  meta: 'Retail / Office · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l03.jpg'
}, {
  title: '401 — Industrial Building',
  meta: 'Industrial · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l04.jpg'
}, {
  title: 'Retail Storefront',
  meta: 'Retail · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l05.jpg'
}, {
  title: 'Mixed-Use Building',
  meta: 'Mixed-Use · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l06.jpg'
}, {
  title: 'Retail Storefront II',
  meta: 'Retail · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l07.jpg'
}, {
  title: 'Boutique Retail',
  meta: 'Retail · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l08.jpg'
}, {
  title: 'Hollywood Retail',
  meta: 'Retail · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l09.jpg'
}, {
  title: 'Commercial Building II',
  meta: 'Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l10.jpg'
}, {
  title: 'Industrial Property',
  meta: 'Industrial · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l11.jpg'
}, {
  title: 'Industrial Property II',
  meta: 'Industrial · Leased by The Hirth Group',
  status: 'leased',
  image: LEA + 'l12.jpg'
},
// ---- CLOSED ----
{
  title: '144 N Clark Drive',
  meta: 'Beverly Hills, CA 90211',
  status: 'closed',
  image: S + '144-n-clark.jpg',
  headline: 'Eight Unit Apartment Building',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 144 N. Clark Drive, a fully repositioned 8-unit multifamily asset in the heart of Beverly Hills. Situated on a quiet, tree-lined street moments from Beverly Drive, Wilshire Boulevard, and Rodeo Drive, the property traded in one of Los Angeles’ most desirable residential enclaves.', 'Through a competitive marketing campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full repositioned value.']
}, {
  title: '2525 E Ball Road',
  meta: 'Anaheim, CA 92806',
  status: 'closed',
  image: CLO + 'n02.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 2525 E Ball Road, a commercial real estate asset located in Anaheim. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '1329 2nd Avenue',
  meta: 'Los Angeles, CA 90019',
  status: 'closed',
  image: CLO + 'n03.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 1329 2nd Avenue, a commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '1101 Saviers Road',
  meta: 'Oxnard, CA 93033',
  status: 'closed',
  image: CLO + 'n04.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 1101 Saviers Road, a commercial real estate asset located in Oxnard. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '3015 Durfee Avenue',
  meta: 'El Monte, CA 91732',
  status: 'closed',
  image: CLO + 'n05.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 3015 Durfee Avenue, a commercial property located in El Monte. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '2226 Sepulveda Boulevard',
  meta: 'Los Angeles, CA 90064',
  status: 'closed',
  image: CLO + 'n06.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 2226 Sepulveda Boulevard, a commercial real estate asset located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '1217–1223 Centinela Avenue',
  meta: 'Inglewood, CA',
  status: 'closed',
  image: CLO + 'n07.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 1217–1223 Centinela Avenue, a multi-tenant commercial property located in Inglewood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: 'Chipotle — 2929 Berry Street',
  meta: 'Fort Worth, TX',
  status: 'closed',
  image: CLO + 'n08.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of Chipotle, a single-tenant net-leased retail asset located in Fort Worth. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '7569 Woodman Place',
  meta: 'Van Nuys, CA 91405',
  status: 'closed',
  image: CLO + 'n09.jpg',
  price: '$2,550,000',
  headline: 'Freestanding Metal Building',
  tagline: 'The Hirth Group represented both the seller and the buyer in this transaction.',
  saleHighlights: ['Closed at Full List Price | Attracted Strong Buyer Interest in Challenging Market', 'Hands-On Throughout Escrow | Seamless SBA Loan Execution', 'Last-Minute Insurance Hurdles Resolved | Lot Resurfaced & Safety Upgrades Completed', '±7,192 SF Building on ±19,510 SF LAMR2-Zoned Corner Lot', 'Seller Expanding to Atlanta Facility | Buyer Establishing High-End Recycling Center', 'The Hirth Group Represented Both Sellers and Buyer'],
  description: ['Ethan Donel, Alex Reyhan, and Daniel Hirth of The Hirth Group are proud to announce the successful closing of 7569 Woodman Place, Van Nuys, CA 91405. This freestanding ±7,192 SF metal building sits on a prominent ±19,510 SF corner lot, zoned LAMR2 — a designation with far more restrictions on allowable uses compared to broader industrial zoning such as M1 or M2. From the start, our team understood these limitations and strategically targeted a niche pool of qualified buyers who could thrive within the property’s permitted uses.', 'This was a transaction years in the making. The property went into escrow twice before, and in that time market conditions shifted dramatically — higher interest rates, reduced buyer activity, and a more selective lending environment. But our team never stopped pushing. We re-engaged the market multiple times, keeping the seller confident in our ability to deliver, and ultimately secured a full list price sale.', 'We identified and secured a motivated owner-user — a first-time commercial property purchaser — who obtained SBA financing. We guided him through every step of the process, from offer to close. In the final days before escrow, unexpected insurance requirements nearly delayed the deal, ranging from something as minor as adding a fire extinguisher to major safety and liability work such as completely resurfacing the lot. Our team moved quickly, coordinating multiple vendors to complete the work on time so escrow could close without delay.', 'The seller is expanding operations to a larger facility in Atlanta, while the buyer is establishing a high-end recycling center at the site — a true win-win outcome that reflects The Hirth Group’s relentless, hands-on approach to every transaction.']
}, {
  title: '2525 Ball Road',
  meta: 'Anaheim, CA 92806 · Express Car Wash',
  status: 'closed',
  image: CLO + '2525-ball.jpg',
  price: '$4,650,000',
  headline: 'Express Car Wash — 25-Year Absolute Ground Lease',
  specs: ['±38,370 SF Land', '±4,840 SF Improvements', '5.05% CAP', '25-Yr Absolute Ground Lease', 'All-Cash Close', 'Built 2025'],
  tagline: '5.05% CAP Rate | 25-Year Absolute Ground Lease · $4,650,000 All-Cash Closing · The Hirth Group represented both buyer and seller.',
  description: ['The property consists of a newly constructed, institutional-quality express car wash situated on approximately ±38,370 square feet of land with ±4,840 square feet of improvements. Strategically located at the signalized intersection of E Ball Road and Sunkist Street, just off the 57 Freeway, the asset benefits from exposure to approximately ±80,000 vehicles per day and exceptional regional accessibility.', 'Positioned within one of Orange County’s most dynamic trade areas, the property is located approximately 2.5 miles from Disneyland Resort, in close proximity to the Honda Center, and approximately 1.5 miles from Angel Stadium. The surrounding Platinum Triangle and Anaheim Resort District continue to experience significant public and private investment, reinforcing long-term fundamentals and sustained consumer traffic in the immediate corridor.', 'The asset is secured by a 25-year absolute ground lease, providing true passive ownership with zero landlord responsibilities and long-term income stability. Notably, The Hirth Group brought the property to market prior to the car wash opening to the public, successfully generating multiple competitive offers during pre-stabilization.', 'In a capital markets environment characterized by elevated interest rates, cautious underwriting, and limited transaction velocity, the team executed an all-cash closing at a 5.05% CAP rate. The buyer, a repeat client of The Hirth Group, strategically acquired the asset for long-term cash flow durability and bonus depreciation benefits, while the seller achieved premium pricing in a market where many comparable assets are experiencing extended marketing timelines and price discovery challenges.', 'This transaction further demonstrates The Hirth Group’s ability to create a competitive marketing campaign, structure certainty, and deliver institutional-level execution — even in a constrained capital markets environment. The Hirth Group represented both the buyer and the seller in this transaction.']
}, {
  title: '6226 Vineland Avenue',
  meta: 'North Hollywood, CA 91606',
  status: 'closed',
  image: CLO + 'n10.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 6226 Vineland Avenue, a commercial property located in North Hollywood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '2319 W Magnolia Boulevard',
  meta: 'Burbank, CA',
  status: 'closed',
  image: CLO + 'n11.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 2319 W Magnolia Boulevard, a commercial real estate asset located in Burbank. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '6334 Laurel Canyon Boulevard',
  meta: 'North Hollywood, CA',
  status: 'closed',
  image: CLO + 'n12.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 6334 Laurel Canyon Boulevard, a commercial real estate asset located in North Hollywood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '130 E Manchester Boulevard',
  meta: 'Inglewood, CA 90301',
  status: 'closed',
  image: CLO + 'n13.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 130 E Manchester Boulevard, a commercial real estate asset located in Inglewood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '10020 Venice Boulevard',
  meta: 'Culver City, CA 90232',
  status: 'closed',
  image: CLO + 'n14.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 10020 Venice Boulevard, a commercial real estate asset located in Culver City. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '11132 Fleetwood Street',
  meta: 'Sun Valley, CA 91352',
  status: 'closed',
  image: CLO + 'n15.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 11132 Fleetwood Street, a commercial property located in Sun Valley. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '1501 Main Street',
  meta: 'Venice, CA 90291',
  status: 'closed',
  image: CLO + 'n16.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 1501 Main Street, a commercial property located in Venice. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '14602 Victory Boulevard',
  meta: 'Van Nuys, CA 91411',
  status: 'closed',
  image: CLO + 'n17.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 14602 Victory Boulevard, a commercial real estate asset located in Van Nuys. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '3108 W. Magnolia Boulevard',
  meta: 'Burbank, CA 91505',
  status: 'closed',
  image: CLO + 'n18.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 3108 W. Magnolia Boulevard, a commercial real estate asset located in Burbank. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '18934 Ventura Boulevard',
  meta: 'Tarzana, CA 91356',
  status: 'closed',
  image: CLO + 'n19.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 18934 Ventura Boulevard, a commercial real estate asset located in Tarzana. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '521–525 Hyde Park Place',
  meta: 'Inglewood, CA 90302',
  status: 'closed',
  image: CLO + 'n20.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 521–525 Hyde Park Place, a multi-tenant commercial property located in Inglewood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '5358 Cartwright Avenue',
  meta: 'North Hollywood, CA 91601',
  status: 'closed',
  image: CLO + 'n21.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 5358 Cartwright Avenue, a commercial property located in North Hollywood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '7200–7218 S. Broadway',
  meta: 'Los Angeles, CA 90003',
  status: 'closed',
  image: CLO + 'n22.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 7200–7218 S. Broadway, a multi-tenant commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '6200 S. Western Avenue',
  meta: 'Los Angeles, CA 90047',
  status: 'closed',
  image: CLO + 'n23.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 6200 S. Western Avenue, a commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '1501 & 1509 W. Magnolia Boulevard',
  meta: 'Burbank, CA 91506',
  status: 'closed',
  image: CLO + 'n24.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 1501 & 1509 W. Magnolia Boulevard, a multi-tenant commercial property located in Burbank. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '1327–1337 Abbot Kinney Boulevard',
  meta: 'Venice, CA 90291',
  status: 'closed',
  image: CLO + 'n25.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 1327–1337 Abbot Kinney Boulevard, a multi-tenant commercial property located in Venice. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: 'Dollar General Market',
  meta: '4000 E. 9th Street, Texarkana, AR 71854',
  status: 'closed',
  image: CLO + 'n26.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of Dollar General Market, a single-tenant net-leased retail asset located in 4000 E. 9th Street. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '2700 North Main Street',
  meta: 'Santa Ana, CA 92750',
  status: 'closed',
  image: CLO + 'n27.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 2700 North Main Street, a commercial property located in Santa Ana. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '633 Rose Avenue',
  meta: 'Venice, CA 90291',
  status: 'closed',
  image: CLO + 'n28.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 633 Rose Avenue, a commercial property located in Venice. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '13206 Paramount Boulevard',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n29.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 13206 Paramount Boulevard, a commercial real estate asset located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '144 N. Clark Drive',
  meta: 'Beverly Hills, CA 90211',
  status: 'closed',
  image: CLO + 'n30.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 144 N. Clark Drive, a commercial property located in Beverly Hills. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '8023 Golden Avenue',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n32.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 8023 Golden Avenue, a commercial property located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '4220 Lankershim Boulevard',
  meta: 'North Hollywood, CA 91602',
  status: 'closed',
  image: CLO + 'n33.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 4220 Lankershim Boulevard, a commercial real estate asset located in North Hollywood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '8011 Golden Avenue',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n34.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 8011 Golden Avenue, a commercial property located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '13308 Paramount Boulevard',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n35.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 13308 Paramount Boulevard, a commercial real estate asset located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '8615 Long Beach Boulevard',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n36.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 8615 Long Beach Boulevard, a commercial real estate asset located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '1440 W. Manchester Avenue',
  meta: 'Los Angeles, CA 90047',
  status: 'closed',
  image: CLO + 'n37.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 1440 W. Manchester Avenue, a commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '5051 W. Sunset Boulevard',
  meta: 'Los Angeles, CA 90027',
  status: 'closed',
  image: CLO + 'n38.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 5051 W. Sunset Boulevard, a commercial real estate asset located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '707–711 Vesta Street',
  meta: 'Inglewood, CA 90302',
  status: 'closed',
  image: CLO + 'n39.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 707–711 Vesta Street, a multi-tenant commercial property located in Inglewood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '3253–3263 E. Cesar E. Chavez Avenue',
  meta: 'Los Angeles, CA 90063',
  status: 'closed',
  image: CLO + 'n40.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 3253–3263 E. Cesar E. Chavez Avenue, a multi-tenant commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '3920 Birch Street',
  meta: 'Newport Beach, CA 92660',
  status: 'closed',
  image: CLO + 'n41.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 3920 Birch Street, a commercial property located in Newport Beach. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: 'Los Angeles Portfolio',
  meta: '3 Properties · Inglewood / Los Angeles / Lynwood',
  status: 'closed',
  image: CLO + 'n42.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of Los Angeles Portfolio, a multi-property investment portfolio located in 3 Properties. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '2768 & 2780 E. Gage Avenue',
  meta: 'Huntington Park, CA 90255',
  status: 'closed',
  image: CLO + 'n43.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 2768 & 2780 E. Gage Avenue, a multi-tenant commercial property located in Huntington Park. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '1203 N. Velasco Street',
  meta: 'Angleton, TX 77515',
  status: 'closed',
  image: CLO + 'n44.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 1203 N. Velasco Street, a commercial property located in Angleton. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '171 N. La Brea Avenue',
  meta: 'Inglewood, CA 90301',
  status: 'closed',
  image: CLO + 'n45.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 171 N. La Brea Avenue, a commercial property located in Inglewood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '323 E. Beach Avenue',
  meta: 'Inglewood, CA 90302',
  status: 'closed',
  image: CLO + '323-beach.jpg',
  price: '$1,675,000',
  headline: 'Single-Tenant Industrial Building in the Heart of Inglewood',
  specs: ['±4,201 SF Building', '±5,272 SF Lot', 'Near $400 / SF', 'Single Tenant'],
  tagline: 'Exclusively listed by The Hirth Group — represented both buyer and seller.',
  description: ['Elijah Suval & Daniel Hirth of The Hirth Group are pleased to announce the successful closing of 323 E Beach Avenue, Inglewood CA — a single-tenant industrial warehouse comprised of approximately 4,201 SF of building on an estimated 5,272 SF lot.', 'The Hirth Group procured multiple offers and ultimately opened escrow. Daniel and Elijah successfully negotiated through environmental issues and were able to keep the deal together while maintaining a strong sale price for their client.', 'The seller’s motivation was due to a massive increase in Inglewood’s property values, while the buyer’s motivation was due to market demand for industrial product and a booming Inglewood submarket.']
}, {
  title: '5810–5820 Imperial Highway',
  meta: 'South Gate, CA 90280',
  status: 'closed',
  image: CLO + 'n47.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 5810–5820 Imperial Highway, a multi-tenant commercial property located in South Gate. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: 'Burger King — 1608 N. Tift Avenue',
  meta: 'Tifton, GA 31794',
  status: 'closed',
  image: CLO + 'n48.jpg',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of Burger King, a single-tenant net-leased retail asset located in Tifton. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '14557 Friar Street',
  meta: 'Van Nuys, CA 91411',
  status: 'closed',
  image: CLO + 'n49.jpg',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 14557 Friar Street, a commercial property located in Van Nuys. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '1633 S. La Cienega Boulevard',
  meta: 'Los Angeles, CA 90035',
  status: 'closed',
  image: CLO + 'n50.jpg',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 1633 S. La Cienega Boulevard, a commercial real estate asset located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '1250 & 1270 East Park Street',
  meta: 'Hollister, CA 95023',
  status: 'closed',
  image: CLO + 'n51.jpg',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 1250 & 1270 East Park Street, a multi-tenant commercial property located in Hollister. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '11468–11470 Burbank Boulevard',
  meta: 'North Hollywood, CA 91601',
  status: 'closed',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 11468–11470 Burbank Boulevard, a multi-tenant commercial property located in North Hollywood. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '5501–5521 Hollywood Boulevard',
  meta: 'Los Angeles, CA 90028',
  status: 'closed',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 5501–5521 Hollywood Boulevard, a multi-tenant commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}, {
  title: '12125–12127 Riverside Drive',
  meta: 'Valley Village, CA 91607',
  status: 'closed',
  tagline: 'The Hirth Group represented both buyer and seller in this transaction.',
  description: ['The Hirth Group represented both buyer and seller in the successful sale of 12125–12127 Riverside Drive, a multi-tenant commercial property located in Valley Village. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'The assignment reflects The Hirth Group’s expertise across retail, industrial, office, and multifamily product types, and our commitment to maximizing value for every client.']
}, {
  title: '11300 Nebraska Avenue',
  meta: 'Los Angeles, CA 90025',
  status: 'closed',
  tagline: 'The Hirth Group advised our client in this transaction.',
  description: ['The Hirth Group advised our client in the successful sale of 11300 Nebraska Avenue, a commercial property located in Los Angeles. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Our hands-on approach — from pricing strategy through closing — ensured a seamless process and a strong outcome for ownership.']
}, {
  title: '333 E Foothill Boulevard',
  meta: 'Rialto, CA 92376',
  status: 'closed',
  tagline: 'The Hirth Group represented the seller in this transaction.',
  description: ['The Hirth Group represented the seller in the successful sale of 333 E Foothill Boulevard, a commercial real estate asset located in Rialto. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Through a competitive, broadly marketed campaign and disciplined negotiation, our team delivered certainty of execution and a result that reflected the asset’s full market value.']
}, {
  title: '6315 Van Nuys Boulevard',
  meta: 'Van Nuys, CA',
  status: 'closed',
  tagline: 'The Hirth Group represented the buyer in this transaction.',
  description: ['The Hirth Group represented the buyer in the successful sale of 6315 Van Nuys Boulevard, a commercial real estate asset located in Van Nuys. The transaction closed as part of the firm’s extensive track record across the greater Los Angeles commercial real estate market.', 'Backed by deep submarket knowledge and a relationship-driven process, the team guided the transaction through escrow to a smooth, on-time close.']
}];
const FEATURED = LISTINGS.filter(l => l.image && (l.status === 'for-sale' || l.status === 'in-escrow')).slice(0, 4);
const SERVICES = [{
  title: 'Sales',
  blurb: 'Acquisition & disposition of commercial assets — full-service, from first call to closing.',
  image: P + 'service-acquisition.jpg',
  accent: 'var(--gold-500)',
  icon: 'building-2',
  points: ['All product types — retail to land', 'Dynamic marketing campaigns', 'Net sellers the most money'],
  body: ['The Hirth Group specializes in the acquisition and disposition of commercial real estate assets. We handle all types of commercial properties including retail, multifamily, industrial, office, mixed-use, and land.', 'We offer a full-service experience from the beginning of the transaction through closing. Our dynamic marketing campaigns, unparalleled negotiating skills, and market expertise have contributed to netting our sellers the highest amount of money.']
}, {
  title: 'Leasing',
  blurb: 'Aggressive landlord representation that fills vacancies with the right tenants.',
  image: P + 'service-valuation.jpg',
  accent: 'var(--teal-400)',
  icon: 'key-round',
  points: ['Landlord representation', 'Market & occupancy analysis', 'Comprehensive marketing plan'],
  body: ['The Hirth Group aggressively markets vacancies directly to new tenants that best fit the property and the existing tenant mix.', 'We focus on landlord representation and evaluate market conditions, levels of occupancy in the immediate area, and rental rates — then develop a comprehensive marketing plan to best position the property for continued success and profitability.']
}, {
  title: '1031 Exchange',
  blurb: 'Expert guidance that defers capital gains and keeps your equity working.',
  image: P + 'service-exchange.jpg',
  accent: 'var(--emerald-500)',
  icon: 'repeat',
  points: ['Defer capital gains taxes', 'Timeline & identification rules', 'Like-kind reinvestment strategy'],
  body: ['The Hirth Group provides expert guidance throughout the 1031 Exchange process, helping investors defer capital gains taxes while strategically reinvesting in like-kind commercial real estate assets. Our team navigates the complexities of exchange timelines, identification rules, and investment goals to ensure a seamless transition from sale to acquisition.', 'Whether upgrading into higher-performing properties or diversifying a portfolio, we deliver tailored solutions that align with long-term wealth-building strategies.']
}];
const DANIEL = {
  name: 'Daniel Hirth',
  role: 'Managing Director',
  phone: '310.300.2838',
  fax: '888.798.3878',
  email: 'Daniel@HirthGroup.com',
  license: 'License CA: 01515796',
  photo: P + 'daniel-hirth.png',
  bio: ['Born and raised in Los Angeles, I was exposed to the real estate industry at a very young age. Some of my earliest childhood memories include driving around with my father, collecting rents, remodeling and renovating commercial real estate properties. Real estate was second nature to me – a career path that I was destined to pursue.', 'With my father\u2019s guidance and mentorship, I graduated from the California State University of Northridge and followed in his footsteps starting my career at Marcus and Millichap in early 2012. In the five years I spent there, I successfully mastered the brokerage skills of acquisition and disposition of commercial real estate assets, negotiating, and deal making including the following product types: retail, industrial, multi-family, office, and land.', 'The most unique skill set I possess is an in-depth knowledge in all commercial real estate, a skill hard to find amongst my peers. I have managed, acquired and disposed of commercial real estate properties of all product types in Los Angeles County over the past decade.', 'The most vital role I play for my clients\u2019 an advisor — by taking an in depth look at their real estate portfolio and restructuring if necessary. Thus, guaranteeing their equity is working for them at peak performance yielding them the best return and shielding their income through depreciation and interest payments.', 'My unparalleled expertise in marketing, negotiating, financing, managing, and sales has contributed to over 200 transactions exceeding $520,000,000. My success in the real estate market is founded on a relentless work ethic, integrity, and honesty, all of which allow me to play a vital role for my clients\u2019 financial benefit. I am highly organized, and I ensure that each transaction runs smoothly until escrow closes. Working closely with clients that become family is what I live for.', 'Aside from insuring my clients the most amount of money possible, one of my greatest joys is taking on promising members of the younger generation and giving them the opportunity to join The Hirth Group. By helping them fulfill their dreams and transforming them into independent and strong leaders, I have created a well-rounded team where each agent brings their unique skillset to benefit our clients\u2019 needs.', 'When I\u2019m not closing deals, I enjoy spending time with my beautiful wife Adi and my amazing sons, Alexander, Lev, and Gabriel. I avidly follow the stock market and the emerging cryptocurrency markets. I enjoy outdoor activities such as hockey, basketball, tennis, golf, and snowboarding.']
};
const TESTIMONIAL_FULL = 'On behalf of my husband and myself, we wish to thank Daniel Hirth, Alex Reyhan and Ethan Donel for the excellent service they provided in handling the sale of our commercial property. We were impressed by the attention provided by the team from the initial meeting through the escrow process. Phone calls and emails were promptly returned and questions were fully explained and answered. We received multiple offers and our property sold quickly. The entire selling experience far exceeded our expectations. We highly recommend The Hirth Group.';
Object.assign(window, {
  LISTINGS,
  FEATURED,
  SERVICES,
  DANIEL,
  TESTIMONIAL_FULL
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ContactRow = __ds_scope.ContactRow;

__ds_ns.PropertyCard = __ds_scope.PropertyCard;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.StatBand = __ds_scope.StatBand;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TestimonialQuote = __ds_scope.TestimonialQuote;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

})();

