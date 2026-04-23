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

export default function ConditionsUtilisation() {
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
              <span className="material-symbols-outlined text-primary">description</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">Conditions d'Utilisation</h1>
          </div>
          <p className="text-on-surface-variant">Dernière mise à jour : Avril 2024</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title="Acceptation des Conditions">
            <p>En accédant et en utilisant le site web de Bricona, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.</p>
          </Section>

          <Section title="Services Proposés">
            <p>Bricona propose les services suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mise en relation entre artisans et clients</li>
              <li>Digitalisation des processus artisanaux</li>
              <li>Automatisation par intelligence artificielle</li>
              <li>Développement logiciel sur-mesure</li>
              <li>Accompagnement et mentorat digital</li>
            </ul>
          </Section>

          <Section title="Propriété Intellectuelle">
            <p>Tous les contenus présents sur ce site (textes, images, logos, design) sont la propriété exclusive de Bricona et sont protégés par les lois sur la propriété intellectuelle.</p>
            <p>Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.</p>
          </Section>

          <Section title="Devis et Prestations">
            <ul className="list-disc pl-6 space-y-2">
              <li>Les devis sont gratuits et sans engagement</li>
              <li>Les tarifs indiqués sont en euros HT et peuvent être sujets à modification</li>
              <li>Les délais de réalisation sont donnés à titre indicatif</li>
              <li>Un acompte de 50% est généralement demandé avant le début des travaux</li>
              <li>Le solde est dû à la livraison du projet</li>
            </ul>
          </Section>

          <Section title="Responsabilités">
            <p><strong className="text-on-surface">Bricona s'engage à :</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Réaliser les prestations avec professionnalisme et dans les délais convenus</li>
              <li>Assurer un support technique après livraison</li>
              <li>Protéger vos données personnelles</li>
            </ul>
            <p><strong className="text-on-surface">Le client s'engage à :</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir tous les éléments nécessaires à la réalisation du projet</li>
              <li>Respecter les délais de paiement convenus</li>
              <li>Valider les étapes du projet dans les délais</li>
            </ul>
          </Section>

          <Section title="Limitation de Responsabilité">
            <p>Bricona ne peut être tenu responsable des dommages indirects résultant de l'utilisation de nos services ou de dysfonctionnements techniques indépendants de notre volonté.</p>
          </Section>

          <Section title="Modification des Conditions">
            <p>Bricona se réserve le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.</p>
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
