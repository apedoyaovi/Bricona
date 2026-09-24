import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const T = {
  navy: '#0A0D14',
  surface: '#f8f9ff',
  surfaceContainerLow: '#eff4ff',
  yellow: '#F2B705',
  yellowDeep: '#C99600',
  navyDeep: '#040f23',
  navyText: '#f7f8fa',
  navyMuted: '#b0b8c4',
  navy2: '#132A45',
  navy3: '#1E3C5F',
  onNavySoft: '#AEB9C7',
};

const fonts = {
  jakarta: "'Plus Jakarta Sans', sans-serif",
  inter: "'Inter', sans-serif",
};

const capabilities = [
  { number: '01', title: 'Vitrine sociale', desc: 'Présenter les produits dans un espace simple, visuel et pensé pour les échanges avec la clientèle.' },
  { number: '02', title: 'Commandes', desc: 'Centraliser les demandes, suivre les étapes et garder une vue claire sur les ventes en cours.' },
  { number: '03', title: 'Paiements et confiance', desc: 'Structurer les transactions et les informations essentielles pour faciliter des échanges plus sereins.' },
  { number: '04', title: 'Communauté', desc: 'Créer un point de contact durable entre les marchands, leurs clients et leur réseau commercial.' },
];

export default function SelvyDetail() {
  const selvySlides = ['/selvy.jfif', '/selvy 1-1.png', '/selvy 1-2.png', '/selvy 2-1.png', '/selvy 2-2.png', '/selvy 3-1.png', '/selvy 3-2.png'];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % selvySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: fonts.inter, background: '#ffffff' }}>
      <section className="pt-40 pb-24 md:pt-48 md:pb-32" style={{ background: T.navyDeep, color: T.navyText }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.yellow, marginBottom: '32px' }}>
              Produit Enésense
            </p>
            <h1 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.05, color: T.navyText, margin: '0 0 24px' }}>
              SELVY
            </h1>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.25rem', fontWeight: 500, color: T.navyText, margin: '0 0 24px' }}>
              Le social commerce simplifié pour les marchands d'Afrique de l'Ouest.
            </p>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, margin: '0 0 40px', maxWidth: '42rem' }}>
              SELVY aide les marchands à présenter leurs produits, recevoir des demandes et développer leur activité commerciale grâce à une expérience numérique accessible et centrée sur les usages réels.
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

      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="relative min-h-[420px] overflow-hidden border" style={{ borderColor: `${T.navyMuted}20`, background: `linear-gradient(135deg, ${T.navy2}, ${T.navyDeep} 65%, ${T.navy3})` }}>
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full" style={{ background: 'rgba(242,183,5,0.16)', filter: 'blur(50px)' }} />
            <div className="relative w-full h-full min-h-[420px]">
              {selvySlides.map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  alt={`SELVY - vue ${idx + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain transition-opacity duration-700"
                  style={{ opacity: idx === currentSlide ? 1 : 0 }}
                />
              ))}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selvySlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: idx === currentSlide ? '20px' : '8px',
                      background: idx === currentSlide ? T.yellow : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8 md:p-14">
              <div>
                <p style={{ fontFamily: fonts.inter, fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.yellow }}>
                  Social commerce
                </p>
                <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.12)', margin: '24px 0 0' }}>
                  SELVY
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {['Catalogue', 'Commandes', 'Clients'].map(item => (
                  <div key={item} className="border-t pt-4" style={{ borderTopColor: 'rgba(242,183,5,0.7)' }}>
                    <span style={{ fontFamily: fonts.inter, fontSize: '12px', fontWeight: 600, color: T.navyText }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24" style={{ background: T.surface }}>
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            Une plateforme pensée pour le commerce de proximité.
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {capabilities.map((capability, index) => (
              <div key={capability.number}>
                <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: index % 2 === 0 ? T.yellow : T.navyMuted }}>
                  {capability.number}
                </span>
                <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', marginTop: '12px', marginBottom: '12px' }}>
                  {capability.title}
                </h3>
                <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted }}>
                  {capability.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: '1.85rem', fontWeight: 600, color: '#0B1D33', lineHeight: 1.3, margin: 0, marginBottom: '24px' }}>
            Une capacité produit, pas une réalisation isolée.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, maxWidth: '42rem' }}>
            Concevoir SELVY nous confronte aux réalités du commerce quotidien : simplicité d'usage, adoption progressive, confiance et exploitation sur la durée. Ces apprentissages nourrissent directement notre approche produit.
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
