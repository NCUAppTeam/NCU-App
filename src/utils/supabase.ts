import { createClient } from '@supabase/supabase-js'
import { Database } from './database.type'

// supabase client for interacting with the database
export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
)
