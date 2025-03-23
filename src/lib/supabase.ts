
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Supabase client setup with public variables
// Note: These values should be added to environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
