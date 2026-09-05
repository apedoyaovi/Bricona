export const coreServices = [
    {
        id: "site-vitrine",
        title: "Site Vitrine Responsive",
        description: "Sites web modernes et élégants, parfaitement optimisés pour tous les écrans (Mobiles, Tablettes, PC). Idéal pour présenter votre entreprise ou votre marque personnelle.",
        features: ["Design unique & moderne", "Adaptabilité mobile totale", "Vitesse de chargement optimisée", "Interface intuitive (UI/UX)"],
        budget: "25,000 - 500,000 FCFA",
        delay: "7 - 21 jours",
        badge: "Plus Populaire",
        link: "/services"
    },
    {
        id: "seo",
        title: "Référencement (SEO)",
        description: "Propulsez votre site en première page de Google. Nous optimisons votre visibilité locale et nationale pour attirer des clients qualifiés.",
        features: ["Audit technique complet", "Optimisation mots-clés", "SEO Local (Google Maps)", "Rapports de performance"],
        budget: "25,000 - 100,000 FCFA",
        delay: "Mensuel / Ponctuel",
        badge: "Indispensable",
        link: "/services"
    },
    {
        id: "marketing",
        title: "Marketing Digital",
        description: "Développez votre présence sur les réseaux sociaux et boostez vos ventes avec des campagnes publicitaires ciblées et efficaces.",
        features: ["Stratégie social media", "Campagnes Pub (Ads)", "Création de contenu", "Analyse d'audience"],
        budget: "50,000 - 200,000 FCFA",
        delay: "Dès 48h",
        badge: "Croissance",
        link: "/services"
    }
];

export const projects = [
    {
        id: 1,
        title: "Portfolio Artiste Peintre",
        category: "web",
        description: "Un site élégant et minimaliste pour présenter les œuvres d'un artiste local avec galerie interactive.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        tags: ["Personnel", "Design Concept", "Responsive"],
        client: "Jean d'Art",
        duration: "7 jours",
        year: "2026",
        featured: true,
        link: "/projets/1",
        challenge: "L'artiste avait besoin d'une présence en ligne pour maximiser la visibilité de ses œuvres sans un investissement massif dans un site e-commerce complet.",
        solution: "Nous avons créé un portfolio minimaliste avec une galerie interactive, optimisée pour le mobile et les réseaux sociaux.",
        results: ["Augmentation de 200% des demandes de commissions", "Réduction de 50% du temps de gestion grâce à un formulaire de contact intégré", "Présence professionnelle en ligne en moins de 10 jours"]
    },
    {
        id: 2,
        title: "SEO Boost pour Garage PME",
        category: "seo",
        description: "Optimisation de la fiche Google Maps et du site vitrine. Passage de la page 4 à la page 1 en 2 mois.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        technologies: ["SEO Technique", "Google Business Page", "Content Strategy"],
        tags: ["Local SEO", "Visibilité", "PME"],
        client: "Garage AutoPro",
        duration: "En continu",
        year: "2026",
        featured: true,
        link: "/projets/2",
        challenge: "Le garage n'apparaissait pas dans les résultats de recherche locale malgré 15 ans d'existence. Leurs concurrents monopolisaient Google Maps.",
        solution: "Optimisation complète de la fiche Google Business, création de contenu local, et stratégie d'acquisition d'avis clients positifs.",
        results: ["Passage de la page 4 à la page 1 en 2 mois", "+120% de clics depuis Google Maps", "Note moyenne de 4.8/5 avec 45+ avis"]
    },
    {
        id: 3,
        title: "Site Vitrine Agence Immobilière",
        category: "web",
        description: "Conception d'un site responsive pour une agence immobilière avec catalogue de biens filtrable.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        technologies: ["React", "Vite", "Headless CMS"],
        tags: ["Immobilier", "Responsive", "Catalogue"],
        client: "Lomé Immo",
        duration: "14 jours",
        year: "2026",
        featured: false,
        link: "/projets/3",
        challenge: "L'agence utilisait des brochures papier pour présenter leurs biens, perdant du temps et limitant leur portée géographique.",
        solution: "Site vitrine avec catalogue filtrable par quartier, prix, et type de bien. Interface intuitive pour mise à jour facile des annonces.",
        results: ["Réduction de 70% du temps de prospection", "Portée élargie à tout le Togo", "Interface mobile utilisée par 65% des visiteurs"]
    },
    {
        id: 4,
        title: "Campagne Facebook / Instagram Ads",
        category: "marketing",
        description: "Gestion publicitaire pour le lancement d'un nouveau restaurant. +300% de réservations en 1 mois.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        technologies: ["Meta Business Suite", "Copies Pub", "Ciblage"],
        tags: ["Ads", "Marketing", "Restaurateurs"],
        client: "Le Gourmet Lomé",
        duration: "30 jours",
        year: "2023",
        featured: false,
        link: "/projets/4",
        challenge: "Nouveau restaurant sans visibilité locale. Besoin de remplir rapidement les réservations pour assurer la rentabilité dès le premier mois.",
        solution: "Campagne Facebook et Instagram Ads ciblée sur Lomé avec visuels attractifs du menu. Suivi quotidien des performances et ajustements.",
        results: ["+300% de réservations en 30 jours", "Coût par acquisition divisé par 3", "Base de fans Instagram passée de 0 à 2000+"]
    }
];

