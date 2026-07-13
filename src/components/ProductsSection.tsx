/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck, HelpCircle, Flame, Check } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductsSectionProps {
  onSelectProduct: (product: Product) => void;
  openDealerModal: () => void;
}

export default function ProductsSection({ onSelectProduct, openDealerModal }: ProductsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'raw' | 'boiled' | 'steamed' | 'premium'>('all');

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tamilName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Products', tamil: 'அனைத்தும்' },
    { id: 'premium', label: 'Premium Aged', tamil: 'பழைய பொன்னி' },
    { id: 'aged', label: 'Classic Aged', tamil: 'பச்சரிசி' },
    { id: 'boiled', label: 'Double Boiled', tamil: 'புழுங்கல் அரிசி' },
    { id: 'steamed', label: 'Crystal Steam', tamil: 'ஸ்டீம் அரிசி' },
  ];

  return (
    <div id="products-section-container" className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Premium FMCG Standards</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Cauvery Basin Ponni Catalog</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">உயர்தர பொன்னி அரிசி வகைகள் - 100% தூய்மையானவை</p>
        </div>
      </section>

      {/* Filter and Search Bar Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search rice varieties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Categories Horizontal */}
          <div className="flex flex-wrap items-center gap-2 w-full justify-start md:justify-end overflow-x-auto">
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider mr-2 hidden xl:inline-flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-md'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span>{cat.label}</span>
                  <span className={`text-[9px] font-normal leading-none ${activeCategory === cat.id ? 'text-emerald-300' : 'text-stone-400'}`}>
                    {cat.tamil}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Display Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 max-w-md mx-auto space-y-4">
            <HelpCircle className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-serif font-bold text-lg text-stone-900">No Rice Varieties Found</h3>
            <p className="text-stone-500 text-xs leading-relaxed">
              We couldn't find any varieties matching "{searchQuery}". Try selecting "All Products" or clear your query terms.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                id={`catalog-card-${prod.id}`}
                className="bg-white rounded-xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow group"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 items-end">
                    <span className="bg-emerald-800 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                      {prod.category}
                    </span>
                    {prod.isPopular && (
                      <span className="bg-amber-500 text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow flex items-center">
                        <Flame className="w-2.5 h-2.5 mr-1 text-white fill-white" />
                        <span>Best Choice</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] text-stone-400 font-medium leading-none">{prod.tamilName}</p>
                    <p className="text-stone-600 text-xs mt-2 line-clamp-3 leading-relaxed font-sans">{prod.tagline}</p>
                  </div>

                  {/* Pack sizes badge row */}
                  <div className="space-y-3.5 pt-3.5 border-t border-stone-100">
                    <div className="flex items-center text-[10px] text-stone-500 font-sans space-x-1">
                      <span>Packs available: </span>
                      <span className="font-semibold text-stone-800">{prod.packSizes.join(', ')}</span>
                    </div>

                    <button
                      id={`catalog-view-btn-${prod.id}`}
                      onClick={() => onSelectProduct(prod)}
                      className="w-full bg-stone-100 hover:bg-emerald-800 hover:text-white text-emerald-950 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all duration-200 text-center flex items-center justify-center space-x-1.5"
                    >
                      <span>Milling Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-900">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center justify-center md:justify-start">
              <ShieldCheck className="w-5.5 h-5.5 text-amber-500 mr-2" />
              <span>S.K.P. Triple-Purity Guarantee</span>
            </h3>
            <p className="text-emerald-200/80 text-xs leading-relaxed">
              Every single pack of Kannika rice is subjected to continuous electromagnetic iron separation, high-vacuum de-stoning, Japanese mist-polishing, and Bühler laser CCD optical sorting. No stones, no yellow tips, no compromises.
            </p>
          </div>
          <button
            id="catalog-dealer-enquiry-cta"
            onClick={openDealerModal}
            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg shrink-0 w-full md:w-auto text-center"
          >
            Request Wholesaler Quote
          </button>
        </div>
      </section>
    </div>
  );
}
