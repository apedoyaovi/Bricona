import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../utils/LanguageContext';

const T = {
  yellow: '#F2B705',
  yellowDeep: '#C99600',
  navy: '#0B1D33',
  navyMuted: '#b0b8c4',
};

const fonts = {
  jakarta: "'Plus Jakarta Sans', sans-serif",
  inter: "'Inter', sans-serif",
};

/* ─── EXPERTISES HERO BACKGROUND ─── */
function ExpertisesHeroBackground() {
  const particles = [
    { x: 10, y: 20, size: 4, dur: 18, delay: 0 },
    { x: 25, y: 60, size: 6, dur: 22, delay: -3 },
    { x: 45, y: 40, size: 3, dur: 15, delay: -6 },
    { x: 65, y: 80, size: 5, dur: 20, delay: -9 },
    { x: 80, y: 30, size: 4, dur: 24, delay: -12 },
    { x: 90, y: 70, size: 6, dur: 19, delay: -15 },
    { x: 15, y: 85, size: 3, dur: 21, delay: -2 },
    { x: 55, y: 15, size: 5, dur: 17, delay: -7 },
    { x: 75, y: 55, size: 4, dur: 23, delay: -11 },
    { x: 35, y: 75, size: 6, dur: 16, delay: -4 },
    { x: 95, y: 45, size: 3, dur: 25, delay: -13 },
    { x: 5, y: 50, size: 5, dur: 20, delay: -8 },
  ];

  const rings = [
    { x: 20, y: 30, size: 60, dur: 12, delay: 0 },
    { x: 70, y: 60, size: 80, dur: 15, delay: -4 },
    { x: 40, y: 80, size: 50, dur: 18, delay: -8 },
    { x: 85, y: 20, size: 70, dur: 14, delay: -2 },
  ];

  return (
    <div className="stage" style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .particle {
          position: absolute;
          width: var(--size, 4px);
          height: var(--size, 4px);
          background: #F0A93B;
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          box-shadow: 0 0 10px 2px rgba(240,169,59,0.4);
          animation: floatUp var(--dur, 15s) linear infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }
        .ring {
          position: absolute;
          width: var(--size, 60px);
          height: var(--size, 60px);
          border: 1px solid rgba(240,169,59,0.25);
          border-radius: 50%;
          left: var(--x, 50%);
          top: var(--y, 50%);
          animation: pulseRing var(--dur, 12s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .particle, .ring { animation: none; opacity: 0.3; }
        }
      `}</style>
      
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
          }}
        />
      ))}
      
      {rings.map((r, i) => (
        <div
          key={i}
          className="ring"
          style={{
            '--x': `${r.x}%`,
            '--y': `${r.y}%`,
            '--size': `${r.size}px`,
            '--dur': `${r.dur}s`,
            '--delay': `${r.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const expertises = [
  {
    slug: 'extension-equipes',
    number: '01',
    badge: 'SCALE',
    title: "Extension d'équipes techniques",
    titleEn: 'Technical team extension',
    description: "Nous intégrons des ingénieurs à vos équipes existantes : mêmes outils, mêmes rituels, mêmes exigences de qualité. L'objectif n'est pas de fournir des profils, mais d'augmenter durablement votre capacité d'exécution.",
    descriptionEn: 'We integrate engineers into your existing teams, using the same tools, rituals and quality standards. Our goal is not to supply profiles, but to sustainably increase your delivery capacity.',
    image: '/equipe.png',
    alt: 'Visuel SCALE — Extension d’équipes techniques',
    altEn: 'SCALE visual — Technical team extension',
  },
  {
    slug: 'studio-produit',
    number: '02',
    badge: 'BUILD',
    title: 'Studio Produit',
    titleEn: 'Product Studio',
    description: "Nous couvrons l'ensemble du cycle produit : cadrage, architecture, conception, développement, mise en production et évolution. Chaque décision technique est prise au regard d'un usage réel et mesurable.",
    descriptionEn: 'We cover the full product lifecycle: framing, architecture, design, development, launch and iteration. Every technical decision is grounded in real, measurable usage.',
    image: '/studio 1.jpg',
    alt: 'Visuel BUILD — Studio Produit',
    altEn: 'BUILD visual — Product Studio',
  },
  {
    slug: 'modernisation-applicative',
    number: '03',
    badge: 'EVOLVE',
    title: 'Modernisation applicative',
    titleEn: 'Application modernization',
    description: 'Reprendre une application en production demande de la méthode : comprendre avant de remplacer, sécuriser avant d\'accélérer, découper avant de reconstruire. Nous intervenons progressivement, sans rupture de service.',
    descriptionEn: 'Taking over a live application calls for a method: understand before replacing, secure before accelerating and break things down before rebuilding. We work incrementally, without service disruption.',
    image: '/modernisation.jpg',
    alt: 'Visuel EVOLVE — Modernisation applicative',
    altEn: 'EVOLVE visual — Application modernization',
  },
  {
    slug: 'ia-automatisation',
    number: '04',
    badge: 'AUTOMATE',
    badgeLabel: 'Nouvelle expertise',
    badgeLabelEn: 'New expertise',
    title: 'IA & Automatisation',
    titleEn: 'AI & Automation',
    description: "L'automatisation n'a de valeur que lorsqu'elle s'appuie sur des processus compris et des données maîtrisées. Nous partons de vos flux réels pour identifier ce qui peut être orchestré, assisté ou automatisé.",
    descriptionEn: 'Automation creates value only when it is grounded in understood processes and well-managed data. We start with your real workflows to identify what can be orchestrated, assisted or automated.',
    image: '/automate.png',
    alt: 'Visuel AUTOMATE — IA & Automatisation',
    altEn: 'AUTOMATE visual — AI & Automation',
  },
];

function ExpertiseRow({ expertise, index }) {
  const { t } = useLanguage();
  const isReversed = index % 2 === 1;

  return (
    <section className="mx-auto w-full max-w-screen-xl px-4 py-16 lg:px-8 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className={isReversed ? 'md:order-2' : 'md:order-1'}>
          <img
            src={expertise.image}
            alt={t(expertise.alt, expertise.altEn)}
            className="h-full w-full object-cover"
            style={{ aspectRatio: '4 / 3' }}
          />
        </div>
        <div className={isReversed ? 'md:order-1' : 'md:order-2'}>
          <div className="flex flex-wrap items-center gap-3">
            <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 500, color: '#374151' }}>
              0 {expertise.number}
            </span>
            <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navy }}>
              {expertise.badge}
            </span>
            {expertise.badgeLabel && (
              <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 500, color: T.navy, border: `1px solid ${T.yellow}`, padding: '2px 8px' }}>
                {t(expertise.badgeLabel, expertise.badgeLabelEn)}
              </span>
            )}
          </div>
          <h2
            style={{
              fontFamily: fonts.jakarta,
              fontSize: 'clamp(1.5rem, 3vw, 2.35rem)',
              fontWeight: 600,
              lineHeight: 1.2,
              color: T.navy,
              margin: '24px 0',
              maxWidth: '18ch',
            }}
          >
            {t(expertise.title, expertise.titleEn)}
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.0625rem', lineHeight: 1.75, color: '#374151', margin: 0, maxWidth: '38rem' }}>
            {t(expertise.description, expertise.descriptionEn)}
          </p>
          <div className="mt-8">
            <Link
              to={`/expertises/${expertise.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium"
              style={{ fontFamily: fonts.inter, color: T.navy }}
            >
              <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px' }}>{t('En savoir plus', 'Learn more')}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Expertises() {
  const { t } = useLanguage();
  return (
    <div style={{ fontFamily: fonts.inter, background: '#ffffff', color: T.navy }}>
      <section className="relative w-full overflow-hidden px-6 pt-40 pb-24 lg:px-12 md:pt-48 md:pb-32" style={{ background: '#040f23', color: '#f7f8fa' }}>
        <img
          src="/hero-architecture.jpg"
          alt="Architecture numérique abstraite composée de modules géométriques interconnectés"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.55 }}
        />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to right, #040f23, rgba(4,15,35,0.92), rgba(4,15,35,0.45))' }} />
        <ExpertisesHeroBackground />
        <div className="relative mx-auto max-w-7xl pl-4 md:pl-16 lg:pl-24" style={{ zIndex: 3 }}>
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.yellow, margin: '0 0 24px' }}>
            {t('Nos expertises', 'Our expertise')}
          </p>
          <h1
            style={{
              fontFamily: fonts.jakarta,
              fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#f7f8fa',
              margin: '0 0 24px',
              maxWidth: '18ch',
            }}
          >
            {t('Des capacités technologiques', 'Technology capabilities')}<br />{t('au service de vos projets.', 'for your projects.')}
          </h1>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: 1.75, color: '#FFFFFF', margin: 0, maxWidth: '48rem' }}>
            {t("Qu'il s'agisse de renforcer une équipe, de concevoir un produit, de moderniser un patrimoine applicatif ou d'automatiser des processus, nos interventions reposent sur une même exigence d'ingénierie.", 'Whether strengthening a team, designing a product, modernizing applications or automating processes, every engagement is grounded in the same engineering standards.')}
          </p>
        </div>
      </section>

      <div>
        {expertises.map((expertise, index) => (
          <ExpertiseRow key={expertise.slug} expertise={expertise} index={index} />
        ))}
      </div>

      <section className="mx-auto w-full max-w-screen-xl px-4 py-16 lg:px-8 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2
              style={{
                fontFamily: fonts.jakarta,
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: T.navy,
                margin: '0 0 24px',
                maxWidth: '24ch',
              }}
            >
              {t('Un projet numérique à construire ou à faire évoluer ?', 'A digital project to build or improve?')}
            </h2>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: 1.75, color: '#374151', margin: 0 }}>
              {t('Parlons de votre contexte, de vos enjeux et de ce que nous pouvons construire ensemble.', 'Tell us about your context and goals, and what we could build together.')}
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-medium transition-colors"
            style={{ fontFamily: fonts.inter, background: T.yellow, color: T.navy }}
          >
            {t('Parler à Enésense', 'Talk to Enésense')}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
