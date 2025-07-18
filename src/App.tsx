import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from './components/HomePage';
import { OrderPage } from './components/OrderPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order/:serviceType" element={<OrderPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? 'dark' : 'light'}
          toastStyle={{
            backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }}
        />
      </div>
    </Router>
  );
}

export default App;
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { SpecialOfferSection } from './components/SpecialOfferSection';
import DatabaseSection from './components/DatabaseSection'
import { AdvantagesSection } from './components/AdvantagesSection';
import SocialProofSection from './components/SocialProofSection'
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import { content } from './data/content';

function App() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const currentContent = content[language];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header
        isDarkMode={isDarkMode}
        language={language}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      <HeroSection
        content={currentContent.hero}
        isDarkMode={isDarkMode}
        language={language}
      />

      <ServicesSection
        content={currentContent.services}
        isDarkMode={isDarkMode}
        language={language}
      />

      <SpecialOfferSection
        content={currentContent.offer}
        isDarkMode={isDarkMode}
        language={language}
      />

      <DatabaseSection
        content={currentContent.database}
        isDarkMode={isDarkMode}
      />

      <AdvantagesSection
        content={currentContent.advantages}
        isDarkMode={isDarkMode}
      />

      <SocialProofSection
        content={currentContent.socialProof}
        isDarkMode={isDarkMode}
      />

      <Footer
        isDarkMode={isDarkMode}
        language={language}
      />
    </div>
  );
}

export default App;