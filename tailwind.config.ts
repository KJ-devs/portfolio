import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neural-core': '#F5E6CC',
        'neural-skill': '#00D4FF',
        'neural-project': '#A855F7',
        'neural-experience': '#10B981',
        'neural-contact': '#F472B6',
        'neural-bg': '#0A0A0F',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
    },
  },
  plugins: [],
}

export default config
