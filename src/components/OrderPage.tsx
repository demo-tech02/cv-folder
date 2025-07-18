import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';

export const OrderPage: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const currentContent = content[language];

  const getServiceContent = () => {
    switch (serviceType) {
      case 'cv':
        return currentContent.orderPage.cv;
      case 'linkedin':
        return currentContent.orderPage.linkedin;
      case 'cover-letter':
        return currentContent.orderPage.coverLetter;
      case 'bundle':
        return currentContent.orderPage.bundle;
      default:
        return currentContent.orderPage.cv;
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png'
      ];
      
      if (!validTypes.includes(file.type)) {
        toast.error(language === 'ar' 
          ? `نوع ملف غير صالح: ${file.name}. يرجى رفع ملفات PDF أو DOC أو DOCX أو TXT أو JPG أو PNG.`
          : `Invalid file type: ${file.name}. Please upload PDF, DOC, DOCX, TXT, JPG, or PNG files.`
        );
        return false;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(language === 'ar'
          ? `الملف كبير جداً: ${file.name}. الحد الأقصى للحجم هو 10 ميجابايت.`
          : `File too large: ${file.name}. Maximum size is 10MB.`
        );
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(language === 'ar'
        ? `تم إضافة ${validFiles.length} ملف بنجاح!`
        : `${validFiles.length} file(s) added successfully!`
      );
    }
  }, [language]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info(language === 'ar' ? 'تم حذف الملف' : 'File removed');
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error(language === 'ar' 
        ? 'يرجى تحديد ملف واحد على الأقل للرفع.'
        : 'Please select at least one file to upload.'
      );
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(language === 'ar'
        ? 'تم إرسال الطلب بنجاح! سنتواصل معك خلال 24 ساعة.'
        : 'Order submitted successfully! We will contact you within 24 hours.'
      );
      
      // Reset form
      setUploadedFiles([]);
      
      // Redirect to home after success
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      toast.error(language === 'ar'
        ? 'فشل في الرفع. يرجى المحاولة مرة أخرى.'
        : 'Upload failed. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (uploadedFiles.length > 0) {
      const confirmMessage = language === 'ar'
        ? 'هل أنت متأكد من الإلغاء؟ ستفقد جميع الملفات المرفوعة.'
        : 'Are you sure you want to cancel? All uploaded files will be lost.';
      
      if (window.confirm(confirmMessage)) {
        setUploadedFiles([]);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const serviceContent = getServiceContent();

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
          {/* Service Info */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {serviceContent.title}
            </h1>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              {serviceContent.description}
            </p>
          </div>

          {/* Upload Area */}
          <div className={`border-2 border-dashed rounded-2xl p-8 mb-8 transition-all duration-300 ${
            isDragActive 
              ? (isDarkMode ? 'border-white bg-gray-900' : 'border-black bg-gray-50')
              : (isDarkMode ? 'border-gray-600 hover:border-gray-400' : 'border-gray-300 hover:border-gray-500')
          }`}>
            <div {...getRootProps()} className="cursor-pointer text-center">
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-60" />
              <p className="text-lg mb-2">
                {currentContent.orderPage.uploadText}
              </p>
              <p className="text-sm opacity-60">
                {language === 'ar' 
                  ? 'الصيغ المدعومة: PDF، DOC، DOCX، TXT، JPG، PNG (حد أقصى 10 ميجابايت لكل ملف)'
                  : 'Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB each)'
                }
              </p>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className={`rounded-2xl p-6 mb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                {language === 'ar' ? 'الملفات المرفوعة' : 'Uploaded Files'}
              </h3>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm opacity-60">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCancel}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 border-2 ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white' 
                  : 'border-gray-300 text-gray-600 hover:border-gray-500 hover:text-black'
              }`}
            >
              {currentContent.orderPage.cancelButton}
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                isDarkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isUploading 
                ? (language === 'ar' ? 'جاري الرفع...' : 'Uploading...')
                : currentContent.orderPage.uploadButton
              }
            </button>
          </div>
        </div>
      </main>

      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  );
};