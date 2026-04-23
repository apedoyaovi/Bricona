import { Link } from 'react-router-dom';
import heroProjetImg from '../assets/Bricona projet.webp';

const projets = [
  {
    id: 'mise-en-relation',
    title: 'Mise en Relation',
    category: 'Plateforme',
    desc: 'Un écosystème de confiance entre artisans et clients qualifiés.',
    icon: 'handshake',
    color: 'bg-primary-fixed',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeFXyiUNXIfCAOGsvaZkauUWuJ6-AoneiG8jEigwooNqcIBWdZ7DZaaKNfHD-ZkUDEivXw__Zpvaq9M3IeA0fkXfqn8hwYQy-QdTlEIJlwiREPQivBdN5zOu4vlIxAvZvQG4jPkzu_dDt724GQ6BwTVpxS3YY5e7I6JHaP7OG36TeoriXgqyZI8ERzSO-2Z3oof17gkvvcJaUaFOx7XfexFgefri6XpycQrQbMIDCi2DilfobZSSg-9784HdxOKETjbkzjzkH404KO',
  },
  {
    id: 'automatisation',
    title: 'Automatisation Intelligente',
    category: 'IA & Workflow',
    desc: 'Workflows intelligents libérant les artisans des tâches répétitives.',
    icon: 'precision_manufacturing',
    color: 'bg-primary-container',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbZzjsbZ6DU7Sd0y3J3BtDYFPk--Q5NSFjzscoBCZORdMrbzURpFVu5jDLmNb7sK4OiW58NyKf_PXeYWx7VStnjaXgX8XyBHbbQhEpIEy5MVSUhRgRm62PV4sybTC2A387geDFWAj2fVxtxbvU6Rf78k2ivqc3MVKJ3WXDbrMq7usqqZZ4dDCGgg6iedqLfrfoKhJ0RRHmvRs6UozKCm7rXcn0dtSPUhGBI3C-CIRrax8fcVivV6Nz6ZTZX-Eie85YgZ5mw0y5TkhR',
  },
  {
    id: 'digitalisation',
    title: 'Digital Atelier',
    category: 'Digitalisation',
    desc: 'Vitrine numérique complète pour un atelier de forge artisanale.',
    icon: 'devices',
    color: 'bg-secondary-container',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqAnve32NSfttzaX9SZa3UXURViqcO4sPrRcs32_-bqeipV4OSayB83oLxajsZV_GXixKSsZ1MAnlpS28Hul0DxOPFxqCpSQwce6qX9eVc3v9sBTpmm0I1hcAwQ-iZ4AI-bfco13Xb6ewS3XuznfNmJRWK400ied79s3QIDxCYOdQZbLoSaFSF8L4Xh8cjEwmeWSGoNsjl_wAjcPimOSaaCuJO6P5vJI_yRi9uie61ls85QGSba9QxgptSxAYEEM8l5f4Wcsmktz6',
  },
  {
    id: 'mentorat',
    title: 'Accompagnement Digital',
    category: 'Mentorat',
    desc: 'Stratégie et exécution pour transformer une activité artisanale en marque numérique.',
    icon: 'psychology',
    color: 'bg-tertiary-container',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG2FoXcxZnm0uA6pZdYgNoGtlwHAqncIXTaIgwMehZl7K50SovrR1Sbc3gttsNC3QZLAG4XYN5bbEOGmgkiKvV-5Dlv85YEs_JyqvMI71hmvVtKRsfokLbYpaIUZ1TWHBciOBHMtk7lfW99ejzz-wzKLjkJBAWsNMdMm_XgrU3mIG2rbh05WZoesTBwfey_3cDaaFAXA46g9mOn72-aE63AXgrB4TAHx2wfLcD7P0bjiiG0J6mORzCLddUtg2GcCccjY06ok-FGGv3',
  },
  {
    id: 'logiciel',
    title: 'Développement Sur-Mesure',
    category: 'Software',
    desc: 'Application métier complète pour la gestion et la planification artisanale.',
    icon: 'terminal',
    color: 'bg-primary-fixed',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATXL_bW4-fUV4h6xzf23iYWLRf_2rLtAApaqbVYD7hF3RDTGFH8xfFO9q-Fgb8Ng2r_EO8oNQPINHUfXocBXHbA53qm3cVn1Tl0k0vXQDwlY2UTd93QAvSeAzD_6WN6Y1kbf2B-38KEcEq_8GR_QGHnoYbaeSbQmHpOmOcpd8chm_x4X5a7xrZA_nc_4ODX3qIsxjj3abtQoGCUskqT31rR4QMfY8bTh1EwZ3VDpG89vJKqof93X7ThkB5XjwV_0wGzmnY80H_0evr',
  },
  {
    id: 'forge',
    title: 'La Forge Numérique',
    category: 'Vitrine',
    desc: 'Site vitrine premium pour un maître forgeron alliant tradition et modernité.',
    icon: 'auto_fix_high',
    color: 'bg-surface-container-high',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbn9ylsv65eEFC1SY4oWrZTvuF6xRO76Ej09AaQfhczMZ35MA7_tiSn2m3fJLNFMJTL2cFB1BaQew5-za0IQD16OAIa_ktr8Kxwjn5o-zL2hTO2Yy8qfdrzyKVQvtRrpTGYqUz5jpkNqsv26g1pgBFhV-4kvwN1uQ9jImeldaK7EkrjQcpohmQy79Hq8hiZWoRjb21nK4AcYVsvUu72aE4i0lSiKbCwGmbLEMdw0HDGLStGv4ZrIlSjgTAtqCpackwn0xbgbUojY-9',
  },
];

