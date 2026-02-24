# Claude Code Rules — UX Portfolio

## Who I Am
I'm a UX designer building my personal portfolio. I have some basic coding knowledge
but I'm not a developer. I'm using Claude Code to vibe code this project. Treat me
as a smart non-engineer — explain your decisions, don't just make them silently.

---

## My Goals (in priority order)
1. Looks impressive and visually polished
2. Easy for me to update the content myself
3. Easy for me to understand the code
4. Fast to build — don't over-engineer

---

## Tech Stack
- Next.js (App Router) + Tailwind CSS
- Keep dependencies minimal — only add a library if it meaningfully saves time
- No unnecessary complexity. If something can be done in 20 lines, don't use a library

---

## Visual Style
- Minimal and clean — lots of whitespace, restrained color palette
- Typography-forward — let type do the heavy lifting
- Subtle motion only — no flashy animations, just gentle transitions
- Mobile-first — always look great on phone and desktop
- Reference aesthetic: linear.app, read.cv, are.na

---

## Code Style
- **Always add comments** explaining what each section does in plain English
- Use clear, descriptive variable and component names (no cryptic abbreviations)
- Break code into small, readable chunks — one idea per block
- If you make a structural decision, add a comment explaining WHY, not just WHAT

### Example of the commenting style I want:
```jsx
// Hero section — the first thing visitors see.
// Displays my name, title, and a short intro line.
// Kept minimal on purpose: just text, no images or buttons here.
export function Hero() {
  return (
    <section className="py-32 px-6">
      <h1 className="text-5xl font-light tracking-tight">Curt Smith</h1>
      <p className="text-muted mt-3 text-lg">UX Designer · San Francisco</p>
    </section>
  )
}
```

---

## Decision Making
- **Always ask before making big structural decisions** (new pages, routing changes,
  adding a database, changing the tech stack)
- **Just do it for small decisions** (spacing, color tweaks, component structure)
- If there are two valid approaches, briefly explain the tradeoff and recommend one
- Default to the simpler option — I can always upgrade later
- Never delete or overwrite something significant without confirming with me first

---

## Content Structure
My portfolio needs these sections (in order):
1. **Hero** — Name, title, one-line description, ability to handle video
2. **Work** — Case studies / project cards (image, title, brief description, tags)
3. **About** — Short bio, skills, maybe a photo
4. **Contact** — Email link, LinkedIn, maybe a simple form

Each project card should be easy for me to update by editing a simple data file
(not scattered across multiple component files).

---

## What to Avoid
- Don't use `any` in TypeScript — keep types explicit
- Don't add auth, databases, or CMS unless I specifically ask
- Don't use heavy UI libraries (no MUI, Chakra, etc.) — Tailwind is enough
- Don't make the site clever at the expense of being clear
- Don't generate placeholder lorem ipsum — ask me for real content instead

---

## When You're Unsure
Ask. A quick "I'm about to do X — sound good?" is always welcome.
I'd rather pause for 10 seconds than undo 10 minutes of work.
