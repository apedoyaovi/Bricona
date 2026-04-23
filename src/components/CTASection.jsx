import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function CTASection({
    title = "Besoin d'un devis sur-mesure ?",
    description = "Chaque entreprise est unique. Expliquez-nous vos besoins et nous vous répondrons sous 24h avec une proposition adaptée.",
    primaryBtnText = "Remplir le Formulaire",
    primaryBtnLink = "/contact",
    secondaryBtnText = "Appelez 72483165",
    secondaryBtnLink = "tel:72483165",
    showWhatsAppIcon = false
}) {
    return (
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
                    <p className="text-gray-400 text-sm mb-8 max-w-lg mx-auto">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={primaryBtnLink} className="px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all text-sm flex items-center justify-center gap-2">
                            {primaryBtnText}
                        </Link>
                        <a href={secondaryBtnLink} className="px-5 py-3 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-sm flex items-center justify-center gap-2">
                            {showWhatsAppIcon && <MessageCircle size={18} />}
                            <span>{secondaryBtnText}</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
