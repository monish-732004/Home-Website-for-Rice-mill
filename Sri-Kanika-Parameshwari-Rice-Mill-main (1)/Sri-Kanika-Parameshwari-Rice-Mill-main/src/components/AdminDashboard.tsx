/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Download, 
  Filter, 
  Eye, 
  Trash2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  FileText, 
  RefreshCw, 
  ChevronRight,
  Mail,
  Phone,
  Landmark,
  ShieldCheck,
  MessageSquare,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DealerEnquiryInput } from '../types';
import { supabase } from '../supabaseClient';

interface SavedEnquiry extends DealerEnquiryInput {
  id: string;
  date: string;
  status: 'pending' | 'review' | 'approved' | 'rejected';
}

interface SavedMessage {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

interface SavedB2bMessage {
  id: string;
  created_at: string;
  sender_name: string;
  reference_id: string;
  message: string;
  status: string;
}



interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Navigation tabs for Admin dashboard: Dealers vs General Inbox vs B2B Helpdesk
  const [currentPanelTab, setCurrentPanelTab] = useState<'dealers' | 'messages' | 'b2b_messages'>('dealers');

  const [enquiries, setEnquiries] = useState<SavedEnquiry[]>([]);
  const [supportMessages, setSupportMessages] = useState<SavedMessage[]>([]);
  const [b2bMessages, setB2bMessages] = useState<SavedB2bMessage[]>([]);
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [selectedB2bId, setSelectedB2bId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'review' | 'approved' | 'rejected'>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'volume-desc'>('date-desc');

  useEffect(() => {
    // Monitor auth status. If signed out, force logout of admin panel
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        onLogout();
      }
    });
    return () => subscription.unsubscribe();
  }, [onLogout]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    onLogout();
  };

  // Load Database Records
  useEffect(() => {
    if (currentPanelTab === 'dealers') {
      loadEnquiries();
    } else if (currentPanelTab === 'messages') {
      loadSupportMessages();
    } else {
      loadB2bMessages();
    }
  }, [currentPanelTab]);

  const loadEnquiries = async () => {
    setIsLoading(true);
    try {
      const { data: dbData, error } = await supabase
        .from('dealers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (dbData && dbData.length > 0) {
        const mapped: SavedEnquiry[] = dbData.map(item => ({
          id: item.id,
          businessName: item.business_name,
          contactPerson: item.contact_person,
          phone: item.phone,
          email: item.email,
          city: item.city,
          state: item.state,
          gstin: item.gstin || '',
          expectedVolume: item.expected_volume,
          preferredProducts: item.preferred_products,
          message: item.message || '',
          date: item.created_at,
          status: item.status
        }));
        setEnquiries(mapped);
      } else {
        // Fallback: If live DB is empty, use localStorage
        loadEnquiriesLocalFallback();
      }
    } catch (e) {
      console.warn('Could not read from Supabase dealers table, falling back to localStorage:', e);
      loadEnquiriesLocalFallback();
    } finally {
      setIsLoading(false);
    }
  };

  const loadEnquiriesLocalFallback = () => {
    const localData = localStorage.getItem('skp_dealer_enquiries');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (parsed.length > 0) {
          setEnquiries(parsed);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }
    setEnquiries([]);
  };

  const loadSupportMessages = async () => {
    setIsLoading(true);
    try {
      const { data: dbMsg, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (dbMsg) {
        setSupportMessages(dbMsg);
      }
    } catch (e) {
      console.warn('Could not read from Supabase contact_messages, loading local:', e);
      const localMsg = localStorage.getItem('skp_contact_messages');
      if (localMsg) {
        try {
          setSupportMessages(JSON.parse(localMsg));
        } catch (err) {
          console.error(err);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadB2bMessages = async () => {
    setIsLoading(true);
    try {
      const { data: dbMsg, error } = await supabase
        .from('dealer_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (dbMsg) {
        setB2bMessages(dbMsg);
      }
    } catch (e) {
      console.warn('Could not read from Supabase dealer_messages, loading local:', e);
      const localMsg = localStorage.getItem('skp_dealer_messages');
      if (localMsg) {
        try {
          setB2bMessages(JSON.parse(localMsg));
        } catch (err) {
          console.error(err);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Status and State updates
  const updateStatus = async (id: string, newStatus: 'pending' | 'review' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('dealers')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.warn('Supabase status update failed, writing to local storage instead:', e);
    }

    // Always update local UI state immediately
    const updated = enquiries.map(enq => {
      if (enq.id === id) {
        return { ...enq, status: newStatus };
      }
      return enq;
    });
    setEnquiries(updated);
    localStorage.setItem('skp_dealer_enquiries', JSON.stringify(updated));
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.warn('Failed to update message status on Supabase:', e);
    }

    const updated = supportMessages.map(msg => {
      if (msg.id === id) {
        return { ...msg, status: 'read' };
      }
      return msg;
    });
    setSupportMessages(updated);
    localStorage.setItem('skp_contact_messages', JSON.stringify(updated));
  };

  const markB2bMessageAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('dealer_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.warn('Failed to update B2B message status on Supabase:', e);
    }

    const updated = b2bMessages.map(msg => {
      if (msg.id === id) {
        return { ...msg, status: 'read' };
      }
      return msg;
    });
    setB2bMessages(updated);
    localStorage.setItem('skp_dealer_messages', JSON.stringify(updated));
  };

  const deleteEnquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this application record?')) {
      try {
        const { error } = await supabase
          .from('dealers')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (e) {
        console.warn('Failed to delete on Supabase, removing locally:', e);
      }

      const updated = enquiries.filter(enq => enq.id !== id);
      setEnquiries(updated);
      localStorage.setItem('skp_dealer_enquiries', JSON.stringify(updated));
      if (selectedId === id) {
        setSelectedId(null);
      }
    }
  };

  const deleteSupportMsg = async (id: string) => {
    if (window.confirm('Delete this support message permanently?')) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (e) {
        console.warn('Failed to delete message on Supabase:', e);
      }

      const updated = supportMessages.filter(msg => msg.id !== id);
      setSupportMessages(updated);
      localStorage.setItem('skp_contact_messages', JSON.stringify(updated));
      if (selectedMsgId === id) {
        setSelectedMsgId(null);
      }
    }
  };

  const deleteB2bSupportMsg = async (id: string) => {
    if (window.confirm('Delete this B2B support query permanently?')) {
      try {
        const { error } = await supabase
          .from('dealer_messages')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (e) {
        console.warn('Failed to delete B2B message on Supabase:', e);
      }

      const updated = b2bMessages.filter(msg => msg.id !== id);
      setB2bMessages(updated);
      localStorage.setItem('skp_dealer_messages', JSON.stringify(updated));
      if (selectedB2bId === id) {
        setSelectedB2bId(null);
      }
    }
  };

  // Helper to format dates cleanly for Excel/CSV so they don't show ######
  const formatCSVDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to resolve numerical tonnage for sorting
  const getVolumeWeight = (vol: string) => {
    if (vol.includes('40+')) return 40;
    if (vol.includes('15-40')) return 30;
    if (vol.includes('5-15')) return 10;
    return 3;
  };

  // Filter & Sort computations for dealers list
  const filteredEnquiries = enquiries
    .filter(enq => {
      const matchesSearch = 
        enq.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enq.id.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === 'all' || enq.status === statusFilter;
      const matchesState = stateFilter === 'all' || enq.state === stateFilter;
      
      return matchesSearch && matchesStatus && matchesState;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === 'volume-desc') {
        return getVolumeWeight(b.expectedVolume) - getVolumeWeight(a.expectedVolume);
      }
      return 0;
    });

  const uniqueStates = Array.from(new Set(enquiries.map(e => e.state))).filter(Boolean);

  // Stats
  const totalCount = enquiries.length;
  const pendingCount = enquiries.filter(e => e.status === 'pending').length;
  const approvedCount = enquiries.filter(e => e.status === 'approved').length;
  
  const totalVolumeTons = enquiries
    .filter(e => e.status === 'approved')
    .reduce((sum, enq) => {
      const vol = enq.expectedVolume;
      let minVol = 2;
      if (vol.includes('40+')) minVol = 40;
      else if (vol.includes('15-40')) minVol = 15;
      else if (vol.includes('5-15')) minVol = 5;
      return sum + minVol;
    }, 0);

  // CSV Exporter utilizing clean date format YYYY-MM-DD HH:MM
  const exportToCSV = () => {
    if (filteredEnquiries.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'ID', 'Date Submitted', 'Status', 'Business Name', 'Contact Person', 
      'Phone', 'Email', 'City', 'State', 'GSTIN', 'Expected Volume', 
      'Preferred Products', 'Notes'
    ];

    const rows = filteredEnquiries.map(e => [
      e.id,
      `"${formatCSVDate(e.date)}"`, // Wrapped in quotes, formatted as YYYY-MM-DD HH:MM
      e.status.toUpperCase(),
      `"${e.businessName.replace(/"/g, '""')}"`,
      `"${e.contactPerson.replace(/"/g, '""')}"`,
      e.phone,
      e.email,
      e.city,
      e.state,
      e.gstin || 'N/A',
      e.expectedVolume,
      `"${e.preferredProducts.join(', ')}"`,
      `"${(e.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `skp_rice_dealers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approved
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5 mr-1 animate-pulse" /> In Review
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <XCircle className="w-3.5 h-3.5 mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> Pending
          </span>
        );
    }
  };

  const activeEnquiry = enquiries.find(e => e.id === selectedId);
  const activeMessage = supportMessages.find(m => m.id === selectedMsgId);
  const activeB2bMessage = b2bMessages.find(m => m.id === selectedB2bId);

  return (
    <div id="admin-dashboard-container" className="bg-stone-100 min-h-screen font-sans border-t-2 border-amber-500">
      
      {/* Top Header Bar */}
      <div className="bg-emerald-950 text-white py-5 px-6 sm:px-8 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-5.5 h-5.5 text-emerald-950" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-lg leading-tight">Partnership Request Manager</h2>
            <p className="text-emerald-300/80 text-[10px] uppercase font-semibold tracking-wider">
              Real-Time Database Console
            </p>
          </div>
        </div>

        {/* Console Tab Toggles */}
        <div className="flex flex-wrap items-center bg-emerald-900/60 p-1.5 rounded-lg border border-emerald-800 gap-1">
          <button
            onClick={() => setCurrentPanelTab('dealers')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              currentPanelTab === 'dealers' 
                ? 'bg-amber-500 text-stone-950 shadow font-bold' 
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            Dealer Registrations
          </button>
          
          <button
            onClick={() => setCurrentPanelTab('messages')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              currentPanelTab === 'messages' 
                ? 'bg-amber-500 text-stone-950 shadow font-bold' 
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inbox Queries</span>
            {supportMessages.filter(m => m.status === 'unread').length > 0 && (
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping shrink-0" />
            )}
          </button>

          <button
            onClick={() => setCurrentPanelTab('b2b_messages')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
              currentPanelTab === 'b2b_messages' 
                ? 'bg-amber-500 text-stone-950 shadow font-bold' 
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>B2B Helpdesk</span>
            {b2bMessages.filter(m => m.status === 'unread').length > 0 && (
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping shrink-0" />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (currentPanelTab === 'dealers') loadEnquiries();
              else if (currentPanelTab === 'messages') loadSupportMessages();
              else loadB2bMessages();
            }}
            className="p-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-md text-xs font-semibold transition-all shadow-sm"
            title="Refresh database entries"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-rose-850 hover:bg-rose-800 text-white rounded-md text-xs font-bold uppercase tracking-wider transition-all shadow-md"
          >
            Exit Console
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Statistics Strip (Only for Dealers Tab) */}
        {currentPanelTab === 'dealers' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider block">Total Inquiries</span>
                <span className="text-2xl font-serif font-extrabold text-stone-900">{totalCount}</span>
              </div>
              <div className="w-9 h-9 bg-stone-100 rounded-lg flex items-center justify-center text-stone-500">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-600 uppercase font-bold tracking-wider block">Pending Actions</span>
                <span className="text-2xl font-serif font-extrabold text-amber-500">{pendingCount}</span>
              </div>
              <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 bg-amber-50/70">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider block">Approved Partners</span>
                <span className="text-2xl font-serif font-extrabold text-emerald-800">{approvedCount}</span>
              </div>
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-900 uppercase font-bold tracking-wider block">Projected Volume (Min)</span>
                <span className="text-2xl font-serif font-extrabold text-emerald-900">{totalVolumeTons} Tons</span>
              </div>
              <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-900">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar (Only for Dealers Tab) */}
        {currentPanelTab === 'dealers' && (
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="relative w-full lg:max-w-xs shrink-0">
              <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by firm, city, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 transition-all placeholder:text-stone-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full justify-start lg:justify-end">
              <div className="flex items-center space-x-1.5 bg-stone-100 px-3 py-1.5 rounded-lg text-stone-500 text-xs font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 text-xs px-3 py-2 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 font-semibold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="bg-stone-50 border border-stone-200 text-xs px-3 py-2 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 font-semibold"
              >
                <option value="all">All States</option>
                {uniqueStates.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 text-xs px-3 py-2 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-700 font-semibold"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="volume-desc">Highest Volume</option>
              </select>

              <button
                onClick={exportToCSV}
                className="ml-auto lg:ml-0 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Excel (CSV)</span>
              </button>
            </div>
          </div>
        )}

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT PANEL: LIST OF ENTRIES */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-stone-50 border-b border-stone-200/80 flex justify-between items-center">
              <span className="text-xs font-bold text-stone-700 font-sans">
                {currentPanelTab === 'dealers' && `Dealer Applicants (${filteredEnquiries.length} rows)`}
                {currentPanelTab === 'messages' && `Inbox Helpdesk Messages (${supportMessages.length} items)`}
                {currentPanelTab === 'b2b_messages' && `B2B Helpdesk Queries (${b2bMessages.length} items)`}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Select a row to inspect</span>
            </div>

            <div className="overflow-y-auto max-h-[550px] divide-y divide-stone-150">
              {currentPanelTab === 'dealers' && (
                /* RENDER DEALER LIST */
                filteredEnquiries.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 space-y-2">
                    <AlertCircle className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-sm font-semibold">No dealer records found</p>
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const isSelected = selectedId === enq.id;
                    return (
                      <div
                        key={enq.id}
                        onClick={() => setSelectedId(enq.id)}
                        className={`p-4 transition-colors cursor-pointer hover:bg-stone-50 flex justify-between items-center ${
                          isSelected ? 'bg-emerald-50/40 border-l-4 border-emerald-800 pl-3' : ''
                        }`}
                      >
                        <div className="space-y-1 pr-4 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono font-bold text-stone-400 leading-none">
                              {enq.id}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              • {formatCSVDate(enq.date)}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-stone-900 truncate leading-snug">
                            {enq.businessName}
                          </h4>
                          <div className="flex items-center space-x-4 text-[10px] text-stone-500 font-sans mt-0.5">
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-0.5 text-stone-400" /> {enq.city}, {enq.state}
                            </span>
                            <span>• Vol: <strong className="text-stone-700">{enq.expectedVolume}</strong></span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <div>
                            {getStatusBadge(enq.status)}
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-300" />
                        </div>
                      </div>
                    );
                  })
                )
              )}

              {currentPanelTab === 'messages' && (
                /* RENDER INBOX SUPPORT MESSAGES */
                supportMessages.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 space-y-2">
                    <MessageSquare className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-sm font-semibold">No queries received in inbox</p>
                  </div>
                ) : (
                  supportMessages.map((msg) => {
                    const isSelected = selectedMsgId === msg.id;
                    const isUnread = msg.status === 'unread';
                    return (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMsgId(msg.id)}
                        className={`p-4 transition-colors cursor-pointer hover:bg-stone-50 flex justify-between items-center ${
                          isSelected ? 'bg-emerald-50/40 border-l-4 border-emerald-800 pl-3' : ''
                        } ${isUnread ? 'bg-stone-50/70 font-semibold' : ''}`}
                      >
                        <div className="space-y-1 pr-4 min-w-0">
                          <div className="flex items-center space-x-2">
                            {isUnread && (
                              <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            )}
                            <span className="text-[10px] text-stone-400 font-mono">
                              {formatCSVDate(msg.created_at)}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-stone-900 truncate leading-snug">
                            {msg.name}
                          </h4>
                          <p className="text-stone-500 text-[10px] truncate">{msg.subject}</p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isUnread ? 'bg-amber-100 text-amber-800' : 'bg-stone-150 text-stone-500'
                          }`}>
                            {msg.status}
                          </span>
                          <ChevronRight className="w-4 h-4 text-stone-300" />
                        </div>
                      </div>
                    );
                  })
                )
              )}

              {currentPanelTab === 'b2b_messages' && (
                /* RENDER B2B SUPPORT MESSAGES */
                b2bMessages.length === 0 ? (
                  <div className="text-center py-20 text-stone-400 space-y-2">
                    <FileText className="w-10 h-10 mx-auto opacity-40" />
                    <p className="text-sm font-semibold">No B2B helpdesk queries received</p>
                  </div>
                ) : (
                  b2bMessages.map((msg) => {
                    const isSelected = selectedB2bId === msg.id;
                    const isUnread = msg.status === 'unread';
                    return (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedB2bId(msg.id)}
                        className={`p-4 transition-colors cursor-pointer hover:bg-stone-50 flex justify-between items-center ${
                          isSelected ? 'bg-emerald-50/40 border-l-4 border-emerald-800 pl-3' : ''
                        } ${isUnread ? 'bg-stone-50/70 font-semibold' : ''}`}
                      >
                        <div className="space-y-1 pr-4 min-w-0">
                          <div className="flex items-center space-x-2">
                            {isUnread && (
                              <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            )}
                            <span className="text-[10px] text-stone-400 font-mono">
                              {formatCSVDate(msg.created_at)}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-sm text-stone-900 truncate leading-snug">
                            {msg.sender_name}
                          </h4>
                          <p className="text-stone-500 text-[10px] truncate">Ref: {msg.reference_id}</p>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isUnread ? 'bg-amber-100 text-amber-800' : 'bg-stone-150 text-stone-500'
                          }`}>
                            {msg.status}
                          </span>
                          <ChevronRight className="w-4 h-4 text-stone-300" />
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>

          {/* RIGHT PANEL: INSPECTOR VIEW */}
          <div className="lg:col-span-5 flex">
            <AnimatePresence mode="wait">
              {currentPanelTab === 'dealers' && (
                /* DEALER INSPECTOR */
                activeEnquiry ? (
                  <motion.div
                    key={activeEnquiry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 w-full flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-stone-100 pb-4">
                        <div>
                          <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            {activeEnquiry.id}
                          </span>
                          <h3 className="font-serif font-bold text-base text-stone-900 mt-2 leading-tight">
                            {activeEnquiry.businessName}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-medium">
                            Submitted on {formatCSVDate(activeEnquiry.date)}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteEnquiry(activeEnquiry.id)}
                          className="p-1.5 hover:bg-rose-50 text-stone-400 hover:text-rose-800 rounded transition-colors"
                          title="Delete application record"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg space-y-2">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Contact Profile</span>
                          <p className="font-semibold text-stone-900 text-sm">{activeEnquiry.contactPerson}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 font-mono mt-1 text-[11px]">
                            <a href={`tel:${activeEnquiry.phone}`} className="flex items-center hover:text-emerald-800">
                              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                              <span>{activeEnquiry.phone}</span>
                            </a>
                            <a href={`mailto:${activeEnquiry.email}`} className="flex items-center hover:text-emerald-800 break-all">
                              <Mail className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                              <span>{activeEnquiry.email}</span>
                            </a>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-stone-50 border border-stone-200/50 p-2.5 rounded-lg">
                            <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold block">GSTIN</span>
                            <span className="font-mono font-bold text-stone-800">{activeEnquiry.gstin || 'NOT PROVIDED'}</span>
                          </div>
                          <div className="bg-stone-50 border border-stone-200/50 p-2.5 rounded-lg">
                            <span className="text-[8px] uppercase tracking-wider text-stone-400 font-bold block">Expected Volume</span>
                            <span className="font-bold text-emerald-800">{activeEnquiry.expectedVolume}</span>
                          </div>
                        </div>

                        <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Interests Range</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {activeEnquiry.preferredProducts.map(pId => (
                              <span key={pId} className="bg-emerald-800 text-white font-bold text-[9px] px-2 py-0.5 rounded capitalize">
                                {pId.replace(/-/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>

                        {activeEnquiry.message && (
                          <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg">
                            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Territory / Infrastructure Details</span>
                            <p className="text-stone-600 leading-relaxed mt-1 text-[11px]">
                              {activeEnquiry.message}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-stone-150 pt-5 space-y-3">
                        <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block">
                          Update Status Pipeline
                        </span>
                        
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          <button
                            onClick={() => updateStatus(activeEnquiry.id, 'approved')}
                            className={`py-2 rounded-lg font-bold transition-all border ${
                              activeEnquiry.status === 'approved'
                                ? 'bg-emerald-800 border-emerald-800 text-white shadow-md'
                                : 'bg-white border-stone-250 hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            Approve Partner
                          </button>
                          <button
                            onClick={() => updateStatus(activeEnquiry.id, 'review')}
                            className={`py-2 rounded-lg font-bold transition-all border ${
                              activeEnquiry.status === 'review'
                                ? 'bg-blue-800 border-blue-800 text-white shadow-md'
                                : 'bg-white border-stone-250 hover:bg-stone-50 text-stone-700'
                            }`}
                          >
                            Set Under Review
                          </button>
                          <button
                            onClick={() => updateStatus(activeEnquiry.id, 'rejected')}
                            className={`py-2 rounded-lg font-bold transition-all border col-span-2 ${
                              activeEnquiry.status === 'rejected'
                                ? 'bg-rose-850 border-rose-850 text-white shadow-md'
                                : 'bg-white border-stone-250 hover:bg-stone-50 text-rose-800'
                            }`}
                          >
                            Reject Application
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-stone-50/50 border-2 border-dashed border-stone-250 rounded-xl p-6 w-full flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                      <Eye className="w-6 h-6 text-stone-300" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-700 text-sm">No Profile Selected</h4>
                      <p className="text-xs max-w-xs mx-auto leading-relaxed mt-1">
                        Choose a dealer applicant from the list on the left to inspect detailed parameters and update status.
                      </p>
                    </div>
                  </div>
                )
              )}

              {currentPanelTab === 'messages' && (
                /* INBOX MESSAGES INSPECTOR */
                activeMessage ? (
                  <motion.div
                    key={activeMessage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 w-full flex flex-col justify-between animate-fade-in"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-stone-100 pb-4">
                        <div>
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                            activeMessage.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-stone-150 text-stone-500'
                          }`}>
                            {activeMessage.status}
                          </span>
                          <h3 className="font-serif font-bold text-base text-stone-900 mt-2 leading-tight">
                            {activeMessage.name}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-medium">
                            Received on {formatCSVDate(activeMessage.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteSupportMsg(activeMessage.id)}
                          className="p-1.5 hover:bg-rose-50 text-stone-400 hover:text-rose-800 rounded transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg space-y-2">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Contact Profile</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 font-mono text-[11px]">
                            <a href={`tel:${activeMessage.phone}`} className="flex items-center hover:text-emerald-800">
                              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                              <span>{activeMessage.phone}</span>
                            </a>
                            <a href={`mailto:${activeMessage.email}`} className="flex items-center hover:text-emerald-800 break-all">
                              <Mail className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                              <span>{activeMessage.email}</span>
                            </a>
                          </div>
                        </div>

                        <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Subject</span>
                          <p className="font-serif font-bold text-stone-900 mt-1">{activeMessage.subject}</p>
                        </div>

                        <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-lg">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Message Query</span>
                          <p className="text-stone-700 leading-relaxed mt-2 whitespace-pre-wrap text-[11px]">
                            {activeMessage.message}
                          </p>
                        </div>
                      </div>

                      {activeMessage.status === 'unread' && (
                        <div className="border-t border-stone-150 pt-5">
                          <button
                            onClick={() => markMessageAsRead(activeMessage.id)}
                            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow"
                          >
                            <Check className="w-4 h-4" />
                            <span>Mark as Read / Replied</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-stone-50/50 border-2 border-dashed border-stone-250 rounded-xl p-6 w-full flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                      <MessageSquare className="w-6 h-6 text-stone-300" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-700 text-sm">No Message Selected</h4>
                      <p className="text-xs max-w-xs mx-auto leading-relaxed mt-1">
                        Select an inbox enquiry from the list on the left to read user queries and update status logs.
                      </p>
                    </div>
                  </div>
                )
              )}

              {currentPanelTab === 'b2b_messages' && (
                /* B2B MESSAGES INSPECTOR */
                activeB2bMessage ? (
                  <motion.div
                    key={activeB2bMessage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 w-full flex flex-col justify-between animate-fade-in"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-stone-100 pb-4">
                        <div>
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                            activeB2bMessage.status === 'unread' ? 'bg-amber-100 text-amber-800' : 'bg-stone-150 text-stone-500'
                          }`}>
                            {activeB2bMessage.status}
                          </span>
                          <h3 className="font-serif font-bold text-base text-stone-900 mt-2 leading-tight">
                            {activeB2bMessage.sender_name}
                          </h3>
                          <p className="text-[10px] text-stone-400 font-medium">
                            Received on {formatCSVDate(activeB2bMessage.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteB2bSupportMsg(activeB2bMessage.id)}
                          className="p-1.5 hover:bg-rose-50 text-stone-400 hover:text-rose-800 rounded transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="bg-stone-50 border border-stone-200/50 p-3 rounded-lg">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Application ID / Phone Ref</span>
                          <p className="font-mono text-stone-850 font-bold text-[11px] mt-1">{activeB2bMessage.reference_id}</p>
                        </div>

                        <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-lg">
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Message Query</span>
                          <p className="text-stone-700 leading-relaxed mt-2 whitespace-pre-wrap text-[11px]">
                            {activeB2bMessage.message}
                          </p>
                        </div>
                      </div>

                      {activeB2bMessage.status === 'unread' && (
                        <div className="border-t border-stone-150 pt-5">
                          <button
                            onClick={() => markB2bMessageAsRead(activeB2bMessage.id)}
                            className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow"
                          >
                            <Check className="w-4 h-4" />
                            <span>Mark as Read / Replied</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-stone-50/50 border-2 border-dashed border-stone-250 rounded-xl p-6 w-full flex flex-col items-center justify-center text-center text-stone-400 space-y-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100">
                      <FileText className="w-6 h-6 text-stone-300" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-stone-700 text-sm">No Message Selected</h4>
                      <p className="text-xs max-w-xs mx-auto leading-relaxed mt-1">
                        Select a B2B enquiry from the list on the left to read user queries and update status logs.
                      </p>
                    </div>
                  </div>
                )
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
