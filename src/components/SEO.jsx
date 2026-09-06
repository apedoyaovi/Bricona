import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.xn--ensense-cya.com').replace(/\/$/, '');
const SITE_NAME = 'Enésense';
const BRAND_VARIANTS = 'Enésense, Enésese, Enésence, Enésance, Enésens, Enésens, Enesense, Enesence, Enesense, Enésense, enésense, enesence, Enesense';

const pageMetadata = {
    '/': { 
      title: 'Enésense | Digitalisation, Automatisation et Mise en relation pour artisans et entreprises', 
      description: 'Enésense (Enésese, Enésence, Enesense) accompagne les artisans et entreprises dans leur transformation digitale : digitalisation, automatisation, mise en relation avec des clients et développement de logiciels sur mesure en France et au Togo.', 
      keywords: `${BRAND_VARIANTS}, digitalisation entreprise, automatisation processus, mise en relation artisans, développement logiciel sur mesure, maintenance informatique, digitalisation artisans, automatisation atelier, logiciel sur mesure Togo, digitalisation France, Enésense contact, devis digitalisation, solution digitale artisan` 
    },
    '/services': { 
      title: 'Services | Enésense, digitalisation, automatisation et développement sur mesure', 
      description: 'Découvrez les services Enésense : digitalisation d\'entreprises et d\'ateliers, automatisation des processus, mise en relation avec des clients qualifiés, développement de logiciels sur mesure et maintenance. Solutions adaptées aux artisans et PME.', 
      keywords: `${BRAND_VARIANTS}, services digitaux, automatisation entreprise, digitalisation atelier, mise en relation artisans clients, développement logiciel sur mesure, maintenance informatique, SEO Togo, digitalisation artisanat, automatisation processus métier, solution digitale entreprise` 
    },
    '/offres': { 
      title: 'Offres digitales pour artisans et entreprises | Enésense', 
      description: 'Choisissez une offre Enésense adaptée à vos objectifs de visibilité, de digitalisation et de croissance. Diagnostic, déploiement et pilotage pour transformer votre activité.', 
      keywords: `${BRAND_VARIANTS}, offres digitales, solutions pour artisans, visibilité en ligne Togo, diagnostic digital, déploiement solution, pilotage activité, tarif digitalisation, devis automatisation` 
    },
    '/projets': { 
      title: 'Projets | Enésense, réalisation digitale pour artisans et entreprises', 
      description: 'Explorez les projets réalisés par Enésense pour rapprocher artisanat, technologie et opportunités commerciales. Digitalisation, automatisation et mise en relation.', 
      keywords: `${BRAND_VARIANTS}, projets digitaux, portfolio, artisanat et technologie, réalisations digitales, cas clients digitalisation, projets automatisation` 
    },
    '/blog': { 
      title: 'Blog | Conseils digitalisation, automatisation et mise en relation | Enésense', 
      description: 'Conseils pratiques d\'Enésense pour digitaliser un atelier, automatiser son activité, développer un logiciel sur mesure et mieux trouver ses clients.', 
      keywords: `${BRAND_VARIANTS}, blog digitalisation, conseils artisans, automatisation activité, mise en relation clients, développement logiciel, blog digital Togo, conseils digitalisation entreprise` 
    },
    '/contact': { 
      title: 'Contact | Enésense - Digitalisation, Automatisation, Développement sur mesure', 
      description: 'Contactez Enésense pour parler de votre projet de digitalisation, d\'automatisation, de mise en relation ou de développement de logiciel sur mesure. Devis gratuit sous 24h.', 
      keywords: `${BRAND_VARIANTS}, contact Enésense, projet digital Togo, devis digitalisation, contact automation, développement logiciel contact, Enésense adresse, Enésense téléphone` 
    },
    '/about': { 
      title: 'À propos | Enésense - Notre mission : digitaliser et automatiser les artisans', 
      description: 'Découvrez la mission d\'Enésense : faire grandir les artisans et les entreprises grâce à des outils digitaux simples, utiles et accessibles. Digitalisation, automatisation, mise en relation et développement sur mesure.', 
      keywords: `${BRAND_VARIANTS}, à propos, entreprise digitale Togo, artisanat numérique, qui sommes nous Enésense, équipe digitalisation, mission Enésense` 
    },
};

