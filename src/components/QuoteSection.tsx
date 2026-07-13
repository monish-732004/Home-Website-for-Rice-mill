/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Upload,
  User,
} from 'lucide-react';

// Replace with your actual business contact details.
const QUOTE_PHONE_DISPLAY = '+91 99443 60308';
const QUOTE_PHONE_DIGITS = QUOTE_PHONE_DISPLAY.replace(/\D/g, '');
const QUOTE_EMAIL = 'srikannika.ricemill@gmail.com';

type UserType = 'Customer' | 'Wholesaler' | 'Dealer' | 'Enterprise';

interface QuoteFormData {
  userType: UserType;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  gstNumber: string;
  category: string;
  quantity: string;
  specs: string;
  fileName: string;
  urgency: string;
  city: string;
  deliveryDate: string;
  budget: string;
  notes: string;
  consent: boolean;
}

const DEFAULT_FORM_DATA: QuoteFormData = {
  userType: 'Customer',
  name: '',
  email: '',
  phone: '',
  companyName: '',
  gstNumber: '',
  category: '',
  quantity: '',
  specs: '',
  fileName: '',
  urgency: '',
  city: '',
  deliveryDate: '',
  budget: '',
  notes: '',
  consent: false,
};

const USER_TYPES: UserType[] = ['Customer', 'Wholesaler', 'Dealer', 'Enterprise'];
const CATEGORIES = [
  'Raw Rice - Aged Golden Ponni',
  'Raw Rice - Kichadi / Sona Masoori Type',
  'Boiled Rice',
  'Steamed Rice',
  'Broken Rice',
  'Rice Bran / Mill By-products',
  'Custom Private Label Packing',
  'Other',
];
const QUANTITY_OPTIONS = ['1 - 10', '11 - 100', '100 - 1000', '1000+'];
const URGENCY_OPTIONS = ['Flexible', 'Within a month', 'This week', 'Urgent'];
const BUDGET_OPTIONS = ['Not sure', 'Under ₹50,000', '₹50k - ₹5 lakh', '₹5 lakh+'];

const STEP_TITLES = ['Who are you?', 'What do you need?', 'Delivery & budget', 'Review & submit'];
const STEP_TAMIL = ['நீங்கள் யார்?', 'உங்களுக்கு என்ன தேவை?', 'விநியோகம் & பட்ஜெட்', 'மதிப்பாய்வு & சமர்ப்பிக்கவும்'];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isBusinessType(userType: UserType) {
  return userType !== 'Customer';
}

