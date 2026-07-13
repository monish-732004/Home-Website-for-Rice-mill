/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sprout, Cpu, Award, Users, ShieldCheck, Flame, Scale, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, TESTIMONIALS, APP_INFO } from '../data';
import { Product } from '../types';
import MillingProcess from './MillingProcess';
import FacilityCarousel from './FacilityCarousel';
import paddyFieldPhoto from '../assets/Just dial/paddy.png';

interface HomeSectionProps {
  onNavigate: (tabId: string) => void;
  onSelectProduct: (product: Product) => void;
  openDealerModal: () => void;
}

export default function HomeSection({ onNavigate, onSelectProduct, openDealerModal }: HomeSectionProps) {
  // Slices popular products for homepage preview
  const featuredProducts = PRODUCTS.filter(p => p.isPopular).slice(0, 4);

  const stats = [
    { value: '15+ Years', label: 'Milling Legacy', desc: 'Established in 2011 in Kallakurichi' },
    { value: '150 Tons', label: 'Daily Processing', desc: 'Automated high-capacity continuous lines' },
    { value: '250+ Farms', label: 'Partner Sourcing', desc: 'Direct fair-trade Cauvery basin network' },
    { value: '99.99%', label: 'Purity Standard', desc: 'Bühler Sortex trichromatic laser sorters' },
  ];

  const particles = [
    { left: '8%', top: '15%', delay: 0.5, duration: 11, size: 24 },
    { left: '42%', top: '78%', delay: 2.2, duration: 14, size: 18 },
    { left: '78%', top: '12%', delay: 1.1, duration: 9, size: 20 },
    { left: '88%', top: '65%', delay: 3.5, duration: 16, size: 28 },
    { left: '22%', top: '85%', delay: 1.8, duration: 12, size: 16 },
  ];

  return (
    <div id="home-section-container" className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section
        id="home-hero"
        className="relative min-h-[85vh] lg:min-h-[80vh] flex flex-col lg:flex-row overflow-hidden border-b border-stone-200"
      >
        {/* Hero Section Left (3/5 width on desktop) */}
        <div className="w-full lg:w-3/5 p-6 sm:p-12 lg:p-16 flex flex-col justify-center bg-stone-50 relative z-10 overflow-hidden">
          {/* Subtle Agri Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* Floating Sprout Particles Left */}
          {particles.map((p, idx) => (
            <motion.div
              key={`particle-left-${idx}`}
              className="absolute pointer-events-none text-emerald-800/10 select-none z-0"
              style={{ left: p.left, top: p.top }}
              animate={{
                y: [0, -25, 0],
                x: [0, 8, 0],
                rotate: [0, 20, -20, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            >
              <Sprout className="opacity-65" style={{ width: p.size, height: p.size }} />
            </motion.div>
          ))}

          <div className="mb-6 z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-emerald-800 text-stone-50 px-3.5 py-1.5 rounded-sm italic">
              Since 2011 • Kallakurichi
            </span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-light mb-6 text-stone-900 z-10">
            Pure Delta Grains,<br/>
            <span className="italic font-normal text-amber-500">Timeless Traditions.</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg max-w-xl text-stone-700 leading-relaxed mb-8 font-light z-10">
            Celebrating the rich agricultural heritage of Tamil Nadu. Our modern rice mill in Kallakurichi blends ancient Tamil farming wisdom with cutting-edge optical technology to deliver the finest, fluffiest Ponni to your table.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-10">
            <button
              id="hero-products-btn"
              onClick={() => onNavigate('products')}
              className="px-8 py-3.5 bg-emerald-800 text-stone-50 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-200 hover:bg-emerald-700 active:scale-95 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-dealer-btn"
              onClick={openDealerModal}
              className="px-8 py-3.5 border border-emerald-800 text-emerald-800 hover:bg-emerald-800/5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center"
            >
              <span>Become a Distributor</span>
            </button>
          </div>

          {/* Quick Metrics Statistics Strip */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 mt-10 pt-8 border-t border-stone-200/80 z-10">
            <div>
              <div className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">2011</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Milling Legacy</div>
            </div>
            <div className="w-px h-8 bg-stone-200 hidden sm:block"></div>
            <div>
              <div className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">ISO</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">22000:2018 Cert</div>
            </div>
            <div className="w-px h-8 bg-stone-200 hidden sm:block"></div>
            <div>
              <div className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">150 Tons</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Daily Processing</div>
            </div>
            <div className="w-px h-8 bg-stone-200 hidden sm:block"></div>
            <div>
              <div className="text-xl sm:text-2xl font-serif text-emerald-800 font-bold">250+</div>
              <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Partner Farms</div>
            </div>
          </div>
        </div>

        {/* Visual Right Column (2/5 width on desktop) */}
        <div className="w-full lg:w-2/5 relative bg-emerald-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-auto text-left">
          {/* Background paddy field photo */}
          <div className="absolute inset-0 z-0">
            <img
              src={paddyFieldPhoto}
              alt="Paddy fields sourcing our mill"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-emerald-900/40" />
          </div>

          {/* Floating Sprout Particles Right Column */}
          {particles.map((p, idx) => (
            <motion.div
              key={`particle-right-${idx}`}
              className="absolute pointer-events-none text-amber-400/10 select-none z-10"
              style={{ left: `${100 - parseFloat(p.left)}%`, top: p.top }}
              animate={{
                y: [0, -35, 0],
                x: [0, -10, 0],
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: p.duration * 1.1,
                repeat: Infinity,
                delay: p.delay * 0.8,
                ease: "easeInOut",
              }}
            >
              <Sprout style={{ width: p.size, height: p.size }} />
            </motion.div>
          ))}

          {/* Abstract Grain Shape overlaying the border between columns */}
          {/* <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-[440px] bg-stone-50 rounded-full flex items-center justify-center border-[12px] border-amber-500 shadow-2xl overflow-hidden z-10 hidden lg:flex">
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center relative">
              <div className="w-px bg-emerald-800/10 h-full absolute"></div>
              <span className="text-emerald-800 font-serif italic text-2xl relative z-10 leading-snug">Premium<br/>Selection</span>
            </div>
          </div> */}
          
          <div className="self-end text-right relative z-10">
            <div className="text-stone-50/20 text-[80px] font-serif leading-none font-bold">01</div>
            <div className="text-amber-500 uppercase tracking-[0.2em] text-[10px] font-bold">The Gold Standard</div>
          </div>

          <div className="relative z-10 mt-auto pt-12">
            <h3 className="text-stone-50 font-serif text-2xl mb-3 italic">Modernizing the Harvest</h3>
            <p className="text-stone-300 text-xs leading-relaxed max-w-sm">
              Our state-of-the-art Japanese & Swiss optical color sorting equipment identifies and rejects defective grains in milliseconds, ensuring 99.99% purity without chemical additives.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Stats Section */}
      <section id="home-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl border border-stone-200/80 shadow-lg shadow-stone-100 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-extrabold text-emerald-800 tracking-tight block">
                  {stat.value}
                </span>
                <span className="font-sans text-xs font-bold text-stone-900 uppercase tracking-wider mt-1 block">
                  {stat.label}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-3 leading-relaxed border-t border-stone-100 pt-2.5">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2b. Facility Photo Carousel */}
      <section id="home-facility-carousel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1.5 mb-6">
          <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Where It All Happens</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Inside Our Facility</h2>
        </div>
        <FacilityCarousel />
      </section>

      {/* 3. Heritage & About Intro Section */}
      <section id="home-intro-about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider flex items-center">
              <Sprout className="w-4 h-4 mr-1.5" />
              <span>Sustaining 15+ Years of trust</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-900 font-bold leading-tight">
              Honoring Tamil Agricultural wisdom
            </h2>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            Our history is intertwined with the Cauvery delta, whose rich alluvial silt gives Tanjore rice its exceptional sweetness and mineral density. At Sri Kannika Parameswari, we treat grain processing as a fine craft. 
          </p>
          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            By paying fair-trade premiums directly to regional farming families and utilizing strict mist-polishing hygiene controls, we preserve natural nutrients while ensuring spotless, pest-free grains.
          </p>
          <div className="pt-2">
            <button
              id="home-about-learn-more"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center space-x-1 text-xs text-emerald-800 hover:text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 hover:bg-emerald-100 py-2.5 px-4 rounded-lg transition-colors"
            >
              <span>Our Mill Story</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden shadow-md border border-stone-200 aspect-[4/5] bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1557703913-d2b0cbf82722?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Harvest grains"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-emerald-900 text-emerald-100 p-6 rounded-xl space-y-2">
              <span className="font-serif text-lg font-bold block text-white">Cauvery Basin Sourcing</span>
              <span className="text-[11px] text-emerald-300 leading-relaxed block">
                Direct procurement from river-irrigated farms ensures optimal starch quality and consistent post-cook elongation.
              </span>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-amber-600 text-amber-50 p-6 rounded-xl space-y-2">
              <span className="font-serif text-lg font-bold block text-white">Bühler Sortex Purity</span>
              <span className="text-[11px] text-amber-100 leading-relaxed block">
                Every grain is optically scanned using high-definition CCD cameras. Imperfections are rejected using targeted pneumatic micro-nozzles.
              </span>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md border border-stone-200 aspect-[4/5] bg-stone-100">
              <img
                src="https://plus.unsplash.com/premium_photo-1664117187648-5c84f3ea6b03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFkZHklMjBmaWVsZHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Paddy detail"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Row */}
      <section id="home-featured-products" className="bg-stone-100 py-16 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end space-y-4 sm:space-y-0">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Premium Choice</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Featured Ponni Grains</h2>
            </div>
            <button
              id="home-view-all-products"
              onClick={() => onNavigate('products')}
              className="inline-flex items-center space-x-1.5 text-xs text-stone-700 hover:text-stone-900 font-semibold bg-white px-4 py-2.5 rounded-lg border border-stone-200 shadow-sm hover:shadow transition-all"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                id={`featured-card-${prod.id}`}
                className="bg-white rounded-xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-stone-100 overflow-hidden relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-emerald-800 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {prod.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">{prod.name}</h3>
                    <p className="text-[11px] text-stone-400 font-medium">{prod.tamilName}</p>
                    <p className="text-stone-500 text-xs line-clamp-2 mt-1 leading-relaxed">{prod.tagline}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-[10px] text-stone-400">
                      <span>Packs: </span>
                      <span className="font-semibold text-stone-700">{prod.packSizes.join(', ')}</span>
                    </div>
                    <button
                      id={`featured-card-view-${prod.id}`}
                      onClick={() => onSelectProduct(prod)}
                      className="text-xs text-emerald-800 hover:text-emerald-700 font-bold flex items-center space-x-1"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Paddy to Plate: Milling Process Story */}
      <MillingProcess onNavigate={onNavigate} />

      {/* 5. Core Operational Values (FMCG Standard) */}
      <section id="home-operational-values" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-1.5">
          <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Quality Assurance</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">State-Of-The-Art Standards</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4 text-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Bühler Laser Sorters</h3>
            <p className="text-stone-600 text-xs leading-relaxed max-w-xs mx-auto">
              Our continuous computerized color sorting units isolate and remove chalky, immature, yellowed, or damaged rice grains, achieving 99.9% pristine batch uniformity.
            </p>
          </div>

          <div className="space-y-4 text-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Continuous ISO Controls</h3>
            <p className="text-stone-600 text-xs leading-relaxed max-w-xs mx-auto">
              Operated under ISO 22000:2018 food safety directives, our facility is regularly audited for absolute sterile handling, completely isolated from bird, dust, or pest contaminants.
            </p>
          </div>

          <div className="space-y-4 text-center p-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center mx-auto shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Fair-Trade Cooperatives</h3>
            <p className="text-stone-600 text-xs leading-relaxed max-w-xs mx-auto">
              By working with Cauvery basin co-ops, we skip multiple middle agents, providing direct financial compensation to organic farms and assuring raw material purity.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Slider */}
      <section id="home-testimonials" className="bg-emerald-950 py-16 border-t-4 border-amber-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="space-y-1.5">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Dealer & Retail Reviews</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Loved across Indian Kitchens</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left pt-4">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                id={`testimonial-card-${test.id}`}
                className="bg-emerald-900/40 border border-emerald-800/60 p-5 rounded-xl space-y-4 flex flex-col justify-between"
              >
                <p className="text-stone-200 text-xs italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="font-serif text-white font-bold text-xs">{test.name}</h4>
                  <p className="text-emerald-400 text-[10px] font-semibold uppercase mt-0.5">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
