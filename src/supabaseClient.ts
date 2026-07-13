import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Falls back to a placeholder project so createClient() never throws at import time
// when Supabase hasn't been configured yet. Every call site already wraps its
// supabase calls in try/catch and falls back to localStorage, so this keeps the
// public site (and every page that imports a form) from crashing on load.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
