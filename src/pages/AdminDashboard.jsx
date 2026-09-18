import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getSiteSettings,
  saveSiteSettings,
  getSiteSettingsFromSupabase,
  saveSiteSettingsToSupabase,
  getContactMessages,
} from '../utils/siteContent';
import ConfirmDialog from '../components/ConfirmDialog';

const adminPassword = 'bricona-admin-2026';
const adminSessionKey = 'bricona-admin-session';

const AdminDashboard = () => {
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesPageSize, setMessagesPageSize] = useState(10);
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
    confirmLabel: 'Confirmer',
    variant: 'primary',
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog((current) => ({ ...current, open: false, onConfirm: null }));
  };

  const requestConfirmation = ({ title, message, confirmLabel = 'Confirmer', variant = 'primary', onConfirm }) => {
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
      setLoginError('Mot de passe incorrect.');
      return;
    }

    window.sessionStorage.setItem(adminSessionKey, 'active');
    setIsAuthenticated(true);
    setPassword('');
    setLoginError('');
  };

  const handleLogout = () => {
    requestConfirmation({
      title: 'Deconnexion',
      message: 'Voulez-vous vraiment quitter l espace proprietaire ?',
      confirmLabel: 'Se deconnecter',
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
      setMessages(await getContactMessages());
      setNotice('Messages actualises.');
    } catch {
      setError('Impossible de charger les messages. Verifiez la policy select Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'messages') {
      refreshMessages();
    }
  }, [isAuthenticated, activeTab]);

  useEffect(() => {
    setMessagesPage(1);
  }, [messages.length, messagesPageSize]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'settings') {
      (async () => {
        setIsLoading(true);
        setError('');

        try {
          const remoteSettings = await getSiteSettingsFromSupabase();
          setSettings(remoteSettings);
        } catch {
          setError('Impossible de charger les parametres depuis Supabase.');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isAuthenticated, activeTab]);

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();

    const trimmed = {
      email: settings.email.trim(),
      phone: settings.phone.trim(),
      whatsapp: settings.whatsapp.trim(),
      address: settings.address.trim(),
    };

    requestConfirmation({
      title: 'Mettre a jour les contacts ?',
      message: 'Ces informations seront utilisees dans la page contact, les confirmations et les boutons flottants.',
      confirmLabel: 'Enregistrer',
      onConfirm: async () => {
        try {
          saveSiteSettings(trimmed);
          await saveSiteSettingsToSupabase(trimmed);
          setSettings(trimmed);
          setNotice('Contacts du site mis a jour.');
        } catch {
          setError('Parametres sauvegardes localement, mais la synchronisation Supabase a echoue.');
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
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Acces securise</p>
            <h1 className="font-headline text-2xl font-extrabold text-on-surface mb-3">
              Espace proprietaire
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Entrez le mot de passe administrateur pour gerer les messages et les parametres du site.
            </p>

            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="admin-password">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl bg-surface-container-low px-4 py-3 pr-12 text-sm outline-none focus:ring-4 focus:ring-primary/10"
                placeholder="Mot de passe admin"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
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
              Se connecter
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
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Espace proprietaire</p>
            <h1 className="font-headline text-3xl lg:text-4xl font-extrabold text-on-surface mb-3">
              Administration
            </h1>
            <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
              Consultez les messages recus et parametrez les informations de contact du site.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-5 py-3 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors"
          >
            Deconnexion
            <span className="material-symbols-outlined text-base">logout</span>
          </button>
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

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('messages')}
            className={`rounded-2xl p-5 text-left shadow-sm transition-colors ${
              activeTab === 'messages'
                ? 'bg-primary text-white shadow-[0_18px_40px_rgba(0,50,125,0.18)]'
                : 'bg-white border border-outline-variant/20 hover:bg-primary-fixed'
            }`}
          >
            <span className="material-symbols-outlined text-3xl mb-4">mark_email_unread</span>
            <span className={`block font-headline text-lg font-bold mb-1 ${activeTab === 'messages' ? 'text-white' : 'text-primary'}`}>
              Messages recus
            </span>
            <span className={`block text-sm ${activeTab === 'messages' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              Consulter les demandes envoyees depuis la page contact.
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
              Parametres du site
            </span>
            <span className={`block text-sm ${activeTab === 'settings' ? 'text-primary-fixed/80' : 'text-on-surface-variant'}`}>
              Mettre a jour les contacts affiches aux visiteurs.
            </span>
          </button>
        </div>

        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">mark_email_unread</span>
                <p className="font-headline text-2xl font-extrabold text-primary">{messages.length}</p>
                <p className="text-sm text-on-surface-variant">message(s) recus</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">business_center</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {messages.filter((message) => message.company).length}
                </p>
                <p className="text-sm text-on-surface-variant">demande(s) avec entreprise</p>
              </div>
              <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
                <span className="material-symbols-outlined text-3xl text-primary mb-3">alternate_email</span>
                <p className="font-headline text-2xl font-extrabold text-primary">
                  {messages.filter((message) => message.email).length}
                </p>
                <p className="text-sm text-on-surface-variant">contact(s) par email</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
              {isLoading ? (
                <div className="rounded-2xl bg-surface-container-low p-8 text-center">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
                  <p className="font-headline font-bold text-primary mb-1">Chargement des messages...</p>
                  <p className="text-sm text-on-surface-variant">Les donnees sont recuperees depuis Supabase.</p>
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
                            {message.company && (
                              <p className="text-sm text-on-surface-variant mt-1">{message.company}</p>
                            )}
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant">
                            {new Intl.DateTimeFormat('fr-FR', {
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
                    const pageItems = messages.slice(start, end);

                    return (
                      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <span>Messages par page</span>
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
                            Precedent
                          </button>

                          <span className="text-sm font-bold text-on-surface">
                            Page {safePage} / {totalPages}
                          </span>

                          <button
                            type="button"
                            disabled={safePage >= totalPages}
                            onClick={() => setMessagesPage((page) => Math.min(totalPages, page + 1))}
                            className="inline-flex items-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors disabled:opacity-50"
                          >
                            Suivant
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
                  <p className="font-headline font-bold text-primary mb-1">Aucun message pour le moment.</p>
                  <p className="text-sm text-on-surface-variant">Les demandes du formulaire contact apparaitront ici.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <form className="rounded-[2rem] bg-primary text-white p-6 md:p-7 shadow-xl shadow-primary/20" onSubmit={handleSettingsSubmit}>
            <h2 className="font-headline text-xl font-bold mb-2">Contacts du site</h2>
            <p className="text-primary-fixed/80 text-sm mb-5">Ces informations servent aux confirmations et aux boutons de contact.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Telephone', type: 'tel' },
                { name: 'whatsapp', label: 'WhatsApp', type: 'tel' },
                { name: 'address', label: 'Adresse', type: 'text' },
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
              Enregistrer les contacts
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
