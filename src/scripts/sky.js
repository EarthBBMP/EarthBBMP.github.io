// home hero: stars + draggable globe (colours come from CSS variables)
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

(() => {
  const hero = document.querySelector('.hero');
  const starCanvas = hero?.querySelector('.sky-stars');
  const globeCanvas = hero?.querySelector('.globe');
  if (!hero || !starCanvas) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;
  let dpr = 1;
  let colors = {};

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    colors = {
      star: v('--star'), starAlpha: parseFloat(v('--star-alpha')) || 0.8,
      ocean: v('--globe-ocean'), oceanHi: v('--globe-ocean-hi'),
      land: v('--globe-land'), line: v('--globe-line'), grid: v('--globe-grid'),
      rim: v('--globe-rim'), glow: v('--globe-glow'), shade: v('--globe-shade'),
      orbit: v('--globe-orbit'), accent: v('--accent'),
    };
  }

  /* ---------- stars ---------- */
  const sctx = starCanvas.getContext('2d');
  let stars = [];
  let sw = 0, sh = 0;

  // seeded so stars stay put on resize
  function rng(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function sizeStars() {
    const r = starCanvas.getBoundingClientRect();
    sw = r.width; sh = r.height;
    starCanvas.width = Math.round(sw * dpr);
    starCanvas.height = Math.round(sh * dpr);
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const rand = rng(1584);
    const n = Math.round((sw * sh) / 6500);
    stars = Array.from({ length: n }, () => {
      const big = rand() < 0.06;
      return {
        x: rand(), y: rand(),
        r: big ? 1.05 + rand() * 0.7 : 0.35 + rand() * 0.65,
        a: 0.3 + rand() * 0.7,
        tw: rand() < 0.35 ? 0.5 + rand() * 1.5 : 0,
        ph: rand() * TAU,
      };
    });
  }

  function drawStars(t) {
    sctx.clearRect(0, 0, sw, sh);
    sctx.fillStyle = `rgb(${colors.star})`;
    for (const s of stars) {
      let a = s.a * colors.starAlpha;
      if (s.tw && !reduce.matches) a *= 0.55 + 0.45 * Math.sin((t / 1000) * s.tw + s.ph);
      sctx.globalAlpha = Math.max(0, a);
      sctx.beginPath();
      sctx.arc(s.x * sw, s.y * sh, s.r, 0, TAU);
      sctx.fill();
    }
    sctx.globalAlpha = 1;
  }

  /* ---------- globe ---------- */
  const geoReady = !!globeCanvas;
  const BKK = [100.5018, 13.7563];
  const rot = { lam: -122, phi: -14, gam: -9 }; // start over Southeast Asia
  const TILT = -14 * Math.PI / 180;
  let gctx, proj, path, land, borders, graticule;
  let gw = 0, cx = 0, cy = 0, R = 0;

  if (geoReady) {
    land = feature(world, world.objects.land);
    borders = mesh(world, world.objects.countries, (a, b) => a !== b);
    graticule = geoGraticule10();
    gctx = globeCanvas.getContext('2d');
    proj = geoOrthographic().clipAngle(90).precision(0.5);
    path = geoPath(proj, gctx);
  }

  function sizeGlobe() {
    const r = globeCanvas.getBoundingClientRect();
    gw = r.width;
    globeCanvas.width = Math.round(gw * dpr);
    globeCanvas.height = Math.round(gw * dpr);
    gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx = gw / 2; cy = gw / 2; R = gw * 0.34;
    proj.scale(R).translate([cx, cy]);
  }

  function disc() { gctx.beginPath(); gctx.arc(cx, cy, R, 0, TAU); }

  function orbit(from, to) {
    gctx.beginPath();
    gctx.ellipse(cx, cy, R * 1.42, R * 0.32, TILT, from, to);
    gctx.lineWidth = 1;
    gctx.strokeStyle = colors.orbit;
    gctx.stroke();
  }

  function satellite(a) {
    const x = R * 1.42 * Math.cos(a), y = R * 0.32 * Math.sin(a);
    const c = Math.cos(TILT), s = Math.sin(TILT);
    return { x: cx + x * c - y * s, y: cy + x * s + y * c, front: Math.sin(a) >= 0 };
  }

  function drawSat(p) {
    gctx.save();
    gctx.fillStyle = colors.accent;
    gctx.shadowColor = colors.glow;
    gctx.shadowBlur = 8;
    gctx.beginPath(); gctx.arc(p.x, p.y, 2.2, 0, TAU); gctx.fill();
    gctx.restore();
  }

  function drawGlobe(t) {
    gctx.clearRect(0, 0, gw, gw);
    proj.rotate([rot.lam, rot.phi, rot.gam]);
    const sat = satellite(reduce.matches ? 2.3 : 2.3 + (t / 1000) * 0.18);

    orbit(Math.PI, TAU);                       // far half of the orbit
    if (!sat.front) drawSat(sat);

    gctx.save();                                // atmosphere glow
    gctx.shadowColor = colors.glow;
    gctx.shadowBlur = R * 0.22;
    gctx.fillStyle = colors.ocean;
    disc(); gctx.fill();
    gctx.restore();

    const sea = gctx.createRadialGradient(cx - R * 0.45, cy - R * 0.42, R * 0.05, cx, cy, R * 1.05);
    sea.addColorStop(0, colors.oceanHi);
    sea.addColorStop(1, colors.ocean);
    gctx.fillStyle = sea;
    disc(); gctx.fill();

    gctx.beginPath(); path(graticule);
    gctx.lineWidth = 0.6; gctx.strokeStyle = colors.grid; gctx.stroke();

    gctx.beginPath(); path(land);
    gctx.fillStyle = colors.land; gctx.fill();
    gctx.lineWidth = 0.8; gctx.strokeStyle = colors.line; gctx.stroke();

    gctx.beginPath(); path(borders);
    gctx.lineWidth = 0.5; gctx.globalAlpha = 0.7; gctx.stroke(); gctx.globalAlpha = 1;

    const night = gctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.55, cx, cy, R * 1.02);
    night.addColorStop(0, 'rgba(0,0,0,0)');
    night.addColorStop(1, colors.shade);
    gctx.fillStyle = night;
    disc(); gctx.fill();

    gctx.save();                                // rim light
    gctx.shadowColor = colors.glow;
    gctx.shadowBlur = R * 0.05;
    gctx.lineWidth = 1.3;
    gctx.strokeStyle = colors.rim;
    disc(); gctx.stroke();
    gctx.restore();

    // Bangkok marker
    if (geoDistance(BKK, [-rot.lam, -rot.phi]) < Math.PI / 2 - 0.1) {
      const [x, y] = proj(BKK);
      const k = reduce.matches ? 0.4 : ((t / 1000) % 2.4) / 2.4;
      gctx.save();
      gctx.strokeStyle = colors.accent;
      gctx.globalAlpha = 1 - k;
      gctx.lineWidth = 1.2;
      gctx.beginPath(); gctx.arc(x, y, 3 + k * 12, 0, TAU); gctx.stroke();
      gctx.globalAlpha = 1;
      gctx.fillStyle = colors.accent;
      gctx.beginPath(); gctx.arc(x, y, 2.8, 0, TAU); gctx.fill();
      gctx.restore();
    }

    orbit(0, Math.PI);                         // near half of the orbit
    if (sat.front) drawSat(sat);
  }

  /* ---------- loop ---------- */
  let running = false, inView = true, last = 0, dragging = false, resumeAt = 0;
  const SPIN = 2.4; // degrees per second

  function paint(t) {
    drawStars(t);
    if (geoReady) drawGlobe(t);
  }

  function frame(t) {
    if (!running) return;
    const dt = last ? Math.min(64, t - last) : 16;
    last = t;
    if (!dragging && t > resumeAt) rot.lam += (SPIN * dt) / 1000;
    paint(t);
    requestAnimationFrame(frame);
  }

  function update() {
    const shouldRun = inView && !document.hidden && !reduce.matches;
    if (shouldRun && !running) { running = true; last = 0; requestAnimationFrame(frame); }
    if (!shouldRun) { running = false; paint(performance.now()); }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    sizeStars();
    if (geoReady) sizeGlobe();
    paint(performance.now());
  }

  /* ---------- drag to spin ---------- */
  if (geoReady) {
    let px = 0, py = 0;
    globeCanvas.addEventListener('pointerdown', (e) => {
      dragging = true; px = e.clientX; py = e.clientY;
      globeCanvas.setPointerCapture(e.pointerId);
      globeCanvas.classList.add('dragging');
    });
    globeCanvas.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      rot.lam += (e.clientX - px) * 0.3;
      rot.phi = Math.max(-60, Math.min(60, rot.phi - (e.clientY - py) * 0.3));
      px = e.clientX; py = e.clientY;
      if (!running) paint(performance.now());
    });
    const end = () => {
      dragging = false;
      resumeAt = performance.now() + 1200;
      globeCanvas.classList.remove('dragging');
    };
    globeCanvas.addEventListener('pointerup', end);
    globeCanvas.addEventListener('pointercancel', end);
  }

  readColors();
  resize();
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; update(); }).observe(hero);
  document.addEventListener('visibilitychange', update);
  reduce.addEventListener?.('change', update);
  window.addEventListener('themechange', () => { readColors(); paint(performance.now()); });
  update();
})();
