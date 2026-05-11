import { hasSupabaseConfig, supabase } from './supabaseClient';

export const SITE_CONTENT_EVENT = 'bricona-site-content-updated';

export const defaultSiteSettings = {
  email: 'contact@bricona.net',
  phone: '+22872483165',
  whatsapp: '+22879340002',
  address: 'Lome, Togo',
};

export const defaultEvents = [
  {
    id: 'digitaliser-atelier',
    type: 'Conference',
    title: 'Digitaliser son atelier artisanal',
    date: '2026-05-18',
    time: '10:00 - 12:00',
    place: 'En ligne',
    seats: '42',
    description: 'Une session pratique pour comprendre comment passer son atelier au digital.',
    published: true,
  },
  {
    id: 'rencontre-artisans-clients',
    type: 'Meeting',
    title: 'Rencontre artisans & clients',
    date: '2026-05-24',
    time: '15:00 - 17:30',
    place: 'Bricona Hub',
    seats: '18',
    description: 'Un moment de mise en relation pour creer des opportunites concrètes.',
    published: true,
  },
  {
    id: 'automatiser-devis',
    type: 'Atelier',
    title: 'Automatiser les devis et suivis',
    date: '2026-05-31',
    time: '09:30 - 11:00',
    place: 'En ligne',
    seats: '30',
    description: 'Decouvrez comment gagner du temps sur les devis, relances et confirmations.',
    published: true,
  },
];

const eventsKey = 'bricona-events';
const settingsKey = 'bricona-site-settings';
const registrationsKey = 'bricona-event-registrations';

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const readJson = (key, fallback) => {
  if (!canUseStorage()) return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(SITE_CONTENT_EVENT));
};

const mapSupabaseRegistration = (registration) => ({
  id: registration.id,
  eventId: registration.event_id,
  fullName: registration.full_name,
  phone: registration.phone,
  email: registration.email,
  profile: registration.profile,
  createdAt: registration.created_at,
});

export const getSiteEvents = () => readJson(eventsKey, defaultEvents);

export const saveSiteEvents = (events) => {
  writeJson(eventsKey, events);
};

export const getPublishedEvents = () => (
  getSiteEvents()
    .filter((event) => event.published)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
);

export const getEventStatus = (eventDate) => {
  if (!eventDate) return 'future';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDay = new Date(`${eventDate}T12:00:00`);
  eventDay.setHours(0, 0, 0, 0);

  if (eventDay.getTime() < today.getTime()) return 'past';
  if (eventDay.getTime() === today.getTime()) return 'current';
  return 'future';
};

export const getEventGroups = (events) => {
  const sortedEvents = [...events].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const pastEvents = sortedEvents.filter((event) => getEventStatus(event.date) === 'past');

  return {
    current: sortedEvents.filter((event) => getEventStatus(event.date) === 'current'),
    future: sortedEvents.filter((event) => getEventStatus(event.date) === 'future'),
    past: pastEvents.reverse(),
  };
};

export const getSiteSettings = () => ({
  ...defaultSiteSettings,
  ...readJson(settingsKey, {}),
});

export const saveSiteSettings = (settings) => {
  writeJson(settingsKey, { ...getSiteSettings(), ...settings });
};

export const addEventRegistration = async (registration) => {
  if (hasSupabaseConfig) {
    const { error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: registration.eventId,
        full_name: registration.fullName,
        phone: registration.phone,
        email: registration.email,
        profile: registration.profile,
      });

    if (error) throw error;
    return;
  }

  const registrations = readJson(registrationsKey, []);
  writeJson(registrationsKey, [
    {
      id: `registration-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...registration,
    },
    ...registrations,
  ]);
};

export const getEventRegistrations = async () => {
  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('event_registrations')
      .select('id,event_id,full_name,phone,email,profile,created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapSupabaseRegistration);
  }

  return readJson(registrationsKey, []);
};

export const formatEventDate = (date) => {
  if (!date) return 'Date a definir';

  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${date}T12:00:00`));
  } catch {
    return date;
  }
};

export const formatPhoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const formatWhatsappHref = (phone, message = '') => {
  const digits = phone.replace(/\D/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${text}`;
};
