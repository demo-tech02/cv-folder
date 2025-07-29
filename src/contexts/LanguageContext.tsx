/**
 * Language Context
 * Provides language state and controls throughout the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { STORAGE_KEYS } from '../constants';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguageDirectly: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language;
      return savedLanguage || 'ar';
    }
    return 'ar';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    root.setAttribute('lang', language);
    root.setAttribute('dir', 'ltr');
    
    root.classList.remove('lang-ar', 'lang-en');
    root.classList.add(`lang-${language}`);
    
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const setLanguageDirectly = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    setLanguageDirectly,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};