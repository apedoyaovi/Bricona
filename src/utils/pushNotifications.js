import { supabase, hasSupabaseConfig } from './supabaseClient';

// Clé publique VAPID - À générer et configurer dans les variables d'environnement
// Génération: openssl ecparam -genkey -name prime256v1 -param_enc explicit -out private.key
// Puis: openssl ec -in private.key -pubout -out public.key
// Convertir la clé publique en base64 URL-safe
const VAPID_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_VAPID_KEY || '';

export const isPushConfigured = () => hasSupabaseConfig && Boolean(VAPID_PUBLIC_KEY);

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const isPushSupported = () => {
  return typeof window !== 'undefined'
    && 'Notification' in window
    && 'serviceWorker' in navigator
    && 'PushManager' in window;
};

export const isSubscribed = async () => {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  return !!subscription;
};

const saveSubscription = async (subscription) => {
  if (!hasSupabaseConfig) {
    throw new Error('Configuration Supabase manquante pour enregistrer cet appareil.');
  }

  const p256dh = subscription.getKey('p256dh');
  const auth = subscription.getKey('auth');
  if (!p256dh || !auth) {
    throw new Error('Le navigateur a retourne un abonnement push incomplet.');
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .insert({
      endpoint: subscription.endpoint,
      p256dh: btoa(String.fromCharCode(...new Uint8Array(p256dh))),
      auth: btoa(String.fromCharCode(...new Uint8Array(auth))),
      updated_at: new Date().toISOString()
    });

  if (error && error.code !== '23505') throw error;
};

export const subscribeToPush = async () => {
  if (!isPushSupported()) {
    throw new Error('Notifications push non supportées par ce navigateur');
  }

  if (!hasSupabaseConfig) {
    throw new Error('Configuration Supabase manquante pour enregistrer cet appareil.');
  }

  if (!VAPID_PUBLIC_KEY) {
    throw new Error('Clé VAPID non configurée (VITE_PUBLIC_VAPID_KEY)');
  }

  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    await saveSubscription(existingSubscription);
    return existingSubscription;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
  });

  await saveSubscription(subscription);

  return subscription;
};

export const unsubscribeFromPush = async () => {
  if (!isPushSupported()) return;

  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    if (hasSupabaseConfig) {
      const { error } = await supabase
        .from('push_subscriptions')
        .delete()
        .eq('endpoint', subscription.endpoint);
      if (error) throw error;
    }
    await subscription.unsubscribe();
  }
};

export const getSubscription = async () => {
  if (!isPushSupported()) return null;
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager.getSubscription();
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    return registration;
  }
  throw new Error('Service workers non supportes par ce navigateur');
};

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    throw new Error('Notifications non supportées');
  }

  // Si déjà accordé, pas besoin de redemander
  if (Notification.permission === 'granted') {
    return 'granted';
  }

  // Si déjà refusé, on ne peut pas redemander via l'API
  if (Notification.permission === 'denied') {
    throw new Error('Permission de notification refusée');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permission de notification refusée');
  }
  return permission;
};
