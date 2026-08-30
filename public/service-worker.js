// Service Worker pour cache offline et optimisation de performance
// Version 1.2 - Robust error handling

const CACHE_NAME = 'yaodev-cache-v3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/enessence_logo.png',
  '/robots.txt',
  '/sitemap.xml'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching essential assets');
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url => 
          cache.add(url).catch(err => {
            console.warn(`[Service Worker] Failed to cache ${url}:`, err);
          })
        )
      );
    }).catch(err => {
      console.error('[Service Worker] Installation error:', err);
    })
  );
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de Fetch
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // 🔴 FILTER OUT: Requêtes non-HTTP
  // Ceci bloque les chrome-extension, moz-extension, file://, etc.
  if (!url.protocol.startsWith('http')) {
    console.log('[Service Worker] Ignoring non-HTTP request:', url.protocol);
    return;
  }

  // Navigator requests (page navigation) - critical for SPA
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone).catch(err => {
                console.warn('[Service Worker] Cache put error:', err);
              });
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || caches.match('/index.html').catch(() => new Response('Offline'));
          });
        })
    );
    return;
  }

  // External domain requests - don't cache
  if (url.hostname !== location.hostname) {
    event.respondWith(fetch(request).catch(() => new Response('Offline', { status: 503 })));
    return;
  }

  // Local resources - network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone).catch(err => {
              console.warn('[Service Worker] Cache put error:', err);
            });
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).catch(() => {
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Not found', { status: 404 });
        });
      })
  );
});

// Message events
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
