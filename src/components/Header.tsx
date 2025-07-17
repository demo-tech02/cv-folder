import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  language: Language;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  language,
  toggleDarkMode,
  toggleLanguage
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
            CV
          </div>
          <span className="text-xl font-bold">CValue</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <button
            onClick={toggleLanguage}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-md transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
        </div>
      </div>
    </header>
  );
};