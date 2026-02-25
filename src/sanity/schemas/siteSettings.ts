// src/sanity/schemas/siteSettings.ts — Defines the Site Settings document.
//
// This is a "singleton" — there's only ever one of these documents.
// It holds all the site-wide content you might want to change:
// your name, bio, contact info, and the portfolio password.
//
// In the Studio, it appears as "Site Settings" at the top of the sidebar.
// Fields are grouped into tabs to make editing less overwhelming.

import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  // Tabs in the Studio editor
  groups: [
    { name: 'hero',    title: 'Hero Section',    default: true },
    { name: 'about',   title: 'About Section'   },
    { name: 'contact', title: 'Contact & Footer' },
    { name: 'access',  title: 'Portfolio Access' },
  ],

  fields: [
    // ── Hero tab ─────────────────────────────────────────────────

    defineField({
      name: 'brandName',
      title: 'Your Name',
      type: 'string',
      group: 'hero',
      description: 'Used in the nav logo and footer copyright line.',
      initialValue: 'Curtis Calhoun',
    }),

    defineField({
      name: 'heroTitle',
      title: 'Your Title',
      type: 'string',
      group: 'hero',
      description: 'e.g. Senior Product Designer',
    }),

    defineField({
      name: 'heroTagline',
      title: 'Tagline',
      type: 'text',
      group: 'hero',
      rows: 2,
      description: 'The short statement under your title. Use a line break for two lines.',
    }),

    defineField({
      name: 'heroStatusLabel',
      title: 'Availability Label',
      type: 'string',
      group: 'hero',
      description: 'Shown next to the green dot. e.g. "Open to opportunities"',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      description: 'Optional. Leave empty to use the dark gradient background.',
      options: { hotspot: true },
    }),

    // ── About tab ────────────────────────────────────────────────

    defineField({
      name: 'aboutHeadline',
      title: 'About Headline',
      type: 'string',
      group: 'about',
      description: 'The large serif heading in the About section. Use \\n for a line break.',
    }),

    defineField({
      name: 'aboutBio',
      title: 'Bio',
      type: 'array',
      group: 'about',
      description: 'Your bio text. Each paragraph is a block. You can bold text, add bullets, etc.',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      group: 'about',
      description: 'Shown on the right side of the About section.',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'about',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ── Contact tab ──────────────────────────────────────────────

    defineField({
      name: 'footerHeadline',
      title: 'Footer Headline',
      type: 'string',
      group: 'contact',
      description: 'e.g. "Let\'s work together."',
    }),

    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'contact',
      rows: 3,
      description: 'The paragraph under the footer headline.',
    }),

    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),

    defineField({
      name: 'contactPhone',
      title: 'Contact Phone (Google Voice)',
      type: 'string',
      group: 'contact',
      description: 'Format: +1XXXXXXXXXX. Used for the "Text instead" option on mobile.',
    }),

    defineField({
      name: 'linkedInUrl',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'contact',
    }),

    // ── Portfolio Access tab ─────────────────────────────────────

    defineField({
      name: 'portfolioPassword',
      title: 'Portfolio Password',
      type: 'string',
      group: 'access',
      description: 'The password visitors enter to unlock your case studies. Change this any time.',
    }),
  ],
})
