import { Zap, Target, Award, CheckCircle, Users } from 'lucide-react';
import { Content } from '../types';

export const content: Record<'en' | 'ar', Content> = {
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
          description: "Enhance your resume with AI, tailored to Saudi hiring standards",
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