// Service Worker pour Enésense Admin - Notifications Push
const CACHE_NAME = 'enésense-admin-cache-v1';
const OFFLINE_URL = '/admin';

self.addEventListener('install', (event) => {
  // Pas de skipWaiting pour éviter le rechargement forcé
});

self.addEventListener('activate', (event) => {
  // Pas de clients.claim() pour éviter le rechargement forcé
});

// Gestion des notifications push reçues
self.addEventListener('push', (event) => {
  const options = {
    body: '',
    icon: '/enessence_logo.png',
    badge: '/enessence_logo.png',
    vibrate: [200, 100, 200],
    data: {},
    actions: [
      {
        action: 'open',
        title: 'Voir',
        icon: '/enessence_logo.png'
      },
      {
        action: 'close',
        title: 'Fermer'
      }
    ]
  };

  if (event.data) {
    const payload = event.data.json();
    options.body = payload.body || 'Nouvelle notification';
    options.title = payload.title || 'Enésense Admin';
    options.data = payload.data || {};
    if (payload.icon) options.icon = payload.icon;
    if (payload.badge) options.badge = payload.badge;
    if (payload.actions) options.actions = payload.actions;
  } else {
    options.title = 'Enésense Admin';
    options.body = 'Nouvelle notification';
  }

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Gestion du clic sur la notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const url = event.notification.data.url || '/admin';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(url) && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url);
      }
    })
  );
});
