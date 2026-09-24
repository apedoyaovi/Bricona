import { useState, useEffect, useRef } from 'react';
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
function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState('entry');
  const [pulsingCard, setPulsingCard] = useState(-1);
  const [hoveredCard, setHoveredCard] = useState(-1);
  const activeRef = useRef(true);
  const timersRef = useRef([]);

  useEffect(() => {
    const node = document.getElementById('hero-section-anchor');
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeRef.current = true;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!visible) {
      setPhase('entry');
      setPulsingCard(-1);
      return;
    }

    setPhase('entry');
    setPulsingCard(-1);

    const startBellTimer = setTimeout(() => {
      if (!activeRef.current) return;
      setPhase('bell');

      let current = 0;
      const pulse = () => {
        if (!activeRef.current) return;
        setPulsingCard(current);
        const resetTimer = setTimeout(() => {
          if (activeRef.current) setPulsingCard(-1);
        }, 300);
        timersRef.current.push(resetTimer);
        current = (current + 1) % 4;
        const nextTimer = setTimeout(pulse, 1000);
        timersRef.current.push(nextTimer);
      };

      pulse();
    }, 4000);

    timersRef.current.push(startBellTimer);

    return () => {
      activeRef.current = false;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [visible]);

  return (
    <section id="hero-section-anchor" className="relative w-full flex items-start lg:items-center min-h-screen mt-[72px] py-12 lg:py-24 group" style={{ background: T.navyDeep }}>
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
           <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6" style={{ overflow: 'visible' }}>

            {/* Eyebrow */}
            <p style={{ fontFamily: fonts.inter, fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: T.yellow }}>
              Enésense
            </p>

            {/* Heading */}
            <h1 className="text-center lg:text-left whitespace-normal lg:whitespace-nowrap" style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(32px, 6vw, 82px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', color: T.navyText, margin: 0, overflow: 'visible' }}>
              Build. Scale. Evolve.<br />Automate.
            </h1>

            {/* Subtitle */}
            <h2 style={{ fontFamily: fonts.inter, fontSize: '24px', fontWeight: 500, lineHeight: '34px', letterSpacing: '-0.005em', color: '#f7f8fa', maxWidth: '640px', textAlign: 'left' }}>
              Votre projet numérique commence ici.
            </h2>
            {/* <p style={{ fontFamily: fonts.inter, fontSize: '17px', fontWeight: 400, lineHeight: '27px', letterSpacing: '-0.005em', color: T.navyMuted, maxWidth: '540px', textAlign: 'left' }}>
              Site web, application, plateforme métier, automatisation ou projet d'entreprise : nous concevons et développons les technologies dont vous avez besoin.
            </p> */}

            {/* Hero Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Site web', 'Application', 'Plateforme métier', 'Automatisation', 'Projet d\'entreprise'].map(tag => (
                <span key={tag} style={{ fontFamily: fonts.inter, fontSize: '12px', fontWeight: 500, color: T.navyText, border: `1px solid ${T.navyMuted}`, padding: '6px 12px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                  {tag}
                </span>
              ))}
            </div>

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
          <div className="lg:col-span-5 flex items-center justify-end">
            <div className="w-full max-w-md ml-auto space-y-4">
              {[
                { title: 'Création de site web', desc: 'Site vitrine, contenu ou e-commerce sur mesure.' },
                { title: "Création d'application", desc: 'Mobile ou web, pensée autour de vos utilisateurs.' },
                { title: 'Automatisation', desc: 'Processus qui se déclenchent tout seuls.' },
                { title: 'Environnement numérique', desc: 'Votre stack complète, maîtrisée et évolutive.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border backdrop-blur-sm p-5 flex items-start gap-4"
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(-1)}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: !visible
                      ? 'translateX(40px) scale(0.92)'
                      : pulsingCard === idx
                        ? 'scale(1.04)'
                        : hoveredCard === idx
                          ? 'translateY(-2px) scale(1.01)'
                          : 'translateX(0) scale(1)',
                    borderColor: pulsingCard === idx ? T.yellow : (hoveredCard === idx ? T.yellow : 'rgba(255,255,255,0.1)'),
                    background: hoveredCard === idx ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                    transition: !visible
                      ? 'none'
                      : phase === 'entry'
                        ? `opacity 500ms ease ${idx * 1000}ms, transform 500ms ease ${idx * 1000}ms, border-color 500ms ease ${idx * 1000}ms, background 500ms ease ${idx * 1000}ms`
                        : `transform 300ms ease, border-color 300ms ease, background 300ms ease`,
                  }}
                >
                  <span className="material-symbols-outlined mt-0.5" style={{ color: T.yellow, fontSize: '22px' }}>check_circle</span>
                  <div>
                    <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1rem', fontWeight: 700, color: T.navyText, margin: '0 0 4px' }}>{item.title}</h3>
                    <p style={{ fontFamily: fonts.inter, fontSize: '0.88rem', lineHeight: '1.5', color: T.navyMuted, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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

/* ─── PROJECTS SECTION ─── */
function ProjectsSection() {
  const projects = [
    { number: '01', title: 'Site web', desc: 'Site vitrine, site de contenu ou site e-commerce, conçu sur mesure et facile à faire vivre.' },
    { number: '02', title: 'Application', desc: 'Une application mobile ou web pensée autour de vos utilisateurs et de leurs usages réels.' },
    { number: '03', title: 'Plateforme métier', desc: 'Un outil interne qui remplace les fichiers, les ressaisies et les tableurs partagés.' },
    { number: '04', title: 'Automatisation', desc: 'Vos tâches répétitives transformées en processus qui se déclenchent tout seuls.' },
    { number: '05', title: 'Intelligence artificielle', desc: 'Poser une question, obtenir une réponse fiable à partir de vos propres documents et données.' },
  ];
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <p style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.navyMuted, marginBottom: '24px' }}>
            Vos projets
          </p>
          <h2 style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.3, color: '#0B1D33', margin: '0 0 24px', maxWidth: '32ch' }}>
            Vous voulez construire quelque chose ?
          </h2>
          <p style={{ fontFamily: fonts.inter, fontSize: '1.125rem', lineHeight: '1.75', color: T.navyMuted, margin: 0 }}>
            Nous pouvons partir d'une idée, d'un besoin métier ou d'un produit qui existe déjà.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {projects.map(p => (
            <div key={p.number} className="h-full border border-slate-200 bg-white flex flex-col transition-all duration-300 hover:border-yellow hover:shadow-xl hover:-translate-y-1">
              <div className="p-8 flex flex-col h-full">
                <span style={{ fontFamily: fonts.inter, fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: T.yellowDeep, display: 'inline-block', marginBottom: '8px' }}>{p.number}</span>
                <div style={{ width: '24px', height: '2px', background: T.yellow, marginBottom: '16px' }} />
                <h3 style={{ fontFamily: fonts.jakarta, fontSize: '1.15rem', fontWeight: 700, color: '#0B1D33', margin: '0 0 12px' }}>{p.title}</h3>
                <p style={{ fontFamily: fonts.inter, fontSize: '0.95rem', lineHeight: '1.65', color: T.navyMuted, margin: 0, flex: '1 1 auto' }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p style={{ fontFamily: fonts.inter, fontSize: '1.0625rem', lineHeight: 1.7, color: T.navyMuted, maxWidth: '28rem' }}>
            Vous ne savez pas encore de quoi vous avez besoin ?
          </p>
          <Link to="/contact" className="group inline-flex items-center gap-2 text-sm font-medium transition-colors" style={{ fontFamily: fonts.inter, color: '#0B1D33' }}>
            <span style={{ borderBottom: `2px solid ${T.yellow}`, paddingBottom: '2px' }}>Expliquez-nous votre projet</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERTISE CARD ─── */
function ExpertiseCard({ badge, badgeLabel, title, desc, image, images, href }) {
  const slides = images || (image ? [image] : []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-white overflow-hidden border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={href} className="group flex h-full flex-col">
        <div className="aspect-video w-full overflow-hidden relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {slides.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`${title} - vue ${idx + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-opacity duration-700"
              style={{
                position: slides.length > 1 ? (idx === currentSlide ? 'relative' : 'absolute') : 'relative',
                inset: 0,
                opacity: idx === currentSlide ? 1 : 0,
                transform: isHovered && slides.length === 1 ? 'scale(1.03)' : 'scale(1)',
                transition: slides.length === 1 ? 'transform 700ms ease' : 'opacity 700ms ease',
              }}
            />
          ))}
          {slides.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentSlide ? '18px' : '7px',
                    background: idx === currentSlide ? '#F2B705' : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          )}
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
    { badge: 'SCALE', title: "Extension d'équipes techniques", desc: "Renforcer vos équipes avec des ingénieurs spécialisés, intégrés à vos méthodes et à votre environnement technique.", image: '/equipe.png', href: '/expertises/extension-equipes' },
    { badge: 'BUILD', title: "Studio Produit", desc: "Concevoir et développer des produits numériques adaptés à vos usages réels.", images: ['/studio 1.jpg', '/studio 2.jfif'], href: '/expertises/studio-produit' },
    { badge: 'EVOLVE', title: "Modernisation applicative", desc: "Reprendre en main, sécuriser et faire évoluer vos applications existantes.", image: '/modernisation.jpg', href: '/expertises/modernisation-applicative' },
    { badge: 'AUTOMATE', badgeLabel: 'Nouvelle expertise', title: "IA & Automatisation", desc: "Automatiser les processus et créer de nouveaux usages grâce à l'intelligence artificielle.", image: '/automate.png', href: '/expertises/ia-automatisation' },
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: '/bricona.jfif', alt: 'BRICONA - vue 1' },
    { src: '/bricona 1.png', alt: 'BRICONA - vue 2' },
    { src: '/bricona 2.png', alt: 'BRICONA - vue 3' },
    { src: '/bricona 3.png', alt: 'BRICONA - vue 4' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
function ProductCard({ name, coverType, title, desc, links, images }) {
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = images || [];
  const isBricona = coverType === 'bricona';

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
        {slides.length > 0 ? (
        <div className="relative w-full overflow-hidden" style={{ height: '220px', background: '#0A0D14' }}>
          {slides.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`${name} - vue ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-contain transition-opacity duration-700"
              style={{
                position: idx === currentSlide ? 'relative' : 'absolute',
                inset: 0,
                opacity: idx === currentSlide ? 1 : 0,
              }}
            />
          ))}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: idx === currentSlide ? '20px' : '8px',
                  background: idx === currentSlide ? T.yellow : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      ) : (
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
      )}
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
      images: ['/selvy.jfif', '/selvy 1-1.png', '/selvy 1-2.png', '/selvy 2-1.png', '/selvy 2-2.png', '/selvy 3-1.png', '/selvy 3-2.png'],
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
      images: ['/bricona.jfif', '/bricona 1.png', '/bricona 2.png', '/bricona 3.png'],
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
        <ProjectsSection />
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
