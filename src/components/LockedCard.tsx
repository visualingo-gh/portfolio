'use client'

// LockedCard — wraps a project card and blurs the entire thing when locked.
//
// When locked:   renders the card content blurred + unclickable, with a
//                lock icon overlay. Clicking anywhere opens the password modal.
//
// When unlocked: renders the card as a normal Link to the case study page.

import { useState } from 'react'
import Link from 'next/link'
import { usePassword } from '@/components/PasswordProvider'
import { PasswordModal } from '@/components/PasswordModal'

interface LockedCardProps {
  href: string
  children: React.ReactNode
  className?: string
  // When false, the card is always public regardless of the global unlock state.
  // Defaults to true so existing cards stay protected unless explicitly turned off.
  protected?: boolean
}

export function LockedCard({ href, children, className = '', protected: isProtected = true }: LockedCardProps) {
  const { isUnlocked } = usePassword()
  const [modalOpen, setModalOpen] = useState(false)

  // Not protected, or already unlocked — render as a normal navigating link
  if (!isProtected || isUnlocked) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  // Locked — blur the card contents and intercept clicks
  return (
    <>
      {/* Outer wrapper — carries all the card's visual styles (border, rounded corners,
          overflow-hidden, background). The overflow-hidden here is what clips the blur
          to the card boundary so it doesn't bleed outside. */}
      <div
        className={`relative cursor-pointer ${className}`}
        onClick={() => setModalOpen(true)}
        role="button"
        aria-label="View protected work — click to unlock"
      >
        {/* Inner blur wrapper — only wraps the content, not the card shell.
            Because overflow-hidden on the outer element clips this, the blur
            stops cleanly at the card edge instead of bleeding into adjacent cards. */}
        <div className="blur-md select-none pointer-events-none">
          {children}
        </div>

        {/* Lock overlay — sibling of the blurred div, not a child of it.
            Because it lives outside the blurred element, it renders sharp. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/20">
          {/* Lock icon */}
          <div className="w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
          <p className="text-xs text-foreground/70 font-medium tracking-wide">
            Protected work
          </p>
        </div>
      </div>

      {/* Password modal — rendered outside the card so it's not clipped */}
      <PasswordModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
