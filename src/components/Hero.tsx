// Hero — Full-viewport opening section. The first thing visitors see.
//
// All text content (name, title, tagline, status label) comes from Sanity.
// Edit it at /studio → Site Settings → Hero Section.
//
// If you upload a heroImage in the Studio, it replaces the dark gradient.
// The overlays ensure text stays readable over any photo.

import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SiteSettings } from '@/sanity/queries'

interface HeroProps {
  settings: SiteSettings | null
}

export function Hero({ settings }: HeroProps) {
  // Fall back to sensible defaults if Sanity hasn't been seeded yet
  const name        = settings?.brandName       ?? 'Curtis Calhoun'
  const title       = settings?.heroTitle       ?? 'Senior Product Designer'
  const tagline     = settings?.heroTagline     ?? 'Designing products people love.\nLeading teams that build them.'
  const statusLabel = settings?.heroStatusLabel ?? 'Open to opportunities'
  const heroImage   = settings?.heroImage

  return (
    <section className="relative min-h-screen flex flex-col">

      {/* ── Background ────────────────────────────────────── */}
      {heroImage ? (
        // If a hero image is uploaded in the Studio, use it
        <Image
          src={urlFor(heroImage).width(1920).auto('format').url()}
          alt={name}
          fill
          priority
          className="object-cover object-center"
        />
      ) : (
        // Default: dark gradient placeholder
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-neutral-800" />
      )}

      {/* Subtle vignette overlay — darkens edges slightly for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Dark overlay that ensures text is readable over any photo */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Hero Content ──────────────────────────────────── */}
      {/* Positioned in the lower-left for an editorial, design-forward feel */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 pb-16 md:px-16 md:pb-24 max-w-screen-xl mx-auto w-full">

        {/* Availability status — subtle context for recruiters */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs text-white/50 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {statusLabel}
          </span>
        </div>

        {/* Name — the biggest typographic statement on the page */}
        <h1
          className="
            font-serif text-white
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            tracking-display leading-none
            mb-5 animate-fade-in
          "
        >
          {name}
        </h1>

        {/* Divider line — separates name from descriptor, adds structure */}
        <div className="w-12 h-px bg-white/30 mb-5 animate-fade-in" />

        {/* Title + tagline — stacked, kept concise */}
        <div className="animate-fade-in-slow space-y-2">
          <p className="text-white/70 text-base md:text-lg font-medium tracking-wide uppercase text-sm">
            {title}
          </p>
          {/* whitespace-pre-line respects \n line breaks from the Sanity text field */}
          <p className="text-white/60 text-base md:text-lg font-light max-w-xl leading-relaxed whitespace-pre-line">
            {tagline}
          </p>
        </div>

        {/* Scroll prompt — nudges the visitor downward */}
        <div className="mt-14 animate-fade-in-slow">
          <a
            href="#work"
            className="
              inline-flex items-center gap-2
              text-xs text-white/40 tracking-widest uppercase
              hover:text-white/70 transition-colors duration-250
            "
          >
            View my work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Year label — top-right corner detail ─────────── */}
      {/* A subtle editorial touch, like you see on read.cv */}
      <div className="absolute top-20 right-6 md:right-12 z-10">
        <p className="text-white/20 text-xs tracking-widest uppercase rotate-90 origin-right translate-y-4">
          Portfolio {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
