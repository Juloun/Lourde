"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode)

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 border-0">
        <DialogDescription className="sr-only">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </DialogDescription>
        {mode === "login" ? <LoginForm onToggleMode={toggleMode} /> : <SignupForm onToggleMode={toggleMode} />}
      </DialogContent>
    </Dialog>
  )
}
