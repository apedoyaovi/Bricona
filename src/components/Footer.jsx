import { Link } from 'react-router-dom';
import logoImg from '../assets/Logo.png';

const Footer = () => {
  const socialLinks = [
    { label: 'Facebook', href: 'https://web.facebook.com/profile.php?id=61586741540007' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/briconation-corp/' },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto font-body text-sm text-slate-500">
        <div className="space-y-4">
          <img src={logoImg} alt="Bricona" className="block h-10 w-auto scale-[3.2] origin-left" />
          <p className="leading-relaxed">Digital Artisan Excellence. Fusionner la tradition et la technologie.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">language</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">alternate_email</span>
            <span className="material-symbols-outlined text-primary cursor-pointer hover:opacity-100 opacity-80 transition-opacity">phone</span>
          </div>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-[0.1em] text-[10px]">Solutions</h5>
          <ul className="space-y-4">
            <li><Link className="hover:text-blue-600 transition-colors" to="/services">Services</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/services">Digitalisation</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/services">Automatisation</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-[0.1em] text-[10px]">Entreprise</h5>
          <ul className="space-y-4">
            <li><Link className="hover:text-blue-600 transition-colors" to="/about">À Propos</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-on-surface mb-6 uppercase tracking-[0.1em] text-[10px]">Légal</h5>
          <ul className="space-y-4">
            <li><Link className="hover:text-blue-600 transition-colors" to="/mentions-legales">Mentions Légales</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/conditions-utilisation">Conditions d'Utilisation</Link></li>
            <li><Link className="hover:text-blue-600 transition-colors" to="/politique-de-confidentialite">Confidentialité</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2025 Bricona. Digitalisation et Automatisation Intuitive.</p>
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
