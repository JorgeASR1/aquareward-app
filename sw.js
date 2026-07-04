// AquaReward — service worker: precache de la app + caché de tipografías.
// Estrategia: cache-first para recursos propios (la app funciona 100% offline
// tras la primera visita); stale-while-revalidate para Google Fonts.
const VERSION = 'aquareward-v2';
const FONT_CACHE = VERSION + '-fonts';
const CORE = [
  './',
  './index.html',
  './app.js',
  './reportes.html',
  './manifest.webmanifest',
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './assets/essbio-logo.png',
  './assets/tubul-rural.jpg',
  './assets/cabrero-rural.jpg',
  './assets/logo-light.png',
  './assets/logo-dark.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== VERSION && k !== FONT_CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    // ignoreSearch: reportes.html llega con ?theme=claro|oscuro
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then((hit) =>
        hit ||
        fetch(e.request)
          .then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(e.request, copy));
            return res;
          })
          .catch(() =>
            e.request.mode === 'navigate' ? caches.match('./index.html') : undefined
          )
      )
    );
    return;
  }

  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(
      caches.open(FONT_CACHE).then(async (cache) => {
        const hit = await cache.match(e.request);
        const net = fetch(e.request)
          .then((res) => { cache.put(e.request, res.clone()); return res; })
          .catch(() => hit);
        return hit || net;
      })
    );
  }
});
