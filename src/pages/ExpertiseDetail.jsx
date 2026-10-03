import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const T = {
  primary: '#1e40af',
  electric: '#2563eb',
  navy: '#0A0D14',
  surface: '#f8f9ff',
  surfaceContainerLow: '#eff4ff',
  surfaceContainer: '#e5eeff',
  surfaceContainerHigh: '#dce9ff',
  surfaceBright: '#f8f9ff',
  onSurface: '#0b1c30',
  onSurfaceVariant: '#444653',
  onPrimary: '#ffffff',
  secondaryContainer: '#dae2fd',
  primaryFixed: '#dde1ff',
  onPrimaryFixedVariant: '#173bab',
  amberSoft: '#FEF3C7',
  amberContrast: '#D97706',
  emerald: '#10B981',
  outline: '#757684',
  yellow: '#F2B705',
  yellowDeep: '#C99600',
  onNavySoft: '#AEB9C7',
  navy2: '#132A45',
  navy3: '#1E3C5F',
  inkSoft: '#4B5563',
  line: '#E4E4DE',
  navyDeep: '#040f23',
  navyText: '#f7f8fa',
  navyMuted: '#b0b8c4',
};

const fonts = {
  jakarta: "'Plus Jakarta Sans', sans-serif",
  inter: "'Inter', sans-serif",
};

const allExpertises = [
  { slug: 'extension-equipes', badge: 'SCALE', title: "Extension d'équipes techniques", heading: 'Renforcer vos équipes sans alourdir votre organisation.', description: 'Nous intégrons des ingénieurs à vos équipes existantes : mêmes outils, mêmes rituels, mêmes exigences de qualité. L\'objectif n\'est pas de fournir des profils, mais d\'augmenter durablement votre capacité d\'exécution.', whenItems: ['Une roadmap produit contrainte par la capacité de l\'équipe.', 'Une compétence technique rare, nécessaire sur une période donnée.', 'Un pic d\'activité à absorber sans dégrader la qualité.', 'Une équipe interne à structurer et à faire monter en maturité.'], deliversItems: ['Ingénieurs intégrés à vos cérémonies et à votre chaîne de livraison', 'Revue de code et pratiques d\'ingénierie partagées', 'Suivi régulier de la contribution et des engagements', 'Transmission continue vers vos équipes internes'] },
  { slug: 'studio-produit', badge: 'BUILD', title: 'Studio Produit', heading: 'De l\'idée au produit.', description: 'Nous couvrons l\'ensemble du cycle produit : cadrage, architecture, conception, développement, mise en production et évolution. Chaque décision technique est prise au regard d\'un usage réel et mesurable.', whenItems: ['Un besoin métier qu\'aucun outil du marché ne couvre correctement.', 'Un produit à lancer avec une première version crédible et évolutive.', 'Une plateforme interne à concevoir pour plusieurs entités.', 'Un prototype à transformer en produit exploitable en production.'], deliversItems: ['Cadrage fonctionnel et architecture cible', 'Développement itératif avec livraisons régulières', 'Chaîne d\'intégration et de déploiement automatisée', 'Documentation technique et transfert de propriété'] },
  { slug: 'modernisation-applicative', badge: 'EVOLVE', title: 'Modernisation applicative', heading: 'Faire évoluer l\'existant sans compromettre ce qui fonctionne.', description: 'Reprendre une application en production demande de la méthode : comprendre avant de remplacer, sécuriser avant d\'accélérer, découper avant de reconstruire. Nous intervenons progressivement, sans rupture de service.', whenItems: ['Une application critique difficile à faire évoluer.', 'Une dette technique qui ralentit chaque nouvelle fonctionnalité.', 'Un départ d\'équipe ou un prestataire à remplacer.', 'Une migration d\'infrastructure ou de socle technique à conduire.'], deliversItems: ['Audit technique et cartographie de l\'existant', 'Plan de modernisation séquencé et priorisé', 'Sécurisation, tests et reprise de la chaîne de livraison', 'Refonte progressive par périmètres maîtrisés'] },
  { slug: 'ia-automatisation', badge: 'AUTOMATE', badgeLabel: 'Nouvelle expertise', title: 'IA & Automatisation', heading: 'Transformer les tâches répétitives en capacités nouvelles.', description: 'L\'automatisation n\'a de valeur que lorsqu\'elle s\'appuie sur des processus compris et des données maîtrisées. Nous partons de vos flux réels pour identifier ce qui peut être orchestré, assisté ou automatisé.', whenItems: ['Des traitements manuels répétitifs, coûteux et sources d\'erreurs.', 'Des volumes documentaires à qualifier ou à extraire.', 'Des systèmes à faire communiquer entre eux.', 'Un usage d\'IA à cadrer avec des garanties de fiabilité.'], deliversItems: ['Analyse des processus et identification des gains', 'Orchestration et intégration entre systèmes', 'Cas d\'usage IA évalués sur des critères mesurables', 'Mise en production avec supervision et garde-fous'] },
];

