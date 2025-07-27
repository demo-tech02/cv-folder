import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Loader2, Download, Eye, ArrowLeft, FileText, AlertCircle, Smartphone, Monitor, ExternalLink } from 'lucide-react';

interface LocationState {
  session_id: string;
  cover_letter_filename: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount: number;
  isDarkMode: boolean;
  language: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount,
  isDarkMode,
  language
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const processPayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (in real app, this would be your payment API call)
      toast.success(language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment successful!');
      onPaymentSuccess();
      onClose();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(language === 'ar' ? 'فشل في الدفع. يرجى المحاولة مرة أخرى' : 'Payment failed. Please try again');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              {language === 'ar' ? 'الدفع الآمن' : 'Secure Payment'}
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {language === 'ar' ? 'المبلغ:' : 'Amount:'} ${amount}
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === 'ar' ? 'اسم حامل البطاقة' : 'Cardholder Name'}
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder={language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={language === 'ar' ? 'تاريخ الانتهاء' : 'MM/YY'}
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                maxLength={4}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={processPayment}
              disabled={isProcessing}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                </span>
              ) : (
                language === 'ar' ? 'دفع' : 'Pay'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile detection utility
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth < 768;
};

// iOS detection utility  
const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const CoverLetterPreview: React.FC = () => {
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

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

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
        
        const API_BASE_URL = 'https://13393172fc91.ngrok-free.app/download';
        
        // Encode the filename to handle special characters
        const encodedFilename = encodeURIComponent(state.cover_letter_filename);
        const downloadUrl = `${API_BASE_URL}?session_id=${state.session_id}&filename=${encodedFilename}`;
        
        console.log('Attempting to download from:', downloadUrl);

        const response = await axios.get(downloadUrl, {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf',
            'ngrok-skip-browser-warning': 'true'
          },
          timeout: 30000,
        });

        // Check if the response is actually a PDF
        if (!response.headers['content-type'].includes('application/pdf')) {
          throw new Error('Server did not return a PDF');
        }

        const blob = new Blob([response.data], { type: 'application/pdf' });
        setPdfBlob(blob);
        const url = URL.createObjectURL(blob);
        
