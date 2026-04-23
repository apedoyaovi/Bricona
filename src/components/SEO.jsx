import { Helmet } from 'react-helmet-async';

export default function SEO({
    title = "Yaodev | Agence Web & SEO au Togo | Sites Vitrines & Marketing Digital",
    description = "Yaodev (yao-dev) - Agence digitale spécialisée en création de sites vitrines, référencement SEO et marketing digital au Togo. Prix transparents dès 100,000 FCFA. Devis gratuit.",
    keywords = "yaodev, yao-dev, YaoDev, agence web togo, création site web lomé, seo togo, marketing digital togo, site vitrine, référencement google togo",
    image = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    url = "https://yao-dev.vercel.app",
    type = "website"
}) {
    const siteName = "Yaodev";
    const author = "Yaodev Team";
    const twitterHandle = "@yaodev";

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="French" />
            <meta name="revisit-after" content="7 days" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="fr_FR" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:creator" content={twitterHandle} />

            {/* Additional Tags */}
            <meta name="theme-color" content="#059669" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
}
