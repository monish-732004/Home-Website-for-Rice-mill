/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, Mail, Phone, Landmark, AlertCircle, FileCheck2, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data';
import { DealerEnquiryInput } from '../types';
import { supabase } from '../supabaseClient';

const indianPhoneRegex = /^[6789]\d{9}$/;
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const enquirySchema = z.object({
  businessName: z.string().min(3, { message: 'Business/Firm name must be at least 3 characters long' }),
  contactPerson: z.string().min(3, { message: 'Contact person name must be at least 3 characters long' }),
  phone: z.string().regex(indianPhoneRegex, { message: 'Please enter a valid 10-digit Indian phone number (starting with 6-9)' }),
  email: z.string().email({ message: 'Please enter a valid business email address' }),
  city: z.string().min(2, { message: 'City name is required' }),
  state: z.string().min(2, { message: 'State is required' }),
  gstin: z.string().optional().refine(val => !val || gstinRegex.test(val), {
    message: 'Please enter a valid 15-digit GSTIN (e.g. 33AAAAA1111A1Z1)'
  }),
  expectedVolume: z.string().min(1, { message: 'Please select your expected monthly volume purchase' }),
  preferredProducts: z.array(z.string()).min(1, { message: 'Please select at least one preferred product' }),
  message: z.string().optional()
});

interface EnquiryFormProps {
  onSuccessClose?: () => void;
}

