import { useState } from 'react';
import {
  formatEventDate,
  getEventGroups,
  getEventRegistrations,
  getEventStatus,
  getSiteEvents,
  getSiteSettings,
  saveSiteEvents,
  saveSiteSettings,
} from '../utils/siteContent';
import ConfirmDialog from '../components/ConfirmDialog';

const emptyEvent = {
  id: '',
  type: 'Conference',
  title: '',
  date: '',
  time: '',
  place: '',
  seats: '',
  description: '',
  published: true,
};

const adminPassword = 'bricona-admin-2026';
const adminSessionKey = 'bricona-admin-session';

const eventStatusMeta = {
  past: {
    title: 'Evenements passes',
    label: 'Passe',
    icon: 'history',
    badgeClass: 'bg-slate-200 text-slate-600',
  },
  current: {
    title: 'Evenements en cours',
    label: 'En cours',
    icon: 'play_circle',
    badgeClass: 'bg-secondary-container/25 text-secondary',
  },
  future: {
    title: 'Evenements futurs',
    label: 'Futur',
    icon: 'event_upcoming',
    badgeClass: 'bg-primary-fixed text-primary',
  },
};

const AdminEvenements = () => {
  const [events, setEvents] = useState(() => getSiteEvents());
  const [settings, setSettings] = useState(() => getSiteSettings());
  const [registrations, setRegistrations] = useState(() => getEventRegistrations());
  const [eventForm, setEventForm] = useState(emptyEvent);
  const [editingId, setEditingId] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEventsList, setShowEventsList] = useState(true);
  const [notice, setNotice] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => (
    typeof window !== 'undefined' && window.sessionStorage.getItem(adminSessionKey) === 'active'
  ));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
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

  const persistEvents = (nextEvents, message) => {
    setEvents(nextEvents);
    saveSiteEvents(nextEvents);
    setNotice(message);
  };

  const handleEventChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEventForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetEventForm = () => {
    setEventForm(emptyEvent);
    setEditingId(null);
    setShowEventForm(false);
  };

  const handleEventSubmit = (event) => {
    event.preventDefault();

    const cleanEvent = {
      ...eventForm,
      title: eventForm.title.trim(),
      time: eventForm.time.trim(),
      place: eventForm.place.trim(),
      description: eventForm.description.trim(),
      id: editingId || `event-${Date.now()}`,
      seats: eventForm.seats || '0',
    };
    const hasAnotherCurrentEvent = getEventStatus(cleanEvent.date) === 'current'
      && events.some((item) => item.id !== cleanEvent.id && getEventStatus(item.date) === 'current');

    if (hasAnotherCurrentEvent) {
      setNotice('Impossible : un autre evenement est deja en cours aujourd hui.');
      return;
    }

    requestConfirmation({
      title: editingId ? 'Modifier cet evenement ?' : 'Creer cet evenement ?',
      message: editingId
        ? 'Les nouvelles informations seront appliquees sur la page accueil si l evenement est publie.'
        : 'Cet evenement sera ajoute a la liste et pourra apparaitre sur la page accueil.',
      confirmLabel: editingId ? 'Enregistrer' : 'Creer',
      onConfirm: () => {
        const nextEvents = editingId
          ? events.map((item) => (item.id === editingId ? cleanEvent : item))
          : [cleanEvent, ...events];

        persistEvents(nextEvents, editingId ? 'Evenement mis a jour.' : 'Evenement cree et disponible sur la page accueil.');
        resetEventForm();
        setShowEventsList(true);
        closeConfirmDialog();
      },
    });
  };

  const editEvent = (eventItem) => {
    setEditingId(eventItem.id);
    setEventForm(eventItem);
    setShowEventForm(true);
    setNotice('');
  };

  const togglePublished = (id) => {
    const eventItem = events.find((event) => event.id === id);
    const action = eventItem?.published ? 'masquer' : 'publier';

    requestConfirmation({
      title: eventItem?.published ? 'Masquer cet evenement ?' : 'Publier cet evenement ?',
      message: `Voulez-vous vraiment ${action} cet evenement sur la page d'accueil ?`,
      confirmLabel: eventItem?.published ? 'Masquer' : 'Publier',
      onConfirm: () => {
        const nextEvents = events.map((event) => (
          event.id === id ? { ...event, published: !event.published } : event
        ));
        persistEvents(nextEvents, 'Visibilite de l evenement mise a jour.');
        closeConfirmDialog();
      },
    });
  };

  const deleteEvent = (id) => {
    requestConfirmation({
      title: 'Supprimer cet evenement ?',
      message: 'Cette action est definitive. Les visiteurs ne pourront plus voir cet evenement.',
      confirmLabel: 'Supprimer',
      variant: 'danger',
      onConfirm: () => {
        const nextEvents = events.filter((event) => event.id !== id);
        persistEvents(nextEvents, 'Evenement supprime.');
        if (editingId === id) resetEventForm();
        closeConfirmDialog();
      },
    });
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();

    requestConfirmation({
      title: 'Mettre a jour les contacts ?',
      message: 'Ces informations seront utilisees dans la page contact, les confirmations et les boutons flottants.',
      confirmLabel: 'Enregistrer',
      onConfirm: () => {
        saveSiteSettings({
          email: settings.email.trim(),
          phone: settings.phone.trim(),
          whatsapp: settings.whatsapp.trim(),
          address: settings.address.trim(),
        });
        setNotice('Contacts du site mis a jour.');
        closeConfirmDialog();
      },
    });
  };

  const refreshRegistrations = () => {
    setRegistrations(getEventRegistrations());
    setNotice('Inscriptions actualisees.');
  };

  const eventTitleById = (id) => events.find((event) => event.id === id)?.title || 'Evenement supprime';
  const groupedEvents = getEventGroups(events);

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
              Entrez le mot de passe administrateur pour gerer les conferences, meetings et contacts du site.
            </p>

            <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="admin-password">
              Mot de passe
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10"
              placeholder="Mot de passe admin"
              autoComplete="current-password"
              required
            />

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
              Gestion des conferences et meetings
            </h1>
            <p className="text-on-surface-variant text-sm max-w-2xl leading-relaxed">
              Creez les evenements visibles sur la page d'accueil, suivez les inscriptions et parametrez les contacts affiches aux visiteurs.
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

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setShowEventForm(true);
              setShowEventsList(false);
              setEditingId(null);
              setEventForm(emptyEvent);
            }}
            className="rounded-2xl bg-primary text-white p-5 text-left shadow-[0_18px_40px_rgba(0,50,125,0.18)] hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-3xl mb-4">add_circle</span>
            <span className="block font-headline text-lg font-bold mb-1">Ajouter un evenement</span>
            <span className="block text-sm text-primary-fixed/80">Creer une conference, un meeting ou un atelier.</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShowEventsList(true);
              setShowEventForm(false);
            }}
            className="rounded-2xl bg-white border border-outline-variant/20 p-5 text-left shadow-sm hover:bg-primary-fixed transition-colors"
          >
            <span className="material-symbols-outlined text-3xl text-primary mb-4">format_list_bulleted</span>
            <span className="block font-headline text-lg font-bold text-primary mb-1">Voir tous les evenements</span>
            <span className="block text-sm text-on-surface-variant">Afficher les evenements passes, en cours et futurs.</span>
          </button>
        </div>

        <div className="mb-8 rounded-2xl bg-primary text-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-xl shadow-primary/20">
          <div>
            <p className="font-headline text-lg font-bold mb-1">Vous voulez programmer un evenement ?</p>
            <p className="text-primary-fixed/80 text-sm">Creez une conference, un meeting ou un atelier, puis publiez-le sur la page d'accueil.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowEventForm(true);
              setShowEventsList(false);
              setEditingId(null);
              setEventForm(emptyEvent);
            }}
            className="inline-flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container px-5 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all"
          >
            Programmer
            <span className="material-symbols-outlined text-base">add_circle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {showEventForm && (
          <form
            className="lg:col-span-5 rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-[0_24px_60px_rgba(0,50,125,0.08)]"
            onSubmit={handleEventSubmit}
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  {editingId ? 'Modifier un evenement' : 'Creer un evenement'}
                </h2>
                <p className="text-on-surface-variant text-sm">Conference, meeting ou atelier.</p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetEventForm}
                  className="h-10 w-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center hover:bg-primary-fixed transition-colors"
                  aria-label="Annuler la modification"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="type">Type</label>
                  <select id="type" name="type" value={eventForm.type} onChange={handleEventChange} className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10">
                    <option>Conference</option>
                    <option>Meeting</option>
                    <option>Atelier</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="seats">Places</label>
                  <input id="seats" name="seats" value={eventForm.seats} onChange={handleEventChange} required type="number" min="0" className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" placeholder="30" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="title">Titre</label>
                <input id="title" name="title" value={eventForm.title} onChange={handleEventChange} required className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" placeholder="Nom de la conference" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="date">Date</label>
                  <input id="date" name="date" value={eventForm.date} onChange={handleEventChange} required type="date" className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="time">Heure</label>
                  <input id="time" name="time" value={eventForm.time} onChange={handleEventChange} required className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" placeholder="10:00 - 12:00" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="place">Lieu</label>
                <input id="place" name="place" value={eventForm.place} onChange={handleEventChange} required className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10" placeholder="En ligne, Lome, Bricona Hub..." />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="description">Description</label>
                <textarea id="description" name="description" value={eventForm.description} onChange={handleEventChange} required rows={4} className="w-full rounded-xl bg-surface-container-low px-4 py-3 text-sm outline-none resize-none focus:ring-4 focus:ring-primary/10" placeholder="Ce que les participants vont apprendre..." />
              </div>

              <label className="flex items-center gap-3 rounded-xl bg-surface-container-low px-4 py-3 text-sm font-bold text-primary">
                <input type="checkbox" name="published" checked={eventForm.published} onChange={handleEventChange} className="h-4 w-4 accent-primary" />
                Afficher sur la page d'accueil
              </label>
            </div>

            <button type="submit" className="mt-6 w-full bg-primary text-white rounded-xl px-6 py-4 font-bold hover:bg-primary-container transition-colors">
              {editingId ? 'Enregistrer les modifications' : 'Creer l evenement'}
            </button>
          </form>
          )}

          <div className={`${showEventForm ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>
            {showEventsList && (
            <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">Evenements programmes</h2>
                  <p className="text-on-surface-variant text-sm">{events.length} evenement(s) classes par statut.</p>
                </div>
              </div>

              <div className="space-y-8">
                {['current', 'future', 'past'].map((status) => (
                  <div key={status}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">{eventStatusMeta[status].icon}</span>
                      </div>
                      <div>
                        <h3 className="font-headline text-lg font-bold text-on-surface">{eventStatusMeta[status].title}</h3>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">{groupedEvents[status].length} evenement(s)</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {groupedEvents[status].length > 0 ? (
                        groupedEvents[status].map((event) => (
                          <div key={event.id} className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                              <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="rounded-full bg-primary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary">{event.type}</span>
                                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${eventStatusMeta[status].badgeClass}`}>
                                    {eventStatusMeta[status].label}
                                  </span>
                                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${event.published ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                                    {event.published ? 'Publie' : 'Masque'}
                                  </span>
                                </div>
                                <h3 className="font-headline text-lg font-bold text-primary mb-1">{event.title}</h3>
                                <p className="text-sm text-on-surface-variant mb-3">{event.description}</p>
                                <div className="flex flex-wrap gap-3 text-xs font-bold text-on-surface-variant">
                                  <span>{formatEventDate(event.date)}</span>
                                  <span>{event.time}</span>
                                  <span>{event.place}</span>
                                  <span>{event.seats} places</span>
                                </div>
                              </div>
                              <div className="flex md:flex-col gap-2 shrink-0">
                                <button type="button" onClick={() => editEvent(event)} className="h-10 w-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Modifier">
                                  <span className="material-symbols-outlined text-lg">edit</span>
                                </button>
                                <button type="button" onClick={() => togglePublished(event.id)} className="h-10 w-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center hover:bg-secondary-container transition-colors" aria-label="Changer la visibilite">
                                  <span className="material-symbols-outlined text-lg">{event.published ? 'visibility_off' : 'visibility'}</span>
                                </button>
                                <button type="button" onClick={() => deleteEvent(event.id)} className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors" aria-label="Supprimer">
                                  <span className="material-symbols-outlined text-lg">delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="rounded-2xl bg-surface-container-low p-5 text-sm text-on-surface-variant">
                          Aucun evenement dans cette categorie.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}

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

            <div className="rounded-[2rem] bg-white border border-outline-variant/20 p-6 md:p-7 shadow-sm">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="font-headline text-xl font-bold text-on-surface">Inscriptions recues</h2>
                  <p className="text-on-surface-variant text-sm">{registrations.length} participant(s) enregistres.</p>
                </div>
                <button type="button" onClick={refreshRegistrations} className="h-10 w-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Actualiser">
                  <span className="material-symbols-outlined text-lg">refresh</span>
                </button>
              </div>

              <div className="space-y-3">
                {registrations.length > 0 ? (
                  registrations.map((registration) => (
                    <div key={registration.id} className="rounded-2xl bg-surface-container-low p-4">
                      <p className="font-bold text-primary">{registration.fullName}</p>
                      <p className="text-sm text-on-surface-variant">{eventTitleById(registration.eventId)}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-on-surface-variant">
                        <span>{registration.phone}</span>
                        <span>{registration.email}</span>
                        <span>{registration.profile}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-surface-container-low p-5 text-sm text-on-surface-variant">
                    Aucune inscription pour le moment.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminEvenements;
