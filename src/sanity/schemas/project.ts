// src/sanity/schemas/project.ts — Defines the shape of a Project in Sanity Studio.
//
// Each field here becomes an editable field in the Studio UI.
// Fields are organized into three groups (tabs) to keep the editor clean:
//   Basics     — the info shown on project cards
//   Case Study — the long-form content for the detail page
//   Image      — the project thumbnail

import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

  // Groups create tabs in the Studio editor — less overwhelming than one long form
  groups: [
    { name: 'basics',    title: 'Basics',      default: true },
    { name: 'caseStudy', title: 'Case Study' },
    { name: 'media',     title: 'Image' },
  ],

  fields: [
    // ── Basics tab ───────────────────────────────────────────────

    defineField({
      name: 'id',
      title: 'URL Slug',
      type: 'slug',
      group: 'basics',
      description: 'Used in the URL: curtiscalhoun.com/work/this-value. Auto-generated from title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'client',
      title: 'Client / Company',
      type: 'string',
      group: 'basics',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      group: 'basics',
      description: '1–2 sentences shown on the project card.',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'tags',
      title: 'Discipline Tags',
      type: 'array',
      group: 'basics',
      description: 'e.g. Enterprise UX, User Research, Mobile',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'basics',
    }),

    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      group: 'basics',
      description: 'Show this project in the Featured Work section on the homepage. Keep to 3 max.',
      initialValue: false,
    }),

    defineField({
      name: 'protected',
      title: 'Password Protected',
      type: 'boolean',
      group: 'basics',
      description: 'When on, visitors must enter the portfolio password to view this project. Turn off to make it fully public.',
      initialValue: true,
    }),

    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      group: 'basics',
      description: 'e.g. Lead UX Designer',
    }),

    // ── Image tab ────────────────────────────────────────────────

    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      group: 'media',
      description: 'Upload a square-ish thumbnail image (~740×740px ideal).',
      options: {
        // hotspot lets you pick the focal point when the image is cropped
        hotspot: true,
      },
      fields: [
        // The alt text is stored inside the image object
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers and SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── Case Study tab ───────────────────────────────────────────
    // These four fields use Portable Text (rich text).
    // That means you get bold, bullets, and paragraph breaks in the Studio.

    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'array',
      group: 'caseStudy',
      description: 'The main body text shown at the top of the case study page.',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      group: 'caseStudy',
      description: 'The problem you were brought in to solve.',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'process',
      title: 'My Process',
      type: 'array',
      group: 'caseStudy',
      description: 'How you approached the problem.',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'array',
      group: 'caseStudy',
      description: 'Results, impact, what shipped.',
      of: [{ type: 'block' }],
    }),
  ],

  // Controls how each project appears in the Studio sidebar list
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'image',
    },
  },
})
