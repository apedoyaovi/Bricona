import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://bricona.net').replace(/\/$/, '');
const SITE_NAME = 'Enésense';
const BRAND_VARIANTS = 'Enésense, Enésence, Enesence, enésence, enesence, Enesense';

const pageMetadata = {
    '/': { title: 'Enésense | Digitalisation et automatisation des artisans', description: 'Enésense accompagne les artisans dans leur digitalisation, leur automatisation et leur mise en relation avec de nouveaux clients au Togo.', keywords: `${BRAND_VARIANTS}, digitalisation des artisans, automatisation, mise en relation artisans, innovation artisanale Togo` },
    '/services': { title: 'Services | Enésense, solutions digitales pour artisans', description: 'Découvrez les services Enésense : digitalisation, automatisation, référencement et mise en relation pour développer votre activité artisanale.', keywords: `${BRAND_VARIANTS}, services digitaux, automatisation entreprise, SEO Togo, digitalisation artisanat` },
    '/offres': { title: 'Offres digitales pour artisans | Enésense', description: 'Choisissez une offre Enésense adaptée à vos objectifs de visibilité, de digitalisation et de croissance.', keywords: `${BRAND_VARIANTS}, offres digitales, solutions pour artisans, visibilité en ligne Togo` },
    '/projets': { title: 'Projets | Enésense, artisanat et technologie', description: 'Explorez les projets réalisés par Enésense pour rapprocher artisanat, technologie et opportunités commerciales.', keywords: `${BRAND_VARIANTS}, projets digitaux, portfolio, artisanat et technologie` },
    '/blog': { title: 'Blog | Conseils digitalisation et automatisation | Enésense', description: 'Conseils pratiques d’Enésense pour digitaliser un atelier, automatiser son activité et mieux trouver ses clients.', keywords: `${BRAND_VARIANTS}, blog digitalisation, conseils artisans, automatisation activité` },
    '/contact': { title: 'Contact | Enésense', description: 'Contactez Enésense pour parler de votre projet de digitalisation, d’automatisation ou de mise en relation.', keywords: `${BRAND_VARIANTS}, contact Enésense, projet digital Togo, devis digitalisation` },
    '/about': { title: 'À propos | Enésense', description: 'Découvrez la mission d’Enésense : faire grandir les artisans grâce à des outils digitaux simples, utiles et accessibles.', keywords: `${BRAND_VARIANTS}, à propos, entreprise digitale Togo, artisanat numérique` },
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
            alternateName: ['Enésence', 'Enesence', 'enésence', 'enesence', 'Enesense'],
            url: SITE_URL,
            logo: image,
            description: pageMetadata['/'].description,
            email: 'contact@bricona.net',
            telephone: '+22879340002',
            areaServed: 'TG',
            sameAs: [
                'https://www.linkedin.com/company/briconation-corp/',
                'https://web.facebook.com/profile.php?id=61586741540007',
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
