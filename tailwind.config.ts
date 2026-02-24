import type { Config } from 'tailwindcss'

const config: Config = {
  // Tell Tailwind where to look for class names so unused styles get removed in production
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom font families loaded in layout.tsx via next/font
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
      // Color tokens — update these to change the whole site palette
      colors: {
        background: '#fafaf8',   // warm off-white, used on light sections
        foreground: '#0f0f0e',   // near-black for body text
        muted: '#8a8a85',        // secondary/caption text
        border: '#e8e8e4',       // subtle dividers
        dark: '#111110',         // hero/footer background
      },
      // Smooth, purposeful animation durations
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      // Letter spacing for display text
      letterSpacing: {
        'display': '-0.03em',
      },
    },
  },
  plugins: [],
}

export default config
