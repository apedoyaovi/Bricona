import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const CandidatureFAB = ({ onApply }) => {
  const { t } = useLanguage();
  const actionClassName = 'flex min-h-[62px] w-[58px] flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 text-center transition hover:-translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 sm:min-h-[68px] sm:w-[68px]';
  const tooltipClassName = 'pointer-events-none absolute right-full top-1/2 mr-3 w-56 -translate-y-1/2 translate-x-1 rounded-xl bg-[#0B1D33] px-3.5 py-3 text-left text-xs font-medium leading-5 text-white opacity-0 shadow-xl transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100';

  return (
    <nav
      aria-label={t('Navigation rapide', 'Quick navigation')}
      className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1.5 rounded-l-2xl border border-r-0 border-slate-200 bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(0,25,70,0.2)] backdrop-blur sm:gap-2 sm:p-2"
    >
      {onApply ? (
        <button
          type="button"
          onClick={onApply}
          className={`group relative ${actionClassName} bg-[#0B1D33] text-[#F2B705] hover:bg-[#132d4c]`}
          aria-label={t('Postuler : ouvrir le formulaire de candidature', 'Apply: open the application form')}
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">description</span>
          <span className="text-[9px] font-bold leading-tight sm:text-[10px]">{t('Postuler', 'Apply')}</span>
          <span role="tooltip" className={tooltipClassName}>
            {t('Ouvrir le formulaire pour envoyer votre candidature.', 'Open the form to submit your application.')}
          </span>
        </button>
      ) : (
        <Link
          to="/carrieres"
          className={`group relative ${actionClassName} bg-[#0B1D33] text-[#F2B705] hover:bg-[#132d4c]`}
          aria-label={t('Postuler : accéder à la page Carrières', 'Apply: go to the Careers page')}
        >
          <span className="material-symbols-outlined text-xl" aria-hidden="true">description</span>
          <span className="text-[9px] font-bold leading-tight sm:text-[10px]">{t('Postuler', 'Apply')}</span>
          <span role="tooltip" className={tooltipClassName}>
            {t('Accéder à la page Carrières pour découvrir les opportunités et postuler.', 'Go to Careers to explore opportunities and apply.')}
          </span>
        </Link>
      )}
      <Link
        to="/contact"
        className={`group relative ${actionClassName} bg-slate-50 text-[#0B1D33] hover:bg-slate-100`}
        aria-label={t('Contacter : accéder à la page Contact', 'Contact: go to the Contact page')}
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">mail</span>
        <span className="text-[9px] font-bold leading-tight sm:text-[10px]">{t('Contacter', 'Contact')}</span>
        <span role="tooltip" className={tooltipClassName}>
          {t('Accéder à la page Contact pour nous écrire.', 'Go to the Contact page to get in touch.')}
        </span>
      </Link>
    </nav>
  );
};

export default CandidatureFAB;
