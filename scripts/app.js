const {
  NavBar,
  SiteFooter
} = window.HirthGroupDesignSystem_c76dea;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "look": "premium",
  "accent": "#1b9cd8",
  "scrim": 0.78,
  "countUp": true,
  "depth3d": 2
} /*EDITMODE-END*/;

// Accent options: logo blue / deep harbor blue / steel silver. Each maps to a
// full set of semantic accent tokens so links, rules, tags, and CTAs follow.
const ACCENTS = {
  '#1b9cd8': {
    500: '#1b9cd8',
    600: '#1485bd',
    700: '#7cc6e6',
    400: '#4cb4e2',
    100: 'rgba(27,156,216,0.3)',
    50: 'rgba(27,156,216,0.12)'
  },
  '#0e6e9e': {
    500: '#0e6e9e',
    600: '#0b5a82',
    700: '#6fb3d4',
    400: '#3f93bd',
    100: 'rgba(14,110,158,0.32)',
    50: 'rgba(14,110,158,0.14)'
  },
  '#8a97a0': {
    500: '#8a97a0',
    600: '#6e7d88',
    700: '#bcc7ce',
    400: '#a8b3bb',
    100: 'rgba(138,151,160,0.3)',
    50: 'rgba(138,151,160,0.12)'
  }
};
function applyTweaks(t) {
  const r = document.documentElement.style;
  // Look: 'premium' (Marcellus serif) vs 'classic' — plain sans headlines like the current Wix site.
  r.setProperty('--font-display', t.look === 'classic' ? "'Archivo', 'Helvetica Neue', Helvetica, Arial, sans-serif" : "'Marcellus', 'Times New Roman', serif");
  r.setProperty('--tracking-display', t.look === 'classic' ? '0.06em' : '0.01em');
  const a = ACCENTS[t.accent] || ACCENTS['#1b9cd8'];
  r.setProperty('--blue-500', a[500]);
  r.setProperty('--blue-600', a[600]);
  r.setProperty('--blue-700', a[700]);
  r.setProperty('--blue-400', a[400]);
  r.setProperty('--blue-100', a[100]);
  r.setProperty('--blue-50', a[50]);
  r.setProperty('--scrim-a', String(t.scrim));
  r.setProperty('--depth-3d', String(t.depth3d));
  window.__tiltDepth = t.depth3d;
}

// Listing detail overlay — wired so PropertyCard clicks always open it.
// Exception: a listing with a `flyer` PDF opens a full-screen in-context PDF
// viewer (window.open to a relative path loses the preview token).
const listingHolder = {
  open: null
};
const flyerHolder = {
  open: null
};
window.HirthOpenListing = l => {
  if (l && l.flyer) {
    if (flyerHolder.open) flyerHolder.open(l);
    return;
  }
  if (listingHolder.open) listingHolder.open(l);
};
window.HirthOpenFlyer = l => {
  if (flyerHolder.open) flyerHolder.open(l);
};
function flyerFilename(listing) {
  return (listing.title || 'Hirth-Group-Listing').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') + '-Lease-Flyer.pdf';
}