export const blogPosts = [
    {
        id: 1,
        title: "Digitalisation : Comment transformer votre artisanat en 2026",
        excerpt: "Le guide complet pour les artisans souhaitant entrer dans l'ère numérique sans perdre leur essence.",
        category: "digitalisation",
        author: { name: "Bricona Team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        date: "15 Avril 2026",
        readTime: "5 min",
        views: "1.2k",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "/blog/1",
        content: `
      <p>La digitalisation n'est pas une menace pour les artisans, c'est une opportunité. En fusionnant l'excellence artisanale avec la technologie, vous multipliez vos clients et vos revenus.</p>
      <h3>1. Un Site Web, Votre Meilleur Commercial</h3>
      <p>90% des clients recherchent les artisans en ligne. Sans présence digitale, vous êtes invisible. Un site vitrine attire des prospects 24h/24.</p>
      <h3>2. Mettre en Avant Votre Expertise</h3>
      <p>Montrez votre savoir-faire à travers des galeries de réalisations, des témoignages clients et une histoire authentique. La confiance naît de la transparence.</p>
      <h3>3. Automatiser les Tâches Répétitives</h3>
      <p>Concentrez-vous sur votre métier. Laissez les systèmes gérer les prises de rendez-vous, les devis et les relances d'une façon automatisée.</p>
    `
    },
    {
        id: 2,
        title: "Automatisation : Gagnez 12 heures par semaine dans votre atelier",
        excerpt: "Les workflow intelligents qui libèrent du temps créatif pour se concentrer sur votre savoir-faire.",
        category: "automatisation",
        author: { name: "Bricona Team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        date: "10 Avril 2026",
        readTime: "7 min",
        views: "2.4k",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "/blog/2",
        content: `
      <p>Les tâches administratives étouffent votre créativité. Gestion de devis, relances clients, organisation d'agenda... Ces processus répétitifs peuvent être totalement automatisés.</p>
      <h3>Quels Processus Automatiser?</h3>
      <p>Les formulaires de contact, les confirmations de rendez-vous, la génération de devis standards, les relances de paiement. Une fois mise en place, l'automatisation travaille sans intervention humaine.</p>
      <h3>Les Bénéfices Réels</h3>
      <p>Moins de charge mentale, plus de temps pour créer, meilleure organisation et une meilleure expérience client grâce à des réponses immédiates.</p>
    `
    },
    {
        id: 3,
        title: "Mise en Relation : Connectez-vous aux bons clients",
        excerpt: "Comment notre plateforme crée le pont entre votre excellence artisanale et les clients qui la cherchent.",
        category: "mise-en-relation",
        author: { name: "Bricona Team", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        date: "05 Avril 2026",
        readTime: "8 min",
        views: "1.8k",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        link: "/blog/3",
        content: `
    <p>Trouver les bons clients est un défi constant pour les artisans. Enésense résout ce problème par une mise en relation intelligente et vérifiée.</p>
      <h3>Une Plateforme de Confiance</h3>
      <p>Chaque artisan est vérifié pour son expertise, chaque client pour son sérieux. Fini les devis perdus et les clients fantômes.</p>
      <h3>Growth Stratégique</h3>
      <p>Accédez à un réseau d'entrepreneurs locaux prêts à travailler avec vous. Développez votre carnet de clients qualifiés sans effort de prospection.</p>
    `
    }
];
