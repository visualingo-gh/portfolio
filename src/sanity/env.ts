// src/sanity/env.ts — Typed exports for Sanity environment variables.
//
// This gives us TypeScript safety when accessing env vars throughout the app,
// instead of using process.env.NEXT_PUBLIC_SANITY_PROJECT_ID everywhere.

// The Sanity project ID — safe to expose to the browser (NEXT_PUBLIC_ prefix)
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

// The Sanity dataset — "production" by default
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

// The API version date — controls which Sanity API features are available.
// Pinned to a specific date so updates to the API don't break the site.
export const apiVersion = '2024-01-01'
