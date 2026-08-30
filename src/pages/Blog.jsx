import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  MessageCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import CTASection from '../components/CTASection';
import { blogPosts } from '../data/allContent';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous', count: 12 },
    { id: 'digitalisation', name: 'Digitalisation', count: 5 },
    { id: 'automatisation', name: 'Automatisation', count: 4 },
    { id: 'mise-en-relation', name: 'Mise en Relation', count: 3 },
  ];


  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white mt-[72px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 border border-blue-100">
              <Zap size={14} />
              <span>Blog & Insights</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              Excellence Artisanale &{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Innovation Digitale
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
              Découvrez comment digitaliser votre savoir-faire artisanal, automatiser vos processus et développer votre audience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          {/* Featured Post */}
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-500" />
              À la une
            </h2>
            <div className="relative group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="grid lg:grid-cols-2">
                <div className="h-48 lg:h-auto overflow-hidden">
                  <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase">{blogPosts[0].category}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{blogPosts[0].readTime} read</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{blogPosts[0].title}</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{blogPosts[0].excerpt}</p>
                  <Link to={`/blog/${blogPosts[0].id}`} className="inline-flex items-center gap-2 text-blue-600 text-sm font-bold hover:gap-3 transition-all">
                    Lire l'article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-gray-100">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                      : 'bg-white text-gray-400 border border-gray-100 hover:border-blue-200 hover:text-blue-600'
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.slice(1).map((post) => (
                  <div key={post.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 group hover:shadow-xl transition-all flex flex-col">
                    <div className="h-44 overflow-hidden relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-bold rounded-lg">{post.category}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-tight">{post.date} • {post.readTime}</div>
                      <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">{post.title}</h3>
                      <p className="text-xs text-gray-500 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src={post.author.image} alt={post.author.name} className="w-6 h-6 rounded-full grayscale" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase">{post.author.name}</span>
                        </div>
                        <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-700">
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Search */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-widest">Rechercher</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Sujet, article..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-sm font-bold mb-2 relative z-10">Newsletter Enesence</h3>
                <p className="text-gray-400 text-[10px] mb-6 relative z-10 leading-relaxed font-medium uppercase tracking-tight">
                  Conseils mensuels pour transformer votre artisanat numériquement.
                </p>
                <form className="space-y-3 relative z-10">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 text-xs text-white"
                  />
                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-[10px] uppercase transition-colors shadow-lg shadow-blue-900/40 tracking-widest cursor-pointer">
                    S'abonner
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-widest">Tags Populaires</h3>
                <div className="flex flex-wrap gap-1.5">
                  {['Digitalisation', 'Automatisation', 'Mise en Relation', 'Artisanat Digital', 'Transformation', 'Innovation'].map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-400 text-[9px] font-bold uppercase rounded border border-gray-100 hover:text-blue-600 hover:border-blue-200 cursor-pointer transition-all">{tag}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Besoin d'une expertise pour votre transformation digitale ?"
        description="Enesence accompagne les artisans dans leur digitalisation, automatisation et mise en relation avec les bons clients."
        primaryBtnText="Contacter Enesence"
        secondaryBtnText="WhatsApp"
        secondaryBtnLink="https://wa.me/22879340002"
        showWhatsAppIcon={true}
      />
    </div>
  );
}