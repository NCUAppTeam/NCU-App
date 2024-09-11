import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// supabase client for interacting with the database
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)
