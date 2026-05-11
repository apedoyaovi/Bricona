import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getContactMessages } from '../utils/siteContent';

const adminSessionKey = 'bricona-admin-session';

const formatMessageDate = (date) => {
  if (!date) return 'Date inconnue';

  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  } catch {
    return date;
  }
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = typeof window !== 'undefined'
    && window.sessionStorage.getItem(adminSessionKey) === 'active';

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
    if (isAuthenticated) {
      refreshMessages();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="pt-24 pb-16 min-h-screen bg-surface flex items-center">
        <section className="w-full max-w-md mx-auto px-6">
          <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-7 shadow-[0_24px_60px_rgba(0,50,125,0.10)]">
            <div className="h-14 w-14 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-2xl">lock</span>
            </div>
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Acces securise</p>
            <h1 className="font-headline text-2xl font-extrabold text-on-surface mb-3">
              Connexion requise
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Connectez-vous d'abord a l'espace proprietaire pour consulter les messages.
            </p>
            <Link
              to="/admin-evenements"
              className="inline-flex w-full items-center justify-center gap-2 bg-primary text-white rounded-xl px-6 py-4 font-bold hover:bg-primary-container transition-colors"
            >
              Aller a la connexion
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-surface">
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Espace proprietaire</p>
            <h1 className="font-headline text-3xl lg:text-4xl font-extrabold text-on-surface mb-3">
              Messages recus
            </h1>
            <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
              Consultez les demandes envoyees depuis le formulaire de contact.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={refreshMessages}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-bold hover:bg-primary-container transition-colors disabled:opacity-60"
            >
              {isLoading ? 'Chargement...' : 'Actualiser'}
              <span className="material-symbols-outlined text-base">refresh</span>
            </button>
            <Link
              to="/admin-evenements"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-outline-variant/20 px-5 py-3 text-sm font-bold text-primary hover:bg-primary-fixed transition-colors"
            >
              Retour admin
              <span className="material-symbols-outlined text-base">arrow_back</span>
            </Link>
          </div>
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
                      {formatMessageDate(message.createdAt)}
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
          ) : (
            <div className="rounded-2xl bg-surface-container-low p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-3">mail_off</span>
              <p className="font-headline font-bold text-primary mb-1">Aucun message pour le moment.</p>
              <p className="text-sm text-on-surface-variant">Les demandes du formulaire contact apparaitront ici.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminMessages;
