import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ─── Design Tokens (matching stitch_en_sense redesign) ─── */
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

/* ─── HERO CUBE BACKGROUND ─── */
function HeroCubeBackground() {
  const cubes = [
    { s: 80, x: 20, dur: 12, spin: 20, delay: 0 },
    { s: 130, x: 120, dur: 13, spin: 21, delay: -1.08 },
    { s: 100, x: 270, dur: 14, spin: 22, delay: -2.33 },
    { s: 160, x: 390, dur: 15, spin: 23, delay: -3.75 },
    { s: 90, x: 570, dur: 16, spin: 24, delay: -5.33 },
    { s: 180, x: 680, dur: 17, spin: 25, delay: -7.08 },
    { s: 120, x: 880, dur: 18, spin: 26, delay: -9 },
    { s: 150, x: 1020, dur: 19, spin: 27, delay: -11.08 },
    { s: 110, x: 1190, dur: 20, spin: 28, delay: -13.33 },
    { s: 200, x: 1320, dur: 21, spin: 29, delay: -15.75 },
    { s: 140, x: 1540, dur: 22, spin: 30, delay: -18.33 },
    { s: 170, x: 1700, dur: 23, spin: 31, delay: -21.08 },
  ];

  const lines = [
    { x: '60%', h: 120, dur: 8, delay: 0, dot: true },
    { x: '71%', h: 200, dur: 11, delay: -4, dot: false },
    { x: '88%', h: 90, dur: 6.5, delay: -2, dot: true },
    { x: '95%', h: 260, dur: 14, delay: -9, dot: false },
    { x: '80%', h: 150, dur: 9.5, delay: -6.5, dot: true },
    { x: '55%', h: 110, dur: 7.5, delay: -3.5, dot: false },
    { x: '99%', h: 130, dur: 10, delay: -1, dot: true },
  ];

  return (
    <div className="stage" style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
      <style>{`
        @keyframes fallLoop {
          0% { top: -40%; opacity: 0; }
          8% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 140%; opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotateX(-22deg) rotateY(-34deg); }
          to { transform: rotateX(-22deg) rotateY(326deg); }
        }
        .cube-scene {
          position: absolute;
          width: var(--s, 220px);
          height: var(--s, 220px);
          top: -40%;
          right: var(--x, 60px);
          perspective: 1000px;
          animation: fallLoop var(--dur, 14s) linear infinite;
          animation-delay: var(--delay, 0s);
          opacity: 0;
        }
        .cube {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          transform: rotateX(-22deg) rotateY(-34deg);
          animation: spinSlow var(--spin, 26s) linear infinite;
          animation-delay: var(--delay, 0s);
        }
        .cube .face {
          position: absolute;
          inset: 0;
          background: linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015) 70%);
          border: 1px solid rgba(255,255,255,0.16);
          backface-visibility: visible;
        }
        .cube .front { transform: translateZ(calc(var(--s, 220px) / 2)); }
        .cube .back { transform: rotateY(180deg) translateZ(calc(var(--s, 220px) / 2)); }
        .cube .right { transform: rotateY(90deg) translateZ(calc(var(--s, 220px) / 2)); border-color: rgba(255,255,255,0.30); background: linear-gradient(155deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02)); }
        .cube .left { transform: rotateY(-90deg) translateZ(calc(var(--s, 220px) / 2)); }
        .cube .top { transform: rotateX(90deg) translateZ(calc(var(--s, 220px) / 2)); background: linear-gradient(155deg, rgba(255,255,255,0.14), rgba(255,255,255,0.03)); border-color: rgba(255,255,255,0.30); }
        .cube .bottom { transform: rotateX(-90deg) translateZ(calc(var(--s, 220px) / 2)); }
        
        .line {
          position: absolute;
          bottom: -20%;
          left: var(--x, 50%);
          width: 1px;
          height: var(--h, 140px);
          background: linear-gradient(to top, transparent, #F0A93B 35%, #F0A93B 65%, transparent);
          opacity: 0;
          animation: riseLoop var(--dur, 9s) linear infinite;
          animation-delay: var(--delay, 0s);
        }
        .line.dot::after {
          content: "";
          position: absolute;
          top: -3px;
          left: 50%;
          width: 6px;
          height: 6px;
          background: #F0A93B;
          border-radius: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 8px 1px rgba(240,169,59,0.6);
        }
        @keyframes riseLoop {
          0% { bottom: -20%; opacity: 0; }
          10% { opacity: 0.9; }
          88% { opacity: 0.9; }
          100% { bottom: 120%; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cube, .line { animation: none; opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .stage { opacity: 0.6; }
        }
      `}</style>
      
      {cubes.map((cube, i) => (
        <div
          key={i}
          className="cube-scene"
          style={{
            '--s': `${cube.s}px`,
            '--x': `${cube.x}px`,
            '--dur': `${cube.dur}s`,
            '--spin': `${cube.spin}s`,
            '--delay': `${cube.delay}s`,
          }}
        >
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face left"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      ))}
      
      {lines.map((line, i) => (
        <div
          key={`line-${i}`}
          className={`line ${line.dot ? 'dot' : ''}`}
          style={{
            '--x': line.x,
            '--h': `${line.h}px`,
            '--dur': `${line.dur}s`,
            '--delay': `${line.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── HERO SECTION ─── */
function HeroRightStage() {
  const terms = [
    {
      icon: (
        <svg viewBox="0 0 120 120">
          <rect x="10" y="20" width="100" height="80" rx="4" />
          <line x1="10" y1="38" x2="110" y2="38" />
          <circle cx="20" cy="29" r="2.2" />
          <line x1="24" y1="55" x2="96" y2="55" />
          <line x1="24" y1="68" x2="80" y2="68" />
          <line x1="24" y1="81" x2="60" y2="81" />
        </svg>
      ),
      label: 'Création de site web',
    },
    {
      icon: (
        <svg viewBox="0 0 120 120">
          <rect x="30" y="10" width="60" height="100" rx="8" />
          <line x1="30" y1="90" x2="90" y2="90" />
          <rect x="40" y="30" width="16" height="16" rx="3" />
          <rect x="64" y="30" width="16" height="16" rx="3" />
          <rect x="40" y="54" width="16" height="16" rx="3" />
          <rect x="64" y="54" width="16" height="16" rx="3" />
        </svg>
      ),
      label: "Création d'application",
    },
    {
      icon: (
        <svg viewBox="0 0 120 120">
          <circle cx="18" cy="60" r="10" />
          <circle cx="60" cy="60" r="10" />
          <circle cx="102" cy="60" r="10" />
          <line x1="28" y1="60" x2="48" y2="60" />
          <line x1="70" y1="60" x2="90" y2="60" />
          <path d="M44 55 L48 60 L44 65" />
          <path d="M86 55 L90 60 L86 65" />
        </svg>
      ),
      label: 'Automatisation',
    },
    {
      icon: (
        <svg viewBox="0 0 120 120">
          <rect x="15" y="15" width="90" height="90" />
          <line x1="15" y1="105" x2="105" y2="15" />
          <line x1="15" y1="15" x2="15" y2="25" />
          <line x1="105" y1="15" x2="95" y2="15" />
          <line x1="15" y1="105" x2="25" y2="105" />
          <line x1="105" y1="105" x2="105" y2="95" />
        </svg>
      ),
      label: "Votre environnement numérique sur mesure",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const CYCLE_MS = 3400;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % terms.length);
    }, CYCLE_MS);
    return () => clearInterval(interval);
  }, [terms.length]);

  return (
    <div className="flex flex-col items-end justify-center h-full relative w-full gap-4" style={{ minHeight: '420px' }}>
      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes slideDownCenterRight {
          0% { transform: translateY(-40px) translateX(0); opacity: 0; }
          45% { transform: translateY(0) translateX(0); opacity: 1; }
          75% { transform: translateY(0) translateX(40px); opacity: 1; }
          100% { transform: translateY(0) translateX(60px); opacity: 0; }
        }
        @keyframes mobileFadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .right-term {
          position: absolute;
          right: 0;
          display: flex;
          align-items: center;
          gap: 16px;
          opacity: 0;
          pointer-events: none;
        }
        .right-term.active {
          animation: slideDownCenterRight 3.4s cubic-bezier(.4,0,.2,1) forwards;
        }
        .right-term .icon-wrap svg * {
          fill: none;
          stroke: #8FB0FF;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
        }
        .right-term.active .icon-wrap svg * {
          animation: draw 0.9s cubic-bezier(.4,0,.2,1) forwards;
        }
        .right-term.active .icon-wrap svg *:nth-child(2) { animation-delay: 0.08s; }
        .right-term.active .icon-wrap svg *:nth-child(3) { animation-delay: 0.16s; }
        .right-term.active .icon-wrap svg *:nth-child(4) { animation-delay: 0.24s; }
        .right-term.active .icon-wrap svg *:nth-child(5) { animation-delay: 0.32s; }
        .right-term.active .icon-wrap svg *:nth-child(6) { animation-delay: 0.4s; }
        .right-term.active .icon-wrap svg *:nth-child(7) { animation-delay: 0.48s; }
        .right-term h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 650;
          letter-spacing: -0.01em;
          font-size: clamp(1.1rem, 1.6vw, 1.45rem);
          line-height: 1.15;
          color: #F5F6F8;
          margin: 0;
          max-width: 14ch;
          text-align: right;
        }
        @media (max-width: 1023px) {
          .right-term {
            position: relative;
            right: auto;
            top: auto !important;
            justify-content: center;
            animation: mobileFadeIn 3.4s cubic-bezier(.4,0,.2,1) forwards;
          }
        }
      `}</style>
      {terms.map((term, idx) => (
        <div
          key={idx}
          className={`right-term ${idx === activeIndex ? 'active' : ''}`}
          style={{ top: `${idx * 80}px` }}
        >
          <div className="icon-wrap" style={{ width: '56px', height: '56px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {term.icon}
          </div>
          <h1>{term.label}</h1>
        </div>
      ))}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden flex items-start lg:items-center min-h-screen mt-[72px] py-12 lg:py-24 group" style={{ background: T.navyDeep }}>
      <img
        src="/hero-architecture.jpg"
        alt="Architecture numérique abstraite"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ opacity: 0.7 }}
      />
      <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to right, #040f23, rgba(4,15,35,0.9), rgba(4,15,35,0.3))' }} />
      <HeroCubeBackground />

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 w-full h-full relative" style={{ zIndex: 3 }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6">

            {/* Eyebrow */}
            <p style={{ fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.yellow }}>
              Enésense
            </p>

            {/* Heading */}
            <h1 className="text-center lg:text-left" style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(28px, 5vw, 78px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: T.navyText, margin: 0, maxWidth: '100%' }}>
              Build. Scale. Evolve. Automate.
            </h1>

            {/* Subtitle */}
            <h2 style={{ fontFamily: fonts.inter, fontSize: '24px', fontWeight: 500, lineHeight: '34px', letterSpacing: '-0.005em', color: '#f7f8fa', maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}>
              Votre projet numérique commence ici.
            </h2>
            <p style={{ fontFamily: fonts.inter, fontSize: '17px', fontWeight: 400, lineHeight: '27px', letterSpacing: '-0.005em', color: T.navyMuted, maxWidth: '540px', margin: '0 auto', textAlign: 'left' }}>
              Site web, application, plateforme métier, automatisation ou projet d'entreprise : nous concevons et développons les technologies dont vous avez besoin.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full pt-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg transition-all duration-200 active:translate-y-0.5 hover:scale-105"
                  style={{ background: T.yellow, color: T.navyDeep, fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(242,183,5,0.3)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
                  onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
                >
                  Discuter de votre projet
                </a>
                <a
                  href="/expertises"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border transition-all duration-200 active:translate-y-0.5 hover:scale-105"
                  style={{ borderColor: T.navyMuted, color: T.navyText, fontFamily: fonts.inter, fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.yellow; e.currentTarget.style.color = T.yellow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.navyMuted; e.currentTarget.style.color = T.navyText; }}
                >
                  Nos expertises
                </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <HeroRightStage />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PARTNERS STRIP ─── */
function PartnersStrip() {
  const partners = [
    { icon: 'auto_awesome', name: 'Selvy', color: T.onSurface },
    { icon: 'construction', name: 'Bricona', color: T.primary },
  ];
  return (
    <section className="w-full py-8" style={{ background: T.surfaceContainerLow, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04)' }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p style={{ fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.onSurfaceVariant, margin: 0 }}>
            Ils nous font confiance &amp; Partenaires technologiques :
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12" style={{ opacity: 0.8 }}>
            {partners.map(({ icon, name, color }) => (
              <div key={name} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color }}>{icon}</span>
                <span style={{ fontFamily: fonts.jakarta, fontSize: '18px', fontWeight: 700, color: T.onSurface }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERTISE CARD ─── */
function ExpertiseCard({ badge, badgeLabel, title, desc, image, href }) {
  return (
    <div className="bg-white overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={href} className="group flex h-full flex-col">
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="flex flex-1 flex-col p-8">
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted }}>{badge}</span>
            {badgeLabel && (
              <span style={{ borderColor: T.yellow, color: T.navy, fontFamily: fonts.inter, fontSize: '11px', fontWeight: 500, border: `1px solid ${T.yellow}`, padding: '2px 8px', borderRadius: '4px' }}>{badgeLabel}</span>
            )}
          </div>
          <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.15rem', fontWeight: 600, color: '#0B1D33', margin: '20px 0 16px' }}>{title}</h3>
          <p style={{ fontFamily: fonts.inter, fontSize: '0.95rem', lineHeight: '1.55', color: T.navyMuted, margin: '0 0 24px', flex: '1 1 auto' }}>{desc}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group-hover:gap-3" style={{ fontFamily: fonts.inter, marginTop: 'auto' }}>
            <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px', color: '#0B1D33' }}>Découvrir</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

/* ─── EXPERTISE SECTION ─── */
function ExpertiseSection() {
  const cards = [
    { badge: 'SCALE', title: "Extension d'équipes techniques", desc: "Renforcer vos équipes avec des ingénieurs spécialisés, intégrés à vos méthodes et à votre environnement technique.", image: '/pillar-scale.jpg', href: '/expertises/extension-equipes' },
    { badge: 'BUILD', title: "Studio Produit", desc: "Concevoir et développer des produits numériques adaptés à vos usages réels.", image: '/pillar-build.jpg', href: '/expertises/studio-produit' },
    { badge: 'EVOLVE', title: "Modernisation applicative", desc: "Reprendre en main, sécuriser et faire évoluer vos applications existantes.", image: '/pillar-evolve.jpg', href: '/expertises/modernisation-applicative' },
    { badge: 'AUTOMATE', badgeLabel: 'Nouvelle expertise', title: "IA & Automatisation", desc: "Automatiser les processus et créer de nouveaux usages grâce à l'intelligence artificielle.", image: '/pillar-automate.jpg', href: '/expertises/ia-automatisation' },
  ];

  return (
    <section id="expertises" className="w-full py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
            Nos expertises
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: '0 0 24px', maxWidth: '32ch' }}>
            Des capacités techniques pour chaque étape de votre transformation.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
            De l'augmentation de capacité au développement d'un nouveau produit, jusqu'à la modernisation d'un patrimoine applicatif existant, Enésense intervient là où l'ingénierie numérique devient un levier stratégique.
          </p>
          <div className="mt-10">
            <Link
              to="/expertises"
              className="group inline-flex items-center gap-3 border px-7 py-4 text-sm font-medium transition-all duration-200 hover:shadow-md hover:border-yellow"
              style={{ borderColor: T.navyMuted, color: '#0B1D33', fontFamily: fonts.inter }}
            >
              Découvrir nos expertises
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8" style={{ border: `1px solid ${T.navyMuted}20`, background: `${T.navyMuted}20`, padding: '24px' }}>
          {cards.map(c => <ExpertiseCard key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTIONS SECTION ─── */
function SolutionsSection() {
  return (
    <section className="w-full py-24" style={{ background: T.navyDeep }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.yellow, marginBottom: '24px' }}>
            Nos solutions
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: T.navyText, margin: '0 0 24px', maxWidth: '32ch' }}>
            Nous construisons aussi nos propres produits.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
            Notre expertise ne se limite pas aux projets que nous réalisons pour nos clients. Enésense développe également ses propres plateformes et solutions numériques.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 style={{ fontFamily: fonts.jakarta, fontSize: '2.5rem', fontWeight: 700, color: T.navyText, letterSpacing: '-0.02em' }}>BRICONA</h3>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', fontWeight: 500, color: T.yellow, marginTop: '16px' }}>
              La plateforme numérique dédiée au secteur du BTP.
            </p>
            <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, marginTop: '24px' }}>
              BRICONA traduit notre approche produit : partir d'un problème métier concret et construire une plateforme numérique capable d'y répondre à grande échelle.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/solutions/bricona"
                className="group inline-flex items-center gap-3 border px-7 py-4 font-medium transition-all duration-200"
                style={{ borderColor: T.navyMuted, color: T.navyText, fontFamily: fonts.inter, fontSize: '14px', textDecoration: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.yellow; e.currentTarget.style.color = T.yellow; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.navyMuted; e.currentTarget.style.color = T.navyText; }}
              >
                Découvrir BRICONA
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <Link
                to="/solutions"
                className="group inline-flex items-center gap-3 px-7 py-4 font-medium transition-all duration-200"
                style={{ background: T.yellow, color: T.navyDeep, fontFamily: fonts.inter, fontSize: '14px', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
                onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
              >
                Nos solutions
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <img src="/bricona-product.jpg" alt="Interface de la plateforme BRICONA dédiée au secteur du BTP" loading="lazy" className="w-full border" style={{ borderColor: `${T.navyMuted}20` }} />
        </div>
      </div>
    </section>
  );
}

/* ─── MODEL SECTION ─── */
function ModelSection() {
  const items = [
    { title: 'Vos équipes', desc: 'Des ingénieurs capables de s\'intégrer à vos équipes, vos outils et vos rituels.' },
    { title: 'Vos produits', desc: 'Une capacité de conception et de développement couvrant l\'ensemble du cycle produit.' },
    { title: 'Votre patrimoine technologique', desc: 'Des applications et des données maîtrisées, sécurisées et conçues pour évoluer.' },
  ];
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
            Notre modèle
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: '0 0 24px', maxWidth: '32ch' }}>
            Une ingénierie pensée pour s'intégrer à votre réalité.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
            Chaque organisation possède son environnement technique, ses contraintes et ses méthodes de travail. Nous construisons nos interventions autour de cette réalité plutôt que d'imposer un modèle standardisé.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.title} className="border-t-2" style={{ borderTopColor: T.yellow, paddingTop: '24px' }}>
              <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33' }}>{item.title}</h3>
              <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted, marginTop: '16px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXIGENCE SECTION ─── */
function ExigenceSection() {
  const items = [
    { badge: '01', title: 'Transparence', desc: 'Un suivi clair de l\'avancement, des priorités et des décisions.' },
    { badge: '02', title: 'Qualité technique', desc: 'Des pratiques d\'ingénierie structurées et une attention constante portée à la qualité du code.' },
    { badge: '03', title: 'Maîtrise', desc: 'Le client conserve la propriété de ses développements, de ses données et de ses actifs numériques.' },
    { badge: '04', title: 'Protection', desc: 'Une gouvernance interne dédiée à la protection des données et à la conformité de nos opérations.' },
  ];
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
            Notre exigence
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: '0 0 24px', maxWidth: '32ch' }}>
            Construire avec rigueur. Évoluer avec maîtrise.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
            La qualité d'une solution numérique ne repose pas uniquement sur la technologie utilisée. Elle repose aussi sur la façon dont le projet est gouverné, développé et transmis.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2" style={{ border: `1px solid ${T.navyMuted}20`, background: `${T.navyMuted}20` }}>
          {items.map(item => (
            <div key={item.title} className="h-full" style={{ padding: '32px' }}>
              <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted }}>
                {item.badge}
              </span>
              <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', marginTop: '20px' }}>{item.title}</h3>
              <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted, marginTop: '16px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PERSPECTIVES SECTION ─── */
function PerspectivesSection() {
  const items = [
    { badge: 'Transformation', title: 'Reprendre une application existante sans interrompre le service', desc: 'Ce que l\'audit technique doit révéler avant toute intervention.', href: '/perspectives/reprendre-une-application-existante' },
    { badge: 'Ingénierie', title: 'Ce qui distingue une extension d\'équipe réussie d\'un simple renfort temporaire', desc: 'Pourquoi l\'intégration compte autant que la compétence technique.', href: '/perspectives/extension-equipe-reussie' },
    { badge: 'Produit', title: 'Concevoir un produit avant de le vendre', desc: 'Ce que nos propres plateformes nous apprennent sur le développement produit.', href: '/perspectives/concevoir-un-produit-avant-de-le-vendre' },
  ];
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
            Perspectives
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: '0 0 24px', maxWidth: '32ch' }}>
            Comprendre la technologie. Anticiper ses évolutions.
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted }}>
            Nos équipes partagent leurs réflexions sur l'ingénierie logicielle, les produits numériques et les transformations technologiques qui façonnent les entreprises.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(item => (
            <div key={item.title} className="flex h-full flex-col">
              <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted }}>
                {item.badge}
              </span>
              <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.125rem', fontWeight: 600, color: '#0B1D33', marginTop: '16px', lineHeight: 1.4 }}>{item.title}</h3>
              <p style={{ fontFamily: fonts.inter, fontSize: '1rem', lineHeight: '1.75', color: T.navyMuted, marginTop: '16px', flex: '1 1 auto' }}>{item.desc}</p>
              <div className="mt-6">
                <a
                  href={item.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: '#0B1D33', fontFamily: fonts.inter }}
                  onMouseEnter={e => (e.currentTarget.style.color = T.yellow)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#0B1D33')}
                >
                  <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px' }}>Lire</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PHASE CARD ─── */
function PhaseCard({ badge, badgeStyle, step, stepColor, title, desc, price, priceUnit, priceNote, priceNoteColor, deliverables, ctaLabel, ctaStyle, ctaHoverBg, featured }) {
  const [ctaHovered, setCtaHovered] = useState(false);
  return (
    <div
      className="relative rounded-2xl p-8 flex flex-col justify-between"
      style={{ background: '#ffffff', boxShadow: featured ? '0 12px 40px rgba(30,64,175,0.14)' : '0 2px 12px rgba(0,0,0,0.06)', transform: featured ? 'translateY(-8px)' : 'none' }}
    >
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${T.yellow}, ${T.yellowDeep}, ${T.yellow})` }} />
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full" style={{ ...badgeStyle, fontFamily: fonts.inter, fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {badge}
          </span>
          <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 500, color: stepColor }}>{step}</span>
        </div>
        <div>
          <h3 style={{ fontFamily: fonts.jakarta, fontSize: '22px', fontWeight: 700, color: T.onSurface, margin: '0 0 8px' }}>{title}</h3>
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', lineHeight: '20px', color: T.onSurfaceVariant, margin: 0 }}>{desc}</p>
        </div>
        <div className="py-3">
          <div className="flex items-baseline gap-1">
            <span style={{ fontFamily: fonts.jakarta, fontSize: '36px', fontWeight: 700, color: T.onSurface }}>{price}</span>
            {priceUnit && <span style={{ fontFamily: fonts.inter, fontSize: '13px', color: T.onSurfaceVariant }}>{priceUnit}</span>}
          </div>
          <p style={{ fontFamily: fonts.inter, fontSize: '12px', color: priceNoteColor, margin: '4px 0 0', fontWeight: 500 }}>{priceNote}</p>
        </div>
        <div className="space-y-2.5 pt-1">
          {deliverables.map(d => (
            <div key={d} className="flex items-start gap-2.5">
              <span className="material-symbols-outlined" style={{ fontSize: '18px', color: T.yellow, marginTop: '2px' }}>verified</span>
              <span style={{ fontFamily: fonts.inter, fontSize: '13px', color: T.onSurface }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8">
        <a
          href="#"
          className="w-full inline-flex items-center justify-center px-5 py-3 rounded-lg transition-all duration-200"
          style={{ ...ctaStyle, background: ctaHovered ? ctaHoverBg : ctaStyle.background, fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: featured ? '0 4px 14px rgba(242,183,5,0.2)' : 'none' }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );
}


/* ─── STATEMENT SECTION ─── */
function StatementSection() {
  return (
    <section className="w-full py-[110px] text-center" style={{ background: '#FFFFFF', borderBottom: `1px solid ${T.line}` }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div style={{ fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: T.yellowDeep, fontWeight: 600, marginBottom: '24px', fontFamily: fonts.inter }}>
          Notre principe
        </div>
        <h2 style={{ fontSize: 'clamp(1.55rem, 3vw, 2.1rem)', color: '#0B1D33', maxWidth: '26ch', margin: '0 auto', fontWeight: 500, lineHeight: 1.3, fontFamily: fonts.jakarta }}>
          Nous appliquons à nos propres produits la même exigence d'ingénierie que nous mettons au service de nos clients.
        </h2>
      </div>
    </section>
  );
}

/* ─── PRODUCT CARD ─── */
function ProductCard({ name, coverType, title, desc, links }) {
  const [hovered, setHovered] = useState(false);

  const coverStyles = {
    selvy: `linear-gradient(135deg, ${T.navy2}, #0B1D33 60%)`,
    bricona: `linear-gradient(135deg, #0B1D33, ${T.navy2} 60%)`,
  };

  const beforeStyles = {
    selvy: {
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 82% 20%, rgba(242,183,5,0.3), transparent 50%)',
    },
    bricona: {
      position: 'absolute', inset: 0,
      background: 'repeating-linear-gradient(45deg, rgba(242,183,5,0.08) 0 10px, transparent 10px 20px)',
    },
  };

  return (
    <div
      className="border overflow-hidden transition-all duration-300"
      style={{ borderColor: hovered ? T.yellow : T.navy3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: '220px',
          position: 'relative',
          overflow: 'hidden',
          background: coverStyles[coverType],
          transform: hovered ? 'scale(1.035)' : 'scale(1)',
          transition: 'transform .5s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        {beforeStyles[coverType] && <div style={beforeStyles[coverType]} />}
        <span style={{
          position: 'absolute',
          left: '24px',
          bottom: '-14px',
          fontFamily: fonts.jakarta,
          fontWeight: 700,
          fontSize: '4.4rem',
          color: 'rgba(255,255,255,0.09)',
          letterSpacing: '-0.02em',
        }}>{name}</span>
      </div>
      <div style={{ padding: '26px 26px 30px' }}>
        <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.18rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>{title}</h3>
        <p style={{ color: T.onNavySoft, fontSize: '0.96rem', lineHeight: '1.55', marginBottom: '18px', fontFamily: fonts.inter }}>{desc}</p>
        <div style={{ display: 'flex', gap: '22px' }}>
          {links.map(link => (link.to ? (
            <Link
              key={link.label}
              to={link.to}
              style={{
                fontSize: '0.86rem',
                fontWeight: 500,
                color: link.muted ? T.onNavySoft : T.yellow,
                borderBottom: `1px solid ${link.muted ? T.navy3 : T.yellow}`,
                paddingBottom: '2px',
                fontFamily: fonts.inter,
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                if (!link.muted) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderBottomColor = '#FFFFFF';
                }
              }}
              onMouseLeave={e => {
                if (!link.muted) {
                  e.currentTarget.style.color = T.yellow;
                  e.currentTarget.style.borderBottomColor = T.yellow;
                }
              }}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.86rem',
                fontWeight: 500,
                color: link.muted ? T.onNavySoft : T.yellow,
                borderBottom: `1px solid ${link.muted ? T.navy3 : T.yellow}`,
                paddingBottom: '2px',
                fontFamily: fonts.inter,
              }}
              onMouseEnter={e => {
                if (link.muted) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderBottomColor = '#FFFFFF';
                }
              }}
              onMouseLeave={e => {
                if (link.muted) {
                  e.currentTarget.style.color = T.onNavySoft;
                  e.currentTarget.style.borderBottomColor = T.navy3;
                }
              }}
            >
              {link.label}
            </a>
          )))}
        </div>
      </div>
    </div>
  );
}

/* ─── PRODUCTS SECTION ─── */
function ProductsSection() {
  const products = [
    {
      name: 'Selvy',
      coverType: 'selvy',
      title: 'Selvy',
      desc: "Plateforme de social commerce pensée pour les marchands d'Afrique de l'Ouest.",
      links: [
        { label: 'Découvrir', to: '/solutions/selvy', muted: false },
        { label: 'Documentation (PDF)', href: '#', muted: true },
      ],
    },
    {
      name: 'Bricona',
      coverType: 'bricona',
      title: 'Bricona',
      desc: 'Plateforme de mise en relation pour les métiers du BTP.',
      links: [
        { label: 'Découvrir', to: '/solutions/bricona', muted: false },
        { label: 'Documentation (PDF)', href: '#', muted: true },
      ],
    },
  ];

  return (
    <section id="produits" className="w-full py-[100px]" style={{ background: '#0B1D33', borderBottom: 'none' }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-end gap-[30px] mb-[46px] flex-wrap">
          <div>
            <div style={{ fontSize: '0.84rem', color: T.yellow, fontWeight: 500, marginBottom: '14px', fontFamily: fonts.inter }}>
              Ce que nous construisons
            </div>
            <h2 style={{ fontSize: '1.85rem', color: '#FFFFFF', maxWidth: '16ch', fontFamily: fonts.jakarta, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.14, margin: 0 }}>
              Nos produits numériques
            </h2>
          </div>
          <p style={{ color: T.onNavySoft, fontSize: '0.98rem', maxWidth: '36ch', fontFamily: fonts.inter, lineHeight: '1.55' }}>
            Nous concevons nos propres produits numériques — c'est notre manière de rester au contact des enjeux techniques réels avant de les recommander à nos clients.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
          {products.map(p => <ProductCard key={p.name} {...p} />)}
        </div>
        <p style={{ marginTop: '32px', color: T.onNavySoft, fontSize: '0.95rem', fontFamily: fonts.inter, lineHeight: '1.55' }}>
          D'autres produits rejoignent progressivement cet écosystème. <Link to="/solutions" style={{ color: T.yellow, borderBottom: `1px solid ${T.yellow}`, paddingBottom: '1px', fontFamily: fonts.inter, textDecoration: 'none' }}>Découvrir nos produits</Link>
        </p>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Home1Footer() {
  const cols = [
    { title: 'Solutions', links: ["IA & Automatisation", 'Digitalisation', 'SaaS & Plateformes', 'Automatisation des processus'] },
    { title: 'Offres', links: ['Phase 1 Diagnostic', 'Phase 2 Déploiement', 'Phase 3 Pilotage'] },
    { title: 'Entreprise', links: ['À propos', 'Équipe', 'Contact', 'Partenaires'] },
    { title: 'Légal', links: ['Mentions légales', 'Politique de confidentialité', "Conditions d'utilisation"] },
  ];
  return (
    <footer style={{ background: T.surfaceContainerLow }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-10">
          <div className="lg:col-span-2 space-y-4">
            <span style={{ fontFamily: fonts.jakarta, fontSize: '18px', fontWeight: 700, color: T.onSurface }}>
              Enésense<span style={{ color: '#0B1D33' }}>Digital</span>
            </span>
            <p style={{ fontFamily: fonts.inter, fontSize: '15px', lineHeight: '24px', color: T.onSurfaceVariant, maxWidth: '300px', margin: '8px 0 0' }}>
              Conseil, digitalisation de pointe et automatisation sur mesure pour propulser les entreprises dans l'ère numérique.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mt-4" style={{ background: T.amberSoft, color: T.amberContrast }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.amberContrast }} />
              <span style={{ fontFamily: fonts.inter, fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Excellence Opérationnelle</span>
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: fonts.jakarta, fontSize: '14px', fontWeight: 700, color: T.onSurface, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-3">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontFamily: fonts.inter, fontSize: '14px', color: T.onSurfaceVariant, textDecoration: 'none' }}
                      onMouseEnter={e => (e.currentTarget.style.color = T.onSurface)}
                      onMouseLeave={e => (e.currentTarget.style.color = T.onSurfaceVariant)}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', color: T.onSurfaceVariant, margin: 0 }}>© 2025 Enésense. Tous droits réservés. Basé à Colombnes, France.</p>
          <p style={{ fontFamily: fonts.inter, fontSize: '11px', color: T.outline, margin: 0 }}>Infrastructure Bricona RGPD</p>
        </div>
      </div>
    </footer>
  );
}


/* ─── TEAM / GOUVERNANCE SECTION ─── */
// function TeamSection() {
//   const team = [
//     {
//       group: 'Direction',
//       members: [
//         { role: 'Fondateur', name: 'Jean-Baptiste Segbe' },
//         { role: 'Co-fondateur — Responsable commercial', name: 'Roger D\'Almeida' },
//         { role: 'Co-fondateur — R Com', name: 'Jonathan Kevin Ayite' },
//       ],
//     },
//     {
//       group: 'Opérations',
//       members: [
//         { role: 'Responsable Projet', name: 'Apedo Yaovi' },
//         { role: 'DPO', name: 'Abdoul Sonhouin' },
//       ],
//     },
//   ];
//   return (
//     <section className="w-full py-24" style={{ background: T.surface, borderBottom: `1px solid ${T.line}` }}>
//       <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
//         <div style={{ fontSize: '0.84rem', color: T.yellowDeep, fontWeight: 500, marginBottom: '14px', fontFamily: fonts.inter }}>
//           Gouvernance
//         </div>
//         <h2 style={{ fontSize: '1.85rem', color: '#0B1D33', maxWidth: '16ch', fontFamily: fonts.jakarta, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.14, margin: 0 }}>
//           Notre organisation
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
//           {team.map((g) => (
//             <div key={g.group}>
//               <div style={{ fontSize: '0.82rem', color: T.yellowDeep, fontWeight: 500, marginBottom: '22px', fontFamily: fonts.inter, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
//                 {g.group}
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//                 {g.members.map((m) => (
//                   <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderBottom: `1px solid ${T.line}`, paddingBottom: '16px' }}>
//                     <span style={{ color: T.inkSoft, fontSize: '0.9rem', fontFamily: fonts.inter }}>{m.role}</span>
//                     <span style={{ fontWeight: 500, color: '#0B1D33', fontFamily: fonts.jakarta }}>{m.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//         <a href="#" style={{ fontSize: '0.92rem', fontWeight: 500, color: '#0B1D33', borderBottom: `1px solid ${T.yellow}`, paddingBottom: '2px', fontFamily: fonts.inter, marginTop: '38px', display: 'inline-block' }}>
//           Découvrir Le Groupe
//         </a>
//       </div>
//     </section>
//   );
// }


/* ─── FINAL CONTACT SECTION ─── */
function FinalContactSection() {
  return (
    <section id="contact" className="w-full py-[110px]" style={{ background: '#0B1D33', position: 'relative', overflow: 'hidden' }}>
      <div className="pointer-events-none absolute bottom-[-200px] left-[-140px] w-[560px] h-[560px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(242,183,5,0.22), transparent 68%)' }} />
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 relative">
        <div className="max-w-2xl text-center sm:text-left">
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#ffffff', margin: '0 0 16px' }}>
            Vous avez un projet de transformation digitale ?
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '17px', lineHeight: '28px', color: T.onNavySoft, margin: 0 }}>
            Parlons-en. Décrivez-nous votre contexte, nous revenons vers vous avec un interlocuteur adapté à votre besoin.
          </p>
        </div>
        <a href="#" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all duration-200 active:translate-y-0.5 mt-10"
          style={{ background: T.yellow, color: '#0B1D33', fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          onMouseEnter={e => (e.currentTarget.style.background = T.yellowDeep)}
          onMouseLeave={e => (e.currentTarget.style.background = T.yellow)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>mail</span>
          <span>Parlons-en</span>
        </a>
      </div>
    </section>
  );
}


/* ─── ROOT EXPORT ─── */
export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div style={{ fontFamily: fonts.inter, background: T.surface }}>
      <main>
        <HeroSection />
        <PartnersStrip />
        <ExpertiseSection />
        <SolutionsSection />
        <ModelSection />
        <ProductsSection />
        <ExigenceSection />
        <PerspectivesSection />
        <StatementSection />
        {/* <TeamSection /> */}
        <FinalContactSection />
      </main>
    </div>
  );
}
