import { Link } from 'react-router-dom';

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
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="pt-28 pb-16 px-8 bg-gradient-to-b from-surface-container-low to-surface">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">shield</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">Politique de Confidentialité</h1>
          </div>
          <p className="text-on-surface-variant">Dernière mise à jour : Avril 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title="Introduction">
            <p>Bricona s'engage à protéger la confidentialité de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web et nos services.</p>
          </Section>

          <Section title="Données Collectées">
            <p>Nous collectons les informations suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-on-surface">Informations de contact</strong> : nom, email, numéro de téléphone (via le formulaire de contact)</li>
              <li><strong className="text-on-surface">Données de navigation</strong> : adresse IP, type de navigateur, pages visitées</li>
              <li><strong className="text-on-surface">Cookies</strong> : pour améliorer votre expérience utilisateur</li>
            </ul>
          </Section>

          <Section title="Utilisation des Données">
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Répondre à vos demandes de devis et questions</li>
              <li>Améliorer nos services et notre site web</li>
              <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
              <li>Analyser l'utilisation du site pour des améliorations</li>
            </ul>
          </Section>

          <Section title="Protection des Données">
            <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Vos données ne sont jamais vendues à des tiers.</p>
          </Section>

          <Section title="Vos Droits">
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification de vos données</li>
              <li>Droit à l'effacement de vos données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p>Pour exercer vos droits : <a href="mailto:contact@bricona.io" className="text-primary font-bold hover:underline">contact@bricona.io</a></p>
          </Section>

          <Section title="Cookies">
            <p>Notre site utilise des cookies essentiels pour son fonctionnement et des cookies analytiques pour améliorer votre expérience. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
          </Section>

          <Section title="Contact">
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface">Bricona - Digital Artisan Excellence</p>
              <p>📧 contact@bricona.io</p>
              <p>📱 +33 1 45 67 89 00</p>
              <p>📍 42 Rue de l'Innovation, 75002 Paris</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
