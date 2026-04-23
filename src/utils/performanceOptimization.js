// Utility pour enregistrer le Service Worker et optimiser la performance

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Attendre que la page soit chargée
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => {
          console.log('✅ Service Worker enregistré avec succès:', registration);
          
          // Vérifier les mises à jour toutes les heures
          setInterval(() => {
            registration.update();
          }, 3600000);
        })
        .catch((error) => {
          console.log('❌ Erreur lors de l\'enregistrement du Service Worker:', error);
        });
    });

    // Gérer les mises à jour du Service Worker
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      // Recharger la page quand une nouvelle version est disponible
      window.location.reload();
    });
  } else {
    console.warn('Service Workers non supportés dans ce navigateur');
  }
}

// Optimisation des images avec Intersection Observer
export function setupLazyImageLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Charger l'image haute résolution
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          
          // Charger le srcset si présent
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset; 
          }
          
          // Ajouter une classe après chargement
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          // Arrêter d'observer cette image
          observer.unobserve(img);
        }
      });
    }, {
      // Commencer à charger avant que l'image soit visible (preload)
      rootMargin: '50px'
    });

    // Observer toutes les images avec lazy-load
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Ajouter loading="lazy" à toutes les images qui n'en ont pas
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    img.setAttribute('loading', 'lazy');
  });
}

// Monitorer les métriques de performance en temps réel
export function monitorPerformanceMetrics() {
  if ('PerformanceObserver' in window) {
    // Monitorer les métriques Core Web Vitals
    const vitalMetrics = {
      FCP: null, // First Contentful Paint
      LCP: null, // Largest Contentful Paint
      FID: null, // First Input Delay
      CLS: null, // Cumulative Layout Shift
      TBT: null  // Total Blocking Time
    };

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitalMetrics.FCP = entry.startTime;
        console.log('📊 FCP:', entry.startTime, 'ms');
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        vitalMetrics.LCP = entry.startTime;
        console.log('📊 LCP:', entry.startTime, 'ms');
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Layout Shift (pour CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          vitalMetrics.CLS = clsValue;
          console.log('📊 CLS:', clsValue);
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Navigation Timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          console.log('📊 Navigation Timing:');
          console.log('  - DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
          console.log('  - Load Event:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
          console.log('  - Total Time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
        }

        // Rapport des métriques
        console.log('📈 Core Web Vitals Summary:');
        console.log('  - FCP:', vitalMetrics.FCP ? vitalMetrics.FCP + 'ms' : 'Not measured');
        console.log('  - LCP:', vitalMetrics.LCP ? vitalMetrics.LCP + 'ms' : 'Not measured');
        console.log('  - CLS:', vitalMetrics.CLS || 'Not measured');
      }, 0);
    });
  }
}

// Prefetch des chunks de routes (au lieu des routes elles-mêmes)
export function prefetchCriticalRoutes() {
  // Disabled: Prefetch des routes React Router cause des 404 car ce ne sont pas des fichiers HTTP
  // Les routes sont gérées côté client par React Router, pas par le serveur
  // À la place, Webpack/Vite fait déjà du prefetch des chunks JS automatiquement
  console.log('✓ Routes prefetching désactivé (géré par lazy loading)');
}

// Compresser les images avant envoi (pour les formulaires)
export function compressImage(file, maxWidth = 1200, maxHeight = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.85); // 85% de qualité
      };
    };
  });
}

// Désactiver l'animation et les effets visuels pour les utilisateurs avec connexion lente
export function detectSlowConnection() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      const effectiveType = connection.effectiveType;
      const saveData = connection.saveData;

      if (effectiveType === '4g' && !saveData) {
        // Connexion rapide - activer toutes les animations
        document.documentElement.style.setProperty('--animation-enabled', '1');
      } else if (effectiveType === '3g' || saveData) {
        // Connexion moyenne/lente - réduire les animations
        document.documentElement.style.setProperty('--animation-enabled', '0');
        document.documentElement.style.setProperty('--reduce-motion', 'reduce');
      } else {
        // Connexion très lente - supprimer les animations
        document.body.classList.add('slow-connection');
        document.documentElement.style.setProperty('--reduce-motion', 'reduce');
      }

      // Afficher l'info en console
      console.log(`Connexion détectée: ${effectiveType} ${saveData ? '(Data Saver activé)' : ''}`);
    }
  }
}

// Initialiser toutes les optimisations
export function initializePerformanceOptimizations() {
  registerServiceWorker();
  setupLazyImageLoading();
  monitorPerformanceMetrics();
  prefetchCriticalRoutes();
  detectSlowConnection();
  
  // Optimisation supplémentaire: réduire les repaints/reflows
  optimizeRendering();
  
  console.log('🚀 Optimisations de performance initialisées');
}

// Optimiser le rendu pour éviter les repaints coûteux
export function optimizeRendering() {
  // Désactiver les animations sur les appareils lents
  const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  if (isSlowDevice) {
    document.documentElement.classList.add('reduce-motion');
  }

  // Précharger les polices critiques
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }

  // Optimiser les événements de scroll
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Code d'optimisation du scroll ici
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
}
