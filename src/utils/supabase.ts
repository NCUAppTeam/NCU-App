import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// supabase client for interacting with the database
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing. Check your environment variables.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
