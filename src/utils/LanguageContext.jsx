import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'fr';

  try {
    return window.localStorage.getItem('site-language') === 'en' ? 'en' : 'fr';
  } catch {
    return 'fr';
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('site-language', language);
    } catch {
      // The language remains available for the current session without storage.
    }
  }, [language]);

  const t = (french, english) => language === 'en' ? english : french;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}