/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, CheckCircle, Package, ShieldCheck, Flame, Scale, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  openDealerModal: () => void;
}

export default function ProductDetailsModal({ product, onClose, openDealerModal }: ProductDetailsModalProps) {
  if (!product) return null;

  // Custom traditional cooking tips based on rice category
  const getCookingGuide = (category: string) => {
    switch (category) {
      case 'premium':
        return {
          soak: '30 - 45 Minutes in cold water',
          ratio: '1 Cup Rice : 2.5 Cups Water',
          method: 'Boil on high flame till water matches rice level, cover tightly, and cook on extremely low flame for 12 minutes (or 3 whistles in a standard cooker). Let stand for 10 minutes.',
          tips: 'A pinch of salt or 1 tsp of oil while boiling gives exceptionally pearled and separated grains.'
        };
      case 'boiled':
        return {
          soak: '20 Minutes in warm water',
          ratio: '1 Cup Rice : 2.75 Cups Water',
          method: 'Add rice to boiling water in an open vessel. Boil until tender (approx. 18 minutes) and drain surplus starch, or cook for 4 whistles in a pressure cooker.',
          tips: 'Excellent for making traditional South Indian Kanji (gruel) and lunch meals.'
        };
      case 'steamed':
        return {
          soak: '15 Minutes',
          ratio: '1 Cup Rice : 2.25 Cups Water',
          method: 'Cook in an electrical rice cooker or pressure cooker (3 whistles). Because it is steam-preconditioned, it cooks rapidly without becoming mushy.',
          tips: 'Perfect for commercial bulk preparation and holding hot in buffet casseroles.'
        };
      default:
        return {
          soak: '15 - 20 Minutes',
          ratio: '1 Cup Rice : 2.0 Cups Water',
          method: 'Cook in a pressure cooker for exactly 2 whistles, then reduce flame for 2 minutes before switching off.',
          tips: 'Perfect for lightweight, delicate Sona Masoori variety rice dishes.'
        };
    }
  };

  const guide = getCookingGuide(product.category);

  return (
    <div id="product-modal-portal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Backdrop */}
      <motion.div
        id="product-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/80"
      />

      {/* Modal Card */}
      <motion.div
        id="product-modal-card"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10 border border-stone-250 flex flex-col"
      >
        {/* Header Title Bar */}
        <div className="sticky top-0 bg-white border-b border-stone-100 p-5 flex justify-between items-start z-20">
          <div className="space-y-1 pr-6">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {product.category} RICE
              </span>
              {product.isPopular && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bestseller
                </span>
              )}
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-stone-400 font-medium tracking-tight">
              {product.tamilName}
            </p>
          </div>
          <button
            id="product-modal-close"
            onClick={onClose}
            className="p-1.5 hover:bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          {/* Main Visual & Info Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col - Product Image & Packs */}
            <div className="space-y-6">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-900/85 text-white py-1 px-2.5 rounded-md text-[10px] font-semibold tracking-wider flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ultra-Purity Checked</span>
                </div>
              </div>

              {/* Package Sizes */}
              <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-2.5">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wide flex items-center">
                  <Package className="w-4 h-4 text-emerald-700 mr-1.5" />
                  <span>Available Packaging Sizes</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.packSizes.map((size) => (
                    <span
                      key={size}
                      className="bg-white border border-stone-300 text-stone-700 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center space-x-1"
                    >
                      <Scale className="w-3 h-3 text-stone-400" />
                      <span>{size} Laminated Bag</span>
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-stone-500 italic mt-1 leading-relaxed">
                  * Packed in food-grade airtight bags with moisture barriers to maintain peak aroma.
                </p>
              </div>
            </div>

            {/* Right Col - Specs & Features */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Product Story</h4>
                <p className="text-stone-700 text-sm leading-relaxed">{product.description}</p>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Quality Highlights</h4>
                <ul className="space-y-2">
                  {product.features.map((feat, index) => (
                    <li key={index} className="flex items-start text-stone-700 text-xs">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mr-2.5 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Technical specifications</h4>
                <div className="grid grid-cols-2 gap-3.5 bg-stone-50/60 p-4 rounded-xl border border-stone-200/50 text-xs">
                  <div>
                    <span className="text-stone-400 block font-medium">Moisture Content</span>
                    <span className="font-semibold text-stone-800">{product.specs.moisture}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Grain Length</span>
                    <span className="font-semibold text-stone-800">{product.specs.grainLength}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Broken Ratio</span>
                    <span className="font-semibold text-stone-800">{product.specs.brokenGrains}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block font-medium">Shelf Life</span>
                    <span className="font-semibold text-stone-800">{product.specs.shelfLife}</span>
                  </div>
                  <div className="col-span-2 border-t border-stone-200/60 pt-2.5">
                    <span className="text-stone-400 block font-medium">Purity Rating</span>
                    <span className="font-semibold text-emerald-800">{product.specs.sortingAccuracy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cooking Instructions Section */}
          <div className="bg-emerald-950/5 border border-emerald-900/20 p-5 sm:p-6 rounded-xl space-y-3.5">
            <h4 className="text-sm font-serif font-bold text-emerald-900 flex items-center">
              <Flame className="w-4.5 h-4.5 text-amber-500 mr-2" />
              <span>The Perfect Cooking Guidelines</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div className="space-y-1">
                <span className="text-emerald-800 font-bold uppercase tracking-wider text-[10px] block">1. Soaking Interval</span>
                <p className="text-stone-700 leading-relaxed">{guide.soak}</p>
              </div>
              <div className="space-y-1">
                <span className="text-emerald-800 font-bold uppercase tracking-wider text-[10px] block">2. Grain-to-Water Ratio</span>
                <p className="text-stone-700 leading-relaxed font-semibold">{guide.ratio}</p>
              </div>
              <div className="space-y-1">
                <span className="text-emerald-800 font-bold uppercase tracking-wider text-[10px] block">3. Cooking Technique</span>
                <p className="text-stone-700 leading-relaxed">{guide.method}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-emerald-900/10 text-[11px] text-stone-600 italic">
              <span className="font-semibold text-emerald-900">Pro Tip: </span>
              <span>{guide.tips}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-stone-50 border-t border-stone-200/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 z-20">
          <div className="text-left text-xs text-stone-500 max-w-sm">
            <span>Interested in wholesale stock or custom white-label packaging? Let’s establish a dialogue.</span>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto shrink-0 justify-end">
            <button
              id="details-modal-close-btn"
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Close Info
            </button>
            <button
              id="details-modal-dealer-btn"
              onClick={() => {
                onClose();
                openDealerModal();
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Enquire Dealership
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
