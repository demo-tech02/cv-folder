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
}

export type Language = 'en' | 'ar';