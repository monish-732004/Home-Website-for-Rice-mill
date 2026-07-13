/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { APP_INFO } from '../data';

export default function MobileActionBar() {
  const defaultMessage = 'Hello Sri Kannika Parameswari Rice Mill, I am interested in your premium rice varieties. Please share more details.';
  const waUrl = `https://wa.me/919944360308?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div
      id="mobile-action-bar"
      className="fixed bottom-0 left-0 right-0 bg-emerald-950/95 backdrop-blur-md border-t border-emerald-900/60 py-3.5 px-4 flex justify-around items-center z-50 sm:hidden shadow-2xl"
    >
      {/* Call Button */}
      <a
        id="mobile-action-call"
        href={`tel:${APP_INFO.phone}`}
        className="flex flex-col items-center space-y-1 text-emerald-100 hover:text-white transition-colors"
        aria-label="Call Mill Office"
      >
        <div className="w-10 h-10 bg-emerald-900/60 rounded-full flex items-center justify-center border border-emerald-800/40">
          <Phone className="w-4.5 h-4.5 text-amber-400" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        id="mobile-action-whatsapp"
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center space-y-1 text-emerald-100 hover:text-white transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-10 h-10 bg-emerald-900/60 rounded-full flex items-center justify-center border border-emerald-800/40">
          {/* Custom WhatsApp Logo SVG */}
          <svg
            className="w-5 h-5 fill-current text-emerald-400"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.486 5.355 1.488 5.487 0 9.954-4.41 9.957-9.83.001-2.624-1.013-5.091-2.861-6.942-1.847-1.85-4.307-2.87-6.932-2.87-5.49 0-9.96 4.41-9.963 9.831-.001 1.954.505 3.86 1.468 5.516l-.979 3.57 3.673-.963zm11.758-5.326c-.302-.152-1.791-.883-2.073-.985-.282-.102-.487-.152-.693.152-.206.305-.796.985-.975 1.189-.18.203-.359.229-.661.077-1.952-.977-3.136-1.748-4.394-3.914-.33-.568.33-.527.943-1.748.103-.203.051-.381-.026-.533-.077-.152-.693-1.67-.95-2.285-.25-.604-.503-.522-.693-.532-.18-.01-.385-.011-.59-.011-.205 0-.538.077-.82.385-.282.308-1.078 1.054-1.078 2.57 0 1.517 1.102 2.985 1.256 3.19.154.203 2.17 3.313 5.257 4.646.734.317 1.307.507 1.753.649.738.234 1.41.201 1.942.122.593-.088 1.791-.733 2.048-1.442.256-.709.256-1.317.18-1.442-.077-.127-.282-.203-.585-.356z" />
          </svg>
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase">WhatsApp</span>
      </a>

      {/* Location Button */}
      <a
        id="mobile-action-location"
        href={APP_INFO.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center space-y-1 text-emerald-100 hover:text-white transition-colors"
        aria-label="View Location Map"
      >
        <div className="w-10 h-10 bg-emerald-900/60 rounded-full flex items-center justify-center border border-emerald-800/40">
          <MapPin className="w-4.5 h-4.5 text-amber-400" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase">Map</span>
      </a>

      {/* Email Button */}
      <a
        id="mobile-action-email"
        href={`mailto:${APP_INFO.email}`}
        className="flex flex-col items-center space-y-1 text-emerald-100 hover:text-white transition-colors"
        aria-label="Email Mill Office"
      >
        <div className="w-10 h-10 bg-emerald-900/60 rounded-full flex items-center justify-center border border-emerald-800/40">
          <Mail className="w-4.5 h-4.5 text-amber-400" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider uppercase">Email</span>
      </a>
    </div>
  );
}
