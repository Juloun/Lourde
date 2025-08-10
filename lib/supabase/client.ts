import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./types"

let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const createClient = () => {
  // Return existing client if available
  if (supabaseClient) {
    return supabaseClient
  }

  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  try {
    supabaseClient = createClientComponentClient<Database>()
    return supabaseClient
  } catch (error) {
    return null
  }
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
