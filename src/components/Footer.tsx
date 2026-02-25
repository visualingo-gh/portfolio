// Footer — Contact section + site footer, combined.
// Keeps it simple: a clear call to action, two or three links, and a copyright line.
//
// All content comes from Sanity — edit at /studio → Site Settings → Contact & Footer.

import type { SiteSettings } from '@/sanity/queries'

interface FooterProps {
  settings: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  // Fall back to defaults if Sanity hasn't been seeded yet
  const brandName         = settings?.brandName         ?? 'Curtis Calhoun'
  const footerHeadline    = settings?.footerHeadline    ?? "Let's work together."
  const footerDescription = settings?.footerDescription ?? 'Open to full-time roles, contract work, and design leadership opportunities. Reach out and let\'s start a conversation.'
  const contactEmail      = settings?.contactEmail      ?? 'hello@curtiscalhoun.com'
  const linkedInUrl       = settings?.linkedInUrl       ?? 'https://www.linkedin.com/in/curtiscalhoun'

  // Build a clean display version of the LinkedIn URL (strips https://)
  const linkedInDisplay = linkedInUrl.replace(/^https?:\/\//, '')

  const contactLinks = [
    {
      label:   'Email',
      href:    `mailto:${contactEmail}`,
      display: contactEmail,
    },
    {
      label:   'LinkedIn',
      href:    linkedInUrl,
      display: linkedInDisplay,
    },
  ]

  return (
    <footer
      id="contact"
      className="bg-background border-t border-border py-28 md:py-36 px-6 md:px-12"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Main CTA — the headline of the footer */}
        <div className="mb-20">
          <p className="text-xs text-muted uppercase tracking-widest mb-6">
            Get in touch
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground tracking-display leading-none mb-8">
            {footerHeadline}
          </h2>
          <p className="text-muted text-base md:text-lg max-w-md leading-relaxed">
            {footerDescription}
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-24">
          {contactLinks.map(({ label, href, display }) => (
            <a
              key={label}
              href={href}
              className="
                group flex items-center gap-3
                text-foreground hover:text-muted
                transition-colors duration-250
              "
            >
              <span className="text-xs text-muted uppercase tracking-widest w-16 flex-shrink-0">
                {label}
              </span>
              <span className="text-sm border-b border-border group-hover:border-muted transition-colors duration-250 pb-0.5">
                {display}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar — copyright and back-to-top */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {brandName}
          </p>
          <a
            href="#"
            className="text-xs text-muted hover:text-foreground transition-colors duration-250"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
