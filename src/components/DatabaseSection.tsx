import React from 'react';
import { Content } from '../types';

interface DatabaseSectionProps {
  content: Content['database'];
  isDarkMode: boolean;
}

export const DatabaseSection: React.FC<DatabaseSectionProps> = ({
  content,
  isDarkMode
}) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className={`max-w-4xl mx-auto p-8 rounded-2xl text-center border-2 ${isDarkMode ? 'border-white bg-gray-900' : 'border-black bg-gray-50'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.title}</h2>
          <p className="text-lg leading-relaxed opacity-90">
            {content.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};