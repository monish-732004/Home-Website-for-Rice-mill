/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import riceMillsPhoto from '../assets/Just dial/Rice Mills.png';
import millSilosPhoto from '../assets/Just dial/mill.png';
import paddyFieldPhoto from '../assets/Just dial/paddy.png';

const SLIDES = [
  {
    image: riceMillsPhoto,
    title: 'Our Kallakurichi Facility',
    tamil: 'எங்கள் கள்ளக்குறிச்சி ஆலை',
    desc: 'The Sri Kannika Parameswari Modern Rice Mill building in Kallakurichi.',
  },
  {
    image: millSilosPhoto,
    title: 'Grain Storage Silos',
    tamil: 'தானிய சேமிப்பு கிடங்கு',
    desc: 'High-capacity steel silos keep paddy protected from moisture and pests before milling.',
  },
  {
    image: paddyFieldPhoto,
    title: 'Paddy Fields Sourcing',
    tamil: 'நெல் வயல்கள்',
    desc: 'The lush paddy fields that supply our mill with premium raw grain.',
  },
];

export default function FacilityCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  return (
    <div id="facility-carousel" className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 aspect-[16/9] sm:aspect-[21/9]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={SLIDES[index].image}
            alt={SLIDES[index].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <h3 className="font-serif text-white text-lg sm:text-2xl font-bold">{SLIDES[index].title}</h3>
            <p className="text-stone-300 text-[10px] sm:text-xs font-medium mb-1">{SLIDES[index].tamil}</p>
            <p className="text-stone-200 text-xs sm:text-sm max-w-lg leading-relaxed">{SLIDES[index].desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Arrows */}
      <button
        id="facility-carousel-prev"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 transition-colors z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        id="facility-carousel-next"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-stone-800 rounded-full p-2 transition-colors z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute top-4 right-4 flex items-center space-x-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            id={`facility-carousel-dot-${i}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-amber-500' : 'w-1.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
