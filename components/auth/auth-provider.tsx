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

        if (!configured) {
          if (typeof window !== "undefined") {
            // Clear any existing Supabase auth tokens
            localStorage.removeItem(
              "sb-" +
                (process.env.NEXT_PUBLIC_SUPABASE_URL || "localhost").replace(/https?:\/\//, "").replace(/\./g, "-") +
                "-auth-token",
            )
            // Clear any other potential auth storage keys
            Object.keys(localStorage).forEach((key) => {
              if (key.startsWith("sb-") && key.includes("auth")) {
                localStorage.removeItem(key)
              }
            })
          }

          setIsDemo(true)
          setUser(null)
          setLoading(false)
          return
        }

        const supabase = createClient()

        // If client creation failed, switch to demo mode
        if (!supabase) {
          setIsDemo(true)
          setUser(null)
          setLoading(false)
          return
        }

        try {
          // Get initial session with error handling
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession()

          // Handle refresh token errors specifically
          if (sessionError && sessionError.message?.includes("refresh")) {
            // Clear the invalid session and continue in demo mode
            await supabase.auth.signOut()
            setIsDemo(true)
            setUser(null)
            setLoading(false)
            return
          }

          setUser(session?.user ?? null)
          setLoading(false)

          // Listen for auth changes with error handling
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
          })

          return () => subscription.unsubscribe()
        } catch (authError: any) {
          if (authError.message?.includes("refresh") || authError.message?.includes("token")) {
            // Clear any stale tokens and switch to demo mode
            try {
              await supabase.auth.signOut()
            } catch {
              // Silent failure on signOut
            }
            setIsDemo(true)
          } else {
            setIsDemo(true)
          }
          setUser(null)
          setLoading(false)
        }
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
