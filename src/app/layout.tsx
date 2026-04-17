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
  applicationName: 'Neural Portfolio',
  creator: 'Jérémie Krebs',
  title: 'Jérémie Krebs | Développeur Fullstack IA',
  description:
    'Portfolio de Jérémie Krebs, développeur fullstack spécialisé IA, Next.js, TypeScript et expériences web interactives.',
  authors: [{ name: 'Jérémie Krebs', url: BASE_URL }],
  keywords: [
    'Jérémie Krebs',
    'Jeremie Krebs',
    'J. Krebs',
    'Krebs',
    'J.Krebs',
    'Portfolio',
    'Développeur Fullstack',
    'Developpeur Fullstack',
    'Développeur IA',
    'React',
    'TypeScript',
    'Next.js',
    'Intelligence Artificielle',
    'Big Data',
    'Three.js',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    title: 'Jérémie Krebs | Portfolio Développeur Fullstack IA',
    description:
      'Portfolio de Jérémie Krebs, développeur fullstack orienté IA, Next.js et TypeScript.',
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
    title: 'Jérémie Krebs | Portfolio Développeur Fullstack IA',
    description:
      'Portfolio de Jérémie Krebs, développeur fullstack spécialisé IA et applications web interactives.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jérémie Krebs',
  alternateName: ['Jeremie Krebs', 'J.Krebs', 'J. Krebs'],
  jobTitle: 'Développeur Fullstack',
  description: 'Développeur Fullstack en alternance — Master IA & Big Data',
  url: BASE_URL,
  sameAs: ['https://github.com/KJ-devs', 'https://www.linkedin.com/in/jeremie-krebs/'],
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
