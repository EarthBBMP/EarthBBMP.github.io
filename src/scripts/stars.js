// starfield behind every page: 3 depth layers that drift with scroll, plus the odd shooting star
(() => {
  const canvas = document.querySelector('.starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const TAU = Math.PI * 2;
  const SPEED = [0.03, 0.08, 0.16]; // far, mid, near (fraction of scroll)

  let w = 0, h = 0, dpr = 1;
  let stars = [];
  let color = '226, 234, 255', alpha = 0.85;
  let shooting = null, nextShot = 0;

  // seeded so stars stay put on resize
  function rng(seed) {
    return () => {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    color = cs.getPropertyValue('--star').trim() || color;
    alpha = parseFloat(cs.getPropertyValue('--star-alpha')) || alpha;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const rand = rng(1584);
    const n = Math.min(700, Math.round((w * h) / 5200));
    stars = Array.from({ length: n }, () => {
      const p = rand();
      const layer = p < 0.55 ? 0 : p < 0.88 ? 1 : 2;
      return {
        x: rand(), y: rand(), layer,
        r: [0.35, 0.6, 0.95][layer] + rand() * [0.35, 0.5, 0.7][layer],
        a: 0.3 + rand() * 0.7,
        tw: rand() < 0.35 ? 0.5 + rand() * 1.5 : 0,
        ph: rand() * TAU,
      };
    });
    draw(performance.now());
  }

  function spawnShot(t) {
    const fromLeft = Math.random() < 0.5;
    shooting = {
      x: w * (fromLeft ? 0.1 + Math.random() * 0.4 : 0.5 + Math.random() * 0.4),
      y: h * (0.05 + Math.random() * 0.35),
      vx: (fromLeft ? 1 : -1) * (0.55 + Math.random() * 0.3),
      vy: 0.22 + Math.random() * 0.12,
      born: t, life: 900,
    };
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    const sy = reduce.matches ? 0 : window.scrollY;
    ctx.fillStyle = `rgb(${color})`;
    for (const s of stars) {
      let y = (s.y * h - sy * SPEED[s.layer]) % h;
      if (y < 0) y += h;
      let a = s.a * alpha;
      if (s.tw && !reduce.matches) a *= 0.55 + 0.45 * Math.sin((t / 1000) * s.tw + s.ph);
      ctx.globalAlpha = Math.max(0, a);
      ctx.beginPath();
      ctx.arc(s.x * w, y, s.r, 0, TAU);
      ctx.fill();
    }

    // shooting star
    if (shooting) {
      const k = (t - shooting.born) / shooting.life;
      if (k >= 1) shooting = null;
      else {
        const d = k * shooting.life;
        const x = shooting.x + shooting.vx * d, y = shooting.y + shooting.vy * d;
        const len = 90 * Math.sin(Math.PI * k);
        const tx = x - shooting.vx * len / Math.hypot(shooting.vx, shooting.vy);
        const ty = y - shooting.vy * len / Math.hypot(shooting.vx, shooting.vy);
        const g = ctx.createLinearGradient(x, y, tx, ty);
        g.addColorStop(0, `rgba(${color}, ${alpha})`);
        g.addColorStop(1, `rgba(${color}, 0)`);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  // ~30fps is plenty for twinkling
  let running = false, lastDraw = 0, dirty = false;
  function frame(t) {
    if (!running) return;
    if (!shooting && t > nextShot) {
      if (nextShot) spawnShot(t);
      nextShot = t + 7000 + Math.random() * 9000;
    }
    if (dirty || shooting || t - lastDraw > 33) { draw(t); lastDraw = t; dirty = false; }
    requestAnimationFrame(frame);
  }

  function update() {
    const shouldRun = !document.hidden && !reduce.matches;
    if (shouldRun && !running) { running = true; requestAnimationFrame(frame); }
    if (!shouldRun) { running = false; shooting = null; draw(performance.now()); }
  }

  readColors();
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', () => { dirty = true; }, { passive: true });
  document.addEventListener('visibilitychange', update);
  reduce.addEventListener?.('change', update);
  window.addEventListener('themechange', () => { readColors(); draw(performance.now()); });
  update();
})();
