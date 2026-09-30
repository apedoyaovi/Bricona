import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const PageNonTrouvee = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-8 pt-24 bg-surface">
      <div className="max-w-xl">
        <p className="font-label editorial-caps text-primary font-bold text-xs mb-4">Erreur 404</p>
        <h1 className="font-headline text-8xl lg:text-9xl font-extrabold text-primary-container mb-6">404</h1>
        <h2 className="font-headline text-3xl font-bold text-on-surface mb-4">{t('Page non trouvée', 'Page not found')}</h2>
        <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
          {t("Désolé, la page que vous recherchez n'existe pas ou a été déplacée.", 'Sorry, the page you are looking for does not exist or has been moved.')}
        </p>
        <Link
          to="/"
          className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-xl font-bold text-lg hover:brightness-105 transition-all shadow-lg inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined">home</span>
          {t("Retour à l'accueil", 'Back to home')}
        </Link>
      </div>
    </div>
  );
};

export default PageNonTrouvee;