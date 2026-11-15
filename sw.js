// Bacapi Wiki service worker - cache-first untuk app shell, network-first fallback untuk artikel
const CACHE = 'bunglonwiki-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.webmanifest',
  '/icon-192.png',
  '/icon-512.png',
  '/data.js',
  '/app.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Same-origin: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((resp) => {
          if (resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(event.request, copy));
          }
          return resp;
        }).catch(() => caches.match('/index.html'));
      })
    );
    return;
  }
  // CDN assets (marked, hljs): network-first with cache fallback
  event.respondWith(
    fetch(event.request).then((resp) => {
      if (resp.ok) {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
      }
      return resp;
    }).catch(() => caches.match(event.request))
  );
});
