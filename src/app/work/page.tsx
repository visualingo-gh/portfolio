// All Work page — /work
//
// Shows every project in the portfolio as a grid of cards.
// Projects are pulled from /src/data/projects.ts — add or reorder them there.
// Featured projects appear first, then the rest in the order they're listed.

import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { LockedCard } from '@/components/LockedCard'
import { projects, type Project } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Work — Curtis Calhoun',
  description: 'All case studies and portfolio projects by Curtis Calhoun, Senior Product Designer.',
}

export default function WorkPage() {
  // Show featured projects first, then the rest — preserves order within each group
  const sorted = [
    ...projects.filter((p) => p.featured),
    ...projects.filter((p) => !p.featured),
  ]

  return (
    <>
      <Nav />

      <main className="bg-background min-h-screen">

        {/* ── Page Header ──────────────────────────────────── */}
        <div className="bg-dark text-white pt-32 pb-16 px-6 md:px-12">
          <div className="max-w-screen-xl mx-auto">
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
              {projects.length} projects
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-white tracking-display leading-none">
              All Work
            </h1>
          </div>
        </div>

        {/* ── Project Grid ─────────────────────────────────── */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
          </div>
        </div>

      </main>
    </>
  )
}

// ── WorkCard ──────────────────────────────────────────────────
// Compact card used in the grid — image on top, info below.

function WorkCard({ project }: { project: Project }) {
  return (
    <LockedCard
      href={`/work/${project.id}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-border hover:border-stone-300 bg-white transition-all duration-400"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-400"
          />
        ) : (
          // Fallback if no image — shouldn't happen but good to have
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-stone-200" />
        )}

        {/* Featured badge — subtle indicator for highlighted work */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] uppercase tracking-widest bg-white/90 text-foreground px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Text info */}
      <div className="flex flex-col flex-1 p-6">
        <p className="text-xs text-muted uppercase tracking-widest mb-2">
          {project.client} · {project.year}
        </p>
        <h2 className="font-serif text-lg text-foreground tracking-display mb-2 group-hover:opacity-80 transition-opacity duration-250 leading-snug">
          {project.title}
        </h2>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] text-muted bg-stone-100 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </LockedCard>
  )
}
