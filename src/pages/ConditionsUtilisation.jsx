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

export default function ConditionsUtilisation() {
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
              <span className="material-symbols-outlined text-primary">description</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">{t("Conditions d'Utilisation", 'Terms of Use')}</h1>
          </div>
          <p className="text-on-surface-variant">{t('Dernière mise à jour : Avril 2024', 'Last updated: April 2024')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title={t('Acceptation des Conditions', 'Acceptance of Terms')}>
            <p>{t("En accédant et en utilisant le site web d'Enésense, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.", 'By accessing and using the Enésense website, you agree to be bound by these terms of use. If you do not agree, please do not use our website.')}</p>
          </Section>

          <Section title={t('Services Proposés', 'Services Offered')}>
            <p>{t('Enésense propose les services suivants :', 'Enésense offers the following services:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Digitalisation des processus', 'Digital transformation of processes')}</li>
              <li>{t('Automatisation par intelligence artificielle', 'Artificial intelligence automation')}</li>
              <li>{t('Développement logiciel sur-mesure', 'Custom software development')}</li>
              <li>{t('Accompagnement et mentorat digital', 'Digital consulting and mentoring')}</li>
            </ul>
          </Section>

          <Section title={t('Propriété Intellectuelle', 'Intellectual Property')}>
            <p>{t("Tous les contenus présents sur ce site (textes, images, logos, design) sont la propriété exclusive d'Enésense et sont protégés par les lois sur la propriété intellectuelle.", 'All content on this website (text, images, logos and design) is the exclusive property of Enésense and is protected by intellectual property laws.')}</p>
            <p>{t('Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.', 'Any unauthorized reproduction, distribution or use is strictly prohibited.')}</p>
          </Section>

          <Section title={t('Devis et Prestations', 'Quotes and Services')}>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Les devis sont gratuits et sans engagement', 'Quotes are free and non-binding')}</li>
              <li>{t('Les tarifs indiqués sont en euros HT et peuvent être sujets à modification', 'Prices are stated in euros excluding tax and may change')}</li>
              <li>{t('Les délais de réalisation sont donnés à titre indicatif', 'Delivery timelines are estimates')}</li>
              <li>{t('Un acompte de 50% est généralement demandé avant le début des travaux', 'A 50% deposit is generally required before work begins')}</li>
              <li>{t('Le solde est dû à la livraison du projet', 'The balance is due upon project delivery')}</li>
            </ul>
          </Section>

          <Section title={t('Responsabilités', 'Responsibilities')}>
            <p><strong className="text-on-surface">{t("Enésense s'engage à :", 'Enésense agrees to:')}</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Réaliser les prestations avec professionnalisme et dans les délais convenus', 'Provide services professionally and within agreed timelines')}</li>
              <li>{t('Assurer un support technique après livraison', 'Provide technical support after delivery')}</li>
              <li>{t('Protéger vos données personnelles', 'Protect your personal data')}</li>
            </ul>
            <p><strong className="text-on-surface">{t("Le client s'engage à :", 'The client agrees to:')}</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Fournir tous les éléments nécessaires à la réalisation du projet', 'Provide all information needed to complete the project')}</li>
              <li>{t('Respecter les délais de paiement convenus', 'Meet the agreed payment deadlines')}</li>
              <li>{t('Valider les étapes du projet dans les délais', 'Approve project milestones on time')}</li>
            </ul>
          </Section>

          <Section title={t('Limitation de Responsabilité', 'Limitation of Liability')}>
            <p>{t("Enésense ne peut être tenu responsable des dommages indirects résultant de l'utilisation de nos services ou de dysfonctionnements techniques indépendants de notre volonté.", 'Enésense is not liable for indirect damages resulting from use of our services or technical failures beyond our control.')}</p>
          </Section>

          <Section title={t('Modification des Conditions', 'Changes to These Terms')}>
            <p>{t("Enésense se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.", 'Enésense may change these terms of use at any time. Changes take effect when published on the website.')}</p>
          </Section>

          <Section title={t('Contact', 'Contact')}>
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface">{t('Enésense - Digitalisation, automatisation et développement sur mesure', 'Enésense - Digital transformation, automation and custom software')}</p>
              <p>📧 contact@bricona.net</p>
              <p>📱 +33 1 45 67 89 00</p>
              <p>📍 42 Rue de l'Innovation, 75002 Paris</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
