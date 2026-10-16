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
const candidaturesKey = 'bricona-candidatures';

const canUseStorage = () => typeof window !== 'undefined' && window.localStorage;

const requireSupabaseInProduction = () => {
  if (import.meta.env.PROD && !hasSupabaseConfig) {
    throw new Error('Configuration Supabase manquante. Les donnees ne peuvent pas etre envoyees depuis le site publie.');
  }
};

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
  phone: message.phone,
  projectType: message.project_type,
  message: message.message,
  appointmentDate: message.appointment_date,
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
  requireSupabaseInProduction();

  if (hasSupabaseConfig) {
    const appointmentDate = message.appointmentDate
      ? new Date(message.appointmentDate).toISOString()
      : null;

    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        full_name: message.fullName,
        company: message.company || null,
        email: message.email,
        phone: message.phone,
        project_type: message.projectType,
        message: message.message,
        appointment_date: appointmentDate,
      })
      .select('id')
      .single();

    if (error) throw error;

    const { data: notificationResult, error: notificationError } = await supabase.functions.invoke(
      'send-push-notification',
      { body: { messageId: data.id } },
    );

    if (notificationError) {
      console.error('Contact message was saved, but the push notification could not be sent:', notificationError);
      return { notificationError: notificationError.message };
    }

    if (notificationResult?.subscriptions === 0) {
      const reason = 'No devices are subscribed to push notifications';
      console.warn(reason);
      return { notificationError: reason };
    }

    if (notificationResult?.failed > 0) {
      const reason = `${notificationResult.failed} notification(s) could not be delivered`;
      console.error('Contact message was saved, but push delivery was incomplete:', notificationResult);
      return { notificationError: reason };
    }

    return { notificationError: '' };
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
  requireSupabaseInProduction();

  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('id,full_name,company,email,phone,project_type,message,created_at')
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

const mapSupabaseCandidature = (c) => ({
  id: c.id,
  fullName: c.full_name,
  email: c.email,
  phone: c.phone,
  profile: c.profile,
  cvUrl: c.cv_url,
  cvFileName: c.cv_file_name,
  createdAt: c.created_at,
});

export const addCandidature = async (candidature) => {
  requireSupabaseInProduction();

  const { fullName, email, phone, profile, cv } = candidature;
  let cvUrl = null;

  if (hasSupabaseConfig && cv) {
    const ext = cv.name.split('.').pop();
    const fileName = `cv-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `cvs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(filePath, cv, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;
    cvUrl = filePath;
  }

  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('candidatures')
      .insert({
        full_name: fullName,
        email,
        phone,
        profile,
        cv_url: cvUrl,
        cv_file_name: cv?.name || null,
      })
      .select('id')
      .single();

    if (error) {
      if (cvUrl) {
        const { error: cleanupError } = await supabase.storage.from('cvs').remove([cvUrl]);
        if (cleanupError) {
          console.error('Unable to remove the uploaded CV after candidature creation failed:', cleanupError);
        }
      }
      throw error;
    }

    const { data: notificationResult, error: notificationError } = await supabase.functions.invoke(
      'send-push-notification',
      { body: { candidatureId: data.id } },
    );

    if (notificationError) {
      console.error('Candidature was saved, but the push notification could not be sent:', notificationError);
      return { notificationError: notificationError.message };
    }

    if (notificationResult?.subscriptions === 0) {
      const reason = 'No devices are subscribed to push notifications';
      console.warn(reason);
      return { notificationError: reason };
    }

    if (notificationResult?.failed > 0) {
      const reason = `${notificationResult.failed} notification(s) could not be delivered`;
      console.error('Candidature was saved, but push delivery was incomplete:', notificationResult);
      return { notificationError: reason };
    }

    return { notificationError: '' };
  }

  const candidatures = readJson(candidaturesKey, []);
  writeJson(candidaturesKey, [
    {
      id: `candidature-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName,
      email,
      phone,
      profile,
      cvFileName: cv?.name || null,
    },
    ...candidatures,
  ]);
};

export const getCandidatures = async () => {
  requireSupabaseInProduction();

  if (hasSupabaseConfig) {
    const { data, error } = await supabase
      .from('candidatures')
      .select('id,full_name,email,phone,profile,cv_url,cv_file_name,created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapSupabaseCandidature);
  }

  return readJson(candidaturesKey, []);
};

export const getCvSignedUrl = async (cvPath) => {
  requireSupabaseInProduction();
  if (!hasSupabaseConfig || !cvPath) return null;

  const { data, error } = await supabase.storage
    .from('cvs')
    .createSignedUrl(cvPath, 3600);

  if (error) throw error;
  return data.signedUrl;
};
