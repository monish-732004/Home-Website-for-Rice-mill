/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ProcessStep, Certification, GalleryItem } from './types';
import prod10 from './assets/products/product1/3.jpg.jpeg';
import prod11 from './assets/products/product1/4.jpg.jpeg';
import prod12 from './assets/products/product1/Screenshot 2026-07-11 013147.png';
import processDeltaHarvesting from './assets/process/Delta harvesting.png';
import processPreCleaning from './assets/process/Pre Cleaning.png';
import processPneumaticHusking from './assets/process/pneumatic harvesting.png';
import processMultiStagePolishing from './assets/process/Multi husting.png';
import processTrichromaticSorting from './assets/process/Trichromatic.png';
import processBagging from './assets/process/Bagging.png';
import mambazhamRealBag from './assets/Just dial/Individual rice bag.png';
import goldFishBag from './assets/Just dial/Gold fish.png';
import littleGaneshBag from './assets/Just dial/Little ganesh Brand.png';
import princeBag from './assets/Just dial/Prince.png';
import imayamBrownRiceBag from './assets/Just dial/imyam.png';
import authorizedPhoto from './assets/Just dial/Authorized.png';
import riceMillsPhoto from './assets/Just dial/Rice Mills.png';
import millSilosPhoto from './assets/Just dial/mill.png';
import paddyFieldPhoto from './assets/Just dial/paddy.png';
import riceBagsStackedPhoto from './assets/Just dial/Rice bags.png';

export const APP_INFO = {
  name: 'Sri Kannika Parameswari Modern Rice Mill',
  tamilName: 'ஸ்ரீ கன்னிகா பரமேஸ்வரி மாடர்ன் ரைஸ் மில்',
  foundedYear: '2011',
  location: '134, Periyaye Kovil Road, Thachur Post, Kallakurichi, Kallakurichi Dt, Tamil Nadu - 606202',
  mapsUrl: 'https://share.google/9BhsrGM7miHf5E4Du',
  phone: '+91 99443 60308',
  altPhone: '+91 94422 84994',
  email: 'info@kannikaricemill.com',
  enquiryEmail: 'dealers@kannikaricemill.com',
  gstNumber: '33ACFPV4181Q1ZX',
  workingHours: 'Mon - Sun: 9:00 AM - 6:00 PM',
  aboutBrief: 'Based in Kallakurichi, Tamil Nadu, we blend centuries-old agricultural wisdom with state-of-the-art Bühler color-sorting technology to deliver rice of unparalleled purity, aroma, and taste.',
};

