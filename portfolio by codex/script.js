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
