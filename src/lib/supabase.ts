
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Supabase client setup using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient<Database>(
  supabaseUrl as string, 
  supabaseAnonKey as string
);
