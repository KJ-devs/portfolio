import { CATEGORY_COLORS } from '@/lib/constants'
import type { NeuronData } from '@/types/neuron'

export const NEURONS: NeuronData[] = [
  // ═══════════════════════════════════════════
  // CORE
  // ═══════════════════════════════════════════
  {
    id: 'me',
    label: 'J.Krebs',
    category: 'core',
    description: 'Développeur Fullstack - Master IA & Big Data',
    size: 2.0,
    color: CATEGORY_COLORS.core,
    metadata: {
      type: 'core',
      bio: "Développeur Fullstack passionné par les interfaces innovantes et l'IA. Master IA & Big Data en alternance.",
      title: 'Développeur Fullstack — Master IA & Big Data',
    },
  },

  // ═══════════════════════════════════════════
  // SKILLS — Frontend
  // ═══════════════════════════════════════════
  {
    id: 'react',
    label: 'React',
    category: 'skill',
    description: 'Bibliothèque UI pour interfaces réactives',
    size: 1.4,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 88, domain: 'frontend' },
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    category: 'skill',
    description: 'Framework React full-stack avec App Router',
    size: 1.5,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 90, domain: 'frontend' },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'skill',
    description: 'JavaScript typé pour des apps robustes',
    size: 1.6,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 92, domain: 'frontend' },
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    category: 'skill',
    description: 'Framework CSS utility-first',
    size: 1.2,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 85, domain: 'frontend' },
  },
  {
    id: 'threejs',
    label: 'Three.js',
    category: 'skill',
    description: 'Rendu 3D WebGL pour le navigateur',
    size: 1.0,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 75, domain: 'frontend' },
  },
  {
    id: 'gsap',
    label: 'GSAP',
    category: 'skill',
    description: 'Animations performantes et précises',
    size: 1.0,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 78, domain: 'frontend' },
  },
  {
    id: 'angular',
    label: 'Angular',
    category: 'skill',
    description: 'Framework frontend structuré par Google',
    size: 1.3,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 80, domain: 'frontend' },
  },

  // ═══════════════════════════════════════════
  // SKILLS — Backend
  // ═══════════════════════════════════════════
  {
    id: 'nodejs',
    label: 'Node.js',
    category: 'skill',
    description: 'Runtime JavaScript côté serveur',
    size: 1.3,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 85, domain: 'backend' },
  },
  {
    id: 'nestjs',
    label: 'NestJS',
    category: 'skill',
    description: 'Framework Node.js structuré et scalable',
    size: 1.3,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 82, domain: 'backend' },
  },
  {
    id: 'csharp',
    label: 'C#',
    category: 'skill',
    description: 'Langage orienté objet pour le développement .NET',
    size: 1.2,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 78, domain: 'backend' },
  },
  {
    id: 'python',
    label: 'Python',
    category: 'skill',
    description: 'Langage polyvalent pour IA et scripting',
    size: 1.4,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 80, domain: 'backend' },
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    category: 'skill',
    description: 'Base de données relationnelle puissante',
    size: 1.2,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 78, domain: 'backend' },
  },
  {
    id: 'rest-api',
    label: 'REST API',
    category: 'skill',
    description: "Conception et consommation d'APIs REST",
    size: 1.1,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 88, domain: 'backend' },
  },

  // ═══════════════════════════════════════════
  // SKILLS — IA / Data
  // ═══════════════════════════════════════════
  {
    id: 'machine-learning',
    label: 'Machine Learning',
    category: 'skill',
    description: 'Apprentissage automatique et modèles prédictifs',
    size: 1.3,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 75, domain: 'ai' },
  },
  {
    id: 'tensorflow',
    label: 'TensorFlow',
    category: 'skill',
    description: 'Framework deep learning de Google',
    size: 1.0,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 65, domain: 'ai' },
  },
  {
    id: 'big-data',
    label: 'Big Data',
    category: 'skill',
    description: 'Traitement et analyse de données massives',
    size: 1.1,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 72, domain: 'ai' },
  },
  {
    id: 'nlp',
    label: 'NLP',
    category: 'skill',
    description: 'Traitement du langage naturel',
    size: 1.0,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 70, domain: 'ai' },
  },
  {
    id: 'pgvector',
    label: 'pgvector',
    category: 'skill',
    description: 'Extension PostgreSQL pour embeddings vectoriels',
    size: 0.8,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 65, domain: 'ai' },
  },

  // ═══════════════════════════════════════════
  // SKILLS — DevOps / Outils
  // ═══════════════════════════════════════════
  {
    id: 'git',
    label: 'Git',
    category: 'skill',
    description: 'Contrôle de version et collaboration',
    size: 1.3,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 90, domain: 'devops' },
  },
  {
    id: 'docker',
    label: 'Docker',
    category: 'skill',
    description: "Conteneurisation d'applications",
    size: 1.1,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 75, domain: 'devops' },
  },
  {
    id: 'ci-cd',
    label: 'CI/CD',
    category: 'skill',
    description: 'Intégration et déploiement continus',
    size: 1.0,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 72, domain: 'devops' },
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    category: 'skill',
    description: 'Développement assisté par IA avec Claude',
    size: 0.9,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 85, domain: 'devops' },
  },
  {
    id: 'turborepo',
    label: 'Turborepo',
    category: 'skill',
    description: 'Monorepo build system haute performance',
    size: 0.8,
    color: CATEGORY_COLORS.skill,
    metadata: { type: 'skill', level: 68, domain: 'devops' },
  },

  // ═══════════════════════════════════════════
  // PROJECTS
  // ═══════════════════════════════════════════
  {
    id: 'supporthelper',
    label: 'supportHelper v2',
    category: 'project',
    description:
      'Plateforme B2B de gestion de tickets support avec analyse IA et génération automatique de bug reports visuels + issues GitHub',
    size: 1.6,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'pgvector', 'Turborepo'],
      highlights: [
        'Multi-agent Forge system',
        'AI-powered analysis',
        'Auto GitHub issue generation',
      ],
      links: {},
      media: [
        { type: 'image', src: '/images/projects/supporthelper/dashboard.png', alt: 'Dashboard principal supportHelper', caption: 'Dashboard de gestion des tickets avec filtres' },
        { type: 'image', src: '/images/projects/supporthelper/ai-analysis.png', alt: 'Détail ticket avec analyse IA', caption: 'Analyse IA automatique des tickets' },
        { type: 'image', src: '/images/projects/supporthelper/applications.png', alt: 'Gestion multi-applications', caption: 'Plateforme multi-applications B2B' },
        { type: 'image', src: '/images/projects/supporthelper/integrations.png', alt: 'Intégrations tierces', caption: 'Intégrations Slack, Discord, Notion, Jira' },
        { type: 'image', src: '/images/projects/supporthelper/github-integration.png', alt: 'Intégration GitHub connectée', caption: 'Connexion GitHub pour la sync automatique' },
        { type: 'image', src: '/images/projects/supporthelper/ai-config.png', alt: 'Configuration IA multi-providers', caption: 'BYOK — Choix du provider IA (OpenAI, Anthropic, Gemini...)' },
      ],
    },
  },
  {
    id: 'tiktok-edu',
    label: 'EduFeed',
    category: 'project',
    description:
      'Application de feed éducatif vertical style TikTok avec cartes de concepts générées par IA',
    size: 1.3,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI APIs'],
      highlights: [
        'AI-powered concept cards',
        'Infinite scroll',
        'Personalized learning',
      ],
      links: {},
      media: [
        { type: 'image', src: '/images/projects/tiktok-edu/feed.svg', alt: 'Feed éducatif vertical', caption: 'Feed vertical style TikTok' },
        { type: 'image', src: '/images/projects/tiktok-edu/concept-card.svg', alt: 'Carte de concept IA', caption: 'Cartes générées par IA' },
        { type: 'image', src: '/images/projects/tiktok-edu/learning-path.svg', alt: 'Parcours personnalisé', caption: 'Apprentissage personnalisé' },
      ],
    },
  },
  {
    id: 'dofus-forge',
    label: 'DofusForge',
    category: 'project',
    description: 'Outil communautaire de création de stuff Dofus — simulateur d\'équipement',
    size: 1.2,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
      highlights: [
        'Simulateur d\'équipement complet',
        'Calcul de stats en temps réel',
        'Communauté et profils',
      ],
      links: {},
      media: [
        { type: 'image', src: '/images/projects/dofus-forge/landing.png', alt: 'Page d\'accueil DofusForge', caption: 'Forgez votre Légende — Landing page' },
        { type: 'image', src: '/images/projects/dofus-forge/stuff-builder.png', alt: 'Simulateur d\'équipement', caption: 'Stuff builder avec stats en temps réel' },
        { type: 'image', src: '/images/projects/dofus-forge/equipment-list.png', alt: 'Liste des équipements', caption: 'Sélection d\'équipements avec filtres' },
      ],
    },
  },
  {
    id: 'neural-portfolio',
    label: 'Neural Portfolio',
    category: 'project',
    description: 'Portfolio interactif en réseau de neurones 3D navigable',
    size: 1.2,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Tailwind CSS'],
      highlights: [
        'Réseau de neurones 3D navigable',
        'Animations GSAP',
        'React Three Fiber',
      ],
      links: {},
    },
  },

  {
    id: 'nlp-pathfinding',
    label: 'NLP Pathfinding',
    category: 'project',
    description:
      'Application de recommandation de trajets ferroviaires SNCF pilotée par le NLP',
    size: 1.3,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['Python', 'NLP', 'SNCF GTFS', 'Machine Learning'],
      highlights: [
        'Recommandation de trajets par NLP',
        'Données SNCF Open Data (GTFS)',
        'Pipeline IA de bout en bout',
      ],
      links: {},
      media: [
        { type: 'image', src: '/images/projects/nlp-pathfinding/screenshot-1.png', alt: 'Interface NLP Pathfinding', caption: 'Recommandation de trajets' },
        { type: 'image', src: '/images/projects/nlp-pathfinding/screenshot-2.png', alt: 'Résultats de recherche', caption: 'Résultats de trajets optimisés' },
      ],
    },
  },
  {
    id: 'pneumonia-detection',
    label: 'Pneumonia Detection',
    category: 'project',
    description:
      'Système de diagnostic de pneumonie par radiographie thoracique avec deep learning',
    size: 1.3,
    color: CATEGORY_COLORS.project,
    metadata: {
      type: 'project',
      stack: ['Python', 'TensorFlow', 'OpenCV', 'scikit-learn'],
      highlights: [
        'Classification binaire et multi-classes (viral/bactérien)',
        'Transfer learning (VGG16, ResNet50, MobileNetV2)',
        'Class Activation Maps pour interprétabilité',
      ],
      links: {},
      media: [
        { type: 'image', src: '/images/projects/pneumonia-detection/screenshot-1.png', alt: 'Analyse radiographie thoracique', caption: 'Détection de pneumonie par IA' },
        { type: 'image', src: '/images/projects/pneumonia-detection/screenshot-2.png', alt: 'Résultats du modèle', caption: 'Métriques de performance du modèle' },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // EXPERIENCES
  // ═══════════════════════════════════════════
  {
    id: 'alternance',
    label: 'Alternance Fullstack',
    category: 'experience',
    description:
      "Développeur fullstack en alternance — plateforme de community building & intégration outils agentiques",
    size: 1.4,
    color: CATEGORY_COLORS.experience,
    metadata: {
      type: 'experience',
      period: '2024 - Present',
      skills: ['Angular', 'C#', 'TypeScript', 'PostgreSQL', 'Git', 'Docker', 'Intégration agentique'],
    },
  },
  {
    id: 'master-ia',
    label: 'Master IA / Big Data',
    category: 'experience',
    description: 'Master spécialisé Intelligence Artificielle et Big Data',
    size: 1.3,
    color: CATEGORY_COLORS.experience,
    metadata: {
      type: 'experience',
      period: '2023 - 2025',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'Big Data', 'NLP'],
    },
  },
  {
    id: 'licence-ecommerce',
    label: 'Licence Dev Web & Mobile E-commerce',
    category: 'experience',
    description: 'Licence professionnelle Développement Web & Mobile dans le E-commerce',
    size: 1.2,
    color: CATEGORY_COLORS.experience,
    metadata: {
      type: 'experience',
      period: '2022 - 2023',
      skills: ['React', 'Node.js', 'TypeScript', 'REST API', 'Git'],
    },
  },

  // ═══════════════════════════════════════════
  // CONTACTS
  // ═══════════════════════════════════════════
  {
    id: 'github',
    label: 'GitHub',
    category: 'contact',
    description: 'Voir mes projets open source',
    size: 0.8,
    color: CATEGORY_COLORS.contact,
    metadata: {
      type: 'contact',
      link: 'https://github.com/KJ-devs',
      action: 'url',
    },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    category: 'contact',
    description: 'Mon profil professionnel',
    size: 0.8,
    color: CATEGORY_COLORS.contact,
    metadata: {
      type: 'contact',
      link: 'https://www.linkedin.com/in/jeremie-krebs/',
      action: 'url',
    },
  },
  {
    id: 'email',
    label: 'Email',
    category: 'contact',
    description: 'Me contacter par email',
    size: 0.8,
    color: CATEGORY_COLORS.contact,
    metadata: {
      type: 'contact',
      link: 'mailto:jeremiekrebs9@gmail.com',
      action: 'mailto',
    },
  },
  {
    id: 'cv',
    label: 'Télécharger CV',
    category: 'contact',
    description: 'Télécharger mon CV en PDF',
    size: 0.8,
    color: CATEGORY_COLORS.contact,
    metadata: {
      type: 'contact',
      link: '/cv.pdf',
      action: 'url',
    },
  },

  // ═══════════════════════════════════════════
  // EASTER EGG — hidden brain neuron
  // ═══════════════════════════════════════════
  {
    id: 'brain',
    label: '?',
    category: 'core',
    description: 'Pose-moi une question...',
    size: 0.5,
    color: '#F5A623',
    metadata: {
      type: 'core',
      bio: 'Easter egg — Ask my brain!',
      title: 'Ask my brain',
    },
  },
]

export const NEURONS_BY_ID: Record<string, NeuronData> = Object.fromEntries(
  NEURONS.map((n) => [n.id, n])
)
