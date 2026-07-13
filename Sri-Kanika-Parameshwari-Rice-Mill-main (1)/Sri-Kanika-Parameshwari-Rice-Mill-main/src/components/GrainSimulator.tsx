/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Droplet, Sparkles, Sprout, Wind, Soup, CheckCircle, Info } from 'lucide-react';

interface GrainData {
  id: string;
  name: string;
  tamilName: string;
  category: string;
  baseLength: number; // in mm
  cookedLength: number; // in mm
  waterRatio: string;
  cupsWater: number;
  aroma: 'High' | 'Medium' | 'Delicate';
  softness: number; // percentage
  season: string;
  seasonTamil: string;
  soil: string;
  description: string;
}

const GRAIN_PRESETS: GrainData[] = [
  {
    id: 'ponni-aged',
    name: 'Thanjavur Aged Ponni (Steam)',
    tamilName: 'தஞ்சாவூர் பழைய பொன்னி',
    category: 'Premium Aged',
    baseLength: 3.5,
    cookedLength: 9.1,
    waterRatio: '1 : 3.0',
    cupsWater: 3,
    aroma: 'High',
    softness: 85,
    season: 'Samba Season (Aug - Jan)',
    seasonTamil: 'சம்பா பருவம்',
    soil: 'Cauvery River Alluvial Clay-Silt',
    description: 'Our flagship grain. Aged for 12 to 18 months under climate-controlled conditions to minimize starch stickiness, producing exceptionally fluffy, separate grains that expand up to 2.6 times their raw size.',
  },
  {
    id: 'ponni-boiled',
    name: 'Double Boiled Ponni',
    tamilName: 'இரட்டை புழுங்கல் பொன்னி',
    category: 'Double Boiled',
    baseLength: 3.6,
    cookedLength: 8.3,
    waterRatio: '1 : 2.5',
    cupsWater: 2.5,
    aroma: 'Delicate',
    softness: 95,
    season: 'Kuruvai Season (Jun - Sep)',
    seasonTamil: 'குறுவை பருவம்',
    soil: 'Heavy River Basin Silt',
    description: 'Hydro-thermally processed to drive vitamins and minerals from the husk deep into the endosperm core. Exceptionally rich in dietary fiber, high satiety index, and perfect for daily South Indian meals.',
  },
  {
    id: 'sona-masuri',
    name: 'Silk Sona Masuri',
    tamilName: 'அதிசய சோனா மசூரி',
    category: 'Crystal Steam',
    baseLength: 3.2,
    cookedLength: 7.0,
    waterRatio: '1 : 2.25',
    cupsWater: 2.25,
    aroma: 'Medium',
    softness: 80,
    season: 'Samba Season (Aug - Jan)',
    seasonTamil: 'சம்பா பருவம்',
    soil: 'Light Sandy-Alluvial Loam',
    description: 'An premium lightweight grain preferred for its delicate aroma and easy digestion. Best suited for biryanis, fried rice, or everyday healthy lunches.',
  },
  {
    id: 'raw-ponni',
    name: 'Classic Raw Ponni (Pachari)',
    tamilName: 'நவரா பச்சரிசி பொன்னி',
    category: 'Classic Raw',
    baseLength: 3.4,
    cookedLength: 8.1,
    waterRatio: '1 : 2.0',
    cupsWater: 2,
    aroma: 'High',
    softness: 90,
    season: 'Navarai Season (Dec - Mar)',
    seasonTamil: 'நவரை பருவம்',
    soil: 'Pristine Fine Clay-Silt',
    description: 'Un-boiled, directly milled raw paddy that yields bright-pearly white grains. High in native gluten-free starches, making it ideal for making traditional sweet Pongal, idiyappam, and ceremonial dishes.',
  }
];

