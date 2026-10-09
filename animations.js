/* ==========================================================================
   JUZLY INTEGRATED SOLUTIONS — INTERACTION & ANIMATION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  // initMagneticButtons removed to prevent button shake
  initCardTilt();
});

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Mark that JS is active for progressive enhancement
  document.documentElement.classList.add('js-reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: make all immediately active
    reveals.forEach(el => el.classList.add('active'));
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(el => {
      const target = el.getAttribute('data-target') || '0';
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + target + suffix;
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = (target * easeProgress).toFixed(target % 1 === 0 ? 0 : 1);
          el.textContent = prefix + currentVal + suffix;
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = prefix + target + suffix;
          }
        }
        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}

function initMagneticButtons() {
  // Disabled: Clean CSS hover with translateY(-2px) is used instead to eliminate jitter/shaking.
}

function initCardTilt() {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.glass-card, .hub-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-3px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}