const englishExpertises = {
  'extension-equipes': {
    title: 'Technical team extension',
    heading: 'Strengthen your teams without adding organizational overhead.',
    description: 'We integrate engineers into your existing teams, using the same tools, rituals and quality standards. Our goal is not to supply profiles, but to sustainably increase your delivery capacity.',
    whenItems: ['A product roadmap constrained by team capacity.', 'A rare technical skill needed for a defined period.', 'A peak in activity to absorb without compromising quality.', 'An internal team to structure and help mature.'],
    deliversItems: ['Engineers integrated into your ceremonies and delivery pipeline', 'Shared code reviews and engineering practices', 'Regular tracking of contributions and commitments', 'Ongoing knowledge transfer to your internal teams'],
  },
  'studio-produit': {
    title: 'Product Studio',
    heading: 'From idea to product.',
    description: 'We cover the full product lifecycle: framing, architecture, design, development, launch and iteration. Every technical decision is grounded in real, measurable usage.',
    whenItems: ['A business need that no existing tool addresses properly.', 'A product to launch with a credible, scalable first release.', 'An internal platform to design for multiple entities.', 'A prototype to turn into a production-ready product.'],
    deliversItems: ['Functional framing and target architecture', 'Iterative development with regular releases', 'Automated integration and deployment pipeline', 'Technical documentation and ownership transfer'],
  },
  'modernisation-applicative': {
    title: 'Application modernization',
    heading: 'Evolve what exists without compromising what works.',
    description: 'Taking over a live application calls for a method: understand before replacing, secure before accelerating and break things down before rebuilding. We work incrementally, without service disruption.',
    whenItems: ['A critical application that is difficult to evolve.', 'Technical debt slowing every new feature.', 'A departing team or provider to replace.', 'An infrastructure or technology migration to manage.'],
    deliversItems: ['Technical audit and map of the existing system', 'Sequenced and prioritized modernization plan', 'Security, testing and restored delivery pipeline', 'Incremental redesign in controlled scopes'],
  },
  'ia-automatisation': {
    title: 'AI & Automation',
    badgeLabel: 'New expertise',
    heading: 'Turn repetitive tasks into new capabilities.',
    description: 'Automation creates value only when it is grounded in understood processes and well-managed data. We start with your real workflows to identify what can be orchestrated, assisted or automated.',
    whenItems: ['Repetitive manual work that is costly and error-prone.', 'Large volumes of documents to classify or extract data from.', 'Systems that need to communicate with one another.', 'An AI use case that needs clear reliability safeguards.'],
    deliversItems: ['Process analysis and opportunity identification', 'Orchestration and integration across systems', 'AI use cases assessed against measurable criteria', 'Production deployment with monitoring and safeguards'],
  },
};

