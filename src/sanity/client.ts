// src/sanity/client.ts — The Sanity client used to fetch content.
//
// This is the single place where we configure how the app talks to Sanity.
// Import `client` in server components and query files to fetch data.

import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  // useCdn: true means reads are served from Sanity's global CDN.
  // Content updates take ~60 seconds to appear — acceptable for a portfolio.
  // Set to false if you ever need guaranteed real-time reads.
  useCdn: true,

  // The write token is only available server-side (no NEXT_PUBLIC_ prefix).
  // It's used by the Studio and the seed script — not by the public site.
  token: process.env.SANITY_API_TOKEN,
})
