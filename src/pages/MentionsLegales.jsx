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

export default function MentionsLegales() {
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
              <span className="material-symbols-outlined text-primary">gavel</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">Mentions Légales</h1>
          </div>
          <p className="text-on-surface-variant">Informations légales et éditoriales</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title="Éditeur du Site">
            <div className="bg-surface-container-low p-6 rounded-xl">
              <p className="font-bold text-on-surface mb-1">Bricona</p>
              <p>Digital Artisan Excellence</p>
              <p className="mt-3"><strong className="text-on-surface">Adresse :</strong> 42 Rue de l'Innovation, 75002 Paris</p>
              <p><strong className="text-on-surface">Email :</strong> contact@bricona.io</p>
              <p><strong className="text-on-surface">Téléphone :</strong> +33 1 45 67 89 00</p>
            </div>
          </Section>

          <Section title="Directeur de Publication">
            <p>Le directeur de la publication du site est le représentant légal de Bricona.</p>
          </Section>

          <Section title="Hébergement">
            <div className="bg-surface-container-low p-4 rounded-xl">
              <p><strong className="text-on-surface">Hébergeur :</strong> Vercel Inc.</p>
              <p><strong className="text-on-surface">URL :</strong> https://vercel.com</p>
            </div>
          </Section>

          <Section title="Propriété Intellectuelle">
            <p>L'ensemble des contenus présents sur le site Bricona (structure, textes, logos, images, vidéos, etc.) est protégé par le droit d'auteur et le droit de la propriété intellectuelle.</p>
            <p>Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Bricona.</p>
          </Section>

          <Section title="Données Personnelles">
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
            <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@bricona.io" className="text-primary font-bold hover:underline">contact@bricona.io</a></p>
            <p>Consultez notre <Link to="/politique-de-confidentialite" className="text-primary font-bold hover:underline">Politique de Confidentialité</Link> pour plus d'informations.</p>
          </Section>

          <Section title="Droit Applicable">
            <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
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
