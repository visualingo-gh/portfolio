// Homepage — assembles all the sections in order.
// Each section is its own component — edit them individually in /src/components/.
// The layout order here (Nav → Hero → Work → About → Footer) reflects the page flow.

import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Work } from '@/components/Work'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      {/* Fixed nav — stays at the top as you scroll */}
      <Nav />

      {/* Main content — stacked sections, full width */}
      <main>
        {/* 1. Hero — full viewport, dark, immersive */}
        <Hero />

        {/* 2. Work — featured case studies */}
        <Work />

        {/* 3. About — short bio teaser + specializations */}
        <About />

        {/* 4. Footer — contact CTA + links */}
        <Footer />
      </main>
    </>
  )
}
