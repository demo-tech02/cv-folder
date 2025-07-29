import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Loader2, Download, Eye, ArrowLeft, FileText, AlertCircle, Smartphone, Monitor, ExternalLink } from 'lucide-react';
import { CoverLetterApiService } from '../apis';
import { PaymentModal } from './ui/PaymentModal';
import { isMobileDevice, isIOS, downloadFile, createObjectURL, revokeObjectURL } from '../utils/helpers';
import { PAYMENT_CONFIG } from '../constants';

interface LocationState {
  session_id: string;
  cover_letter_filename: string;
}


export function CoverLetterPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [mobileImageUrl, setMobileImageUrl] = useState<string | null>(null);
  const [mobileImageLoading, setMobileImageLoading] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Fetch image for mobile preview
  useEffect(() => {
    if (isMobile && state?.session_id && state?.cover_letter_filename) {
      setMobileImageLoading(true);
      const fetchMobileImage = async () => {
        try {
          const images = await CoverLetterApiService.getCoverLetterImages(
            String(state.session_id),
            state.cover_letter_filename
          );
          
          if (images.length > 0) {
            setMobileImageUrl(images[0]);
          } else {
            setMobileImageUrl(null);
          }
        } catch (error) {
          console.error('Error fetching mobile image:', error);
          setMobileImageUrl(null);
        } finally {
          setMobileImageLoading(false);
        }
      };
      fetchMobileImage();
    } else {
      setMobileImageUrl(null);
      setMobileImageLoading(false);
    }
  }, [isMobile, state]);

  useEffect(() => {
    if (!state || !state.session_id || !state.cover_letter_filename) {
      console.error('Missing data:', { 
        session_id: state?.session_id, 
        cover_letter_filename: state?.cover_letter_filename 
      });
      toast.error(language === 'ar' ? 'لم يتم العثور على معلومات خطاب التغطية' : 'Cover letter information not found');
      navigate('/');
    }
  }, [state, navigate, language]);

  useEffect(() => {
    const downloadCoverLetter = async () => {
      if (!state?.session_id) {
        const errorMessage = language === 'ar' 
          ? 'معرف الجلسة مفقود' 
          : 'Session ID is missing';
        setError(errorMessage);
        toast.error(errorMessage);
        navigate('/');
        return;
      }

      // Better filename validation
      if (!state.cover_letter_filename || state.cover_letter_filename === 'undefined' || state.cover_letter_filename === 'null') {
        const errorMessage = language === 'ar' 
          ? 'اسم ملف خطاب التغطية مفقود أو غير صالح' 
          : 'Cover letter filename is missing or invalid';
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const blob = await CoverLetterApiService.downloadCoverLetter(
          state.session_id,
          state.cover_letter_filename
        );
        
        setPdfBlob(blob);
        const url = createObjectURL(blob);
        
        // For mobile devices, especially iOS, we need to handle PDF viewing differently
        if (isMobile) {
          setPdfUrl(url);
        } else {
          setPdfUrl(`${url}#toolbar=0&navpanes=0&view=FitH`);
        }
      } catch (error: any) {
        console.error('Error downloading cover letter:', error);

        let errorMessage = language === 'ar' 
          ? 'حدث خطأ في تحميل خطاب التغطية' 
          : 'Error loading cover letter';
        
        if (error instanceof Error) {
          if (error.message.includes('not found')) {
            errorMessage = language === 'ar' 
              ? 'لم يتم العثور على ملف خطاب التغطية' 
              : 'Cover letter file not found';
          } else if (error.message.includes('invalid')) {
            errorMessage = language === 'ar' 
              ? 'بيانات غير صالحة لخطاب التغطية' 
              : 'Invalid cover letter data';
          } else if (error.message.includes('PDF')) {
            errorMessage = language === 'ar' 
              ? 'الملف الذي تم استلامه ليس ملف PDF صالحاً' 
              : 'The received file is not a valid PDF';
          }
        }

        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    downloadCoverLetter();

    return () => {
      if (pdfUrl) {
        revokeObjectURL(pdfUrl.split('#')[0]);
      }
    };
  }, [state, language, isMobile]);

  const downloadPdf = async () => {
    if (!isPaid) {
      setShowPaymentModal(true);
      return;
    }
    // Download PDF for both mobile and desktop
    if (!pdfUrl || !pdfBlob) return;
    downloadFile(pdfUrl, 'cover-letter.pdf');
    toast.success(language === 'ar' ? 'تم تحميل الملف بنجاح' : 'File downloaded successfully');
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  };

  // fetchImages removed, now handled in downloadPdf for mobile

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    downloadPdf();
  };

  const handleBackClick = () => {
    navigate('/', { replace: true });
  };

  const handleRetry = () => {
    setError('');
    setIsLoading(true);
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-black via-gray-900 to-black text-white'
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-black'
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        language={String(language)}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className={`group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600'
                : 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow'
            }`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">{String(language) === 'ar' ? 'العودة' : 'Back'}</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-2xl md:text-4xl font-bold">
              {String(language) === 'ar' ? 'معاينة خطاب التغطية' : 'Cover Letter Preview'}
            </h1>
          </div>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {String(language) === 'ar'
              ? 'معاينة وتحميل خطاب التغطية الخاص بك'
              : 'Preview and download your cover letter'}
          </p>
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div
              className={`relative p-6 md:p-8 rounded-2xl ${
                isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white/80 border border-gray-200 shadow-xl'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin text-blue-500" />
                  <div
                    className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-transparent border-t-blue-300 animate-spin"
                    style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {String(language) === 'ar' ? 'جاري التحضير...' : 'Preparing Your Cover Letter...'}
                  </h3>
                  <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {String(language) === 'ar'
                      ? 'نقوم بإعداد خطاب التغطية الخاص بك'
                      : 'We\'re preparing your cover letter'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div
              className={`relative p-6 md:p-8 rounded-2xl text-center ${
                isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-red-600">
                {String(language) === 'ar' ? 'حدث خطأ' : 'Error Occurred'}
              </h3>
              <p className={`mb-6 text-sm md:text-base ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {String(language) === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                </button>
                <button
                  onClick={handleBackClick}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {String(language) === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Preview */}
        {pdfUrl && !isLoading && !error && (
          <div className="w-full max-w-4xl mx-auto">
            <div
              className={`rounded-2xl overflow-hidden ${
                isDarkMode
                  ? 'bg-gray-900/50 border border-gray-800'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
           <div className="p-4 md:p-6 pb-4">
  <div className="flex sm:flex-row flex-col justify-between items-center gap-4 mb-4">
    <div className="flex items-center gap-3">
      <FileText className="w-5 h-5 md:w-6 md:h-6" />
      <h2 className="text-xl md:text-2xl font-bold">
        {String(language) === 'ar' ? 'خطاب التغطية' : 'Cover Letter'}
      </h2>
    </div>
    <button
      onClick={downloadPdf}
      className="px-6 py-2 rounded-full bg-black text-white font-semibold shadow-lg opacity-90 hover:opacity-100 transition-all"
      style={{ minWidth: '120px' }}
    >
      {String(language) === 'ar' ? 'تحميل الملف' : 'Download File'}
    </button>
  </div>
</div>
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                {isMobile ? (
                  // Mobile-specific image preview with download button overlay
                  <div className={`relative w-full p-8 rounded-xl border-2 text-center transition-all duration-300 ${
                    isDarkMode
                      ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}>
                    {mobileImageLoading ? (
                      <div className="flex flex-col items-center justify-center min-h-[200px]">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {String(language) === 'ar' ? 'جاري تحميل المعاينة...' : 'Loading preview...'}
                        </p>
                      </div>
                    ) : mobileImageUrl ? (
                      <>
                        {/* Download button overlay */}
                       
                        <img src={mobileImageUrl} alt="Cover Letter Preview" className="w-full h-auto max-h-[60vh] object-contain rounded mb-4 mt-10" />
                        
                      </>
                    ) : null}
                  </div>
                ) : (
                  // Desktop iframe viewer
                  <div
                    className={`w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      isDarkMode
                        ? 'border-gray-700 hover:border-gray-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <iframe 
                      src={pdfUrl} 
                      className="w-full h-full border-0" 
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        amount={PAYMENT_CONFIG.DEFAULT_AMOUNT}
        isDarkMode={isDarkMode}
        language={typeof language === 'string' ? language : 'ar'}
      />

      <Footer isDarkMode={isDarkMode} language={typeof language === 'string' ? language : 'ar'} />
    </div>
  );
};