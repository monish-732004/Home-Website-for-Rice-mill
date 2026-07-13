/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Info, Phone, ArrowUpRight } from 'lucide-react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import ProcessSection from './components/ProcessSection';
import GallerySection from './components/GallerySection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import ProductDetailsModal from './components/ProductDetailsModal';
import EnquiryForm from './components/EnquiryForm';
import QuoteSection from './components/QuoteSection';

import { Product } from './types';
import { APP_INFO } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState<boolean>(false);

  // Sync scroll on tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeSection
            onNavigate={(id) => setActiveTab(id)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            openDealerModal={() => setIsDealerModalOpen(true)}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'products':
        return (
          <ProductsSection
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            openDealerModal={() => setIsDealerModalOpen(true)}
          />
        );
      case 'process':
        return <ProcessSection />;
      case 'gallery':
        return <GallerySection />;
      case 'certifications':
        return <CertificationsSection />;
      case 'quote':
        return <QuoteSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <HomeSection
            onNavigate={(id) => setActiveTab(id)}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
            openDealerModal={() => setIsDealerModalOpen(true)}
          />
        );
    }
  };

  return (
    <div id="app-shell" className="min-h-screen flex flex-col bg-stone-50 text-stone-850 selection:bg-emerald-800 selection:text-white">
      {/* Top Header & Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDealerModal={() => setIsDealerModalOpen(true)}
      />

      {/* Main Content Area with Page transitions */}
      <main id="main-content-wrapper" className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tab-content-${activeTab}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openDealerModal={() => setIsDealerModalOpen(true)}
      />

      {/* 1. Global Product Specifications Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            openDealerModal={() => setIsDealerModalOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* 2. Global Dealer Partnership Application Modal */}
      <AnimatePresence>
        {isDealerModalOpen && (
          <div id="dealer-modal-portal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-sans">
            {/* Backdrop */}
            <motion.div
              id="dealer-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDealerModalOpen(false)}
              className="fixed inset-0 bg-stone-950/80"
            />

            {/* Modal Box */}
            <motion.div
              id="dealer-modal-card"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 225 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-stone-250 flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-stone-100 p-5 flex justify-between items-start z-20">
                <div className="space-y-1 pr-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Wholesale Channel
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      B2B Portal
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 leading-tight">
                    Authorized Distributership Enquiry
                  </h3>
                  <p className="text-xs text-stone-400 font-medium tracking-tight">
                    ஸ்ரீ கன்னிகா பரமேஸ்வரி மாடர்ன் ரைஸ் மில்
                  </p>
                </div>
                <button
                  id="dealer-modal-close"
                  onClick={() => setIsDealerModalOpen(false)}
                  className="p-1.5 hover:bg-stone-100 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <EnquiryForm onSuccessClose={() => setIsDealerModalOpen(false)} />
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-stone-50 border-t border-stone-150 p-4 flex justify-between items-center text-[10px] text-stone-500 z-20 font-sans">
                <span className="flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                  <span>Verified ISO 22000:2018 Standards</span>
                </span>
                <span>Dealer Helpdesk: {APP_INFO.phone}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
