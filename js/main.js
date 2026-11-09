/* Site behaviour: theme, nav, reveal-on-scroll, work filters. */
(() => {
  const root = document.documentElement;

  /* GitHub Pages serves /work from work.html, so links leave off ".html".
     Opened straight from disk (file://) that doesn't work, so put it back. */
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach((a) => {
      const h = a.getAttribute('href');
      if (h === './') a.setAttribute('href', 'index.html');
      else {
        const m = h.match(/^(work|research|writing|about)(#.*)?$/);
        if (m) a.setAttribute('href', `${m[1]}.html${m[2] || ''}`);
      }
    });
  }

  /* ---------- theme ---------- */
  const toggle = document.querySelector('.theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const BG = { dark: '#090D1B', light: '#F5F3EC' };

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function applyTheme(theme, remember) {
    root.setAttribute('data-theme', theme);
    if (remember) { try { localStorage.setItem('theme', theme); } catch (e) { /* private mode */ } }
    if (metaTheme) metaTheme.setAttribute('content', BG[theme]);
    if (toggle) {
      const isDark = theme === 'dark';
      toggle.querySelector('.tt-label').textContent = isDark ? 'Night' : 'Day';
      toggle.setAttribute('aria-label', `Theme: ${isDark ? 'night' : 'day'}. Switch to ${isDark ? 'day' : 'night'}.`);
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark', false);

  toggle?.addEventListener('click', () => {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  // Follow the OS setting until the visitor picks a theme themselves.
  matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', (e) => {
    if (!saved()) applyTheme(e.matches ? 'light' : 'dark', false);
  });

  /* ---------- nav ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = document.querySelector('.menu-btn');
  const links = document.getElementById('nav-links');
  function setMenu(open) {
    menuBtn?.setAttribute('aria-expanded', String(open));
    links?.classList.toggle('open', open);
    nav?.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
  }
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  links?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  matchMedia('(min-width: 721px)').addEventListener?.('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- work page: filters ---------- */
  const bar = document.querySelector('[data-filters]');
  if (bar) {
    const entries = [...document.querySelectorAll('.entry[data-cat]')];
    const groups = [...document.querySelectorAll('.year')];
    const total = document.querySelector('[data-total]');
    const plural = (n) => `${n} project${n === 1 ? '' : 's'}`;

    bar.querySelectorAll('button[data-filter]').forEach((b) => {
      const f = b.dataset.filter;
      b.querySelector('.n').textContent = f === 'all' ? entries.length : entries.filter((e) => e.dataset.cat === f).length;
    });

    function apply(f) {
      entries.forEach((e) => { e.hidden = !(f === 'all' || e.dataset.cat === f); });
      groups.forEach((g) => {
        const n = g.querySelectorAll('.entry:not([hidden])').length;
        g.hidden = n === 0;
        const c = g.querySelector('.year-count');
        if (c) c.textContent = plural(n);
      });
      if (total) total.textContent = plural(entries.filter((e) => !e.hidden).length);
      bar.querySelectorAll('button[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    }

    bar.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-filter]');
      if (b) apply(b.dataset.filter);
    });
    apply('all');
  }

  /* Deep links like work.html#robocup open that entry's details. */
  function openTarget() {
    if (!location.hash) return;
    const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    el?.querySelector('details')?.setAttribute('open', '');
  }
  openTarget();
  window.addEventListener('hashchange', openTarget);
})();
