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
