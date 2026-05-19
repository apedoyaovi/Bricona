import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroImg from '../assets/Bricona hero 1.webp';
import heroCardImg from '../assets/Bricona hero 2.webp';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  SITE_CONTENT_EVENT,
  addEventRegistration,
  getEventGroups,
  formatEventDate,
  getPublishedEvents,
  getPublishedEventsFromSupabase,
  getSiteSettings,
} from '../utils/siteContent';

// const partners = ['CRAFTLOG', 'ARTISAN.PRO', 'FABRIK', 'DIGIWORKS', 'MANUFAKT', 'TECH-OR'];
const partners = ['devenez l\'un des premiers partenaires de Bricona digitale (contactez l\'équipe commerciale pour en savoir plus)'];

const heroWords = ["implémentation des systèmes piloté par l'IA", 'Digitalisation', 'Automatisation'];
const showHeroPhoto = false;//permet d'afficher ou non la photo de droite dans la partie hero
const showKeyFigures = false;//permet d'afficher ou non la section des statistiques
const showTestimonials = false;//permet d'afficher ou non la section des témoignages clients sur la page d'accueil

const eventIcons = {
  Conference: 'co_present',
  Meeting: 'groups',
  Atelier: 'event_available',
};

const Home = () => {
  const location = useLocation();
  const featuredTestimonials = [
    {
      quote: "Bricona n'est pas juste un prestataire, c'est le moteur de notre transformation numérique. Notre chiffre d'affaires a doublé en un an.",
      name: 'Jean-Marc Lefebvre',
      role: 'Maître Forgeron & Innovateur',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2OyJkYZiDFYO8DZTe8vulU-mCPqCj8TlkeOwKZH2QaNJDGOI2lkEE4N_RY5bJglkIVtFHb68tKNVmQ13CxTTB6-42bfjABr4VyzZJy8FmJaEy2TjLeHVpUJnJa4crWZeA6R_9S0j6pZDqzfd9yGyx--yUaudzvqYExMzOua59sR9b1rx0V3DOd65FZsqd-GxwKFhSSOyL2B2ACk2NFQKxMs4f5KPX1s6OmfT_5J-WRGSG73Pb1JPQTTwgmKs0mBtGjLfC0xJ7a3YF',
    },
    {
      quote: "Grâce à l'automatisation, mon atelier gagne 12 heures par semaine. La qualité reste intacte, mais la charge mentale a disparu.",
      name: 'Aïcha Traoré',
      role: 'Maroquinière',
      img: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: "Leur mise en relation est redoutable : des clients qualifiés, des devis signés plus vite, et un suivi clair en temps réel.",
      name: 'Luc Benyahia',
      role: 'Menuisier & Chef d’atelier',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(() => getPublishedEvents());
  const [siteSettings, setSiteSettings] = useState(() => getSiteSettings());
  const [registrationSent, setRegistrationSent] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    registration: null,
    formElement: null,
  });
  const eventGroups = getEventGroups(upcomingEvents);
  const displayedPastEvents = eventGroups.past.slice(0, 3);
  const displayedCurrentEvents = eventGroups.current.slice(0, 1);
  const displayedFutureEvents = eventGroups.future.slice(0, 3);
  const hasVisibleEvents = displayedPastEvents.length > 0 || displayedCurrentEvents.length > 0 || displayedFutureEvents.length > 0;

  useEffect(() => {
    if (location.hash) {
      const id = setTimeout(() => {
        document
          .getElementById(location.hash.substring(1))
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      return () => clearTimeout(id);
    }
  }, [location.hash]);

  useEffect(() => {
    const syncSiteContent = async () => {
      setSiteSettings(getSiteSettings());

      try {
        setUpcomingEvents(await getPublishedEventsFromSupabase());
      } catch {
        setUpcomingEvents(getPublishedEvents());
      }
    };

    syncSiteContent();
    window.addEventListener(SITE_CONTENT_EVENT, syncSiteContent);
    window.addEventListener('storage', syncSiteContent);

    return () => {
      window.removeEventListener(SITE_CONTENT_EVENT, syncSiteContent);
      window.removeEventListener('storage', syncSiteContent);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }); },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentWord = heroWords[wordIndex];
    const isComplete = subIndex === currentWord.length;
    const isEmpty = subIndex === 0;

    const delay = deleting ? 45 : isComplete ? 1100 : 70;
    const timeout = setTimeout(() => {
      if (!deleting && !isComplete) {
        setSubIndex((v) => v + 1);
        return;
      }
      if (!deleting && isComplete) {
        setDeleting(true);
        return;
      }
      if (deleting && !isEmpty) {
        setSubIndex((v) => v - 1);
        return;
      }
      if (deleting && isEmpty) {
        setDeleting(false);
        setWordIndex((v) => (v + 1) % heroWords.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [deleting, subIndex, wordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((v) => (v + 1) % featuredTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);

  return (
    <main className="pt-[72px]">
      <ConfirmDialog
        open={confirmDialog.open}
        title="Confirmer l'inscription ?"
        message="Votre inscription sera transmise a l equipe Bricona pour confirmer votre place a l evenement."
        confirmLabel="S'inscrire"
        onCancel={() => setConfirmDialog({ open: false, registration: null, formElement: null })}
        onConfirm={async () => {
          if (confirmDialog.registration) {
            setIsRegistering(true);
            setRegistrationError('');

            try {
              await addEventRegistration(confirmDialog.registration);
              setRegistrationSent(true);
              confirmDialog.formElement?.reset();
            } catch {
              setRegistrationError("Impossible d'enregistrer l'inscription pour le moment. Veuillez reessayer.");
            } finally {
              setIsRegistering(false);
            }
          }
          setConfirmDialog({ open: false, registration: null, formElement: null });
        }}
      />

      {/* ===== Hero ===== */}
      <section
        className="relative min-h-[55vh] flex items-center overflow-hidden hero-gradient bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,50,125,0.55) 0%, rgba(37,211,102,0.55) 100%), url(${heroImg})`,
          backgroundPosition: '5% center',
        }}
      >
        <div className="absolute inset-0 bg-primary/40"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary-container rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-primary-container rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 pt-28 md:pt-32 pb-20 md:pb-24">

          {/* Left */}
          <div className="lg:col-span-10 lg:col-start-2 animate-fade-up text-center flex flex-col items-center -translate-y-3 md:-translate-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>
              <p className="font-label editorial-caps text-white font-bold text-[10px] md:text-[11px]">Innovation &amp; Digitalisation Automatiser</p>
            </div>

            <h1 className="font-headline text-[2.15rem] lg:text-[3.4rem] font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              Bricona à l'Heure du <br />
              <span className="text-secondary-container">Digital de Pointe.</span>
            </h1>
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-container shadow-[0_0_12px_rgba(252,212,0,0.9)]"></span>
                <p className="text-secondary-container font-bold text-lg md:text-xl tracking-wide h-7">
                  {heroWords[wordIndex].slice(0, subIndex)}
                  <span className="inline-block w-2 animate-pulse text-secondary-container">|</span>
                </p>
              </div>
            </div>
            <p className="text-[15px] md:text-base text-primary-fixed max-w-2xl mx-auto mb-7 leading-relaxed opacity-90">
              chez bricona digitale nous concevons et déployons des solutions numériques sur mesure pour améliorer l'efficacité de vos équipes et augmente votre portefeuille. 
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold text-[15px] hover:shadow-[0_16px_40px_rgba(252,212,0,0.3)] hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Prendre un rendez-vous
                <span className="material-symbols-outlined text-base">phone</span>
              </Link>
              <Link to="/#conferences-meetings" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-[15px] hover:bg-white/20 transition-all">
                s'inscrire aux webinaires 
              </Link>
            </div>

            {/* <div className="mt-8 flex items-center gap-3 text-white/60">
              <div className="flex -space-x-2">
                <img
                  alt="Artisan 1"
                  className="w-8 h-8 rounded-full border-2 border-primary-container object-cover"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                />
                <img
                  alt="Artisan 2"
                  className="w-8 h-8 rounded-full border-2 border-primary-container object-cover"
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80"
                />
                <img
                  alt="Artisan 3"
                  className="w-8 h-8 rounded-full border-2 border-primary-container object-cover"
                  src="https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=100&q=80"
                />
              </div>
              <p className="text-xs font-medium">+2,500 artisans nous font confiance pour la mise en relation</p>
            </div> */}
          </div>

          {/* Right — Photo */}
          {showHeroPhoto && (
          <div className="lg:col-span-5 relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-full max-w-xs lg:max-w-sm mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <img
                alt="Modern Craftsmanship"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                src={heroCardImg}
                loading="lazy"
              />
              {/* Top stat chip */}
              <div className="absolute top-5 right-5 glass-card p-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-secondary-container/20 rounded-lg">
                    <span className="material-symbols-outlined text-secondary text-lg">trending_up</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary opacity-60">Croissance</p>
                    <p className="text-sm font-black text-primary">+80%</p>
                  </div>
                </div>
              </div>
              {/* Bottom glass card */}
              <div className="absolute bottom-5 left-5 right-5 glass-card p-4 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-base">precision_manufacturing</span>
                    </div>
                    <div>
                      <p className="font-bold text-primary text-sm">Entreprise Connecté et tâches automatisées</p>
                      <p className="text-xs text-on-surface-variant">Monitoring 24/7</p>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold rounded-full uppercase tracking-widest">Actif</div>
                </div>
              </div>
            </div>
          </div>
          )}

        </div>
      </section>

      {/* ===== Partners Marquee ===== */}
      <section className="py-6 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-on-surface-variant/70">
            <span className="w-10 h-px bg-outline-variant/60"></span>
            Devenez partenaire:(contactez nous pour en savoir plus)
          </div>
          {/* <div className="flex items-center gap-3 mb-2 text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-on-surface-variant/70">
            <span className="w-10 h-px bg-outline-variant/60"></span>
            Ils nous font confiance
          </div> */}
          <div
            className="overflow-hidden rounded-2xl bg-surface-container-lowest/70 border border-outline-variant/20 shadow-sm"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
          >
            <div className="flex items-center whitespace-nowrap animate-marquee py-5">
              {[...partners, ...partners].map((name, i) => (
                <span
                  key={i}
                  className="mx-6 inline-flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container/90"></span>
                  <span className="px-4 py-1.5 rounded-full border border-outline-variant/30 bg-white/70 text-primary/90 font-black font-headline text-sm md:text-base tracking-[0.22em] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
                    {name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="py-16 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-16 -right-10 w-72 h-72 bg-primary-fixed rounded-full blur-[90px]"></div>
          <div className="absolute -bottom-20 -left-10 w-80 h-80 bg-secondary-container/20 rounded-full blur-[110px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 scroll-reveal active">
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-1">Notre Expertise</p>
            <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface">Solutions sur Mesure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group p-7 rounded-2xl bg-white border border-outline-variant/10 hover:border-primary/30 hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.12)] transition-all duration-500 scroll-reveal active hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <h3 className="font-headline text-base font-bold mb-2 text-primary">implémentation des systèmes piloté par l'IA</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                Accédez à un réseau exclusif de partenaires certifiés. Notre technologie de matching garantit la synergie parfaite.
              </p>
              <Link className="text-primary font-bold flex items-center gap-1 text-sm group/link" to="/services">
                Découvrir l'écosystème
                <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Card 2 — Featured */}
            <div className="group p-7 rounded-2xl bg-primary text-white hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.25)] transition-all duration-500 scroll-reveal active hover:-translate-y-1" style={{ transitionDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-on-secondary-container text-xl">devices</span>
              </div>
              <h3 className="font-headline text-base font-bold mb-2">Digitalisation</h3>
              <p className="text-primary-fixed/80 text-sm leading-relaxed mb-5">
                Propulsez votre atelier dans l'ère numérique. Nous créons des interfaces fluides qui simplifient votre gestion.
              </p>
              <Link className="text-secondary-container font-bold flex items-center gap-1 text-sm group/link" to="/services">
                Optimiser ma structure
                <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group p-7 rounded-2xl bg-white border border-outline-variant/10 hover:border-primary/30 hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.12)] transition-all duration-500 scroll-reveal active hover:-translate-y-1" style={{ transitionDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105">
                <span className="material-symbols-outlined text-xl">auto_mode</span>
              </div>
              <h3 className="font-headline text-base font-bold mb-2 text-primary">Automatisation</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                Réduisez les tâches répétitives de 80%. Nos solutions IA vous permettent de vous concentrer sur votre travail.
              </p>
              <Link className="text-primary font-bold flex items-center gap-1 text-sm group/link" to="/services">
                En savoir plus
                <span className="material-symbols-outlined text-base transition-transform group-hover/link:translate-x-1">arrow_forward</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ===== Key Figures commented until real statistics are available ===== */}
      {showKeyFigures && (
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '+500', label: 'Projets Livrés',  color: 'text-primary' },
              { value: '98%',  label: 'Satisfaction',    color: 'text-secondary-container' },
              { value: '2.5k', label: 'Artisans Actifs', color: 'text-primary' },
              { value: '24h',  label: 'Support Réactif', color: 'text-secondary-container' },
            ].map((stat, i) => (
              <div key={stat.label} className="scroll-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`text-4xl lg:text-5xl font-black font-headline mb-1 ${stat.color}`}>{stat.value}</div>
                <p className="text-on-surface-variant font-bold tracking-tight uppercase text-[10px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ===== Offres résumé ===== */}
      <section id="offres-summary" className="py-16 bg-surface relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-96 h-96 bg-secondary-container rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-primary/20 rounded-full blur-[90px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-12 scroll-reveal active">
            <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-1">Offres BRICONATION</p>
            <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface mb-3">Nos offres essentielles</h2>
            <p className="text-on-surface-variant text-sm max-w-2xl mx-auto leading-relaxed">
              Un aperçu rapide de nos trois phases. Pour le détail complet et toutes les conditions, rendez-vous sur la page Offres.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="group rounded-[2rem] bg-white border border-outline-variant/10 p-7 shadow-sm hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.12)] transition-all scroll-reveal active">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary-container text-white mb-4">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-primary mb-3">Phase 1 — Diagnostic</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Audit de vos processus, recommandations priorisées et feuille de route claire.
              </p>
              <p className="text-sm font-bold text-primary mb-3">75 000 FCFA</p>
              <p className="text-xs text-on-surface-variant">Offert si contrat Déploiement signé sous 30 jours.</p>
            </div>

            <div className="group rounded-[2rem] bg-white border border-outline-variant/10 p-7 shadow-sm hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.12)] transition-all scroll-reveal active">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-white mb-4">
                <span className="material-symbols-outlined">construction</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-primary mb-3">Phase 2 — Déploiement</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Conception et déploiement sur mesure des solutions adaptées à votre projet.
              </p>
              <p className="text-sm font-bold text-primary mb-3">Sur devis</p>
              <p className="text-xs text-on-surface-variant">Fourchette indicatives : 150 000 à 800 000 FCFA.</p>
            </div>

            <div className="group rounded-[2rem] bg-white border border-outline-variant/10 p-7 shadow-sm hover:shadow-[0_24px_50px_-10px_rgba(0,50,125,0.12)] transition-all scroll-reveal active">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-secondary-container text-white mb-4">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h3 className="font-headline text-lg font-bold text-primary mb-3">Phase 3 — Pilotage</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                Suivi opérationnel, optimisation continue et support prioritaire pour vos outils.
              </p>
              <p className="text-sm font-bold text-primary mb-3">35 000 FCFA / mois</p>
              <p className="text-xs text-on-surface-variant">29 000 FCFA / mois en annuel — 348 000 FCFA/an.</p>
            </div>
          </div>

          <div className="mt-10 text-center scroll-reveal">
            <p className="text-on-surface-variant text-sm mb-5">
              Chaque phase peut être souscrite indépendamment, mais la Phase 1 est recommandée comme point de départ.
            </p>
            <Link to="/offres" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-primary-container transition-all">
              Voir la page Offres
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Conferences & Meetings ===== */}
      <section id="conferences-meetings" className="py-16 bg-white overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 scroll-reveal">
              <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Conferences &amp; Meetings</p>
              <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface mb-4">
                Participez aux conférences et meetings Bricona.
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl mb-8">
                Découvrez les prochains rendez-vous, consultez les evenements en cours ou passes, et inscrivez-vous aux sessions ouvertes(future).
              </p>

              {hasVisibleEvents ? (
                <div className="space-y-8 mb-8">
                  {[
                    {
                      title: 'Evenement en cours',
                      note: 'Disponible aujourd hui',
                      events: displayedCurrentEvents,
                      badge: 'En cours',
                      icon: 'play_circle',
                      badgeClass: 'bg-secondary-container/25 text-secondary',
                    },
                    {
                      title: 'Prochains evenements',
                      note: 'Inscription ouverte',
                      events: displayedFutureEvents,
                      badge: 'Futur',
                      icon: 'event_upcoming',
                      badgeClass: 'bg-primary-fixed text-primary',
                    },
                    {
                      title: 'Evenements passes',
                      note: 'Les 3 derniers programmes',
                      events: displayedPastEvents,
                      badge: 'Passe',
                      icon: 'history',
                      badgeClass: 'bg-slate-200 text-slate-600',
                    },
                  ].map((group) => (
                    <div key={group.title}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">{group.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-headline text-lg font-bold text-on-surface">{group.title}</h3>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">{group.note}</p>
                        </div>
                      </div>

                      {group.events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {group.events.map((event, i) => (
                            <div
                              key={event.id}
                              className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5 shadow-sm hover:shadow-[0_18px_40px_rgba(0,50,125,0.10)] hover:-translate-y-1 transition-all"
                              style={{ transitionDelay: `${i * 0.08}s` }}
                            >
                              <div className="flex items-center justify-between gap-3 mb-5">
                                <div className="h-11 w-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                                  <span className="material-symbols-outlined text-xl">{eventIcons[event.type] || 'event'}</span>
                                </div>
                                <div className="flex flex-wrap justify-end gap-2">
                                  <span className="rounded-full bg-secondary-container/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-secondary">
                                    {event.type}
                                  </span>
                                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${group.badgeClass}`}>
                                    {group.badge}
                                  </span>
                                </div>
                              </div>
                              <h4 className="font-headline text-base font-bold text-primary leading-snug mb-3">{event.title}</h4>
                              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{event.description}</p>
                              <div className="space-y-2 text-xs text-on-surface-variant">
                                <p className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-base text-primary">calendar_month</span>
                                  <span>{formatEventDate(event.date)} - {event.time}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <span className="material-symbols-outlined text-base text-primary">location_on</span>
                                  <span>{event.place}</span>
                                </p>
                                {group.badge === 'Futur' && (
                                  <p className="flex items-center gap-2 font-bold text-primary">
                                    <span className="material-symbols-outlined text-base">confirmation_number</span>
                                    <span>{event.seats} places disponibles</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="rounded-2xl bg-surface-container-low p-5 text-sm text-on-surface-variant">
                          Aucun evenement dans cette categorie.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 text-center mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3">event_busy</span>
                  <p className="font-headline font-bold text-primary mb-1">Aucun evenement programme pour le moment.</p>
                  <p className="text-sm text-on-surface-variant">Revenez bientot pour decouvrir les prochains meetings et conferences.</p>
                </div>
              )}

            </div>

            <div className="lg:col-span-5 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <form
                className="rounded-[2rem] bg-surface-container-low p-6 md:p-7 border border-outline-variant/20 shadow-[0_24px_60px_rgba(0,50,125,0.10)]"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  setConfirmDialog({
                    open: true,
                    formElement: event.currentTarget,
                    registration: {
                      eventId: formData.get('event-name'),
                      fullName: formData.get('full-name'),
                      phone: formData.get('phone-number'),
                      email: formData.get('email-address'),
                      profile: formData.get('profile-type'),
                    },
                  });
                }}
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">how_to_reg</span>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-bold text-on-surface">Inscription rapide</h3>
                    <p className="text-on-surface-variant text-sm">Choisissez un evenement future et laissez vos coordonnées.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="event-name">Evenement</label>
                    <select
                      id="event-name"
                      name="event-name"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="" disabled>Sélectionner un evenement</option>
                      {eventGroups.future.map((event) => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="full-name">Nom complet</label>
                      <input
                        id="full-name"
                        name="full-name"
                        required
                        type="text"
                        className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="phone-number">Telephone</label>
                      <input
                        id="phone-number"
                        name="phone-number"
                        required
                        type="tel"
                        className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                        placeholder="+228 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="email-address">Email</label>
                    <input
                      id="email-address"
                      name="email-address"
                      required
                      type="email"
                      className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.12em] text-on-surface-variant mb-2" htmlFor="profile-type">Profil</label>
                    <select
                      id="profile-type"
                      name="profile-type"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-outline-variant/30 bg-white px-4 py-3 text-sm text-on-surface outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="" disabled>Choisir votre profil</option>
                      <option value="artisan">Artisan</option>
                      <option value="client">Client</option>
                      <option value="partenaire">Partenaire</option>
                      <option value="entreprise">Entreprise</option>
                    </select>
                  </div>
                </div>

                {registrationSent && (
                  <p className="mt-5 rounded-xl bg-green-100 px-4 py-3 text-sm font-bold text-green-700" aria-live="polite">
                    Inscription recue. Notre equipe vous contactera via {siteSettings.email} ou {siteSettings.phone}.
                  </p>
                )}

                {registrationError && (
                  <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600" aria-live="polite">
                    {registrationError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={eventGroups.future.length === 0 || isRegistering}
                  className="mt-6 w-full bg-primary text-white px-6 py-4 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
                >
                  {isRegistering ? 'Enregistrement...' : "S'inscrire maintenant"}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials commented until real testimonials are available ===== */}
      {showTestimonials && (
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Left: mini cards */}
            <div className="lg:w-1/2 scroll-reveal">
              <p className="font-label editorial-caps text-primary font-bold text-[10px] mb-3">Témoignages</p>
              <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface mb-6">Ils façonnent le futur avec nous.</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                    <img alt="Marc Dupont" className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2OyJkYZiDFYO8DZTe8vulU-mCPqCj8TlkeOwKZH2QaNJDGOI2lkEE4N_RY5bJglkIVtFHb68tKNVmQ13CxTTB6-42bfjABr4VyzZJy8FmJaEy2TjLeHVpUJnJa4crWZeA6R_9S0j6pZDqzfd9yGyx--yUaudzvqYExMzOua59sR9b1rx0V3DOd65FZsqd-GxwKFhSSOyL2B2ACk2NFQKxMs4f5KPX1s6OmfT_5J-WRGSG73Pb1JPQTTwgmKs0mBtGjLfC0xJ7a3YF" />
                  </div>
                  <div>
                    <p className="text-on-surface text-sm font-medium italic mb-1">"L'interface de gestion a réduit mon temps administratif de moitié. Une révolution pour mon atelier."</p>
                    <p className="text-primary font-bold text-xs">Marc Dupont — Ebéniste</p>
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-full shrink-0 bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm">SL</div>
                  <div>
                    <p className="text-on-surface text-sm font-medium italic mb-1">"Un accompagnement humain avant tout, couplé à une expertise technique redoutable."</p>
                    <p className="text-primary font-bold text-xs">Sophie Laurent — Céramiste</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: big quote */}
            <div className="lg:w-1/2 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="relative bg-primary rounded-[2rem] p-8 text-white overflow-hidden shadow-2xl">
                <span className="material-symbols-outlined text-7xl text-white/10 absolute -top-3 -right-3">format_quote</span>
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4 text-secondary-container">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-base font-headline font-medium leading-relaxed mb-6">
                    "{featuredTestimonials[testimonialIndex].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 p-0.5">
                      <div className="w-full h-full rounded-xl overflow-hidden bg-slate-400">
                        <img alt={featuredTestimonials[testimonialIndex].name} className="w-full h-full object-cover"
                          src={featuredTestimonials[testimonialIndex].img} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">{featuredTestimonials[testimonialIndex].name}</p>
                      <p className="text-primary-fixed opacity-70 text-xs">{featuredTestimonials[testimonialIndex].role}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    {featuredTestimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${i === testimonialIndex ? 'bg-secondary-container' : 'bg-white/30 hover:bg-white/50'}`}
                        aria-label={`T?moignage ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTestimonialIndex((v) => (v - 1 + featuredTestimonials.length) % featuredTestimonials.length)}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                      aria-label="T?moignage pr?c?dent"
                    >
                      <span className="material-symbols-outlined text-base">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setTestimonialIndex((v) => (v + 1) % featuredTestimonials.length)}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                      aria-label="T?moignage suivant"
                    >
                      <span className="material-symbols-outlined text-base">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      )}

      
{/* ===== Partners Logos ===== */}
      <section className="py-16 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-6 text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-on-surface-variant/70">
            <span className="w-10 h-px bg-outline-variant/60"></span>
            Partenariats ouverts:(contacter nous pour devenir partenaire)
          </div>
          {/* <div className="flex items-center gap-3 mb-6 text-xs md:text-sm font-bold uppercase tracking-[0.28em] text-on-surface-variant/70">
            <span className="w-10 h-px bg-outline-variant/60"></span>
            Nos Partenaires
          </div> */}
          <div
            className="overflow-hidden rounded-2xl bg-white/70 border border-outline-variant/20 shadow-sm"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
          >
            <div className="flex items-center whitespace-nowrap animate-marquee py-6" style={{ animationDuration: '28s' }}>
              {[...partners, ...partners].map((name, i) => (
                <div key={i} className="mx-6 inline-flex items-center gap-4">
                  {/*
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/90 to-primary-container/80 text-white font-black font-headline flex items-center justify-center shadow-[0_10px_25px_rgba(0,50,125,0.25)]">
                    {name.replace(/[^A-Z]/g, '').slice(0, 2)}
                  </div>
                  */}
                  <div className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
                    <span className="text-sm md:text-base font-black tracking-[0.22em] text-primary uppercase">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[3rem] hero-gradient p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <circle cx="20" cy="20" fill="white" r="15" />
              <circle cx="80" cy="80" fill="#fcd400" r="20" />
            </svg>
          </div>
          <h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-white mb-5 leading-tight">
            Façonnez votre <span className="text-secondary-container">futur digital</span>.
          </h2>
          <p className="text-primary-fixed text-sm max-w-xl mx-auto mb-8 opacity-90 leading-relaxed">
            Une solution complète, de la vision à l'excellence opérationnelle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold text-base hover:scale-105 transition-all shadow-lg">
              Contacter l'équipe commerciale
            </Link>
            {/* <Link to="/services" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all">
              Visiter nos services
            </Link> */}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
