import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  formatEventDate,
  getEventRegistrations,
  getSiteEventsFromSupabase,
  getSiteEvents,
} from '../utils/siteContent';

const adminSessionKey = 'bricona-admin-session';

const formatRegistrationDate = (date) => {
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

const AdminInscriptions = () => {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState(() => getSiteEvents());
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = typeof window !== 'undefined'
    && window.sessionStorage.getItem(adminSessionKey) === 'active';

  const eventById = (id) => events.find((event) => event.id === id);

  const refreshRegistrations = async () => {
    setIsLoading(true);
    setError('');

    try {
      const [nextRegistrations, nextEvents] = await Promise.all([
        getEventRegistrations(),
        getSiteEventsFromSupabase(),
      ]);

      setRegistrations(nextRegistrations);
      setEvents(nextEvents);
      setNotice('Inscriptions actualisees.');
    } catch {
      setError("Impossible de charger les inscriptions. Verifiez les policies Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshRegistrations();
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
              Connectez-vous d'abord a l'espace proprietaire pour consulter les inscriptions recues.
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
              Inscriptions recues
            </h1>
            <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
              Consultez les participants inscrits aux conferences, meetings et ateliers Bricona.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={refreshRegistrations}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-5 py-3 text-sm font-bold hover:bg-primary-container transition-colors"
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
            <span className="material-symbols-outlined text-3xl text-primary mb-3">groups</span>
            <p className="font-headline text-2xl font-extrabold text-primary">{registrations.length}</p>
            <p className="text-sm text-on-surface-variant">participant(s) enregistres</p>
          </div>
          <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-primary mb-3">event</span>
            <p className="font-headline text-2xl font-extrabold text-primary">{events.length}</p>
            <p className="text-sm text-on-surface-variant">evenement(s) disponibles</p>
          </div>
          <div className="rounded-2xl bg-white border border-outline-variant/20 p-5 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-primary mb-3">mail</span>
            <p className="font-headline text-2xl font-extrabold text-primary">
              {registrations.filter((registration) => registration.email).length}
            </p>
            <p className="text-sm text-on-surface-variant">contact(s) par email</p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
          {isLoading ? (
            <div className="rounded-2xl bg-surface-container-low p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-3">hourglass_top</span>
              <p className="font-headline font-bold text-primary mb-1">Chargement des inscriptions...</p>
              <p className="text-sm text-on-surface-variant">Les donnees sont recuperees depuis Supabase.</p>
            </div>
          ) : registrations.length > 0 ? (
            <div className="space-y-4">
              {registrations.map((registration) => {
                const eventItem = eventById(registration.eventId);

                return (
                  <article key={registration.id} className="rounded-2xl bg-surface-container-low p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <p className="font-headline text-lg font-bold text-primary">{registration.fullName}</p>
                        <p className="text-sm font-bold text-on-surface mt-1">
                          {eventItem?.title || 'Evenement supprime'}
                        </p>
                        {eventItem && (
                          <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-on-surface-variant">
                            <span>{formatEventDate(eventItem.date)}</span>
                            <span>{eventItem.time}</span>
                            <span>{eventItem.place}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                          {registration.profile}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-on-surface-variant">
                          {formatRegistrationDate(registration.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <a
                        href={`tel:${registration.phone}`}
                        className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                      >
                        <span className="material-symbols-outlined text-base align-[-3px] mr-2">call</span>
                        {registration.phone}
                      </a>
                      <a
                        href={`mailto:${registration.email}`}
                        className="rounded-xl bg-white px-4 py-3 font-bold text-primary hover:bg-primary-fixed transition-colors"
                      >
                        <span className="material-symbols-outlined text-base align-[-3px] mr-2">mail</span>
                        {registration.email}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-surface-container-low p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-3">person_off</span>
              <p className="font-headline font-bold text-primary mb-1">Aucune inscription pour le moment.</p>
              <p className="text-sm text-on-surface-variant">Les nouvelles inscriptions apparaitront ici apres validation du formulaire public.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminInscriptions;