export default function EnquiryForm({ onSuccessClose }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<DealerEnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      businessName: '',
      contactPerson: '',
      phone: '',
      email: '',
      city: '',
      state: 'Tamil Nadu',
      gstin: '',
      expectedVolume: '',
      preferredProducts: [],
      message: ''
    }
  });

  const selectedProducts = watch('preferredProducts') || [];

  const handleProductToggle = (productId: string) => {
    const currentSelected = [...selectedProducts];
    const index = currentSelected.indexOf(productId);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(productId);
    }
    setValue('preferredProducts', currentSelected, { shouldValidate: true });
  };

  const onSubmit = async (data: DealerEnquiryInput) => {
    setIsSubmitting(true);
    const randomId = 'SKP-DLR-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // 1. Try to insert into Supabase
      const { error } = await supabase
        .from('dealers')
        .insert([
          {
            id: randomId,
            business_name: data.businessName,
            contact_person: data.contactPerson,
            phone: data.phone,
            email: data.email,
            city: data.city,
            state: data.state,
            gstin: data.gstin || null,
            expected_volume: data.expectedVolume,
            preferred_products: data.preferredProducts,
            message: data.message || null
          }
        ]);

      if (error) {
        console.error('Supabase write error:', error);
      }
    } catch (err) {
      console.error('Network or client initialization error:', err);
    }

    setSubmissionId(randomId);
    setIsSubmitting(false);
    setIsSubmittedSuccessfully(true);

    // 2. Always log to local storage as fallback/redundancy
    const existing = JSON.parse(localStorage.getItem('skp_dealer_enquiries') || '[]');
    existing.push({
      ...data,
      id: randomId,
      date: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('skp_dealer_enquiries', JSON.stringify(existing));
  };

  return (
    <div id="dealer-enquiry-wrapper" className="font-sans">
      {isSubmittedSuccessfully ? (
        <motion.div
          id="enquiry-success-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-950/10 border border-emerald-900/30 p-8 rounded-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-stone-900">Application Submitted!</h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your dealer/distributor request has been securely recorded. Our partnership management division will contact you within 24 working hours.
            </p>
          </div>

          <div className="bg-stone-100 border border-stone-200 py-4 px-6 rounded-xl inline-block">
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-mono">Reference Tracking Number</p>
            <p className="text-xl font-bold font-mono text-emerald-800 tracking-wider mt-1">{submissionId}</p>
          </div>

          <div className="text-left bg-white/95 p-5 rounded-xl border border-stone-100 max-w-md mx-auto text-xs space-y-2.5 text-stone-600">
            <p className="font-semibold text-stone-900 text-center border-b border-stone-100 pb-2">Next Steps in Our Partnership</p>
            <div className="flex items-start space-x-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <span>Our local area manager will verify your commercial site / shop location coordinates.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <span>We will discuss the initial credit facility, credit period, and minimum monthly order volumes.</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="bg-emerald-100 text-emerald-800 font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
              <span>Formal onboarding, digital credentials generation, and shipping of the first sample consignment.</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center space-x-3">
            <button
              id="success-btn-close"
              onClick={() => {
                if (onSuccessClose) onSuccessClose();
                setIsSubmittedSuccessfully(false);
                reset();
              }}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      ) : (
        <form id="dealer-enquiry-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200/60 mb-6 flex items-start space-x-3">
            <FileCheck2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-600">
              <p className="font-semibold text-stone-900">Authorized Dealership Application</p>
              <p className="mt-1 leading-relaxed">
                Please provide accurate details about your business. Verified applications are directly imported into our active ERP ledger for immediate routing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Business/Firm Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Registered Firm Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Landmark className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Sri Balaji Rice Traders"
                  {...register('businessName')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.businessName
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                  }`}
                />
              </div>
              {errors.businessName && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.businessName.message}</span>
                </p>
              )}
            </div>

            {/* Contact Person Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mr. S. Jayakumar"
                {...register('contactPerson')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.contactPerson
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                }`}
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.contactPerson.message}</span>
                </p>
              )}
            </div>

            {/* Primary Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Primary Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9944360308"
                  {...register('phone')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.phone.message}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Business Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="email"
                  placeholder="e.g. partner@firm.com"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500/20'
                      : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.email.message}</span>
                </p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                City / Market Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Madurai"
                {...register('city')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.city
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.city.message}</span>
                </p>
              )}
            </div>

            {/* State */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                State <span className="text-red-500">*</span>
              </label>
              <select
                {...register('state')}
                className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 transition-all"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.state.message}</span>
                </p>
              )}
            </div>

            {/* GSTIN (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                GSTIN Number <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 33ACFPV4181Q1ZX"
                {...register('gstin')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 uppercase transition-all ${
                  errors.gstin
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                }`}
              />
              {errors.gstin && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.gstin.message}</span>
                </p>
              )}
            </div>

            {/* Expected Volume */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Expected Volume <span className="text-red-500">*</span>
              </label>
              <select
                {...register('expectedVolume')}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.expectedVolume
                    ? 'border-red-500 focus:ring-red-500/20'
                    : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700'
                }`}
              >
                <option value="">Select Monthly Buying Volume</option>
                <option value="2-5 Tons">Small Scale (2 - 5 Tons/Month)</option>
                <option value="5-15 Tons">Medium Scale (5 - 15 Tons/Month)</option>
                <option value="15-40 Tons">Wholesaler Scale (15 - 40 Tons/Month)</option>
                <option value="40+ Tons">Large Distributor (40+ Tons/Month)</option>
              </select>
              {errors.expectedVolume && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.expectedVolume.message}</span>
                </p>
              )}
            </div>
          </div>

          {/* Preferred Products (Checkbox Multi-selection) */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Product Range of Interest <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.map((prod) => {
                const isChecked = selectedProducts.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    onClick={() => handleProductToggle(prod.id)}
                    className={`cursor-pointer flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                      isChecked
                        ? 'border-emerald-700 bg-emerald-50/50'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div
                        className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-emerald-800 border-emerald-800 text-white' : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{prod.name}</p>
                      <p className="text-[10px] text-stone-500 truncate mt-0.5">{prod.tamilName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.preferredProducts && (
              <p className="text-red-500 text-xs flex items-center mt-1">
                <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>{errors.preferredProducts.message}</span>
              </p>
            )}
          </div>

          {/* Business Message (Optional) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Tell Us About Your Market Territory / Infrastructure <span className="text-stone-400 text-[10px] font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. We own a 2000 sq ft warehouse in Madurai market area with 3 delivery pickup trucks. We distribute rice to around 150 local retail stores."
              {...register('message')}
              className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 transition-all resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end pt-2">
            <button
              id="dealer-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-700 disabled:bg-emerald-800/60 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md shadow-emerald-900/10 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Partnership Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
