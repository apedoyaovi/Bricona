import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    description: "Nous intégrons des ingénieurs à vos équipes existantes : mêmes outils, mêmes rituels, mêmes exigences de qualité. L'objectif n'est pas de fournir des profils, mais d'augmenter durablement votre capacité d'exécution.",
    image: '/pillar-scale.jpg',
    alt: 'Visuel SCALE — Extension d’équipes techniques',
  },
  {
    slug: 'studio-produit',
    number: '02',
    badge: 'BUILD',
    title: 'Studio Produit',
    description: "Nous couvrons l'ensemble du cycle produit : cadrage, architecture, conception, développement, mise en production et évolution. Chaque décision technique est prise au regard d'un usage réel et mesurable.",
    image: '/pillar-build.jpg',
    alt: 'Visuel BUILD — Studio Produit',
  },
  {
    slug: 'modernisation-applicative',
    number: '03',
    badge: 'EVOLVE',
    title: 'Modernisation applicative',
    description: 'Reprendre une application en production demande de la méthode : comprendre avant de remplacer, sécuriser avant d\'accélérer, découper avant de reconstruire. Nous intervenons progressivement, sans rupture de service.',
    image: '/pillar-evolve.jpg',
    alt: 'Visuel EVOLVE — Modernisation applicative',
  },
  {
    slug: 'ia-automatisation',
    number: '04',
    badge: 'AUTOMATE',
    badgeLabel: 'Nouvelle expertise',
    title: 'IA & Automatisation',
    description: "L'automatisation n'a de valeur que lorsqu'elle s'appuie sur des processus compris et des données maîtrisées. Nous partons de vos flux réels pour identifier ce qui peut être orchestré, assisté ou automatisé.",
    image: '/pillar-automate.jpg',
    alt: 'Visuel AUTOMATE — IA & Automatisation',
  },
];

function ExpertiseRow({ expertise, index }) {
  const isReversed = index % 2 === 1;

  return (
    <section className="mx-auto w-full max-w-screen-xl px-4 py-16 lg:px-8 md:py-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className={isReversed ? 'md:order-2' : 'md:order-1'}>
          <img
            src={expertise.image}
            alt={expertise.alt}
            className="h-full w-full object-cover"
            style={{ aspectRatio: '4 / 3' }}
          />
        </div>
        <div className={isReversed ? 'md:order-1' : 'md:order-2'}>
          <div className="flex flex-wrap items-center gap-3">
            <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 500, color: T.navyMuted }}>
              0 {expertise.number}
            </span>
            <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navy }}>
              {expertise.badge}
            </span>
            {expertise.badgeLabel && (
              <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 500, color: T.navy, border: `1px solid ${T.yellow}`, padding: '2px 8px' }}>
                {expertise.badgeLabel}
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
            {expertise.title}
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.0625rem', lineHeight: 1.75, color: T.navyMuted, margin: 0, maxWidth: '38rem' }}>
            {expertise.description}
          </p>
          <div className="mt-8">
            <Link
              to={`/expertises/${expertise.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium"
              style={{ fontFamily: fonts.inter, color: T.navy }}
            >
              <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px' }}>En savoir plus</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Expertises() {
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
            Nos expertises
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
            Des capacités technologiques<br />au service de vos projets.
          </h1>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: 1.75, color: T.navyMuted, margin: 0, maxWidth: '48rem' }}>
            Qu'il s'agisse de renforcer une équipe, de concevoir un produit, de moderniser un patrimoine applicatif ou d'automatiser des processus, nos interventions reposent sur une même exigence d'ingénierie.
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
              Un projet numérique à construire ou à faire évoluer ?
            </h2>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: 1.75, color: T.navyMuted, margin: 0 }}>
              Parlons de votre contexte, de vos enjeux et de ce que nous pouvons construire ensemble.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 px-7 py-4 text-sm font-medium transition-colors"
            style={{ fontFamily: fonts.inter, background: T.yellow, color: T.navy }}
          >
            Parler à Enésense
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
