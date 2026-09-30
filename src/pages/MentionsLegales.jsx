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

export default function MentionsLegales() {
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
              <span className="material-symbols-outlined text-primary">gavel</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">{t('Mentions Légales', 'Legal Notice')}</h1>
          </div>
          <p className="text-on-surface-variant">{t('Informations légales et éditoriales', 'Legal and editorial information')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title={t('Éditeur du Site', 'Website Publisher')}>
            <div className="bg-surface-container-low p-6 rounded-xl">
              <p className="font-bold text-on-surface mb-1">Enésense</p>
              <p>{t('Digitalisation, automatisation et développement sur mesure pour entreprises.', 'Digital transformation, automation and custom software development for businesses.')}</p>
              <p className="mt-3"><strong className="text-on-surface">{t('Adresse :', 'Address:')}</strong> Colombs, France</p>
              <p><strong className="text-on-surface">Email :</strong> contact@bricona.net</p>
              <p><strong className="text-on-surface">{t('Téléphone :', 'Phone:')}</strong> +228 79340002</p>
            </div>
          </Section>

          <Section title={t('Directeur de Publication', 'Publication Director')}>
            <p>{t("Le directeur de la publication du site est le représentant légal d'Enésense.", 'The website publication director is the legal representative of Enésense.')}</p>
          </Section>

          <Section title={t('Hébergement', 'Hosting')}>
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p><strong className="text-on-surface">{t('Hébergeur :', 'Hosted by:')}</strong> Vercel Inc.</p>
              <p><strong className="text-on-surface">URL :</strong> https://vercel.com</p>
            </div>
          </Section>

          <Section title={t('Propriété Intellectuelle', 'Intellectual Property')}>
            <p>{t("L'ensemble des contenus présents sur le site Enésense (structure, textes, logos, images, vidéos, etc.) est protégé par le droit d'auteur et le droit de la propriété intellectuelle.", 'All content on the Enésense website (structure, text, logos, images, videos, etc.) is protected by copyright and intellectual property law.')}</p>
            <p>{t("Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable d'Enésense.", 'Any reproduction, representation, modification, publication or adaptation of all or part of this website is prohibited without prior written authorization from Enésense.')}</p>
          </Section>

          <Section title={t('Données Personnelles', 'Personal Data')}>
            <p>{t("Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.", 'Under the General Data Protection Regulation (GDPR), you have the right to access, correct and delete your personal data.')}</p>
            <p>{t('Pour exercer ces droits, contactez-nous à :', 'To exercise these rights, contact us at:')} <a href="mailto:contact@bricona.net" className="text-primary font-bold hover:underline">contact@bricona.net</a></p>
            <p>{t('Consultez notre', 'See our')} <Link to="/politique-de-confidentialite" className="text-primary font-bold hover:underline">{t('Politique de Confidentialité', 'Privacy Policy')}</Link> {t("pour plus d'informations.", 'for more information.')}</p>
          </Section>

          <Section title={t('Droit Applicable', 'Applicable Law')}>
            <p>{t('Les présentes mentions légales sont régies par le droit togolais. En cas de litige, les tribunaux togolais seront seuls compétents.', 'This legal notice is governed by Togolese law. In the event of a dispute, the courts of Togo shall have exclusive jurisdiction.')}</p>
          </Section>

          <Section title={t('Contact', 'Contact')}>
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface">{t('Enésense - Digitalisation, automatisation et développement sur mesure', 'Enésense - Digital transformation, automation and custom software')}</p>
              <p>📧 contact@bricona.net</p>
              <p>📱 +228 79340002</p>
              <p>📍 Colombs, France</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
