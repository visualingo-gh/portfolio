// src/sanity/image.ts — Helper for generating image URLs from Sanity assets.
//
// Sanity stores images as references, not direct URLs. This helper converts
// a Sanity image reference into a fully-qualified CDN URL with optional transforms.
//
// Usage:
//   urlFor(project.image).width(740).auto('format').url()
//   → "https://cdn.sanity.io/images/cx9h3gny/production/abc123-740x555.webp"

import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Create the URL builder, wired to our project
const builder = imageUrlBuilder(client)

// Export the shorthand function used in components
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
