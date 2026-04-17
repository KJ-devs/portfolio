import type { Lang } from '@/lib/i18n'

type ChatbotIntent =
  | 'greeting'
  | 'stack'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'ai'
  | 'contact'
  | 'github'
  | 'site'
  | 'profile'
  | 'goal'

interface QA {
  keywords: string[]
  intent: ChatbotIntent
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
}

const QAS: QA[] = [
  {
    keywords: [
      'bonjour',
      'salut',
      'hello',
      'hi',
      'coucou',
      'hey',
      'hallo',
      'guten tag',
      'servus',
      'moin',
    ],
    intent: 'greeting',
  },
  {
    keywords: [
      'stack',
      'techno',
      'technologie',
      'utilise',
      'developpe',
      'développe',
      'code',
      'outil',
      'tools',
      'tech',
      'technologien',
      'werkzeuge',
    ],
    intent: 'stack',
  },
  {
    keywords: [
      'projet',
      'projets',
      'realisation',
      'réalisation',
      'portfolio',
      'cree',
      'créé',
      'travaux',
      'project',
      'projects',
      'projekt',
      'projekte',
      'arbeit',
    ],
    intent: 'projects',
  },
  {
    keywords: [
      'experience',
      'expérience',
      'alternance',
      'entreprise',
      'travail',
      'job',
      'emploi',
      'poste',
      'erfahrung',
      'ausbildung',
      'duales studium',
      'praktikum',
    ],
    intent: 'experience',
  },
  {
    keywords: [
      'formation',
      'etude',
      'étude',
      'diplome',
      'diplôme',
      'ecole',
      'école',
      'master',
      'universite',
      'université',
      'study',
      'education',
      'studium',
      'ausbildung',
      'universitaet',
      'hochschule',
    ],
    intent: 'education',
  },
  {
    keywords: [
      'competence',
      'compétence',
      'skill',
      'skills',
      'maitrise',
      'maîtrise',
      'niveau',
      'sait',
      'capable',
      'force',
      'faehigkeiten',
      'kompetenz',
      'kompetenzen',
      'kenntnisse',
    ],
    intent: 'skills',
  },
  {
    keywords: [
      'ia',
      'intelligence artificielle',
      'machine learning',
      'ml',
      'deep learning',
      'nlp',
      'ai',
      'ki',
      'kuenstliche intelligenz',
      'künstliche intelligenz',
    ],
    intent: 'ai',
  },
  {
    keywords: [
      'contact',
      'joindre',
      'email',
      'mail',
      'recrute',
      'embauche',
      'disponible',
      'linkedin',
      'kontakt',
      'erreichbar',
      'verfuegbar',
    ],
    intent: 'contact',
  },
  {
    keywords: [
      'github',
      'open source',
      'code source',
      'depot',
      'dépôt',
      'repo',
      'repository',
      'quellcode',
      'code basis',
    ],
    intent: 'github',
  },
  {
    keywords: [
      'ce site',
      'this site',
      'portfolio',
      'comment',
      'how',
      'fait',
      'construit',
      'three',
      'three.js',
      '3d',
      'built',
      'diese website',
      'wie',
      'gebaut',
    ],
    intent: 'site',
  },
  {
    keywords: [
      'age',
      'âge',
      'ans',
      'ne',
      'né',
      'nationalite',
      'nationalité',
      'localisation',
      'france',
      'ou',
      'où',
      'based',
      'alter',
      'wohnort',
      'standort',
    ],
    intent: 'profile',
  },
  {
    keywords: [
      'objectif',
      'futur',
      'ambition',
      'apres',
      'après',
      'plan',
      'suite',
      'cherche',
      'goal',
      'future',
      'ziel',
      'zukunft',
      'suche',
    ],
    intent: 'goal',
  },
]

