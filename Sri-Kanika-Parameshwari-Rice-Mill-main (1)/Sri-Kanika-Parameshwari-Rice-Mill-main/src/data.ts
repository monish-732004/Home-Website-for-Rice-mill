/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProcessStep, Certification, GalleryItem } from './types';
import prod10 from './assets/products/product1/3.jpg.jpeg';
import prod11 from './assets/products/product1/4.jpg.jpeg';
import prod12 from './assets/products/product1/Screenshot 2026-07-11 013147.png';
import prod2 from './assets/products/product2/1.jpeg';

export const APP_INFO = {
  name: 'Sri Kannika Parameswari Modern Rice Mill',
  tamilName: 'ஸ்ரீ கன்னிகா பரமேஸ்வரி மாடர்ன் ரைஸ் மில்',
  foundedYear: '1992',
  location: 'SRI KANNIKA PARAMESWARI MODERN RICE MILL, 134, PERIYAYE KOVIL ROAD, THACHUR POST, KALLAKURICHI, KALLAKURICHI DT, 606202',
  phone: '9944360308',
  altPhone: '9442284994',
  email: 'srikannika.ricemill@gmail.com',
  enquiryEmail: 'srikannika.ricemill@gmail.com',
  workingHours: 'Mon - Sat: 8:00 AM - 7:00 PM',
  aboutBrief: 'Located in Thachur, Kallakurichi—we blend decades of agricultural wisdom with state-of-the-art Bühler color-sorting technology to deliver rice of unparalleled purity, aroma, and taste.',
  gst: '33ACFPV4181Q1ZX',
  fssai: '12417031001138',
  taglineTa: 'மனதை மயக்கும் சுவை',
  taglineEn: 'Royal taste that touches your heart',
  mapsLink: 'https://maps.app.goo.gl/iZSd48N45J8Pvh2Y8',
};

