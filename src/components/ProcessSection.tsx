/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sprout, ShieldAlert, Settings2, Sparkles, Cpu, Boxes, Info, ArrowDown, Landmark } from 'lucide-react';
import { PROCESS_STEPS } from '../data';
import { ProcessStep } from '../types';

// Map icon string names to real Lucide icon components
const iconMap: Record<string, React.ReactNode> = {
  Sprout: <Sprout className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />,
  Settings2: <Settings2 className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Boxes: <Boxes className="w-6 h-6" />,
};

export default function ProcessSection() {
  return (
    <div id="process-section-container" className="space-y-16 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">State-Of-The-Art Technology</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Our Modern Milling Process</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">நெல் செயலாக்க தொழில்நுட்பம் - உலகத்தரம் வாய்ந்தது</p>
        </div>
      </section>

      {/* Intro Brief */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <div className="bg-stone-100 p-5 rounded-2xl border border-stone-200/60 inline-flex items-center space-x-3 text-left">
          <Info className="w-6 h-6 text-emerald-800 shrink-0" />
          <p className="text-stone-600 text-xs leading-relaxed">
            Unlike local mills that crush rice and degrade its quality, Sri Kannika Parameswari uses a low-temperature, multi-stage continuous processing system. This seals in the natural grain germ and starch, preserving vitamins while delivering complete purity.
          </p>
        </div>
      </section>

      {/* Alternating Step Grid Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16 relative">
        {/* Timeline center line for desktop */}
        <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-1 bg-emerald-800/10 -translate-x-1/2" />

        {PROCESS_STEPS.map((step, index) => {
          const isEven = index % 2 === 0;
          const stepIcon = iconMap[step.iconName] || <Settings2 className="w-6 h-6" />;

          return (
            <div
              key={step.stepNumber}
              id={`process-step-row-${step.stepNumber}`}
              className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              {/* Timeline bubble connector */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-emerald-800 items-center justify-center z-10 text-xs font-bold text-emerald-800 font-mono">
                {step.stepNumber}
              </div>

              {/* Left Col - Graphic / Tech Card */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden group">
                  <div className="aspect-video w-full overflow-hidden bg-stone-100 relative">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-stone-50/95 backdrop-blur-sm border-l border-b border-stone-200/60 py-1.5 px-3.5 rounded-bl-xl text-stone-500 font-mono font-bold text-xs">
                      STEP 0{step.stepNumber}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-3.5 mb-5">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                        {stepIcon}
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-900 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-[10px] text-stone-400 font-medium">{step.tamilTitle}</p>
                      </div>
                    </div>
                    <p className="text-stone-600 text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Col - Specs Highlight */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="bg-emerald-950/5 border border-emerald-900/15 p-5 rounded-2xl space-y-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold font-mono">Machinery & Technology</span>
                    <p className="text-stone-800 font-semibold text-xs leading-snug">{step.techInvolved}</p>
                  </div>
                  <div className="border-t border-emerald-900/10 pt-3 space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold font-mono">Quality Impact</span>
                    <p className="text-stone-600 text-xs leading-relaxed">{step.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Down arrow indicator representing final product */}
      <div className="flex justify-center pt-4">
        <div className="bg-amber-600 text-white p-3 rounded-full shadow-lg shadow-amber-600/15">
          <ArrowDown className="w-5 h-5" />
        </div>
      </div>

      {/* Trust Signoff */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <h3 className="font-serif font-bold text-xl text-stone-900">Guaranteed Food Safety</h3>
        <p className="text-stone-600 text-xs leading-relaxed max-w-xl mx-auto">
          Our continuous, automated milling lines run under sealed positive air pressure to ensure that our rice remains free of human touch, bird litter, or external environmental contamination from the moment raw paddy is tipped into cleaning hoppers to final stitch bagging.
        </p>
      </section>
    </div>
  );
}
