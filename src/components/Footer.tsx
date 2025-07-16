import React from 'react';
import { Language } from '../types';

interface FooterProps {
  isDarkMode: boolean;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode, language }) => {
  return (
    <footer className={`py-12 px-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
            CV
          </div>
          <span className="text-xl font-bold">CValue</span>
        </div>
        <p className="opacity-80">
          {language === 'en' ? 'Empowering careers, one profile at a time.' : 'تمكين المهن، ملف واحد في كل مرة.'}
        </p>
      </div>
    </footer>
  );
};