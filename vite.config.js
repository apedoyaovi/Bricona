import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/',
  server: {
    port: 5173,
    middlewareMode: false,
    preTransformRequests: ['src/main.jsx', 'src/App.jsx']
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 3,
        unsafe: true,
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
        comments: false,
        ecma: 2020
      },
      mangle: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'recaptcha-vendor': ['react-google-recaptcha'],
          'analytics-vendor': ['@vercel/analytics'],
        },
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
      external: []
    },
    chunkSizeWarningLimit: 1500,
    reportCompressedSize: true,
    sourcemap: false,
    cssCodeSplit: true,
    outDir: 'dist',
    target: 'es2020',
    modulePreload: {
      polyfill: false
    }
  },
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot', '**/*.svg'],
  preview: {
    port: 4173,
    strictPort: true
  }
})