export const PRODUCTS: Product[] = [
  {
    id: 'ponni-premium',
    name: 'Kannika Parameshwari Modern Rice Supreme Golden Ponni Rice (Aged)',
    tamilName: 'கன்னிகா சுப்ரீம் பொன்னி அரிசி (பழையது)',
    tagline: 'The epitome of traditional premium flavor, aged to perfection.',
    category: 'premium',
    description: 'Our flagship product, sourced directly from the fertile Cauvery delta. Naturally aged for 12 to 18 months, ensuring non-sticky, fluffy grains that expand up to 2.5x upon cooking. Perfect for daily meals and grand feasts alike.',
    features: [
      '100% naturally aged for 12-18 months',
      'Extremely fluffy texture with distinct grain separation',
      'Rich in natural nutrition and low glycemic index',
      'Delightful traditional aroma of rural Tamil Nadu'
    ],
    specs: {
      moisture: '12% - 13.5%',
      brokenGrains: 'Less than 1.5%',
      grainLength: 'Average 5.2mm to 5.5mm',
      sortingAccuracy: '99.9% Optical Sorter Purity',
      shelfLife: '24 Months'
    },
    packSizes: ['5 kg', '10 kg', '25 kg', '75 kg'],
    image: prod10,
    isPopular: true,
  },
  // {
  //   id: 'ponni-boiled',
  //   name: 'Kannika Double Polished Boiled Rice',
  //   tamilName: 'கன்னிகா டபுள் பாலிஷ்டு புழுங்கல் அரிசி',
  //   tagline: 'Double polished for spotless purity and excellent nutrition.',
  //   category: 'boiled',
  //   description: 'Prepared using our specialized steam-soaking and multi-stage drying system. Double-polished using imported state-of-the-art mist polishers, giving every grain a pearlescent white finish while keeping the healthy bran layers intact.',
  //   features: [
  //     'Steam-tempered for maximum starch stability',
  //     'Zero black grains or yellow tips',
  //     'Highly digestible and ideal for standard South Indian meals',
  //     'High cooking yield'
  //   ],
  //   specs: {
  //     moisture: '13% - 14%',
  //     brokenGrains: 'Less than 2%',
  //     grainLength: 'Average 5.0mm',
  //     sortingAccuracy: '99.8% Optical Sorter Purity',
  //     shelfLife: '18 Months'
  //   },
  //   packSizes: ['10 kg', '25 kg', '75 kg'],
  //   image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800',
  // },
  // {
  //   id: 'ponni-steam',
  //   name: 'Kannika Crystal Premium Steam Rice',
  //   tamilName: 'கன்னிகா கிரிஸ்டல் பிரீமியம் ஸ்டீம் அரிசி',
  //   tagline: 'Lightweight, rapid-cooking grains perfect for hotels and catering.',
  //   category: 'steamed',
  //   description: 'Subjected to high-pressure steam treatment before milling, locking in essential vitamins and minerals. Offers excellent expansion rates and stands holding heat for long durations, making it the preferred choice for commercial kitchens, hotels, and bulk caterers.',
  //   features: [
  //     'High water-absorption and superior cooking expansion',
  //     'Maintains quality and texture for up to 6 hours after cooking',
  //     'Processed under completely hands-free hygienic conditions',
  //     'Excellent cost-to-volume value'
  //   ],
  //   specs: {
  //     moisture: '11.5% - 12.5%',
  //     brokenGrains: 'Less than 1%',
  //     grainLength: 'Average 5.4mm',
  //     sortingAccuracy: '99.95% Trichromatic Sorter Purity',
  //     shelfLife: '18 Months'
  //   },
  //   packSizes: ['25 kg', '50 kg', '75 kg'],
  //   image: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?q=80&w=800',
  //   isPopular: false,
  // },
  {
    id: 'sona-masoori',
    name: 'Rajapogam Kichadi Ponni rice',
    tamilName: 'ராஜபோகம் கிச்சடி பொன்னி அரிசி',
    tagline: 'Aromatic, ultra-slender grains with premium softness.',
    category: 'aged',
    description: 'Sourced from selected high-yield farms of the river basin, this lightweight, aromatic medium-grain raw rice is processed under low temperatures. Ideal for traditional South Indian variety rice dishes (Lemon, Tamarind, Coconut) and daily consumption.',
    features: [
      'Ultra-slender light grain profile',
      'Soft and sweet cooking finish',
      'Low starch content, highly recommended for health-conscious meals',
      'Completely stone-free and dust-free'
    ],
    specs: {
      moisture: '12% Max',
      brokenGrains: 'Less than 2.5%',
      grainLength: 'Average 4.8mm to 5.0mm',
      sortingAccuracy: '99.7% Optical Sorter Purity',
      shelfLife: '12 Months'
    },
    packSizes: ['5 kg', '10 kg', '25 kg'],
    image: prod2,
    isPopular: true,
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Delta Harvesting & Selection',
    tamilTitle: 'டெல்டா அறுவடை மற்றும் தேர்வு',
    description: 'We source raw paddy exclusively from verified traditional farmers in the Thanjavur and Cauvery basin during kuruvai and samba seasons. Our agronomists test soil parameters and crop health to ensure only premium grains enter our inventory.',
    techInvolved: 'Digital Moisture Meters & Grain Calipers',
    impact: 'Ensures uniform grain size, rich mineral content, and authentic delta taste.',
    iconName: 'Sprout'
  },
  {
    stepNumber: 2,
    title: 'Pre-cleaning & Gentle De-stoning',
    tamilTitle: 'நெல் சுத்தம் செய்தல் & கல் நீக்குதல்',
    description: 'The paddy undergoes triple-pass pre-cleaning to eliminate dust, chaff, and straws. Heavy-duty magnetic separators extract metal particles, while state-of-the-art vibratory de-stoners remove even the smallest pebbles.',
    techInvolved: 'Bühler Closed-Loop Vibratory Separators',
    impact: '100% dust-free, stone-free paddy ready for optimal husking.',
    iconName: 'ShieldAlert'
  },
  {
    stepNumber: 3,
    title: 'Pneumatic Husking & Separation',
    tamilTitle: 'நெல் உமி நீக்குதல் & பிரித்தல்',
    description: 'Under controlled pneumatic pressure, the outer husk is cracked open without damaging the delicate inner grain or germ. Multi-deck paddy separators then isolate the unhusked paddy from brown rice with pinpoint accuracy.',
    techInvolved: 'Rubber Roll Husker with Automatic Feed Controller',
    impact: 'Reduces grain breakage during milling to less than 1%.',
    iconName: 'Settings2'
  },
  {
    stepNumber: 4,
    title: 'Multi-Stage Whitening & Mist Polishing',
    tamilTitle: 'பாலிஷிங் & பளபளப்பாக்குதல்',
    description: 'Brown rice is gently polished in three separate stages to prevent thermal stress. Superfine mist polishers inject purified atomized water vapor, which crystallizes the natural starch layer, giving our rice its signature pearly white glaze.',
    techInvolved: 'Japanese Satake Mist Polishers',
    impact: 'Exceptional visual polish, dust-free dry handling, and extended shelf life.',
    iconName: 'Sparkles'
  },
  {
    stepNumber: 5,
    title: 'Bühler Trichromatic Optical Color Sorting',
    tamilTitle: 'புளூ கலர் சார்ட்டிங் (நிறம் பிரித்தல்)',
    description: 'The absolute pinnacle of our facility. Millions of rice grains pass in front of ultra-high-speed trichromatic cameras every second. Advanced AI algorithms detect and blast away yellowed grains, chalky segments, or microscopic specks using precise compressed air nozzles.',
    techInvolved: 'Bühler Sortex S Sorter with High-Definition CCD Cameras',
    impact: 'Unmatched 99.99% purity. Spotless, uniform grains in every single pack.',
    iconName: 'Cpu'
  },
  {
    stepNumber: 6,
    title: 'Automated Hygenic Bagging',
    tamilTitle: 'தானியங்கி சுகாதார பேக்கிங்',
    description: 'Our rice is never touched by human hands after polishing. High-precision computerized scales measure exact weights, dispensing them into food-grade laminated bags. They are vacuum sealed or stitched securely to preserve freshness.',
    techInvolved: 'Load-cell Automated Electronic Packing Lines',
    impact: 'Complete safety, airtight moisture barrier, and guaranteed weight precision.',
    iconName: 'Boxes'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'iso-22000',
    title: 'ISO 22000:2018',
    authority: 'International Food Safety Standard',
    year: 'Certified Since 2016',
    iconName: 'Award',
    description: 'Demonstrates our implementation of a comprehensive food safety management system covering all stages of procurement, milling, storage, and supply.'
  },
  {
    id: 'fssai',
    title: 'FSSAI Central License',
    authority: 'Food Safety and Standards Authority of India',
    year: 'Active License No: 12417031001138',
    iconName: 'FileCheck',
    description: 'Fully licensed and audited for meeting the stringent national hygiene, sanitation, and safety metrics established for premium FMCG production.'
  },
  {
    id: 'agmark',
    title: 'AGMARK Grade A',
    authority: 'Directorate of Marketing & Inspection, Govt of India',
    year: 'Gold Quality Rating',
    iconName: 'ShieldCheck',
    description: 'National certification confirming that our Ponni rice varieties strictly adhere to the highest grade parameters for size, moisture, polish percentage, and organic purity.'
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Lush Tanjore Paddy Fields',
    tamilTitle: 'தஞ்சை நெல் வயல்கள்',
    category: 'fields',
    imageUrl: 'https://images.unsplash.com/photo-1621394988863-117a9fc6e77f?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Our partner farms in the fertile river plains, bathed in early morning golden light.'
  },
  // {
  //   id: 'g-2',
  //   title: 'Bühler Optical Color Sorters',
  //   tamilTitle: 'புளூ கலர் சார்ட்டர் இயந்திரம்',
  //   category: 'mill',
  //   imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600',
  //   description: 'Our ultra-high-speed optical sorters purifying rice grains hands-free.'
  // },
  // {
  //   id: 'g-3',
  //   title: 'Golden Grain Falling',
  //   tamilTitle: 'தங்க நெல் மணிகள்',
  //   category: 'heritage',
  //   imageUrl: 'https://images.unsplash.com/photo-1574321024048-4e50d720de5a?q=80&w=600',
  //   description: 'The golden harvest representing abundance and centuries of Tamil farming legacy.'
  // },
  // {
  //   id: 'g-4',
  //   title: 'Modern Laboratory Testing',
  //   tamilTitle: 'தர கட்டுப்பாட்டு ஆய்வகம்',
  //   category: 'mill',
  //   imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306dca665?q=80&w=600',
  //   description: 'Testing moisture, elongation ratio, and thermal traits before approval.'
  // },
  // {
  //   id: 'g-5',
  //   title: 'Pristine Storage Silos',
  //   tamilTitle: 'நெல் சேமிப்பு கிடங்கு',
  //   category: 'mill',
  //   imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600',
  //   description: 'Temperature and moisture controlled storage towers ensuring grain health.'
  // },
  // {
  //   id: 'g-6',
  //   title: 'Premium Retail Packs',
  //   tamilTitle: 'சில்லறை விற்பனை பேக்குகள்',
  //   category: 'products',
  //   imageUrl: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=600',
  //   description: 'Finished Kannika packs stacked in clean racks, ready to feed families across India.'
  // }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'S. Rajendran',
    role: 'Wholesale Rice Dealer, Chennai',
    quote: 'We have been partner-dealers with Sri Kannika Parameswari Rice Mill for over 15 years. Their grain consistency is stellar—never a single stone, zero chalky rice, and high-yielding Ponni. Our customers buy their bags blindly.',
  },
  {
    id: 't-2',
    name: 'Meenakshi Sundaram',
    role: 'Home Cook, Madurai',
    quote: 'The aged Ponni rice from Kannika is a staple in our home. When cooked, the grains stay long, separate, and beautifully fluffy. It takes me back to my grandmother’s kitchen in Kumbakonam.',
  },
  {
    id: 't-3',
    name: 'Chef K. Arumugam',
    role: 'Executive Chef, Saravana Grand, Trichy',
    quote: 'For catering and high-volume meals, moisture consistency is everything. Sri Kannika’s Steam Rice expands incredibly, handles hot chafing dishes for hours, and never clumps. Highly recommended.',
  }
];
