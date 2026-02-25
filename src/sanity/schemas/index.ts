// src/sanity/schemas/index.ts — Collects and exports all schema types.
//
// Add any new schemas here to register them in the Studio.

import { projectSchema } from './project'
import { siteSettingsSchema } from './siteSettings'

// All content schemas — order here controls the Studio's "Create new" menu
export const schemas = [projectSchema, siteSettingsSchema]
