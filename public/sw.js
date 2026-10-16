// Service Worker unique du site : notifications push et activation sans rechargement forcé.

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
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
    let payload;
    try {
      payload = event.data.json();
    } catch {
      payload = { body: event.data.text() };
    }
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

  const requestedUrl = event.notification.data?.url || '/admin';
  const url = new URL(requestedUrl, self.location.origin);
  if (url.origin !== self.location.origin) {
    return;
  }
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (new URL(client.url).href === url.href && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(url.href);
      }
    })
  );
});
