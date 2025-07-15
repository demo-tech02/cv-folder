import React, { useState } from 'react';
import { Menu, Sun, Moon, Star, CheckCircle, Users, Zap, Target, Award, MessageSquare, ExternalLink } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const content = {
    en: {
      hero: {
        title: "Get Noticed. Get Hired.",
        subtitle: "Enhance your CV, elevate your LinkedIn, and craft the perfect Cover Letter.",
        keywords: ["Career", "Professional", "CV", "Development", "Talent", "Personalize", "LinkedIn", "Professional", "Standout", "Showcase", "ATS-Friendly", "Growth"]
      },
      services: {
        title: "Our Services",
        subtitle: "Professional services tailored to boost your career prospects",
        items: [
          {
            title: "CV Enhancement",
            description: "Transform your resume with AI-powered optimization aligned with Saudi hiring standards",
            price: "299 SAR"
          },
          {
            title: "LinkedIn Profile Optimization",
            description: "Maximize your professional presence with strategic profile enhancement",
            price: "199 SAR"
          },
          {
            title: "Cover Letter Creation",
            description: "Craft compelling cover letters that capture employers' attention",
            price: "149 SAR"
          }
        ]
      },
      offer: {
        title: "Special Bundle Offer",
        description: "CV Enhancement + LinkedIn Optimization",
        originalPrice: "498 SAR",
        discountedPrice: "399 SAR",
        savings: "Save 99 SAR"
      },
      database: {
        title: "Our Talent Database",
        subtitle: "By purchasing any of our services, you will automatically be added to our exclusive database shared with HR professionals and companies."
      },
      advantages: {
        title: "Platform Advantages",
        items: [
          {
            icon: Zap,
            title: "Fast Delivery",
            description: "Quick turnaround without compromising quality"
          },
          {
            icon: Target,
            title: "AI-Powered Services",
            description: "Trained on Saudi hiring standards and market requirements"
          },
          {
            icon: Award,
            title: "High Accuracy & Personalization",
            description: "Tailored content that reflects your unique professional story"
          },
          {
            icon: CheckCircle,
            title: "Professional Formatting",
            description: "Industry-standard layouts that impress recruiters"
          },
          {
            icon: Users,
            title: "Job Market-Aligned Content",
            description: "Content optimized for current market demands"
          }
        ]
      },
      socialProof: {
        title: "What People Are Saying",
        posts: [
          {
            author: "Sarah Al-Rashid",
            role: "HR Director @ Tech Solutions KSA",
            content: "CValue has revolutionized how we discover talent. Their database consistently delivers high-quality candidates.",
            platform: "LinkedIn"
          },
          {
            author: "Ahmed Hassan",
            role: "Recruitment Manager @ Global Corp",
            content: "The CVs coming through CValue are exceptionally well-crafted. It's clear they understand our hiring standards.",
            platform: "Twitter"
          },
          {
            author: "Fatima Al-Zahra",
            role: "Talent Acquisition Lead",
            content: "CValue's LinkedIn optimization service helped our company find the perfect candidates faster than ever.",
            platform: "LinkedIn"
          }
        ]
      }
    },
    ar: {
      hero: {
        title: "اجعل نفسك ملاحظاً. احصل على وظيفة.",
        subtitle: "عزز سيرتك الذاتية، ارفع مستوى لينكد إن، واكتب خطاب التغطية المثالي.",
        keywords: ["مهنة", "محترف", "سيرة ذاتية", "تطوير", "موهبة", "شخصي", "لينكد إن", "محترف", "مميز", "عرض", "متوافق مع ATS", "نمو"]
      },
      services: {
        title: "خدماتنا",
        subtitle: "خدمات مهنية مصممة لتعزيز فرصك المهنية",
        items: [
          {
            title: "تحسين السيرة الذاتية",
            description: "حول سيرتك الذاتية بتحسين مدعوم بالذكاء الاصطناعي متوافق مع معايير التوظيف السعودية",
            price: "299 ريال"
          },
          {
            title: "تحسين ملف لينكد إن",
            description: "اعظم حضورك المهني مع تحسين الملف الشخصي الاستراتيجي",
            price: "199 ريال"
          },
          {
            title: "إنشاء خطاب التغطية",
            description: "اكتب خطابات تغطية مقنعة تجذب انتباه أصحاب العمل",
            price: "149 ريال"
          }
        ]
      },
      offer: {
        title: "عرض الحزمة الخاصة",
        description: "تحسين السيرة الذاتية + تحسين لينكد إن",
        originalPrice: "498 ريال",
        discountedPrice: "399 ريال",
        savings: "وفر 99 ريال"
      },
      database: {
        title: "قاعدة بيانات المواهب لدينا",
        subtitle: "بشراء أي من خدماتنا، ستتم إضافتك تلقائياً إلى قاعدة البيانات الحصرية التي نشاركها مع المهنيين في الموارد البشرية والشركات."
      },
      advantages: {
        title: "مزايا المنصة",
        items: [
          {
            icon: Zap,
            title: "تسليم سريع",
            description: "إنجاز سريع دون التنازل عن الجودة"
          },
          {
            icon: Target,
            title: "خدمات مدعومة بالذكاء الاصطناعي",
            description: "مدربة على معايير التوظيف السعودية ومتطلبات السوق"
          },
          {
            icon: Award,
            title: "دقة عالية وتخصيص",
            description: "محتوى مخصص يعكس قصتك المهنية الفريدة"
          },
          {
            icon: CheckCircle,
            title: "تنسيق مهني",
            description: "تخطيطات بمعايير الصناعة تؤثر على المسؤولين عن التوظيف"
          },
          {
            icon: Users,
            title: "محتوى متوافق مع سوق العمل",
            description: "محتوى محسّن لمتطلبات السوق الحالية"
          }
        ]
      },
      socialProof: {
        title: "ما يقوله الناس",
        posts: [
          {
            author: "سارة الراشد",
            role: "مديرة الموارد البشرية @ حلول التقنية السعودية",
            content: "سي فاليو غيرت كيفية اكتشافنا للمواهب. قاعدة بياناتهم تقدم باستمرار مرشحين عالي الجودة.",
            platform: "LinkedIn"
          },
          {
            author: "أحمد حسن",
            role: "مدير التوظيف @ الشركة العالمية",
            content: "السير الذاتية القادمة من سي فاليو مصممة بشكل استثنائي. من الواضح أنهم يفهمون معايير التوظيف لدينا.",
            platform: "Twitter"
          },
          {
            author: "فاطمة الزهراء",
            role: "قائدة اكتساب المواهب",
            content: "خدمة تحسين لينكد إن من سي فاليو ساعدت شركتنا في العثور على المرشحين المثاليين أسرع من أي وقت مضى.",
            platform: "LinkedIn"
          }
        ]
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              CV
            </div>
            <span className="text-xl font-bold">CValue</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-md transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {currentContent.hero.title}
            </h1>
            <p className="text-lg md:text-xl mb-12 opacity-80">
              {currentContent.hero.subtitle}
            </p>
            
            {/* Interactive Keywords */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {currentContent.hero.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-105 ${
                    index === 0 ? (isDarkMode ? 'bg-white text-black' : 'bg-black text-white') : 
                    (isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-black hover:bg-gray-200')
                  }`}
                >
                  {keyword}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              {language === 'en' ? 'Get Started' : 'ابدأ الآن'}
            </button>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.services.title}</h2>
            <p className="text-lg opacity-80">{currentContent.services.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.services.items.map((service, index) => (
              <div key={index} className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="opacity-80 mb-6">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <button className={`px-6 py-2 rounded-lg font-semibold transition-colors ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                    {language === 'en' ? 'Order Now' : 'اطلب الآن'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl text-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h2 className="text-3xl font-bold mb-4">{currentContent.offer.title}</h2>
            <p className="text-lg mb-6">{currentContent.offer.description}</p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-2xl line-through opacity-60">{currentContent.offer.originalPrice}</span>
              <span className="text-4xl font-bold">{currentContent.offer.discountedPrice}</span>
            </div>
            <p className="text-green-500 font-semibold mb-8">{currentContent.offer.savings}</p>
            <button className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              {language === 'en' ? 'Get Bundle Offer' : 'احصل على العرض المجمع'}
            </button>
          </div>
        </div>
      </section>

      {/* Database Enrollment */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className={`max-w-4xl mx-auto p-8 rounded-2xl text-center border-2 ${isDarkMode ? 'border-white bg-gray-900' : 'border-black bg-gray-50'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{currentContent.database.title}</h2>
            <p className="text-lg leading-relaxed opacity-90">
              {currentContent.database.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Platform Advantages */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.advantages.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.advantages.items.map((advantage, index) => (
              <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <advantage.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="opacity-80">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{currentContent.socialProof.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.socialProof.posts.map((post, index) => (
              <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm opacity-80">{post.role}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-60" />
                </div>
                <p className="opacity-90 mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-60">{post.platform}</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current opacity-60" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
              CV
            </div>
            <span className="text-xl font-bold">CValue</span>
          </div>
          <p className="opacity-80">
            {language === 'en' ? 'Empowering careers, one profile at a time.' : 'تمكين المهن، ملف واحد في كل مرة.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;