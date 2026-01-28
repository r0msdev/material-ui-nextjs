'use client';
import { createContext, useContext, useMemo } from 'react';
import { getTranslations } from '@/locales/translations';

const TranslationsContext = createContext(null);

/**
 * Provider component that supplies translations to the component tree
 */
export function TranslationsProvider({ children, locale }) {
  const value = useMemo(() => {
    // Use provided locale from route params
    const effectiveLocale = locale || 'en';
    const translations = getTranslations(effectiveLocale);
    
    const t = (key) => {
      return translations[key] || key;
    };
    
    return { t, locale: effectiveLocale };
  }, [locale]);
  
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}

/**
 * Hook to access translations from context
 * @returns {object} Object with t function and locale
 */
export function useTranslations() {
  const context = useContext(TranslationsContext);
  
  // Provide fallback for SSR or if context is not available
  if (!context) {
    const translations = getTranslations('en');
    return {
      t: (key) => translations[key] || key,
      locale: 'en'
    };
  }
  
  return context;
}
