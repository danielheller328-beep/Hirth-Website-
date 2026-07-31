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
      // DESKTOP: the earth fills the screen and LOCKS scroll — you descend through
      // it (Earth → LA) before the site scrolls. TOUCH/iPhone: the dive AUTO-PLAYS
      // and never locks (locking touch-scroll breaks inside the Wix frame).
      if (!framesOk || reduced) return; // static hero
      // SCROLL-LOCKED DESCENT on EVERY device (desktop + iPhone): the earth fills
      // the screen and the page is locked — you drive the Earth → LA descent with
      // wheel or swipe. The instant you land, the lock is FULLY released (every
      // listener removed, overflow + touch-action restored) so the rest of the
      // site scrolls freely from then on, with no blockers anywhere.

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
      let touchY = null;
      let locked = true;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      window.scrollTo(0, 0);
      const onWheel = e => {
        if (done) return;
        e.preventDefault();
        target = clamp(target + e.deltaY * SENS, 0, 1);
      };
      const onTouchStart = e => {
        touchY = e.touches[0].clientY;
      };
      const onTouchMove = e => {
        if (done) return;
        e.preventDefault();
        const y = e.touches[0].clientY;
        if (touchY != null) target = clamp(target + (touchY - y) * SENS * 2.4, 0, 1);
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
        if (!locked) return;
        locked = false;
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.touchAction = '';
        window.removeEventListener('wheel', onWheel, {
          passive: false
        });
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove, {
          passive: false
        });
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
        // modest per-layer scale — kept low so the raster map never magnifies
        // past its native resolution and stays sharp through the descent
        el.style.transform = 'translateZ(0) scale(' + Math.pow(1.7, seg(p, sA, sB)).toFixed(4) + ')';
      };
      const LABELS = [[0.05, 0.42, 'Earth'], [0.6, 0.82, 'Southern California']];
      let raf = 0;
      let last = 0;
      // Smooth the raw scroll target itself (wheel notches arrive as big discrete
      // jumps); we low-pass the target, then critically-damp the displayed prog
      // toward it — two stages of easing turn stepped input into glass-smooth motion.
      let smoothTarget = 0;
      let diveStart = 0;
      const AUTO_MS = 4200; // earth descends Earth → LA by itself over ~4.2s
      const loop = now => {
        if (disposed) return;
        const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
        last = now;
        if (!diveStart) diveStart = now;
        // AUTO-DESCEND: progress advances by itself over AUTO_MS. The page stays
        // locked the whole time (earth is all you see) until it lands, then the
        // lock releases and the site scrolls freely. Same on every device.
        if (!done) target = clamp((now - diveStart) / AUTO_MS, 0, 1);
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
        const zoom = 1 + Math.pow(seg(p, 0.0, 0.52), 1.5) * 1.5; // 1 → 2.5, sharp
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
        hint.style.opacity = 0;
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
        // Once landed and fully settled every write above is identical each
        // frame — stop re-queuing. All input handlers early-return when done,
        // so nothing can move the target again; resize keeps its own listener.
        if (!(done && prog === 1 && smoothTarget === 1 && target === 1)) {
          raf = requestAnimationFrame(loop);
        }
      };
      let disposed = false;
      place();
      onScroll();
      raf = requestAnimationFrame(loop);
      // Wall-clock backstop (independent of animation frames): if the descent
      // hasn't finished a few seconds after it should, force it complete and
      // release the lock — so the page can NEVER stay stuck locked.
      const watchdog = setTimeout(() => {
        if (done) return;
        done = true;
        wrap.classList.add('dive-done');
        target = 1;
        smoothTarget = 1;
        prog = 1;
        releaseLock();
      }, AUTO_MS + 7000);
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
        clearTimeout(watchdog);
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
      backgroundImage: 'url(' + window.__ASSET('../assets/maps/dive-socal-blue.png') + ')',
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
      backgroundImage: 'url(' + window.__ASSET('../assets/maps/earth-mercator-blue.png') + ')'
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
    src: "../assets/logo-hirth-white.png",
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
    src: "../assets/logo-hirth-white.png",
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
      lineHeight: '1.18',
      color: '#fff',
      maxWidth: '820px',
      margin: '20px 0 0',
      paddingBottom: '0.12em'
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
