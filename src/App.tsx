import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage } from './components/HomePage';
import { OrderPage } from './components/OrderPage';
import { PreviewPage } from './components/PreviewPage';
import { CoverLetterPreview } from './components/CoverLetterPreview';
import { useTheme } from './hooks/useTheme';


function App() {
  const { isDarkMode } = useTheme();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/order/:serviceType" element={<OrderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/cover-letter-preview" element={<CoverLetterPreview />} />
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