import { useEffect, useState } from 'react';
import whatsappIcon from '../assets/whatsapp.svg';
import {
  SITE_CONTENT_EVENT,
  formatPhoneHref,
  formatWhatsappHref,
  getSiteSettings,
} from '../utils/siteContent';

const FloatingButtons = () => {
  const [settings, setSettings] = useState(() => getSiteSettings());

  useEffect(() => {
    const syncSettings = () => setSettings(getSiteSettings());
    window.addEventListener(SITE_CONTENT_EVENT, syncSettings);
    window.addEventListener('storage', syncSettings);

    return () => {
      window.removeEventListener(SITE_CONTENT_EVENT, syncSettings);
      window.removeEventListener('storage', syncSettings);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2">
        <a
          href={formatWhatsappHref(settings.whatsapp)}
          className="floating-cta w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] ring-2 ring-white/70 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Contacter via WhatsApp"
        >
          <img src={whatsappIcon} alt="" className="w-7 h-7" />
        </a>
        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/90 text-[#128C7E] shadow-sm border border-white">
          WhatsApp
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <a
          href={formatPhoneHref(settings.phone)}
          className="floating-cta floating-cta-delay w-14 h-14 rounded-full bg-primary text-white shadow-[0_12px_30px_rgba(0,50,125,0.35)] ring-2 ring-white/60 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Appeler"
        >
          <span className="material-symbols-outlined text-xl">call</span>
        </a>
        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/90 text-primary shadow-sm border border-white">
          Appel
        </span>
      </div>
    </div>
  );
};

export default FloatingButtons;