const Projets = () => {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[480px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Atelier digital"
            className="w-full h-full object-cover"
            src={heroProjetImg}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/50"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-secondary-fixed font-bold tracking-[0.1em] mb-4 text-xs">NOS RÉALISATIONS</span>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              L'Excellence en Action avec<br /><span className="text-secondary-container">Bricona digital</span>.
            </h1>
            <p className="text-sm text-primary-fixed max-w-lg mb-8 leading-relaxed">
              Découvrez comment Bricona a transformé des visions des entreprises en réalités numériques d'exception.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-5">
          <p className="font-label editorial-caps text-primary font-bold text-[11px] mb-4">Portfolio</p>
          <h2 className="font-headline text-xl lg:text-2xl font-bold text-on-surface">150+ projets livrés avec passion</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projets.map((projet) => (
            <Link
              key={projet.id}
              to={`/projets/${projet.id}`}
              className="group bg-surface-container-lowest rounded-xxl overflow-hidden ghost-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  alt={projet.title}
                  src={projet.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
                <span className={`absolute top-4 right-4 ${projet.color} text-xs font-bold px-3 py-1 rounded-full text-on-surface`}>
                  {projet.category}
                </span>
              </div>
              <div className="p-5">
                <div className={`w-8 h-8 ${projet.color} rounded-xl flex items-center justify-center mb-4`}>
                  <span className="material-symbols-outlined text-primary text-base">{projet.icon}</span>
                </div>
                <h3 className="font-headline text-base font-bold text-on-surface mb-4">{projet.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{projet.desc}</p>
                <span className="text-primary font-bold text-[11px] flex items-center gap-1 group-hover:gap-3 transition-all">
                  Voir le projet <span className="material-symbols-outlined text-[11px]">arrow_forward</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] hero-gradient p-6 lg:p-10 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <h2 className="font-headline text-xl lg:text-2xl font-extrabold text-white mb-4">
            Votre projet sera le prochain.
          </h2>
          <p className="text-primary-fixed text-xs max-w-2xl mx-auto mb-5 opacity-90">
            Rejoignez les entreprises qui façonnent le futur de leur métier avec Bricona.
          </p>
          <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-7 py-3 rounded-xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl inline-block">
            Démarrer un projet
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Projets;


