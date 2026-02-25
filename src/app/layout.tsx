import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import { PasswordProvider } from '@/components/PasswordProvider'
import { getCachedSiteSettings } from '@/sanity/queries'
import './globals.css'

// DM Sans — clean, modern sans-serif for body text and UI elements
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// DM Serif Display — elegant serif for large headings, adds typographic character
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
  display: 'swap',
})

// Metadata shown in browser tab and social sharing previews
export const metadata: Metadata = {
  title: 'Curtis Calhoun — Senior Product Designer',
  description:
    'Portfolio of Curtis Calhoun, a Senior Product Designer with a background in design leadership. Specializing in enterprise UX, streaming TV, and mobile.',
  openGraph: {
    title: 'Curtis Calhoun — Senior Product Designer',
    description:
      'Designing products people love. Leading teams that build them.',
    url: 'https://curtiscalhoun.com',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch site settings to get the current portfolio password from Sanity.
  // This runs server-side — the password is never exposed in client-side JS bundles.
  // React.cache() in getCachedSiteSettings deduplicates this request if
  // other server components also need settings in the same render pass.
  const settings = await getCachedSiteSettings()
  const password = settings?.portfolioPassword ?? 'portfolio2024'

  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      {/* PasswordProvider wraps the whole app so any component can check lock state.
          The password prop comes from Sanity — change it in the Studio any time. */}
      <body>
        <PasswordProvider password={password}>
          {children}
        </PasswordProvider>
      </body>
    </html>
  )
}