export default function GrainSimulator() {
  const [selectedGrain, setSelectedGrain] = useState<GrainData>(GRAIN_PRESETS[0]);
  const [cookProgress, setCookProgress] = useState<number>(0); // 0 to 100%

  const currentLength = (
    selectedGrain.baseLength +
    (selectedGrain.cookedLength - selectedGrain.baseLength) * (cookProgress / 100)
  ).toFixed(2);

  const getAromaColor = (aroma: string) => {
    switch (aroma) {
      case 'High': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Medium': return 'text-emerald-800 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-blue-600 bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div id="grain-simulator" className="bg-white rounded-3xl border border-stone-200/80 shadow-md p-6 sm:p-8 lg:p-10 font-sans max-w-7xl mx-auto">
      
      {/* Decorative Agri Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200/60 pb-6 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span>Interactive Cooking Sandbox</span>
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Kannika Sensory & Grain Elongation Simulator
          </h3>
          <p className="text-stone-500 text-xs">
            நெல் சமையல் அளவுருக்கள் - See how Thanjavur soil quality influences grain expansion, texture, and water ratios.
          </p>
        </div>
        
        {/* Rapid Presets Toggle */}
        <div className="flex flex-wrap gap-2">
          {GRAIN_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedGrain(p);
                setCookProgress(0); // Reset cooking state when grain changes
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedGrain.id === p.id
                  ? 'bg-emerald-800 text-stone-50 shadow-sm'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600'
              }`}
            >
              <div className="flex flex-col items-start text-left">
                <span>{p.name.split(' (')[0]}</span>
                <span className={`text-[9px] font-normal leading-none ${selectedGrain.id === p.id ? 'text-emerald-300' : 'text-stone-400'}`}>
                  {p.tamilName}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-stretch">
        
        {/* Left Column: Visual Simulator Render */}
        <div className="lg:col-span-5 bg-stone-50 rounded-2xl border border-stone-200/80 p-6 flex flex-col justify-between min-h-[350px] relative overflow-hidden">
          
          {/* Subtle Agri Grid Lines background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* Dynamic Steam Elements when cooked */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex justify-center space-x-6 pointer-events-none z-10">
            <AnimatePresence>
              {cookProgress > 30 && (
                <>
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: -60, opacity: [0, 0.4, 0], scale: [0.8, 1.4, 1.8] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
                    className="w-4 h-12 bg-stone-300/15 rounded-full filter blur-md"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.7 }}
                    animate={{ y: -75, opacity: [0, 0.5, 0], scale: [0.7, 1.5, 2] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: "easeOut", delay: 0.5 }}
                    className="w-4 h-12 bg-stone-300/15 rounded-full filter blur-md"
                  />
                  <motion.div
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: -50, opacity: [0, 0.35, 0], scale: [0.8, 1.3, 1.6] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut", delay: 1.1 }}
                    className="w-4 h-12 bg-stone-300/15 rounded-full filter blur-md"
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Heading */}
          <div className="flex justify-between items-start z-10">
            <div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold tracking-wider block">GRAIN STATE</span>
              <span className="font-serif font-bold text-sm text-stone-800">
                {cookProgress === 0 ? 'Raw Clean Grain' : cookProgress < 100 ? 'Cooking In Progress...' : 'Perfectly Cooked Rice'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-800 font-bold tracking-wider block">ELONGATION</span>
              <span className="font-mono text-sm font-bold text-stone-900">{currentLength} mm</span>
            </div>
          </div>

          {/* Animated Grain Display Pot */}
          <div className="my-8 flex flex-col items-center justify-center relative flex-1 min-h-[160px]">
            {/* Visual Cooker Ring Outline */}
            <div className={`absolute w-36 h-36 rounded-full border-2 border-dashed transition-colors duration-500 flex items-center justify-center ${
              cookProgress > 0 ? 'border-amber-400/40 animate-[spin_12s_linear_infinite]' : 'border-stone-200'
            }`}>
            </div>

            {/* Simulated Water Bubbles inside cooker */}
            {cookProgress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute w-28 h-28 rounded-full bg-emerald-500/5 border border-emerald-500/10"
                />
                <div className="absolute w-2 h-2 bg-emerald-500/20 rounded-full animate-ping top-1/4 left-1/3"></div>
                <div className="absolute w-3.5 h-3.5 bg-amber-500/10 rounded-full animate-ping bottom-1/4 right-1/3"></div>
              </div>
            )}

            {/* The Actual Grain! */}
            <motion.div
              id="simulator-grain-capsule"
              style={{
                width: '32px',
                height: `${48 + (112 * (cookProgress / 100))}px`,
                borderRadius: '50% / 20%',
              }}
              className="bg-stone-50 border-[3px] border-emerald-800/15 shadow-[inset_0px_3px_12px_rgba(255,255,255,0.9),0px_8px_20px_rgba(27,67,50,0.15)] flex flex-col items-center justify-center relative z-20 transition-all duration-300"
            >
              {/* Grain Gem lines/facets for realistic premium rice detail */}
              <div className="w-0.5 h-[80%] bg-white/50 rounded-full" />
              
              {/* Golden Husking line indicator */}
              <div className="absolute top-1 left-1.5 text-[8px] opacity-40 font-serif font-bold text-amber-600 leading-none">k</div>
            </motion.div>

            {/* Dynamic Label overlay */}
            <div className="absolute bottom-0 text-center font-mono text-[9px] text-stone-400">
              <span>Magnified 15x</span>
            </div>
          </div>

          {/* Interactive Cooking Slider Controls */}
          <div className="space-y-3 z-10">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 font-medium">Temperature: {cookProgress > 0 ? '100°C Steam' : 'Ambient 28°C'}</span>
              <span className="font-semibold text-emerald-800 font-mono">{cookProgress}% Cooked</span>
            </div>
            
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={cookProgress}
                onChange={(e) => setCookProgress(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />
            </div>
            
            <div className="flex justify-between text-[9px] text-stone-400 font-mono">
              <span>RAW GRAIN</span>
              <span>SIMMER</span>
              <span>BOILING STEAM</span>
              <span>FULLY COOKED</span>
            </div>
          </div>

        </div>

        {/* Right Column: Agri Metrics & Scientific Info */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Presets and details */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded">
                Category: {selectedGrain.category}
              </span>
              <span className={`text-[10px] font-bold border px-2.5 py-1 rounded flex items-center gap-1 ${getAromaColor(selectedGrain.aroma)}`}>
                <Wind className="w-3.5 h-3.5" />
                <span>Aroma Intensity: {selectedGrain.aroma}</span>
              </span>
            </div>

            <p className="text-stone-700 text-sm leading-relaxed">
              {selectedGrain.description}
            </p>
          </div>

          {/* Bento Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Water and Steam Ratios */}
            <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-stone-850">
                <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                  <Droplet className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-xs text-stone-900">Milling Water Ratio</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-serif font-extrabold text-emerald-800">{selectedGrain.waterRatio}</span>
                <span className="text-[10px] text-stone-400">(Rice to Water)</span>
              </div>
              
              {/* Visual Cups representation */}
              <div className="flex items-center space-x-1.5 pt-1">
                <span className="text-[9px] text-stone-400 font-mono mr-1">Cups:</span>
                <div className="w-4 h-5 bg-stone-200 border border-stone-300 rounded-t flex items-center justify-center text-[7px] text-stone-600 font-bold">1</div>
                <span className="text-[10px] text-stone-400 font-bold">:</span>
                {Array.from({ length: Math.ceil(selectedGrain.cupsWater) }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-5 border rounded-t flex items-center justify-center text-[7px] font-bold transition-all ${
                      idx + 1 <= selectedGrain.cupsWater
                        ? 'bg-emerald-800 text-stone-50 border-emerald-900 shadow-sm'
                        : 'bg-emerald-500/20 text-emerald-800 border-emerald-500/40 w-2' // representing fractional half cups
                    }`}
                  >
                    {idx + 1 <= selectedGrain.cupsWater ? idx + 1 : '.5'}
                  </div>
                ))}
              </div>
            </div>

            {/* Crop Season (Tamil Calendar alignment) */}
            <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-stone-850">
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                  <Sprout className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-xs text-stone-900">Tamil Harvest Calendar</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-stone-900 font-serif leading-none">{selectedGrain.season}</p>
                <p className="text-[10px] text-stone-400 font-medium">({selectedGrain.seasonTamil})</p>
              </div>
              <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                Grown with direct irrigation from the Cauvery river basin during seasonal delta monsoon weather cycles.
              </p>
            </div>

            {/* Clay-Silt Soil Index */}
            <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-stone-850">
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
                  <Soup className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-xs text-stone-900">Texture & Softness</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-serif font-extrabold text-stone-900">{selectedGrain.softness}%</span>
                  <span className="text-[9px] text-stone-400 uppercase font-mono">Softness Rating</span>
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div style={{ width: `${selectedGrain.softness}%` }} className="bg-amber-500 h-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Soil Mineral Density */}
            <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2 text-stone-850">
                <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="font-serif font-bold text-xs text-stone-900">Soil Mineral Density</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-stone-800 leading-relaxed">{selectedGrain.soil}</p>
                <div className="inline-flex items-center text-[9px] text-emerald-800 bg-emerald-50 border border-emerald-100 py-0.5 px-2 rounded-full font-bold">
                  <span>99.8% Sourcing Purity</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Technical Tip */}
          <div className="bg-emerald-950/5 border border-emerald-800/15 p-4 rounded-2xl flex items-start space-x-3">
            <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <p className="text-[11px] text-emerald-900/80 leading-relaxed font-sans">
              <strong>Milling Quality Note:</strong> Grains are mist-polished using pure drinking-grade steam. The moisture is continuously scanned and maintained at precisely 13.2% within our silos. This optimal level locks in the natural aroma without needing chemical preservatives.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
