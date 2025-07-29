export interface Service {
  title: string;
  description: string;
  price: string;
}

export interface Offer {
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  savings: string;
}

export interface Advantage {
  icon: any;
  title: string;
  description: string;
}

export interface SocialPost {
  author: string;
  role: string;
  content: string;
  platform: string;
}

export interface Content {
  hero: {
    title: string;
    subtitle: string;
    keywords: string[];
  };
  services: {
    title: string;
    subtitle: string;
    items: Service[];
  };
  offer: Offer;
  database: {
    title: string;
    subtitle: string;
  };
  advantages: {
    title: string;
    items: Advantage[];
  };
  socialProof: {
    title: string;
    posts: SocialPost[];
  };
  orderPage: {
    cv: {
      title: string;
      description: string;
    };
    linkedin: {
      title: string;
      description: string;
    };
    coverLetter: {
      title: string;
      description: string;
    };
    bundle: {
      title: string;
      description: string;
    };
    uploadText: string;
    uploadButton: string;
    cancelButton: string;
  };
  downloadPage: {
    title: string;
    subtitle: string;
    classicTitle: string;
    modernTitle: string;
    downloadButton: string;
    backButton: string;
    processingMessage: string;
    successMessage: string;
  };
}

export interface UploadResponse {
  session_id: string;
  classic_resume_url: string;
  modern_resume_url: string;
}

export type Language = 'ar' | 'en';
