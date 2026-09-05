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

const CookieTable = () => (
  <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-low">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-surface-container">
        <tr>
          <th className="px-4 py-3 font-bold text-on-surface">Catégorie</th>
          <th className="px-4 py-3 font-bold text-on-surface">Finalité</th>
          <th className="px-4 py-3 font-bold text-on-surface">Exemple</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Essentiels</td>
          <td className="px-4 py-3">Assurer le bon fonctionnement du site, la sécurité et la navigation.</td>
          <td className="px-4 py-3">Session, sécurité, préférences de navigation.</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Analytics</td>
          <td className="px-4 py-3">Comprendre comment les visiteurs utilisent le site pour l’améliorer.</td>
          <td className="px-4 py-3">Google Analytics, statistiques d’usage.</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Marketing</td>
          <td className="px-4 py-3">Mesurer l’efficacité des campagnes marketing et proposer des contenus adaptés.</td>
          <td className="px-4 py-3">Publicités ciblées, retargeting.</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Fonctionnels</td>
          <td className="px-4 py-3">Mémoriser vos préférences et personnaliser votre expérience.</td>
          <td className="px-4 py-3">Langue, choix d’affichage, formulaires.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function PolitiqueCookies() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="pt-28 pb-16 px-8 bg-gradient-to-b from-surface-container-low to-surface">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour à l'accueil
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">cookie</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">Politique de Cookies</h1>
          </div>
          <p className="text-on-surface-variant">Dernière mise à jour : Août 2026</p>
        </div>
      </div>

      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title="1. Introduction">
            <p>Enésense utilise des cookies et technologies similaires afin d’améliorer votre navigation, sécuriser notre site et mieux comprendre l’utilisation que vous faites de nos services.</p>
            <p>Cette politique vous explique ce que sont les cookies, quels cookies nous utilisons, pourquoi nous les utilisons et comment vous pouvez les gérer.</p>
          </Section>

          <Section title="2. Qu’est-ce qu’un cookie ?">
            <p>Un cookie est un petit fichier texte enregistré sur votre appareil lors de votre visite sur un site web. Il permet au site de mémoriser certaines informations sur votre navigation, comme votre langue préférée, vos préférences ou votre session de connexion.</p>
            <p>Les cookies peuvent être classés en fonction de leur durée, de leur origine et de leur finalité.</p>
          </Section>

          <Section title="3. Les cookies que nous utilisons">
            <CookieTable />
          </Section>

          <Section title="4. Pourquoi utilisons-nous des cookies ?">
            <ul className="list-disc pl-6 space-y-2">
              <li>Garantir le bon fonctionnement technique du site.</li>
              <li>Se souvenir de vos choix et préférences.</li>
              <li>Améliorer les performances, le contenu et la qualité de nos services.</li>
              <li>Mesurer l’audience et analyser les parcours de navigation.</li>
              <li>Proposer des contenus et offres plus pertinents selon votre comportement.</li>
            </ul>
          </Section>

          <Section title="5. Gestion de votre consentement">
            <p>Lors de votre première visite, nous pouvons vous demander votre consentement avant de déposer certains cookies non essentiels. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.</p>
            <p>La plupart des navigateurs vous permettent de gérer les cookies via leurs paramètres. Vous pouvez configurer votre navigateur pour qu’il refuse certains cookies ou vous avertisse lorsqu’un site tente d’en déposer.</p>
            <p>En cas de refus, certains services ou fonctionnalités du site peuvent être affectés.</p>
          </Section>

          <Section title="6. Durée de conservation">
            <p>Les cookies sont conservés pour une durée limitée selon leur finalité :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-on-surface">Cookies de session</strong> : supprimés à la fermeture du navigateur.</li>
              <li><strong className="text-on-surface">Cookies persistants</strong> : conservés jusqu’à une date précise ou jusqu’à leur suppression manuelle.</li>
              <li><strong className="text-on-surface">Cookies analytiques</strong> : utilisés pour la mesure d’audience, généralement pendant une période limitée.</li>
            </ul>
          </Section>

          <Section title="7. Vos droits">
            <p>Conformément à la réglementation applicable, vous pouvez :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accepter ou refuser les cookies non essentiels.</li>
              <li>Supprimer les cookies déjà enregistrés sur votre appareil.</li>
              <li>Modifier les paramètres de votre navigateur pour bloquer ou limiter certains cookies.</li>
            </ul>
            <p>Vous pouvez également nous contacter pour obtenir plus d’informations sur les cookies utilisés sur notre site.</p>
          </Section>

          <Section title="8. Modifications de la politique">
            <p>Enésense peut modifier cette politique de cookies afin de refléter les évolutions de nos pratiques, de la législation ou des services proposés.</p>
            <p>Les mises à jour seront publiées sur cette page avec une date de mise à jour indiquée.</p>
          </Section>

          <Section title="9. Contact">
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface mb-2">Enésense - Digital Artisan Excellence</p>
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
