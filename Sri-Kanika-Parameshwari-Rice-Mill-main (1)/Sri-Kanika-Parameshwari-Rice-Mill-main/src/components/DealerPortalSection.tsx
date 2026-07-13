/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Landmark, 
  FileText, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  DownloadCloud, 
  Lock, 
  TrendingUp, 
  MessageSquare,
  Key,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import EnquiryForm from './EnquiryForm';
import AdminDashboard from './AdminDashboard';
import { PRODUCTS, APP_INFO } from '../data';
import { supabase } from '../supabaseClient';

interface DealerPortalSectionProps {
  onNavigate?: (tabId: string) => void;
}

export default function DealerPortalSection({ onNavigate }: DealerPortalSectionProps) {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [showPasscodeGate, setShowPasscodeGate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    // Check initial active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAdminUnlocked(true);
      }
    });

    // Listen to changes in auth states
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminUnlocked(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Custom message channel state
  const [msgName, setMsgName] = useState('');
  const [msgRef, setMsgRef] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSuccess, setMsgSuccess] = useState(false);

  const benefits = [
    {
      title: 'Bulk Pricing & Margin Tiers',
      tamil: 'மொத்த விலை மற்றும் லாப வரம்பு',
      desc: 'Tiered wholesale discounts ranging from 6% to 15% depending on monthly tonnage commitment. Guaranteed price locks for 30-day supply windows.',
      icon: TrendingUp
    },
    {
      title: 'Territory Lock Exclusivity',
      tamil: 'வட்டார வணிக உரிமை',
      desc: 'Approved regional distributors get geographic boundary protection. We direct all inquiries from your pin codes straight to your dealership ledger.',
      icon: Landmark
    },
    {
      title: 'Credit & Payment Terms',
      tamil: 'கொள்முதல் கடன் வசதி',
      desc: 'Verified businesses enjoy up to 30-day payment facilities after initial 3 cycles. Complete digital invoicing with GST compliance ledger.',
      icon: ShieldCheck
    },
    {
      title: 'Direct Delta Logistics',
      tamil: 'நேரடி போக்குவரத்து வசதி',
      desc: 'Continuous dispatch from our central silos in Kallakurichi. Direct shipping via heavy trailers, container stuffing support, and real-time transit tracking.',
      icon: Award
    }
  ];

  // Dynamic Brochure download generator
  const downloadBrochure = () => {
    const header = `==========================================================\n` +
                   `          SRI KANNIKA PARAMESWARI MODERN RICE MILL\n` +
                   `              B2B WHOLESALE PRODUCT CATALOGUE\n` +
                   `               Established 1992 • Kallakurichi\n` +
                   `==========================================================\n\n` +
                   `Facility Location: ${APP_INFO.location}\n` +
                   `Office Phone: ${APP_INFO.phone}\n` +
                   `Sales Email: ${APP_INFO.enquiryEmail}\n` +
                   `ISO Food Safety Certification: ISO 22000:2018 Registered\n` +
                   `FSSAI Central Licence No: ${APP_INFO.fssai}\n` +
                   `AGMARK Rating: Grade-A Premium Quality Certification\n\n` +
                   `----------------------------------------------------------\n` +
                   `              OUR BULK PRODUCT LINE DETAILS\n` +
                   `----------------------------------------------------------\n\n`;

    const body = PRODUCTS.map(p => {
      return `Product Name:   ${p.name}\n` +
             `Tamil Name:     ${p.tamilName}\n` +
             `Category:       ${p.category.toUpperCase()}\n` +
             `Tagline:        ${p.tagline}\n` +
             `Description:    ${p.description}\n` +
             `Specifications:\n` +
             `  - Moisture:         ${p.specs.moisture}\n` +
             `  - Broken Grains:    ${p.specs.brokenGrains}\n` +
             `  - Avg Grain Length: ${p.specs.grainLength}\n` +
             `  - Optical Purity:   ${p.specs.sortingAccuracy}\n` +
             `  - Shelf Life:       ${p.specs.shelfLife}\n` +
             `Pack Sizes Available for Bulk: ${p.packSizes.join(', ')}\n` +
             `----------------------------------------------------------\n\n`;
    }).join('');

    const footer = `==========================================================\n` +
                   `           PARTNERSHIP PROGRAM BENEFITS SUMMARY\n` +
                   `==========================================================\n` +
                   `1. Margin Incentives: Up to 15% discount on bulk lists.\n` +
                   `2. Exclusivity protection locks in designated pincodes.\n` +
                   `3. 15 to 30 days interest-free credit terms upon verification.\n` +
                   `4. High-capacity continuous processing (150 tons daily yield).\n\n` +
                   `To finalize your wholesale rates or order custom brand bag packaging,\n` +
                   `please submit your application through the portal or call our B2B Desk.\n` +
                   `Document ID: SKP-B2B-BROCHURE-2026\n`;

    const blob = new Blob([header + body + footer], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Kannika_Rice_Mill_B2B_Brochure.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdminVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthError(error.message);
      } else {
        setIsAdminUnlocked(true);
        setShowPasscodeGate(false);
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setAuthError('Connection failed. Please verify your database configurations.');
    } finally {
      setAuthLoading(false);
    }
  };

  const submitDealerMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgName || !msgText) {
      alert('Please fill out the name and query message fields.');
      return;
    }

    const randomId = 'MSG-' + Math.floor(100000 + Math.random() * 900000);
    
    try {
      // 1. Try to write to Supabase
      const { error } = await supabase
        .from('dealer_messages')
        .insert([
          {
            sender_name: msgName,
            reference_id: msgRef || 'N/A',
            message: msgText,
            status: 'unread'
          }
        ]);

      if (error) {
        console.error('Supabase B2B message write error:', error);
      }
    } catch (err) {
      console.error('Network or client initialization error:', err);
    }

    setMsgSuccess(true);
    setMsgName('');
    setMsgRef('');
    setMsgText('');

    // 2. Always save locally as fallback
    const existing = JSON.parse(localStorage.getItem('skp_dealer_messages') || '[]');
    existing.push({
      id: randomId,
      senderName: msgName,
      referenceId: msgRef || 'N/A',
      message: msgText,
      date: new Date().toISOString(),
      status: 'unread'
    });
    localStorage.setItem('skp_dealer_messages', JSON.stringify(existing));
  };

  // If Admin mode is unlocked, immediately render the Dashboard
  if (isAdminUnlocked) {
    return <AdminDashboard onLogout={() => setIsAdminUnlocked(false)} />;
  }

  return (
    <div id="dealer-portal-container" className="space-y-16 pb-16 font-sans">
      {/* Page Hero */}
      <section className="bg-emerald-950 text-white py-14 border-b-4 border-amber-500 relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 relative z-10">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">
            B2B Commercial Division
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Authorized Wholesaler & Distributor Portal
          </h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">
            ஸ்ரீ கன்னிகா பரமேஸ்வரி மாடர்ன் ரைஸ் மில் - வியாபார கூட்டாளி தளம்
          </p>
        </div>
      </section>

      {/* Main Grid: Benefits & Application Forms */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Program Details & Brochure Access (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Program description */}
          <div className="space-y-4">
            <h2 className="font-serif font-bold text-2xl text-stone-900 leading-tight">
              Partnering with Kallakurichi's Premier Milling Facility
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              We process over 150 tons of premium paddy daily, serving as a trusted primary supply chain partner to bulk rice traders, retail supermarkets, hotels, and exporters across South India. Our distributor network is backboned by professional logistics coordinators and continuous optical sorting standards.
            </p>
          </div>

          {/* Benefits Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 mt-2">{b.title}</h3>
                    <p className="text-[10px] text-stone-400 font-semibold leading-none">({b.tamil})</p>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed mt-2">{b.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Product Resource Center (Brochure Downloads) */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                <FileText className="w-5.5 h-5.5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900">B2B Documentation & Resource Center</h3>
                <p className="text-stone-500 text-xs mt-0.5">Download full wholesale parameters, certificate sheets, and grain standards.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-stone-150 p-4 rounded-lg flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Wholesale Pricing</span>
                  <h4 className="font-serif font-bold text-xs text-stone-900">Product Specifications & Catalogue</h4>
                  <p className="text-[11px] text-stone-500">Includes grain sizes, moisture ranges, and pack sizes.</p>
                </div>
                <button
                  onClick={downloadBrochure}
                  className="w-full text-center bg-stone-100 hover:bg-emerald-800 hover:text-white text-emerald-950 font-bold text-xs uppercase tracking-wider py-2 rounded transition-colors flex items-center justify-center space-x-1.5"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>Download Catalog</span>
                </button>
              </div>

              <div className="border border-stone-150 p-4 rounded-lg flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">ISO 22000:2018</span>
                  <h4 className="font-serif font-bold text-xs text-stone-900">Compliance & Safety Certifications</h4>
                  <p className="text-[11px] text-stone-500">FSSAI license copies and AGMARK grade standards.</p>
                </div>
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('certifications');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full text-center bg-stone-100 hover:bg-emerald-800 hover:text-white text-emerald-950 font-bold text-xs uppercase tracking-wider py-2 rounded transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Verify Credentials</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Message & Communication Portal */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-emerald-800" />
              <h3 className="font-serif font-bold text-base text-stone-900">Partner Helpdesk Message</h3>
            </div>
            <p className="text-stone-500 text-xs leading-relaxed">
              If you have already applied or possess an active wholesale customer ID, send a direct support query to our logistics or finance coordinators.
            </p>

            {msgSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center space-y-2 text-xs">
                <p className="font-bold text-emerald-850">Query Sent Successfully!</p>
                <p className="text-stone-600">Your message has been queued for response in the client dashboard logs.</p>
                <button
                  onClick={() => setMsgSuccess(false)}
                  className="text-emerald-800 hover:underline font-bold text-[10px] uppercase mt-1 tracking-wider"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submitDealerMessage} className="space-y-3.5 text-xs text-stone-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Company / Sender Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sona Traders"
                      value={msgName}
                      onChange={(e) => setMsgName(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Application ID or Phone (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. SKP-DLR-82910"
                      value={msgRef}
                      onChange={(e) => setMsgRef(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Your Enquiry Detail *</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about credit terms issues, dispatch scheduling, or bulk packaging custom logo requests..."
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-700 text-stone-50 font-bold uppercase tracking-wider py-2 px-6 rounded transition-all text-[11px] shadow-sm ml-auto block"
                >
                  Submit Query
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Side: Registration Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-md shadow-stone-100 space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Distributor Onboarding
            </span>
            <h3 className="font-serif font-bold text-lg text-stone-900 mt-2">Apply for Authorized Dealership</h3>
            <p className="text-stone-500 text-xs mt-0.5">Fields marked * are mandatory for verification.</p>
          </div>
          <EnquiryForm />
        </div>

      </section>

      {/* Admin Entrance Trigger Section */}
      <section className="max-w-xl mx-auto px-4 text-center border-t border-stone-200/60 pt-10">
        <div className="space-y-4">
          <div className="inline-flex w-10 h-10 bg-stone-100 rounded-full items-center justify-center border border-stone-200/60">
            <Lock className="w-4.5 h-4.5 text-stone-400" />
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-stone-850">Client Administration Portal Gateway</h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              Authorized personnel can access incoming dealer request sheets, adjust partner approval pipelines, and export database registries.
            </p>
          </div>

          <AnimatePresence>
            {showPasscodeGate ? (
              <motion.form
                onSubmit={handleAdminVerify}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-xl border border-stone-200 max-w-sm mx-auto shadow-md space-y-4 text-xs text-left"
              >
                <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-100 pb-2">
                  Admin Verification Sign In
                </h4>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-850 block">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="email"
                      placeholder="e.g. admin@kannikaricemill.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-750"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-850 block">Password *</label>
                  <div className="relative">
                    <Key className="absolute left-2.5 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-750"
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-rose-800 text-[10px] flex items-center mt-1 leading-normal">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}

                <div className="flex gap-2 justify-end pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasscodeGate(false);
                      setAuthError('');
                      setEmail('');
                      setPassword('');
                    }}
                    className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded transition-colors"
                    disabled={authLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 disabled:bg-emerald-800/60 text-white font-bold rounded transition-colors flex items-center gap-1.5"
                    disabled={authLoading}
                  >
                    {authLoading ? 'Verifying...' : 'Sign In'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <button
                id="portal-gateway-trigger"
                onClick={() => setShowPasscodeGate(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-stone-700 hover:text-stone-900 font-bold bg-white px-4 py-2 border border-stone-250 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Launch Client Admin Console</span>
              </button>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
