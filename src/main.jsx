import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { initializePerformanceOptimizations } from './utils/performanceOptimization.js'
import { registerServiceWorker } from './utils/pushNotifications'

// Initialiser les optimisations de performance dès le démarrage
initializePerformanceOptimizations();

// Enregistrer le service worker en production pour le support PWA et notifications push
if (import.meta.env.PROD) {
  registerServiceWorker().catch(() => {});
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)