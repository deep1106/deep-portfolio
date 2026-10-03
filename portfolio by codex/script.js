const particleCanvas = document.querySelector('.ambient-particles');
const particleContext = particleCanvas?.getContext('2d');

if (particleCanvas && particleContext) {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let particlePoints = [];
  let pointerPosition = null;
  let animationFrame = 0;
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  function drawParticles(timestamp = 0) {
    const context = particleContext;
    context.clearRect(0, 0, viewportWidth, viewportHeight);
    const elapsed = timestamp / 1000;
    const interactionRadius = 112;

    for (const point of particlePoints) {
      let x = point.x + Math.sin(elapsed * 0.45 + point.phase) * 1.4;
      let y = point.y + Math.cos(elapsed * 0.38 + point.phase) * 1.8;
      let influence = 0;

      if (pointerPosition && !motionQuery.matches) {
        const deltaX = x - pointerPosition.x;
        const deltaY = y - pointerPosition.y;
        const distance = Math.hypot(deltaX, deltaY);
        if (distance < interactionRadius && distance > 0) {
          influence = 1 - distance / interactionRadius;
          const push = influence * 18;
          x += (deltaX / distance) * push;
          y += (deltaY / distance) * push;
        }
      }

      const radius = 1 + influence * 1.15;
      const opacity = 0.22 + influence * 0.52;
      const color = point.green ? `135,200,77,${opacity}` : `73,200,240,${opacity}`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${color})`;
      context.shadowBlur = influence * 9;
      context.shadowColor = `rgba(${color})`;
      context.fill();
    }

    context.shadowBlur = 0;
    animationFrame = motionQuery.matches ? 0 : window.requestAnimationFrame(drawParticles);
  }

  function resizeParticleCanvas() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    particleCanvas.width = Math.round(viewportWidth * pixelRatio);
    particleCanvas.height = Math.round(viewportHeight * pixelRatio);
    particleContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const spacing = viewportWidth < 600 ? 38 : 46;
    particlePoints = [];
    for (let y = spacing / 2; y < viewportHeight; y += spacing) {
      for (let x = spacing / 2; x < viewportWidth; x += spacing) {
        particlePoints.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          phase: Math.random() * Math.PI * 2,
          green: Math.random() < 0.18,
        });
      }
    }

    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = window.requestAnimationFrame(drawParticles);
  }

  window.addEventListener('pointermove', event => {
    pointerPosition = { x: event.clientX, y: event.clientY };
  }, { passive: true });
  window.addEventListener('pointerleave', () => { pointerPosition = null; }, { passive: true });
  window.addEventListener('resize', resizeParticleCanvas, { passive: true });
  motionQuery.addEventListener('change', () => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    if (motionQuery.matches) drawParticles();
    else animationFrame = window.requestAnimationFrame(drawParticles);
  });
  resizeParticleCanvas();
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project[data-category]')];
const emptyState = document.querySelector('.empty-state');

function filterProjects(category) {
  let visibleCount = 0;
  for (const project of projects) {
    const visible = category === 'all' || project.dataset.category.split(' ').includes(category);
    project.hidden = !visible;
    if (visible) visibleCount += 1;
  }
  emptyState.hidden = visibleCount > 0;
  for (const button of filterButtons) {
    const active = button.dataset.filter === category;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
}

for (const button of filterButtons) {
  button.addEventListener('click', () => filterProjects(button.dataset.filter));
}

emptyState.querySelector('button').addEventListener('click', () => filterProjects('all'));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !expanded);
});

navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('is-open');
  }
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

const typingText = document.querySelector('.typing-visual');
const textToType = typingText.dataset.text;

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  typingText.textContent = textToType;
  typingText.classList.add('is-complete');
} else {
  typingText.textContent = '';
  let characterIndex = 0;

  function typeNextCharacter() {
    if (characterIndex >= textToType.length) {
      typingText.classList.add('is-complete');
      return;
    }
    typingText.textContent += textToType[characterIndex];
    characterIndex += 1;
    window.setTimeout(typeNextCharacter, 65);
  }

  window.setTimeout(typeNextCharacter, 280);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealItems = document.querySelectorAll('.work .section-heading, .project, .approach-heading, .approach-steps li, .about-layout, .contact-intro, .contact-option');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });

  for (const item of revealItems) {
    item.classList.add('reveal-on-view');
    revealObserver.observe(item);
  }
}
