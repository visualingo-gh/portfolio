'use client'

// PasswordGate — full-page gate for case study pages.
//
// When locked:   renders children in the background (blurred + inert),
//                then overlays a frosted panel with the password modal UI.
//                The page title/header stays visible above the gate.
//
// When unlocked: renders children normally.

import { useState } from 'react'
import { usePassword } from '@/components/PasswordProvider'
import { PasswordModal } from '@/components/PasswordModal'

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const { isUnlocked } = usePassword()
  const [modalOpen, setModalOpen] = useState(false)

  // Unlocked — show content as-is
  if (isUnlocked) return <>{children}</>

  // Locked — blur the content and show a gate prompt
  return (
    <>
      {/* Content rendered behind the gate — blurred so nothing is readable */}
      <div className="blur-md select-none pointer-events-none" aria-hidden>
        {children}
      </div>

      {/* Frosted gate overlay — fixed so it covers the viewport on scroll */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="text-center px-6 max-w-xs">
          {/* Lock icon */}
          <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center mx-auto mb-5 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <p className="text-sm font-medium text-foreground mb-1">
            This work is protected
          </p>
          <p className="text-xs text-muted mb-6 leading-relaxed">
            This case study contains confidential client work.
            Enter the password or request access to view it.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="bg-foreground text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:opacity-80 transition-opacity duration-250"
          >
            Unlock work
          </button>
        </div>
      </div>

      <PasswordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
