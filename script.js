/* ══════════════════════════════════════════
   참본 정형외과 — script.js
   GSAP ScrollTrigger + Lenis Smooth Scroll
   ══════════════════════════════════════════ */

/* ── Lenis Smooth Scroll ── */
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

/* Connect Lenis to GSAP ScrollTrigger */
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* Force ScrollTrigger refresh after Lenis wrapper is ready */
setTimeout(() => ScrollTrigger.refresh(), 200);

/* ── Navigation scroll effect ── */
const nav = document.getElementById('nav');
lenis.on('scroll', ({ scroll }) => {
  if (scroll > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* Smooth nav anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -80 });
  });
});

/* ──────────────────────────────────────────
   HERO — Entrance + Parallax
   ────────────────────────────────────────── */
const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
heroTL
  .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7 }, 0.15)
  .to('.hero-title-line', { opacity: 1, y: 0, duration: 0.85, stagger: 0.18 }, 0.35)
  .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, 0.75)
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, 0.95)
  .fromTo('.hero-card-right',
    { x: 80, opacity: 0, scale: 0.92, rotate: -2 },
    { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'power3.out' }, 0.55)
  .fromTo('.hero-card-left',
    { x: -70, opacity: 0, scale: 0.92, rotate: 2 },
    { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'power3.out' }, 0.7);

/* Main bg parallax */
gsap.to('.hero-bg', {
  y: '8%', scale: 1.04,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
});

/* Floating cards parallax — opposite directions */
gsap.to('.hero-card-right', {
  y: '-12%', x: '-4%',
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.9 },
});
gsap.to('.hero-card-left', {
  y: '14%', x: '5%',
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.1 },
});

/* ──────────────────────────────────────────
   .fade-up — Class-based sweep (covers all sections)
   ────────────────────────────────────────── */
document.querySelectorAll('.fade-up').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: el, start: 'top bottom-=100', once: true,
      },
    }
  );
});

/* ──────────────────────────────────────────
   .fade-up-delayed — Same but with lag
   ────────────────────────────────────────── */
document.querySelectorAll('.fade-up-delayed').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
      scrollTrigger: {
        trigger: el, start: 'top bottom-=100', once: true,
      },
    }
  );
});

/* ──────────────────────────────────────────
   .stagger-card — Card grid stagger
   ────────────────────────────────────────── */
const cardGrids = document.querySelectorAll('.treatment-grid, .info-grid');
cardGrids.forEach((grid) => {
  const cards = grid.querySelectorAll('.stagger-card');
  if (!cards.length) return;
  gsap.fromTo(cards,
    { opacity: 0, y: 48, scale: 0.92 },
    {
      opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: {
        trigger: grid, start: 'top bottom-=60', once: true,
      },
    }
  );
});

/* ──────────────────────────────────────────
   ENHANCED: Children inside fade-up containers
   (no double-animation — targets inner elements)
   ────────────────────────────────────────── */

/* Philosophy — rotationX text reveal */
gsap.fromTo('.philosophy .section-title span',
  { opacity: 0, y: 40, rotationX: 10 },
  {
    opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.2, ease: 'power4.out',
    scrollTrigger: { trigger: '.philosophy .section-title', start: 'top bottom-=80', once: true },
  }
);

/* Staff — feature list line-by-line */
gsap.fromTo('#staff .feature-list li',
  { opacity: 0, x: -20 },
  {
    opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#staff .feature-list', start: 'top bottom-=60', once: true },
  }
);
/* Staff image: scale-in */
gsap.fromTo('#staff .split-image',
  { opacity: 0, scale: 0.88, rotate: 1.5 },
  {
    opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'power4.out',
    scrollTrigger: { trigger: '#staff .split-image', start: 'top bottom-=80', once: true },
  }
);

/* Equipment — parallax split */
gsap.fromTo('#equipment .split-image',
  { y: 40, opacity: 0, scale: 1.05 },
  {
    y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#equipment .split-image', start: 'top bottom-=80', once: true },
  }
);
gsap.fromTo('#equipment .feature-list li',
  { opacity: 0, x: 20 },
  {
    opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#equipment .feature-list', start: 'top bottom-=60', once: true },
  }
);

/* Consultation — enhanced split */
gsap.fromTo('#consultation .split-image',
  { opacity: 0, y: 50, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out',
    scrollTrigger: { trigger: '#consultation .split-image', start: 'top bottom-=80', once: true },
  }
);

/* ──────────────────────────────────────────
   REHAB — Pin + scale parallax with content overlay
   ────────────────────────────────────────── */
gsap.to('.full-width-image', {
  scale: 1.08, y: '5%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.full-image-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

/* ──────────────────────────────────────────
   CARD HOVER — 3D tilt
   ────────────────────────────────────────── */
document.querySelectorAll('.treatment-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 8, rotateX: -y * 8,
      boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
      duration: 0.4, ease: 'power2.out',
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0, rotateX: 0,
      boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
      duration: 0.6, ease: 'power2.out',
    });
  });
});

/* ──────────────────────────────────────────
   GLOBAL PARALLAX — elements with data-speed
   ────────────────────────────────────────── */
document.querySelectorAll('[data-speed]').forEach(el => {
  const speed = parseFloat(el.dataset.speed);
  gsap.to(el, {
    y: () => speed * (window.innerHeight * 0.15),
    ease: 'none',
    scrollTrigger: {
      trigger: el.closest('section') || el.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1 / (speed || 0.5),
    },
  });
});