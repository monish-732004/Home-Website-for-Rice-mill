/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SlidersHorizontal, Eye, X, Landmark, Camera, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mill' | 'fields' | 'heritage' | 'products'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterOptions = [
    { id: 'all', label: 'All Photos', tamil: 'அனைத்தும்' },
    { id: 'mill', label: 'Mill Facility', tamil: 'நவீன ஆலை' },
    { id: 'fields', label: 'Paddy Fields', tamil: 'நெல் வயல்கள்' },
    { id: 'heritage', label: 'Heritage', tamil: 'பாரம்பரியம்' },
    { id: 'products', label: 'Retail Packs', tamil: 'பேக்கேஜிங்' },
  ];

  const filteredGallery = GALLERY.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div id="gallery-section-container" className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">A Glimpse Into Our Legacy</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Facility & Heritage Gallery</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">புகைப்பட தொகுப்பு - தரம் மற்றும் பாரம்பரியம்</p>
        </div>
      </section>

      {/* Filter Bar Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            id={`gallery-filter-${opt.id}`}
            onClick={() => setActiveFilter(opt.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
              activeFilter === opt.id
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            <div className="flex flex-col items-center">
              <span>{opt.label}</span>
              <span className={`text-[9px] font-normal leading-none ${activeFilter === opt.id ? 'text-emerald-300' : 'text-stone-400'}`}>
                {opt.tamil}
              </span>
            </div>
          </button>
        ))}
      </section>

      {/* Responsive Gallery Mosaic Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          id="gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                // initial={{ opacity: 0, scale: 0.9 }}
                // animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0, scale: 0.9 }}
                // transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all relative"
              >
                {/* Image Wrap */}
                <div className="aspect-video bg-stone-100 overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-2.5 rounded-full shadow-lg text-emerald-850">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info Footer */}
                <div className="p-4 space-y-1 border-t border-stone-100">
                  <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-sans">
                    <span>{item.tamilTitle}</span>
                    <span className="uppercase font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      </section>

      {/* Lightbox Modal overlay */}
      
        {selectedItem && (
          <div id="gallery-lightbox-portal" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Lightbox Backdrop */}
            <motion.div
              id="gallery-lightbox-backdrop"
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 0.85 }}
              // exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-stone-950"
            />

            {/* Lightbox Content Container */}
            <motion.div
              id="gallery-lightbox-card"
              // initial={{ scale: 0.95, opacity: 0 }}
              // animate={{ scale: 1, opacity: 1 }}
              // exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] z-10 border border-stone-800 shadow-2xl flex flex-col"
            >
              {/* Close button top right overlay */}
              <button
                id="gallery-lightbox-close"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 bg-stone-900/80 text-white hover:bg-stone-900 p-2 rounded-full z-20 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image */}
              <div className="aspect-video w-full bg-stone-100 relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Narrative Information */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-100 pb-3 gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                      {selectedItem.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-medium">{selectedItem.tamilTitle}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider uppercase shrink-0">
                    Category: {selectedItem.category}
                  </span>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Metadata tags */}
                <div className="pt-2 flex items-center space-x-6 text-[10px] text-stone-400 font-mono">
                  <span className="flex items-center">
                    <Camera className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                    <span>Location: Kallakurichi Mill Facility</span>
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-stone-400" />
                    <span>Milling Year: 2026</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      
    </div>
  );
}
