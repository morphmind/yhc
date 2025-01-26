import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = 'https://rmoduqgtcgdlklxatpza.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtb2R1cWd0Y2dkbGtseGF0cHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MjE5MTcsImV4cCI6MjA1MjI5NzkxN30.ntnUwn0r6LnT-eUPINQoEMPPanxI-UL35qudl_z6nzo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});