// Robust cross-device download: fetch the PDF as a blob and save it via a
// temporary anchor (works in sandboxed iframes where a bare download attr is
// ignored). Falls back to opening the file in a new tab if fetch is blocked.
async function downloadFlyer(listing) {
  const url = listing.flyer;
  const name = flyerFilename(listing);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const blob = await res.blob();
    const obj = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = obj;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(obj);
    }, 1500);
  } catch (e) {
    window.open(url, '_blank', 'noopener');
  }
}
function FlyerViewer({
  listing,
  onClose
}) {
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = listing ? 'hidden' : '';
    if (listing && window.lucide) window.lucide.createIcons();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [listing, onClose]);
  if (!listing) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 240,
      background: 'rgba(6,12,16,0.92)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      padding: '14px 22px',
      background: 'var(--navy-950)',
      borderBottom: '1px solid var(--border-inverse)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-hirth-white.png",
    alt: "The Hirth Group",
    style: {
      height: '34px',
      width: 'auto',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '18px',
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, listing.title, " \u2014 Lease Flyer")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => downloadFlyer(listing),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      border: 'none',
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'var(--action-accent)',
      borderRadius: 'var(--radius-xs)',
      padding: '10px 18px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download",
    style: {
      width: '15px',
      height: '15px'
    }
  }), " Download"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)',
      background: 'transparent',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-xs)',
      padding: '10px 16px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: '15px',
      height: '15px'
    }
  }), " Close"))), /*#__PURE__*/React.createElement("object", {
    data: listing.flyer + '#view=FitH',
    type: "application/pdf",
    style: {
      flex: 1,
      width: '100%',
      border: 0,
      background: '#33373b'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '18px',
      padding: '40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-inverse)',
      fontFamily: 'var(--font-display)',
      fontSize: '24px',
      margin: 0
    }
  }, "Preview not available here."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-inverse-secondary)',
      fontSize: '14px',
      margin: 0
    }
  }, "Some browsers and ad/tracker blockers block embedded PDFs \u2014 tap below to download the flyer."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => downloadFlyer(listing),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      border: 'none',
      font: 'var(--weight-semibold) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'var(--action-accent)',
      borderRadius: 'var(--radius-xs)',
      padding: '14px 26px'
    }
  }, "Download Flyer (PDF)")))));
}
function ListingModal({
  listing,
  onClose,
  go
}) {
  const _hash = s => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
    return h;
  };
  const HIRTH_AGENTS = [{
    name: 'Daniel Hirth',
    role: 'Managing Director',
    phone: '310.300.2838',
    tel: '3103002838',
    email: 'Daniel@HirthGroup.com',
    license: 'CA: 01515796',
    photo: '../assets/photos/daniel-hirth-portrait.png'
  }, {
    name: 'Alex Reyhan',
    role: 'Vice President',
    phone: '310.300.3181',
    tel: '3103003181',
    email: 'Alex@HirthGroup.com',
    license: 'CA: 02005428',
    photo: '../assets/photos/team-alex-reyhan.png'
  }];
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = listing ? 'hidden' : '';
    if (listing && window.lucide) window.lucide.createIcons();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, listing]);
  if (!listing) return null;
  const {
    Tag
  } = window.HirthGroupDesignSystem_c76dea;
  const region = (listing.meta || '').split('·')[0].trim();
  // Build the most geocode-reliable address: strip range/multi-address noise
  // ("1250 & 1270 East Park Street", "5501–5521 Hollywood Boulevard", brand
  // prefixes like "Chipotle — 2929 Berry Street") down to a single clean
  // street number + street name, so Google pins the exact parcel instead of
  // guessing at an ambiguous combined address.
  const cleanAddr = t => {
    const s = String(t || '').replace(/[–—]/g, '-');
    const idx = s.search(/\d/);
    if (idx === -1) return null; // no street number in the title at all
    const rest = s.slice(idx).replace(/^(\d+)(?:\s*[-&]\s*\d+)?/, '$1');
    return rest.trim();
  };
  const cleaned = cleanAddr(listing.title);
  // If the title carries no street number (e.g. a brand/portfolio name with the
  // real address only in meta), geocode off the meta address alone.
  const addr = cleaned ? cleaned + ', ' + region : region;
  const propType = (listing.dealType || listing.headline || '').toLowerCase();
  const cityOnly = region ? region.split(',')[0].trim() : 'Los Angeles';
  const cityPhrase = cityOnly !== 'Los Angeles' || !propType ? cityOnly : '';
  const openers = [(t, c, p) => 'The Hirth Group sold ' + t + (c ? ', a well-positioned asset in ' + c + ',' : '') + ' on behalf of our client. From the initial engagement through marketing, negotiation, and escrow, the team managed every stage of the process directly — the kind of hands-on representation that has defined The Hirth Group\u2019s track record across the greater Los Angeles commercial real estate market' + (p ? '. The transaction closed at ' + p : '') + '.', (t, c, p) => 'Bringing ' + t + (c ? ' to market in ' + c : '') + ', The Hirth Group ran a focused, relationship-driven process from listing to close. Our team worked the deal from the ground up — positioning the asset, driving demand, and guiding our client through negotiation and escrow to a smooth, on-time close' + (p ? ' at ' + p : '') + ', backed by the firm\u2019s deep knowledge of the local market.', (t, c, p) => t + (c ? ' in ' + c : '') + ' represents the kind of deal The Hirth Group is built for: hands-on stewardship through every stage of the transaction, from underwriting through close of escrow. Our team managed the marketing, negotiation, and diligence process directly on behalf of our client, delivering a successful outcome' + (p ? ' at a sale price of ' + p : '') + ' as part of the firm\u2019s extensive record across Southern California.', (t, c, p) => 'The Hirth Group guided ' + t + (c ? ' in ' + c : '') + ' to a successful sale' + (p ? ' at ' + p : '') + ', representing our client from the first conversation through final closing. This closing reflects the same disciplined process behind every transaction the firm handles — thorough preparation, direct client communication, and a relentless focus on getting the deal to the finish line.'];
  const idx = _hash(listing.title || '') % openers.length;
  const body = listing.description || [listing.status === 'closed' ? openers[idx](listing.title, cityPhrase, listing.price && /^\$/.test(listing.price) ? listing.price : null) : listing.status === 'leased' ? 'Successfully leased by The Hirth Group.' : 'This asset is currently available. The full marketing package — pricing, financials, rent roll, and offering memorandum — is provided on request.'];
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      overflowY: 'auto',
      background: 'rgba(6,12,16,0.78)',
      backdropFilter: 'blur(8px)',
      animation: 'pageIn 0.3s var(--ease-out) both'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: '1180px',
      margin: '0 auto',
      minHeight: '100%',
      background: 'var(--surface-inverse)',
      boxShadow: 'var(--shadow-overlay)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: '1px solid var(--border-inverse)',
      position: 'sticky',
      top: 0,
      background: 'var(--navy-950)',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      font: 'var(--weight-medium) 12px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-inverse-secondary)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = '#fff';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-inverse-secondary)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px'
    }
  }, "\u2190"), " Back to Listings"), /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo-hirth-white.png",
    alt: "The Hirth Group",
    style: {
      height: '40px',
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "r-2col",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: '0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '440px',
      background: 'var(--navy-900)'
    }
  }, listing.image ? /*#__PURE__*/React.createElement("img", {
    src: listing.image,
    alt: listing.title,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain'
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
    src: "../assets/logo-hirth-white.png",
    alt: "",
    style: {
      width: '46%',
      opacity: 0.28
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '20px',
      left: '20px'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    status: listing.status
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 44px 56px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: 0
    }
  }, region || 'Greater Los Angeles'), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '34px',
      color: '#fff',
      margin: '12px 0 0',
      lineHeight: 1.12
    }
  }, listing.title), listing.price ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '24px',
      color: 'var(--blue-400)',
      margin: '22px 0 0',
      letterSpacing: '0.01em'
    }
  }, "PRICE: ", listing.price) : /*#__PURE__*/React.createElement("p", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '18px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: listing.status === 'closed' || listing.status === 'leased' ? '#fff' : 'var(--blue-400)',
      margin: '22px 0 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '9px',
      height: '9px',
      borderRadius: '50%',
      background: listing.status === 'leased' ? 'var(--grey-400)' : listing.status === 'for-lease' ? 'var(--blue-400)' : 'var(--status-closed, #2f9e63)'
    }
  }), listing.status === 'closed' ? 'SOLD BY THE HIRTH GROUP' : listing.status === 'leased' ? 'LEASED BY THE HIRTH GROUP' : listing.status === 'for-lease' ? 'FOR LEASE · SEE FLYER' : 'CONTACT FOR PRICE'), listing.headline ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-bold)',
      fontSize: '18px',
      color: '#fff',
      margin: '24px 0 0'
    }
  }, listing.headline) : null, listing.specs ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '22px'
    }
  }, listing.specs.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      font: 'var(--weight-medium) 12px var(--font-sans)',
      color: 'var(--text-inverse)',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-xs)',
      padding: '7px 12px'
    }
  }, s))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '2px',
      background: 'linear-gradient(90deg, var(--gold), var(--gold-200))',
      margin: '22px 0'
    }
  }), body.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      color: 'var(--text-inverse-secondary)',
      fontSize: '14.5px',
      lineHeight: 1.75,
      margin: i ? '16px 0 0' : 0
    }
  }, para)), listing.tagline ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '22px',
      padding: '14px 18px',
      borderLeft: '2px solid var(--gold-500)',
      background: 'rgba(255,255,255,0.04)',
      fontSize: '14px',
      fontStyle: 'italic',
      color: 'var(--gold-200)',
      lineHeight: 1.6
    }
  }, listing.tagline) : null, listing.flyer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '26px',
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => {
      onClose();
      window.HirthOpenFlyer && window.HirthOpenFlyer(listing);
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "file-text",
    style: {
      width: '15px',
      height: '15px'
    }
  }), " View Lease Flyer"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    onClick: () => downloadFlyer(listing)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "download",
    style: {
      width: '15px',
      height: '15px'
    }
  }), " Download PDF")) : null)), listing.flyer ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-inverse)',
      padding: '40px 44px 0'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: '0 0 16px'
    }
  }, "Lease Flyer"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      border: '1px solid var(--border-inverse)',
      aspectRatio: '8.5 / 11',
      maxWidth: '620px',
      margin: '0 auto',
      background: 'var(--navy-900)'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: 'Flyer for ' + listing.title,
    src: listing.flyer + '#view=FitH',
    loading: "lazy",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-inverse)',
      padding: '40px 44px 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: 0
    }
  }, "Location"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '22px',
      color: '#fff',
      margin: '6px 0 0'
    }
  }, listing.title, " \xB7 ", region)), /*#__PURE__*/React.createElement("a", {
    href: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr),
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      font: 'var(--weight-semibold) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--blue-400)',
      textDecoration: 'none',
      border: '1px solid var(--border-inverse)',
      borderRadius: 'var(--radius-xs)',
      padding: '10px 16px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "map-pin",
    style: {
      width: '15px',
      height: '15px'
    }
  }), " Open in Google Maps")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      border: '1px solid var(--border-inverse)',
      aspectRatio: '16 / 6',
      background: 'var(--navy-900)'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    title: 'Map of ' + listing.title,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    src: 'https://maps.google.com/maps?q=' + encodeURIComponent(addr) + '&z=15&t=m&hl=en&output=embed',
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      border: 0
    }
  }))), listing.saleHighlights && listing.saleHighlights.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-inverse)',
      padding: '44px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: '0 0 24px'
    }
  }, "The Sale"), /*#__PURE__*/React.createElement("div", {
    className: "r-grid-2",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '18px 40px'
    }
  }, listing.saleHighlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check-circle-2",
    style: {
      width: '18px',
      height: '18px',
      color: 'var(--gold-400)',
      flex: 'none',
      marginTop: '3px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.55,
      color: 'var(--text-inverse)'
    }
  }, h))))) : null, /*#__PURE__*/React.createElement("div", {
    className: "r-2col",
    style: {
      borderTop: '1px solid var(--border-inverse)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '44px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 11px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--gold-500)',
      margin: 0
    }
  }, "Listed By"), HIRTH_AGENTS.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    style: {
      display: 'flex',
      gap: '18px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: a.photo,
    alt: a.name,
    style: {
      width: '76px',
      height: '76px',
      borderRadius: '50%',
      objectFit: 'cover',
      objectPosition: 'top center',
      border: '1px solid var(--border-inverse)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '21px',
      color: '#fff',
      margin: 0
    }
  }, a.name), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--weight-medium) 10.5px var(--font-sans)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: 'var(--blue-400)',
      margin: '4px 0 8px'
    }
  }, a.role), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: 'var(--text-inverse-secondary)',
      lineHeight: 1.6,
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: 'tel:' + a.tel,
    style: {
      color: 'var(--text-inverse)'
    }
  }, a.phone), " Direct \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: 'mailto:' + a.email,
    style: {
      color: 'var(--text-inverse)'
    }
  }, a.email), /*#__PURE__*/React.createElement("br", null), "License ", a.license))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy-950)',
      padding: '44px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '28px',
      color: '#fff',
      margin: 0
    }
  }, "Request the OM"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14px',
      color: 'var(--text-inverse-secondary)',
      lineHeight: 1.7,
      margin: 0
    }
  }, "Get the full offering memorandum \u2014 financials, rent roll, and marketing package \u2014 sent directly to you."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    onClick: () => {
      onClose();
      go('contact');
    }
  }, "Request OM"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    href: "tel:3103002838"
  }, "Call 310.300.2838"))))));
}
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    applyTweaks(t);
  }, [t]);
  const [selected, setSelected] = React.useState(null);
  listingHolder.open = setSelected;
  const [flyer, setFlyer] = React.useState(null);
  flyerHolder.open = setFlyer;
  // localStorage throws when storage is disabled (private mode / blocked
  // third-party frame) — never let that abort the initial render.
  const [page, setPage] = React.useState(() => {
    try {
      return localStorage.getItem('hirth-kit-page') || 'home';
    } catch (e) {
      return 'home';
    }
  });
  const go = p => {
    setPage(p);
    try {
      localStorage.setItem('hirth-kit-page', p);
    } catch (e) {}
    window.scrollTo({
      top: 0
    });
  };
  React.useEffect(() => {
    const id = setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 60);
    return () => clearTimeout(id);
  }, [page]);
  // Social links: inside an iframe embed (the site is framed on Wix) a plain
  // target="_blank" is frequently blocked, and the lucide <i> can measure 0px
  // before icons hydrate — so the anchors look dead. Give them a real hit area
  // and open them explicitly, falling back to the top window if popups are blocked.
  React.useEffect(() => {
    const onClick = e => {
      const a = e.target.closest && e.target.closest('a[href^="https://www.facebook.com"], a[href^="https://www.linkedin.com"], a[href^="https://www.instagram.com"]');
      if (!a) return;
      e.preventDefault();
      const href = a.getAttribute('href');
      const w = window.open(href, '_blank', 'noopener');
      if (!w) {
        try {
          window.top.location.href = href;
        } catch (err) {
          window.location.href = href;
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  let view = null;
  if (page === 'home') view = /*#__PURE__*/React.createElement(window.HomePage, {
    go: go,
    countUp: t.countUp
  });else if (page.startsWith('properties-')) view = /*#__PURE__*/React.createElement(window.PropertiesPage, {
    status: page.replace('properties-', ''),
    go: go
  });else if (page === 'daniel-hirth') view = /*#__PURE__*/React.createElement(window.ProfilePage, {
    go: go
  });else if (page === 'about-team') view = /*#__PURE__*/React.createElement(window.TeamPage, {
    go: go
  });else if (page === 'about-services') view = /*#__PURE__*/React.createElement(window.ServicesPage, {
    go: go
  });else if (page === 'about-testimonials') view = /*#__PURE__*/React.createElement(window.TestimonialsPage, null);else view = /*#__PURE__*/React.createElement(window.ContactPage, null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "world-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "world-zoom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "world-pan"
  }, /*#__PURE__*/React.createElement("div", {
    className: "world-map",
    "data-cursor-par": "-24"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "world-aurora",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "world-veil",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "par-wrap",
    "data-cursor-par": "-52"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb orb1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "par-wrap",
    "data-cursor-par": "34"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb orb2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "par-wrap",
    "data-cursor-par": "-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "orb orb3"
  }))), /*#__PURE__*/React.createElement(NavBar, {
    active: page === 'daniel-hirth' ? 'about-team' : page,
    transparent: page === 'home',
    logoSrc: "../assets/logo-hirth-white.png",
    onNavigate: go
  }), /*#__PURE__*/React.createElement("div", {
    className: "page-anim",
    key: page,
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, view, /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: "../assets/logo-hirth-white.png",
    onNavigate: go
  })), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Design"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Headlines",
    value: t.look,
    options: ['premium', 'classic'],
    onChange: v => setTweak('look', v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Accent",
    value: t.accent,
    options: ['#1b9cd8', '#0e6e9e', '#8a97a0'],
    onChange: v => setTweak('accent', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "3D depth",
    value: t.depth3d,
    min: 0,
    max: 2,
    step: 0.1,
    onChange: v => setTweak('depth3d', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Map darkness",
    value: t.scrim,
    min: 0.3,
    max: 1,
    step: 0.02,
    onChange: v => setTweak('scrim', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Motion"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Animate stats",
    value: t.countUp,
    onChange: v => setTweak('countUp', v)
  })), /*#__PURE__*/React.createElement(ListingModal, {
    listing: selected,
    onClose: () => setSelected(null),
    go: go
  }), /*#__PURE__*/React.createElement(FlyerViewer, {
    listing: flyer,
    onClose: () => setFlyer(null)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
