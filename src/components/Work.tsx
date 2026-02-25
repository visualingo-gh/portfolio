// Work — Featured projects section on the homepage.
// Shows up to 3 projects marked as "featured" in Sanity Studio.
// Edit at /studio → Projects → toggle "Show on Homepage".
//
// Projects are passed in as props from the homepage, which fetches them server-side.

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import type { SanityProject } from '@/sanity/queries'
import { LockedCard } from '@/components/LockedCard'

interface WorkProps {
  // Featured projects fetched from Sanity — passed down from the homepage
  projects: SanityProject[]
}

export function Work({ projects }: WorkProps) {
  return (
    <section
      id="work"
      className="bg-background py-28 md:py-36 px-6 md:px-12"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-display">
            Selected Work
          </h2>
          {/* Link to the full work archive at /work */}
          <Link
            href="/work"
            className="text-sm text-muted hover:text-foreground transition-colors duration-250"
          >
            View all →
          </Link>
        </div>

        {/* Project cards — stacked vertically for a deliberate, editorial pace */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ProjectCard ──────────────────────────────────────────────────────────────
// A single project row. Large, minimal, lets the content breathe.
// The left side has the image; the right side has the text.

function ProjectCard({
  project,
  index,
}: {
  project: SanityProject
  index: number
}) {
  return (
    <LockedCard
      href={`/work/${project.slug}`}
      protected={project.protected ?? true}
      className="
        group flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden
        border border-border
        hover:border-stone-300
        transition-all duration-400
        bg-white
      "
    >
      {/* Image area — shows the Sanity project image, or a numbered placeholder if none.
          aspect-[4/3] gives the container a defined height on all screen sizes. */}
      <div
        className="
          relative w-full md:w-2/5 aspect-[4/3]
          overflow-hidden flex-shrink-0
          bg-stone-100
        "
      >
        {project.image ? (
          // Sanity image — URL built via urlFor with CDN optimisation
          <Image
            src={urlFor(project.image).width(740).height(555).auto('format').url()}
            alt={project.image.alt ?? project.title}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-400"
          />
        ) : (
          // Numbered fallback — shown if no image has been uploaded yet
          <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-br from-stone-100 to-stone-200">
            <span className="font-serif text-[120px] leading-none text-stone-200 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col justify-between p-8 md:p-12 flex-1">
        <div>
          {/* Client label — smaller, above the title */}
          <p className="text-xs text-muted uppercase tracking-widest mb-3">
            {project.client} · {project.year}
          </p>

          {/* Project title */}
          <h3 className="font-serif text-2xl md:text-3xl text-foreground tracking-display mb-4 group-hover:opacity-80 transition-opacity duration-250">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg">
            {project.description}
          </p>
        </div>

        {/* Tags + arrow row */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-muted bg-stone-100 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow — animates on card hover */}
          <span className="text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-250 text-lg">
            →
          </span>
        </div>
      </div>
    </LockedCard>
  )
}
