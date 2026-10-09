import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { SITE_CONTENT_EVENT, addContactMessage, getSiteSettings, getSiteSettingsAsync } from '../utils/siteContent';
import { useLanguage } from '../utils/LanguageContext';

const faqItems = [
  {
    q: 'Quel est le délai moyen pour obtenir un devis ?',
    qEn: 'How long does it usually take to receive a quote?',
    a: "Pour la majorité des demandes, nous fournissons une estimation initiale sous 24 à 48 heures ouvrées. Les projets complexes nécessitant une expertise technique approfondie peuvent prendre jusqu'à 4 jours.",
    aEn: 'For most requests, we provide an initial estimate within 24 to 48 business hours. Complex projects requiring in-depth technical expertise may take up to 4 days.',
  },
  {
    q: 'Travaillez-vous avec des particuliers ?',
    qEn: 'Do you work with individuals?',
    a: "Oui, Enésense accompagne tant les professionnels pour leurs besoins d'infrastructure digitale que les particuliers recherchant des experts pour des projets de rénovation ou de création.",
    aEn: 'Yes. Enésense supports businesses with digital infrastructure and individuals looking for experts for renovation or creative projects.',
  },
  {
    q: 'Comment garantissez-vous la qualité de vos prestations ?',
    qEn: 'How do you ensure the quality of your work?',
    a: "Chaque prestataire de notre réseau subit un audit rigoureux : vérification des certifications, analyse des travaux précédents et évaluation de la satisfaction client. Nous ne retenons que le top 5% des experts du marché.",
    aEn: 'Every partner in our network undergoes a thorough review: certification checks, previous work analysis and client satisfaction assessment. We select only the top 5% of experts in the market.',
  },
  {
    q: 'Proposez-vous des contrats de maintenance ?',
    qEn: 'Do you offer maintenance contracts?',
    a: "Absolument. Qu'il s'agisse de maintenance logicielle ou technique, nous proposons des forfaits d'accompagnement sur le long terme pour assurer la pérennité de vos projets.",
    aEn: 'Absolutely. Whether you need software or technical maintenance, we offer long-term support plans to help ensure your projects remain sustainable.',
  },
];

const T = {
  navyDeep: '#040f23',
  navyText: '#f7f8fa',
  navyMuted: '#b0b8c4',
  yellow: '#F2B705',
  yellowDeep: '#C99600',
  surfaceContainerLow: '#eff4ff',
  surfaceContainerHigh: '#dce9ff',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#444653',
};

const fonts = {
  jakarta: "'Plus Jakarta Sans', sans-serif",
  inter: "'Inter', sans-serif",
};

