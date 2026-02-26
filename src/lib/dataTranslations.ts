import type { Lang } from '@/lib/i18n'

export const PROJECT_DESCRIPTIONS: Record<string, Record<Lang, string>> = {
  hiking: {
    fr: 'Application de réseau social dédié à la randonnée — partage de trails, profils de randonneurs et communauté outdoor',
    de: 'Social-Network-App für Wanderer — Trail-Sharing, Wandlerprofile und Outdoor-Community',
    en: 'Social network app for hiking — trail sharing, hiker profiles and outdoor community',
  },
  travelbuddy: {
    fr: 'Application Python de planification de voyages — itinéraires intelligents, suggestions de destinations et gestion de budget',
    de: 'Python-Reiseplanungs-App — intelligente Routen, Destinationsvorschläge und Budgetverwaltung',
    en: 'Python travel planning app — smart itineraries, destination suggestions and budget management',
  },
  supporthelper: {
    fr: 'Plateforme B2B de gestion de tickets support avec analyse IA et génération automatique de bug reports visuels + issues GitHub',
    de: 'B2B-Support-Ticketplattform mit KI-Analyse und automatischer Erstellung von Bug-Reports und GitHub-Issues',
    en: 'B2B support ticket platform with AI analysis and automatic generation of visual bug reports + GitHub issues',
  },
  'tiktok-edu': {
    fr: 'Application de feed éducatif vertical style TikTok avec cartes de concepts générées par IA',
    de: 'Vertikaler Lernfeed im TikTok-Stil mit KI-generierten Konzeptkarten',
    en: 'TikTok-style vertical educational feed with AI-generated concept cards',
  },
  'neural-portfolio': {
    fr: 'Portfolio interactif en réseau de neurones 3D navigable — ce site',
    de: 'Interaktives Portfolio als navigierbares 3D-Neuronennetz — diese Website',
    en: 'Interactive portfolio as a navigable 3D neural network — this site',
  },
}

export const EXPERIENCE_DESCRIPTIONS: Record<string, Record<Lang, string>> = {
  alternance: {
    fr: "Développeur fullstack en alternance — conception et développement d'applications web métier",
    de: 'Fullstack-Entwickler im dualen Studium — Konzeption und Entwicklung von Business-Webanwendungen',
    en: 'Fullstack developer apprenticeship — design and development of business web applications',
  },
  'master-ia': {
    fr: 'Master spécialisé Intelligence Artificielle et Big Data — apprentissage automatique, NLP, traitement de données massives',
    de: 'Masterstudium KI & Big Data — Machine Learning, NLP und Verarbeitung massiver Datensätze',
    en: 'Specialized Master in Artificial Intelligence and Big Data — machine learning, NLP, large-scale data processing',
  },
  'licence-ecommerce': {
    fr: 'Licence professionnelle spécialisée dans le développement web, mobile et les technologies du e-commerce',
    de: 'Berufslizenz für Webentwicklung, Mobile und E-Commerce-Technologien',
    en: 'Professional degree in web & mobile development and e-commerce technologies',
  },
}

export const EXPERIENCE_TITLES: Record<string, Record<Lang, string>> = {
  alternance: {
    fr: 'Alternance Développeur Fullstack',
    de: 'Duales Studium Fullstack-Entwicklung',
    en: 'Fullstack Developer Apprenticeship',
  },
  'master-ia': {
    fr: 'Master IA / Big Data',
    de: 'Master KI / Big Data',
    en: 'Master AI / Big Data',
  },
  'licence-ecommerce': {
    fr: 'Licence Dev Web & Mobile E-commerce',
    de: 'Lizenz Webentwicklung & Mobile E-Commerce',
    en: 'Web & Mobile Development for E-commerce Degree',
  },
}

