import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import FloatingButtons from './components/FloatingButtons';

// Composants communs (chargés immédiatement)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Composant de chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full border-4 border-primary-fixed border-t-primary-container animate-spin"></div>
      <p className="font-headline text-primary font-bold">Chargement...</p>
    </div>
  </div>
);

// Scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const id = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
    return () => clearTimeout(id);
  }, [pathname]);
  return null;
}

// Lazy loading des pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Projets = lazy(() => import('./pages/Projets'));
const ProjetDetail = lazy(() => import('./pages/ProjetDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));
const ConditionsUtilisation = lazy(() => import('./pages/ConditionsUtilisation'));
const AdminEvenements = lazy(() => import('./pages/AdminEvenements'));
const AdminInscriptions = lazy(() => import('./pages/AdminInscriptions'));
const PageNonTrouvee = lazy(() => import('./pages/PageNonTrouvee.jsx'));

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-grow">
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projets" element={<Projets />} />
            <Route path="/projets/:id" element={<ProjetDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/admin-evenements" element={<AdminEvenements />} />
            <Route path="/admin-inscriptions" element={<AdminInscriptions />} />
            <Route path="*" element={<PageNonTrouvee />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default App;
