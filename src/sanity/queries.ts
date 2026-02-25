// src/sanity/queries.ts — All GROQ queries and TypeScript types for Sanity data.
//
// GROQ is Sanity's query language — similar to GraphQL but simpler.
// Each query fetches exactly the fields needed, nothing more.
//
// `getCached*` functions wrap queries in React's cache() so the same query
// isn't run twice in the same page render (e.g. layout + page both need settings).

import { cache } from 'react'
import { client } from './client'

// ── TypeScript types ──────────────────────────────────────────────────────────

// Sanity image reference — passed to urlFor() to generate the actual URL
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

// A single block of Portable Text (rich text) content
// The internal structure is handled by @portabletext/react
export type PortableTextContent = Array<{
  _type: string
  _key: string
  style?: string
  children?: Array<{ _type: string; _key: string; text: string; marks: string[] }>
  markDefs?: Array<Record<string, unknown>>
  [key: string]: unknown
}>

// Shape of a project as returned from Sanity (after GROQ projection)
export interface SanityProject {
  _id: string
  slug: string          // flattened from id.current — used in URLs: /work/{slug}
  title: string
  client: string
  description: string
  tags: string[]
  year: string
  featured: boolean
  image?: SanityImage
  role?: string
  overview?: PortableTextContent
  challenge?: PortableTextContent
  process?: PortableTextContent
  outcome?: PortableTextContent
}

// Shape of the siteSettings singleton document
export interface SiteSettings {
  brandName: string
  heroTitle: string
  heroTagline: string
  heroStatusLabel: string
  heroImage?: SanityImage
  aboutHeadline: string
  aboutBio?: PortableTextContent
  specializations: string[]
  industries: string[]
  footerHeadline: string
  footerDescription: string
  contactEmail: string
  contactPhone?: string
  linkedInUrl: string
  portfolioPassword: string
}

// ── GROQ query strings ────────────────────────────────────────────────────────

// Shared field projection used in all project queries
const PROJECT_FIELDS = `
  _id,
  "slug": id.current,
  title,
  client,
  description,
  tags,
  year,
  featured,
  image { ..., "alt": alt },
  role,
  overview,
  challenge,
  process,
  outcome
`

// All projects, most recent first
export const getAllProjects = `
  *[_type == "project"] | order(year desc, _createdAt desc) {
    ${PROJECT_FIELDS}
  }
`

// Only featured projects for the homepage (up to 3)
export const getFeaturedProjects = `
  *[_type == "project" && featured == true] | order(_createdAt asc) [0...3] {
    ${PROJECT_FIELDS}
  }
`

// Single project by its slug (used on case study pages)
export const getProjectBySlug = `
  *[_type == "project" && id.current == $slug][0] {
    ${PROJECT_FIELDS}
  }
`

// All project slugs — used by generateStaticParams to pre-build case study pages
export const getAllProjectSlugs = `
  *[_type == "project"] {
    "slug": id.current
  }
`

// All projects with just slug + title — used for next/prev navigation
export const getAllProjectsNavData = `
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    "slug": id.current,
    title
  }
`

// The one site settings document
export const getSiteSettings = `
  *[_type == "siteSettings"][0] {
    brandName,
    heroTitle,
    heroTagline,
    heroStatusLabel,
    heroImage,
    aboutHeadline,
    aboutBio,
    specializations,
    industries,
    footerHeadline,
    footerDescription,
    contactEmail,
    contactPhone,
    linkedInUrl,
    portfolioPassword
  }
`

// ── Cached fetch helpers ──────────────────────────────────────────────────────
// React.cache() deduplicates calls within a single render pass.
// This means layout.tsx and page.tsx can both call getCachedSiteSettings()
// and only one Sanity request is made.

export const getCachedSiteSettings = cache(async (): Promise<SiteSettings | null> => {
  return client.fetch(getSiteSettings)
})

export const getCachedFeaturedProjects = cache(async (): Promise<SanityProject[]> => {
  return client.fetch(getFeaturedProjects)
})

export const getCachedAllProjects = cache(async (): Promise<SanityProject[]> => {
  return client.fetch(getAllProjects)
})
