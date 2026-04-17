import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const BASE_URL = 'https://neural-portfolio.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Neural Portfolio — J.Krebs',
  description:
    "Développeur Fullstack passionné par l'IA. Explore mon parcours, compétences et projets à travers un réseau de neurones 3D interactif.",
  authors: [{ name: 'J.Krebs' }],
  keywords: [
    'Portfolio',
    'Développeur Fullstack',
    'React',
    'TypeScript',
    'Next.js',
    'Intelligence Artificielle',
    'Big Data',
    'Three.js',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    title: 'Neural Portfolio — J.Krebs',
    description:
      'Portfolio interactif en réseau de neurones 3D navigable. Développeur Fullstack · Master IA & Big Data.',
    siteName: 'Neural Portfolio',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Neural Portfolio — Réseau de Neurones 3D Interactif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Portfolio — J.Krebs',
    description:
      'Portfolio interactif en réseau de neurones 3D. Développeur Fullstack · Master IA & Big Data.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'J.Krebs',
  jobTitle: 'Développeur Fullstack',
  description: 'Développeur Fullstack en alternance — Master IA & Big Data',
  url: BASE_URL,
  sameAs: ['https://github.com/KJ-devs'],
  knowsAbout: [
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'NestJS',
    'Python',
    'Machine Learning',
    'Big Data',
    'PostgreSQL',
    'Docker',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
