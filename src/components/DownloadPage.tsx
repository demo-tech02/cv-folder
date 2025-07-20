import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Download, ArrowLeft, FileText, Sparkles } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';
import { UploadResponse } from '../types';

export const DownloadPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  
  const uploadData = location.state as UploadResponse;
  const currentContent = content[language];

  // Redirect if no upload data
  React.useEffect(() => {
    if (!uploadData) {
      navigate('/');
    }
  }, [uploadData, navigate]);

  if (!uploadData) {
    return null;
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      toast.info(currentContent.downloadPage.processingMessage);
      
      // Extract filename from URL
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const sessionId = urlParams.get('session_id');
      const fileParam = urlParams.get('filename');
      
      if (!sessionId || !fileParam) {
        throw new Error('Invalid download URL');
      }

      console.log('Downloading file:', fileParam);
      console.log('Session ID:', sessionId);
      
      // Make API call to download using axios
      const response = await axios.get('/download', {
        params: {
          session_id: sessionId,
          filename: fileParam
        },
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf',
        }
      });

      console.log('Download response received');

      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success(currentContent.downloadPage.successMessage);
    } catch (error) {
      console.error('Download error:', error);
      
      let errorMessage = language === 'ar' 
        ? 'فشل في تحميل الملف. يرجى المحاولة مرة أخرى.'
        : 'Failed to download file. Please try again.';
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = language === 'ar'
            ? `خطأ في تحميل الملف: ${error.response.status}`
            : `Download failed: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = language === 'ar'
            ? 'لا يمكن الوصول إلى الخادم'
            : 'Cannot reach server';
        }
      }
      
      toast.error(errorMessage);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header
        isDarkMode={isDarkMode}
        language={language}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentContent.downloadPage.backButton}</span>
            </button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Sparkles className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {currentContent.downloadPage.title}
            </h1>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              {currentContent.downloadPage.subtitle}
            </p>
          </div>

          {/* Download Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Classic Resume */}
            <div className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700 hover:border-gray-500' 
                : 'bg-gray-50 border-gray-200 hover:border-gray-400'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {currentContent.downloadPage.classicTitle}
                </h3>
                <p className="opacity-80 mb-6">
                  {language === 'ar' 
                    ? 'تصميم تقليدي ومهني مناسب لجميع الصناعات'
                    : 'Traditional and professional design suitable for all industries'
                  }
                </p>
                <button
                  onClick={() => handleDownload(uploadData.classic_resume_url, 'classic_resume.pdf')}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>{currentContent.downloadPage.downloadButton}</span>
                </button>
              </div>
            </div>

            {/* Modern Resume */}
            <div className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-700 hover:border-gray-500' 
                : 'bg-gray-50 border-gray-200 hover:border-gray-400'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-4 rounded-full mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {currentContent.downloadPage.modernTitle}
                </h3>
                <p className="opacity-80 mb-6">
                  {language === 'ar' 
                    ? 'تصميم عصري وجذاب مثالي للصناعات الإبداعية والتقنية'
                    : 'Modern and attractive design perfect for creative and tech industries'
                  }
                </p>
                <button
                  onClick={() => handleDownload(uploadData.modern_resume_url, 'modern_resume.pdf')}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Download className="w-5 h-5" />
                  <span>{currentContent.downloadPage.downloadButton}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`mt-12 p-6 rounded-2xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <p className="opacity-80">
              {language === 'ar' 
                ? 'تم حفظ ملفاتك لمدة 30 يوماً. يمكنك العودة وتحميلها في أي وقت خلال هذه الفترة.'
                : 'Your files are saved for 30 days. You can return and download them anytime during this period.'
              }
            </p>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
};