import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import contactHeroImg from '../assets/bricona contact.png';
import { SITE_CONTENT_EVENT, addContactMessage, getSiteSettings } from '../utils/siteContent';

const faqItems = [
  {
    q: 'Quel est le délai moyen pour obtenir un devis ?',
    a: "Pour la majorité des demandes, nous fournissons une estimation initiale sous 24 à 48 heures ouvrées. Les projets complexes nécessitant une expertise technique approfondie peuvent prendre jusqu'à 4 jours.",
  },
  {
    q: 'Travaillez-vous avec des particuliers ?',
    a: "Oui, Enésense accompagne tant les professionnels pour leurs besoins d'infrastructure digitale que les particuliers recherchant des artisans d'exception pour des projets de rénovation ou de création.",
  },
  {
    q: 'Comment garantissez-vous la qualité des artisans ?',
    a: "Chaque artisan de notre réseau subit un audit rigoureux : vérification des certifications, analyse des travaux précédents et évaluation de la satisfaction client. Nous ne retenons que le top 5% des experts du marché.",
  },
  {
    q: 'Proposez-vous des contrats de maintenance ?',
    a: "Absolument. Qu'il s'agisse de maintenance logicielle ou technique (bâtiment, installations), nous proposons des forfaits d'accompagnement sur le long terme pour assurer la pérennité de vos projets.",
  },
];

