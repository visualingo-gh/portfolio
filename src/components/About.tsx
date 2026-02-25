// About — A brief teaser that lives on the homepage.
// NOT the full bio — just enough to intrigue and send people to contact.
// Two columns: bio on the left, highlights on the right.
//
// All content comes from Sanity — edit at /studio → Site Settings → About Section.

import { PortableText } from '@portabletext/react'
import type { SiteSettings } from '@/sanity/queries'

interface AboutProps {
  settings: SiteSettings | null
}

// Controls how Portable Text bio paragraphs are rendered.
// Matches the existing typography style of the About section.
const bioComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
  },
}

export function About({ settings }: AboutProps) {
  // Fall back to defaults if Sanity hasn't been seeded yet
  const headline        = settings?.aboutHeadline    ?? 'I design with both craft\nand context in mind.'
  const bio             = settings?.aboutBio
  const specializations = settings?.specializations  ?? ['Enterprise UX', 'Streaming & TV', 'Mobile', 'Design Leadership']
  const industries      = settings?.industries       ?? ['Energy & Utilities', 'Media & Entertainment', 'B2B SaaS', 'Marketing & Brand']

  const highlights = [
    { label: 'Specializations', items: specializations },
    { label: 'Industries',      items: industries      },
  ]

  return (
    <section
      id="about"
      className="
        bg-dark text-white
        py-28 md:py-36 px-6 md:px-12
      "
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Section label */}
        <p className="text-xs text-white/30 uppercase tracking-widest mb-14">
          About
        </p>

        {/* Two-column layout: bio on left, highlights on right */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — bio text */}
          <div>
            {/* whitespace-pre-line respects \n line breaks entered in the Studio */}
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-display mb-8 leading-snug whitespace-pre-line">
              {headline}
            </h2>

            {/* Bio — rendered as Portable Text if Sanity content exists */}
            {bio && bio.length > 0 ? (
              <PortableText value={bio} components={bioComponents} />
            ) : (
              // Fallback shown before Sanity is seeded
              <>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
                  I&apos;m a Senior Product Designer with over a decade of experience
                  spanning enterprise software, streaming TV, and mobile. My background
                  in design management means I think about systems, teams, and outcomes
                  — not just screens.
                </p>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
                  I&apos;ve led design for products used by millions, built and mentored
                  design teams, and partnered closely with engineering and product to
                  ship work that actually moves the needle.
                </p>
              </>
            )}

            <a
              href="#contact"
              className="
                inline-flex items-center gap-2
                text-sm text-white border-b border-white/30
                hover:border-white pb-0.5
                transition-colors duration-250
              "
            >
              Get in touch →
            </a>
          </div>

          {/* Right — skill highlights */}
          <div className="space-y-10">
            {highlights.map(({ label, items }) => (
              <div key={label}>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
                  {label}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-white/70 text-base flex items-center gap-3"
                    >
                      {/* Decorative bullet */}
                      <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
