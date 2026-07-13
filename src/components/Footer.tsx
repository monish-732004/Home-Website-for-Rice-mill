/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Award, Flame, Heart } from 'lucide-react';
import { APP_INFO } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openDealerModal: () => void;
}

export default function Footer({ setActiveTab, openDealerModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { label: 'Home Page', id: 'home' },
    { label: 'About Our Mill', id: 'about' },
    { label: 'Ponni Products', id: 'products' },
    { label: 'Milling Process', id: 'process' },
    { label: 'Facility Gallery', id: 'gallery' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Get a Quote', id: 'quote' },
    { label: 'Contact Us', id: 'contact' },
  ];

  return (
    <footer id="main-footer" className="bg-stone-900 text-stone-300 border-t-4 border-emerald-800 font-sans">
      {/* Top CTA Banner */}
      <div id="footer-cta-banner" className="bg-emerald-950/60 py-10 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight">
              Looking to become an Authorized Distributer?
            </h3>
            <p className="text-emerald-300/80 text-sm mt-1 max-w-xl">
              We offer highly competitive dealer margins, reliable logistics support, and guaranteed batch-to-batch quality metrics.
            </p>
          </div>
          <button
            id="footer-dealer-btn"
            onClick={openDealerModal}
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs uppercase tracking-wider py-3.5 px-6 rounded-lg transition-colors active:scale-95 duration-150 flex items-center space-x-2 shadow-lg shadow-amber-600/10"
          >
            <Award className="w-4 h-4" />
            <span>Apply For Dealership</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div id="footer-col-brand" className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-800 text-white p-2 rounded-lg font-serif font-bold text-lg">
              <span>SKP</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-white text-base leading-tight">
                Sri Kannika Parameswari
              </span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-semibold">
                Modern Rice Mill
              </span>
            </div>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            Nurtured by the rich waters of Cauvery and crafted with global-tier Bühler Sortex color-sorters, we deliver rice of unmatched pristine quality, purity, and heritage.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-amber-500 font-semibold bg-amber-950/30 border border-amber-900/40 py-1.5 px-3 rounded-lg w-fit">
            <Flame className="w-3.5 h-3.5" />
            <span>Celebrating 15+ Years of Purity</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div id="footer-col-links" className="space-y-6">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-stone-800 pb-2.5">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.id}>
                <button
                  id={`footer-nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className="text-stone-400 hover:text-white transition-colors duration-200 text-sm flex items-center group text-left"
                >
                  <span className="mr-1.5 text-stone-600 group-hover:text-amber-500 transition-colors">▪</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div id="footer-col-contact" className="space-y-6">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-stone-800 pb-2.5">
            Head Office & Mill
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-stone-400 leading-relaxed">
                {APP_INFO.location}
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="flex flex-col">
                <a href={`tel:${APP_INFO.phone}`} className="text-stone-400 hover:text-white transition-colors">
                  {APP_INFO.phone}
                </a>
                <a href={`tel:${APP_INFO.altPhone}`} className="text-stone-400 hover:text-white transition-colors">
                  {APP_INFO.altPhone}
                </a>
              </div>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href={`mailto:${APP_INFO.email}`} className="text-stone-400 hover:text-white transition-colors break-all">
                {APP_INFO.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Operating Hours & Map link */}
        <div id="footer-col-hours" className="space-y-6">
          <h4 className="font-serif font-bold text-white text-sm uppercase tracking-wider border-b border-stone-800 pb-2.5">
            Operation Hours
          </h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 text-sm">
              <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-stone-400">
                <p className="font-medium text-stone-200">{APP_INFO.workingHours}</p>
                <p className="text-xs text-stone-500 mt-1">Open 7 days a week to serve you better.</p>
              </div>
            </div>
            <a
              id="footer-map-link"
              href={APP_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-amber-500 hover:text-amber-400 font-semibold bg-stone-800 hover:bg-stone-750 p-2.5 rounded-lg border border-stone-700/60 transition-all w-full justify-center"
            >
              <span>View On Google Maps</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Section */}
      <div id="footer-bottom-bar" className="border-t border-stone-800 bg-stone-950 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left space-y-1">
            <p>© {currentYear} Sri Kannika Parameswari Modern Rice Mill. All Rights Reserved.</p>
            <p className="text-stone-600">GSTIN: {APP_INFO.gstNumber}</p>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Quality Policy</span>
            <span className="text-stone-700">|</span>
            <span className="hover:text-stone-400 transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="text-stone-700">|</span>
            <div className="flex items-center space-x-1 text-[11px] text-stone-600">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-emerald-700 fill-emerald-700" />
              <span>for Tamil Agriculture</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
