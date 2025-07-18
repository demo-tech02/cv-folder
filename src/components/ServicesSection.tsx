import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content, Language } from '../types';

interface ServicesSectionProps {
  content: Content['services'];
  isDarkMode: boolean;
  language: Language;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  content,
  isDarkMode,
  language
}) => {
  const navigate = useNavigate();

  const handleOrderClick = (serviceType: string) => {
    navigate(`/order/${serviceType}`);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg opacity-80">{content.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {content.items.map((service, index) => (
            <div key={index} className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="opacity-80 mb-6">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{service.price}</span>
                <button 
                  onClick={() => handleOrderClick(index === 0 ? 'cv' : index === 1 ? 'linkedin' : 'cover-letter')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  {language === 'en' ? 'Order Now' : 'اطلب الآن'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};