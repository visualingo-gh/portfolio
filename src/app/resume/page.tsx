// Resume page — /resume
//
// A clean, shareable page for your resume.
// The "Download PDF" button pulls from /public/resume.pdf —
// to update your resume, just replace that file. No code changes needed.

import Link from 'next/link'
import { Metadata } from 'next'
import { NavWrapper } from '@/components/NavWrapper'
import { CONTACT_EMAIL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Resume — Curtis Calhoun',
  description: 'Resume of Curtis Calhoun, Senior Product Designer specializing in enterprise UX, streaming TV, and mobile.',
}

export default async function ResumePage() {
  return (
    <>
      <NavWrapper />

      <main className="bg-background min-h-screen">

        {/* ── Page Header ───────────────────────────────────────── */}
        <div className="bg-dark text-white pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">

            {/* Title block */}
            <div>
              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors duration-250 mb-12"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 5l-7 7 7-7" />
                </svg>
                Home
              </Link>

              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
                Curtis Calhoun
              </p>
              <h1 className="font-serif text-5xl md:text-7xl text-white tracking-display leading-none">
                Resume
              </h1>
            </div>

            {/* Download button — prominent, in the header */}
            <a
              href="/resume.pdf"
              download
              className="
                inline-flex items-center gap-3
                bg-white text-foreground
                px-6 py-3 rounded-full
                text-sm font-medium
                hover:bg-stone-100
                transition-colors duration-250
                self-start md:self-auto
              "
            >
              {/* Download icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>

        {/* ── Resume Content ─────────────────────────────────────── */}
        {/* An inline summary so this URL is useful even without downloading */}
        <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">

          {/* Summary */}
          <ResumeSection title="Summary">
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
              Senior Product Designer with 10+ years of experience leading design for enterprise software, streaming TV, and mobile applications. Background in design leadership, UX strategy, and cross-functional collaboration with engineering and product teams.
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection title="Experience">
            <div className="space-y-8">
              <Role
                title="Senior Product Designer"
                company="Various Clients"
                period="2015 — Present"
                description="Led UX design for enterprise platforms, consumer streaming products, and mobile applications across industries including sports, media, healthcare, and SaaS."
              />
              <Role
                title="Design Lead"
                company="Agency & In-House Roles"
                period="2012 — 2015"
                description="Managed design teams, defined visual language systems, and shipped products from 0-to-1 across web and mobile platforms."
              />
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {[
                'Product Design',
                'UX Strategy',
                'Design Systems',
                'Prototyping',
                'User Research',
                'Design Leadership',
                'Figma',
                'Enterprise UX',
                'Mobile Design',
                'Streaming / TV',
                'Stakeholder Communication',
                'Cross-functional Collaboration',
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-muted bg-stone-100 px-3 py-1.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ResumeSection>

          {/* Contact prompt */}
          <div className="border-t border-border pt-12 mt-4">
            <p className="text-muted text-sm">
              Want the full version?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity duration-250"
              >
                Get in touch
              </a>{' '}
              or download the PDF above.
            </p>
          </div>

        </div>
      </main>
    </>
  )
}

// ── ResumeSection ──────────────────────────────────────────────
// Labeled content block, same pattern as the case study page

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <p className="text-xs text-muted uppercase tracking-widest mb-6">{title}</p>
      {children}
    </div>
  )
}

// ── Role ──────────────────────────────────────────────────────
// A single work experience entry

function Role({
  title,
  company,
  period,
  description,
}: {
  title: string
  company: string
  period: string
  description: string
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <div>
          <span className="text-foreground font-medium text-base">{title}</span>
          <span className="text-muted text-sm"> · {company}</span>
        </div>
        <span className="text-xs text-muted uppercase tracking-widest flex-shrink-0">{period}</span>
      </div>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}
