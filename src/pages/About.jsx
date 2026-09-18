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

const About = () => {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center min-h-[60vh] py-20 lg:py-24" style={{ background: T.navyDeep }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(to right, #040f23, rgba(4,15,35,0.95), rgba(4,15,35,0.85))' }} />
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-6">
              <span className="font-label text-xs font-bold tracking-widest uppercase mb-4 block" style={{ fontFamily: fonts.jakarta, color: T.yellow }}>
                Le Groupe
              </span>
              <h1 className="text-center lg:text-left" style={{ fontFamily: fonts.jakarta, fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', color: T.navyText, margin: 0, maxWidth: '100%' }}>
                Un groupe technologique construit autour de l'ingénierie numérique.
              </h1>
              <h2 style={{ fontFamily: fonts.inter, fontSize: '18px', fontWeight: 400, lineHeight: '28px', letterSpacing: '-0.005em', color: T.navyMuted, maxWidth: '560px', margin: '0 auto', textAlign: 'left' }}>
                Enésense réunit des expertises techniques, des équipes d'ingénierie et des produits numériques pour accompagner les entreprises dans leurs transformations technologiques.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-12 overflow-hidden bg-primary">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative flex justify-center">
              <div className="w-72 md:w-80 lg:w-[22rem] aspect-square rounded-full border border-primary-container/30 flex items-center justify-center p-8">
                <div className="w-full h-full rounded-full border border-primary-container/60 flex items-center justify-center p-8">
                  <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(252,212,0,0.2)]">
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                      alt="Globe digital"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbn9ylsv65eEFC1SY4oWrZTvuF6xRO76Ej09AaQfhczMZ35MA7_tiSn2m3fJLNFMJTL2cFB1BaQew5-za0IQD16OAIa_ktr8Kxwjn5o-zL2hTO2Yy8qfdrzyKVQvtRrpTGYqUz5jpkNqsv26g1pgBFhV-4kvwN1uQ9jImeldaK7EkrjQcpohmQy79Hq8hiZWoRjb21nK4AcYVsvUu72aE4i0lSiKbCwGmbLEMdw0HDGLStGv4ZrIlSjgTAtqCpackwn0xbgbUojY-9"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="text-secondary-fixed font-bold tracking-[0.3em] text-xs font-label">HORIZON 2030</span>
              <h2 className="text-2xl lg:text-3xl font-extrabold font-headline text-on-primary mt-6 mb-4 leading-tight">Enésense digitale, un Nouveau Standard Mondial.</h2>
              <p className="text-on-primary/70 text-sm leading-relaxed mb-8">
                Dans 10 ans, chaque entreprise disposera d'un écosystème digital intelligent qui n'effacera pas son travail, mais le libérera des contraintes administratives et logistiques. Enésense construit ce socle.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary shrink-0 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-[14px] text-on-secondary">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-primary">Digitalisation et Automatisation Intuitive</h4>
                    <p className="text-xs text-on-primary/60">Gestion intelligente des flux de travail par IA.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary shrink-0 flex items-center justify-center mt-1">
                    <span className="material-symbols-outlined text-[14px] text-on-secondary">check</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-primary">Réseaux de Talent Décentralisés</h4>
                    <p className="text-xs text-on-primary/60">Collaboration globale sans frontières physiques.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
