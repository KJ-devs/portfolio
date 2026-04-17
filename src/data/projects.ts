import type { Project } from '@/types/portfolio'

export const PROJECTS: Project[] = [
  {
    id: 'supporthelper',
    title: 'supportHelper v2',
    description:
      'Plateforme B2B de gestion de tickets support avec analyse IA et génération automatique de bug reports visuels + issues GitHub',
    stack: ['TypeScript', 'NestJS', 'Next.js', 'PostgreSQL', 'pgvector', 'Turborepo'],
    highlights: [
      "Multi-agent Forge system pour l'analyse automatisée",
      'AI-powered analysis des tickets de support',
      'Auto GitHub issue generation depuis les bugs détectés',
    ],
    links: {},
    media: [
      {
        type: 'image',
        src: '/images/projects/supporthelper/dashboard.png',
        alt: 'Dashboard principal supportHelper',
        caption: 'Dashboard de gestion des tickets avec filtres',
      },
      {
        type: 'image',
        src: '/images/projects/supporthelper/ai-analysis.png',
        alt: 'Détail ticket avec analyse IA',
        caption: 'Analyse IA automatique des tickets',
      },
      {
        type: 'image',
        src: '/images/projects/supporthelper/applications.png',
        alt: 'Gestion multi-applications',
        caption: 'Plateforme multi-applications B2B',
      },
      {
        type: 'image',
        src: '/images/projects/supporthelper/integrations.png',
        alt: 'Intégrations tierces',
        caption: 'Intégrations Slack, Discord, Notion, Jira',
      },
      {
        type: 'image',
        src: '/images/projects/supporthelper/github-integration.png',
        alt: 'Intégration GitHub connectée',
        caption: 'Connexion GitHub pour la sync automatique',
      },
      {
        type: 'image',
        src: '/images/projects/supporthelper/ai-config.png',
        alt: 'Configuration IA multi-providers',
        caption: 'BYOK — Choix du provider IA (OpenAI, Anthropic, Gemini...)',
      },
    ],
  },
  {
    id: 'dofus-forge',
    title: 'DofusForge',
    description:
      "Outil communautaire de création de stuff pour Dofus — simulateur d'équipement avec calcul de statistiques",
    stack: ['Angular', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    highlights: [
      "Simulateur d'équipement complet (tous slots)",
      'Calcul de statistiques agrégées en temps réel',
      'Authentification et profils utilisateurs',
    ],
    links: {},
    media: [
      {
        type: 'image',
        src: '/images/projects/dofus-forge/landing.png',
        alt: "Page d'accueil DofusForge",
        caption: 'Forgez votre Légende — Landing page',
      },
      {
        type: 'image',
        src: '/images/projects/dofus-forge/stuff-builder.png',
        alt: "Simulateur d'équipement",
        caption: 'Stuff builder avec stats en temps réel',
      },
      {
        type: 'image',
        src: '/images/projects/dofus-forge/equipment-list.png',
        alt: 'Liste des équipements',
        caption: "Sélection d'équipements avec filtres",
      },
    ],
  },
  {
    id: 'nlp-pathfinding',
    title: 'NLP Pathfinding',
    description:
      "Application de recommandation de trajets ferroviaires SNCF pilotée par le NLP — traitement du langage naturel pour la recherche d'itinéraires",
    stack: ['Python', 'NLP', 'SNCF GTFS', 'Machine Learning'],
    highlights: [
      'Recommandation de trajets par NLP',
      'Données SNCF Open Data (GTFS)',
      'Pipeline IA de bout en bout',
    ],
    links: {},
  },
  {
    id: 'pneumonia-detection',
    title: 'Pneumonia Detection',
    description:
      'Système de diagnostic de pneumonie par radiographie thoracique avec deep learning — classification binaire et multi-classes',
    stack: ['Python', 'TensorFlow', 'OpenCV', 'scikit-learn'],
    highlights: [
      'Classification binaire et multi-classes (viral/bactérien)',
      'Transfer learning (VGG16, ResNet50, MobileNetV2)',
      'Class Activation Maps pour interprétabilité',
    ],
    links: {},
  },
  {
    id: 'focus-shield',
    title: 'Focus Shield',
    description:
      'Application de productivité qui bloque sites web et apps distrayantes pendant des sessions Pomodoro — focus garanti, analytics inclus',
    stack: ['TypeScript', 'Rust', 'Turborepo', 'pnpm'],
    highlights: [
      'Verrouillage cryptographique des sessions',
      'Analytics de productivité en temps réel',
      'Architecture monorepo TypeScript + Rust',
    ],
    links: {},
    media: [
      {
        type: 'image',
        src: '/images/projects/focus-shield/dashboard.png',
        alt: 'Dashboard Focus Shield',
        caption: 'Quick Start — Pomodoro, Deep Work, Quick Focus',
      },
      {
        type: 'image',
        src: '/images/projects/focus-shield/session.png',
        alt: 'Session Pomodoro active',
        caption: 'Timer Pomodoro avec blocage actif',
      },
      {
        type: 'image',
        src: '/images/projects/focus-shield/blocklists.png',
        alt: 'Listes de blocage',
        caption: 'Catégories de sites et apps à bloquer',
      },
      {
        type: 'image',
        src: '/images/projects/focus-shield/achievements.png',
        alt: 'Achievements',
        caption: 'Système de gamification',
      },
      {
        type: 'image',
        src: '/images/projects/focus-shield/study.png',
        alt: 'Mode étude flashcards',
        caption: 'Flashcards intégrées pour réviser',
      },
      {
        type: 'image',
        src: '/images/projects/focus-shield/settings.png',
        alt: 'Paramètres',
        caption: 'Multi-langue et extensions navigateur',
      },
    ],
  },
  {
    id: 'travelbuddy',
    title: 'TravelBuddy',
    description:
      'Application Python de planification de voyages — itinéraires intelligents, suggestions de destinations et gestion de budget',
    stack: ['Python', 'API REST', 'IoT'],
    highlights: [
      "Génération automatique d'itinéraires",
      'Suggestions de destinations personnalisées',
      'Gestion de budget voyage',
    ],
    links: {},
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
    links: {},
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
    links: {},
    wip: true,
  },
]

export const PROJECTS_BY_ID: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p])
)
