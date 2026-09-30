import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="font-headline text-2xl font-bold text-on-surface mb-4 flex items-center gap-3">
      <span className="w-1.5 h-6 bg-primary-container rounded-full inline-block"></span>
      {title}
    </h2>
    <div className="text-on-surface-variant leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function PolitiqueConfidentialite() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="pt-28 pb-16 px-8 bg-gradient-to-b from-surface-container-low to-surface">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t("Retour à l'accueil", 'Back to home')}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">shield</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">{t('Politique de Confidentialité', 'Privacy Policy')}</h1>
          </div>
          <p className="text-on-surface-variant">{t('Dernière mise à jour : Avril 2024', 'Last updated: April 2024')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title={t('Introduction', 'Introduction')}>
            <p>{t("Enésense s'engage à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.", 'Enésense is committed to protecting your personal data. This policy explains how we collect, use and protect your information when you use our website and services.')}</p>
          </Section>

          <Section title={t('Données Collectées', 'Data We Collect')}>
            <p>{t('Nous collectons les informations suivantes :', 'We collect the following information:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-on-surface">{t('Informations de contact', 'Contact information')}</strong>{t(' : nom, email, numéro de téléphone (via le formulaire de contact)', ': name, email address and phone number (via the contact form)')}</li>
              <li><strong className="text-on-surface">{t('Données de navigation', 'Browsing data')}</strong>{t(' : adresse IP, type de navigateur, pages visitées', ': IP address, browser type and pages visited')}</li>
              <li><strong className="text-on-surface">Cookies</strong>{t(' : pour améliorer votre expérience utilisateur', ': to improve your experience')}</li>
            </ul>
          </Section>

          <Section title={t('Utilisation des Données', 'How We Use Data')}>
            <p>{t('Vos données sont utilisées pour :', 'We use your data to:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Répondre à vos demandes de devis et questions', 'Respond to quote requests and questions')}</li>
              <li>{t('Améliorer nos services et notre site web', 'Improve our services and website')}</li>
              <li>{t('Vous envoyer des informations sur nos services (avec votre consentement)', 'Send you information about our services (with your consent)')}</li>
              <li>{t("Analyser l'utilisation du site pour des améliorations", 'Analyze website usage to make improvements')}</li>
            </ul>
          </Section>

          <Section title={t('Protection des Données', 'Data Protection')}>
            <p>{t('Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Vos données ne sont jamais vendues à des tiers.', 'We use technical and organizational safeguards to protect your data from unauthorized access, loss or disclosure. Your data is never sold to third parties.')}</p>
          </Section>

          <Section title={t('Vos Droits', 'Your Rights')}>
            <p>{t('Conformément au RGPD, vous disposez des droits suivants :', 'Under the GDPR, you have the following rights:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t("Droit d'accès à vos données personnelles", 'Right to access your personal data')}</li>
              <li>{t('Droit de rectification de vos données', 'Right to correct your data')}</li>
              <li>{t("Droit à l'effacement de vos données", 'Right to erase your data')}</li>
              <li>{t("Droit d'opposition au traitement", 'Right to object to processing')}</li>
              <li>{t('Droit à la portabilité des données', 'Right to data portability')}</li>
            </ul>
            <p>{t('Pour exercer vos droits :', 'To exercise your rights:')} <a href="mailto:contact@bricona.io" className="text-primary font-bold hover:underline">contact@bricona.io</a></p>
          </Section>

          <Section title={t('Cookies', 'Cookies')}>
            <p>{t('Notre site utilise des cookies essentiels pour son fonctionnement et des cookies analytiques pour améliorer votre expérience. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.', 'Our website uses essential cookies to function and analytics cookies to improve your experience. You can disable cookies in your browser settings.')}</p>
          </Section>

          <Section title={t('Contact', 'Contact')}>
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface">{t('Enésense - Digitalisation, automatisation et développement sur mesure', 'Enésense - Digital transformation, automation and custom software')}</p>
              <p>📧 contact@bricona.net</p>
              <p>📱 +228 79340002</p>
              <p>📍 Baguida bateauvi, Lomé-Togo</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