const Contact = () => {
  const recaptchaSiteKey = import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef(null);
  const [open, setOpen] = useState(null);
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');

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
      setErrorMessage('Veuillez decrire votre projet avant d envoyer la demande.');
      setIsSending(false);
      return;
    }

    if (recaptchaSiteKey && !recaptchaToken) {
      setErrorMessage('Veuillez valider le reCAPTCHA avant d envoyer la demande.');
      setIsSending(false);
      return;
    }

    try {
      await addContactMessage({
        fullName: formData.get('full-name').trim(),
        company: formData.get('company').trim(),
        email: formData.get('email').trim(),
        projectType: formData.get('project-type'),
        message: messageValue.trim(),
      });

      setSuccessMessage('Votre demande a bien ete envoyee. Notre equipe vous contactera rapidement.');
      form.reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } catch {
      setErrorMessage("Impossible d'envoyer votre demande pour le moment. Veuillez reessayer.");
      recaptchaRef.current?.reset();
      setRecaptchaToken('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="pt-20 pb-16">
      {/* Hero Header */}
      <section className="relative px-6 md:px-8 py-12 md:py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative z-10">
          <span className="font-label text-xs font-bold tracking-widest text-primary uppercase mb-4 block">DEMANDE DE DEVIS</span>
          <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight mb-4">
            Parlons de <span className="text-primary">votre projet</span>.
          </h1>
          <p className="text-sm text-on-surface-variant max-w-lg mb-8 leading-relaxed">
            De la digitalisation, automatisation au développement logiciel sur-mesure. Enésense digitale transforme vos idées en réalités structurelles et numériques.
          </p>
          {/* <div className="flex gap-4 items-center">
            <div className="flex -space-x-3">
              <img className="w-9 h-9 rounded-full border-2 border-surface" alt="Artisan 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDq1HhhKxEdiuv6mVZO6JcoEWvVsguxC3B_Y67YTRkzK7iV0LH0HdO8JCHzsPfzYO6gtSUBIeEoPpLeKPyjcoQWOOSXCl0ErTZDxRn20t3bjJ-_6K8rG12r0pyPXi2ydAiuf4oc2RhqiHxr_MVX5KHBE1TnPZ1v_NK9J2PdQ1Lg9sWBIg_-9pXrsAp47KYtkde0vJCz9_yvr3qtd28L65xOHTucS4mLjnXyoXknZtv3GvDELUlxyOq8tQgJrl4ytcY6kpUmS6SrSfG4" />
              <img className="w-9 h-9 rounded-full border-2 border-surface" alt="Artisan 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtLIkpUq5F0hS_p53fkFGOhM_lZJEE_j_VsMDH5-Qxm358Q-25zaUTyZITZzlM8SGQnJQH4dwvZWhph9wDo1FIyEybOkv8KzEiSy7SCoNZrYQGyDuoRbT_xRd_ZTM-6asR6d7LhKBr434iqjvB4ezrh56GspJkgk54ayLTM1cgt1Tww48fVhMguf9cE5jzsiESrNLC4iMD0xWMlpc8es4qMkfYClyhLVPkI_U5Qq3PJ11UgAbS7CbZUvsxTnklMLD4LOhihCQacpwl" />
              <img className="w-9 h-9 rounded-full border-2 border-surface" alt="Artisan 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKevC3FH5ItaSq016_AH0wPbwCj3LGlbWmT6FtJo2CbwqN1TMYElMx0r6vwIrGPbdDGG6N_N2wV9MhB-TtconXWjKdXRc_qVvtIQ_pQMjaior7qEAZkA2PEXv2UVwdzgKifeRL8xYH3wmnGbk41uhk3NOIxZb49PuD9ZkrDZTSd940XH3E8XYCE-Hw4vnNB8mAN7i7nfC-z_eQF9JaStJ-dwokLxpt6NL9BdOFy2hVAsvzNhfGfFHKvDecjX65xAPU_yaUTAfZO9vB" />
            </div>
            <div className="text-xs font-medium">
              <span className="text-primary">+500 projets réalisés avec passion</span>
            </div>
          </div> */}
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img
              className="w-full h-full object-cover"
              alt="Composants électroniques"
              src={contactHeroImg}
            />
          </div>
          {/* Floating Glass Card */}
          <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl shadow-xl max-w-[240px]">
            <span className="material-symbols-outlined text-secondary mb-2 block">verified</span>
            <h3 className="font-headline font-bold text-on-surface">Réponse en 24h</h3>
            <p className="text-xs text-on-surface-variant mt-1">Nos experts analysent vos besoins techniques immédiatement.</p>
          </div>
        </div>
      </section>

      {/* Form & Details Section */}
      <section className="px-6 md:px-8 py-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-6 md:p-8 border border-outline-variant/20 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider" htmlFor="full-name">Nom complet</label>
                  <input id="full-name" name="full-name" className="w-full bg-surface-container-high border-none rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-surface-tint transition-all placeholder:text-outline/50 outline-none" placeholder="Nom complet" type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider" htmlFor="company">Entreprise (Optionnel)</label>
                  <input id="company" name="company" className="w-full bg-surface-container-high border-none rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-surface-tint transition-all placeholder:text-outline/50 outline-none" placeholder="Nom de l'entreprise" type="text" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider" htmlFor="email">Email</label>
                  <input id="email" name="email" className="w-full bg-surface-container-high border-none rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-surface-tint transition-all placeholder:text-outline/50 outline-none" placeholder="email@gmail.com / email professionnel" type="email" required />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider" htmlFor="project-type">Type de projet</label>
                  <select id="project-type" name="project-type" className="w-full bg-surface-container-high border-none rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-surface-tint transition-all text-on-surface-variant outline-none" required>
                    <option value="Digitalisation">Digitalisation</option>
                    <option value="Automatisation">Automatisation</option>
                    <option value="Mise en relation artisan et client">Mise en relation artisan et client</option>
                    <option value="Developpement de logiciel sur mesure">Developpement de logiciel sur mesure</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs font-semibold text-on-surface-variant px-1 uppercase tracking-wider" htmlFor="message">Votre message</label>
                <textarea className="w-full bg-surface-container-high border-none rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-surface-tint transition-all placeholder:text-outline/50 outline-none resize-none" placeholder="Décrivez votre vision, vos contraintes et vos délais..." rows={4}></textarea>
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
                <p className="rounded-xl bg-green-100 px-4 py-3 text-sm font-bold text-green-700" aria-live="polite">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600" aria-live="polite">
                  {errorMessage}
                </p>
              )}
              <div className="pt-4">
                <button className="w-full md:w-auto bg-secondary-container text-on-secondary-container font-headline font-bold py-3 px-8 rounded-xl text-base hover:brightness-105 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={isSending || Boolean(recaptchaSiteKey && !recaptchaToken)}>
                  {isSending ? 'Envoi en cours...' : 'Envoyer la demande'}
                  <span className="material-symbols-outlined">send</span>
                </button>
                <p className="text-[10px] text-outline mt-4 text-center md:text-left">
                  En envoyant ce formulaire, vous acceptez notre politique de confidentialité. Vos données sont traitées avec soin.
                </p>
              </div>
            </form>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-surface-container-low rounded-2xl p-6 space-y-5">
              <h2 className="font-headline text-xl font-bold mb-4">Informations Directes</h2>
              {[
                { icon: 'call', label: 'Appels', value: settings.phone },
                { icon: 'chat', label: 'WhatsApp', value: settings.whatsapp },
                { icon: 'mail', label: 'Email', value: settings.email },
                { icon: 'location_on', label: 'Siège Social', value: settings.address },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-3 rounded-xl hover:bg-surface-container transition-colors">
                  <div className="bg-primary-container/10 p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-label text-xs font-bold text-primary uppercase">{item.label}</p>
                    <p className="text-on-surface font-medium text-base">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Map */}
            <div className="rounded-2xl overflow-hidden aspect-video relative">
              <iframe
                title="Localisation Enésense"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address || 'Colombs, France')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
            {/* Social */}
            <div className="bg-white/50 backdrop-blur rounded-2xl p-6 border border-outline-variant/30">
              <p className="font-label text-xs font-bold text-on-surface-variant uppercase mb-4 tracking-[0.2em] text-center">Suivez nous sur</p>
              <div className="flex justify-around items-center">
                <a href="https://web.facebook.com/profile.php?id=61586741540007" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full hover:brightness-110 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1877F2]">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/briconation-corp/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 flex items-center justify-center rounded-full hover:brightness-110 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#0A66C2]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 md:px-8 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-headline text-2xl font-bold mb-4">Questions Fréquentes</h2>
          <div className="h-1 w-20 bg-secondary-container mx-auto rounded-full"></div>
        </div>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-container-low transition-colors group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-headline font-semibold text-on-surface">{item.q}</span>
                <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-all ${open === i ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {open === i && (
                <div className="px-4 pb-4 text-on-surface-variant leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
