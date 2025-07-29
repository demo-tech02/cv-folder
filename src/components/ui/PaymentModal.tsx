/**
 * Payment Modal Component
 * Reusable payment modal for handling payments
 */

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader2, X, CreditCard, Shield, Lock } from 'lucide-react';
import { formatCardNumber, formatExpiryDate, sleep } from '../../utils/helpers';
import { validatePaymentForm } from '../../utils/validation';
import { PAYMENT_CONFIG } from '../../constants';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  amount?: number;
  resumeType?: 'classic' | 'modern';
  isDarkMode: boolean;
  language: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  amount = PAYMENT_CONFIG.DEFAULT_AMOUNT,
  resumeType,
  isDarkMode,
  language
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    let processedValue = value;
    
    if (field === 'cardNumber') {
      processedValue = formatCardNumber(value);
      if (processedValue.length > 19) return;
    } else if (field === 'expiryDate') {
      processedValue = formatExpiryDate(value);
      if (processedValue.length > 5) return;
    } else if (field === 'cvv') {
      processedValue = value.replace(/[^0-9]/g, '');
      if (processedValue.length > 4) return;
    }
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
  };

  const processPayment = async () => {
    const validation = validatePaymentForm(formData);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await sleep(2000);
      
      // Simulate different payment scenarios
      const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
      const lastDigit = cardNumberClean.slice(-1);
      
      // Simulate 90% success rate
      if (lastDigit === '0') {
        throw new Error('Payment declined by bank');
      }
      
      toast.success(language === 'ar' ? 'تم الدفع بنجاح!' : 'Payment successful!');
      onPaymentSuccess();
      onClose();
      
      // Reset form
      setFormData({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      });
      
    } catch (error) {
      console.error('Payment error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Payment failed';
      
      if (errorMessage.includes('declined')) {
        toast.error(language === 'ar' ? 'تم رفض الدفع من البنك' : 'Payment declined by bank');
      } else {
        toast.error(language === 'ar' ? 'فشل في الدفع. يرجى المحاولة مرة أخرى' : 'Payment failed. Please try again');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl ${
        isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'
      }`}>
        <button
          onClick={onClose}
          disabled={isProcessing}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold">
              {language === 'ar' ? 'الدفع الآمن' : 'Secure Payment'}
            </h2>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'ar' 
              ? `دفع $${amount} ${resumeType ? `لتحميل السيرة الذاتية ${resumeType === 'classic' ? 'الكلاسيكية' : 'العصرية'}` : ''}`
              : `Pay $${amount} ${resumeType ? `to download your ${resumeType} resume` : ''}`
            }
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar' ? 'اسم حامل البطاقة' : 'Cardholder Name'}
            </label>
            <input
              type="text"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              disabled={isProcessing}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-black focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
              placeholder={language === 'ar' ? 'أدخل اسم حامل البطاقة' : 'Enter cardholder name'}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {language === 'ar' ? 'رقم البطاقة' : 'Card Number'}
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', e.target.value)}
              disabled={isProcessing}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-black focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
              </label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                disabled={isProcessing}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-black focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'ar' ? 'رمز الأمان' : 'CVV'}
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value)}
                disabled={isProcessing}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-black focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20`}
                placeholder="123"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-green-600">
          <Shield className="w-4 h-4" />
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === 'ar' ? 'محمي بتشفير SSL 256-bit' : '256-bit SSL Encrypted'}
          </span>
        </div>

        <button
          onClick={processPayment}
          disabled={isProcessing || !isFormValid}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            isProcessing || !isFormValid
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              <span>{language === 'ar' ? `ادفع $${amount}` : `Pay $${amount}`}</span>
            </div>
          )}
        </button>

        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p className="text-sm font-medium">
                {language === 'ar' ? 'جاري معالجة الدفع...' : 'Processing payment...'}
              </p>
              <p className="text-xs opacity-75 mt-1">
                {language === 'ar' ? 'يرجى عدم إغلاق هذه النافذة' : 'Please do not close this window'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};