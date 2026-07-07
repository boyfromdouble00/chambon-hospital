/* ══════════════════════════════════════════
   참본 정형외과 — script.js
   GSAP ScrollTrigger + Lenis
   Reference-level scroll choreography
   ══════════════════════════════════════════ */

/* ── Lenis ── */
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
setTimeout(() => ScrollTrigger.refresh(), 200);

/* ── Nav ── */
const nav = document.getElementById('nav');
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('scrolled', scroll > 40);
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) lenis.scrollTo(t, { offset: -80 });
  });
});

/* ══════════════════════════════════════════
   HERO — 3D Equipment Showcase
   ══════════════════════════════════════════ */
gsap.set('.hero-content > *', { opacity: 0, y: 30 });
gsap.set('.hero-card', { opacity: 0 });

/* Entrance — cards orbit in from outer edges */
const heroTL = gsap.timeline({ defaults: { ease: 'power4.out' } });
heroTL
  .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7 }, 0.2)
  .to('.hero-title-line', { opacity: 1, y: 0, duration: 0.85, stagger: 0.18 }, 0.4)
  .to('.hero-desc', { opacity: 1, y: 0, duration: 0.7 }, 0.8)
  .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6 }, 1.0)
  .fromTo('.hero-card-right',
    { x: 120, y: -40, opacity: 0, scale: 0.7, rotate: -8, rotateY: 20 },
    { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' }, 0.55)
  .fromTo('.hero-card-left',
    { x: -100, y: 40, opacity: 0, scale: 0.7, rotate: 6, rotateY: -18 },
    { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' }, 0.7);

/* ── Mouse-driven 3D depth ── */
const hero = document.querySelector('.hero');
const cardRight = document.querySelector('.hero-card-right');
const cardLeft = document.querySelector('.hero-card-left');
const heroBg = document.querySelector('.hero-bg');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 ~ 0.5
  const my = (e.clientY - rect.top) / rect.height - 0.5;    // -0.5 ~ 0.5

  /* BG shifts subtly opposite to mouse */
  gsap.to(heroBg, {
    x: mx * -12, y: my * -12,
    duration: 1.2, ease: 'power2.out',
  });

  /* Right card orbits in 3D — follows mouse with depth */
  gsap.to(cardRight, {
    x: mx * 50, y: my * 50,
    rotateY: mx * 14, rotateX: -my * 10, rotate: mx * -3,
    z: 20,
    duration: 1, ease: 'power2.out',
  });

  /* Left card orbits opposite — creates depth contrast */
  gsap.to(cardLeft, {
    x: mx * -40, y: my * -40,
    rotateY: mx * -12, rotateX: my * 8, rotate: mx * 4,
    z: 15,
    duration: 1.1, ease: 'power2.out',
  });

  /* Content shifts slightly with mouse */
  gsap.to(heroContent, {
    x: mx * 16, y: my * 16,
    duration: 1.5, ease: 'power2.out',
  });
});

/* Reset on mouse leave — slow drift back */
hero.addEventListener('mouseleave', () => {
  gsap.to([heroBg, cardRight, cardLeft, heroContent], {
    x: 0, y: 0, rotateY: 0, rotateX: 0, rotate: 0, z: 0,
    duration: 2.5, ease: 'power3.out',
  });
});

/* ── Scroll parallax — cards drift apart on scroll ── */
gsap.to(heroBg, {
  y: '10%', scale: 1.06,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.3 },
});
gsap.to(cardRight, {
  y: '-18%', x: '-8%', rotate: -2, rotateY: 6,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
});
gsap.to(cardLeft, {
  y: '20%', x: '8%', rotate: 3, rotateY: -5,
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.0 },
});

/* ══════════════════════════════════════════
   .fade-up — Universal scroll reveal
   ══════════════════════════════════════════ */
document.querySelectorAll('.fade-up').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 48 }, {
    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top bottom-=100', once: true },
  });
});
document.querySelectorAll('.fade-up-delayed').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 48 }, {
    opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top bottom-=100', once: true },
  });
});

/* ══════════════════════════════════════════
   STATS — Counter-up with section pin
   ══════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '#stats',
  start: 'top center',
  end: 'bottom center',
  onEnter: () => counterUp(),
  once: true,
});

function counterUp() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const parent = el.closest('.stat-item');
    gsap.to(parent, { opacity: 1, duration: 0.3 });
    gsap.fromTo(el, { textContent: 0 }, {
      textContent: target,
      duration: 2.2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      roundProps: 'textContent',
    });
  });
}

/* ══════════════════════════════════════════
   SPLIT SECTIONS — Clip-path image reveal
   ══════════════════════════════════════════ */

