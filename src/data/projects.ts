import type { Project } from '@/types/portfolio'

export const PROJECTS: Project[] = [
  {
    id: 'supporthelper',
    title: 'supportHelper v2',
    description:
      "Plateforme B2B de gestion de tickets support avec analyse IA et génération automatique de bug reports visuels + issues GitHub",
    stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'pgvector', 'Turborepo'],
    highlights: [
      "Multi-agent Forge system pour l'analyse automatisée",
      'AI-powered analysis des tickets de support',
      'Auto GitHub issue generation depuis les bugs détectés',
    ],
    links: { github: 'https://github.com/KJ-devs/supportHelperv2' },
  },
  {
    id: 'tiktok-edu',
    title: 'EduFeed',
    description:
      'Application de feed éducatif vertical style TikTok avec cartes de concepts générées par IA',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI APIs'],
    highlights: [
      'AI-powered concept cards générées dynamiquement',
      'Infinite scroll optimisé',
      'Apprentissage personnalisé',
    ],
    links: { github: '#' },
  },
  {
    id: 'neural-portfolio',
    title: 'Neural Portfolio',
    description: 'Portfolio interactif en réseau de neurones 3D navigable — ce site',
    stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind CSS', 'React Three Fiber'],
    highlights: [
      'Réseau de neurones 3D entièrement navigable',
      'Animations GSAP pour les transitions caméra',
      'Système de particules sur les synapses',
    ],
    links: { github: '#', live: '#' },
  },
]

export const PROJECTS_BY_ID: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p])
)
