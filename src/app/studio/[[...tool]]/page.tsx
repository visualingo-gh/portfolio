// The Sanity Studio page — served at /studio.
//
// This embeds the full Sanity Studio UI inside the Next.js app.
// Sanity handles its own authentication — only people with access to
// the Sanity project (i.e. you) can log in and edit content.
//
// Visit: localhost:3000/studio (local) or curtiscalhoun.com/studio (live)
//
// Note: The actual Studio is in _studio-client.tsx (a client component).
// Sanity needs React.createContext which only works client-side.

import { StudioClient } from './_studio-client'

// Force dynamic rendering — the Studio can't be statically pre-built
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <StudioClient />
}
