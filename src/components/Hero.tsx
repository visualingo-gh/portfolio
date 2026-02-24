// Hero — Full-viewport opening section. The first thing visitors see.
//
// Currently uses a rich dark gradient as a placeholder.
// TO ADD YOUR OWN IMAGE: replace the <div className="absolute inset-0 bg-gradient-to-br...">
// with this:
//
//   import Image from 'next/image'
//   <Image
//     src="/images/your-hero-image.jpg"   ← put your image in /public/images/
//     alt="Curtis Calhoun"
//     fill
//     priority
//     className="object-cover object-center"
//   />
//
// The overlay div beneath stays — it ensures your text stays readable
// no matter how light or dark the photo is.

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col">

      {/* ── Background ────────────────────────────────────── */}
      {/* This is the placeholder. Swap it for an Image component (see above). */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-neutral-800" />

      {/* Subtle vignette overlay — darkens edges slightly for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Dark overlay that ensures text is readable over any photo */}
      <div className="absolute inset-0 bg-black/25" />

      {/* ── Hero Content ──────────────────────────────────── */}
      {/* Positioned in the lower-left for an editorial, design-forward feel */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 pb-16 md:px-16 md:pb-24 max-w-screen-xl mx-auto w-full">

        {/* "Available for work" signal — subtle but valuable context for recruiters */}
        <div className="mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 text-xs text-white/50 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
        </div>

        {/* Name — the biggest typographic statement on the page */}
        <h1
          className="
            font-serif text-white
            text-5xl sm:text-6xl md:text-7xl lg:text-8xl
            tracking-display leading-none
            mb-5 animate-fade-in
          "
        >
          Curtis Calhoun
        </h1>

        {/* Divider line — separates name from descriptor, adds structure */}
        <div className="w-12 h-px bg-white/30 mb-5 animate-fade-in" />

        {/* Title + tagline — stacked, kept concise */}
        <div className="animate-fade-in-slow space-y-2">
          <p className="text-white/70 text-base md:text-lg font-medium tracking-wide uppercase text-sm">
            Senior Product Designer
          </p>
          <p className="text-white/60 text-base md:text-lg font-light max-w-xl leading-relaxed">
            Designing products people love.
            <br />
            Leading teams that build them.
          </p>
        </div>

        {/* Scroll prompt — nudges the visitor downward */}
        <div className="mt-14 animate-fade-in-slow">
          <a
            href="#work"
            className="
              inline-flex items-center gap-2
              text-xs text-white/40 tracking-widest uppercase
              hover:text-white/70 transition-colors duration-250
            "
          >
            View my work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Year label — top-right corner detail ─────────── */}
      {/* A subtle editorial touch, like you see on read.cv */}
      <div className="absolute top-20 right-6 md:right-12 z-10">
        <p className="text-white/20 text-xs tracking-widest uppercase rotate-90 origin-right translate-y-4">
          Portfolio 2024
        </p>
      </div>
    </section>
  )
}
