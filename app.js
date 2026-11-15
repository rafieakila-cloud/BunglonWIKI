// Bacapi Wiki - aplikasi utama (vanilla JS, CDN: marked, highlight.js)

// ARTICLES disediakan global oleh data.js (konstanta lexical scope)
let currentId = ARTICLES[0]?.id;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const navList = $('#navList');
const articleTitle = $('#articleTitle');
const articleBody = $('#articleBody');
const articleCategory = $('#articleCategory');
const githubEdit = $('#githubEdit');
const searchInput = $('#searchInput');
const installBtn = $('#installBtn');
const installPrompt = $('#installPrompt');
const confirmInstall = $('#confirmInstall');
const dismissInstall = $('#dismissInstall');

const REPO = 'https://github.com/bacapi/wiki';

function renderNav() {
  navList.innerHTML = ARTICLES.map(a =>
    `<li><a href="#${a.id}" data-id="${a.id}" class="${a.id === currentId ? 'active' : ''}">${escapeHtml(a.title)}</a></li>`
  ).join('');
}

function renderArticle(id) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return;
  currentId = id;
  articleTitle.textContent = article.title;
  articleCategory.textContent = article.category || '';
  articleBody.innerHTML = marked.parse(article.body);
  githubEdit.href = `${REPO}/edit/main/docs/${article.id}.md`;
  // Highlight code blocks
  $$('pre code').forEach(block => hljs.highlightElement(block));
  renderNav();
  window.location.hash = id;
  // scroll content to top
  $('#content').scrollTop = 0;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function searchAll(q) {
  const needle = q.trim().toLowerCase();
  navList.innerHTML = ARTICLES
    .filter(a => !needle || a.title.toLowerCase().includes(needle) || a.body.toLowerCase().includes(needle))
    .map(a => `<li><a href="#${a.id}" data-id="${a.id}" class="${a.id === currentId ? 'active' : ''}">${escapeHtml(a.title)}</a></li>`)
    .join('');
}

// events
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    e.preventDefault();
    renderArticle(a.getAttribute('href').slice(1));
  }
});
searchInput.addEventListener('input', (e) => searchAll(e.target.value));

window.addEventListener('hashchange', () => {
  const id = window.location.hash.slice(1);
  if (id) renderArticle(id);
});

// PWA install
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
  showInstallPrompt();
});
installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  if (navigator.standalone) installBtn.classList.add('hidden');
  deferredPrompt = null;
});
confirmInstall?.addEventListener('click', async () => {
  if (!deferredPrompt) { installPrompt.classList.add('hidden'); return; }
  installPrompt.classList.add('hidden');
  installBtn.click();
});
dismissInstall?.addEventListener('click', () => installPrompt.classList.add('hidden'));
function showInstallPrompt() { installPrompt.classList.remove('hidden'); }

if (window.matchMedia('(display-mode: standalone)').matches) {
  installBtn?.classList.add('hidden');
}

// initial render
const firstId = window.location.hash.slice(1) || ARTICLES[0]?.id;
renderArticle(firstId);
