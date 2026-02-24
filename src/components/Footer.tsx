// Footer — Contact section + site footer, combined.
// Keeps it simple: a clear call to action, two or three links, and a copyright line.
// Update the email and LinkedIn URL with your real ones.

export function Footer() {
  // Contact links — update these with your real details
  const contactLinks = [
    {
      label: 'Email',
      href: 'mailto:hello@curtiscalhoun.com',  // ← update this
      display: 'hello@curtiscalhoun.com',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/curtiscalhoun',  // ← update this
      display: 'linkedin.com/in/curtiscalhoun',
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
            Let&apos;s work together.
          </h2>
          <p className="text-muted text-base md:text-lg max-w-md leading-relaxed">
            Open to full-time roles, contract work, and design leadership
            opportunities. Reach out and let&apos;s start a conversation.
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
              {/* Icon label */}
              <span className="text-xs text-muted uppercase tracking-widest w-16 flex-shrink-0">
                {label}
              </span>
              {/* Link text */}
              <span className="text-sm border-b border-border group-hover:border-muted transition-colors duration-250 pb-0.5">
                {display}
              </span>
            </a>
          ))}
        </div>

        {/* Bottom bar — copyright and back-to-top */}
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Curtis Calhoun
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
