// NavWrapper — server component that fetches the brand name and passes it to Nav.
//
// Nav is a client component (it needs scroll listeners), so it can't fetch data
// directly. This wrapper fetches site settings on the server and passes the
// brand name down as a prop.
//
// Use <NavWrapper /> anywhere you'd use <Nav /> — same visual result,
// but the name comes from the Sanity Studio instead of hardcoded text.

import { getCachedSiteSettings } from '@/sanity/queries'
import { Nav } from './Nav'

export async function NavWrapper() {
  const settings = await getCachedSiteSettings()

  return (
    <Nav brandName={settings?.brandName ?? 'Curtis Calhoun'} />
  )
}
