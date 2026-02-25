// sanity.config.ts — Root configuration for the Sanity Studio.
//
// This file is loaded when you visit /studio in the browser.
// It defines what the editor looks like: which document types exist,
// how the sidebar is structured, and where the studio is hosted.

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './src/sanity/schemas'

export default defineConfig({
  // Sanity project credentials — pulled from environment variables
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // The URL path where the Studio UI is served inside the Next.js app
  basePath: '/studio',

  plugins: [
    structureTool({
      // Custom sidebar structure — puts Site Settings at the top as a singleton,
      // then lists all projects below it.
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: one Site Settings document, always the same one
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings') // fixed ID = always the same doc
              ),

            S.divider(),

            // List of all project documents
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),

  ],

  // Register all content schemas defined in src/sanity/schemas/
  schema: { types: schemas },
})
