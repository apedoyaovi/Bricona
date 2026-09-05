import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import { blogPosts } from '../data/allContent';
import CTASection from '../components/CTASection';

export default function BlogPost() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    const handleShare = async () => {
        const shareData = {
            title: post.title,
            text: post.excerpt,
            url: window.location.href
        };

        // Check if Web Share API is available (mobile/modern browsers)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy link to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Lien copié ! Collez-le pour partager l\'article.');
            } catch (err) {
                // Final fallback: Show alert with link
                prompt('Copiez ce lien pour partager:', window.location.href);
            }
        }
    };

    if (!post) {
        return (
            <div className="min-h-screen pt-32 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
                <Link to="/blog" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-2">
                    <ArrowLeft size={18} /> Retour au blog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
                    <ChevronRight size={12} />
                    <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-900 line-clamp-1">{post.title}</span>
                </nav>
            </div>

            {/* Hero Header */}
            <header className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-blue-100">
                    <Sparkles size={14} />
                    <span>{post.category}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <img
                            src={post.author.image}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full grayscale border border-gray-100"
                        />
                        <div>
                            <p className="text-xs font-bold text-gray-900 uppercase tracking-tight">{post.author.name}</p>
                            <p className="text-[10px] text-gray-400 font-medium">Expert Enésense</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Calendar size={16} />
                            <span className="text-[10px] font-bold uppercase">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Clock size={16} />
                            <span className="text-[10px] font-bold uppercase">{post.readTime} read</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-16">
                <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Article Content */}
            <article className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mb-20">
                <div
                    className="prose prose-blue lg:prose-lg max-w-none text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Share Section */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={18} /> Retour aux articles
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Partager</span>
                        <button
                            onClick={handleShare}
                            className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                            aria-label="Partager l'article"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>
            </article>

            {/* CTA Section */}
            <CTASection
                title="Vous avez un projet similaire en tête ?"
                description="Besoin d'accompagnement pour digitaliser, automatiser ou íitions de relation avec vos clients ? Parlons-en aujourd'hui."
                primaryBtnText="Contacter Enésense"
            />
        </div>
    );
}
