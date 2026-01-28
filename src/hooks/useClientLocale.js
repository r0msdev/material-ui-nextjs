'use client';
import { useState } from 'react';

/**
 * Custom hook to get the user's locale
 * Reads from cookie set by middleware (server-side Accept-Language detection)
 * Falls back to browser's navigator.language if cookie is not available
 * @returns {string | null} The user's locale (e.g., 'es-ES', 'en-US') or null during SSR
 */
export function useClientLocale() {
  // Use lazy initializer to detect locale only once on mount
  const [locale] = useState(() => {
    if (typeof window === 'undefined') {
      return null; // SSR
    }
    
    // First, try to read from cookie (set by middleware from Accept-Language header)
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];
    
    if (cookieLocale) {
      return cookieLocale;
    }
    
    // Fallback to browser's language
    if (navigator.language) {
      return navigator.language;
    }
    
    return 'en-US'; // Final fallback
  });

  return locale;
}
