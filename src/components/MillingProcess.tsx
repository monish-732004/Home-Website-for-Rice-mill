/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Wheat, Filter, Settings2, Droplets, TestTube, FileCheck, Leaf, QrCode } from 'lucide-react';

interface MillingProcessProps {
  onNavigate: (tabId: string) => void;
}

interface StepData {
  number: number;
  icon: React.ElementType;
  headline: string;
  badge: string;
  detail: string;
  badgeClass: string;
  iconClass: string;
}

const STEPS: StepData[] = [
  {
    number: 1,
    icon: Wheat,
    headline: 'Freshly harvested paddy',
    badge: 'Sourced from Cauvery delta farms only',
    detail: 'We source exclusively from Samba and Kuruvai season harvests in Thanjavur, Tiruvarur, and Nagapattinam districts — the mineral-rich alluvial clay-silt belt of the Cauvery river.',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    iconClass: 'text-emerald-700',
  },
  {
    number: 2,
    icon: Filter,
    headline: 'Triple-stage cleaning',
    badge: 'Zero foreign matter',
    detail: 'Raw paddy passes through vibration sieves, destoners, and magnetic separators. Stones, husk debris, and metal traces are removed before a single grain enters the mill.',
    badgeClass: 'bg-blue-100 text-blue-800',
    iconClass: 'text-blue-700',
  },
  {
    number: 3,
    icon: Settings2,
    headline: 'Rubber-roll husking',
    badge: 'No abrasive polishing',
    detail: 'Rubber-roll huller technology removes the outer husk gently without cracking the grain. Unlike stone mills, this preserves the bran layer and keeps breakage under 2%.',
    badgeClass: 'bg-amber-100 text-amber-800',
    iconClass: 'text-amber-700',
  },
  {
    number: 4,
    icon: Droplets,
    headline: 'Pure steam polish only',
    badge: 'No talc. No chemicals. Ever.',
    detail: 'Grains are polished using food-grade steam — the same principle as sterilisation. No talc powder, no glucose coating, no chemical brighteners. What you see is the natural grain.',
    badgeClass: 'bg-red-100 text-red-800',
    iconClass: 'text-red-700',
  },
  {
    number: 5,
    icon: TestTube,
    headline: '13.2% moisture — locked and sealed',
    badge: 'Same-day bagging',
    detail: 'Every batch is moisture-scanned before bagging. We target exactly 13.2% — the level that locks natural aroma, prevents mould, and gives the grain its shelf life. Bags are sealed within hours of milling.',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    iconClass: 'text-emerald-700',
  },
];

export default function MillingProcess({ onNavigate }: MillingProcessProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="milling-process-story"
      className="bg-stone-50 py-12 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 space-y-3">
          <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
            Our Process
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
            From paddy to plate
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Every grain passes through five steps before it reaches your kitchen — nothing added, nothing hidden.
          </p>
        </div>

        {/* Step Flow */}
        <div ref={sectionRef} className="relative">
          {/* Desktop horizontal connector (base + fill) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-0 right-0 top-4 border-t-2 border-dashed border-stone-300"
          />
          <div
            aria-hidden="true"
            style={{ width: inView ? '100%' : '0%' }}
            className="hidden lg:block absolute left-0 top-4 border-t-2 border-emerald-700 transition-[width] duration-[1600ms] ease-out"
          />

          {/* Mobile vertical connector (base + fill) */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute left-4 top-4 bottom-4 border-l-2 border-dashed border-stone-300"
          />
          <div
            aria-hidden="true"
            style={{ height: inView ? '100%' : '0%' }}
            className="lg:hidden absolute left-4 top-4 bottom-4 border-l-2 border-emerald-700 transition-[height] duration-[1600ms] ease-out"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-0 text-left lg:text-center"
                >
                  {/* Numbered circle, sits on the connector line */}
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div
                    tabIndex={0}
                    className="group flex-1 lg:mt-4 w-full bg-white border border-stone-200 hover:border-stone-400 focus:border-stone-400 rounded-xl p-6 transition-colors outline-none focus:ring-2 focus:ring-emerald-600/30"
                  >
                    <Icon aria-hidden="true" className={`w-7 h-7 mb-3 lg:mx-auto ${step.iconClass}`} />
                    <h3 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug mb-3">
                      {step.headline}
                    </h3>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${step.badgeClass}`}
                    >
                      {step.badge}
                    </span>

                    {/* Detail: hover/focus reveal on desktop, always visible on mobile */}
                    <div className="mt-3 max-h-40 lg:max-h-0 lg:group-hover:max-h-40 lg:group-focus:max-h-40 overflow-hidden transition-[max-height] duration-300 ease-out">
                      <p className="text-stone-600 text-xs leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Statement Bar */}
        <div className="mt-12 lg:mt-16 bg-stone-100 border border-stone-200 rounded-2xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-stone-300">
          <div className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-0 w-full sm:w-auto justify-center">
            <FileCheck aria-hidden="true" className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-stone-800">FSSAI Licensed Mill</span>
          </div>
          <div className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-0 w-full sm:w-auto justify-center">
            <Leaf aria-hidden="true" className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-stone-800">No chemical additives</span>
          </div>
          <button
            type="button"
            id="milling-process-verify-link"
            onClick={() => onNavigate('certifications')}
            className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-0 w-full sm:w-auto justify-center hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 rounded transition-colors"
          >
            <QrCode aria-hidden="true" className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-stone-800 underline decoration-dotted underline-offset-4">
              Batch-traceable via QR
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