export const PRODUCTS: Product[] = [
  {
    id: 'ponni-premium',
    name: 'Kannika Parameshwari Modern Rice Supreme Golden Ponni Rice (Aged)',
    tamilName: 'கன்னிகா சுப்ரீம் பொன்னி அரிசி (பழையது)',
    tagline: 'The epitome of traditional Tanjore flavor, aged to perfection.',
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
    image: mambazhamRealBag,
    isPopular: true,
  },
  {
    id: 'gold-fish',
    name: 'Gold Fish Brand No.1 Premium Rice',
    tamilName: 'தங்கமீன் பிராண்டு பிரீமியம் அரிசி',
    tagline: 'Our No.1 Sortex-cleaned premium rice, trusted across Kallakurichi households.',
    category: 'premium',
    description: 'Packed under our Gold Fish brand at the Kallakurichi facility, this Sortex-cleaned premium rice runs through the same Bühler optical sorting line as our flagship Ponni, delivering consistent, stone-free grains for everyday cooking.',
    features: [
      'Sortex optically-cleaned for zero stones and impurities',
      'PVM quality-marked packaging',
      'Trusted No.1 premium rice branding',
      'Milled and packed at our Kallakurichi facility'
    ],
    specs: {
      moisture: '12% Max',
      brokenGrains: 'Less than 2.5%',
      grainLength: 'Average 4.8mm to 5.0mm',
      sortingAccuracy: '99.7% Optical Sorter Purity',
      shelfLife: '12 Months'
    },
    packSizes: ['25 kg'],
    image: goldFishBag,
    isPopular: true,
  },
  {
    id: 'little-ganesh',
    name: 'Little Ganesh Brand No.1 Rajabogam',
    tamilName: 'லிட்டில் கணேஷ் பிராண்டு ராஜபோகம் அரிசி',
    tagline: 'Sortex-cleaned Rajabogam rice, a household favourite.',
    category: 'aged',
    description: 'Our Little Ganesh brand Rajabogam rice is Sortex-cleaned and packed at our Kallakurichi facility, offering the same reliable grain quality our regular customers have trusted for years.',
    features: [
      'Sortex-cleaned, stone-free grains',
      'PVM quality-marked packaging',
      'No.1 Rajabogam variety',
      'Milled and packed at our Kallakurichi facility'
    ],
    specs: {
      moisture: '12% Max',
      brokenGrains: 'Less than 2.5%',
      grainLength: 'Average 4.8mm to 5.0mm',
      sortingAccuracy: '99.7% Optical Sorter Purity',
      shelfLife: '12 Months'
    },
    packSizes: ['25 kg'],
    image: littleGaneshBag,
  },
  {
    id: 'prince',
    name: 'Prince Brand No.1 Thidam Rice',
    tamilName: 'பிரின்ஸ் பிராண்டு திடம் அரிசி',
    tagline: 'Sortex-cleaned Thidam rice with dependable everyday quality.',
    category: 'aged',
    description: 'Our Prince brand Thidam rice is Sortex-cleaned and packed at our Kallakurichi facility under FSSAI-licensed conditions, giving distributors and households a reliable everyday grain option.',
    features: [
      'Sortex-cleaned, stone-free grains',
      'PVM quality-marked, FSSAI-licensed packaging',
      'No.1 Thidam rice variety',
      'Milled and packed at our Kallakurichi facility'
    ],
    specs: {
      moisture: '12% Max',
      brokenGrains: 'Less than 2.5%',
      grainLength: 'Average 4.8mm to 5.0mm',
      sortingAccuracy: '99.7% Optical Sorter Purity',
      shelfLife: '12 Months'
    },
    packSizes: ['25 kg'],
    image: princeBag,
    isPopular: true,
  },
  {
    id: 'imayam-brown-rice',
    name: 'Imayam Foods Brown Rice',
    tamilName: 'இமயம் புட்ஸ் சிவப்பு அரிசி',
    tagline: 'Fibre-rich whole-grain brown rice, distributed by our mill.',
    category: 'premium',
    description: 'A whole-grain brown rice line we stock and distribute alongside our own milled brands, for customers seeking a higher-fibre, less-polished everyday option.',
    features: [
      'Whole-grain, minimally polished brown rice',
      'Higher fibre than white Ponni varieties',
      'Distributed through our Kallakurichi facility',
    ],
    specs: {
      moisture: '13% Max',
      brokenGrains: 'Less than 3%',
      grainLength: 'Average 4.5mm to 5.0mm',
      sortingAccuracy: 'Sortex Cleaned',
      shelfLife: '9 Months'
    },
    packSizes: ['25 kg'],
    image: imayamBrownRiceBag,
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
    iconName: 'Sprout',
    image: processDeltaHarvesting,
  },
  {
    stepNumber: 2,
    title: 'Pre-cleaning & Gentle De-stoning',
    tamilTitle: 'நெல் சுத்தம் செய்தல் & கல் நீக்குதல்',
    description: 'The paddy undergoes triple-pass pre-cleaning to eliminate dust, chaff, and straws. Heavy-duty magnetic separators extract metal particles, while state-of-the-art vibratory de-stoners remove even the smallest pebbles.',
    techInvolved: 'Bühler Closed-Loop Vibratory Separators',
    impact: '100% dust-free, stone-free paddy ready for optimal husking.',
    iconName: 'ShieldAlert',
    image: processPreCleaning,
  },
  {
    stepNumber: 3,
    title: 'Pneumatic Husking & Separation',
    tamilTitle: 'நெல் உமி நீக்குதல் & பிரித்தல்',
    description: 'Under controlled pneumatic pressure, the outer husk is cracked open without damaging the delicate inner grain or germ. Multi-deck paddy separators then isolate the unhusked paddy from brown rice with pinpoint accuracy.',
    techInvolved: 'Rubber Roll Husker with Automatic Feed Controller',
    impact: 'Reduces grain breakage during milling to less than 1%.',
    iconName: 'Settings2',
    image: processPneumaticHusking,
  },
  {
    stepNumber: 4,
    title: 'Multi-Stage Whitening & Mist Polishing',
    tamilTitle: 'பாலிஷிங் & பளபளப்பாக்குதல்',
    description: 'Brown rice is gently polished in three separate stages to prevent thermal stress. Superfine mist polishers inject purified atomized water vapor, which crystallizes the natural starch layer, giving our rice its signature pearly white glaze.',
    techInvolved: 'Japanese Satake Mist Polishers',
    impact: 'Exceptional visual polish, dust-free dry handling, and extended shelf life.',
    iconName: 'Sparkles',
    image: processMultiStagePolishing,
  },
  {
    stepNumber: 5,
    title: 'Bühler Trichromatic Optical Color Sorting',
    tamilTitle: 'புளூ கலர் சார்ட்டிங் (நிறம் பிரித்தல்)',
    description: 'The absolute pinnacle of our facility. Millions of rice grains pass in front of ultra-high-speed trichromatic cameras every second. Advanced AI algorithms detect and blast away yellowed grains, chalky segments, or microscopic specks using precise compressed air nozzles.',
    techInvolved: 'Bühler Sortex S Sorter with High-Definition CCD Cameras',
    impact: 'Unmatched 99.99% purity. Spotless, uniform grains in every single pack.',
    iconName: 'Cpu',
    image: processTrichromaticSorting,
  },
  {
    stepNumber: 6,
    title: 'Automated Hygenic Bagging',
    tamilTitle: 'தானியங்கி சுகாதார பேக்கிங்',
    description: 'Our rice is never touched by human hands after polishing. High-precision computerized scales measure exact weights, dispensing them into food-grade laminated bags. They are vacuum sealed or stitched securely to preserve freshness.',
    techInvolved: 'Load-cell Automated Electronic Packing Lines',
    impact: 'Complete safety, airtight moisture barrier, and guaranteed weight precision.',
    iconName: 'Boxes',
    image: processBagging,
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
    year: 'Active License No: 12421021000342',
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
    id: 'g-mill-authorized',
    title: 'Authorized On-Site Inspection',
    tamilTitle: 'அங்கீகரிக்கப்பட்ட ஆய்வு',
    category: 'mill',
    imageUrl: authorizedPhoto,
    description: 'Verified inspection of our milling and packing floor at the Kallakurichi facility.'
  },
  {
    id: 'g-mill-facility',
    title: 'Our Kallakurichi Facility',
    tamilTitle: 'கள்ளக்குறிச்சி ஆலை',
    category: 'mill',
    imageUrl: riceMillsPhoto,
    description: 'The Sri Kannika Parameswari Modern Rice Mill building in Kallakurichi.'
  },
  {
    id: 'g-mill-silos',
    title: 'Grain Storage Silos',
    tamilTitle: 'தானிய சேமிப்பு கிடங்கு',
    category: 'mill',
    imageUrl: millSilosPhoto,
    description: 'High-capacity steel silos protect paddy from moisture and pests before milling.'
  },
  {
    id: 'g-mill-precleaning',
    title: 'Pre-Cleaning & De-stoning Line',
    tamilTitle: 'நெல் சுத்தம் & கல் நீக்குதல்',
    category: 'mill',
    imageUrl: processPreCleaning,
    description: 'Triple-pass pre-cleaning removes dust, chaff, metal, and stones before husking.'
  },
  {
    id: 'g-mill-husking',
    title: 'Pneumatic Husking Line',
    tamilTitle: 'நெல் உமி நீக்குதல்',
    category: 'mill',
    imageUrl: processPneumaticHusking,
    description: 'Controlled pneumatic pressure cracks the husk without damaging the grain.'
  },
  {
    id: 'g-mill-polishing',
    title: 'Multi-Stage Mist Polishing',
    tamilTitle: 'பாலிஷிங் & பளபளப்பாக்குதல்',
    category: 'mill',
    imageUrl: processMultiStagePolishing,
    description: 'Grains are gently polished in stages using purified mist for a natural glaze.'
  },
  {
    id: 'g-mill-sorting',
    title: 'Bühler Trichromatic Sorting',
    tamilTitle: 'கலர் சார்ட்டிங்',
    category: 'mill',
    imageUrl: processTrichromaticSorting,
    description: 'High-speed optical cameras and AI reject chalky or discoloured grains.'
  },
  {
    id: 'g-mill-bagging',
    title: 'Automated Hygienic Bagging',
    tamilTitle: 'தானியங்கி பேக்கிங்',
    category: 'mill',
    imageUrl: processBagging,
    description: 'Weighing, sealing, and stitching happen without any human hand contact.'
  },
  {
    id: 'g-fields-paddy',
    title: 'Paddy Fields Sourcing',
    tamilTitle: 'நெல் வயல்கள்',
    category: 'fields',
    imageUrl: paddyFieldPhoto,
    description: 'The lush paddy fields that supply our mill with premium raw grain.'
  },
  {
    id: 'g-fields-harvest',
    title: 'Paddy Harvesting & Selection',
    tamilTitle: 'அறுவடை மற்றும் தேர்வு',
    category: 'fields',
    imageUrl: processDeltaHarvesting,
    description: 'Raw paddy is harvested and quality-checked directly in the field before intake.'
  },
  {
    id: 'g-products-goldfish',
    title: 'Gold Fish Brand Packaging',
    tamilTitle: 'தங்கமீன் பிராண்டு',
    category: 'products',
    imageUrl: goldFishBag,
    description: 'Our Gold Fish brand No.1 premium rice, Sortex-cleaned and packed at Kallakurichi.'
  },
  {
    id: 'g-products-littleganesh',
    title: 'Little Ganesh Brand Packaging',
    tamilTitle: 'லிட்டில் கணேஷ் பிராண்டு',
    category: 'products',
    imageUrl: littleGaneshBag,
    description: 'Little Ganesh brand Rajabogam rice, a household favourite.'
  },
  {
    id: 'g-products-prince',
    title: 'Prince Brand Packaging',
    tamilTitle: 'பிரின்ஸ் பிராண்டு',
    category: 'products',
    imageUrl: princeBag,
    description: 'Prince brand Thidam rice, packed under FSSAI-licensed conditions.'
  },
  {
    id: 'g-products-mambazham',
    title: 'Mambazham Aged Ponni Packaging',
    tamilTitle: 'மாம்பழம் பொன்னி',
    category: 'products',
    imageUrl: mambazhamRealBag,
    description: 'Our Rajapogam Kichadi Ponni rice, aged and packed at Kallakurichi.'
  },
  {
    id: 'g-products-imayam',
    title: 'Imayam Foods Brown Rice',
    tamilTitle: 'இமயம் புட்ஸ்',
    category: 'products',
    imageUrl: imayamBrownRiceBag,
    description: 'A whole-grain brown rice line distributed through our facility.'
  },
  {
    id: 'g-products-stacked',
    title: 'Packed Rice Bags Ready for Dispatch',
    tamilTitle: 'அனுப்புதலுக்கு தயார்',
    category: 'products',
    imageUrl: riceBagsStackedPhoto,
    description: 'Sealed 25kg bags stacked and ready for distribution.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Arun Kumar',
    role: 'Regular Customer',
    quote: 'I have been purchasing Yellow Mango Rice regularly for the past few years, and I’m extremely happy with the quality. The rice tastes really good and is always fresh. Thank you for consistently maintaining such great quality.',
  },
  {
    id: 't-2',
    name: 'Suresh Kumar',
    role: 'Regular Customer, Namachivayapuram',
    quote: 'நான் நமச்சிவாய புறம் இருந்து வரேன் நான் கன்னிகா பரமேஸ்வரி மில்ல தான் மாம்பழ அரிசி எடுப்பேன் எனக்கு இங்க தவிர வேற எங்குமே செட்டாகல மூணு வருஷமா எடுத்துட்டு இருக்கேன் ரைஸ் ரொம்ப நல்லா இருக்கு',
  },
  {
    id: 't-3',
    name: 'Raja S',
    role: 'Regular Customer',
    quote: 'Nan Inga 3 years Rice Edukkuran Nan Inga illana vera engaiyum Rice edukka matten Inga thana enakku ok va irukku',
  },
  {
    id: 't-4',
    name: 'Vendhamani',
    role: 'Regular Customer',
    quote: 'Iam used yellow mango brand for 5 years very nice quality and length.my children\'s favourite verity rice.so this rice is best.',
  }
];
