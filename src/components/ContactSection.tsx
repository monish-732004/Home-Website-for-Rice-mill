/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Clock, Landmark, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
import ContactForm from './ContactForm';
import { APP_INFO } from '../data';

export default function ContactSection() {
  const supportChannels = [
    {
      title: 'Dealer Onboarding Desk',
      tamil: 'வியாபார முகவர் தொடர்பு',
      phone: APP_INFO.phone,
      email: APP_INFO.enquiryEmail,
      desc: 'Connect directly with our sales administration to negotiate wholesale order sheets, credit limits, and region exclusivity.'
    },
    {
      title: 'Milling & Bulk Logistics',
      tamil: 'ஆலை மற்றும் விநியோகம்',
      phone: APP_INFO.altPhone,
      email: 'logistics@kannikaricemill.com',
      desc: 'Get live updates on dispatch tracking, shipping consignments, container stuffing, or custom bulk packaging schedules.'
    },
    {
      title: 'Retail Queries & Feedback',
      tamil: 'வாடிக்கையாளர் சேவை',
      phone: APP_INFO.phone,
      email: APP_INFO.email,
      desc: 'For retail consumer issues, packaging quality feedback, crop analysis requests, or general inquiries.'
    }
  ];

  return (
    <div id="contact-section-container" className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Get In Touch</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Contact Our Mill Office</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">தொடர்பு கொள்ளவும் - நாங்கள் உதவ காத்திருக்கிறோம்</p>
        </div>
      </section>

      {/* Main Grid: Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col - Address & Hotlines */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 leading-tight">
              Headquarters & Processing Plant
            </h2>
            <div className="p-5 bg-white border border-stone-200/80 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5.5 h-5.5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="text-stone-700">
                  <p className="font-semibold text-stone-900">Sri Kannika Parameswari Modern Rice Mill</p>
                  <p className="mt-1 leading-relaxed text-xs">{APP_INFO.location}</p>
                </div>
              </div>
              <div className="border-t border-stone-100 pt-3 flex items-start space-x-3 text-sm">
                <Clock className="w-5.5 h-5.5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="text-stone-700 text-xs">
                  <p className="font-semibold text-stone-900">Milling Operations Schedule</p>
                  <p className="mt-1">{APP_INFO.workingHours}</p>
                  <p className="text-stone-400 text-[10px] italic mt-1">Open all 7 days a week.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Departmental contacts */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900">Departmental Hotlines</h3>
            <div className="space-y-4">
              {supportChannels.map((channel, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200/70 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-bold text-stone-900">{channel.title}</h4>
                      <p className="text-[9px] text-stone-400 font-medium">({channel.tamil})</p>
                    </div>
                  </div>
                  <p className="text-stone-500 leading-relaxed text-[11px]">{channel.desc}</p>
                  <div className="pt-2 border-t border-stone-200/40 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-emerald-800 font-semibold">
                    <a href={`tel:${channel.phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-emerald-700">
                      <Phone className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      <span>{channel.phone}</span>
                    </a>
                    <a href={`mailto:${channel.email}`} className="flex items-center hover:text-emerald-700">
                      <Mail className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      <span>{channel.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col - Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* Map Location Coordinates panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center">
                <Landmark className="w-5.5 h-5.5 text-emerald-800 mr-2" />
                <span>Facility Location & Directions</span>
              </h3>
              <p className="text-xs text-stone-500">Located on the Kallakurichi highway corridor for rapid truck transit routes.</p>
            </div>
            <a
              href={APP_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg text-xs font-semibold border border-stone-200 transition-colors"
            >
              <span>Get Driving Directions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* High-fidelity custom map placeholder panel */}
          <div className="aspect-[21/9] bg-stone-50 border border-stone-200 rounded-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(#0A4224_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
            <div className="space-y-3 z-10 max-w-sm">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow border border-emerald-100">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-sm">Sri Kannika Parameswari Modern Rice Mill</h4>
              <p className="text-stone-500 text-[11px] leading-relaxed">
                {APP_INFO.location}
              </p>
              <div className="inline-flex items-center space-x-1.5 text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 px-2.5 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Heavy Container Access Approved</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
