import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./types"

let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

export const createClient = () => {
  // Return existing client if available
  if (supabaseClient) {
    return supabaseClient
  }

  // Check if environment variables are available and not empty strings
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || supabaseUrl === "" || !supabaseAnonKey || supabaseAnonKey === "") {
    // If not configured, do not attempt to create a client and return null
    return null
  }

  try {
    // Only create the client if environment variables are confirmed to be present
    supabaseClient = createClientComponentClient<Database>()
    return supabaseClient
  } catch (error) {
    // If client creation fails for any reason, return null
    return null
  }
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(supabaseUrl && supabaseUrl !== "" && supabaseAnonKey && supabaseAnonKey !== "")
}
