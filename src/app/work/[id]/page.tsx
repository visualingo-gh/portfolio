// Case Study Page — /work/[slug]
//
// This single file powers ALL case study pages.
// Next.js reads the slug from the URL, fetches the matching project
// from Sanity, and renders the case study content.
//
// To update a case study: open Sanity Studio at /studio,
// click on a project, and edit the fields directly.
// No code changes needed.

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { NavWrapper } from '@/components/NavWrapper'
import { PasswordGate } from '@/components/PasswordGate'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAllProjectsNavData,
  type SanityProject,
} from '@/sanity/queries'

// Tell Next.js which slugs to pre-build as static pages at build time.
// This runs once during the build — Sanity returns all project slugs.
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(getAllProjectSlugs)
  return slugs.map(({ slug }) => ({ id: slug }))
}

// Generate a unique browser-tab title for each case study
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await client.fetch<SanityProject | null>(getProjectBySlug, { slug: id })
  if (!project) return {}
  return {
    title: `${project.title} — Curtis Calhoun`,
    description: project.description,
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch this project and the full project list for prev/next nav — run in parallel
  const [project, allProjects] = await Promise.all([
    client.fetch<SanityProject | null>(getProjectBySlug, { slug: id }),
    client.fetch<{ _id: string; slug: string; title: string }[]>(getAllProjectsNavData),
  ])

  // 404 if the project doesn't exist in Sanity
  if (!project) notFound()

  // Find adjacent projects for the next/prev navigation at the bottom
  const currentIndex = allProjects.findIndex((p) => p.slug === id)
  const prevProject  = allProjects[currentIndex - 1] ?? null
  const nextProject  = allProjects[currentIndex + 1] ?? null

  return (
    <>
      <NavWrapper />

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
          {project.image && (
            <div className="relative w-full h-[50vh] md:h-[60vh] bg-stone-100 overflow-hidden">
              <Image
                src={urlFor(project.image).width(1920).height(800).auto('format').url()}
                alt={project.image.alt ?? project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* ── Case Study Body ────────────────────────────────── */}
          <div className="max-w-2xl mx-auto px-6 py-20 md:py-28">

            {/* Overview — always shown (falls back to the short description) */}
            <Section title="Overview">
              {project.overview ? (
                <PortableText value={project.overview} components={portableTextComponents} />
              ) : (
                <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                  {project.description}
                </p>
              )}
            </Section>

            {/* Challenge — shown only if filled in */}
            {project.challenge ? (
              <Section title="The Challenge">
                <PortableText value={project.challenge} components={portableTextComponents} />
              </Section>
            ) : (
              <ComingSoon label="The Challenge" />
            )}

            {/* Process — shown only if filled in */}
            {project.process ? (
              <Section title="My Process">
                <PortableText value={project.process} components={portableTextComponents} />
              </Section>
            ) : (
              <ComingSoon label="My Process" />
            )}

            {/* Outcome — shown only if filled in */}
            {project.outcome ? (
              <Section title="Outcome">
                <PortableText value={project.outcome} components={portableTextComponents} />
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
                href={`/work/${prevProject.slug}`}
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
                href={`/work/${nextProject.slug}`}
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

// ── Portable Text Components ───────────────────────────────────
// Tells @portabletext/react how to style each type of rich-text block.
// These match the existing typography styles on the rest of the page.

const portableTextComponents = {
  block: {
    // Normal paragraphs — the most common block type
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-6">{children}</p>
    ),
    // H2 — section subheading inside a case study section
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-serif text-2xl text-foreground mt-10 mb-4 leading-snug">{children}</h2>
    ),
    // H3 — smaller subheading
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-medium text-foreground text-lg mt-8 mb-3">{children}</h3>
    ),
    // Block quote — pulled quote, visually set apart
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-stone-300 pl-6 my-8 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bulleted list
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80 text-base md:text-lg leading-relaxed">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80 text-base md:text-lg leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    // Bold text
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    // Italic text
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
}

// ── Section ───────────────────────────────────────────────────
// Reusable content block with a small label above the content

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
