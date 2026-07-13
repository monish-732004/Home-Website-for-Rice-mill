/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Award, Landmark, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_INFO } from '../data';
import logoImg from '../assets/logo/logo.png';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDealerModal: () => void;
}

export default function Navbar({ activeTab, setActiveTab, openDealerModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', tamil: 'முகப்பு' },
    { id: 'about', label: 'About', tamil: 'எங்களைப் பற்றி' },
    { id: 'products', label: 'Our Products', tamil: 'தயாரிப்புகள்' },
    { id: 'process', label: 'Milling Process', tamil: 'நெல் செயலாக்கம்' },
    { id: 'gallery', label: 'Gallery', tamil: 'புகைப்படங்கள்' },
    { id: 'certifications', label: 'Certifications', tamil: 'சான்றிதழ்கள்' },
    { id: 'quote', label: 'Get a Quote', tamil: 'விலைப்பட்டியல்' },
    { id: 'dealers', label: 'Dealer Portal', tamil: 'முகவர் தளம்' },
    { id: 'contact', label: 'Contact Us', tamil: 'தொடர்புக்கு' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div id="top-bar" className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-2 px-4 border-b border-emerald-900 flex justify-between items-center z-50 relative font-sans">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-amber-400">
            <Landmark className="w-3.5 h-3.5 mr-1.5" />
            <span>Est. 2011 in Kallakurichi</span>
          </span>
          <span className="hidden md:flex items-center text-emerald-300">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span>Kallakurichi, Tamil Nadu</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a href={`tel:${APP_INFO.phone}`} className="flex items-center hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span>{APP_INFO.phone}</span>
          </a>
          <a href={`mailto:${APP_INFO.email}`} className="hidden sm:flex items-center hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span>{APP_INFO.email}</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200 py-3'
            : 'bg-stone-50/90 backdrop-blur-sm border-b border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              id="header-logo"
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-250 overflow-hidden">
                <img 
                  className='w-full h-full object-cover rounded-full'
                  src={logoImg}
                  alt="Sri Kannika Parameswari Rice Mill Logo"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-stone-900 text-sm sm:text-base md:text-lg leading-tight tracking-tight uppercase">
                  Sri Kannika Parameswari
                </span>
                <span className="font-sans text-[10px] sm:text-xs text-stone-500 font-medium tracking-wider flex items-center uppercase">
                  <span>Modern Rice Mill</span>
                  <span className="mx-1 text-stone-300">•</span>
                  <span className="text-emerald-800 font-semibold text-[9px] sm:text-[10px]">பொன்னி அரிசி</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className="relative px-3.5 py-2 text-stone-700 hover:text-emerald-800 transition-colors duration-200 rounded-md text-sm font-medium group text-left"
                  >
                    <div className="flex flex-col">
                      <span className={`${isActive ? 'text-emerald-800 font-semibold' : 'text-stone-800'}`}>
                        {item.label}
                      </span>
                      <span className="text-[9px] text-stone-400 font-normal leading-none group-hover:text-emerald-600 transition-colors">
                        {item.tamil}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-emerald-800"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Call to Action Button */}
            <div className="hidden lg:flex items-center">
              <button
                id="cta-nav-dealer"
                onClick={openDealerModal}
                className="px-5 py-2.5 border border-emerald-800 hover:bg-emerald-800 hover:text-white text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 flex items-center space-x-1.5 active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>Enquiry</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <button
                id="cta-mobile-dealer"
                onClick={openDealerModal}
                className="px-4 py-1.5 border border-emerald-800 hover:bg-emerald-800 hover:text-white text-emerald-800 rounded-full text-[10px] font-bold uppercase tracking-wider active:scale-95 transition-all"
              >
                Enquiry
              </button>
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-stone-600 hover:text-emerald-850 hover:bg-stone-100 rounded-md focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-30 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-[320px] bg-white z-40 shadow-2xl p-6 flex flex-col lg:hidden border-l border-stone-200 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-stone-900 text-sm">Sri Kannika Parameswari</span>
                  <span className="font-sans text-[10px] text-stone-500 tracking-wide uppercase">Modern Rice Mill</span>
                </div>
                <button
                  id="mobile-drawer-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav id="mobile-nav-list" className="flex-1 py-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-btn-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-[10px] text-stone-400 font-normal">{item.tamil}</span>
                      </div>
                      <span className="text-stone-300">→</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-stone-100 space-y-4">
                <button
                  id="mobile-drawer-cta"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openDealerModal();
                  }}
                  className="w-full border border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white text-center py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Dealer Enquiry</span>
                </button>
                <div className="text-center text-[10px] text-stone-400 font-mono">
                  <span>Tamil Nadu, India</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
