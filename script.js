const progress = document.querySelector('#progress');
const rails = [...document.querySelectorAll('.rail-link')];
const cards = [...document.querySelectorAll('.project-card')];

function updateProgress() {
  const range = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Theme appearance toggle (Apple Pro Dark default + Studio Light mode)
const themeToggle = document.querySelector('#theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeMeta) themeMeta.setAttribute('content', '#f5f5f7');
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeMeta) themeMeta.setAttribute('content', '#000000');
  }
}
try {
  const savedTheme = localStorage.getItem('annie-portfolio-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') applyTheme(savedTheme);
} catch {}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('annie-portfolio-theme', next); } catch {}
  });
}

function setActiveProject(id) {
  rails.forEach(link => {
    const active = link.dataset.project === id;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'location');
      const rail = link.parentElement;
      if (rail && rail.scrollWidth > rail.clientWidth) {
        const targetLeft = link.offsetLeft - (rail.clientWidth - link.offsetWidth) / 2;
        rail.scrollTo({ left: Math.max(0, targetLeft), behavior: 'auto' });
      }
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if ('IntersectionObserver' in window) {
  const currentObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) setActiveProject(entry.target.id);
  }, { rootMargin: '-12% 0px -66% 0px', threshold: 0 });
  cards.forEach(card => currentObserver.observe(card));
  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  }, { threshold: 0.04 });
  cards.forEach(card => revealObserver.observe(card));
} else {
  cards.forEach(card => card.classList.add('in-view'));
}

rails.forEach(link => link.addEventListener('click', () => setActiveProject(link.dataset.project)));
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (cards.some(card => card.id === id)) setActiveProject(id);
});
if (cards.some(card => card.id === location.hash.slice(1))) setActiveProject(location.hash.slice(1));
document.querySelector('#year').textContent = new Date().getFullYear();

// Inspect real screenshots without leaving the project index.
const viewer = document.createElement('dialog');
viewer.className = 'image-viewer';
viewer.setAttribute('aria-label', 'Project screenshot');
viewer.innerHTML = '<div class="viewer-bar"><p id="viewer-caption"></p><button type="button" aria-label="Close screenshot">Done</button></div><img alt="">';
document.body.append(viewer);
let imageTrigger;
function openImage(img) {
  imageTrigger = img;
  viewer.querySelector('img').src = img.src;
  viewer.querySelector('img').alt = img.alt;
  viewer.querySelector('p').textContent = img.alt;
  viewer.showModal();
}
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => imageTrigger?.focus());
document.querySelectorAll('.doodle-game-shots img,.neon-gallery img,.fridge-screenshots img,.staridol-screenshots img').forEach(img => {
  img.classList.add('image-open');
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', 'Enlarge: ' + img.alt);
  img.addEventListener('click', () => openImage(img));
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openImage(img);
    }
  });
});

window.addEventListener('resize', updateProgress, { passive: true });

// Shared large screenshot carousel behavior for Staridol, Mini Fridge, and Doodle Dolls.
function initScreenshotGallery(project, prefix) {
  const root = document.getElementById(project);
  const track = root?.querySelector(
    project === 'dolls' ? '.doodle-game-shots' :
    project === 'staridol' ? '.staridol-screenshots' :
    '.fridge-screenshots'
  );
  const count = root?.querySelector('.' + prefix + '-gallery-count');
  const prev = root?.querySelector('.' + prefix + '-prev');
  const next = root?.querySelector('.' + prefix + '-next');
  if (!track || !prev || !next || !count) return;
  const frames = [...track.querySelectorAll('figure')];
  let index = 0;
  const refresh = () => {
    const newIndex = Math.max(0, Math.min(frames.length - 1, Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
    index = newIndex;
    count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(frames.length).padStart(2, '0');
    prev.disabled = index === 0;
    next.disabled = index === frames.length - 1;
  };
  const go = direction => {
    const target = Math.max(0, Math.min(frames.length - 1, index + direction));
    index = target;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
    count.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(frames.length).padStart(2, '0');
    prev.disabled = index === 0;
    next.disabled = index === frames.length - 1;
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', refresh, { passive: true });
  window.addEventListener('resize', refresh, { passive: true });
  refresh();
}
initScreenshotGallery('fridge', 'fridge');
initScreenshotGallery('dolls', 'doodle');
initScreenshotGallery('staridol', 'staridol');
