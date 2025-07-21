"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "../hooks/useTheme"
import { useLanguage } from "../hooks/useLanguage"
import { Loader2, Download, Eye, ArrowLeft, FileText, Sparkles } from "lucide-react"

interface LocationState {
  sessionId: string
  classicResumeUrl: string
  modernResumeUrl: string
}

export const PreviewPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [classicPdfUrl, setClassicPdfUrl] = useState<string>("")
  const [modernPdfUrl, setModernPdfUrl] = useState<string>("")
  const [activePreview, setActivePreview] = useState<"classic" | "modern">("classic")

  // Redirect to home if no state is available
  useEffect(() => {
    if (!state || !state.sessionId) {
      toast.error(language === "ar" ? "لم يتم العثور على معلومات السيرة الذاتية" : "Resume information not found")
      navigate("/")
    }
  }, [state, navigate, language])

  useEffect(() => {
    const downloadResumes = async () => {
      try {
        const API_BASE_URL = "https://c96c42b5f820.ngrok-free.app"

        // Download Classic Resume
        const classicResponse = await axios.get(
          `${API_BASE_URL}/download?session_id=${state.sessionId}&filename=${state.classicResumeUrl}`,
          {
            responseType: "blob",
            headers: {
              "ngrok-skip-browser-warning": "true",
              Accept: "application/pdf",
            },
          },
        )
        
        const classicBlob = new Blob([classicResponse.data], { type: "application/pdf" })
        const classicUrl = URL.createObjectURL(classicBlob)
        // Add parameters to hide PDF controls but allow scrolling
        setClassicPdfUrl(`${classicUrl}#toolbar=0&navpanes=0&view=FitH`)

        // Download Modern Resume
        const modernResponse = await axios.get(
          `${API_BASE_URL}/download?session_id=${state.sessionId}&filename=${state.modernResumeUrl}`,
          {
            responseType: "blob",
            headers: {
              "ngrok-skip-browser-warning": "true",
              Accept: "application/pdf",
            },
          },
        )
        const modernBlob = new Blob([modernResponse.data], { type: "application/pdf" })
        const modernUrl = URL.createObjectURL(modernBlob)
        // Add parameters to hide PDF controls but allow scrolling
        setModernPdfUrl(`${modernUrl}#toolbar=0&navpanes=0&view=FitH`)

        setIsLoading(false)
      } catch (error) {
        console.error("Error downloading resumes:", error)
        toast.error(language === "ar" ? "حدث خطأ في تحميل السير الذاتية" : "Error loading resumes")
        setIsLoading(false)
      }
    }

    if (state?.sessionId) {
      downloadResumes()
    }

    // Cleanup function to revoke object URLs
    return () => {
      if (classicPdfUrl) URL.revokeObjectURL(classicPdfUrl.split("#")[0])
      if (modernPdfUrl) URL.revokeObjectURL(modernPdfUrl.split("#")[0])
    }
  }, [state])

  const downloadPdf = (url: string, filename: string) => {
    const link = document.createElement("a")
    // Remove the hash parameters for download
    link.href = url.split("#")[0]
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackClick = () => {
    navigate("/", { replace: true })
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-white via-gray-50 to-white text-black"
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
                ? "bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600"
                : "bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow"
            }`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">{language === "ar" ? "العودة" : "Back"}</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-8 h-8" />
            <h1 className="text-4xl font-bold">{language === "ar" ? "معاينة السيرة الذاتية" : "Resume Preview"}</h1>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {language === "ar"
              ? "اختر النموذج المفضل لديك وقم بتحميله"
              : "Choose your preferred template and download it"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div
              className={`relative p-8 rounded-2xl ${
                isDarkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white/80 border border-gray-200 shadow-xl"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Loader2 className="w-16 h-16 animate-spin text-gray-400" />
                  <div
                    className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-current animate-spin"
                    style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "ar" ? "جاري التحضير..." : "Preparing Your Resumes..."}
                  </h3>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "ar"
                      ? "نقوم بإعداد سيرتك الذاتية بأفضل جودة"
                      : "We're crafting your resumes with the highest quality"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Desktop View - Side by Side */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8">
              {/* Classic Resume */}
              <div
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/50 border border-gray-800 hover:border-gray-700"
                    : "bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6" />
                      <h2 className="text-2xl font-bold">
                        {language === "ar" ? "النموذج الكلاسيكي" : "Classic Template"}
                      </h2>
                    </div>
                    <button
                      onClick={() => downloadPdf(classicPdfUrl, "classic-resume.pdf")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-medium">{language === "ar" ? "تحميل" : "Download"}</span>
                    </button>
                  </div>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "ar"
                      ? "تصميم أنيق ومهني للوظائف التقليدية"
                      : "Clean and professional design for traditional roles"}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div
                    className={`w-full h-[700px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-700 group-hover:border-gray-600"
                        : "border-gray-200 group-hover:border-gray-300"
                    }`}
                  >
                    <iframe src={classicPdfUrl} className="w-full h-full border-0" title="Classic Resume" />
                  </div>
                </div>
              </div>

              {/* Modern Resume */}
              <div
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/50 border border-gray-800 hover:border-gray-700"
                    : "bg-white border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6" />
                      <h2 className="text-2xl font-bold">{language === "ar" ? "النموذج العصري" : "Modern Template"}</h2>
                    </div>
                    <button
                      onClick={() => downloadPdf(modernPdfUrl, "modern-resume.pdf")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-medium">{language === "ar" ? "تحميل" : "Download"}</span>
                    </button>
                  </div>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "ar"
                      ? "تصميم معاصر وإبداعي للوظائف الحديثة"
                      : "Contemporary and creative design for modern roles"}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div
                    className={`w-full h-[700px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-700 group-hover:border-gray-600"
                        : "border-gray-200 group-hover:border-gray-300"
                    }`}
                  >
                    <iframe src={modernPdfUrl} className="w-full h-full border-0" title="Modern Resume" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet View - Tabbed Interface */}
            <div className="lg:hidden">
              {/* Tab Buttons */}
              <div className={`flex rounded-xl p-1 mb-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <button
                  onClick={() => setActivePreview("classic")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activePreview === "classic"
                      ? isDarkMode
                        ? "bg-white text-black shadow-lg"
                        : "bg-black text-white shadow-lg"
                      : isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === "ar" ? "كلاسيكي" : "Classic"}</span>
                </button>
                <button
                  onClick={() => setActivePreview("modern")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activePreview === "modern"
                      ? isDarkMode
                        ? "bg-white text-black shadow-lg"
                        : "bg-black text-white shadow-lg"
                      : isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === "ar" ? "عصري" : "Modern"}</span>
                </button>
              </div>

              {/* Active Preview */}
              <div
                className={`rounded-2xl overflow-hidden ${
                  isDarkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200 shadow-lg"
                }`}
              >
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">
                      {activePreview === "classic"
                        ? language === "ar"
                          ? "النموذج الكلاسيكي"
                          : "Classic Template"
                        : language === "ar"
                          ? "النموذج العصري"
                          : "Modern Template"}
                    </h2>
                    <button
                      onClick={() =>
                        downloadPdf(
                          activePreview === "classic" ? classicPdfUrl : modernPdfUrl,
                          `${activePreview}-resume.pdf`,
                        )
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-medium">{language === "ar" ? "تحميل" : "Download"}</span>
                    </button>
                  </div>
                  <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {activePreview === "classic"
                      ? language === "ar"
                        ? "تصميم أنيق ومهني للوظائف التقليدية"
                        : "Clean and professional design for traditional roles"
                      : language === "ar"
                        ? "تصميم معاصر وإبداعي للوظائف الحديثة"
                        : "Contemporary and creative design for modern roles"}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div
                    className={`w-full h-[600px] rounded-xl overflow-hidden border-2 ${
                      isDarkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    <iframe
                      src={activePreview === "classic" ? classicPdfUrl : modernPdfUrl}
                      className="w-full h-full border-0"
                      title={`${activePreview} Resume`}
                    />
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        )}
      </main>

      <Footer isDarkMode={isDarkMode} language={language} />
    </div>
  )
}
