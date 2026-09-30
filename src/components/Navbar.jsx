import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import { useLanguage } from '../utils/LanguageContext';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/#expertises', label: 'Expertises', anchor: 'expertises' },
  { to: '/about', label: 'À Propos', hidden: true },
  { to: '/solutions', label: 'Solutions' },
];


const discoverLinks = [
  { label: 'Expertises', to: '/expertises' },
  { label: 'Extension d\'équipes', to: '/expertises/extension-equipes' },
  { label: 'Studio Produit', to: '/expertises/studio-produit' },
  { label: 'Modernisation applicative', to: '/expertises/modernisation-applicative' },
  { label: 'IA & Automatisation', to: '/expertises/ia-automatisation' },
  { label: 'Solutions', to: '/solutions' },
  { label: 'BRICONA', to: '/solutions/bricona' },
  { label: 'SELVY', to: '/solutions/selvy' },
  { label: 'Le Groupe', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/politique-de-confidentialite' },
  { label: 'Cookies', to: '/politique-cookies' },
  { label: 'Conditions d\'utilisation', to: '/conditions-utilisation' },
];

const translations = {
  fr: {
    nav: ['Accueil', 'Expertises', 'À Propos', 'Solutions'],
    discover: ['Expertises', "Extension d'équipes", 'Studio Produit', 'Modernisation applicative', 'IA & Automatisation', 'Solutions', 'BRICONA', 'SELVY', 'Le Groupe', 'Contact', 'Mentions légales', 'Confidentialité', 'Cookies', "Conditions d'utilisation"],
    discoverLabel: 'Découvrir',
    contact: "Contactez l'équipe",
    closeMenu: 'Fermer le menu',
    openMenu: 'Ouvrir le menu',
    close: 'Fermer',
    ready: 'Prêt à démarrer ?',
    quote: 'Obtenir un Devis',
    response: 'Réponse sous 24h garantie',
    switchLanguage: 'Langue',
  },
  en: {
    nav: ['Home', 'Expertise', 'About', 'Solutions'],
    discover: ['Expertise', 'Team extension', 'Product studio', 'Application modernization', 'AI & Automation', 'Solutions', 'BRICONA', 'SELVY', 'The Group', 'Contact', 'Legal notices', 'Privacy', 'Cookies', 'Terms of use'],
    discoverLabel: 'Discover',
    contact: 'Contact our team',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    close: 'Close',
    ready: 'Ready to get started?',
    quote: 'Request a quote',
    response: 'Guaranteed response within 24 hours',
    switchLanguage: 'Language',
  },
};


const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const copy = translations[language];
  const localizedNavLinks = navLinks.map((link, index) => ({ ...link, label: copy.nav[index] }));
  const localizedDiscoverLinks = discoverLinks.map((link, index) => ({ ...link, label: copy.discover[index] }));

  // Fermer le menu mobile sur changement de route
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Détecter le scroll pour changer le style de la navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path.includes('#')) {
      const [p, hash] = path.split('#');
      return location.pathname === p && location.hash === `#${hash}`;
    }
    return location.pathname === path;
  };

  const handleNavClick = (e, link) => {
    if (link.anchor) {
      if (location.pathname === '/') {
        const el = document.getElementById(link.anchor);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          setMenuOpen(false);
        }
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full h-[72px] z-50 transition-all duration-300 ${scrolled ? 'bg-surface/90 backdrop-blur-xl shadow-md' : 'bg-surface/70 backdrop-blur-xl shadow-sm'
          }`}
      >
        <nav className="flex justify-between items-center px-6 md:px-8 h-full max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="inline-flex items-center h-10 hover:opacity-80 transition-opacity z-10"
            aria-label="Enésense"
          >
            <img
              src={logoImg}
              alt="Enésense"
              className="block h-8 w-auto md:h-9"
            />
          </Link>

          {/* Right: menus & buttons */}
          <div className="flex items-center gap-4 md:gap-6">

            <div role="group" aria-label={copy.switchLanguage} className="inline-flex items-center gap-0.5 rounded-full border border-slate-300 bg-white p-1 shadow-sm">
              <Languages aria-hidden="true" size={16} className="ml-1.5 text-slate-500" />
              {['fr', 'en'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  aria-pressed={language === option}
                  aria-label={option === 'fr' ? 'Français' : 'English'}
                  className={`min-w-10 rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors ${language === option ? 'bg-navy-dark text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  {option.toUpperCase()}
                </button>
              ))}
            </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 font-label text-sm font-medium tracking-wide">
            {localizedNavLinks.filter((link) => link.to === '/').map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(e, link)}
                className={
                  isActive(link.to)
                    ? 'text-navy-dark border-b-2 border-navy-dark pb-1'
                    : 'text-slate-600 hover:text-yellow hover:border-b-2 hover:border-yellow pb-1 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            ))}
            {localizedNavLinks.filter((link) => link.to !== '/' && !link.hidden).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(e, link)}
                className={
                  isActive(link.to)
                    ? 'text-navy-dark border-b-2 border-navy-dark pb-1'
                    : 'text-slate-600 hover:text-yellow hover:border-b-2 hover:border-yellow pb-1 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            ))}
            </div>

            {/* Découvrir Dropdown */}
            <div className="relative hidden md:block group">
              <Link
                to="/solutions/bricona"
                className="text-slate-600 hover:text-yellow hover:border-b-2 hover:border-yellow pb-1 transition-all duration-300 inline-flex items-center gap-1 text-sm"
              >
                {copy.discoverLabel}
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="fixed left-0 top-[72px] w-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-200 z-[100] shadow-2xl">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="rounded-none bg-white shadow-xl border border-slate-200 p-3 flex flex-wrap gap-2">
                    {localizedDiscoverLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="px-4 py-2.5 rounded-none text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-yellow transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center justify-center bg-primary-container hover:bg-electric-blue text-on-primary px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md active:translate-y-0.5 md:ml-auto hover:scale-105"
            >
              {copy.contact}
            </Link>

           {/* Hamburger Button (Mobile) */}
           <button
             onClick={() => setMenuOpen(!menuOpen)}
             className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-surface-container transition-colors"
             aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
           >
             <span
               className={`block h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
                 }`}
             />
             <span
               className={`block h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-5'
                 }`}
             />
             <span
               className={`block h-0.5 bg-on-surface rounded-full transition-all duration-300 ${menuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-4'
                 }`}
             />
             </button>
            </div>
         </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-on-surface/30 backdrop-blur-sm" />
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-xs z-50 md:hidden bg-surface shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/20">
          <img src={logoImg} alt="Enésense" className="block h-8 w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label={copy.close}
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Drawer Content (scrollable) */}
        <div className="flex-1 overflow-y-auto">

          {/* Drawer Nav Links */}
          <nav className="flex flex-col px-4 py-6 gap-1">
            {localizedNavLinks.filter((link) => !link.hidden).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => handleNavClick(e, link)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-200 ${isActive(link.to)
                    ? 'bg-navy-soft text-navy-dark font-bold'
                    : 'text-on-surface hover:bg-surface-container-low hover:text-yellow'
                  }`}
              >
              {isActive(link.to) && (
                <span className="w-1.5 h-1.5 rounded-full bg-yellow shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Découvrir Dropdown (Mobile) */}
        <div className="border-t border-outline-variant/20">
          <button
            onClick={() => setDiscoverOpen(!discoverOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left font-medium text-on-surface-variant hover:bg-surface-container-low transition-all duration-200"
          >
            <span className="font-medium">{copy.discoverLabel}</span>
            <span className="material-symbols-outlined text-sm transition-transform duration-200" style={{ transform: discoverOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              expand_more
            </span>
          </button>
          <div
            className="overflow-hidden transition-all duration-200"
            style={{ maxHeight: discoverOpen ? '400px' : '0' }}
          >
            <div className="flex flex-col gap-1">
              {localizedDiscoverLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-yellow transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer CTA */}
        <div className="px-6 pb-10 pt-4 border-t border-outline-variant/20">
          <p className="text-xs text-on-surface-variant mb-4 tracking-widest uppercase font-bold">{copy.ready}</p>
          <Link
            to="/contact"
            className="block w-full bg-primary-container hover:bg-electric-blue text-on-primary text-center py-4 rounded-lg font-bold text-lg shadow-lg hover:brightness-105 transition-all active:scale-95 hover:scale-105"
          >
            {copy.quote}
          </Link>
          <p className="text-center text-xs text-on-surface-variant mt-4">{copy.response}</p>
        </div>
      </div>
    </div>
    </>
    );
};

export default Navbar;
