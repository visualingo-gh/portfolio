'use client'

// PasswordProvider — manages the locked/unlocked state for the whole site.
//
// Wrap the app with this at the layout level so every component can check
// whether work is unlocked without prop-drilling.
//
// State is persisted in localStorage so visitors stay unlocked across page
// refreshes and return visits.

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { PORTFOLIO_PASSWORD } from '@/lib/config'

// ── Types ────────────────────────────────────────────────────

interface PasswordContextValue {
  isUnlocked: boolean
  // Returns true if the password was correct, false otherwise
  unlock: (password: string) => boolean
}

// ── Context ──────────────────────────────────────────────────

export const PasswordContext = createContext<PasswordContextValue>({
  isUnlocked: false,
  unlock: () => false,
})

// ── Hook ─────────────────────────────────────────────────────
// Use this in any component: const { isUnlocked, unlock } = usePassword()

export function usePassword() {
  return useContext(PasswordContext)
}

// ── Provider ─────────────────────────────────────────────────

const STORAGE_KEY = 'portfolio_unlocked'

export function PasswordProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)

  // On mount, check if the visitor has previously unlocked the site
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setIsUnlocked(true)
  }, [])

  // Check the entered password and update state if correct
  const unlock = useCallback((password: string): boolean => {
    if (password === PORTFOLIO_PASSWORD) {
      setIsUnlocked(true)
      localStorage.setItem(STORAGE_KEY, 'true')
      return true
    }
    return false
  }, [])

  return (
    <PasswordContext.Provider value={{ isUnlocked, unlock }}>
      {children}
    </PasswordContext.Provider>
  )
}
