import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.localStorage.getItem('enesence-cookie-consent');
  });
  const [customOpen, setCustomOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const saveConsent = (choice) => {
    const payload =
      choice === 'custom'
        ? { choice, preferences }
        : {
            choice,
            preferences: {
              necessary: true,
              analytics: choice === 'accepted',
              marketing: choice === 'accepted',
            },
          };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('enesence-cookie-consent', JSON.stringify(payload));
    }
    setVisible(false);
    setCustomOpen(false);
  };

  const togglePreference = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-primary/15 bg-white/95 shadow-2xl backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-start gap-3 md:max-w-2xl">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-xl">cookie</span>
            </div>
            <div>
              <p className="font-headline text-base font-bold text-on-surface">{t('Nous utilisons des cookies', 'We use cookies')}</p>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {t('Nous utilisons des cookies essentiels et analytiques pour améliorer votre expérience et la performance du site. Vous pouvez en savoir plus dans notre', 'We use essential and analytics cookies to improve your experience and the performance of this website. Learn more in our')}{' '}
                <Link to="/politique-cookies" className="font-semibold text-primary hover:underline">
                  {t('politique de cookies', 'cookie policy')}
                </Link>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <button
              type="button"
              onClick={() => saveConsent('refused')}
              className="rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm font-medium text-on-surface transition hover:bg-surface-container-low"
            >
              {t('Refuser', 'Reject')}
            </button>
            <button
              type="button"
              onClick={() => setCustomOpen(true)}
              className="rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm font-medium text-on-surface transition hover:bg-surface-container-low"
            >
              {t('Personnaliser', 'Customize')}
            </button>
            <button
              type="button"
              onClick={() => saveConsent('accepted')}
              className="rounded-xl bg-primary text-white px-4 py-2.5 text-sm font-semibold shadow-md transition hover:brightness-105"
            >
              {t('Accepter', 'Accept')}
            </button>
          </div>
        </div>
      </div>

      {customOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-on-surface/30 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-outline-variant/40 bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-outline-variant/30 px-6 py-4">
              <div>
                <p className="font-headline text-xl font-bold text-on-surface">{t('Préférences cookies', 'Cookie preferences')}</p>
                <p className="text-sm text-on-surface-variant">{t('Choisissez les cookies que vous acceptez.', 'Choose which cookies you accept.')}</p>
              </div>
              <button
                type="button"
                onClick={() => setCustomOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-4">
                <div>
                  <p className="font-bold text-on-surface">{t('Cookies nécessaires', 'Necessary cookies')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Obligatoires pour le bon fonctionnement du site.', 'Required for the website to function properly.')}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{t('Toujours actifs', 'Always active')}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-outline-variant/30 p-4">
                <div>
                  <p className="font-bold text-on-surface">{t('Cookies analytiques', 'Analytics cookies')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Aident à améliorer nos services et la performance du site.', 'Help us improve our services and website performance.')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference('analytics')}
                  className={`relative h-7 w-12 rounded-full transition ${preferences.analytics ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${preferences.analytics ? 'left-6' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-outline-variant/30 p-4">
                <div>
                  <p className="font-bold text-on-surface">{t('Cookies marketing', 'Marketing cookies')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Permettent d’affiner les campagnes et contenus publicitaires.', 'Help tailor advertising campaigns and content.')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference('marketing')}
                  className={`relative h-7 w-12 rounded-full transition ${preferences.marketing ? 'bg-primary' : 'bg-surface-container-high'}`}
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${preferences.marketing ? 'left-6' : 'left-1'}`}></span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-outline-variant/30 p-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => saveConsent('refused')}
                className="rounded-xl border border-outline-variant bg-surface px-4 py-2.5 text-sm font-medium text-on-surface transition hover:bg-surface-container-low"
              >
                {t('Refuser', 'Reject')}
              </button>
              <button
                type="button"
                onClick={() => saveConsent('custom')}
                className="rounded-xl bg-primary text-white px-4 py-2.5 text-sm font-semibold shadow-md transition hover:brightness-105"
              >
                {t('Enregistrer mes choix', 'Save my choices')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
