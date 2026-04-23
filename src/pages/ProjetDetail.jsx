import { useParams, Link } from 'react-router-dom';

const projetsData = {
  'mise-en-relation': {
    title: 'Mise en Relation',
    category: 'Plateforme',
    client: 'Bricona Network',
    annee: '2023',
    desc: "Un écosystème de confiance entre artisans et clients qualifiés, propulsé par un algorithme de matching intelligent. Ce projet a permis à 2500+ artisans de trouver des missions qualifiées en moins de 48h.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeFXyiUNXIfCAOGsvaZkauUWuJ6-AoneiG8jEigwooNqcIBWdZ7DZaaKNfHD-ZkUDEivXw__Zpvaq9M3IeA0fkXfqn8hwYQy-QdTlEIJlwiREPQivBdN5zOu4vlIxAvZvQG4jPkzu_dDt724GQ6BwTVpxS3YY5e7I6JHaP7OG36TeoriXgqyZI8ERzSO-2Z3oof17gkvvcJaUaFOx7XfexFgefri6XpycQrQbMIDCi2DilfobZSSg-9784HdxOKETjbkzjzkH404KO',
    tags: ['React', 'Node.js', 'IA Matching', 'PostgreSQL'],
    stats: [{ label: 'Artisans connectés', value: '2500+' }, { label: 'Taux de satisfaction', value: '98%' }, { label: 'Délai moyen', value: '48h' }],
  },
};

const defaultProjet = {
  title: 'Réalisation Bricona',
  category: 'Digital',
  client: 'Client Bricona',
  annee: '2024',
  desc: "Un projet d'excellence alliant savoir-faire artisanal et innovation digitale. Bricona a accompagné ce client de la conception à la livraison, en garantissant une qualité premium à chaque étape.",
  img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqAnve32NSfttzaX9SZa3UXURViqcO4sPrRcs32_-bqeipV4OSayB83oLxajsZV_GXixKSsZ1MAnlpS28Hul0DxOPFxqCpSQwce6qX9eVc3v9sBTpmm0I1hcAwQ-iZ4AI-bfco13Xb6ewS3XuznfNmJRWK400ied79s3QIDxCYOdQZbLoSaFSF8L4Xh8cjEwmeWSGoNsjl_wAjcPimOSaaCuJO6P5vJI_yRi9uie61ls85QGSba9QxgptSxAYEEM8l5f4Wcsmktz6',
  tags: ['Design', 'Développement', 'Stratégie', 'Livraison'],
  stats: [{ label: 'Délai de livraison', value: '4 sem.' }, { label: 'Satisfaction client', value: '100%' }, { label: 'ROI estimé', value: '+150%' }],
};

const ProjetDetail = () => {
  const { id } = useParams();
  const projet = projetsData[id] || { ...defaultProjet, title: id?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Projet' };

  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt={projet.title} className="w-full h-full object-cover" src={projet.img} />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-on-surface/30 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16">
          <Link to="/projets" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Retour aux réalisations
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1 rounded-full">{projet.category}</span>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{projet.annee}</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">{projet.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <p className="font-label editorial-caps text-primary font-bold text-xs mb-4">Aperçu du projet</p>
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-8">Description</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed mb-12">{projet.desc}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-16">
              {projet.stats.map((stat) => (
                <div key={stat.label} className="bg-surface-container-lowest rounded-xxl p-8 ghost-border text-center hover:shadow-lg transition-all">
                  <div className="text-3xl font-black font-headline text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-on-surface-variant">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <h3 className="font-headline text-xl font-bold text-on-surface mb-6">Technologies utilisées</h3>
            <div className="flex flex-wrap gap-3">
              {projet.tags.map((tag) => (
                <span key={tag} className="bg-primary-fixed text-primary text-sm font-medium px-4 py-2 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Project Info */}
            <div className="bg-surface-container-lowest rounded-xxl p-8 ghost-border">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-6">Informations Projet</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-sm text-on-surface-variant">Client</span>
                  <span className="text-sm font-bold text-on-surface">{projet.client}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-outline-variant/20">
                  <span className="text-sm text-on-surface-variant">Année</span>
                  <span className="text-sm font-bold text-on-surface">{projet.annee}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-on-surface-variant">Catégorie</span>
                  <span className="text-sm font-bold text-on-surface">{projet.category}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-xxl p-8 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <h3 className="font-headline text-xl font-bold text-white mb-4">Un projet similaire ?</h3>
              <p className="text-on-primary/70 text-sm mb-6 leading-relaxed">Discutons de votre vision et transformons-la en réalité.</p>
              <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold text-sm hover:brightness-105 transition-all inline-block w-full text-center">
                Démarrer un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-16 px-8 max-w-7xl mx-auto border-t border-outline-variant/20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Autres réalisations</h2>
          <Link to="/projets" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Voir tout <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Automatisation IA', 'Digital Atelier', 'Développement Sur-Mesure'].map((title) => (
            <Link key={title} to="/projets" className="group block bg-surface-container-lowest rounded-xxl p-6 ghost-border hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-primary-fixed rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-2">{title}</h3>
              <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-3 transition-all">
                Découvrir <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProjetDetail;
