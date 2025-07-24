"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { Language } from "../types"

interface LocationState {
  session_id: string;
  cover_letter_filename: string;
}
import axios from "axios"
import { toast } from "react-toastify"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "../hooks/useTheme"
import { useLanguage } from "../hooks/useLanguage"
import { Loader2, Download, Eye, ArrowLeft, FileText } from "lucide-react"

interface LocationState {
  session_id: string
  cover_letter_filename: string
}

export const CoverLetterPreview: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState<string>("")

  // Redirect to home if no state is available
  useEffect(() => {
    if (!state || !state.session_id || !state.cover_letter_filename) {
      console.error("Missing data:", { 
        session_id: state?.session_id, 
        cover_letter_filename: state?.cover_letter_filename 
      })
      toast.error(String(language) === "ar" ? "لم يتم العثور على معلومات خطاب التغطية" : "Cover letter information not found")
      navigate("/")
    }
  }, [state, navigate, language])

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const downloadCoverLetter = async () => {
      try {
        setIsLoading(true);
        const API_BASE_URL = "https://ai.cvaluepro.com/resume/download"

        const response = await axios.get(
          `${API_BASE_URL}?session_id=${state.session_id}&cover_letter_filename=${state.cover_letter_filename}`,
          {
            responseType: "blob",
            headers: {
              Accept: "application/pdf",
            },
          },
        )
        const blob = new Blob([response.data], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
        // Add parameters to hide PDF controls but allow scrolling
        setPdfUrl(`${url}#toolbar=0&navpanes=0&view=FitH`)

        setIsLoading(false)
      } catch (error: any) {
        console.error("Error downloading cover letter:", error);
        
        // Log more detailed error information
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }

        let errorMessage = String(language) === "ar" ? "حدث خطأ في تحميل خطاب التغطية" : "Error loading cover letter";
        
        if (error.response?.status === 422) {
          errorMessage = String(language) === "ar" 
            ? "بيانات خطاب التغطية غير صحيحة"
            : "Invalid cover letter data";
        }

        toast.error(errorMessage);
        setIsLoading(false);
      }
    }

    if (state?.session_id) {
      downloadCoverLetter()
    }

    // Cleanup function to revoke object URLs
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl.split("#")[0])
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
            <span className="font-medium">{String(language) === "ar" ? "العودة" : "Back"}</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Eye className="w-8 h-8" />
            <h1 className="text-4xl font-bold">
              {String(language) === "ar" ? "معاينة خطاب التغطية" : "Cover Letter Preview"}
            </h1>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            {String(language) === "ar"
              ? "معاينة وتحميل خطاب التغطية الخاص بك"
              : "Preview and download your cover letter"}
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
                    {String(language) === "ar" ? "جاري التحضير..." : "Preparing Your Cover Letter..."}
                  </h3>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {String(language) === "ar"
                      ? "نقوم بإعداد خطاب التغطية الخاص بك"
                      : "We're preparing your cover letter"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-2xl overflow-hidden ${
                isDarkMode
                  ? "bg-gray-900/50 border border-gray-800"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    <h2 className="text-2xl font-bold">
                      {String(language) === "ar" ? "خطاب التغطية" : "Cover Letter"}
                    </h2>
                  </div>
                  <button
                    onClick={() => downloadPdf(pdfUrl, "cover-letter.pdf")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isDarkMode ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">{String(language) === "ar" ? "تحميل" : "Download"}</span>
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div
                  className={`w-full h-[800px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <iframe src={pdfUrl} className="w-full h-full border-0" title="Cover Letter" />
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
