import { Link } from 'react-router-dom';
import aboutHeroImg from '../assets/Bricona about.webp';
import jeanBaptisteImg from '../assets/Jean Baptiste.jpeg';
import jonathanAyiteImg from '../assets/Jonathan Ayite.jpg';

const About = () => {
  return (
    <main className="pt-20">
      {/* Hero / Our Mission Section */}
      <section className="relative px-6 md:px-8 py-16 lg:py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="z-10 text-center lg:text-left">
            <span className="inline-block text-[10px] tracking-[0.2em] font-bold text-primary mb-3 font-label">NOTRE MISSION</span>
            <h1 className="text-3xl lg:text-5xl font-extrabold font-headline text-on-surface leading-[1.1] mb-4 tracking-tight">
              L'Alliance de la <span className="text-primary-container">technologie</span> et du <span className="text-secondary">Digital Automatiser</span>.
            </h1>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              Enesence digitale est née d'une conviction simple : le talent humain et entreprenarial ne doit pas être freiné par la complexité technologique. Nous créons le pont entre le savoir-faire numérique et les outils du futur.
            </p>
            {/* <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full text-xs font-medium text-primary">
                <span className="material-symbols-outlined text-xs">verified</span>
                Authenticité Garantie
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full text-xs font-medium text-primary">
                <span className="material-symbols-outlined text-xs">bolt</span>
                Vitesse Digitale AUtomatiser
              </div>
            </div> */}
          </div>
          <div className="relative flex justify-center">
            <div className="w-[22rem] md:w-[24rem] lg:w-[26rem] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-on-surface/5">
              <img
                className="w-full h-full object-cover"
                alt="Artisan mains précision"
                src={aboutHeroImg}
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-panel p-8 rounded-xl max-w-xs shadow-xl">
              <p className="text-xs italic font-medium text-primary mb-4">"Nous ne remplaçons pas l'humain, nous décuplons ses capacités."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">auto_fix_high</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">Fondation Enesence</p>
                  <p className="text-[10px] text-on-surface-variant">Est. 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Bento Grid */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold font-headline mb-4">Nos Valeurs Fondatrices</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Chaque projet que nous entreprenons est guidé par quatre piliers immuables qui définissent l'excellence Enesence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Value 1 */}
            {/* <div className="md:col-span-2 bg-surface-container-lowest p-7 rounded-[2rem] flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">diversity_3</span>
                <h3 className="text-xl font-bold font-headline mb-3">Human-centric</h3>
                <p className="text-on-surface-variant leading-relaxed">Nous plaçons l'artisan au cœur de l'innovation. La technologie doit servir l'homme, jamais l'inverse.</p>
              </div>
            </div> */}
            {/* Value 2 */}
            <div className="bg-primary text-on-primary p-7 rounded-[2rem] hover:scale-[1.02] transition-transform duration-300">
              <span className="material-symbols-outlined text-primary-fixed text-3xl mb-4 block">lightbulb</span>
              <h3 className="text-xl font-bold font-headline mb-3">Innovation</h3>
              <p className="text-on-primary/80 text-sm leading-relaxed">Anticiper les besoins de demain pour offrir les solutions d'aujourd'hui.</p>
            </div>
            {/* Value 3 */}
            <div className="bg-secondary-container p-7 rounded-[2rem] hover:scale-[1.02] transition-transform duration-300">
              <span className="material-symbols-outlined text-on-secondary-container text-3xl mb-4 block">workspace_premium</span>
              <h3 className="text-xl font-bold font-headline mb-3">Excellence</h3>
              <p className="text-on-secondary-container/80 text-sm leading-relaxed">Le souci du détail, de la première ligne de code au dernier coup de pinceau.</p>
            </div>
            {/* Value 4 */}
            <div className="md:col-span-4 bg-surface-container-highest p-7 rounded-[2rem] flex items-center gap-8">
              <div className="hidden md:flex w-24 h-24 bg-surface-container-lowest rounded-full items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-3xl">shield</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2">Intégrité</h3>
                <p className="text-on-surface-variant leading-relaxed">La transparence totale avec nos partenaires et nos clients est le socle de notre relation de confiance.</p>
              </div>
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
              <h2 className="text-2xl lg:text-3xl font-extrabold font-headline text-on-primary mt-6 mb-4 leading-tight">Enesence digitale, un Nouveau Standard Mondial.</h2>
              <p className="text-on-primary/70 text-sm leading-relaxed mb-8">
                Dans 10 ans, chaque entreprise disposera d'un écosystème digital intelligent qui n'effacera pas son travail, mais le libérera des contraintes administratives et logistiques. Enesence construit ce socle.
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

      {/* Leadership Team */}
      <section className="py-12 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl lg:text-3xl font-extrabold font-headline mb-4">L'Équipe Dirigeante</h2>
            <p className="text-on-surface-variant text-sm">Une synergie d'experts passionnés par la digitalisation, l'automatisation, la technologie et l'excellence opérationnelle.</p>
          </div>
          <Link to="/contact" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
            Rejoindre l'équipe <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              name: 'Jean Baptiste', role: 'Fondateur', quote: '"L\'innovation n\'a de sens que si elle préserve l\'essence du travail bien fait."',
              img: jeanBaptisteImg
            },
            {
              name: 'Jonathan Ayite', role: 'Co-fondateur', quote: '"Concevoir des interfaces qui s\'effacent pour laisser place à la créativité."',
              img: jonathanAyiteImg
            },
            // {
            //   name: 'Thomas Legrand', role: 'CTO', quote: '"Le code est notre outil de sculpture pour le monde moderne."',
            //   img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSZAABrDMYrYrLmtu9CvdyqTE_IyzRLG5SACsWojDhfed9S5GIQwbnfIyRGGZ98vohjioRd8Nh2glFHf01wsa8PEovOv26UfoJAN62_Cxhg2srsisWBtRXOY02VyDCbBdQ7Ix1TXYqr3I0ZVdPvDRZMqb8TK6VlV5i794pxqfTxWBX4D3WWr4gSRhWZjQkAjnm_VjIGhslw4wJGhWVAzXeMmK5OJdxelSEiJASUikkBYZNdekBVjio4CRDJVcqIxFNx4rJvFcgfpaN'
            // },
          ].map((member) => (
            <div key={member.name} className="group">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-4 relative">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={member.name} src={member.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary cursor-pointer hover:bg-white transition-colors">
                    <span className="material-symbols-outlined text-xs">link</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold font-headline">{member.name}</h3>
              <p className="text-primary font-medium text-xs mb-2">{member.role}</p>
              <p className="text-xs text-on-surface-variant line-clamp-2 italic">{member.quote}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnerships / Trust Badges */}
      {/* <section className="py-12 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="text-[10px] tracking-[0.3em] font-bold text-outline uppercase mb-6">ILS NOUS FONT CONFIANCE</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {['ARTISAN.CO', 'TECH_STUDIO', 'FRANCE_BUILD', 'LUMINA', 'CRAFT_NEXT'].map((brand) => (
              <div key={brand} className="h-8 md:h-10 flex items-center font-black text-lg text-on-surface-variant select-none">{brand}</div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default About;
