import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';
import CandidatureModal from './CandidatureModal';

const CandidatureFAB = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed top-1/2 right-6 z-50 -translate-y-1/2 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full shadow-[0_12px_40px_rgba(0,50,125,0.35)] hover:shadow-[0_16px_50px_rgba(0,50,125,0.55)] hover:scale-105 transition-all duration-300 active:scale-95 min-w-[48px]"
          style={{ background: '#0B1D33', color: '#F2B705', border: '1px solid rgba(242,183,5,0.35)' }}
          aria-label={t('Postuler', 'Apply')}
        >
          <span className="material-symbols-outlined text-lg group-hover:opacity-100 transition-opacity">description</span>
          <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t('Postuler', 'Apply')}
          </span>
        </button>
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full shadow-[0_12px_40px_rgba(0,50,125,0.3)] hover:shadow-[0_16px_50px_rgba(0,50,125,0.45)] hover:scale-105 transition-all duration-300 active:scale-95 min-w-[48px]"
          style={{ background: '#ffffff', color: '#0B1D33', border: '1px solid rgba(11,29,51,0.2)' }}
          aria-label={t('Contacter', 'Contact')}
        >
          <span className="material-symbols-outlined text-lg group-hover:opacity-100 transition-opacity">mail</span>
          <span className="absolute right-full mr-3 whitespace-nowrap text-xs font-bold text-[#0B1D33] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {t('Contacter', 'Contact')}
          </span>
        </Link>
      </div>
      <CandidatureModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CandidatureFAB;
