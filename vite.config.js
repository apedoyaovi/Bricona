import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  
  // Optimisation du dev server
  server: {
    port: 5173,
    // Compression des réponses
    middlewareMode: false,
    // Prefetch des modules importants
    preTransformRequests: ['src/main.jsx', 'src/App.jsx']
  },

  build: {
    // 🎯 Optimisation agressive de la taille du bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Enlever tous les console.*
        passes: 3, // Plus de passes = meilleure compression
        unsafe: true, // Optimisations plus agressives
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true
      },
      format: {
        comments: false, // Supprimer les commentaires
        ecma: 2020 // Target moderne pour meilleure compression
      },
      mangle: {
        safari10: true // Support Safari 10+
      }
    },

    // 🔄 Code Splitting avancé
    rollupOptions: {
      output: {
        // Grosse dépendances externes dans leurs propres chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'recaptcha-vendor': ['react-google-recaptcha'],
          'analytics-vendor': ['@vercel/analytics'],
          // Séparer les gros composants
          'pages-vendor': [
            './src/pages/Home.jsx',
            './src/pages/Services.jsx',
            './src/pages/About.jsx',
            './src/pages/Contact.jsx'
          ]
        },
        // Format du nom des chunks pour meilleure gestion du cache
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `images/[name].[hash][extname]`;
          }
          if (/\.(css)$/i.test(assetInfo.name)) {
            return `css/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        }
      },
      external: [] // si vous aviez des dépendances externes
    },

    // Seuil d'avertissement plus élevé (ces chunks sont déjà optimisés)
    chunkSizeWarningLimit: 1500,

    // Metrics pour analyser la taille du bundle
    reportCompressedSize: true,

    // Source maps uniquement en dev
    sourcemap: false,

    // Optimisation des propriétés CSS
    cssCodeSplit: true,

    // Améliorer la cache busting
    outDir: 'dist',

    // Compiler avec un target spécifique pour moderne navs
    target: 'es2020',

    // Optimisations supplémentaires
    modulePreload: {
      polyfill: false // Désactiver le polyfill pour les anciens navigateurs
    }
  },

  // Optimiser les ressources statiques
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg'],

  // Preview server
  preview: {
    port: 4173,
    strictPort: true
  }
})
