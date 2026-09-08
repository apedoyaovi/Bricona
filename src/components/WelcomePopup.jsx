import { useEffect, useState } from 'react';

const STORAGE_KEY = 'enesense-welcome-popup-closed';

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const alreadyClosed = sessionStorage.getItem(STORAGE_KEY);
    if (!alreadyClosed) {
      const timer = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, 'true'); } catch {}
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <button
        type="button"
        onClick={close}
        aria-label="Fermer"
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-md cursor-pointer"
      />
      <div className="relative w-full max-w-md rounded-[2rem] bg-white border border-outline-variant/20 p-8 shadow-[0_40px_120px_rgba(0,25,70,0.35)] animate-fade-up overflow-hidden">
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary-container/25 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-lg">
            <span className="material-symbols-outlined text-3xl">auto_awesome</span>
          </div>

          <h2 className="font-headline text-2xl font-extrabold text-on-surface text-center leading-tight">
            Bienvenue chez <span className="text-primary">Enésense</span>
          </h2>

          <p className="mt-3 text-sm text-on-surface-variant text-center leading-relaxed">
            Vous cherchez à digitaliser votre activité, automatiser vos processus ou développer un outil sur mesure ? Vous êtes au bon endroit.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2">
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-xl">verified</span>
              <span className="text-sm font-medium text-on-surface">Digitalisation sur mesure</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-xl">auto_mode</span>
              <span className="text-sm font-medium text-on-surface">Automatisation intelligente</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 border border-outline-variant/10">
              <span className="material-symbols-outlined text-primary text-xl">code</span>
              <span className="text-sm font-medium text-on-surface">Développement de solutions sur mesure</span>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-6 w-full bg-primary text-white font-headline font-bold py-3.5 rounded-2xl text-base hover:brightness-110 transition-all active:scale-95 shadow-lg"
          >
            Découvrir nos services
          </button>

          <p className="mt-3 text-center text-[11px] text-outline">
            Nous sommes à Colombs, France et disponibles pour vous accompagner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
