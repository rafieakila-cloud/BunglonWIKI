// BunglonWIKI - aplikasi utama (vanilla JS, CDN: marked, highlight.js)

let currentId = ARTICLES[0]?.id;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const navList = $('#navList');
const popularList = $('#popularList');
const articleTitle = $('#articleTitle');
const articleBody = $('#articleBody');
const articleCategory = $('#articleCategory');
const searchInput = $('#searchInput');
const filterInput = $('#filterInput');
const installBtn = $('#installBtn');
const installPrompt = $('#installPrompt');
const confirmInstall = $('#confirmInstall');
const dismissInstall = $('#dismissInstall');
const toggleSidebar = $('#toggleSidebar');

const REPO = 'https://github.com/afif72an/BunglonWIKI';

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function item(a) {
  return `<li><a href="#${a.id}" data-id="${a.id}" class="${a.id === currentId ? 'active' : ''}">${escapeHtml(a.title)}</a></li>`;
}

function renderNav() {
  navList.innerHTML = ARTICLES.map(item).join('');
  // Popular pick — first 5 articles
  popularList.innerHTML = ARTICLES.slice(0, 6).map(item).join('');
}

function renderArticle(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;
  currentId = id;
  articleBody.classList.add('loading');
  articleTitle.textContent = article.title;
  articleCategory.textContent = article.category || '';
  articleBody.innerHTML = marked.parse(article.body);
  // Highlight all code blocks
  $$('pre code').forEach(block => {
    try { hljs.highlightElement(block); } catch (e) { /* ignore */ }
  });
  setTimeout(() => articleBody.classList.remove('loading'), 150);
  renderNav();
  window.location.hash = id;
  $('#content').scrollTop = 0;
}

function searchAll(q) {
  const needle = q.trim().toLowerCase();
  navList.innerHTML = ARTICLES
    .filter(a => !needle || a.title.toLowerCase().includes(needle) || a.body.toLowerCase().includes(needle))
    .map(item).join('') || '<li><em class="muted" style="padding:8px 12px;display:block">Tidak ada hasil</em></li>';
}
filterInput?.addEventListener('input', (e) => searchAll(e.target.value));
searchInput?.addEventListener('input', (e) => searchAll(e.target.value));
toggleSidebar?.addEventListener('click', () => $('#sidebar').classList.toggle('open'));

// Primary nav → deep-link
$$('.primary-nav a[data-nav]').forEach(a =>
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = a.dataset.nav === 'wiki' ? ARTICLES[0]?.id
                 : a.dataset.nav === 'sources' ? 'sumber-resmi'
                 : 'rilis-2027';
    if (target) renderArticle(target);
    $$('.primary-nav a').forEach(x => x.classList.toggle('active', x === a));
  })
);

// Keyboard shortcut: "/" focuses search
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) {
    e.preventDefault();
    searchInput.focus();
  }
});

// Hash routing
window.addEventListener('hashchange', () => {
  const id = window.location.hash.slice(1);
  if (id) renderArticle(id);
});

// PWA install
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn?.classList.remove('hidden');
  showInstallPrompt();
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  installPrompt.classList.add('hidden');
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add('hidden');
});
confirmInstall?.addEventListener('click', () => installBtn?.click());
dismissInstall?.addEventListener('click', () => installPrompt.classList.add('hidden'));
function showInstallPrompt() { installPrompt.classList.remove('hidden'); }
if (window.matchMedia('(display-mode: standalone)').matches) installBtn?.classList.add('hidden');

// Initial render
const firstId = window.location.hash.slice(1) || ARTICLES[0]?.id;
renderArticle(firstId);
