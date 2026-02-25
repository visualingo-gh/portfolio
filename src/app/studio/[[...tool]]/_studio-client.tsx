'use client'

// This must be a client component — Sanity Studio uses React.createContext
// which is only available in the browser, not in Next.js server components.

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export function StudioClient() {
  return <NextStudio config={config} />
}
