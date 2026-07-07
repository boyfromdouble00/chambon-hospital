/* ══════════════════════════════════════════
   참본 정형외과 — script.js
   GSAP ScrollTrigger + Lenis Smooth Scroll
   ══════════════════════════════════════════ */

/* ── Lenis Smooth Scroll ── */
const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* Connect Lenis to GSAP ScrollTrigger */
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

/* ── Navigation scroll effect ── */
const nav = document.getElementById('nav');
let navScrollTween;

function updateNav() {
  const scrolled = window.scrollY > 40;
  if (scrolled && !nav.classList.contains('scrolled')) {
    nav.classList.add('scrolled');
  } else if (!scrolled && nav.classList.contains('scrolled')) {
    nav.classList.remove('scrolled');
  }
}

lenis.on('scroll', ({ scroll }) => {
  updateNav();
});

/* Smooth nav anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, { offset: -80 });
    }
  });
});

/* ── Hero Entrance ── */
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTL
  .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, 0.1)
  .to('.hero-title-line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.2 }, 0.3)
  .to('.hero-desc', { opacity: 1, y: 0, duration: 0.8 }, 0.7)
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.7 }, 0.9);

/* ── Hero Parallax ── */
gsap.to('.hero-images', {
  y: '8%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.2,
  },
});

/* Each image layer moves at different speed */
document.querySelectorAll('.hero-img-layer').forEach((layer) => {
  const depth = parseFloat(layer.dataset.depth) || 0.5;
  gsap.to(layer, {
    y: `${depth * 12}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8 + depth * 0.8,
    },
  });
});

/* ── Fade-Up Reveals ── */
const fadeUps = document.querySelectorAll('.fade-up');
fadeUps.forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    }
  );
});

/* ── Fade-Up Delayed ── */
const fadeUpDelayed = document.querySelectorAll('.fade-up-delayed');
fadeUpDelayed.forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 48 },
    {
      opacity: 1, y: 0, duration: 1, delay: 0.25, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom-=100',
        toggleActions: 'play none none none',
      },
    }
  );
});

/* ── Staggered Treatment Cards ── */
const cardGrids = document.querySelectorAll('.treatment-grid');
cardGrids.forEach((grid) => {
  const cards = grid.querySelectorAll('.stagger-card');
  gsap.fromTo(cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top bottom-=60',
        toggleActions: 'play none none none',
      },
    }
  );
});

/* ── Rehab Full-Image Parallax ── */
gsap.to('.full-width-image', {
  y: '6%',
  scale: 1.03,
  ease: 'none',
  scrollTrigger: {
    trigger: '.full-image-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
});

/* ── Info Cards Stagger ── */
const infoGrids = document.querySelectorAll('.info-grid');
infoGrids.forEach((grid) => {
  const cards = grid.querySelectorAll('.fade-up');
  gsap.fromTo(cards,
    { opacity: 0, y: 36 },
    {
      opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top bottom-=60',
        toggleActions: 'play none none none',
      },
    }
  );
});

/* ── Split-section image reveal ── */
document.querySelectorAll('.split-image img').forEach((img) => {
  gsap.fromTo(img,
    { scale: 1.06, opacity: 0.85 },
    {
      scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: img.closest('.split-section'),
        start: 'top bottom-=80',
        toggleActions: 'play none none none',
      },
    }
  );
});