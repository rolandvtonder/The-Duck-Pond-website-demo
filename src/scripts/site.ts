import Lenis from 'lenis';

/**
 * One rAF loop for the whole page, as in the reference: Lenis advances first,
 * then each scroll-driven piece reads its own rect and writes styles directly.
 * Nothing re-renders while scrolling.
 */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

let lenis: Lenis | null = null;
const subscribers = new Set<(t: number) => void>();

function startScroll() {
  if (!reduced) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9, anchors: {offset: -24}});
  }
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
  // Page scripts (gallery lightbox, etc.) pause smooth scroll with these events.
  window.addEventListener('scroll:stop', () => lenis?.stop());
  window.addEventListener('scroll:start', () => lenis?.start());
}

/**
 * Page heroes: as you scroll on, the photo blurs, dims and shrinks back,
 * which reads as the camera pulling away (the reference's page transition).
 */
function heroes() {
  document.querySelectorAll<HTMLElement>('[data-hero]').forEach((root) => {
    const stage = root.querySelector<HTMLElement>('[data-hero-stage]');
    if (!stage || reduced) return;
    let last = -1;
    subscribers.add(() => {
      const r = root.getBoundingClientRect();
      const h = window.innerHeight;
      const p = clamp(-r.top / r.height);
      if (Math.abs(p - last) < 0.001) return;
      last = p;
      stage.style.transform = `translate3d(0, ${(p * r.height * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
      stage.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      // Stop the slideshow work once the hero is out of sight.
      stage.style.visibility = r.bottom < 0 || r.top > h ? 'hidden' : 'visible';
    });
  });
}

/** Three panels slide in from the right, one after another, once seen. */
function panels() {
  document.querySelectorAll<HTMLElement>('.panels').forEach((el) => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.classList.add('is-shown');
        io.disconnect();
      },
      {threshold: 0.2},
    );
    io.observe(el);
  });
}

/** Adds .is-in to each [data-reveal] the first time it scrolls into view. */
function reveals() {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }),
    {rootMargin: '0px 0px -8% 0px'},
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}

/** Sizes a one-line wordmark so it spans its parent exactly. */
function fitText() {
  document.querySelectorAll<HTMLElement>('[data-fit]').forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    const fit = () => {
      el.style.fontSize = '100px';
      const s = getComputedStyle(parent);
      const available = parent.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
      const natural = el.offsetWidth;
      if (natural > 0) el.style.fontSize = `${(100 * available) / natural}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    new ResizeObserver(fit).observe(parent);
  });
}

/**
 * The menu: ink, sage and paper slabs wipe in from the right; hovering an item
 * ripples it like water on the pond (SVG turbulence + displacement).
 */
function menu() {
  const root = document.querySelector<HTMLElement>('[data-menu]');
  const toggles = document.querySelectorAll<HTMLButtonElement>('[data-menu-toggle]');
  if (!root || !toggles.length) return;
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  const plus = document.querySelector<HTMLElement>('[data-menu-plus]');
  const opener = toggles[0];
  let open = false;

  const set = (next: boolean) => {
    open = next;
    root.toggleAttribute('data-open', open);
    root.toggleAttribute('inert', !open);
    root.setAttribute('aria-hidden', String(!open));
    root.classList.toggle('pointer-events-none', !open);
    opener.setAttribute('aria-expanded', String(open));
    opener.classList.toggle('is-open', open);
    if (label) label.textContent = open ? 'Close' : 'Menu';
    if (plus) plus.style.transform = open ? 'rotate(45deg)' : '';
    if (open) {
      lenis?.stop();
      window.setTimeout(() => root.querySelector<HTMLElement>('.menu-link')?.focus({preventScroll: true}), reduced ? 0 : 450);
    } else {
      lenis?.start();
    }
  };

  toggles.forEach((b) =>
    b.addEventListener('click', () => {
      const wasOpen = open;
      set(!open);
      if (wasOpen) opener.focus();
    }),
  );
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) {
      set(false);
      opener.focus();
    }
  });

  // Ripple: animate the filter only while something is hovered.
  const turb = root.querySelector<SVGFETurbulenceElement>('feTurbulence');
  const disp = root.querySelector<SVGFEDisplacementMapElement>('feDisplacementMap');
  let raf = 0;
  const stop = () => cancelAnimationFrame(raf);
  root.querySelectorAll<HTMLAnchorElement>('.menu-link').forEach((a) => {
    const start = () => {
      if (reduced) return;
      stop();
      root.querySelectorAll<HTMLElement>('.menu-link').forEach((x) => (x.style.filter = 'none'));
      a.style.filter = 'url(#ripple)';
      let t = 0;
      let amp = 0;
      const loop = () => {
        t += 0.016;
        amp = Math.min(1, amp + 0.08);
        turb?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
        turb?.setAttribute('seed', String(Math.floor(t * 12) % 50));
        disp?.setAttribute('scale', (amp * 9).toFixed(2));
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    const end = () => {
      stop();
      a.style.filter = 'none';
    };
    a.addEventListener('mouseenter', start);
    a.addEventListener('mouseleave', end);
    a.addEventListener('blur', end);
  });
}

document.documentElement.classList.add('js');
startScroll();
heroes();
panels();
reveals();
fitText();
menu();
