import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const capabilities = [
  { number: '01', title: 'Pilotage de chantier', desc: 'Planification, jalons et avancement consolidés dans une vue unique, accessible depuis le terrain.' },
  { number: '02', title: 'Documents et conformité', desc: 'Centralisation des pièces, versions maîtrisées et traçabilité des échanges entre intervenants.' },
  { number: '03', title: 'Indicateurs', desc: 'Suivi des coûts, des délais et des écarts, avec des indicateurs exploitables par la direction.' },
  { number: '04', title: 'Collaboration', desc: 'Un espace commun aux équipes internes, sous-traitants et donneurs d\'ordre.' },
];

export default function SolutionDetail() {
  return (
    <div style={{ fontFamily: fonts.inter, background: '#ffffff' }}>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32" style={{ background: T.navyDeep, color: T.navyText }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.yellow, marginBottom: '32px' }}>
              Produit Enésense
            </p>
            <h1 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05, color: T.navyText, margin: '0 0 24px' }}>
              BRICONA
            </h1>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.25rem', fontWeight: 500, color: T.navyText, margin: '0 0 24px' }}>
              La plateforme numérique dédiée au secteur du BTP.
            </p>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, margin: '0 0 40px', maxWidth: '42rem' }}>
              BRICONA est développée, exploitée et financée par Enésense. Elle illustre notre capacité à concevoir une plateforme métier complète, de l'architecture à la production.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 font-medium text-sm transition-all duration-200"
                style={{ background: T.yellow, color: '#0B1D33' }}
                onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
                onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
              >
                Demander une démonstration
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          {(() => {
            const slides = [
              { src: '/bricona 1.png', alt: 'BRICONA - vue 1' },
              { src: '/bricona 2.png', alt: 'BRICONA - vue 2' },
              { src: '/bricona 3.png', alt: 'BRICONA - vue 3' },
            ];
            const [currentSlide, setCurrentSlide] = useState(0);
            useEffect(() => {
              const timer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % slides.length);
              }, 4000);
              return () => clearInterval(timer);
            }, [slides.length]);
            return (
              <div className="relative overflow-hidden border aspect-video" style={{ borderColor: `${T.navyMuted}20` }}>
                {slides.map((slide, idx) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    loading="lazy"
                    className="w-full h-full object-contain transition-opacity duration-700"
                    style={{
                      position: idx === currentSlide ? 'relative' : 'absolute',
                      inset: 0,
                      opacity: idx === currentSlide ? 1 : 0,
                      background: '#0A0D14',
                    }}
                  />
                ))}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: idx === currentSlide ? '24px' : '8px',
                        background: idx === currentSlide ? T.yellow : 'rgba(255,255,255,0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Capacités */}
      <section className="py-20 md:py-24" style={{ background: T.surface }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            Un outil construit pour le terrain, pas pour la démonstration.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {capabilities.map((c, i) => {
              const isAccent = i % 2 === 0;
              return (
                <div key={c.number}>
                  <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isAccent ? T.yellow : T.navyMuted }}>
                    {c.number}
                  </span>
                  <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', marginTop: '12px', marginBottom: '12px' }}>
                    {c.title}
                  </h3>
                  <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted }}>
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ce que le produit démontre */}
      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            Une capacité produit, pas une réalisation isolée.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, maxWidth: '42rem' }}>
            Concevoir BRICONA nous impose les mêmes contraintes que celles de nos clients : exploitation continue, migrations de données, supervision, évolutions sans rupture. Ces exigences nourrissent directement notre pratique d'ingénierie.
          </p>
          <div className="mt-10">
            <Link
              to="/expertises/studio-produit"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: '#0B1D33' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.yellowDeep)}
              onMouseLeave={e => (e.currentTarget.style.color = '#0B1D33')}
            >
              <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px' }}>Découvrir le Studio Produit</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24" style={{ borderTop: `1px solid ${T.navyMuted}20`, background: '#ffffff' }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: 0, marginBottom: '24px' }}>
                Un projet numérique à construire ou à faire évoluer ?
              </h2>
              <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
                Parlons de votre contexte, de vos enjeux et de ce que nous pouvons construire ensemble.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 font-medium text-sm transition-all duration-200"
              style={{ background: T.yellow, color: '#0B1D33' }}
              onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
              onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
            >
              Parler à Enésense
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