const RESPONSES: Record<Lang, Record<ChatbotIntent, string>> = {
  fr: {
    greeting:
      'Salut ! Je suis le cerveau de J.Krebs. Pose-moi des questions sur ses compétences, ses projets ou son parcours.',
    stack:
      "Le stack de J.Krebs : TypeScript + React/Next.js côté frontend, Node.js/NestJS + PostgreSQL côté backend, et Python/TensorFlow pour l'IA. Et bien sûr Three.js pour les interfaces 3D.",
    projects:
      'Projets principaux : supportHelper v2 (plateforme B2B de tickets avec IA), EduFeed (feed éducatif avec cartes générées par IA) et ce Neural Portfolio.',
    experience:
      'J.Krebs est en alternance comme Développeur Fullstack depuis 2024. Il travaille sur une plateforme de community building et intègre des outils agentiques.',
    education:
      'Master IA & Big Data (2023-2025), avec spécialisation en Machine Learning, Deep Learning, NLP et traitement de données massives.',
    skills:
      'Points forts : TypeScript, Next.js, NestJS, Python et Machine Learning. Son atout principal : combiner UX moderne et IA appliquée.',
    ai: 'J.Krebs est spécialisé en IA : Machine Learning, Deep Learning avec TensorFlow/Keras, NLP et pgvector pour la recherche sémantique.',
    contact:
      'Pour contacter J.Krebs, clique sur les neurones roses (Contact). Tu trouveras GitHub, LinkedIn, e-mail et son CV.',
    github:
      "GitHub : github.com/KJ-devs. Tu y trouveras supportHelper v2 et d'autres projets, ainsi que ce portfolio.",
    site: 'Ce portfolio est construit avec Next.js, React Three Fiber + Three.js, GSAP, d3-force-3d et Tailwind CSS.',
    profile:
      'J.Krebs est un développeur basé en France, actuellement en Master IA & Big Data et en alternance.',
    goal: 'Après son Master, J.Krebs vise un poste de Développeur Fullstack ou d’Ingénieur IA sur des produits innovants.',
  },
  de: {
    greeting:
      'Hi! Ich bin das Gehirn von J.Krebs. Frag mich nach Skills, Projekten oder seinem Werdegang.',
    stack:
      'Tech-Stack: TypeScript + React/Next.js im Frontend, Node.js/NestJS + PostgreSQL im Backend sowie Python/TensorFlow für KI und Three.js für 3D.',
    projects:
      'Wichtige Projekte: supportHelper v2 (B2B-Ticketplattform mit KI), EduFeed (Lernfeed mit KI-Karten) und dieses Neural Portfolio.',
    experience:
      'J.Krebs ist seit 2024 als Fullstack-Entwickler im dualen Studium tätig und integriert agentische Tools in Produktworkflows.',
    education:
      'Master KI & Big Data (2023-2025), mit Fokus auf Machine Learning, Deep Learning, NLP und Big-Data-Verarbeitung.',
    skills:
      'Starke Schwerpunkte: TypeScript, Next.js, NestJS, Python und Machine Learning. Fokus auf moderne UX plus KI.',
    ai: 'Spezialisierung in KI: Machine Learning, Deep Learning mit TensorFlow/Keras, NLP und semantische Suche mit pgvector.',
    contact:
      'Kontakt: Klicke auf die rosa Kontakt-Neuronen. Dort findest du GitHub, LinkedIn, E-Mail und den Lebenslauf.',
    github:
      'GitHub: github.com/KJ-devs. Dort findest du supportHelper v2 und weitere Projekte, einschließlich dieses Portfolios.',
    site: 'Diese Website wurde mit Next.js, React Three Fiber + Three.js, GSAP, d3-force-3d und Tailwind CSS gebaut.',
    profile:
      'J.Krebs ist ein in Frankreich ansässiger Entwickler im Master KI & Big Data mit dualem Studium.',
    goal: 'Nach dem Master zielt J.Krebs auf eine Rolle als Fullstack-Entwickler oder KI-Ingenieur in innovativen Teams.',
  },
  en: {
    greeting: "Hi! I'm the brain of J.Krebs. Ask me about his skills, projects, or background.",
    stack:
      'Tech stack: TypeScript + React/Next.js on the frontend, Node.js/NestJS + PostgreSQL on the backend, plus Python/TensorFlow for AI and Three.js for 3D.',
    projects:
      'Key projects: supportHelper v2 (B2B ticket platform with AI), EduFeed (AI-powered educational feed), and this Neural Portfolio.',
    experience:
      'J.Krebs has been a Fullstack Developer apprentice since 2024, working on a community platform and integrating agentic tools.',
    education:
      'Master in AI & Big Data (2023-2025), focused on Machine Learning, Deep Learning, NLP, and large-scale data processing.',
    skills:
      'Strongest areas: TypeScript, Next.js, NestJS, Python, and Machine Learning, with a focus on modern UX and applied AI.',
    ai: 'AI specialization includes Machine Learning, Deep Learning with TensorFlow/Keras, NLP, and semantic search with pgvector.',
    contact:
      'To reach J.Krebs, click the pink contact neurons. You will find GitHub, LinkedIn, email, and his CV.',
    github:
      'GitHub: github.com/KJ-devs. You can find supportHelper v2 and other projects there, including this portfolio.',
    site: 'This portfolio is built with Next.js, React Three Fiber + Three.js, GSAP, d3-force-3d, and Tailwind CSS.',
    profile:
      'J.Krebs is a France-based developer currently in a Master AI & Big Data program and apprenticeship.',
    goal: 'After the Master, J.Krebs is targeting a Fullstack Developer or AI Engineer role in an innovative company.',
  },
}

const FALLBACK: Record<Lang, string> = {
  fr: 'Je ne capte pas bien. Essaie: stack, projets, experience, formation, competences, IA, contact, GitHub.',
  de: 'Ich habe das nicht ganz verstanden. Versuch es mit: Stack, Projekte, Erfahrung, Ausbildung, Skills, KI, Kontakt, GitHub.',
  en: "I didn't fully get that. Try asking about: stack, projects, experience, education, skills, AI, contact, GitHub.",
}

export function getResponse(input: string, lang: Lang = 'fr'): string {
  const q = normalizeText(input.trim())
  if (!q) return FALLBACK[lang]

  for (const qa of QAS) {
    if (qa.keywords.some((kw) => q.includes(normalizeText(kw)))) {
      return RESPONSES[lang][qa.intent]
    }
  }

  return FALLBACK[lang]
}
