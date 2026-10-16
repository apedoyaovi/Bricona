import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getSiteSettings,
  saveSiteSettings,
  getSiteSettingsFromSupabase,
  saveSiteSettingsToSupabase,
  getContactMessages,
  getCandidatures,
  getCvSignedUrl,
  formatPhoneHref,
} from '../utils/siteContent';
import ConfirmDialog from '../components/ConfirmDialog';
import { useLanguage } from '../utils/LanguageContext';
import {
  isPushSupported,
  isSubscribed,
  subscribeToPush,
  unsubscribeFromPush,
  requestNotificationPermission,
} from '../utils/pushNotifications';

const adminPassword = 'bricona-admin-2026';
const adminSessionKey = 'bricona-admin-session';
const viewedMessagesKey = 'bricona-admin-viewed-messages';
const viewedCandidaturesKey = 'bricona-admin-viewed-candidatures';

const AdminDashboard = () => {
  const { language, t } = useLanguage();
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [messages, setMessages] = useState([]);
  const [candidatures, setCandidatures] = useState([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesPageSize, setMessagesPageSize] = useState(10);
  const [candidaturesPage, setCandidaturesPage] = useState(1);
  const [candidaturesPageSize, setCandidaturesPageSize] = useState(10);
  const [downloadingCvId, setDownloadingCvId] = useState(null);
  const [pushSubscribed, setPushSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState('default');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [newCandidaturesCount, setNewCandidaturesCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => (
    typeof window !== 'undefined' && window.sessionStorage.getItem(adminSessionKey) === 'active'
  ));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    confirmLabel: t('Confirmer', 'Confirm'),
    variant: 'primary',
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog((current) => ({ ...current, open: false, onConfirm: null }));
  };

  const requestConfirmation = ({ title, message, confirmLabel = t('Confirmer', 'Confirm'), variant = 'primary', onConfirm }) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      confirmLabel,
      variant,
      onConfirm,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (password !== adminPassword) {
      setLoginError(t('Mot de passe incorrect.', 'Incorrect password.'));
      return;
    }

    window.sessionStorage.setItem(adminSessionKey, 'active');
    setIsAuthenticated(true);
    setPassword('');
    setLoginError('');
  };

  const handleLogout = () => {
    requestConfirmation({
      title: t('Deconnexion', 'Log out'),
      message: t('Voulez-vous vraiment quitter l espace proprietaire ?', 'Are you sure you want to leave the admin area?'),
      confirmLabel: t('Se deconnecter', 'Log out'),
      onConfirm: () => {
        window.sessionStorage.removeItem(adminSessionKey);
        setIsAuthenticated(false);
        closeConfirmDialog();
      },
    });
  };

  const refreshMessages = async () => {
    setIsLoading(true);
    setError('');

    try {
      const fetched = await getContactMessages();
      setMessages(fetched);

      const viewed = JSON.parse(localStorage.getItem(viewedMessagesKey) || '[]');
      const newCount = fetched.filter((m) => !viewed.includes(m.id)).length;
      setNewMessagesCount(newCount);
      setNotice(t('Messages actualises.', 'Messages refreshed.'));
    } catch {
      setError(t('Impossible de charger les messages. Verifiez la policy select Supabase.', 'Unable to load messages. Check the Supabase select policy.'));
    } finally {
      setIsLoading(false);
    }
  };

  const markMessagesAsViewed = () => {
    const ids = messages.map((m) => m.id);
    localStorage.setItem(viewedMessagesKey, JSON.stringify([...new Set([...JSON.parse(localStorage.getItem(viewedMessagesKey) || '[]'), ...ids])]));
    setNewMessagesCount(0);
  };

  const refreshCandidatures = async () => {
    setIsLoading(true);
    setError('');

    try {
      const fetched = await getCandidatures();
      setCandidatures(fetched);

      const viewed = JSON.parse(localStorage.getItem(viewedCandidaturesKey) || '[]');
      const newCount = fetched.filter((c) => !viewed.includes(c.id)).length;
      setNewCandidaturesCount(newCount);
      setNotice(t('Candidatures actualisees.', 'Applications refreshed.'));
    } catch {
      setError(t('Impossible de charger les candidatures. Verifiez la policy select Supabase.', 'Unable to load applications. Check the Supabase select policy.'));
    } finally {
      setIsLoading(false);
    }
  };

  const markCandidaturesAsViewed = () => {
    const ids = candidatures.map((c) => c.id);
    localStorage.setItem(viewedCandidaturesKey, JSON.stringify([...new Set([...JSON.parse(localStorage.getItem(viewedCandidaturesKey) || '[]'), ...ids])]));
    setNewCandidaturesCount(0);
  };

  const downloadCv = async (cvPath, fileName, cvId) => {
    setDownloadingCvId(cvId);
    try {
      const url = await getCvSignedUrl(cvPath);
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError(t('Impossible de telecharger le CV.', 'Unable to download CV.'));
    } finally {
      setDownloadingCvId(null);
    }
  };

  const checkPushSubscription = async () => {
    setPushSupported(isPushSupported());
    if ('Notification' in window) {
      setPushPermission(Notification.permission);
    }
    if (pushSupported) {
      const subscribed = await isSubscribed();
      setPushSubscribed(subscribed);
    }
  };

  const handleTogglePush = async () => {
    setPushLoading(true);
    setError('');

    try {
      // Vérifier l'état actuel de la permission avant de demander
      if ('Notification' in window && Notification.permission === 'denied') {
        setError(t(
          'Notifications bloquées par le navigateur. Allez dans les paramètres du site (icône cadenas dans la barre d\'adresse) pour les réautoriser.',
          'Notifications blocked by browser. Go to site settings (lock icon in address bar) to re-enable.'
        ));
        setPushLoading(false);
        return;
      }

      if (!pushSubscribed) {
        await requestNotificationPermission();
        await subscribeToPush();
        setPushSubscribed(true);
        setNotice(t('Notifications push activees. Vous recevrez les alertes sur votre appareil.', 'Push notifications enabled. You will receive alerts on your device.'));
      } else {
        await unsubscribeFromPush();
        setPushSubscribed(false);
        setNotice(t('Notifications push desactivees.', 'Push notifications disabled.'));
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : t('Erreur inconnue', 'Unknown error');
      setError(`${t('Impossible de configurer les notifications :', 'Unable to configure notifications:')} ${reason}`);
    } finally {
      setPushLoading(false);
    }
  };

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setNotice(t('PWA installee avec succes.', 'PWA installed successfully.'));
    }
  };

  const viewCv = async (cvPath) => {
    try {
      const url = await getCvSignedUrl(cvPath);
      window.open(url, '_blank');
    } catch {
      setError(t('Impossible d\'ouvrir le CV.', 'Unable to open CV.'));
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'messages') {
      refreshMessages();
    }
    if (isAuthenticated && activeTab === 'candidatures') {
      refreshCandidatures();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    setMessagesPage(1);
  }, [messages.length, messagesPageSize]);

  useEffect(() => {
    setCandidaturesPage(1);
  }, [candidatures.length, candidaturesPageSize]);

  useEffect(() => {
    if (isAuthenticated) {
      checkPushSubscription();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'settings') {
      (async () => {
        setIsLoading(true);
        setError('');

        try {
          const remoteSettings = await getSiteSettingsFromSupabase();
          setSettings(remoteSettings);
        } catch {
          setError(t('Impossible de charger les parametres depuis Supabase.', 'Unable to load settings from Supabase.'));
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();

    const trimmed = {
      email: settings.email.trim(),
      phone: settings.phone.trim(),
      whatsapp: settings.whatsapp.trim(),
      address: settings.address.trim(),
    };

    requestConfirmation({
      title: t('Mettre a jour les contacts ?', 'Update contact details?'),
      message: t('Ces informations seront utilisees dans la page contact, les confirmations et les boutons flottants.', 'This information is used on the contact page, in confirmations and in the floating buttons.'),
      confirmLabel: t('Enregistrer', 'Save'),
      onConfirm: async () => {
        try {
          saveSiteSettings(trimmed);
          await saveSiteSettingsToSupabase(trimmed);
          setSettings(trimmed);
          setNotice(t('Contacts du site mis a jour.', 'Site contact details updated.'));
        } catch {
          setError(t('Parametres sauvegardes localement, mais la synchronisation Supabase a echoue.', 'Settings were saved locally, but Supabase synchronization failed.'));
        } finally {
          closeConfirmDialog();
        }
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-surface flex items-center">
        <section className="w-full max-w-md mx-auto px-6">
          <form
            className="rounded-[2rem] bg-white border border-outline-variant/20 p-7 shadow-[0_24px_60px_rgba(0,50,125,0.10)]"
            onSubmit={handleLogin}
          >
            <div className="h-14 w-14 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
            </div>
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">{t('Acces securise', 'Secure access')}</p>
            <h1 className="font-headline text-2xl font-extrabold text-on-surface mb-3">
              {t('Espace proprietaire', 'Admin area')}
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {t('Entrez le mot de passe administrateur pour gerer les messages et les parametres du site.', 'Enter the administrator password to manage messages and site settings.')}
            </p>

            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="admin-password">
              {t('Mot de passe', 'Password')}
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 pr-12 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder={t('Mot de passe admin', 'Admin password')}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                aria-label={showPassword ? t('Masquer le mot de passe', 'Hide password') : t('Afficher le mot de passe', 'Show password')}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {loginError && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600" aria-live="polite">
                {loginError}
              </p>
            )}

            <button type="submit" className="mt-6 w-full bg-primary text-white rounded-xl px-6 py-4 font-bold hover:bg-primary-container transition-colors">
              {t('Se connecter', 'Sign in')}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-surface">
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        variant={confirmDialog.variant}
        onCancel={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
      />
      {showInstallBanner && deferredPrompt && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-4 py-2.5 rounded-full bg-white shadow-[0_12px_40px_rgba(0,50,125,0.25)] border border-outline-variant/20 animate-slide-down max-w-xs w-full mx-4">
          <span className="material-symbols-outlined text-primary text-lg">phone_android</span>
          <span className="text-sm font-bold text-on-surface">{t('Installer Enésense Admin', 'Install Enésense Admin')}</span>
          <button
            type="button"
            onClick={handleInstallPWA}
            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors"
          >
            {t('Installer', 'Install')}
          </button>
          <button
            type="button"
            onClick={() => setShowInstallBanner(false)}
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label={t('Fermer', 'Close')}
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">{t('Espace proprietaire', 'Admin area')}</p>
            <h1 className="font-headline text-3xl lg:text-4xl font-extrabold text-on-surface mb-3">
              Administration
            </h1>
            <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
              {t('Consultez les messages recus, les candidatures et parametrez les informations de contact du site.', 'Review received messages, job applications and manage the website contact details.')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-5 py-3 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors"
          >
            {t('Deconnexion', 'Log out')}
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
          <button
            type="button"
            onClick={() => {
              markMessagesAsViewed();
              markCandidaturesAsViewed();
            }}
            className={`relative inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-5 py-3 text-primary hover:bg-primary-fixed transition-colors`}
            aria-label={t('Notifications', 'Notifications')}
          >
            <span className="material-symbols-outlined text-base">notifications</span>
            {(newMessagesCount + newCandidaturesCount) > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[5px] h-[5px] rounded-full bg-red-600 border-2 border-white">
                {(newMessagesCount + newCandidaturesCount) > 9 ? '9+' : newMessagesCount + newCandidaturesCount}
              </span>
            )}
          </button>
          {pushSupported && (
            <button
              type="button"
              onClick={handleTogglePush}
              disabled={pushLoading}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-5 py-3 text-sm font-bold ${pushSubscribed ? 'text-primary' : pushPermission === 'denied' ? 'text-red-600' : 'text-on-surface-variant'} hover:bg-primary-fixed transition-colors disabled:opacity-60`}
            >
              <span className="material-symbols-outlined text-base">
                {pushSubscribed ? 'notifications_active' : pushPermission === 'denied' ? 'notifications_off' : 'notifications_none'}
              </span>
              {pushLoading ? (
                <span className="text-[10px] animate-spin">…</span>
              ) : pushSubscribed ? (
                t('Notifications activees', 'Push enabled')
              ) : pushPermission === 'denied' ? (
                <>
                  <span>Notifications bloquées</span>
                </>
              ) : (
                t('Activer notifications', 'Enable push')
              )}
            </button>
          )}
        </div>

        {notice && (
          <div className="mb-6 rounded-2xl bg-green-100 border border-green-200 px-5 py-4 text-sm font-bold text-green-700">
            {notice}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm font-bold text-red-600">
            {error}
          </div>
        )}

        {(newMessagesCount > 0 || newCandidaturesCount > 0) && (
          <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm font-bold text-amber-700 flex items-center gap-3">
            <span className="material-symbols-outlined text-amber-500">notifications</span>
            {newMessagesCount > 0 && newCandidaturesCount > 0 && (
              <span>
                {t('Nouveaux messages :', 'New messages:')} {newMessagesCount} {t('Nouveaux candidaures :', 'New applications:')} {newCandidaturesCount}
              </span>
            )}
            {newMessagesCount > 0 && newCandidaturesCount === 0 && (
              <span>
                {t('Nouveaux messages :', 'New messages:')} {newMessagesCount}
              </span>
            )}
            {newMessagesCount === 0 && newCandidaturesCount > 0 && (
              <span>
                {t('Nouveaux candidaures :', 'New applications:')} {newCandidaturesCount}
              </span>
            )}
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => {
              markMessagesAsViewed();
              setActiveTab('messages');
              refreshMessages();
            }}
            className={`rounded-2xl p-5 text-left shadow-sm transition-colors ${
              activeTab === 'messages'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-3xl mb-4">mark_email_unread</span>
            <span className={`block font-headline text-lg font-bold mb-1 ${activeTab === 'messages' ? 'text-white' : 'text-primary'}`}>
              {t('Messages recus', 'Received messages')}
              {newMessagesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {newMessagesCount}
                </span>
              )}
            </span>
            <span className={`block text-sm ${activeTab === 'messages' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              {t('Consulter les demandes envoyees depuis la page contact.', 'Review requests sent through the contact page.')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`rounded-2xl p-5 text-left shadow-sm transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-3xl mb-4">settings</span>
            <span className={`block font-headline text-lg font-bold mb-1 ${activeTab === 'settings' ? 'text-white' : 'text-primary'}`}>
              {t('Parametres du site', 'Site settings')}
            </span>
            <span className={`block text-sm ${activeTab === 'settings' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              {t('Mettre a jour les contacts affiches aux visiteurs.', 'Update the contact details shown to visitors.')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              markCandidaturesAsViewed();
              setActiveTab('candidatures');
              refreshCandidatures();
            }}
            className={`rounded-2xl p-5 text-left shadow-sm transition-colors ${
              activeTab === 'candidatures'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-3xl mb-4">description</span>
            <span className={`block font-headline text-lg font-bold mb-1 ${activeTab === 'candidatures' ? 'text-white' : 'text-primary'}`}>
              {t('Candidatures', 'Job applications')}
              {newCandidaturesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {newCandidaturesCount}
                </span>
              )}
            </span>
            <span className={`block text-sm ${activeTab === 'candidatures' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              {t('Consulter les candidatures recues.', 'Review received job applications.')}
            </span>
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">mark_email_unread</span>
                <p className="font-headline text-2xl font-extrabold text-primary">{messages.length}</p>
                <p className="text-sm text-on-surface-variant">{t('message(s) recus', 'message(s) received')}</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">business_center</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {messages.filter((message) => message.company).length}
                </p>
                <p className="text-sm text-on-surface-variant">{t('demande(s) avec entreprise', 'request(s) with a company')}</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">alternate_email</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {messages.filter((message) => message.email).length}
                </p>
                <p className="text-sm text-on-surface-variant">{t('contact(s) par email', 'email contact(s)')}</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
              {isLoading ? (
                <div className="rounded-2xl bg-surface-container-low p-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Chargement des messages...', 'Loading messages...')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les donnees sont recuperees depuis Supabase.', 'Data is being retrieved from Supabase.')}</p>
                </div>
              ) : messages.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <article key={message.id} className="rounded-2xl bg-surface-container-low p-5">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <p className="font-headline text-lg font-bold text-primary">{message.fullName}</p>
                            <p className="text-sm font-bold text-on-surface mt-1">{message.projectType}</p>
                            {message.appointmentDate && (
                              <p className="text-sm text-on-surface-variant mt-1">
                                <span className="material-symbols-outlined text-base align-[-3px] mr-1">schedule</span>
                                {t('Rendez-vous', 'Appointment')}:{' '}
                                {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }).format(new Date(message.appointmentDate))}
                              </p>
                            )}
                            {message.company && (
                              <p className="text-sm text-on-surface-variant mt-1">{message.company}</p>
                            )}
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant">
                            {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(message.createdAt))}
                          </span>
                        </div>

                        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm leading-relaxed text-on-surface-variant">
                          {message.message}
                        </p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {message.phone && (
                            <a
                              href={formatPhoneHref(message.phone)}
                              className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                            >
                              <span className="material-symbols-outlined text-base align-[-3px] mr-2">call</span>
                              {message.phone}
                            </a>
                          )}
                          <a
                            href={`mailto:${message.email}`}
                            className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                          >
                            <span className="material-symbols-outlined text-base align-[-3px] mr-2">mail</span>
                            {message.email}
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>

                  {(() => {
                    const totalPages = Math.max(1, Math.ceil(messages.length / messagesPageSize));
                    const safePage = Math.min(messagesPage, totalPages);
                    const start = (safePage - 1) * messagesPageSize;
                    const end = start + messagesPageSize;

                    return (
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <span>{t('Messages par page', 'Messages per page')}</span>
                          <select
                            value={messagesPageSize}
                            onChange={(event) => setMessagesPageSize(Number(event.target.value))}
                            className="rounded-xl bg-surface-container-low px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                          <span>
                            {start + 1}-{Math.min(end, messages.length)} / {messages.length}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={safePage <= 1}
                            onClick={() => setMessagesPage((page) => Math.max(1, page - 1))}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">chevron_left</span>
                            {t('Precedent', 'Previous')}
                          </button>

                          <span className="text-sm font-bold text-on-surface">
                            {t('Page', 'Page')} {safePage} / {totalPages}
                          </span>

                          <button
                            type="button"
                            disabled={safePage >= totalPages}
                            onClick={() => setMessagesPage((page) => Math.min(totalPages, page + 1))}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors disabled:opacity-50"
                          >
                            {t('Suivant', 'Next')}
                            <span className="material-symbols-outlined text-base">chevron_right</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="rounded-2xl bg-surface-container-low p-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">mail_off</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Aucun message pour le moment.', 'No messages yet.')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les demandes du formulaire contact apparaitront ici.', 'Contact form requests will appear here.')}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <form className="rounded-[2rem] bg-primary text-white p-6 md:p-7 shadow-xl shadow-primary/20" onSubmit={handleSettingsSubmit}>
            <h2 className="font-headline text-xl font-bold mb-2">{t('Contacts du site', 'Website contacts')}</h2>
            <p className="text-primary-fixed/80 text-sm mb-5">{t('Ces informations servent aux confirmations et aux boutons de contact.', 'This information is used in confirmations and contact buttons.')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: t('Telephone', 'Phone'), type: 'tel' },
                { name: 'whatsapp', label: 'WhatsApp', type: 'tel' },
                { name: 'address', label: t('Adresse', 'Address'), type: 'text' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-primary-fixed/80 mb-2" htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={settings[field.name]}
                    onChange={(event) => setSettings((current) => ({ ...current, [field.name]: event.target.value }))}
                    className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:ring-4 focus:ring-white/10"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="mt-5 bg-secondary-container text-on-secondary-container rounded-xl px-6 py-3 font-bold hover:scale-105 transition-transform">
              {t('Enregistrer les contacts', 'Save contacts')}
            </button>
          </form>
        )}

        {activeTab === 'candidatures' && (
          <div className="space-y-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">description</span>
                <p className="font-headline text-2xl font-extrabold text-primary">{candidatures.length}</p>
                <p className="text-sm text-on-surface-variant">{t('candidature(s) recu(s)', 'application(s) received')}</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">person</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {candidatures.filter((c) => c.email).length}
                </p>
                <p className="text-sm text-on-surface-variant">{t('contact(s) par email', 'email contact(s)')}</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">attach_file</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {candidatures.filter((c) => c.cvFileName || c.cvUrl).length}
                </p>
                <p className="text-sm text-on-surface-variant">{t('cv joint(s)', 'CV(s) attached')}</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
              {isLoading ? (
                <div className="rounded-2xl bg-surface-container-low p-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Chargement des candidatures...', 'Loading applications...')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les donnees sont recuperees depuis Supabase.', 'Data is being retrieved from Supabase.')}</p>
                </div>
              ) : candidatures.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {candidatures.map((c) => (
                      <article key={c.id} className="rounded-2xl bg-surface-container-low p-5">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div>
                            <p className="font-headline text-lg font-bold text-primary">{c.fullName}</p>
                            <p className="text-sm font-bold text-on-surface mt-1">{c.profile}</p>
                            {c.email && (
                              <p className="text-sm text-on-surface-variant mt-1">{c.email}</p>
                            )}
                            {c.phone && (
                              <p className="text-sm text-on-surface-variant mt-1">{c.phone}</p>
                            )}
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant">
                            {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(c.createdAt))}
                          </span>
                        </div>

                        {c.cvFileName && (
                          <div className="mt-4 rounded-xl bg-white px-4 py-3 flex items-center gap-2 text-sm text-on-surface-variant border border-outline-variant/20">
                            <span className="material-symbols-outlined text-base">attach_file</span>
                            <span className="font-medium truncate max-w-[160px]">{c.cvFileName}</span>
                            {c.cvUrl && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => downloadCv(c.cvUrl, c.cvFileName, c.id)}
                                  disabled={downloadingCvId === c.id}
                                  className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-bold hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {downloadingCvId === c.id ? (
                                    <>
                                      <span className="material-symbols-outlined text-base align-[-1px] animate-spin">refresh</span>
                                      {t('Chargement...', 'Loading...')}
                                    </>
                                  ) : (
                                    <>
                                      <span className="material-symbols-outlined text-base align-[-1px]">download</span>
                                      {t('Telecharger', 'Download')}
                                    </>
                                  )}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => viewCv(c.cvUrl)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-outline-variant/20 text-[#0B1D33] font-bold hover:bg-primary-fixed hover:text-white transition-colors"
                                >
                                  <span className="material-symbols-outlined text-base align-[-1px]">visibility</span>
                                  {t('Voir', 'View')}
                                </button>
                              </>
                            )}
                          </div>
                        )}

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          {c.email && (
                            <a
                              href={`mailto:${c.email}`}
                              className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                            >
                              <span className="material-symbols-outlined text-base align-[-3px] mr-2">mail</span>
                              {c.email}
                            </a>
                          )}
                          {c.phone && (
                            <a
                              href={formatPhoneHref(c.phone)}
                              className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                            >
                              <span className="material-symbols-outlined text-base align-[-3px] mr-2">call</span>
                              {c.phone}
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>

                  {(() => {
                    const totalPages = Math.max(1, Math.ceil(candidatures.length / candidaturesPageSize));
                    const safePage = Math.min(candidaturesPage, totalPages);
                    const start = (safePage - 1) * candidaturesPageSize;
                    const end = start + candidaturesPageSize;

                    return (
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <span>{t('Candidatures par page', 'Applications per page')}</span>
                          <select
                            value={candidaturesPageSize}
                            onChange={(event) => setCandidaturesPageSize(Number(event.target.value))}
                            className="rounded-xl bg-surface-container-low px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                          >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </select>
                          <span>
                            {start + 1}-{Math.min(end, candidatures.length)} / {candidatures.length}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={safePage <= 1}
                            onClick={() => setCandidaturesPage((page) => Math.max(1, page - 1))}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">chevron_left</span>
                            {t('Precedent', 'Previous')}
                          </button>

                          <span className="text-sm font-bold text-on-surface">
                            {t('Page', 'Page')} {safePage} / {totalPages}
                          </span>

                          <button
                            type="button"
                            disabled={safePage >= totalPages}
                            onClick={() => setCandidaturesPage((page) => Math.min(totalPages, page + 1))}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors disabled:opacity-50"
                          >
                            {t('Suivant', 'Next')}
                            <span className="material-symbols-outlined text-base">chevron_right</span>
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="rounded-2xl bg-surface-container-low p-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">description_off</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Aucune candidature pour le moment.', 'No applications yet.')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les candidatures apparaitront ici.', 'Job applications will appear here.')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
