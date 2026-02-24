// About — A brief teaser that lives on the homepage.
// NOT the full bio — just enough to intrigue and send people to /about.
// Two columns: a short paragraph on the left, a few highlights on the right.

export function About() {
  // Skills/highlights shown in the right column — easy to update here
  const highlights = [
    { label: 'Specializations', items: ['Enterprise UX', 'Streaming & TV', 'Mobile', 'Design Leadership'] },
    { label: 'Industries', items: ['Energy & Utilities', 'Media & Entertainment', 'B2B SaaS', 'Marketing & Brand'] },
  ]

  return (
    <section
      id="about"
      className="
        bg-dark text-white
        py-28 md:py-36 px-6 md:px-12
      "
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Section label */}
        <p className="text-xs text-white/30 uppercase tracking-widest mb-14">
          About
        </p>

        {/* Two-column layout: bio on left, highlights on right */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Left — bio text */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-display mb-8 leading-snug">
              I design with both craft
              <br />
              and context in mind.
            </h2>

            {/* Bio paragraph — update this with your real bio */}
            {/* Replace the text below with 2–3 sentences about yourself */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
              I&apos;m a Senior Product Designer with over a decade of experience
              spanning enterprise software, streaming TV, and mobile. My background
              in design management means I think about systems, teams, and outcomes
              — not just screens.
            </p>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-10">
              I&apos;ve led design for products used by millions, built and mentored
              design teams, and partnered closely with engineering and product to
              ship work that actually moves the needle.
            </p>

            <a
              href="#contact"
              className="
                inline-flex items-center gap-2
                text-sm text-white border-b border-white/30
                hover:border-white pb-0.5
                transition-colors duration-250
              "
            >
              Get in touch →
            </a>
          </div>

          {/* Right — skill highlights */}
          <div className="space-y-10">
            {highlights.map(({ label, items }) => (
              <div key={label}>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-4">
                  {label}
                </p>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="text-white/70 text-base flex items-center gap-3"
                    >
                      {/* Decorative bullet */}
                      <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