function buildSummaryMessage(data: QuoteFormData) {
  const lines = [
    "Hi, I'd like a quotation.",
    `Name: ${data.name}`,
    `Type: ${data.userType}`,
  ];
  if (isBusinessType(data.userType) && data.companyName) {
    lines.push(`Company: ${data.companyName}${data.gstNumber ? ` (GST: ${data.gstNumber})` : ''}`);
  }
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  lines.push(`Category: ${data.category || 'Not specified'}`);
  if (data.quantity) lines.push(`Quantity: ${data.quantity}`);
  if (data.specs) lines.push(`Specifications: ${data.specs}`);
  if (data.urgency) lines.push(`Urgency: ${data.urgency}`);
  if (data.city) lines.push(`Delivery Location: ${data.city}`);
  if (data.deliveryDate) lines.push(`Expected Delivery: ${data.deliveryDate}`);
  if (data.budget) lines.push(`Budget: ${data.budget}`);
  lines.push(`Notes: ${data.notes || 'None'}`);
  return lines.join('\n');
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div id="quote-progress-bar" className="flex items-center mb-10">
      {STEP_TITLES.map((title, idx) => {
        const isCompleted = idx < step;
        const isActive = idx === step;
        return (
          <React.Fragment key={title}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm font-bold transition-colors shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-800 border-emerald-800 text-white'
                    : isActive
                    ? 'border-emerald-800 text-emerald-800 bg-white'
                    : 'border-stone-300 text-stone-400 bg-white'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span
                className={`mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide hidden sm:block max-w-[80px] leading-tight ${
                  isActive || isCompleted ? 'text-emerald-800' : 'text-stone-400'
                }`}
              >
                {title}
              </span>
            </div>
            {idx < STEP_TITLES.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1.5 sm:mx-3 mb-5 sm:mb-6 transition-colors ${
                  idx < step ? 'bg-emerald-800' : 'bg-stone-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function PillGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            id={`${name}-pill-${opt.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors active:scale-95 ${
              active
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : 'border-stone-300 text-stone-700 hover:border-emerald-600 hover:text-emerald-800'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Field({
  label,
  required,
  optionalNote,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optionalNote?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
        {label} {required && <span className="text-red-500">*</span>}
        {optionalNote && <span className="text-stone-400 text-[10px] font-normal normal-case ml-1">{optionalNote}</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs flex items-center mt-1">
          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError?: boolean) =>
  `w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
    hasError ? 'border-red-500 focus:ring-red-500/20' : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
  }`;

export default function QuoteSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuoteFormData>(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const cardTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cardTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step, submitted]);

  const update = <K extends keyof QuoteFormData>(key: K, value: QuoteFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validateStep = (idx: number): Partial<Record<keyof QuoteFormData, string>> => {
    const next: Partial<Record<keyof QuoteFormData, string>> = {};
    if (idx === 0) {
      if (data.name.trim().length < 2) next.name = 'Please enter your full name';
      if (!emailRegex.test(data.email)) next.email = 'Please enter a valid email address';
      if (isBusinessType(data.userType) && data.companyName.trim().length < 2) {
        next.companyName = 'Company name is required for business accounts';
      }
    } else if (idx === 1) {
      if (!data.category) next.category = 'Please select a product category';
    } else if (idx === 3) {
      if (!data.consent) next.consent = 'Please confirm before submitting your request';
    }
    return next;
  };

  const goNext = () => {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((s) => Math.min(s + 1, STEP_TITLES.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    const stepErrors = validateStep(3);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    const id = 'SKP-QT-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(id);

    const existing = JSON.parse(localStorage.getItem('skp_quote_requests') || '[]');
    existing.push({ ...data, id, date: new Date().toISOString() });
    localStorage.setItem('skp_quote_requests', JSON.stringify(existing));

    setSubmitted(true);
  };

  const resetForm = () => {
    setData(DEFAULT_FORM_DATA);
    setErrors({});
    setStep(0);
    setSubmitted(false);
  };

  const message = buildSummaryMessage(data);
  const whatsappUrl = `https://wa.me/${QUOTE_PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
  const mailtoUrl = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(
    `New Quote Request from ${data.name || 'Website Visitor'}`
  )}&body=${encodeURIComponent(message)}`;
  const telUrl = `tel:+${QUOTE_PHONE_DIGITS}`;

  const summaryRows: { label: string; value: string }[] = [
    { label: 'Enquirer Type', value: data.userType },
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Company', value: isBusinessType(data.userType) ? data.companyName : '' },
    { label: 'GST Number', value: isBusinessType(data.userType) ? data.gstNumber : '' },
    { label: 'Product Category', value: data.category },
    { label: 'Quantity', value: data.quantity },
    { label: 'Technical Specifications', value: data.specs },
    { label: 'Attached File', value: data.fileName },
    { label: 'Urgency', value: data.urgency },
    { label: 'Delivery Location', value: data.city },
    { label: 'Expected Delivery Date', value: data.deliveryDate },
    { label: 'Budget', value: data.budget },
    { label: 'Additional Notes', value: data.notes },
  ].filter((row) => row.value);

  return (
    <div id="quote-section-container" className="font-sans">
      {/* Page Header */}
      <section className="bg-emerald-950 text-white py-12 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Quotation & Enquiry</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Request a Quotation</h1>
          <p className="text-emerald-300/80 text-sm max-w-xl mx-auto">
            விலைப்பட்டியல் கோருக - நாங்கள் 24 மணி நேரத்தில் பதிலளிப்போம்
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16" ref={cardTopRef}>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-8">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                id="quote-success-card"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-bold text-stone-900">Request Received!</h2>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Thank you, {data.name || 'valued customer'}. Choose how you'd like to send us your details below,
                    or wait for our team to reach out directly.
                  </p>
                </div>

                <div className="bg-stone-100 border border-stone-200 py-3 px-6 rounded-xl inline-block">
                  <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Reference Number</p>
                  <p className="text-lg font-bold font-mono text-emerald-800 tracking-wider mt-1">{referenceId}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
                  <a
                    id="success-cta-whatsapp"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-lg transition-colors active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    id="success-cta-email"
                    href={mailtoUrl}
                    className="flex items-center justify-center space-x-2 border border-emerald-800 text-emerald-800 hover:bg-emerald-50 font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-lg transition-colors active:scale-95"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </a>
                  <a
                    id="success-cta-call"
                    href={telUrl}
                    className="flex items-center justify-center space-x-2 border border-stone-300 text-stone-700 hover:border-amber-500 hover:text-amber-700 font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-lg transition-colors active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us Now</span>
                  </a>
                </div>

                <button
                  id="quote-reset-btn"
                  onClick={resetForm}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Submit another request</span>
                </button>
              </motion.div>
            ) : (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                <ProgressBar step={step} />

                <div className="mb-6">
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">{STEP_TITLES[step]}</h2>
                  <p className="text-xs text-stone-400 mt-1">{STEP_TAMIL[step]}</p>
                </div>

                {/* Step 0: Who are you */}
                {step === 0 && (
                  <div className="space-y-5">
                    <Field label="I am a">
                      <PillGroup name="user-type" options={USER_TYPES} value={data.userType} onChange={(v) => update('userType', v as UserType)} />
                    </Field>

                    <Field label="Full Name" required error={errors.name}>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                        <input
                          type="text"
                          placeholder="e.g. S. Jayakumar"
                          value={data.name}
                          onChange={(e) => update('name', e.target.value)}
                          className={`${inputClass(!!errors.name)} pl-10`}
                        />
                      </div>
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Email" required error={errors.email}>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                          <input
                            type="email"
                            placeholder="e.g. you@example.com"
                            value={data.email}
                            onChange={(e) => update('email', e.target.value)}
                            className={`${inputClass(!!errors.email)} pl-10`}
                          />
                        </div>
                      </Field>
                      <Field label="Phone" optionalNote="(Optional)">
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                          <input
                            type="tel"
                            placeholder="e.g. 9876543210"
                            value={data.phone}
                            onChange={(e) => update('phone', e.target.value)}
                            className={`${inputClass()} pl-10`}
                          />
                        </div>
                      </Field>
                    </div>

                    <AnimatePresence>
                      {isBusinessType(data.userType) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-stone-50 border border-stone-200/70 rounded-xl p-4 mt-1">
                            <Field label="Company Name" required error={errors.companyName}>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                                <input
                                  type="text"
                                  placeholder="e.g. ABC Rice Traders"
                                  value={data.companyName}
                                  onChange={(e) => update('companyName', e.target.value)}
                                  className={`${inputClass(!!errors.companyName)} pl-10`}
                                />
                              </div>
                            </Field>
                            <Field label="GST Number" optionalNote="(Optional)">
                              <input
                                type="text"
                                placeholder="e.g. 33AAAAA1111A1Z1"
                                value={data.gstNumber}
                                onChange={(e) => update('gstNumber', e.target.value)}
                                className={`${inputClass()} uppercase`}
                              />
                            </Field>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Step 1: What do you need */}
                {step === 1 && (
                  <div className="space-y-5">
                    <Field label="Product Category" required error={errors.category}>
                      <select
                        value={data.category}
                        onChange={(e) => update('category', e.target.value)}
                        className={inputClass(!!errors.category)}
                      >
                        <option value="">Select a product category</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Quantity" optionalNote="(Optional)">
                      <PillGroup name="quantity" options={QUANTITY_OPTIONS} value={data.quantity} onChange={(v) => update('quantity', v)} />
                    </Field>

                    <AnimatePresence>
                      {data.category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-5 bg-stone-50 border border-stone-200/70 rounded-xl p-4 mt-1">
                            <Field label="Technical Specifications" optionalNote="(Optional)">
                              <textarea
                                rows={3}
                                placeholder="e.g. Moisture below 13%, broken grains under 2%, 26kg PP bags..."
                                value={data.specs}
                                onChange={(e) => update('specs', e.target.value)}
                                className={`${inputClass()} resize-none`}
                              />
                            </Field>
                            <Field label="Attach a Reference File" optionalNote="(Optional)">
                              <label
                                htmlFor="quote-file-upload"
                                className="flex items-center justify-center space-x-2 border border-dashed border-stone-300 hover:border-emerald-600 rounded-lg py-4 cursor-pointer text-xs text-stone-500 hover:text-emerald-800 transition-colors bg-white"
                              >
                                <Upload className="w-4 h-4" />
                                <span>{data.fileName || 'Click to upload spec sheet, drawing, or sample photo'}</span>
                              </label>
                              <input
                                id="quote-file-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => update('fileName', e.target.files?.[0]?.name || '')}
                              />
                              {data.fileName && (
                                <p className="text-[10px] text-stone-400 flex items-center mt-1">
                                  <FileText className="w-3 h-3 mr-1 shrink-0" />
                                  <span>Files can't be attached to WhatsApp/Email links automatically — please attach "{data.fileName}" manually when you send your message.</span>
                                </p>
                              )}
                            </Field>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Field label="Urgency" optionalNote="(Optional)">
                      <PillGroup name="urgency" options={URGENCY_OPTIONS} value={data.urgency} onChange={(v) => update('urgency', v)} />
                    </Field>
                  </div>
                )}

                {/* Step 2: Delivery & budget */}
                {step === 2 && (
                  <div className="space-y-5">
                    <Field label="Delivery City / Location" optionalNote="(Optional)">
                      <input
                        type="text"
                        placeholder="e.g. Chennai, Tamil Nadu"
                        value={data.city}
                        onChange={(e) => update('city', e.target.value)}
                        className={inputClass()}
                      />
                    </Field>

                    <Field label="Expected Delivery Date" optionalNote="(Optional)">
                      <input
                        type="date"
                        value={data.deliveryDate}
                        onChange={(e) => update('deliveryDate', e.target.value)}
                        className={inputClass()}
                      />
                    </Field>

                    <Field label="Budget" optionalNote="(Optional)">
                      <PillGroup name="budget" options={BUDGET_OPTIONS} value={data.budget} onChange={(v) => update('budget', v)} />
                    </Field>

                    <Field label="Additional Notes" optionalNote="(Optional)">
                      <textarea
                        rows={4}
                        placeholder="Anything else we should know about your requirement..."
                        value={data.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        className={`${inputClass()} resize-none`}
                      />
                    </Field>
                  </div>
                )}

                {/* Step 3: Review & submit */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="border border-stone-200 rounded-xl divide-y divide-stone-100 overflow-hidden">
                      {summaryRows.map((row) => (
                        <div key={row.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-4 py-3 text-sm">
                          <span className="w-full sm:w-44 shrink-0 text-xs font-semibold text-stone-500 uppercase tracking-wide">{row.label}</span>
                          <span className="text-stone-800 break-words">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="quote-consent"
                        className={`flex items-start space-x-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                          errors.consent ? 'border-red-500' : data.consent ? 'border-emerald-700 bg-emerald-50/50' : 'border-stone-200'
                        }`}
                      >
                        <input
                          id="quote-consent"
                          type="checkbox"
                          checked={data.consent}
                          onChange={(e) => update('consent', e.target.checked)}
                          className="mt-0.5 w-4 h-4 accent-emerald-800 shrink-0"
                        />
                        <span className="text-xs text-stone-600 leading-relaxed">
                          I agree to be contacted by Sri Kannika Parameswari Rice Mill via WhatsApp, Email, or Phone regarding this
                          quotation request. <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                          <span>{errors.consent}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step Navigation */}
                <div className="flex items-center justify-between pt-8 mt-2 border-t border-stone-100">
                  <button
                    type="button"
                    id="quote-back-btn"
                    onClick={goBack}
                    disabled={step === 0}
                    className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-stone-800 disabled:opacity-0 disabled:pointer-events-none transition-opacity"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  {step < STEP_TITLES.length - 1 ? (
                    <button
                      type="button"
                      id="quote-next-btn"
                      onClick={goNext}
                      className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors active:scale-95"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="quote-submit-btn"
                      onClick={handleSubmit}
                      className="flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors active:scale-95"
                    >
                      <span>Submit Request</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
