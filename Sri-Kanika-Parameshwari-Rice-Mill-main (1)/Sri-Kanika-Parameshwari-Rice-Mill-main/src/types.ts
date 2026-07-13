/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  tamilName: string;
  tagline: string;
  category: 'aged' | 'boiled' | 'steamed' | 'premium';
  description: string;
  features: string[];
  specs: {
    moisture: string;
    brokenGrains: string;
    grainLength: string;
    sortingAccuracy: string;
    shelfLife: string;
  };
  packSizes: string[]; // e.g., ["5kg", "10kg", "25kg", "75kg"]
  image: string;
  isPopular?: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  tamilTitle: string;
  description: string;
  techInvolved: string;
  impact: string;
  iconName: string; // Used to map to Lucide icons
}

export interface Certification {
  id: string;
  title: string;
  authority: string;
  year: string;
  iconName: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tamilTitle: string;
  category: 'mill' | 'fields' | 'heritage' | 'products';
  imageUrl: string;
  description: string;
}

export interface DealerEnquiryInput {
  businessName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  gstin?: string;
  expectedVolume: string; // e.g., "5-10 Tons", "10-25 Tons", etc.
  preferredProducts: string[];
  message?: string;
}

export interface ContactInput {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}
