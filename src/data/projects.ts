import type { Project } from '@/types/portfolio'

export const PROJECTS: Project[] = [
  {
    id: 'hiking',
    title: 'HikingProject',
    description:
      'Application de réseau social dédié à la randonnée — partage de trails, profils de randonneurs et communauté outdoor',
    stack: ['JavaScript', 'HTML/CSS', 'Node.js'],
    highlights: [
      'Feed social de trails avec géolocalisation',
      'Profils randonneurs avec statistiques',
      'Communauté et système de partage',
    ],
    links: { github: 'https://github.com/KJ-devs/HikingProject' },
  },
  {
    id: 'travelbuddy',
    title: 'TravelBuddy',
    description:
      'Application Python de planification de voyages — itinéraires intelligents, suggestions de destinations et gestion de budget',
    stack: ['Python', 'API REST', 'IoT'],
    highlights: [
      'Génération automatique d\'itinéraires',
      'Suggestions de destinations personnalisées',
      'Gestion de budget voyage',
    ],
    links: { github: 'https://github.com/KJ-devs/travelbuddy' },
  },
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
    media: [
      { type: 'image', src: '/images/projects/supporthelper/dashboard.svg', alt: 'Dashboard principal supportHelper', caption: 'Dashboard de gestion des tickets' },
      { type: 'image', src: '/images/projects/supporthelper/ticket-detail.svg', alt: 'Détail ticket avec analyse IA', caption: 'Analyse IA automatique des tickets' },
      { type: 'image', src: '/images/projects/supporthelper/github-integration.svg', alt: 'Intégration GitHub automatique', caption: 'Génération auto d\'issues GitHub' },
      { type: 'video', src: '/images/projects/supporthelper/demo.mp4', thumbnail: '/images/projects/supporthelper/demo-thumb.svg', alt: 'Démo supportHelper v2', caption: 'Démo du workflow complet' },
    ],
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
    media: [
      { type: 'image', src: '/images/projects/tiktok-edu/feed.svg', alt: 'Feed éducatif vertical', caption: 'Feed vertical style TikTok' },
      { type: 'image', src: '/images/projects/tiktok-edu/concept-card.svg', alt: 'Carte de concept IA', caption: 'Cartes générées par IA' },
      { type: 'image', src: '/images/projects/tiktok-edu/learning-path.svg', alt: 'Parcours personnalisé', caption: 'Apprentissage personnalisé' },
    ],
  },
  {
    id: 'nlp-pathfinding',
    title: 'NLP Pathfinding',
    description:
      'Application de recommandation de trajets ferroviaires SNCF pilotée par le NLP — traitement du langage naturel pour la recherche d\'itinéraires',
    stack: ['Python', 'NLP', 'SNCF GTFS', 'Machine Learning'],
    highlights: [
      'Recommandation de trajets par NLP',
      'Données SNCF Open Data (GTFS)',
      'Pipeline IA de bout en bout',
    ],
    links: { github: 'https://github.com/KJ-devs/nlp-driven-pathfinding' },
    media: [
      { type: 'image', src: '/images/projects/nlp-pathfinding/screenshot-1.png', alt: 'Interface NLP Pathfinding', caption: 'Recommandation de trajets' },
      { type: 'image', src: '/images/projects/nlp-pathfinding/screenshot-2.png', alt: 'Résultats de recherche', caption: 'Résultats de trajets optimisés' },
    ],
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
    links: { github: 'https://github.com/KJ-devs/pneumonia_detection_AI' },
    media: [
      { type: 'image', src: '/images/projects/pneumonia-detection/screenshot-1.png', alt: 'Analyse radiographie thoracique', caption: 'Détection de pneumonie par IA' },
      { type: 'image', src: '/images/projects/pneumonia-detection/screenshot-2.png', alt: 'Résultats du modèle', caption: 'Métriques de performance du modèle' },
    ],
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
    media: [
      { type: 'image', src: '/images/projects/neural-portfolio/network-view.svg', alt: 'Vue réseau de neurones 3D', caption: 'Réseau de neurones navigable' },
      { type: 'image', src: '/images/projects/neural-portfolio/panel-detail.svg', alt: 'Panel de détail projet', caption: 'Panels d\'information interactifs' },
      { type: 'image', src: '/images/projects/neural-portfolio/particles.svg', alt: 'Système de particules', caption: 'Impulsions neuronales animées' },
    ],
  },
]

export const PROJECTS_BY_ID: Record<string, Project> = Object.fromEntries(
  PROJECTS.map((p) => [p.id, p])
)
