// Service Worker unique du site : notifications push et activation sans rechargement forcé.

const BADGE_DATABASE = 'bricona-push-notifications';
const BADGE_STORE = 'state';
const BADGE_KEY = 'unread';

const openBadgeDatabase = () => new Promise((resolve, reject) => {
  const request = indexedDB.open(BADGE_DATABASE, 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore(BADGE_STORE, { keyPath: 'key' });
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

const getBadgeCount = async () => {
  const database = await openBadgeDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(BADGE_STORE, 'readonly');
    const request = transaction.objectStore(BADGE_STORE).get(BADGE_KEY);
    request.onsuccess = () => resolve(request.result?.count || 0);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error);
  });
};

const setBadgeCount = async (count) => {
  const database = await openBadgeDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(BADGE_STORE, 'readwrite');
    transaction.objectStore(BADGE_STORE).put({ key: BADGE_KEY, count });
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
};

const updateAppBadge = async (count) => {
  if (count > 0) {
    if ('setAppBadge' in self.navigator) await self.navigator.setAppBadge(count);
  } else if ('clearAppBadge' in self.navigator) {
    await self.navigator.clearAppBadge();
  }
};

const notifyClientsOfBadgeCount = async (count) => {
  try {
    await updateAppBadge(count);
  } catch (error) {
    console.error('[Service Worker] Unable to update the system app badge:', error);
  }
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clients.forEach((client) => client.postMessage({ type: 'PUSH_BADGE_COUNT', count }));
};

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await self.clients.claim();
    try {
      await notifyClientsOfBadgeCount(await getBadgeCount());
    } catch (error) {
      console.error('[Service Worker] Unable to restore the push badge:', error);
    }
  })());
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

  event.waitUntil((async () => {
    await self.registration.showNotification(options.title, options);
    try {
      const count = await getBadgeCount() + 1;
      await setBadgeCount(count);
      await notifyClientsOfBadgeCount(count);
    } catch (error) {
      console.error('[Service Worker] Unable to update the push badge:', error);
    }
  })());
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
  event.waitUntil((async () => {
    try {
      const count = Math.max(0, await getBadgeCount() - 1);
      await setBadgeCount(count);
      await notifyClientsOfBadgeCount(count);
    } catch (error) {
      console.error('[Service Worker] Unable to clear the opened notification badge:', error);
    }
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) {
      if (new URL(client.url).origin === url.origin && 'focus' in client) {
        if ('navigate' in client) await client.navigate(url.href);
        return client.focus();
      }
    }
    if (self.clients.openWindow) {
      return self.clients.openWindow(url.href);
    }
  })());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'GET_PUSH_BADGE_COUNT') {
    event.waitUntil((async () => {
      try {
        const count = await getBadgeCount();
        event.ports[0]?.postMessage({ count });
        await updateAppBadge(count);
      } catch (error) {
        console.error('[Service Worker] Unable to read the push badge:', error);
        event.ports[0]?.postMessage({ error: 'Unable to read the push badge' });
      }
    })());
  }

  if (event.data?.type === 'CLEAR_PUSH_BADGE_COUNT') {
    event.waitUntil((async () => {
      try {
        await setBadgeCount(0);
        await notifyClientsOfBadgeCount(0);
        event.ports[0]?.postMessage({ count: 0 });
      } catch (error) {
        console.error('[Service Worker] Unable to clear the push badge:', error);
        event.ports[0]?.postMessage({ error: 'Unable to clear the push badge' });
      }
    })());
  }
});