/* Staff: image clip-path reveal (curtain open from center) */
gsap.fromTo('#staff .split-image img',
  { clipPath: 'inset(0 50% 0 50%)', scale: 1.1 },
  {
    clipPath: 'inset(0 0% 0 0%)', scale: 1, duration: 1.4, ease: 'power4.inOut',
    scrollTrigger: { trigger: '#staff', start: 'top bottom-=100', once: true },
  }
);
gsap.fromTo('#staff .feature-list li',
  { opacity: 0, x: -24 },
  { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#staff .feature-list', start: 'top bottom-=60', once: true } }
);

/* Equipment: image clip-path reveal */
gsap.fromTo('#equipment .split-image img',
  { clipPath: 'inset(0 50% 0 50%)', scale: 1.1 },
  {
    clipPath: 'inset(0 0% 0 0%)', scale: 1, duration: 1.4, ease: 'power4.inOut',
    scrollTrigger: { trigger: '#equipment', start: 'top bottom-=100', once: true },
  }
);
gsap.fromTo('#equipment .feature-list li',
  { opacity: 0, x: 24 },
  { opacity: 1, x: 0, duration: 0.45, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#equipment .feature-list', start: 'top bottom-=60', once: true } }
);

/* Consultation: image clip-path reveal */
gsap.fromTo('#consultation .split-image img',
  { clipPath: 'inset(0 50% 0 50%)', scale: 1.1 },
  {
    clipPath: 'inset(0 0% 0 0%)', scale: 1, duration: 1.4, ease: 'power4.inOut',
    scrollTrigger: { trigger: '#consultation', start: 'top bottom-=100', once: true },
  }
);

/* ══════════════════════════════════════════
   TREATMENT CARDS — Alternating x-axis slide
   ══════════════════════════════════════════ */
const cards = document.querySelectorAll('.treatment-card');
cards.forEach((card, i) => {
  const fromLeft = i % 2 === 0;
  gsap.fromTo(card,
    { opacity: 0, x: fromLeft ? -70 : 70, scale: 0.88 },
    {
      opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.treatment-grid',
        start: 'top bottom-=40',
        once: true,
      },
      delay: i * 0.1,
    }
  );
});

/* 3D tilt hover */
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 10, rotateX: -y * 10,
      boxShadow: '0 20px 56px rgba(0,0,0,0.13)',
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

/* ══════════════════════════════════════════
   REHAB — Full-section pin + dramatic scale parallax
   ══════════════════════════════════════════ */
ScrollTrigger.create({
  trigger: '.full-image-section',
  start: 'top top',
  end: 'bottom bottom',
  pin: '.full-image-wrapper',
  pinSpacing: true,
  scrub: 0.5,
});

/* Image scale within pinned container */
gsap.fromTo('.full-width-image',
  { scale: 1 },
  {
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.full-image-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
    },
  }
);

/* Content phase-in inside pinned section */
gsap.fromTo('.full-image-content .section-label',
  { opacity: 0, y: 40 },
  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-section', start: 'top+=120 top', end: 'top+=300 top', scrub: 0.5 } }
);
gsap.fromTo('.full-image-content .section-title span',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-section', start: 'top+=200 top', end: 'top+=420 top', scrub: 0.5 } }
);
gsap.fromTo('.full-image-content .section-text',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.full-image-section', start: 'top+=320 top', end: 'top+=520 top', scrub: 0.5 } }
);

/* ══════════════════════════════════════════
   INFO CARDS — Alternating slide
   ══════════════════════════════════════════ */
const infoCards = document.querySelectorAll('#info .info-card');
infoCards.forEach((card, i) => {
  const dirs = [0, 1, 2]; // center, left, right
  const xVals = [0, -60, 60];
  gsap.fromTo(card,
    { opacity: 0, y: 40, x: xVals[i] || 0 },
    {
      opacity: 1, y: 0, x: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: {
        trigger: '#info .info-grid',
        start: 'top bottom-=50',
        once: true,
      },
      delay: i * 0.1,
    }
  );
});

/* ══════════════════════════════════════════
   GLOBAL PARALLAX — [data-speed] elements
   ══════════════════════════════════════════ */
document.querySelectorAll('[data-speed]').forEach(el => {
  const speed = parseFloat(el.dataset.speed) || 0.5;
  gsap.to(el, {
    y: () => speed * (window.innerHeight * 0.18),
    ease: 'none',
    scrollTrigger: {
      trigger: el.closest('section') || el.parentElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1 / speed,
    },
  });
});