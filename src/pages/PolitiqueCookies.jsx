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

const CookieTable = ({ t }) => (
  <div className="overflow-x-auto rounded-2xl border border-outline-variant/30 bg-surface-container-low">
    <table className="min-w-full text-left text-sm">
      <thead className="bg-surface-container">
        <tr>
          <th className="px-4 py-3 font-bold text-on-surface">{t('Catégorie', 'Category')}</th>
          <th className="px-4 py-3 font-bold text-on-surface">{t('Finalité', 'Purpose')}</th>
          <th className="px-4 py-3 font-bold text-on-surface">{t('Exemple', 'Example')}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">{t('Essentiels', 'Essential')}</td>
          <td className="px-4 py-3">{t('Assurer le bon fonctionnement du site, la sécurité et la navigation.', 'Ensure website functionality, security and navigation.')}</td>
          <td className="px-4 py-3">{t('Session, sécurité, préférences de navigation.', 'Session, security and browsing preferences.')}</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Analytics</td>
          <td className="px-4 py-3">{t('Comprendre comment les visiteurs utilisent le site pour l’améliorer.', 'Understand how visitors use the website so we can improve it.')}</td>
          <td className="px-4 py-3">Google Analytics, {t('statistiques d’usage.', 'usage statistics.')}</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">Marketing</td>
          <td className="px-4 py-3">{t('Mesurer l’efficacité des campagnes marketing et proposer des contenus adaptés.', 'Measure marketing campaign performance and provide relevant content.')}</td>
          <td className="px-4 py-3">{t('Publicités ciblées, retargeting.', 'Targeted ads, retargeting.')}</td>
        </tr>
        <tr className="border-t border-outline-variant/30">
          <td className="px-4 py-3 text-on-surface">{t('Fonctionnels', 'Functional')}</td>
          <td className="px-4 py-3">{t('Mémoriser vos préférences et personnaliser votre expérience.', 'Remember your preferences and personalize your experience.')}</td>
          <td className="px-4 py-3">{t('Langue, choix d’affichage, formulaires.', 'Language, display settings and forms.')}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default function PolitiqueCookies() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-surface">
      <div className="pt-28 pb-16 px-8 bg-gradient-to-b from-surface-container-low to-surface">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary mb-8 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t("Retour à l'accueil", 'Back to home')}
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">cookie</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">{t('Politique de Cookies', 'Cookie Policy')}</h1>
          </div>
          <p className="text-on-surface-variant">{t('Dernière mise à jour : Août 2026', 'Last updated: August 2026')}</p>
        </div>
      </div>

      <div className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <Section title={t('1. Introduction', '1. Introduction')}>
            <p>{t('Enésense utilise des cookies et technologies similaires afin d’améliorer votre navigation, sécuriser notre site et mieux comprendre l’utilisation que vous faites de nos services.', 'Enésense uses cookies and similar technologies to improve your browsing experience, secure our website and better understand how you use our services.')}</p>
            <p>{t('Cette politique vous explique ce que sont les cookies, quels cookies nous utilisons, pourquoi nous les utilisons et comment vous pouvez les gérer.', 'This policy explains what cookies are, which cookies we use, why we use them and how you can manage them.')}</p>
          </Section>

          <Section title={t('2. Qu’est-ce qu’un cookie ?', '2. What is a cookie?')}>
            <p>{t('Un cookie est un petit fichier texte enregistré sur votre appareil lors de votre visite sur un site web. Il permet au site de mémoriser certaines informations sur votre navigation, comme votre langue préférée, vos préférences ou votre session de connexion.', 'A cookie is a small text file saved on your device when you visit a website. It allows the website to remember information such as your preferred language, settings or login session.')}</p>
            <p>{t('Les cookies peuvent être classés en fonction de leur durée, de leur origine et de leur finalité.', 'Cookies can be classified by duration, origin and purpose.')}</p>
          </Section>

          <Section title={t('3. Les cookies que nous utilisons', '3. Cookies We Use')}>
            <CookieTable t={t} />
          </Section>

          <Section title={t('4. Pourquoi utilisons-nous des cookies ?', '4. Why Do We Use Cookies?')}>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Garantir le bon fonctionnement technique du site.', 'Ensure the website works properly.')}</li>
              <li>{t('Se souvenir de vos choix et préférences.', 'Remember your choices and preferences.')}</li>
              <li>{t('Améliorer les performances, le contenu et la qualité de nos services.', 'Improve the performance, content and quality of our services.')}</li>
              <li>{t('Mesurer l’audience et analyser les parcours de navigation.', 'Measure audience and analyze browsing journeys.')}</li>
              <li>{t('Proposer des contenus et offres plus pertinents selon votre comportement.', 'Offer more relevant content and offers based on your behavior.')}</li>
            </ul>
          </Section>

          <Section title={t('5. Gestion de votre consentement', '5. Managing Your Consent')}>
            <p>{t('Lors de votre première visite, nous pouvons vous demander votre consentement avant de déposer certains cookies non essentiels. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.', 'On your first visit, we may ask for your consent before placing certain non-essential cookies. You can accept, reject or customize your choices at any time.')}</p>
            <p>{t('La plupart des navigateurs vous permettent de gérer les cookies via leurs paramètres. Vous pouvez configurer votre navigateur pour qu’il refuse certains cookies ou vous avertisse lorsqu’un site tente d’en déposer.', 'Most browsers let you manage cookies in their settings. You can configure your browser to reject certain cookies or notify you when a website tries to place one.')}</p>
            <p>{t('En cas de refus, certains services ou fonctionnalités du site peuvent être affectés.', 'Some website services or features may be affected if you reject cookies.')}</p>
          </Section>

          <Section title={t('6. Durée de conservation', '6. Retention Period')}>
            <p>{t('Les cookies sont conservés pour une durée limitée selon leur finalité :', 'Cookies are stored for a limited period depending on their purpose:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-on-surface">{t('Cookies de session', 'Session cookies')}</strong>{t(' : supprimés à la fermeture du navigateur.', ' : deleted when you close your browser.')}</li>
              <li><strong className="text-on-surface">{t('Cookies persistants', 'Persistent cookies')}</strong>{t(' : conservés jusqu’à une date précise ou jusqu’à leur suppression manuelle.', ' : stored until a set date or until manually deleted.')}</li>
              <li><strong className="text-on-surface">{t('Cookies analytiques', 'Analytics cookies')}</strong>{t(' : utilisés pour la mesure d’audience, généralement pendant une période limitée.', ' : used to measure audience, generally for a limited period.')}</li>
            </ul>
          </Section>

          <Section title={t('7. Vos droits', '7. Your Rights')}>
            <p>{t('Conformément à la réglementation applicable, vous pouvez :', 'Under applicable regulations, you can:')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{t('Accepter ou refuser les cookies non essentiels.', 'Accept or reject non-essential cookies.')}</li>
              <li>{t('Supprimer les cookies déjà enregistrés sur votre appareil.', 'Delete cookies already stored on your device.')}</li>
              <li>{t('Modifier les paramètres de votre navigateur pour bloquer ou limiter certains cookies.', 'Change your browser settings to block or limit certain cookies.')}</li>
            </ul>
            <p>{t('Vous pouvez également nous contacter pour obtenir plus d’informations sur les cookies utilisés sur notre site.', 'You can also contact us for more information about the cookies used on our website.')}</p>
          </Section>

          <Section title={t('8. Modifications de la politique', '8. Changes to This Policy')}>
            <p>{t('Enésense peut modifier cette politique de cookies afin de refléter les évolutions de nos pratiques, de la législation ou des services proposés.', 'Enésense may update this cookie policy to reflect changes in our practices, legislation or services.')}</p>
            <p>{t('Les mises à jour seront publiées sur cette page avec une date de mise à jour indiquée.', 'Updates will be published on this page with a revision date.')}</p>
          </Section>

          <Section title={t('9. Contact', '9. Contact')}>
            <div className="p-6 bg-primary-fixed rounded-xl border border-primary/10">
              <p className="font-bold text-on-surface mb-2">{t('Enésense - Digitalisation, automatisation et développement sur mesure', 'Enésense - Digital transformation, automation and custom software')}</p>
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
