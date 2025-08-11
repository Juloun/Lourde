"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Determine if Supabase is configured
        const configured = isSupabaseConfigured()
        setIsDemo(!configured)

        if (!configured) {
          setUser(null)
          setLoading(false)
          return
        }

        const supabase = createClient()

        // If client creation failed (e.g., due to environment issues), switch to demo mode
        if (!supabase) {
          setIsDemo(true)
          setUser(null)
          setLoading(false)
          return
        }

        // Get initial session
        const {
          data: { session },
        } = await supabase.auth.getSession()

        setUser(session?.user ?? null)
        setLoading(false)

        // Listen for auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        // Catch any unexpected errors during initialization and fall back to demo mode
        setIsDemo(true)
        setUser(null)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (isDemo) {
      return {
        error: {
          message:
            "Authentication is not available in demo mode. Please configure your Supabase database to enable user authentication.",
        },
      }
    }

    try {
      const supabase = createClient()
      if (!supabase) {
        return {
          error: {
            message: "Authentication service is not available. Please check your configuration.",
          },
        }
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return {
        error: {
          message: "Failed to sign in. Please check your connection and try again.",
        },
      }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (isDemo) {
      return {
        error: {
          message:
            "Account creation is not available in demo mode. Please configure your Supabase database to enable user registration.",
        },
      }
    }

    try {
      const supabase = createClient()
      if (!supabase) {
        return {
          error: {
            message: "Authentication service is not available. Please check your configuration.",
          },
        }
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      return { error }
    } catch (error) {
      return {
        error: {
          message: "Failed to create account. Please check your connection and try again.",
        },
      }
    }
  }

  const signOut = async () => {
    if (isDemo) {
      return
    }

    try {
      const supabase = createClient()
      if (supabase) {
        await supabase.auth.signOut()
      }
    } catch (error) {
      // Silent failure for sign out
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
