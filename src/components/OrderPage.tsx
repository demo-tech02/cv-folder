import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Upload, X, FileText, CheckCircle, ArrowLeft } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { content } from '../data/content';


interface UploadResponse {
  session_id: string;
  classic_resume_url?: string;
  modern_resume_url?: string;
  file_name?: string;
}

export const OrderPage: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null);

  // Cover letter extra fields
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const currentContent = content[language as unknown as 'ar' | 'en'];

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
      const validTypes = ['application/pdf'];
      
      if (!validTypes.includes(file.type)) {
        toast.error(String(language) === 'ar' 
          ? `نوع ملف غير صالح: ${file.name}. يرجى رفع ملفات PDF فقط.`
          : `Invalid file type: ${file.name}. Please upload PDF files only.`
        );
        return false;
      }
      
      if (file.size > 30 * 1024 * 1024) { // 30MB limit
        toast.error(String(language) === 'ar'
          ? `الملف كبير جداً: ${file.name}. الحد الأقصى للحجم هو 30 ميجابايت.`
          : `File too large: ${file.name}. Maximum size is 30MB.`
        );
        return false;
      }
      
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(String(language) === 'ar'
        ? `تم إضافة ${validFiles.length} ملف بنجاح!`
        : `${validFiles.length} file(s) added successfully!`
      );
    }
  }, [language]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info(String(language) === 'ar' ? 'تم حذف الملف' : 'File removed');
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      toast.error(String(language) === 'ar'
        ? 'يرجى تحديد ملف واحد على الأقل للرفع.'
        : 'Please select at least one file to upload.'
      );
      return;
    }

    // For cover-letter, check required fields
    if (serviceType === 'cover-letter') {
      if (!company || !location || !jobTitle || !jobDescription) {
        toast.error(String(language) === 'ar'
          ? 'يرجى ملء جميع حقول الوظيفة.'
          : 'Please fill in all job details fields.'
        );
        return;
      }
    }

    setIsUploading(true);
    
    try {
      // API base URL and endpoint selection based on serviceType
      let API_BASE_URL = 'https://c96c42b5f820.ngrok-free.app';
      let uploadEndpoint = '/upload-resume';
      if (serviceType === 'cover-letter') {
        API_BASE_URL = 'https://ai.cvaluepro.com/cover';
        uploadEndpoint = '/generate-cover-letter';
      }

      // First check if the server is healthy
      console.log('Checking server health...');
      try {
        const healthCheck = await axios.get(`${API_BASE_URL}/health-check`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json'
          },
          timeout: 10000 // 10 second timeout for health check
        });
        console.log('Health check response:', healthCheck);
      } catch (healthError) {
        console.error('Health check failed:', healthError);
        throw new Error('Server health check failed');
      }

      // If we get here, server is healthy, proceed with upload
      const formData = new FormData();
      const file = uploadedFiles[0];
      formData.append('file', file, file.name); // Include filename explicitly

      // For cover-letter, append extra fields
      if (serviceType === 'cover-letter') {
        formData.append('file', file, file.name); // Explicitly add file as parameter
        formData.append('company', company);
        formData.append('location', location);
        formData.append('job_title', jobTitle);
        formData.append('job_description', jobDescription);
      }

      console.log('File being uploaded:', uploadedFiles[0]);
      console.log('Uploading to:', `${API_BASE_URL}${uploadEndpoint}`);
      for (let pair of formData.entries()) {
        console.log('FormData content:', pair[0], pair[1]);
      }

      const uploadURL = `${API_BASE_URL}${uploadEndpoint}`;
      console.log('Attempting upload to:', uploadURL);

      const response = await axios.post(uploadURL, formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'ngrok-skip-browser-warning': 'true',
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 60000, // Increased timeout to 60 seconds
        withCredentials: false,
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const responseData: UploadResponse = response.data;
      setUploadResponse(responseData);

      // Navigate to preview page with response data
      if (serviceType === 'cover-letter') {
        // Log the response data to debug
        console.log('Response data:', responseData);
        
        navigate('/cover-letter-preview', {
          state: {
            session_id: responseData.session_id,
            cover_letter_filename: responseData.file_name
          }
        });
      } else {
        navigate('/preview', {
          state: {
            sessionId: responseData.session_id,
            classicResumeUrl: responseData.classic_resume_url,
            modernResumeUrl: responseData.modern_resume_url
          }
        });
      }

      toast.success(String(language) === 'ar'
        ? 'تم رفع الملف بنجاح!'
        : 'File uploaded successfully!'
      );
    } catch (error: any) {
      let errorMessage = String(language) === 'ar' 
        ? 'فشل في الرفع. يرجى المحاولة مرة أخرى.' 
        : 'Upload failed. Please try again.';

      if (axios.isAxiosError(error)) {
        // Log the complete error details
        console.error('Full error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: error.config,
          url: error.config?.url,
          message: error.message
        });
        
        // Log the raw error for debugging
        console.error('Raw error object:', error);

        // Check if it's a health check error
        if (error.config?.url?.includes('/health-check')) {
          errorMessage = String(language) === 'ar'
            ? 'الخادم غير متاح حالياً. يرجى المحاولة مرة أخرى لاحقاً.'
            : 'Server is currently unavailable. Please try again later.';
        } else if (error.code === 'ECONNREFUSED') {
          errorMessage = String(language) === 'ar'
            ? 'لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك.'
            : 'Cannot connect to server. Please check your internet connection.';
        } else if (error.response) {
          // Server responded with an error status
          const statusMessage = error.response.data?.message || error.response.statusText;
          errorMessage = String(language) === 'ar'
            ? `خطأ في الخادم: ${error.response.status} - ${statusMessage}`
            : `Server error: ${error.response.status} - ${statusMessage}`;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = String(language) === 'ar'
            ? 'لم يتم تلقي استجابة من الخادم'
            : 'No response received from server';
        }
      }

      toast.error(errorMessage);
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    if (uploadedFiles.length > 0) {
      const confirmMessage = String(language) === 'ar'
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

  const handleBack = () => {
    navigate('/');
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
              <span>{String(language) === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>

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
                {String(language) === 'ar'
                  ? 'الصيغ المدعومة: PDF فقط (حد أقصى 10 ميجابايت)'
                  : 'Supported format: PDF only (Max 10MB)'
                }
              </p>
            </div>
          </div>


          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className={`rounded-2xl p-6 mb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                {String(language) === 'ar' ? 'الملفات المرفوعة' : 'Uploaded Files'}
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

          {/* Cover Letter Extra Fields */}
          {serviceType === 'cover-letter' && (
            <div className={`rounded-2xl p-6 mb-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {String(language) === 'ar' ? 'تفاصيل الوظيفة' : 'Job Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">
                    {String(language) === 'ar' ? 'اسم الشركة' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    placeholder={String(language) === 'ar' ? 'ادخل اسم الشركة' : 'Enter company name'}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    {language === 'ar' ? 'موقع الشركة' : 'Company Location'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    placeholder={language === 'ar' ? 'ادخل موقع الشركة' : 'Enter company location'}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    placeholder={language === 'ar' ? 'ادخل المسمى الوظيفي' : 'Enter job title'}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">
                    {language === 'ar' ? 'وصف الوظيفة' : 'Job Description'}
                  </label>
                  <textarea
                    rows={4}
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border focus:outline-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'}`}
                    placeholder={language === 'ar' ? 'ادخل وصف الوظيفة' : 'Enter job description'}
                  />
                </div>
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