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
      backgroundImage: 'url(' + window.__ASSET('../assets/maps/la-hero-dark.png') + ')',
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
    src: '../assets/maps/' + s.key + '-dark.png',
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
