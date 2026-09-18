import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.xn--ensense-cya.com').replace(/\/$/, '');
const SITE_NAME = 'Enésense';
const BRAND_VARIANTS = 'Enésense, Enésese, Enésence, Enésance, Enésens, Enésens, Enesense, Enesence, Enesense, Enésense, enésense, enesense, Enesense';

const pageMetadata = {
    '/': { 
      title: 'Enésense | Digitalisation, Automatisation et Développement sur mesure pour entreprises', 
      description: 'Enésense (Enésese, Enésence, Enesense) accompagne les entreprises dans leur transformation digitale : digitalisation, automatisation et développement de solutions sur mesure en France et au Togo.', 
      keywords: `${BRAND_VARIANTS}, digitalisation entreprise, automatisation processus, développement logiciel sur mesure, maintenance informatique, digitalisation PME, automatisation TPE, logiciel sur mesure Togo, digitalisation France, Enésense contact, devis digitalisation, solution digitale entreprise` 
    },
    '/contact': { 
      title: 'Contact | Enésense - Digitalisation, Automatisation, Développement sur mesure', 
      description: 'Contactez Enésense pour parler de votre projet de digitalisation, d\'automatisation ou de développement de solution sur mesure. Devis gratuit sous 24h.', 
      keywords: `${BRAND_VARIANTS}, contact Enésense, projet digital, devis digitalisation, développement logiciel contact, Enésense adresse, Enésense téléphone` 
    },
    '/about': { 
      title: 'À propos | Enésense - Notre mission : digitaliser et automatiser les entreprises', 
      description: 'Découvrez la mission d\'Enésense : faire grandir les entreprises grâce à des outils digitaux simples, utiles et accessibles. Digitalisation, automatisation et développement sur mesure.', 
      keywords: `${BRAND_VARIANTS}, à propos, entreprise digitale France, digitalisation entreprise, équipe digitalisation, mission Enésense` 
    },
    '/solutions': { 
      title: 'Solutions | Enésense - Nos produits numériques BRICONA', 
      description: 'Enésense conçoit ses propres plateformes numériques, à commencer par BRICONA, dédiée au secteur du BTP. Des produits développés pour résoudre des problèmes réels.', 
      keywords: `${BRAND_VARIANTS}, solutions numériques, BRICONA, plateforme BTP, produit numérique, développement logiciel produit` 
    },
    '/expertises': { 
      title: 'Expertises — Enésense', 
      description: "Extension d'équipes techniques, studio produit, modernisation applicative, IA & automatisation : les capacités d'ingénierie d'Enésense.", 
      keywords: `${BRAND_VARIANTS}, expertises Enésense, extension d'équipes techniques, studio produit, modernisation applicative, IA automatisation, capacités d'ingénierie` 
    },
    '/solutions/bricona': { 
      title: 'BRICONA — la plateforme numérique du BTP | Enésense', 
      description: 'BRICONA est la plateforme numérique d\'Enésense dédiée au secteur du BTP : planification, suivi de chantier, documents et indicateurs.', 
      keywords: `${BRAND_VARIANTS}, BRICONA, plateforme BTP, suivi chantier, gestion chantier, numérique BTP` 
    },
    '/solutions/selvy': { 
      title: 'SELVY — le social commerce pour les marchands | Enésense', 
      description: 'SELVY est la plateforme de social commerce d\'Enésense pensée pour les marchands d\'Afrique de l\'Ouest.', 
      keywords: `${BRAND_VARIANTS}, SELVY, social commerce, marchands Afrique de l'Ouest, plateforme commerciale, vente en ligne` 
    },
};

const getPageMetadata = (pathname) => {
    if (pageMetadata[pathname]) return pageMetadata[pathname];
    if (pathname.startsWith('/expertises/')) return { ...pageMetadata['/expertises'], title: `Expertise | ${SITE_NAME}` };
    if (pathname.startsWith('/solutions/')) return { ...pageMetadata['/solutions'], title: `Solution | ${SITE_NAME}` };
    if (pathname === '/solutions') return pageMetadata['/solutions'];
    if (pathname === '/solutions/bricona') return pageMetadata['/solutions/bricona'];
    if (pathname === '/solutions/selvy') return pageMetadata['/solutions/selvy'];
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
            description: 'Enésense (Enésese, Enésence, Enesense) accompagne les entreprises dans leur transformation digitale : digitalisation, automatisation et développement de solutions sur mesure.',
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
              { '@type': 'Offer', name: 'Digitalisation', description: 'Digitalisation sur mesure pour entreprises' },
              { '@type': 'Offer', name: 'Automatisation', description: 'Automatisation intelligente des processus métier' },
              { '@type': 'Offer', name: 'Développement sur mesure', description: 'Développement de solutions sur mesure' },
              { '@type': 'Offer', name: 'Maintenance', description: 'Maintenance informatique et technique' },
            ],
        };
        let schema = document.head.querySelector('script[data-enesense-schema]');
        if (!schema) {
            schema = document.createElement('script');
            schema.type = 'application/ld+json';
            schema.dataset.enesenseSchema = 'true';
            document.head.appendChild(schema);
        }
        schema.textContent = JSON.stringify(structuredData);
    }, [image, isPrivatePage, resolvedDescription, resolvedKeywords, resolvedTitle, type, url]);

    return null;
}
