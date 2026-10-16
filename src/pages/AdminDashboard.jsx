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
  getPwaInstallPrompt,
  subscribeToPwaInstallPrompt,
  takePwaInstallPrompt,
} from '../utils/pwaInstallPrompt.js';
import {
  isPushSupported,
  isPushConfigured,
  isSubscribed,
  getPushBadgeCount,
  clearPushBadgeCount,
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
  const [expandedMessageIds, setExpandedMessageIds] = useState(() => new Set());
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
  const [pushBadgeCount, setPushBadgeCount] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(() => getPwaInstallPrompt());
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [newCandidaturesCount, setNewCandidaturesCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => (
    typeof window !== 'undefined' && window.sessionStorage.getItem(adminSessionKey) === 'active'
  ));
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState(() => (
    new URLSearchParams(window.location.search).get('tab') === 'candidatures'
      ? 'candidatures'
      : 'messages'
  ));
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

  const markPushNotificationsAsViewed = async () => {
    try {
      setPushBadgeCount(await clearPushBadgeCount());
    } catch (error) {
      console.error('Unable to clear push notification badge:', error);
      setError(t('Impossible de mettre a jour le badge de notifications.', 'Unable to update the notification badge.'));
    }
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
    const supported = isPushSupported();
    setPushSupported(supported);
    if ('Notification' in window) {
      setPushPermission(Notification.permission);
    }
    if (!supported) return;

    try {
      setPushSubscribed(await isSubscribed());
    } catch (error) {
      console.error('Unable to check push subscription:', error);
      setError(t('Impossible de verifier les notifications de cet appareil.', 'Unable to check this device’s push notifications.'));
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
        if (!isPushConfigured()) {
          throw new Error('Configurez Supabase et VITE_PUBLIC_VAPID_KEY avant d’activer les notifications.');
        }
        await requestNotificationPermission();
        await subscribeToPush();
        setPushSubscribed(true);
        setNotice(t(
          "Cet appareil est abonne aux notifications. L'envoi automatique doit aussi etre configure cote serveur Supabase.",
          'This device is subscribed to notifications. Automatic delivery must also be configured on the Supabase server.'
        ));
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
      if ('Notification' in window) {
        setPushPermission(Notification.permission);
      }
    }
  };

  const handleInstallPWA = async () => {
    const prompt = takePwaInstallPrompt();
    if (!prompt) return;
    setDeferredPrompt(null);
    setShowInstallBanner(false);
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
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
    if (!isAuthenticated || !('serviceWorker' in navigator)) return undefined;

    let active = true;
    const handlePushBadgeCount = (event) => {
      if (event.data?.type === 'PUSH_BADGE_COUNT') {
        setPushBadgeCount(event.data.count);
      }
    };

    navigator.serviceWorker.addEventListener('message', handlePushBadgeCount);
    getPushBadgeCount()
      .then((count) => {
        if (active) setPushBadgeCount(count);
      })
      .catch((error) => {
        console.error('Unable to read push notification badge:', error);
      });

    return () => {
      active = false;
      navigator.serviceWorker.removeEventListener('message', handlePushBadgeCount);
    };
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
    return subscribeToPwaInstallPrompt((prompt) => {
      setDeferredPrompt(prompt);
      if (!prompt) setShowInstallBanner(false);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated && deferredPrompt) {
      setShowInstallBanner(true);
    }
  }, [isAuthenticated, deferredPrompt]);

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
      <main className="flex min-h-screen items-center bg-surface px-4 py-10 sm:px-6 sm:py-16">
        <section className="mx-auto w-full max-w-md">
          <form
            className="rounded-3xl border border-outline-variant/20 bg-white p-5 shadow-[0_24px_60px_rgba(0,50,125,0.10)] sm:rounded-[2rem] sm:p-7"
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
    <main className="min-h-screen bg-[#f5f7fb]">
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
        <div className="fixed top-3 left-3 right-3 z-[60] flex items-center gap-2 rounded-2xl border border-outline-variant/20 bg-white px-3 py-2.5 shadow-[0_12px_40px_rgba(0,50,125,0.25)] animate-slide-down sm:left-1/2 sm:right-auto sm:w-max sm:max-w-[calc(100vw-2rem)] sm:-translate-x-1/2 sm:gap-3 sm:rounded-full sm:px-4">
          <span className="material-symbols-outlined text-primary text-lg">phone_android</span>
          <span className="min-w-0 flex-1 text-sm font-bold text-on-surface">{t('Installer Enésense Admin', 'Install Enésense Admin')}</span>
          <button
            type="button"
            onClick={handleInstallPWA}
            className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-container"
          >
            {t('Installer', 'Install')}
          </button>
          <button
            type="button"
            onClick={() => setShowInstallBanner(false)}
            className="shrink-0 p-2 text-on-surface-variant transition-colors hover:text-primary"
            aria-label={t('Fermer', 'Close')}
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
      <div className="min-h-screen lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:h-screen lg:w-[248px] lg:flex-col">
          <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <span className="material-symbols-outlined">dashboard</span>
            </span>
            <div>
              <p className="font-headline text-sm font-extrabold tracking-wide text-primary">ENÉSENSE</p>
              <p className="text-[11px] font-medium text-slate-500">{t('Administration', 'Admin dashboard')}</p>
            </div>
          </div>

          <p className="px-6 pb-2 pt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            {t('Espace de travail', 'Workspace')}
          </p>
          <nav className="space-y-1 px-3" aria-label={t('Navigation administration', 'Admin navigation')}>
            <button
              type="button"
              onClick={() => {
                markMessagesAsViewed();
                setActiveTab('messages');
                refreshMessages();
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                activeTab === 'messages' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">inbox</span>
              <span className="flex-1">{t('Messages', 'Messages')}</span>
              {newMessagesCount > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeTab === 'messages' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'}`}>
                  {newMessagesCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                markCandidaturesAsViewed();
                setActiveTab('candidatures');
                refreshCandidatures();
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                activeTab === 'candidatures' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">work_outline</span>
              <span className="flex-1">{t('Candidatures', 'Applications')}</span>
              {newCandidaturesCount > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeTab === 'candidatures' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'}`}>
                  {newCandidaturesCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${
                activeTab === 'settings' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>{t('Parametres du site', 'Site settings')}</span>
            </button>
          </nav>

          <div className="mt-auto border-t border-slate-100 p-4">
            {pushSupported && (
              <button
                type="button"
                onClick={handleTogglePush}
                disabled={pushLoading}
                className={`mb-3 flex min-h-11 w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-bold transition-colors disabled:opacity-60 ${
                  pushSubscribed ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {pushSubscribed ? 'notifications_active' : pushPermission === 'denied' ? 'notifications_off' : 'notifications_none'}
                </span>
                <span>{pushSubscribed ? t('Notifications actives', 'Notifications enabled') : t('Activer notifications', 'Enable notifications')}</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              {t('Deconnexion', 'Log out')}
            </button>
          </div>
        </aside>

      <section className="min-w-0 px-4 pb-8 pt-4 sm:px-6 lg:col-start-2 lg:px-8 lg:pt-[104px] xl:px-10">
        <header className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between lg:fixed lg:left-[248px] lg:right-0 lg:top-0 lg:z-20 lg:mb-0 lg:min-h-[76px] lg:border-b lg:bg-[#f5f7fb]/95 lg:px-8 lg:py-3 lg:backdrop-blur xl:px-10">
          <div className="min-w-0">
            <p className="font-label editorial-caps mb-1 text-[10px] font-bold text-primary">{t('Espace proprietaire', 'Admin workspace')}</p>
            <h1 className="font-headline text-2xl font-extrabold text-on-surface sm:text-3xl">
              {activeTab === 'messages'
                ? t('Messages recus', 'Received messages')
                : activeTab === 'candidatures'
                  ? t('Candidatures', 'Applications')
                  : t('Parametres du site', 'Site settings')}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => {
                markMessagesAsViewed();
                markCandidaturesAsViewed();
                markPushNotificationsAsViewed();
              }}
              className="relative inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              aria-label={t('Marquer les notifications comme consultees', 'Mark notifications as read')}
              title={t('Marquer comme consultees', 'Mark as read')}
            >
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="sm:hidden">{t('Alertes', 'Alerts')}</span>
              {pushBadgeCount > 0 && (
                <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#f5f7fb] bg-red-600 px-1 text-[10px] font-bold text-white">
                  {pushBadgeCount > 9 ? '9+' : pushBadgeCount}
                </span>
              )}
            </button>
            {pushSupported && (
              <button
                type="button"
                onClick={handleTogglePush}
                disabled={pushLoading}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold transition-colors hover:bg-slate-50 disabled:opacity-60 lg:hidden ${pushSubscribed ? 'text-emerald-700' : 'text-slate-600'}`}
              >
                <span className="material-symbols-outlined text-lg">{pushSubscribed ? 'notifications_active' : 'notifications_none'}</span>
                <span>{pushSubscribed ? t('Actives', 'On') : t('Activer', 'Enable')}</span>
              </button>
            )}
          </div>
        </header>

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
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-bold text-amber-700 sm:px-5">
            <span className="material-symbols-outlined shrink-0 text-amber-500">notifications</span>
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

        <div className="mb-5 grid grid-cols-3 gap-2 lg:hidden sm:mb-8 sm:gap-4">
          <button
            type="button"
            onClick={() => {
              markMessagesAsViewed();
              setActiveTab('messages');
              refreshMessages();
            }}
            className={`min-w-0 rounded-xl p-3 text-left shadow-sm transition-colors sm:rounded-2xl sm:p-5 ${
              activeTab === 'messages'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined mb-1 text-xl sm:mb-4 sm:text-3xl">mark_email_unread</span>
            <span className={`block break-words font-headline text-xs font-bold sm:mb-1 sm:text-lg ${activeTab === 'messages' ? 'text-white' : 'text-primary'}`}>
              {t('Messages', 'Messages')}
              {newMessagesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {newMessagesCount}
                </span>
              )}
            </span>
            <span className={`hidden text-sm sm:block ${activeTab === 'messages' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              {t('Consulter les demandes envoyees depuis la page contact.', 'Review requests sent through the contact page.')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`min-w-0 rounded-xl p-3 text-left shadow-sm transition-colors sm:rounded-2xl sm:p-5 ${
              activeTab === 'settings'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined mb-1 text-xl sm:mb-4 sm:text-3xl">settings</span>
            <span className={`block break-words font-headline text-xs font-bold sm:mb-1 sm:text-lg ${activeTab === 'settings' ? 'text-white' : 'text-primary'}`}>
              {t('Parametres', 'Settings')}
            </span>
            <span className={`hidden text-sm sm:block ${activeTab === 'settings' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
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
            className={`min-w-0 rounded-xl p-3 text-left shadow-sm transition-colors sm:rounded-2xl sm:p-5 ${
              activeTab === 'candidatures'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined mb-1 text-xl sm:mb-4 sm:text-3xl">description</span>
            <span className={`block break-words font-headline text-xs font-bold sm:mb-1 sm:text-lg ${activeTab === 'candidatures' ? 'text-white' : 'text-primary'}`}>
              {t('Candidatures', 'Applications')}
              {newCandidaturesCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-red-600 text-[10px] font-bold text-white">
                  {newCandidaturesCount}
                </span>
              )}
            </span>
            <span className={`hidden text-sm sm:block ${activeTab === 'candidatures' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              {t('Consulter les candidatures recues.', 'Review received job applications.')}
            </span>
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
                  <span className="material-symbols-outlined">mark_email_unread</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{messages.length}</p>
                  <p className="text-xs text-slate-500">{t('Messages recus', 'Messages received')}</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <span className="material-symbols-outlined">business_center</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{messages.filter((message) => message.company).length}</p>
                  <p className="text-xs text-slate-500">{t('Avec entreprise', 'With a company')}</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <span className="material-symbols-outlined">alternate_email</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{messages.filter((message) => message.email).length}</p>
                  <p className="text-xs text-slate-500">{t('Contacts par email', 'Email contacts')}</p></div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
              {isLoading ? (
                <div className="rounded-2xl bg-surface-container-low p-5 text-center sm:p-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Chargement des messages...', 'Loading messages...')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les donnees sont recuperees depuis Supabase.', 'Data is being retrieved from Supabase.')}</p>
                </div>
              ) : messages.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {messages.slice(
                      (Math.min(messagesPage, Math.max(1, Math.ceil(messages.length / messagesPageSize))) - 1) * messagesPageSize,
                      Math.min(messagesPage, Math.max(1, Math.ceil(messages.length / messagesPageSize))) * messagesPageSize
                    ).map((message) => (
                      <article key={message.id} className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold uppercase text-primary sm:flex">
                            {message.fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('')}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                              <div className="min-w-0">
                                <p className="break-words text-sm font-bold text-slate-900">{message.fullName}</p>
                                <p className="mt-0.5 break-words text-xs font-medium text-primary">{message.projectType}{message.company ? ` · ${message.company}` : ''}</p>
                              </div>
                              <span className="text-[11px] text-slate-500">
                                {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }).format(new Date(message.createdAt))}
                              </span>
                            </div>
                            {message.appointmentDate && (
                              <p className="mt-2 text-xs text-slate-600">
                                <span className="material-symbols-outlined mr-1 align-[-3px] text-sm">schedule</span>
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
                            <p className={`mt-2 whitespace-pre-wrap break-words rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-600 ${expandedMessageIds.has(message.id) ? '' : 'line-clamp-2'}`}>
                              {message.message}
                            </p>
                            {message.message.length > 120 && (
                              <button
                                type="button"
                                onClick={() => setExpandedMessageIds((current) => {
                                  const next = new Set(current);
                                  if (next.has(message.id)) next.delete(message.id);
                                  else next.add(message.id);
                                  return next;
                                })}
                                className="mt-1 text-xs font-semibold text-primary hover:underline"
                              >
                                {expandedMessageIds.has(message.id) ? t('Reduire', 'Show less') : t('Lire le message', 'Read message')}
                              </button>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.email && (
                                <a href={`mailto:${message.email}`} className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-blue-100">
                                  <span className="material-symbols-outlined text-sm">mail</span>
                                  <span className="break-all">{message.email}</span>
                                </a>
                              )}
                              {message.phone && (
                                <a href={formatPhoneHref(message.phone)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                                  <span className="material-symbols-outlined text-sm">call</span>{message.phone}
                                </a>
                              )}
                            </div>
                          </div>
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
                      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-on-surface-variant sm:justify-start">
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

                        <div className="flex items-center justify-center gap-2 sm:justify-end">
                          <button
                            type="button"
                            disabled={safePage <= 1}
                            onClick={() => setMessagesPage((page) => Math.max(1, page - 1))}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-outline-variant/20 bg-white px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed disabled:opacity-50 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm"
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
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-outline-variant/20 bg-white px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed disabled:opacity-50 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm"
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
          <form className="rounded-3xl bg-primary p-4 text-white shadow-xl shadow-primary/20 sm:rounded-[2rem] sm:p-6 md:p-7" onSubmit={handleSettingsSubmit}>
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
            <button type="submit" className="mt-5 min-h-11 w-full rounded-xl bg-secondary-container px-6 py-3 font-bold text-on-secondary-container transition-transform hover:scale-[1.02] sm:w-auto">
              {t('Enregistrer les contacts', 'Save contacts')}
            </button>
          </form>
        )}

        {activeTab === 'candidatures' && (
          <div className="space-y-6">
            <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary">
                  <span className="material-symbols-outlined">description</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{candidatures.length}</p>
                  <p className="text-xs text-slate-500">{t('Candidatures recues', 'Applications received')}</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <span className="material-symbols-outlined">person</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{candidatures.filter((c) => c.email).length}</p>
                  <p className="text-xs text-slate-500">{t('Contacts email', 'Email contacts')}</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <span className="material-symbols-outlined">attach_file</span>
                </span>
                <div><p className="font-headline text-xl font-extrabold text-primary">{candidatures.filter((c) => c.cvFileName || c.cvUrl).length}</p>
                  <p className="text-xs text-slate-500">{t('CV joints', 'CVs attached')}</p></div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
              {isLoading ? (
                <div className="rounded-2xl bg-surface-container-low p-5 text-center sm:p-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
                  <p className="font-headline font-bold text-primary mb-1">{t('Chargement des candidatures...', 'Loading applications...')}</p>
                  <p className="text-sm text-on-surface-variant">{t('Les donnees sont recuperees depuis Supabase.', 'Data is being retrieved from Supabase.')}</p>
                </div>
              ) : candidatures.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {candidatures.slice(
                      (Math.min(candidaturesPage, Math.max(1, Math.ceil(candidatures.length / candidaturesPageSize))) - 1) * candidaturesPageSize,
                      Math.min(candidaturesPage, Math.max(1, Math.ceil(candidatures.length / candidaturesPageSize))) * candidaturesPageSize
                    ).map((c) => (
                      <article key={c.id} className="flex min-w-0 flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-4">
                        <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-50 text-sm font-bold uppercase text-violet-700 sm:flex">
                          {c.fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                            <div className="min-w-0">
                              <p className="break-words text-sm font-bold text-slate-900">{c.fullName}</p>
                              <p className="mt-0.5 break-words text-xs font-medium text-primary">{c.profile}</p>
                            </div>
                            <span className="text-[11px] text-slate-500">
                              {new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : 'fr-FR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              }).format(new Date(c.createdAt))}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            {c.email && (
                              <a href={`mailto:${c.email}`} className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-blue-100">
                                <span className="material-symbols-outlined text-sm">mail</span>
                                <span className="break-all">{c.email}</span>
                              </a>
                            )}
                            {c.phone && (
                              <a href={formatPhoneHref(c.phone)} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                                <span className="material-symbols-outlined text-sm">call</span>{c.phone}
                              </a>
                            )}
                            {c.cvFileName && (
                              <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
                                <span className="material-symbols-outlined text-sm">attach_file</span>
                                <span className="max-w-40 truncate">{c.cvFileName}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        {c.cvUrl && (
                          <div className="flex shrink-0 gap-2 sm:flex-col">
                            <button
                              type="button"
                              onClick={() => downloadCv(c.cvUrl, c.cvFileName, c.id)}
                              disabled={downloadingCvId === c.id}
                              className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                            >
                              <span className="material-symbols-outlined text-base">{downloadingCvId === c.id ? 'refresh' : 'download'}</span>
                              {t('Telecharger', 'Download')}
                            </button>
                            <button
                              type="button"
                              onClick={() => viewCv(c.cvUrl)}
                              className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-none"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                              {t('Voir', 'View')}
                            </button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>

                  {(() => {
                    const totalPages = Math.max(1, Math.ceil(candidatures.length / candidaturesPageSize));
                    const safePage = Math.min(candidaturesPage, totalPages);
                    const start = (safePage - 1) * candidaturesPageSize;
                    const end = start + candidaturesPageSize;

                    return (
                      <div className="mt-6 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-on-surface-variant sm:justify-start">
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

                        <div className="flex items-center justify-center gap-2 sm:justify-end">
                          <button
                            type="button"
                            disabled={safePage <= 1}
                            onClick={() => setCandidaturesPage((page) => Math.max(1, page - 1))}
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-outline-variant/20 bg-white px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed disabled:opacity-50 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm"
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
                            className="inline-flex min-h-11 flex-1 items-center justify-center gap-1 rounded-xl border border-outline-variant/20 bg-white px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary-fixed disabled:opacity-50 sm:flex-none sm:gap-2 sm:px-4 sm:text-sm"
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
      </div>
    </main>
  );
};

export default AdminDashboard;