export const SKILL_DESCRIPTIONS: Record<string, Record<Lang, string>> = {
  react:             { fr: 'Bibliothèque UI pour interfaces réactives', de: 'UI-Bibliothek für reaktive Benutzeroberflächen', en: 'UI library for reactive interfaces' },
  nextjs:            { fr: 'Framework React full-stack avec App Router', de: 'React Full-Stack-Framework mit App Router', en: 'Full-stack React framework with App Router' },
  typescript:        { fr: 'JavaScript typé pour des apps robustes', de: 'Typisiertes JavaScript für robuste Apps', en: 'Typed JavaScript for robust apps' },
  tailwind:          { fr: 'Framework CSS utility-first', de: 'Utility-First CSS-Framework', en: 'Utility-first CSS framework' },
  threejs:           { fr: 'Rendu 3D WebGL pour le navigateur', de: '3D WebGL-Rendering im Browser', en: 'WebGL 3D rendering for the browser' },
  gsap:              { fr: 'Animations performantes et précises', de: 'Performante und präzise Animationen', en: 'High-performance precise animations' },
  nodejs:            { fr: 'Runtime JavaScript côté serveur', de: 'Serverseitige JavaScript-Laufzeitumgebung', en: 'Server-side JavaScript runtime' },
  nestjs:            { fr: 'Framework Node.js structuré et scalable', de: 'Strukturiertes und skalierbares Node.js-Framework', en: 'Structured and scalable Node.js framework' },
  python:            { fr: 'Langage polyvalent pour IA et scripting', de: 'Vielseitige Sprache für KI und Scripting', en: 'Versatile language for AI and scripting' },
  postgresql:        { fr: 'Base de données relationnelle puissante', de: 'Leistungsstarke relationale Datenbank', en: 'Powerful relational database' },
  'rest-api':        { fr: "Conception et consommation d'APIs REST", de: 'Entwurf und Nutzung von REST-APIs', en: 'Designing and consuming REST APIs' },
  'machine-learning':{ fr: 'Apprentissage automatique et modèles prédictifs', de: 'Maschinelles Lernen und Vorhersagemodelle', en: 'Machine learning and predictive models' },
  tensorflow:        { fr: 'Framework deep learning de Google', de: 'Deep-Learning-Framework von Google', en: "Google's deep learning framework" },
  'big-data':        { fr: 'Traitement et analyse de données massives', de: 'Verarbeitung und Analyse massiver Datensätze', en: 'Processing and analysis of massive datasets' },
  nlp:               { fr: 'Traitement du langage naturel', de: 'Verarbeitung natürlicher Sprache', en: 'Natural language processing' },
  pgvector:          { fr: 'Extension PostgreSQL pour embeddings vectoriels', de: 'PostgreSQL-Erweiterung für Vektor-Embeddings', en: 'PostgreSQL extension for vector embeddings' },
  git:               { fr: 'Contrôle de version et collaboration', de: 'Versionskontrolle und Zusammenarbeit', en: 'Version control and collaboration' },
  docker:            { fr: "Conteneurisation d'applications", de: 'Anwendungs-Containerisierung', en: 'Application containerization' },
  'ci-cd':           { fr: 'Intégration et déploiement continus', de: 'Kontinuierliche Integration und Bereitstellung', en: 'Continuous integration and deployment' },
  'claude-code':     { fr: 'Développement assisté par IA avec Claude', de: 'KI-gestütztes Entwickeln mit Claude', en: 'AI-assisted development with Claude' },
  turborepo:         { fr: 'Monorepo build system haute performance', de: 'Hochleistungs-Monorepo-Build-System', en: 'High-performance monorepo build system' },
}

export const CONTACT_DESCRIPTIONS: Record<string, Record<Lang, string>> = {
  github:   { fr: 'Voir mes projets open source', de: 'Meine Open-Source-Projekte ansehen', en: 'View my open source projects' },
  linkedin: { fr: 'Mon profil professionnel', de: 'Mein berufliches Profil', en: 'My professional profile' },
  email:    { fr: 'Me contacter par email', de: 'Per E-Mail kontaktieren', en: 'Contact me by email' },
  cv:       { fr: 'Télécharger mon CV en PDF', de: 'Lebenslauf als PDF herunterladen', en: 'Download my resume as PDF' },
}

export const CORE_DESCRIPTIONS: Record<string, Record<Lang, string>> = {
  me: {
    fr: "Développeur Fullstack passionné par les interfaces innovantes et l'IA. Master IA & Big Data en alternance.",
    de: 'Fullstack-Entwickler mit Leidenschaft für innovative Interfaces und KI. Master KI & Big Data im dualen Studium.',
    en: 'Fullstack Developer passionate about innovative interfaces and AI. Master AI & Big Data apprenticeship.',
  },
}

export const CORE_TITLES: Record<string, Record<Lang, string>> = {
  me: {
    fr: 'Développeur Fullstack — Master IA & Big Data',
    de: 'Fullstack-Entwickler — Master KI & Big Data',
    en: 'Fullstack Developer — Master AI & Big Data',
  },
}

export const PROJECT_HIGHLIGHTS: Record<string, Record<Lang, string[]>> = {
  'neural-portfolio': {
    fr: ['Réseau de neurones 3D navigable', 'Animations GSAP', 'React Three Fiber'],
    de: ['Navigierbares 3D-Neuronennetz', 'GSAP-Animationen', 'React Three Fiber'],
    en: ['Navigable 3D neural network', 'GSAP animations', 'React Three Fiber'],
  },
}

/** Returns the translated description for a neuron, or null if not found. */
export function getTranslatedDescription(id: string, category: string, lang: Lang): string | null {
  switch (category) {
    case 'project':    return PROJECT_DESCRIPTIONS[id]?.[lang] ?? null
    case 'experience': return EXPERIENCE_DESCRIPTIONS[id]?.[lang] ?? null
    case 'skill':      return SKILL_DESCRIPTIONS[id]?.[lang] ?? null
    case 'contact':    return CONTACT_DESCRIPTIONS[id]?.[lang] ?? null
    case 'core':       return CORE_DESCRIPTIONS[id]?.[lang] ?? null
    default:           return null
  }
}

/** Returns the translated label/title for a neuron, or null if not applicable. */
export function getTranslatedLabel(id: string, category: string, lang: Lang): string | null {
  if (category === 'experience') return EXPERIENCE_TITLES[id]?.[lang] ?? null
  if (category === 'core') return CORE_TITLES[id]?.[lang] ?? null
  return null
}

/** Returns translated highlights for a project, or null if not defined. */
export function getTranslatedHighlights(id: string, lang: Lang): string[] | null {
  return PROJECT_HIGHLIGHTS[id]?.[lang] ?? null
}
