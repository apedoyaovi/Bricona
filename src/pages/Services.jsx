import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import heroServicesImg from '../assets/Bricona services.webp';

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    // Gérer le scroll vers les sections quand on arrive avec un hash
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Attendre que le contenu soit rendu
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="pt-[72px]">
      {/* Hero Section */}
      <section className="relative h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Atelier moderne"
            className="w-full h-full object-cover"
            src={heroServicesImg}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-secondary-fixed font-bold tracking-[0.1em] mb-4 text-xs">NOS SERVICES</span>
            <h1 className="font-headline text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
              Les entreprises à l'heure du <br /><span className="text-secondary-container">Digital</span>.
            </h1>
            <div className="text-sm text-primary-fixed max-w-lg mb-8 leading-relaxed">
              <p className="mb-4">
                Bricona fusionne le savoir-faire actuel des entreprises et l'innovation technologique pour propulser votre activité vers de nouveaux horizons de performance.
                En offrant une gamme complète de services numériques, nous sommes votre partenaire de confiance pour naviguer dans la transformation digitale avec succès:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Digitalisation (Accompagnement Digital et Développement Logiciel)</strong></li>
                <li><strong>Automatisation</strong></li>
                <li><strong>Mise en Relation des artisans et clients</strong></li>
              </ul>
            </div>
            <div className="flex gap-4n">
              <Link to="/projets" className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg active:scale-95 cursor-pointer inline-block">Explorer nos réalisations</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <section id="digitalisation" className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-[0.1em] text-xs">DIGITALISATION</span>
          <h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-on-surface mt-2">Accompagnement Digital & Développement Logiciel</h2>
          <p className="text-on-surface-variant mt-4 max-w-2xl mx-auto">Transformez votre vision en réalité digitale. De l'accompagnement stratégique au développement sur-mesure, nous vous guidons vers l'excellence numérique.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Accompagnement Digital */}
          <div className="bg-secondary-container/10 rounded-xxl p-8 ghost-border border-secondary-container/20">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-on-secondary-container text-2xl">psychology</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Accompagnement Digital</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Le mentorat stratégique pour faire évoluer votre identité numérique. De la vision à l'exécution, nous sommes votre partenaire de croissance.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Audit et stratégie digitale personnalisée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Formation et montée en compétences</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Accompagnement dans la transformation digitale</span>
              </li>
            </ul>
            <Link className="inline-flex items-center text-primary font-bold text-sm hover:gap-4 gap-2 transition-all" to="/contact">
              Démarrer le mentorat <span className="material-symbols-outlined ml-2">school</span>
            </Link>
          </div>

          {/* Développement Logiciel */}
          <div className="bg-surface-container-lowest rounded-xxl p-8 ghost-border group relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">Développement Logiciel</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
              Solutions sur-mesure : sites web vitrines, applications complexes et outils métiers dédiés. Votre vision codée avec précision.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Sites web responsives et performants</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Applications web et mobiles sur-mesure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                <span className="text-sm text-on-surface-variant">Outils métier et intégrations système</span>
              </li>
            </ul>
            <Link className="inline-flex items-center text-primary font-bold text-sm hover:gap-4 gap-2 transition-all" to="/projets">
              Voir nos réalisations <span className="material-symbols-outlined ml-2">web_asset</span>
            </Link>
            <div className="absolute top-4 right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all"></div>
          </div>
        </div>
      </section>

      <section id="automatisation" className="py-16 bg-surface-container-low px-6 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-bold tracking-[0.1em] text-xs">AUTOMATISATION</span>
            <h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-on-surface mt-2 mb-6">Libérez votre potentiel créatif</h2>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Automatisez les tâches répétitives et concentrez-vous sur ce qui compte vraiment : votre savoir-faire artisanal.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-on-primary-container text-sm">settings</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Workflows intelligents</h4>
                  <p className="text-sm text-on-surface-variant">Automatisation des processus métier pour gagner en efficacité.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-on-primary-container text-sm">sync</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Intégrations système</h4>
                  <p className="text-sm text-on-surface-variant">Connexion transparente entre vos outils existants.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shrink-0 mt-1">
                  <span className="material-symbols-outlined text-on-primary-container text-sm">analytics</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Suivi et optimisation</h4>
                  <p className="text-sm text-on-surface-variant">Tableaux de bord pour monitorer vos automatisations.</p>
                </div>
              </li>
            </ul>
            <Link className="inline-flex items-center bg-primary-container text-on-primary-container px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all" to="/contact">
              Optimiser mes processus <span className="material-symbols-outlined ml-2">settings_suggest</span>
            </Link>
          </div>
          <div className="bg-primary-container rounded-xxl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary-container text-3xl">precision_manufacturing</span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">Automatisation sur-mesure</h3>
              <p className="text-primary-fixed/80 text-base mb-6 leading-relaxed">
                Chaque entreprise est unique. Nos solutions d'automatisation sont conçues spécifiquement pour s'adapter à vos besoins et à votre secteur d'activité.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <span className="material-symbols-outlined text-secondary-container mb-2 block">schedule</span>
                  <p className="text-sm font-bold">Temps gagné</p>
                  <p className="text-xs text-primary-fixed/70">Jusqu'à 70%</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <span className="material-symbols-outlined text-secondary-container mb-2 block">error</span>
                  <p className="text-sm font-bold">Erreurs réduites</p>
                  <p className="text-xs text-primary-fixed/70">Près de 0%</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <span className="text-primary font-bold tracking-[0.1em] text-xs">NOTRE MÉTHODE</span>
            <h2 className="font-headline text-2xl lg:text-3xl font-extrabold text-on-surface mt-2">Un parcours maîtrisé de A à Z</h2>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {[
                { icon: 'chat_bubble', title: 'Consultation', desc: 'Analyse approfondie de vos besoins et de votre contexte artisan.' },
                { icon: 'architecture', title: 'Planification', desc: "Conception d'une roadmap stratégique et technique personnalisée." },
                { icon: 'code', title: 'Développement', desc: 'Mise en œuvre agile par nos artisans du code et du digital.' },
                { icon: 'rocket_launch', title: 'Livraison', desc: 'Déploiement, formation et support continu pour votre succès.' },
              ].map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-sm ghost-border flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  </div>
                  <h4 className="font-headline font-bold text-base mb-1">{step.title}</h4>
                  <p className="text-xs text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <div className="bg-primary rounded-xxl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container rounded-full blur-[100px]"></div>
          </div>
          <div className="relative z-10 max-w-xl">
            <h2 className="font-headline text-2xl lg:text-3xl font-extrabold text-white mb-4 leading-tight">Prêt à transformer votre savoir-faire ?</h2>
            <p className="text-primary-fixed text-sm mb-0">Parlons de votre prochain projet. Nos experts sont là pour vous accompagner dans chaque étape de votre transformation numérique.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl transition-all hover:-translate-y-1 inline-block text-center">
              Contactez-nous
              <span className="material-symbols-outlined text-base ml-2">phone</span>
            </Link>
            <Link to="/projets" className="bg-white/10 text-white backdrop-blur-md px-8 py-4 rounded-xl font-bold text-base border border-white/20 hover:bg-white/20 transition-all inline-block text-center">
              Nos réalisations
              <span className="material-symbols-outlined text-base ml-2">web_asset</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;


