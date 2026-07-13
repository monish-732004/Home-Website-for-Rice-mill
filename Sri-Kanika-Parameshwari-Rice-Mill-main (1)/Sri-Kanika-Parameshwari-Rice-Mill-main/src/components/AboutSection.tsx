/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Landmark, Eye, Heart, Leaf, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { APP_INFO } from '../data';

export default function AboutSection() {
  const values = [
    {
      icon: <Heart className="w-5 h-5 text-emerald-800" />,
      title: 'Purity Promise',
      tamil: 'தூய்மை உறுதிமொழி',
      desc: 'We guarantee zero synthetic additives, zero stone impurities, and complete hands-free hygienic packaging across every batch.'
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-800" />,
      title: 'Ecological Fairness',
      tamil: 'சூழலியல் நேர்மை',
      desc: 'We procure raw paddy directly from 250+ smallholder delta farmers, paying fair premiums to support ecological water-saving techniques.'
    },
    {
      icon: <Eye className="w-5 h-5 text-emerald-800" />,
      title: 'Complete Traceability',
      tamil: 'முழுமையான கண்டறிதல்',
      desc: 'Every bag features a specific milling batch code, allowing us to trace grains back to their precise Cauvery river basin farm block.'
    }
  ];

  return (
    <div id="about-section-container" className="space-y-16 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Sri Kannika Parameswari Rice Mill</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Three Decades of Milling Purity</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">{APP_INFO.tamilName}</p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider flex items-center">
              <Landmark className="w-4 h-4 mr-1.5" />
              <span>Est. 1992 • Kallakurichi</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              Sowing Seeds of Quality for Generations
            </h2>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            Founded in 1992 in Kallakurichi, Sri Kannika Parameswari Modern Rice Mill began with a singular focus: to offer South Indian families clean, unadulterated Ponni rice of outstanding grade. At a time when traditional milling relied on unhygienic open drying fields and manual grading, we pioneered modern closed-loop mechanical pre-cleaning.
          </p>
          <p className="text-stone-600 text-sm leading-relaxed font-sans">
            Over the years, we have scaled our storage capacity with state-of-the-art silos and integrated high-speed color sorters imported from Europe. Today, our brand represents the perfect marriage of Tamil agricultural heritage and high-tech food manufacturing. We feed over 15 lakh families across South India every month, maintaining the same family-led commitment to purity.
          </p>
        </div>

        <div className="aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden shadow-lg border border-stone-250 bg-stone-100 relative group">
          <img
            src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800"
            alt="Tamil Agriculture Heritage"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6">
            <div className="text-white">
              <p className="font-serif text-lg font-bold">Cauvery River Basin Sourcing</p>
              <p className="text-stone-300 text-xs">Fertile delta soils nurturing pristine Ponni grains for decades.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Bento Row */}
      <section className="bg-stone-100 py-16 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-1.5">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Corporate Philosophy</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Our Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-stone-200/70 shadow-sm space-y-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  {v.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-stone-900 font-bold text-base">{v.title}</h3>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase">{v.tamil}</p>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed border-t border-stone-100 pt-3">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Comparison Table / Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-1.5">
          <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Mill Comparison</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">Why a "Modern" Rice Mill Matters</h2>
          <p className="text-stone-500 text-xs max-w-md mx-auto">Traditional huller mills break grains and leave impurities. S.K.P. guarantees modern FMCG purity.</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 uppercase font-semibold text-[10px] tracking-wider">
                <th className="p-4 sm:p-5">Quality Parameters</th>
                <th className="p-4 sm:p-5 bg-emerald-50 text-emerald-800 font-bold">S.K.P. Modern Rice Mill</th>
                <th className="p-4 sm:p-5">Traditional Huller Mills</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 text-stone-600">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-stone-900">De-stoning & Dust Cleaning</td>
                <td className="p-4 sm:p-5 bg-emerald-50/40 text-emerald-900 font-medium">Bühler closed separators remove 100% of pebbles, mud-balls, and fields dust.</td>
                <td className="p-4 sm:p-5">Manual sieving leaves mud and micro-stones in cooked rice.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-stone-900">Grain Breakage Rate</td>
                <td className="p-4 sm:p-5 bg-emerald-50/40 text-emerald-900 font-medium">Pneumatic husking restricts grain breakage to &lt; 1.5% for fluffy elongation.</td>
                <td className="p-4 sm:p-5">Friction steel hullers fracture grains, leading to sticky clumpy rice.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-stone-900">Polishing Temperature</td>
                <td className="p-4 sm:p-5 bg-emerald-50/40 text-emerald-900 font-medium">Japanese Satake multi-stage mist polishing keeps grains cool, preserving core nutrition.</td>
                <td className="p-4 sm:p-5">Overheated high-friction single-pass polishing destroys vitamins.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-stone-900">Insect & Pest Control</td>
                <td className="p-4 sm:p-5 bg-emerald-50/40 text-emerald-900 font-medium">Completely closed stainless steel silos and continuous UV sanitation protocols.</td>
                <td className="p-4 sm:p-5">Open sack storage vulnerable to weevil infestation and humidity.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-stone-900">Trichromatic Sorting</td>
                <td className="p-4 sm:p-5 bg-emerald-50/40 text-emerald-900 font-medium">99.99% purity. HD CCD cameras blast away yellow tips and chalky grains automatically.</td>
                <td className="p-4 sm:p-5">No color sorting. Mixed visual grades containing black specks.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
