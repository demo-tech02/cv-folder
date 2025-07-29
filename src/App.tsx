import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from './routes';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Toast Container Component
const ToastContainerWrapper: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
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
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <AppRouter />
          <ToastContainerWrapper />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;