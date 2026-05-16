// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── SMOOTH ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOpts = { rootMargin: '-40% 0px -50% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, observerOpts);

sections.forEach(s => sectionObserver.observe(s));

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll(
  '.product-card, .project-item, .project-item-sm, .news-group, .about-layout, .contact-layout, .stat'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION for hero stats ──
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        const sup = el.querySelector('sup');
        if (!isNaN(num)) {
          el.textContent = '0';
          if (sup) el.appendChild(sup);
          setTimeout(() => {
            let cur = 0;
            const inc = Math.max(1, Math.ceil(num / 60));
            const t = setInterval(() => {
              cur += inc;
              if (cur >= num) { cur = num; clearInterval(t); }
              el.textContent = cur;
              if (sup) el.appendChild(sup);
            }, 20);
          }, 600);
        }
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