const Contact = () => {
  const { t } = useLanguage();
  const recaptchaSiteKey = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

  useEffect(() => {
    getSiteSettingsAsync().then(setSettings).catch(() => setSettings(getSiteSettings()));
  }, []);

  useEffect(() => {
    const syncSettings = () => setSettings(getSiteSettings());
    window.addEventListener(SITE_CONTENT_EVENT, syncSettings);
    window.addEventListener('storage', syncSettings);

    return () => {
      window.removeEventListener(SITE_CONTENT_EVENT, syncSettings);
      window.removeEventListener('storage', syncSettings);
    };
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const messageValue = formData.get('message') || form.querySelector('textarea')?.value || '';

    setIsSending(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!messageValue.trim()) {
      setErrorMessage(t('Veuillez decrire votre projet avant d envoyer la demande.', 'Please describe your project before submitting the request.'));
      setIsSending(false);
      return;
    }

    if (recaptchaSiteKey && !recaptchaToken) {
      setErrorMessage(t('Veuillez valider le reCAPTCHA avant d envoyer la demande.', 'Please complete the reCAPTCHA before submitting the request.'));
      setIsSending(false);
      return;
    }

    try {
      await addContactMessage({
        fullName: (formData.get('full-name') || '').trim(),
        company: (formData.get('company') || '').trim(),
        email: (formData.get('email') || '').trim(),
        phone: (formData.get('phone') || '').trim(),
        projectType: (formData.get('project-type') || '').trim(),
        message: messageValue.trim(),
      });

      setSuccessMessage(t('Votre demande a bien ete envoyee. Notre equipe vous contactera rapidement.', 'Your request has been sent. Our team will be in touch shortly.'));
      form.reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } catch (error) {
      const reason = error instanceof Error ? error.message : t('Erreur inconnue', 'Unknown error');
      console.error('Contact form submission failed:', reason, error);
      setErrorMessage(`${t("Impossible d'envoyer votre demande :", 'Unable to send your request:')} ${reason}`);
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="pt-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center min-h-[70vh]" style={{ background: T.navyDeep }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to right, #040f23, rgba(4,15,35,0.95), rgba(4,15,35,0.85))' }} />
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6">
              <span className="font-label text-xs font-bold tracking-widest uppercase mb-4 block" style={{ fontFamily: fonts.jakarta, color: T.yellow }}>
                Contact
              </span>
              <h1 className="text-center lg:text-left" style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: T.navyText, margin: 0, maxWidth: '100%' }}>
                {t('Parlons de votre projet.', "Let's talk about your project.")}
              </h1>
              <p className="text-center lg:text-left" style={{ fontFamily: fonts.inter, fontSize: '19px', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.005em', color: T.navyMuted, maxWidth: '540px', margin: '0 auto' }}>
                {t("Vous cherchez à renforcer une équipe, construire un produit, moderniser une application ou explorer un cas d'usage en IA ? Décrivez-nous votre besoin.", 'Looking to strengthen a team, build a product, modernize an application or explore an AI use case? Tell us what you need.')}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-4">
                <a
                  href="#contactForm"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg transition-all duration-200 active:translate-y-0.5"
                  style={{ background: T.yellow, color: T.navyDeep, fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(242,183,5,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
                  onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
                >
                  {t('Discuter de votre projet', 'Discuss your project')}
                </a>
                <a
                  href="#contactForm"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border transition-all duration-200 active:translate-y-0.5"
                  style={{ borderColor: T.navyMuted, color: T.navyText, fontFamily: fonts.inter, fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.yellow; e.currentTarget.style.color = T.yellow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.navyMuted; e.currentTarget.style.color = T.navyText; }}
                >
                  {t('Voir le formulaire', 'View the form')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form & Details Section */}
      <section id="contactForm" className="px-6 md:px-8 py-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-2xl p-6 md:p-8" style={{ background: T.navyDeep, border: '1px solid rgba(255,255,255,0.08)' }}>
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="full-name">{t('Nom', 'Name')}</label>
                  <input id="full-name" name="full-name" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.navyText, fontFamily: fonts.inter }} placeholder={t('Votre nom', 'Your name')} type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="company">{t('Structure', 'Company')} <span style={{ color: T.navyMuted }}>({t('optionnel', 'optional')})</span></label>
                  <input id="company" name="company" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.navyText, fontFamily: fonts.inter }} placeholder={t('Nom de votre entreprise', 'Company name')} type="text" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="email">Email</label>
                  <input id="email" name="email" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.navyText, fontFamily: fonts.inter }} placeholder="email@entreprise.com" type="email" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="phone">{t('Téléphone', 'Phone')}</label>
                  <input id="phone" name="phone" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.navyText, fontFamily: fonts.inter }} placeholder="+33 6 00 00 00 00" type="tel" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="project-type">{t('Nature du besoin', 'Project type')}</label>
                <select id="project-type" name="project-type" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 appearance-none cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontFamily: fonts.inter }} required>
                  <option value="" style={{ background: '#0A0D14', color: '#b0b8c4' }}>{t('Sélectionnez un besoin', 'Select a project type')}</option>
                  <option value="Extension d'équipe" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t("Extension d'équipe", 'Team extension')}</option>
                  <option value="Nouveau produit" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t('Nouveau produit', 'New product')}</option>
                  <option value="Modernisation applicative" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t('Modernisation applicative', 'Application modernization')}</option>
                  <option value="IA & automatisation" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t('IA & automatisation', 'AI & automation')}</option>
                  <option value="Création de site internet/appli" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t('Création de site internet/appli', 'Website or app development')}</option>
                  <option value="Autre" style={{ background: '#0A0D14', color: '#f7f8fa' }}>{t('Autre', 'Other')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }} htmlFor="message">{t('Message', 'Message')}</label>
                <textarea id="message" name="message" className="w-full rounded-xl px-4 py-3 outline-none transition-all focus:ring-2 resize-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: T.navyText, fontFamily: fonts.inter }} placeholder={t('Décrivez votre besoin, vos objectifs et vos délais...', 'Describe your needs, goals and timeline...')} rows={5} required></textarea>
              </div>
              {recaptchaSiteKey && (
                <div className="overflow-hidden rounded-xl">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                    onChange={(token) => setRecaptchaToken(token || '')}
                    onExpired={() => setRecaptchaToken('')}
                    onErrored={() => setRecaptchaToken('')}
                  />
                </div>
              )}
              {successMessage && (
                <p className="rounded-xl px-4 py-3 text-sm font-bold text-green-400" aria-live="polite" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="rounded-xl px-4 py-3 text-sm font-bold text-red-400" aria-live="polite" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  {errorMessage}
                </p>
              )}
              <div className="pt-2">
                <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-base font-bold transition-all active:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105" type="submit" disabled={isSending || Boolean(recaptchaSiteKey && !recaptchaToken)} style={{ background: T.yellow, color: T.navyDeep, fontFamily: fonts.inter, boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}>
                  {isSending ? t('Envoi en cours...', 'Sending...') : t('Envoyer ma demande', 'Send my request')}
                  <span className="material-symbols-outlined">send</span>
                </button>
                <p className="text-[11px] mt-4 text-center md:text-left" style={{ color: T.navyMuted }}>
                  {t('En envoyant ce formulaire, vous acceptez notre politique de confidentialité. Vos données sont traitées avec soin.', 'By submitting this form, you agree to our privacy policy. Your data will be handled with care.')}
                </p>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl p-6 space-y-5" style={{ background: 'rgba(4,15,35,0.92)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: fonts.jakarta, color: T.navyText }}>{t('Informations Directes', 'Direct Contact')}</h2>
              {[
                { icon: 'call', label: t('Appels', 'Phone'), value: settings.phone },
                { icon: 'chat', label: 'WhatsApp', value: settings.whatsapp },
                { icon: 'mail', label: 'Email', value: settings.email },
                { icon: 'location_on', label: t('Siège Social', 'Head office'), value: settings.address },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-white/5">
                  <div className="p-2.5 rounded-lg" style={{ background: 'rgba(242,183,5,0.12)' }}>
                    <span className="material-symbols-outlined" style={{ color: T.yellow, fontSize: '20px' }}>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: fonts.inter, color: T.yellow }}>{item.label}</p>
                    <p className="text-base font-medium break-words" style={{ color: T.navyText, fontFamily: fonts.inter }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Networks */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(4,15,35,0.92)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="text-xs font-bold uppercase mb-5 tracking-[0.2em] text-center" style={{ fontFamily: fonts.inter, color: T.yellow }}>{t('Suivez nous sur', 'Follow us')}</p>
              <div className="flex justify-center items-center gap-5">
                <a href="https://web.facebook.com/profile.php?id=61586741540007" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(242,183,5,0.15)', border: '1px solid rgba(242,183,5,0.4)' }}>
                  <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold whitespace-nowrap" style={{ fontFamily: fonts.inter, color: T.yellow }}>Facebook</span>
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <circle cx="12" cy="12" r="12" fill="#ffffff"/>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/briconation-corp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg" style={{ background: 'rgba(242,183,5,0.15)', border: '1px solid rgba(242,183,5,0.4)' }}>
                  <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold whitespace-nowrap" style={{ fontFamily: fonts.inter, color: T.yellow }}>LinkedIn</span>
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <circle cx="12" cy="12" r="12" fill="#ffffff"/>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0,0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24,24 23.227,24 22.271V1.729C24 .774 23.2,0 22.222 0h.003z" fill="#0A66C2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Map */}
      <section className="px-6 md:px-8 py-10 max-w-7xl mx-auto">
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <iframe
            title={t('Localisation Enésense', 'Enésense location')}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address || 'Colombs, France')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-8 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline text-2xl font-bold mb-4">{t('Questions Fréquentes', 'Frequently Asked Questions')}</h2>
          <div className="h-1 w-20 bg-secondary-container mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-low transition-colors group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-headline font-semibold text-on-surface">{t(item.q, item.qEn)}</span>
                <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-all ${open === i ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-on-surface-variant leading-relaxed">{t(item.a, item.aEn)}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
