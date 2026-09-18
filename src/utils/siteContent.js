import { hasSupabaseConfig, supabase } from './supabaseClient';

export const SITE_CONTENT_EVENT = 'bricona-site-content-updated';

export const defaultSiteSettings = {
  email: 'contact@enesense.com',
  phone: '+22872483165',
  whatsapp: '+22879340002',
  address: 'Colombs, France',
};

const settingsKey = 'bricona-site-settings';
const contactMessagesKey = 'bricona-contact-messages';

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

const mapSupabaseContactMessage = (message) => ({
  id: message.id,
  fullName: message.full_name,
  company: message.company,
  email: message.email,
  projectType: message.project_type,
  message: message.message,
  createdAt: message.created_at,
});

const mapSupabaseSiteSetting = (row) => ({
  email: row.email,
  phone: row.phone,
  whatsapp: row.whatsapp,
  address: row.address,
});

const mapSiteSettingForSupabase = (settings) => ({
  id: 'main',
  email: settings.email,
  phone: settings.phone,
  whatsapp: settings.whatsapp,
  address: settings.address,
});

export const getSiteSettingsFromSupabase = async () => {
  if (!hasSupabaseConfig) return getSiteSettings();

  const { data, error } = await supabase
    .from('site_settings')
    .select('email,phone,whatsapp,address')
    .eq('id', 'main')
    .maybeSingle();

  if (error) throw error;
  if (!data) return getSiteSettings();

  const settings = mapSupabaseSiteSetting(data);
  saveSiteSettings(settings);
  return settings;
};

export const getSiteSettingsAsync = async () => {
  if (!hasSupabaseConfig) return getSiteSettings();

  try {
    return await getSiteSettingsFromSupabase();
  } catch {
    return getSiteSettings();
  }
};

export const saveSiteSettingsToSupabase = async (settings) => {
  if (!hasSupabaseConfig) return;

  const { error } = await supabase
    .from('site_settings')
    .upsert(mapSiteSettingForSupabase(settings), { onConflict: 'id' });

  if (error) throw error;
};

export const getSiteSettings = () => ({
  ...defaultSiteSettings,
  ...readJson(settingsKey, {}),
});

export const saveSiteSettings = (settings) => {
  writeJson(settingsKey, { ...getSiteSettings(), ...settings });
};

export const addContactMessage = async (message) => {
  if (hasSupabaseConfig) {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        full_name: message.fullName,
        company: message.company || null,
        email: message.email,
        project_type: message.projectType,
        message: message.message,
      });

    if (error) throw error;
    return;
  }

  const messages = readJson(contactMessagesKey, []);
  writeJson(contactMessagesKey, [
    {
      id: `contact-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...message,
    },
    ...messages,
  ]);
};

export const getContactMessages = async () => {
  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id,full_name,company,email,project_type,message,created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapSupabaseContactMessage);
  }

  return readJson(contactMessagesKey, []);
};

export const formatPhoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const formatWhatsappHref = (phone, message = '') => {
  const digits = phone.replace(/\D/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${text}`;
};
