/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, FileCheck, ShieldCheck, Scale, Microscope, ShieldCheck as VerifiedIcon, CheckCircle2, ChevronRight } from 'lucide-react';
import { CERTIFICATIONS } from '../data';

export default function CertificationsSection() {
  // Mapping mock icon strings to actual Lucide Icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-10 h-10 text-emerald-800" />;
      case 'FileCheck':
        return <FileCheck className="w-10 h-10 text-emerald-800" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-10 h-10 text-emerald-800" />;
      default:
        return <Award className="w-10 h-10 text-emerald-800" />;
    }
  };

  const labAudits = [
    {
      title: 'Moisture Capacity Auditing',
      tamil: 'ஈரப்பதம் அளவீட்டு சோதனை',
      description: 'Moisture is measured using high-frequency digital capacitance analyzers. We strictly enforce a threshold of 12.0% to 13.5%. This specific dry range preserves natural aroma and eliminates any chance of warehouse fungal mold or weevil infestation, while maintaining a long 2-year shelf life.'
    },
    {
      title: 'Purity & Speck Photo-Analysis',
      tamil: 'கலர் சார்ட்டர் தானியங்கி சோதனை',
      description: 'Samples from each batch pass through computerized digital color-analyzers to verify optical quality. We guarantee less than 1.5% chalkiness and near-zero yellow tips. Any sample displaying dark specks or immature white grains is immediately flagged for milling recalibration.'
    },
    {
      title: 'Batch Elongation & Thermal Cooking Test',
      tamil: 'சமையல் சோதனை மற்றும் நீள அளவு',
      description: 'Prior to bulk bagging, random rice samples are cooked in our laboratory kitchen. Technicians verify water-absorption coefficients and grain expansion. Our aged Ponni is guaranteed to expand to at least 2.5x its original volume without clumping or sticking.'
    },
    {
      title: 'Chemical & Pesticide Heavy Screening',
      tamil: 'பூச்சிக்கொல்லி மற்றும் இரசாயன வடிகட்டி',
      description: 'Working with regional delta agronomists, we run rapid chemical screening on incoming paddy loads. We strictly enforce zero artificial bleaching, zero toxic polishing agents, and absolute compliance with national pesticide threshold values.'
    }
  ];

  return (
    <div id="certs-section-container" className="space-y-16 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Quality Assurance & Compliance</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Standard Certifications</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">தரச் சான்றிதழ்கள் மற்றும் அங்கீகாரங்கள்</p>
        </div>
      </section>

      {/* Primary Badges Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              id={`cert-card-${cert.id}`}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-xl flex items-center justify-center shadow-sm">
                  {getIcon(cert.iconName)}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-stone-900">{cert.title}</h3>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase">{cert.authority}</p>
                </div>
                <p className="text-stone-600 text-xs leading-relaxed border-t border-stone-100 pt-3">
                  {cert.description}
                </p>
              </div>
              <div className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50/50 py-1.5 px-3 rounded-lg w-fit mt-4">
                {cert.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Testing Section */}
      <section className="bg-stone-100 py-16 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lab narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider flex items-center">
                <Microscope className="w-4 h-4 mr-1.5" />
                <span>In-House Lab Auditing</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                Quality Checked Before Bagging
              </h2>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              At Sri Kannika Parameswari Modern Rice Mill, quality is not a post-milling afterthought. We run a fully equipped Quality Assurance Laboratory directly at our Kallakurichi facility. Sourced loads must clear rigorous chemical, physical, and sensory audits before they are allowed into the storage silos.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Our batch numbers are integrated with custom QR-codes on the bags, enabling our distributors, retailers, and end-consumers to trace their rice directly back to the date of processing and the delta cooperative block where the paddy was grown.
            </p>
            <div className="bg-white p-4 rounded-xl border border-stone-200/60 space-y-2">
              <p className="font-bold text-xs text-stone-900">Laboratory Guarantee Metrics</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-stone-500">
                <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Moisture: &lt; 13.5%</span>
                <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Broken Grain: &lt; 1.5%</span>
                <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Chalky Kernels: &lt; 2.0%</span>
                <span className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Stone Impurity: 0%</span>
              </div>
            </div>
          </div>

          {/* Detailed Lab Audits */}
          <div className="lg:col-span-7 space-y-5">
            {labAudits.map((audit, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-start space-x-4">
                <span className="bg-emerald-50 text-emerald-800 font-mono font-bold text-xs w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                  {idx + 1}
                </span>
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <h4 className="font-serif font-bold text-stone-900 text-sm">{audit.title}</h4>
                    <span className="text-[10px] text-stone-400 font-medium">({audit.tamil})</span>
                  </div>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {audit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
