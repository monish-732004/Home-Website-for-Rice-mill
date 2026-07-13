/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919944360308';
  const defaultMessage = 'Hello Sri Kannika Parameswari Rice Mill, I am interested in your premium rice varieties. Please share more details.';
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      id="whatsapp-float-wrapper"
      className="fixed bottom-6 right-6 z-40 hidden sm:block"
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            id="whatsapp-tooltip"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-16 right-0 bg-stone-900 text-stone-100 text-xs px-3.5 py-2 rounded-xl shadow-xl font-medium border border-stone-800 whitespace-nowrap z-50 flex items-center space-x-1.5"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Chat with Us on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        id="whatsapp-link"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-800/30 border border-emerald-500/20 relative group transition-colors cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle pulsing background ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none scale-110" />

        {/* WhatsApp Brand SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.486 5.355 1.488 5.487 0 9.954-4.41 9.957-9.83.001-2.624-1.013-5.091-2.861-6.942-1.847-1.85-4.307-2.87-6.932-2.87-5.49 0-9.96 4.41-9.963 9.831-.001 1.954.505 3.86 1.468 5.516l-.979 3.57 3.673-.963zm11.758-5.326c-.302-.152-1.791-.883-2.073-.985-.282-.102-.487-.152-.693.152-.206.305-.796.985-.975 1.189-.18.203-.359.229-.661.077-1.952-.977-3.136-1.748-4.394-3.914-.33-.568.33-.527.943-1.748.103-.203.051-.381-.026-.533-.077-.152-.693-1.67-.95-2.285-.25-.604-.503-.522-.693-.532-.18-.01-.385-.011-.59-.011-.205 0-.538.077-.82.385-.282.308-1.078 1.054-1.078 2.57 0 1.517 1.102 2.985 1.256 3.19.154.203 2.17 3.313 5.257 4.646.734.317 1.307.507 1.753.649.738.234 1.41.201 1.942.122.593-.088 1.791-.733 2.048-1.442.256-.709.256-1.317.18-1.442-.077-.127-.282-.203-.585-.356z" />
        </svg>
      </motion.a>
    </div>
  );
}
