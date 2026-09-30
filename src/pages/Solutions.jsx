import { useState, useEffect } from 'react';
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

export default function Solutions() {
  const { t } = useLanguage();
  const briconaSlides = ['/bricona.jfif', '/bricona 1.png', '/bricona 2.png', '/bricona 3.png'];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % briconaSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const approachItems = [
    { title: t('Partir du terrain', 'Start with real-world needs'), desc: t("Chaque produit naît d'un problème métier observé, pas d'une intuition technologique.", 'Every product starts with an observed business problem, not a technology hunch.') },
    { title: t("Construire pour l'exploitation", 'Build for operations'), desc: t("Supervision, reprise sur incident, coûts d'exécution : ces sujets existent dès les premières versions.", 'Monitoring, incident recovery and operating costs matter from the earliest releases.') },
    { title: t("Mesurer l'usage", 'Measure usage'), desc: t('Les fonctionnalités se valident sur des usages réels, pas sur des hypothèses.', 'Features are validated against real usage, not assumptions.') },
  ];

  return (
    <div style={{ fontFamily: fonts.inter, background: '#ffffff' }}>
      {/* Hero */}
      <section className="pt-40 pb-24 md:pt-48 md:pb-32" style={{ background: T.navyDeep, color: T.navyText }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
              {t('Nos solutions', 'Our solutions')}
            </p>
            <h1 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.05, color: T.navyText, margin: '0 0 24px' }}>
              {t('Des produits numériques conçus pour résoudre des problèmes réels.', 'Digital products built to solve real problems.')}
            </h1>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, margin: '0 0 40px', maxWidth: '42rem' }}>
              {t('Enésense ne se limite pas aux projets réalisés pour ses clients. Le Groupe conçoit, développe et exploite ses propres plateformes.', 'Enésense does more than deliver client projects. The Group designs, builds and operates its own platforms.')}
            </p>
          </div>
        </div>
      </section>

      {/* Produit principal */}
      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="mb-4">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted }}>
              {t('Produit principal', 'Featured product')}
            </p>
          </div>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 style={{ fontFamily: fonts.jakarta, fontSize: '2.5rem', fontWeight: 700, color: '#0B1D33', lineHeight: 1.1, margin: '16px 0' }}>BRICONA</h2>
              <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', fontWeight: 500, color: T.yellow, marginTop: '12px' }}>
                {t('La plateforme numérique dédiée au secteur du BTP.', 'The digital platform built for the construction industry.')}
              </p>
              <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, marginTop: '24px' }}>
                {t("BRICONA structure et fluidifie les échanges entre les acteurs d'un chantier : planification, suivi d'avancement, documents, indicateurs. Une réponse construite à partir d'un besoin métier concret.", 'BRICONA streamlines collaboration across construction projects with planning, progress tracking, documents and metrics, built around a real business need.')}
              </p>
              <div className="mt-8">
                <Link
                  to="/solutions/bricona"
                  className="group inline-flex items-center gap-3 border px-7 py-4 font-medium text-sm transition-all duration-200"
                  style={{ borderColor: T.navyMuted, color: '#0B1D33' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.yellow; e.currentTarget.style.color = T.yellow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.navyMuted; e.currentTarget.style.color = '#0B1D33'; }}
                >
                  {t('Découvrir BRICONA', 'Discover BRICONA')}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden border aspect-video" style={{ borderColor: `${T.navyMuted}20` }}>
              {briconaSlides.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`${t('BRICONA - vue', 'BRICONA - view')} ${idx + 1}`}
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
                {briconaSlides.map((_, idx) => (
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
          </div>
        </div>
      </section>

      {/* Notre approche produit */}
      <section className="py-20 md:py-24" style={{ background: T.surface }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            {t("Construire parce qu'un problème mérite une meilleure solution.", 'Build because a problem deserves a better solution.')}
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {approachItems.map((item, i) => (
              <div key={i}>
                <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Futurs produits */}
      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            {t("D'autres plateformes sont en cours de construction.", 'More platforms are in development.')}
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, maxWidth: '42rem' }}>
            {t('Nos prochains produits suivent la même logique : un secteur, un problème récurrent, une plateforme conçue pour être exploitée à grande échelle. Ils seront présentés ici dès leur mise à disposition.', 'Our upcoming products follow the same approach: one industry, one recurring problem, and a platform designed to scale. They will appear here when available.')}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24" style={{ borderTop: `1px solid ${T.navyMuted}20`, background: '#ffffff' }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: 0, marginBottom: '24px' }}>
                {t('Un projet numérique à construire ou à faire évoluer ?', 'A digital project to build or improve?')}
              </h2>
              <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
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