const getPageMetadata = (pathname) => {
    if (pageMetadata[pathname]) return pageMetadata[pathname];
    if (pathname.startsWith('/projets/')) return { ...pageMetadata['/projets'], title: `Projet | ${SITE_NAME}` };
    if (pathname.startsWith('/blog/')) return { ...pageMetadata['/blog'], title: `Article | ${SITE_NAME}` };
    return pageMetadata['/'];
};

const upsertMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

const upsertLink = (rel, href) => {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
};

export default function SEO({
    title,
    description,
    keywords,
    image = `${SITE_URL}/enessence_logo.png`,
    type = 'website' 
}) {
    const { pathname } = useLocation();
    const metadata = getPageMetadata(pathname);
    const resolvedTitle = title || metadata.title;
    const resolvedDescription = description || metadata.description;
    const resolvedKeywords = keywords || metadata.keywords;
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    const isPrivatePage = pathname.startsWith('/admin');

    useEffect(() => {
        document.title = resolvedTitle;
        upsertMeta('meta[name="description"]', { name: 'description', content: resolvedDescription });
        upsertMeta('meta[name="keywords"]', { name: 'keywords', content: resolvedKeywords });
        upsertMeta('meta[name="robots"]', { name: 'robots', content: isPrivatePage ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' });
        upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
        upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
        upsertMeta('meta[property="og:title"]', { property: 'og:title', content: resolvedTitle });
        upsertMeta('meta[property="og:description"]', { property: 'og:description', content: resolvedDescription });
        upsertMeta('meta[property="og:image"]', { property: 'og:image', content: image });
        upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME });
        upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'fr_FR' });
        upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
        upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: resolvedTitle });
        upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: resolvedDescription });
        upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });
        upsertLink('canonical', url);

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE_NAME,
            alternateName: ['Enésese', 'Enésence', 'Enésance', 'Enésens', 'Enesense', 'Enesence', 'enésense', 'enesense', 'Enésense'],
            url: SITE_URL,
            logo: image,
            description: 'Enésense (Enésese, Enésence, Enesense) accompagne les artisans et entreprises dans leur transformation digitale : digitalisation, automatisation, mise en relation avec des clients et développement de logiciels sur mesure.',
            email: 'contact@bricona.net',
            telephone: '+22879340002',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Colombs',
              addressCountry: 'FR',
            },
            areaServed: {
              '@type': 'Country',
              name: 'France',
            },
            sameAs: [
                'https://www.linkedin.com/company/briconation-corp/',
                'https://web.facebook.com/profile.php?id=61586741540007',
            ],
            makesOffer: [
              { '@type': 'Offer', name: 'Digitalisation', description: 'Digitalisation d\'entreprises et d\'ateliers' },
              { '@type': 'Offer', name: 'Automatisation', description: 'Automatisation des processus métier' },
              { '@type': 'Offer', name: 'Mise en relation', description: 'Mise en relation artisans et clients qualifiés' },
              { '@type': 'Offer', name: 'Développement sur mesure', description: 'Développement de logiciels sur mesure' },
              { '@type': 'Offer', name: 'Maintenance', description: 'Maintenance informatique et technique' },
            ],
        };
        let schema = document.head.querySelector('script[data-enesence-schema]');
        if (!schema) {
            schema = document.createElement('script');
            schema.type = 'application/ld+json';
            schema.dataset.enesenceSchema = 'true';
            document.head.appendChild(schema);
        }
        schema.textContent = JSON.stringify(structuredData);
    }, [image, isPrivatePage, resolvedDescription, resolvedKeywords, resolvedTitle, type, url]);

    return null;
}
