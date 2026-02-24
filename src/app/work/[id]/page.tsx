// Case Study Page — /work/[id]
//
// This single file powers ALL case study pages.
// Next.js reads the `id` from the URL, looks it up in projects.ts,
// and renders the matching project's content.
//
// To fill in a case study: open /src/data/projects.ts, find your project,
// and add content to the overview/challenge/process/outcome fields.

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { PasswordGate } from '@/components/PasswordGate'
import { projects } from '@/data/projects'

// Tell Next.js which IDs to pre-build as static pages at build time
export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

// Generate a unique browser-tab title for each case study
// Note: params is a Promise in Next.js 15 — must be awaited
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}
  return {
    title: `${project.title} — Curtis Calhoun`,
    description: project.description,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Look up the project by its ID — show a 404 if it doesn't exist
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  // Find adjacent projects for the next/prev navigation at the bottom
  const currentIndex = projects.findIndex((p) => p.id === id)
  const prevProject = projects[currentIndex - 1] ?? null
  const nextProject = projects[currentIndex + 1] ?? null

  return (
    <>
      <Nav />

      <main className="bg-background min-h-screen">

        {/* ── Page Header ──────────────────────────────────────── */}
        {/* Dark section with project title and meta — sits below the nav */}
        <div className="bg-dark text-white pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto">

            {/* Back link */}
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-xs text-white/40 uppercase tracking-widest hover:text-white/70 transition-colors duration-250 mb-12"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to work
            </Link>

            {/* Client + year */}
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
              {project.client} · {project.year}
            </p>

            {/* Project title — large, serif */}
            <h1 className="font-serif text-4xl md:text-6xl text-white tracking-display leading-none mb-8 max-w-3xl">
              {project.title}
            </h1>

            {/* Meta row: role + tags */}
            <div className="flex flex-wrap items-center gap-6">
              {project.role && (
                <span className="text-sm text-white/50">
                  Role: <span className="text-white/80">{project.role}</span>
                </span>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-white/50 border border-white/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Protected Content ────────────────────────────────── */}
        {/* PasswordGate blurs everything below when locked.       */}
        {/* The dark header above stays visible so the page feels  */}
        {/* anchored even before a visitor unlocks.                */}
        <PasswordGate>

          {/* ── Hero Image ─────────────────────────────────────── */}
          {project.imageSrc && (
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-stone-100 overflow-hidden">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt ?? project.title}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          )}

          {/* ── Case Study Body ────────────────────────────────── */}
          <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">

            {/* Overview — always shown (falls back to description) */}
            <Section title="Overview">
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                {project.overview ?? project.description}
              </p>
            </Section>

            {/* Challenge — shown only if filled in */}
            {project.challenge ? (
              <Section title="The Challenge">
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                  {project.challenge}
                </p>
              </Section>
            ) : (
              <ComingSoon label="The Challenge" />
            )}

            {/* Process — shown only if filled in */}
            {project.process ? (
              <Section title="My Process">
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                  {project.process}
                </p>
              </Section>
            ) : (
              <ComingSoon label="My Process" />
            )}

            {/* Outcome — shown only if filled in */}
            {project.outcome ? (
              <Section title="Outcome">
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                  {project.outcome}
                </p>
              </Section>
            ) : (
              <ComingSoon label="Outcome" />
            )}
          </div>

        </PasswordGate>

        {/* ── Next / Prev Navigation ───────────────────────────── */}
        {/* Lets visitors browse through projects without going back to the homepage */}
        <div className="border-t border-border bg-background">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12 flex justify-between items-center">

            {prevProject ? (
              <Link
                href={`/work/${prevProject.id}`}
                className="group flex flex-col gap-1 max-w-xs"
              >
                <span className="text-xs text-muted uppercase tracking-widest group-hover:text-foreground transition-colors duration-250">
                  ← Previous
                </span>
                <span className="text-sm text-foreground font-medium group-hover:opacity-70 transition-opacity duration-250">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div /> // Empty spacer so "next" stays right-aligned
            )}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.id}`}
                className="group flex flex-col gap-1 items-end max-w-xs text-right"
              >
                <span className="text-xs text-muted uppercase tracking-widest group-hover:text-foreground transition-colors duration-250">
                  Next →
                </span>
                <span className="text-sm text-foreground font-medium group-hover:opacity-70 transition-opacity duration-250">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

      </main>
    </>
  )
}

// ── Section ───────────────────────────────────────────────────
// Reusable content block with a label above the content

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-16">
      <p className="text-xs text-muted uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  )
}

// ── ComingSoon ────────────────────────────────────────────────
// Shown for sections not yet written — looks intentional, not broken

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mb-16">
      <p className="text-xs text-muted uppercase tracking-widest mb-4">{label}</p>
      <div className="border border-dashed border-border rounded-xl px-6 py-8">
        <p className="text-muted text-sm">
          Case study details coming soon.
        </p>
      </div>
    </div>
  )
}
