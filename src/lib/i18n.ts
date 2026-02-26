export type Lang = 'fr' | 'de' | 'en'

export const translations = {
  fr: {
    // Hero
    tagline: 'Développeur Fullstack · Master IA & Big Data',
    period: 'Alternance 2023 – Présent',
    cta_cv: 'CV ↓',
    cta_contact: 'Contact',
    scroll: 'Scroll',
    // Sections
    projects: 'Projets',
    stack: 'Stack',
    parcours: 'Parcours',
    contact: 'Contact',
    // Projects
    realizations: (n: number) => `${n} réalisations`,
    github_link: 'GitHub →',
    // Contact
    statement_1: 'Construisons quelque chose',
    statement_2: "d'ambitieux.",
    available: 'Disponible — alternance · CDI · freelance',
    back_neural: '← retour au réseau neural',
    built_with: 'Built with Next.js · Three.js · React Three Fiber',
    tour_cta: 'Visite guidée',
    tour_stop: 'Arrêt',
  },
  de: {
    // Hero
    tagline: 'Fullstack-Entwickler · Master KI & Big Data',
    period: 'Duales Studium 2023 – heute',
    cta_cv: 'Lebenslauf ↓',
    cta_contact: 'Kontakt',
    scroll: 'Scrollen',
    // Sections
    projects: 'Projekte',
    stack: 'Stack',
    parcours: 'Werdegang',
    contact: 'Kontakt',
    // Projects
    realizations: (n: number) => `${n} Projekte`,
    github_link: 'GitHub →',
    // Contact
    statement_1: 'Lass uns etwas',
    statement_2: 'Bedeutendes bauen.',
    available: 'Verfügbar — Ausbildung · Festanstellung · Freelance',
    back_neural: '← zurück zum neuronalen Netz',
    built_with: 'Erstellt mit Next.js · Three.js · React Three Fiber',
    tour_cta: 'Tour starten',
    tour_stop: 'Stopp',
  },
  en: {
    // Hero
    tagline: 'Fullstack Developer · Master AI & Big Data',
    period: 'Apprenticeship 2023 – Present',
    cta_cv: 'Resume ↓',
    cta_contact: 'Contact',
    scroll: 'Scroll',
    // Sections
    projects: 'Projects',
    stack: 'Stack',
    parcours: 'Experience',
    contact: 'Contact',
    // Projects
    realizations: (n: number) => `${n} projects`,
    github_link: 'GitHub →',
    // Contact
    statement_1: "Let's build something",
    statement_2: 'remarkable.',
    available: 'Available — apprenticeship · full-time · freelance',
    back_neural: '← back to neural network',
    built_with: 'Built with Next.js · Three.js · React Three Fiber',
    tour_cta: 'Give me a tour',
    tour_stop: 'Stop',
  },
} satisfies Record<Lang, Record<string, string | ((n: number) => string)>>

export type Translations = (typeof translations)['fr']
