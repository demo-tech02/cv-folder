/**
 * Theme Context
 * Provides theme state and controls throughout the application
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { STORAGE_KEYS } from '../constants';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      return savedTheme === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  const value: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};