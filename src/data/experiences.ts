import type { Experience } from '@/types/portfolio'

export const EXPERIENCES: Experience[] = [
  {
    id: 'alternance',
    title: 'Alternance Développeur Fullstack',
    period: '2024 - Present',
    description:
      "Développeur fullstack en alternance — conception et développement d'applications web métier",
    skills: ['React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Git', 'Docker'],
  },
  {
    id: 'master-ia',
    title: 'Master IA / Big Data',
    period: '2024 - Present',
    description:
      'Master spécialisé Intelligence Artificielle et Big Data — apprentissage automatique, NLP, traitement de données massives',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Big Data', 'NLP'],
  },
  {
    id: 'licence-ecommerce',
    title: 'Licence Développement Web & Mobile dans le E-commerce',
    period: '2022 - 2023',
    description:
      'Licence professionnelle spécialisée dans le développement web, mobile et les technologies du e-commerce',
    skills: ['React', 'Node.js', 'TypeScript', 'REST API', 'Git'],
  },
]

export const EXPERIENCES_BY_ID: Record<string, Experience> = Object.fromEntries(
  EXPERIENCES.map((e) => [e.id, e])
)
