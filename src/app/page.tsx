// Homepage — assembles all the sections in order.
// Fetches content from Sanity and passes it down to each section as props.
// Edit everything at curtiscalhoun.com/studio — no code changes needed.

// ISR — re-fetch from Sanity in the background every 60 seconds.
// This means Studio changes appear on the live site within ~1 minute
// without needing a full redeploy.
export const revalidate = 60

import { NavWrapper } from '@/components/NavWrapper'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { getCachedSiteSettings, getCachedFeaturedProjects } from '@/sanity/queries'

export default async function HomePage() {
  // Fetch both settings and featured projects in parallel for speed
  const [settings, featuredProjects] = await Promise.all([
    getCachedSiteSettings(),
    getCachedFeaturedProjects(),
  ])

  return (
    <>
      {/* Fixed nav — stays at the top as you scroll */}
      <NavWrapper />

      {/* Main content — stacked sections, full width */}
      <main>
        {/* 1. Hero — full viewport, dark, immersive */}
        <Hero settings={settings} />

        {/* 2. Work — featured case studies from Sanity */}
        <Work projects={featuredProjects} />

        {/* 3. About — short bio teaser + specializations */}
        <About settings={settings} />

        {/* 4. Footer — contact CTA + links */}
        <Footer settings={settings} />
      </main>
    </>
  )
}