export default function ExpertiseDetail() {
  const { language, t } = useLanguage();
  const { id } = useParams();
  const sourceExpertise = allExpertises.find(e => e.slug === id);

  if (!sourceExpertise) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center" style={{ background: T.surface }}>
        <div className="text-center">
          <h1 style={{ fontFamily: fonts.jakarta, fontSize: '2rem', fontWeight: 700, color: '#0B1D33' }}>
            {t('Expertise introuvable', 'Expertise not found')}
          </h1>
          <Link to="/" className="inline-block mt-6" style={{ color: T.yellow, fontFamily: fonts.inter, fontWeight: 500 }}>
            {t("Retour à l'accueil", 'Back to home')}
          </Link>
        </div>
      </div>
    );
  }

  const expertise = language === 'en'
    ? { ...sourceExpertise, ...englishExpertises[sourceExpertise.slug] }
    : sourceExpertise;
  const otherExpertises = allExpertises.filter(e => e.slug !== id);

  return (
    <div style={{ fontFamily: fonts.inter, background: '#ffffff' }}>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32" style={{ background: T.navyDeep, color: T.navyText }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.yellow, marginBottom: '32px' }}>
              {expertise.badge}
            </p>
            <h1 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.05, color: T.navyText, margin: '0 0 24px' }}>
              {expertise.heading}
            </h1>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: '#FFFFFF', margin: '0 0 40px', maxWidth: '42rem' }}>
              {expertise.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border px-7 py-4 font-medium text-sm transition-all duration-200"
                style={{ borderColor: '#374151', color: T.navyText }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.yellow; e.currentTarget.style.color = T.yellow; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#374151'; e.currentTarget.style.color = T.navyText; }}
              >
                {t('Parler à Enésense', 'Talk to Enésense')}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quand / Ce que */}
      <section className="py-20 md:py-24" style={{ background: '#ffffff' }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.5rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0 }}>
                {t('Quand nous intervenons', 'When we step in')}
              </h2>
              <ul className="mt-8 space-y-0" style={{ fontFamily: fonts.inter }}>
                {expertise.whenItems.map((item, i) => (
                   <li key={i} className="flex gap-4 border-b pb-5" style={{ borderBottomColor: 'rgba(55,65,81,0.3)' }}>
                     <span className="mt-2 h-2 w-2 shrink-0" style={{ background: T.yellow, borderRadius: '50%' }} aria-hidden="true"></span>
                     <span style={{ color: '#374151', fontSize: '1.0625rem', lineHeight: '1.75' }}>{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
             <div>
               <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.5rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0 }}>
                 {t('Ce que nous livrons', 'What we deliver')}
               </h2>
               <ul className="mt-8 space-y-0" style={{ fontFamily: fonts.inter }}>
                 {expertise.deliversItems.map((item, i) => (
                   <li key={i} className="flex gap-4 border-b pb-5" style={{ borderBottomColor: 'rgba(55,65,81,0.3)' }}>
                     <span className="mt-2 h-2 w-2 shrink-0" style={{ background: T.navy, borderRadius: '50%' }} aria-hidden="true"></span>
                     <span style={{ color: '#374151', fontSize: '1.0625rem', lineHeight: '1.75' }}>{item}</span>
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Autres expertises */}
      <section className="py-20 md:py-24" style={{ background: T.surface }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151', marginBottom: '24px' }}>
              {t('Autres expertises', 'Other expertise')}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3" style={{ border: '1px solid rgba(55,65,81,0.2)', background: 'rgba(55,65,81,0.1)' }}>
            {otherExpertises.map(exp => (
              <Link
                key={exp.slug}
                to={`/expertises/${exp.slug}`}
                className="group bg-white p-8 transition-colors hover:bg-surface flex flex-col"
              >
                <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#374151' }}>
                  {exp.badge}
                </span>
                <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', margin: '16px 0' }}>
                  {language === 'en' ? englishExpertises[exp.slug].title : exp.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ fontFamily: fonts.inter, marginTop: 'auto' }}>
                  <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px', color: '#0B1D33' }}>{t('Découvrir', 'Discover')}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24" style={{ borderTop: '1px solid rgba(55,65,81,0.2)', background: '#ffffff' }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: 0, marginBottom: '24px' }}>
                {t('Un projet numérique à construire ou à faire évoluer ?', 'A digital project to build or improve?')}
              </h2>
              <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: '#374151' }}>
                {t('Parlons de votre contexte, de vos enjeux et de ce que nous pouvons construire ensemble.', 'Tell us about your context and goals, and what we could build together.')}
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 font-medium text-sm transition-all duration-200"
              style={{ background: T.yellow, color: '#0B1D33' }}
              onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
              onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
            >
              {t('Parler à Enésense', 'Talk to Enésense')}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
