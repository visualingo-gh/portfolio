'use client'

// PasswordModal — the dialog visitors see when work is locked.
//
// Two sections:
//   1. Enter a password directly (for people you've already given it to)
//   2. Request access form — collects name, company, email, and reason,
//      then opens the visitor's email client with a pre-written message to Curtis.
//
// No server, no API — everything is client-side.

import { useState, useEffect, useRef } from 'react'
import { usePassword } from '@/components/PasswordProvider'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/config'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const { unlock } = usePassword()

  // Which tab is active: 'unlock' or 'request'
  const [activeTab, setActiveTab] = useState<'unlock' | 'request'>('unlock')

  // Unlock tab state
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  // Request form state
  const [form, setForm] = useState({ name: '', company: '', email: '', reason: '' })
  const [requestSent, setRequestSent] = useState(false)

  // Focus the password input when modal opens
  useEffect(() => {
    if (isOpen && activeTab === 'unlock') {
      setTimeout(() => passwordInputRef.current?.focus(), 50)
    }
  }, [isOpen, activeTab])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  // ── Handlers ─────────────────────────────────────────────

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    const success = unlock(password)
    if (success) {
      onClose()
    } else {
      // Trigger shake animation and show error
      setError(true)
      setShaking(true)
      setPassword('')
      setTimeout(() => setShaking(false), 500)
    }
  }

  // Build the mailto URL reactively from the form state.
  // Using a plain <a href> instead of window.open() avoids Safari's
  // "blocked from automatically composing an email" prompt.
  const mailtoHref = (() => {
    const subject = encodeURIComponent('Portfolio Access Request')
    const body = encodeURIComponent(
      `Hi Curtis,\n\nI'd like to request access to your portfolio work.\n\n` +
      `Name: ${form.name}\n` +
      `Company / Role: ${form.company}\n` +
      `Email: ${form.email}\n\n` +
      `Why I'm interested:\n${form.reason}\n\n` +
      `Thanks!`
    )
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  })()

  // SMS fallback — condensed version for mobile visitors.
  // The sms: URI opens the native Messages app (iOS/Android) with Curtis's
  // Google Voice number and a pre-filled message. Hidden on desktop via sm:hidden.
  const smsHref = (() => {
    const body = encodeURIComponent(
      `Portfolio access request\n` +
      `Name: ${form.name}\n` +
      `Company: ${form.company}\n` +
      `Email: ${form.email}\n` +
      `Why: ${form.reason}`
    )
    return `sms:${CONTACT_PHONE}?body=${body}`
  })()

  return (
    // Backdrop — clicking outside closes the modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-border shadow-2xl overflow-hidden">

        {/* ── Modal Header ───────────────────────────────── */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <div className="flex items-center gap-3">
            {/* Lock icon */}
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Protected Work</p>
              <p className="text-xs text-muted">Enter a password or request access</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors duration-250 p-1"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="flex border-b border-border mx-8">
          {(['unlock', 'request'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setError(false) }}
              className={`
                pb-3 pr-6 text-sm transition-colors duration-250
                ${activeTab === tab
                  ? 'text-foreground border-b-2 border-foreground font-medium -mb-px'
                  : 'text-muted hover:text-foreground'
                }
              `}
            >
              {tab === 'unlock' ? 'Enter password' : 'Request access'}
            </button>
          ))}
        </div>

        <div className="px-8 py-6">

          {/* ── Tab 1: Enter password ───────────────────── */}
          {activeTab === 'unlock' && (
            <form onSubmit={handleUnlock} className="space-y-4">
              <div className={shaking ? 'animate-shake' : ''}>
                <input
                  ref={passwordInputRef}
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false) }}
                  placeholder="Enter password"
                  className={`
                    w-full px-4 py-3 rounded-xl border text-sm
                    bg-stone-50 text-foreground placeholder:text-muted
                    outline-none transition-colors duration-250
                    ${error
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-border focus:border-stone-400'
                    }
                  `}
                />
                {error && (
                  <p className="text-xs text-red-500 mt-2">
                    Incorrect password. Try again or request access below.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-foreground text-white text-sm font-medium py-3 rounded-xl hover:opacity-80 transition-opacity duration-250"
              >
                Unlock
              </button>
            </form>
          )}

          {/* ── Tab 2: Request access ───────────────────── */}
          {activeTab === 'request' && (
            requestSent ? (
              // Confirmation state after form is submitted
              <div className="py-4 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-foreground">Request sent</p>
                <p className="text-xs text-muted leading-relaxed">
                  Your email client should have opened with a pre-written message. Once you send it, Curtis will be in touch.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 text-xs text-muted hover:text-foreground transition-colors duration-250 underline underline-offset-2"
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="space-y-3">
                <p className="text-xs text-muted mb-4 leading-relaxed">
                  Fill this out and Curtis will review your request and follow up with the password.
                </p>

                {/* Name */}
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-stone-50 text-sm text-foreground placeholder:text-muted outline-none focus:border-stone-400 transition-colors duration-250"
                />

                {/* Company / Role */}
                <input
                  type="text"
                  required
                  placeholder="Company or role (e.g. Hiring Manager at Acme)"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-stone-50 text-sm text-foreground placeholder:text-muted outline-none focus:border-stone-400 transition-colors duration-250"
                />

                {/* Email */}
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-stone-50 text-sm text-foreground placeholder:text-muted outline-none focus:border-stone-400 transition-colors duration-250"
                />

                {/* Reason */}
                <textarea
                  required
                  placeholder="What brings you here? (a sentence or two is fine)"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-stone-50 text-sm text-foreground placeholder:text-muted outline-none focus:border-stone-400 transition-colors duration-250 resize-none"
                />

                {/* A direct <a> link — avoids Safari's mailto prompt that fires on window.open() */}
                <a
                  href={mailtoHref}
                  onClick={() => setRequestSent(true)}
                  className="block w-full bg-foreground text-white text-sm font-medium py-3 rounded-xl hover:opacity-80 transition-opacity duration-250 text-center"
                >
                  Send request
                </a>

                {/* SMS fallback — only shown on mobile (sm:hidden = hidden on sm and up).
                    Opens the visitor's native SMS app with your Google Voice number pre-filled. */}
                <a
                  href={smsHref}
                  onClick={() => setRequestSent(true)}
                  className="block sm:hidden text-center text-xs text-muted hover:text-foreground transition-colors duration-250 underline underline-offset-2 pt-1"
                >
                  Prefer to text? →
                </a>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  )
}
