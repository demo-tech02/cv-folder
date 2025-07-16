import React from 'react';
import { Content, Language } from '../types';

interface SpecialOfferSectionProps {
  content: Content['offer'];
  isDarkMode: boolean;
  language: Language;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  content,
  isDarkMode,
  language
}) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className={`max-w-4xl mx-auto p-8 rounded-2xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg mb-6">{content.description}</p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-2xl line-through opacity-60">{content.originalPrice}</span>
            <span className="text-4xl font-bold">{content.discountedPrice}</span>
          </div>
          <p className="text-green-500 font-semibold mb-8">{content.savings}</p>
          <button className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
            {language === 'en' ? 'Get Bundle Offer' : 'احصل على العرض المجمع'}
          </button>
        </div>
      </div>
    </section>
  );
};