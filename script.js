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

/* Floating cards parallax — opposite directions for depth */
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
   PHILOSOPHY — Clip-path text reveal
   ────────────────────────────────────────── */
gsap.fromTo('.philosophy .section-label',
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.philosophy', start: 'top bottom-=120', toggleActions: 'play none none none' },
  }
);
gsap.fromTo('.philosophy .section-title span',
  { opacity: 0, y: 40, rotationX: 10 },
  {
    opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.2, ease: 'power4.out',
    scrollTrigger: { trigger: '.philosophy .section-title', start: 'top bottom-=80', toggleActions: 'play none none none' },
  }
);
gsap.fromTo('.philosophy .section-text',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
    scrollTrigger: { trigger: '.philosophy .section-text', start: 'top bottom-=60', toggleActions: 'play none none none' },
  }
);

/* ──────────────────────────────────────────
   STAFF SECTION — Split reveal (text left, image clip right)
   ────────────────────────────────────────── */
gsap.fromTo('#staff .split-text .section-label',
  { opacity: 0, x: -30 },
  { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#staff', start: 'top bottom-=120', toggleActions: 'play none none none' } }
);
gsap.fromTo('#staff .split-text .section-title span',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#staff .section-title', start: 'top bottom-=100', toggleActions: 'play none none none' } }
);
gsap.fromTo('#staff .feature-list li',
  { opacity: 0, x: -20 },
  { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#staff .feature-list', start: 'top bottom-=60', toggleActions: 'play none none none' } }
);
/* Image: scale-in + subtle rotation */
gsap.fromTo('#staff .split-image',
  { opacity: 0, scale: 0.88, rotate: 1.5 },
  { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: 'power4.out',
    scrollTrigger: { trigger: '#staff', start: 'top bottom-=80', toggleActions: 'play none none none' } }
);

/* ──────────────────────────────────────────
   EQUIPMENT — Parallax split (image parallax up, text fade in)
   ────────────────────────────────────────── */
/* Image parallaxes upward slightly on scroll — gentle reveal */
gsap.fromTo('#equipment .split-image',
  { y: 40, opacity: 0, scale: 1.05 },
  {
    y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#equipment', start: 'top bottom-=80', toggleActions: 'play none none none' },
  }
);
gsap.fromTo('#equipment .split-text .section-label',
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#equipment', start: 'top bottom-=120', toggleActions: 'play none none none' } }
);
gsap.fromTo('#equipment .split-text .section-title span',
  { opacity: 0, y: 35 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#equipment .section-title', start: 'top bottom-=100', toggleActions: 'play none none none' } }
);
gsap.fromTo('#equipment .feature-list li',
  { opacity: 0, x: 20 },
  { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#equipment .feature-list', start: 'top bottom-=60', toggleActions: 'play none none none' } }
);

/* ──────────────────────────────────────────
   TREATMENTS — Cards stagger + hover 3D tilt
   ────────────────────────────────────────── */
gsap.fromTo('#treatments .section-label',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#treatments', start: 'top bottom-=120', toggleActions: 'play none none none' } }
);
gsap.fromTo('#treatments .section-title span',
  { opacity: 0, y: 35 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#treatments .section-title', start: 'top bottom-=100', toggleActions: 'play none none none' } }
);
/* Cards: scale-up stagger from slightly below */
gsap.fromTo('.treatment-card',
  { opacity: 0, y: 60, scale: 0.9 },
  {
    opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.treatment-grid', start: 'top bottom-=50', toggleActions: 'play none none none' },
  }
);

/* Card hover 3D tilt effect */
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
   REHAB — Pin + scale parallax with content overlay reveal
   ────────────────────────────────────────── */
/* Image scales up slowly as section scrolls */
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
/* Content fades in */
gsap.fromTo('.full-image-content .section-label',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-content', start: 'top bottom-=40', toggleActions: 'play none none none' },
  }
);
gsap.fromTo('.full-image-content .section-title span',
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-content .section-title', start: 'top bottom-=20', toggleActions: 'play none none none' },
  }
);
gsap.fromTo('.full-image-content .section-text',
  { opacity: 0, y: 25 },
  {
    opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-content .section-text', start: 'top bottom-=10', toggleActions: 'play none none none' },
  }
);

/* ──────────────────────────────────────────
   CONSULTATION — Split reveal + image clip-path
   ────────────────────────────────────────── */
gsap.fromTo('#consultation .split-text .section-label',
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#consultation', start: 'top bottom-=120', toggleActions: 'play none none none' } }
);
gsap.fromTo('#consultation .split-text .section-title span',
  { opacity: 0, y: 35 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#consultation .section-title', start: 'top bottom-=100', toggleActions: 'play none none none' } }
);
gsap.fromTo('#consultation .section-text',
  { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '#consultation .section-text', start: 'top bottom-=60', toggleActions: 'play none none none' } }
);
gsap.fromTo('#consultation .inline-cta',
  { opacity: 0, y: 15 },
  { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out',
    scrollTrigger: { trigger: '#consultation .inline-cta', start: 'top bottom-=40', toggleActions: 'play none none none' } }
);
/* Image reveal from slightly below with scale */
gsap.fromTo('#consultation .split-image',
  { opacity: 0, y: 50, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power4.out',
    scrollTrigger: { trigger: '#consultation', start: 'top bottom-=80', toggleActions: 'play none none none' },
  }
);

/* ──────────────────────────────────────────
   INFO — Counter animation + card stagger
   ────────────────────────────────────────── */
gsap.fromTo('#info .section-label',
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#info', start: 'top bottom-=120', toggleActions: 'play none none none' } }
);
gsap.fromTo('#info .section-title span',
  { opacity: 0, y: 35 },
  { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: { trigger: '#info .section-title', start: 'top bottom-=100', toggleActions: 'play none none none' } }
);
/* Info cards: scale-up stagger */
gsap.fromTo('#info .info-card',
  { opacity: 0, y: 48, scale: 0.92 },
  {
    opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#info .info-grid', start: 'top bottom-=50', toggleActions: 'play none none none' },
  }
);

/* ──────────────────────────────────────────
   FOOTER — Gentle reveal
   ────────────────────────────────────────── */
gsap.fromTo('.footer-inner',
  { opacity: 0, y: 30 },
  {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer', start: 'top bottom-=60', toggleActions: 'play none none none' },
  }
);

/* ──────────────────────────────────────────
   GLOBAL PARALLAX — Elements with data-speed
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

/* ──────────────────────────────────────────
   Scroll-triggered color shift on hero → content
   ────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.hero',
  start: 'bottom bottom',
  end: 'bottom top',
  onLeaveBack: () => { nav.classList.add('scrolled'); },
  /* clean up nav state on re-enter hero */
});