        // For mobile devices, especially iOS, we need to handle PDF viewing differently
        if (isMobile) {
          setPdfUrl(url);
        } else {
          setPdfUrl(`${url}#toolbar=0&navpanes=0&view=FitH`);
        }
      } catch (error: any) {
        console.error('Error downloading cover letter:', error);
        
        // Try to read the error response if it's a blob
        if (error.response?.data instanceof Blob) {
          const errorData = await error.response.data.text();
          console.error('Error response content:', errorData);
        } else {
          console.error('Error response:', error.response?.data);
        }
        
        let errorMessage = language === 'ar' 
          ? 'حدث خطأ في تحميل خطاب التغطية' 
          : 'Error loading cover letter';
        
        if (error.response?.status === 404) {
          errorMessage = language === 'ar' 
            ? 'لم يتم العثور على ملف خطاب التغطية' 
            : 'Cover letter file not found';
        } else if (error.response?.status === 422) {
          errorMessage = language === 'ar' 
            ? 'بيانات غير صالحة لخطاب التغطية' 
            : 'Invalid cover letter data';
        } else if (error.message === 'Server did not return a PDF') {
          errorMessage = language === 'ar' 
            ? 'الملف الذي تم استلامه ليس ملف PDF صالحاً' 
            : 'The received file is not a valid PDF';
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
        URL.revokeObjectURL(pdfUrl.split('#')[0]);
      }
    };
  }, [state, language, isMobile]);

  const downloadPdf = () => {
    if (!isPaid) {
      setShowPaymentModal(true);
      return;
    }
    
    if (!pdfUrl || !pdfBlob) return;
    
    const link = document.createElement('a');
    link.href = pdfUrl.split('#')[0];
    link.download = 'cover-letter.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(language === 'ar' ? 'تم تحميل الملف بنجاح' : 'File downloaded successfully');
    
    // Redirect to home after successful download
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 2000);
  };

  const openPdfInNewTab = () => {
    if (!pdfUrl) return;

    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      toast.error(language === 'ar' 
        ? 'يرجى السماح للنوافذ المنبثقة لعرض الملف' 
        : 'Please allow pop-ups to view the file'
      );
      return;
    }

    // Add content to the new window
    newWindow.document.write(`
      <html>
        <head>
          <title>${language === 'ar' ? 'معاينة خطاب التغطية' : 'Cover Letter Preview'}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            /* Hide the "Edit" button in the PDF viewer */
            button[aria-label="Edit"] {
              display: none !important;
            }
          </style>
        </head>
        <body class="flex flex-col h-screen bg-black">
          <button 
            class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg m-4 w-20"
            onclick="window.close()"
          >
            ${language === 'ar' ? 'العودة' : 'Back'}
          </button>
          <iframe 
            src="${pdfUrl.split('#')[0]}#toolbar=0" 
            class="flex-grow w-full border-0"
          ></iframe>
        </body>
      </html>
    `);
  };

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
        language={language}
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
            <span className="font-medium">{language === 'ar' ? 'العودة' : 'Back'}</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-2xl md:text-4xl font-bold">
              {language === 'ar' ? 'معاينة خطاب التغطية' : 'Cover Letter Preview'}
            </h1>
          </div>
          <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'معاينة وتحميل خطاب التغطية الخاص بك'
              : 'Preview and download your cover letter'}
          </p>
        </div>

        {/* Device Type Indicator */}
        {pdfUrl && !isLoading && !error && (
          <div className={`mb-6 p-3 rounded-lg flex items-center gap-2 ${
            isDarkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-blue-50 text-blue-700'
          }`}>
            {isMobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            <span className="text-sm">
              {isMobile 
                ? (language === 'ar' ? 'جهاز محمول - انقر على "فتح في تبويب جديد" لأفضل عرض' : 'Mobile device - Click "Open in new tab" for best viewing')
                : (language === 'ar' ? 'سطح المكتب - معاينة كاملة متاحة' : 'Desktop - Full preview available')
              }
            </span>
          </div>
        )}

        {/* Loading State */}
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
                    {language === 'ar' ? 'جاري التحضير...' : 'Preparing Your Cover Letter...'}
                  </h3>
                  <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'ar'
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
                {language === 'ar' ? 'حدث خطأ' : 'Error Occurred'}
              </h3>
              <p className={`mb-6 text-sm md:text-base ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                </button>
                <button
                  onClick={handleBackClick}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 md:w-6 md:h-6" />
                    <h2 className="text-xl md:text-2xl font-bold">
                      {language === 'ar' ? 'خطاب التغطية' : 'Cover Letter'}
                    </h2>
                  </div>
                
                </div>
              </div>
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                {isMobile ? (
                  // Mobile-specific PDF handling
                  <div className={`w-full p-8 rounded-xl border-2 text-center transition-all duration-300 ${
                    isDarkMode
                      ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                      : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}>
                    <FileText className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="text-lg font-semibold mb-2">
                      {language === 'ar' ? 'خطاب التغطية جاهز' : 'Cover Letter Ready'}
                    </h3>
                    <p className={`mb-6 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'ar' 
                        ? 'اضغط على الأزرار أعلاه لعرض أو تحميل خطاب التغطية' 
                        : 'Use the buttons above to view or download your cover letter'}
                    </p>
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={openPdfInNewTab}
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        {language === 'ar' ? 'عرض الملف' : 'View File'}
                      </button>
                      <button
                        onClick={downloadPdf}
                        className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        {language === 'ar' ? 'تحميل الملف' : 'Download File'}
                      </button>
                    </div>
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
                      title="Cover Letter"
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
        amount={10}
        isDarkMode={isDarkMode}
        language={language}
      />

      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
};