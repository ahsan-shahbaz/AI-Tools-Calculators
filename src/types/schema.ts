export type SchemaType = 'FAQPage' | 'Article' | 'Product' | 'LocalBusiness' | 'HowTo';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface SchemaFormData {
  type: SchemaType;
  // FAQ
  faqs: FAQItem[];
  // Article
  headline: string;
  authorName: string;
  publisherName: string;
  datePublished: string;
  articleDescription: string;
  articleImage: string;
  // Product
  productName: string;
  productImage: string;
  productDescription: string;
  brand: string;
  sku: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  ratingValue: number;
  reviewCount: number;
  // LocalBusiness
  businessName: string;
  businessType: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  telephone: string;
  businessUrl: string;
  priceRange: string;
  // HowTo
  howToName: string;
  howToDescription: string;
  totalTime: string;
  steps: HowToStep[];
}
