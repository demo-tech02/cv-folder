import React from 'react';
import { Content, Language } from '../types';

interface HeroSectionProps {
  content: Content['hero'];
  isDarkMode: boolean;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  isDarkMode,
  language
}) => {
  return (
    <section className=" md:pt-24 pt-16 min-h-screen pb-16 px-4 ">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight mt-20">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl mb-12 opacity-80">
            {content.subtitle}
          </p>
          
          {/* Interactive Keywords */}
         <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-xl mx-auto">
  {content.keywords.map((keyword, index) => (
    <span
      key={index}
      className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} 
        hover:bg-black hover:text-white`}
    >
      {keyword}
    </span>
  ))}
</div>

        </div>
      </div>
    </section>
  );
};