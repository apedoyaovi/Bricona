import { Link } from 'react-router-dom';
import logoImg from '../assets/Logo.png';

const Footer = () => {
  const socialLinks = [
    { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61586741540007' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/briconation-corp/' },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto font-body text-sm text-slate-500">
        <div className="space-y-4">
          <img src={logoImg} alt="Enésense" className="block h-8 w-auto md:h-9" />
          <p className="leading-relaxed">Digitalisation, automatisation et développement sur mesure pour entreprises.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">language</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">alternate_email</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">phone</span>
          </div>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-4 uppercase tracking-[0.05em] text-sm font-headline" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Expertises</h5>
          <ul className="space-y-3">
            <li><Link className="hover:text-blue-600 transition-colors" to="/expertises">Extension d'équipes</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/expertises">Studio Produit</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/expertises">Modernisation applicative</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/expertises">IA & Automatisation</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-4 uppercase tracking-[0.05em] text-sm font-headline" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Entreprise</h5>
          <ul className="space-y-3">
            <li><Link className="hidden" to="/about">À Propos</Link></li>
            <li><Link className="hidden" to="/about">Équipe</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/about">Partenaires</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-4 uppercase tracking-[0.05em] text-sm font-headline" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Légal</h5>
          <ul className="space-y-3">
            <li><Link className="hover:text-blue-600 transition-colors" to="/mentions-legales">Mentions Légales</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/conditions-utilisation">Conditions d'Utilisation</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/politique-de-confidentialite">Confidentialité</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/politique-cookies">Politique de Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2025 Enésense. Digitalisation et Automatisation Intuitive.</p>
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              className="hover:text-blue-600 transition-colors"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
