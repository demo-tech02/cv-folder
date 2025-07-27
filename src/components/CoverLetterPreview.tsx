import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { Loader2, Download, Eye, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

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
      if (!state?.session_id) return;
      
      // Debug logging
      console.log('Download state:', state);
      console.log('Session ID:', state.session_id);
      console.log('Cover letter filename:', state.cover_letter_filename);
      
      if (!state.cover_letter_filename || state.cover_letter_filename === 'undefined') {
        const errorMessage = language === 'ar' 
          ? 'اسم ملف خطاب التغطية مفقود' 
          : 'Cover letter filename is missing';
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        
        const API_BASE_URL = 'https://ai.cvaluepro.com/cover/download';
        
        // Use 'filename' parameter as expected by the API
        const downloadUrl = `${API_BASE_URL}?session_id=${state.session_id}&filename=${state.cover_letter_filename}`;
        console.log('Download URL:', downloadUrl);

        const response = await axios.get(downloadUrl, {
            responseType: 'blob',
            headers: {
              Accept: 'application/pdf',
            },
            timeout: 30000,
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(`${url}#toolbar=0&navpanes=0&view=FitH`);
      } catch (error: any) {
        console.error('Error downloading cover letter:', error);
        console.error('Error response:', error.response?.data);
        
        let errorMessage = language === 'ar' ? 'حدث خطأ في تحميل خطاب التغطية' : 'Error loading cover letter';
        
        if (error.response?.status === 422) {
          console.error('422 Error details:', error.response.data);
          errorMessage = language === 'ar' 
            ? 'بيانات خطاب التغطية غير صحيحة أو اسم الملف مفقود'
            : 'Invalid cover letter data or missing filename';
        } else if (error.code === 'ECONNABORTED') {
          errorMessage = language === 'ar'
            ? 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.'
            : 'Connection timeout. Please try again.';
        } else if (error.response?.status >= 500) {
          errorMessage = language === 'ar'
            ? 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.'
            : 'Server error. Please try again later.';
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
  }, [state, language]);

  const downloadPdf = () => {
    if (!isPaid) {
      setShowPaymentModal(true);
      return;
    }
    
    if (!pdfUrl) return;
    
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

      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mt-10">
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
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-8 h-8" />
            <h1 className="text-4xl font-bold">
              {language === 'ar' ? 'معاينة خطاب التغطية' : 'Cover Letter Preview'}
            </h1>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar'
              ? 'معاينة وتحميل خطاب التغطية الخاص بك'
              : 'Preview and download your cover letter'}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div
              className={`relative p-8 rounded-2xl ${
                isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white/80 border border-gray-200 shadow-xl'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
                  <div
                    className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-blue-300 animate-spin"
                    style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ar' ? 'جاري التحضير...' : 'Preparing Your Cover Letter...'}
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
              className={`relative p-8 rounded-2xl text-center ${
                isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <h3 className="text-xl font-semibold mb-2 text-red-600">
                {language === 'ar' ? 'حدث خطأ' : 'Error Occurred'}
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                {error}
              </p>
              <div className="flex gap-4 justify-center">
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
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-2xl overflow-hidden ${
                isDarkMode
                  ? 'bg-gray-900/50 border border-gray-800'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">
                      {language === 'ar' ? 'خطاب التغطية' : 'Cover Letter'}
                    </h2>
                  </div>
                  <button
                    onClick={downloadPdf}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      isDarkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">{language === 'ar' ? 'تحميل' : 'Download'}</span>
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div
                  className={`w-full h-[800px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
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