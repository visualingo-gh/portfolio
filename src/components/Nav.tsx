'use client'

// Nav — Fixed top navigation bar.
// Uses a tiny scroll listener to shift from transparent (over the dark hero)
// to a frosted-glass white background once the user scrolls past the hero.
// The transition is smooth via CSS — no jarring flashes.

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function Nav() {
  // Track whether the user has scrolled below the hero section
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the background change after scrolling ~100px
      setScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        px-6 md:px-12
        h-16 flex items-center justify-between
        transition-all duration-400
        ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-white/10'
        }
      `}
    >
      {/* Left side: your name as the "logo" */}
      <Link
        href="/"
        className={`
          text-sm font-medium tracking-wide transition-colors duration-250
          ${scrolled ? 'text-foreground' : 'text-white'}
        `}
      >
        Curtis Calhoun
      </Link>

      {/* Right side: main navigation links */}
      <nav className="flex items-center gap-7">
        {[
          { label: 'Work', href: '#work' },
          { label: 'About', href: '#about' },
          { label: 'Contact', href: '#contact' },
          { label: 'Resume', href: '/resume' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`
              text-sm transition-all duration-250
              hover:opacity-70
              ${scrolled ? 'text-foreground' : 'text-white/80'}
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
