import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/Logo.png';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/offres', label: 'Offres' },
  { to: '/projets', label: 'Réalisations', hidden: true },
  { to: '/blog', label: 'Blog', hidden: true },
  { to: '/about', label: 'A Propos' },
  { to: '/contact', label: 'Contact' },
];


const servicesLinks = [

  { to: '/services#digitalisation', label: 'Digitalisation' },

  { to: '/services#automatisation', label: 'Automatisation' },

  { to: '/services#mise-en-relation', label: 'Mise en relation', hidden: true },

];



const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const isActive = (path) => location.pathname === path;

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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-label text-sm font-medium tracking-wide">
            {navLinks.filter((link) => link.to === '/').map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  isActive(link.to)
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-slate-600 hover:text-blue-800 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <Link
                to="/services"
                className={
                  isActive('/services')
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1 inline-flex items-center gap-1'
                    : 'text-slate-600 hover:text-blue-800 transition-all duration-300 inline-flex items-center gap-1'
                }
              >
                Services
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </Link>
              <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all duration-200">
                <div className="min-w-[220px] rounded-xl bg-white shadow-xl border border-slate-200 p-2">
                  {servicesLinks.filter((item) => !item.hidden).map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-800 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navLinks.filter((link) => link.to !== '/' && !link.hidden).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  isActive(link.to)
                    ? 'text-blue-700 border-b-2 border-blue-700 pb-1'
                    : 'text-slate-600 hover:text-blue-800 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:inline-block bg-primary-container text-on-primary px-6 py-2.5 rounded-xl font-medium scale-95 active:scale-90 transition-transform shadow-md"
          >
            Contactez l'équipe commerciale
          </Link>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-surface-container transition-colors"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
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
        className={`fixed top-0 right-0 h-full w-4/5 max-w-xs z-50 md:hidden bg-surface shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/20">
          <img src={logoImg} alt="Enésense" className="block h-8 w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors"
            aria-label="Fermer"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className="flex flex-col px-4 py-6 gap-1 flex-grow">
          {navLinks.filter((link) => link.to !== '/services' && !link.hidden).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-base transition-all duration-200 ${isActive(link.to)
                  ? 'bg-primary-fixed text-primary font-bold'
                  : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
                }`}
            >
              {isActive(link.to) && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
              {link.label}
            </Link>
          ))}

          <div className="mt-2">
            <Link
              to="/services"
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant/80 hover:text-primary transition-colors"
            >
              Services
            </Link>
            <div className="flex flex-col">
              {servicesLinks.filter((item) => !item.hidden).map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 pb-10 pt-4 border-t border-outline-variant/20">
          <p className="text-xs text-on-surface-variant mb-4 tracking-widest uppercase font-bold">Prêt à démarrer ?</p>
          <Link
            to="/contact"
            className="block w-full bg-primary-container text-on-primary text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:brightness-105 transition-all active:scale-95"
          >
            Obtenir un Devis
          </Link>
          <p className="text-center text-xs text-on-surface-variant mt-4">Réponse sous 24h garantie</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
