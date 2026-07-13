/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, Mail, Phone, User, AlertCircle, HelpCircle, Loader2, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { ContactInput } from '../types';
import { supabase } from '../supabaseClient';

const indianPhoneRegex = /^[6789]\d{9}$/;

const contactSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  phone: z.string().regex(indianPhoneRegex, { message: 'Please enter a valid 10-digit Indian phone number (starting with 6-9)' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(3, { message: 'Please specify a subject for your message' }),
  message: z.string().min(10, { message: 'Your message must be at least 10 characters long to help us address your query' })
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    const randomTicket = 'SKP-TKT-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // 1. Try to write to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: data.name,
            phone: data.phone,
            email: data.email,
            subject: data.subject,
            message: data.message,
            status: 'unread'
          }
        ]);

      if (error) {
        console.error('Supabase message write error:', error);
      }
    } catch (err) {
      console.error('Network or client initialization error:', err);
    }

    setTicketId(randomTicket);
    setIsSubmitting(false);
    setIsSubmittedSuccessfully(true);

    // 2. Always save locally as fallback
    const existing = JSON.parse(localStorage.getItem('skp_contact_messages') || '[]');
    existing.push({ ...data, id: randomTicket, date: new Date().toISOString() });
    localStorage.setItem('skp_contact_messages', JSON.stringify(existing));
  };

  return (
    <div id="contact-form-wrapper" className="font-sans">
      {isSubmittedSuccessfully ? (
        <motion.div
          id="contact-success-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-950/10 border border-emerald-900/30 p-8 rounded-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-800 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-stone-900">Message Received!</h3>
            <p className="text-stone-600 text-sm max-w-sm mx-auto">
              Thank you for reaching out to Sri Kannika Parameswari Rice Mill. Our customer relations desk will respond shortly.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 inline-block text-left">
            <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest text-center">Your Ticket Number</p>
            <p className="text-lg font-bold font-mono text-emerald-800 tracking-wider text-center mt-1">{ticketId}</p>
          </div>

          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            A confirmation log has been prepared. For urgent retail issues, feel free to call our hotlines directly.
          </p>

          <div className="pt-2">
            <button
              id="contact-success-reset-btn"
              onClick={() => {
                setIsSubmittedSuccessfully(false);
                reset();
              }}
              className="bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        <form id="contact-form-core" onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-md shadow-stone-100">
          <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-100 pb-3">
            Send an Inquiry Message
          </h3>

          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. S. Jayakumar"
                  {...register('name')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500/20 bg-white'
                      : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700 focus:bg-white'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.name.message}</span>
                </p>
              )}
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    {...register('phone')}
                    className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500/20 bg-white'
                        : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700 focus:bg-white'
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

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                  <input
                    type="email"
                    placeholder="e.g. jkumar@gmail.com"
                    {...register('email')}
                    className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/20 bg-white'
                        : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700 focus:bg-white'
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
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Subject of Query <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <HelpCircle className="absolute left-3 top-3 w-4.5 h-4.5 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Ponni Rice Bulk Purchase / Facility Visit"
                  {...register('subject')}
                  className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.subject
                      ? 'border-red-500 focus:ring-red-500/20 bg-white'
                      : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700 focus:bg-white'
                  }`}
                />
              </div>
              {errors.subject && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.subject.message}</span>
                </p>
              )}
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
                Your Detailed Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Describe your inquiry, order size requirements, or support details here..."
                {...register('message')}
                className={`w-full px-4 py-2.5 bg-stone-50 border rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.message
                    ? 'border-red-500 focus:ring-red-500/20 bg-white'
                    : 'border-stone-200 focus:ring-emerald-600/20 focus:border-emerald-700 focus:bg-white'
                }`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs flex items-center mt-1">
                  <AlertCircle className="w-3.5 h-3.5 mr-1 shrink-0" />
                  <span>{errors.message.message}</span>
                </p>
              )}
            </div>
          </div>

          <button
            id="contact-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-800 hover:bg-emerald-700 disabled:bg-emerald-800/60 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all duration-150 flex items-center justify-center space-x-2 shadow-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
