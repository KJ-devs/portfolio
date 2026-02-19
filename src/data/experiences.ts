import type { Experience } from '@/types/portfolio'

export const EXPERIENCES: Experience[] = [
  {
    id: 'alternance',
    title: 'Alternance Développeur Fullstack',
    period: '2023 - Present',
    description:
      "Développeur fullstack en alternance — conception et développement d'applications web métier",
    skills: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Git', 'Docker'],
  },
  {
    id: 'master-ia',
    title: 'Master IA / Big Data',
    period: '2023 - 2025',
    description:
      'Master spécialisé Intelligence Artificielle et Big Data — apprentissage automatique, NLP, traitement de données massives',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Big Data', 'NLP'],
  },
]

export const EXPERIENCES_BY_ID: Record<string, Experience> = Object.fromEntries(
  EXPERIENCES.map((e) => [e.id, e])
)
