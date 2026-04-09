interface QA {
  keywords: string[]
  answer: string
}

const QAS: QA[] = [
  {
    keywords: ['bonjour', 'salut', 'hello', 'hi', 'coucou', 'hey'],
    answer: "Salut ! Je suis le cerveau de J.Krebs 🧠 Pose-moi des questions sur ses compétences, projets ou expériences.",
  },
  {
    keywords: ['stack', 'techno', 'technologie', 'utilise', 'développe', 'code', 'outil'],
    answer: "Le stack de J.Krebs : TypeScript + React/Next.js côté frontend, Node.js/NestJS + PostgreSQL côté backend, et Python/TensorFlow pour l'IA. Et bien sûr Three.js pour les interfaces 3D !",
  },
  {
    keywords: ['projet', 'réalisation', 'portfolio', 'créé', 'construit', 'travaux'],
    answer: "3 projets majeurs : supportHelper v2 (plateforme B2B de tickets avec IA), EduFeed (TikTok éducatif avec cartes IA), et ce Neural Portfolio (que tu explores en ce moment !).",
  },
  {
    keywords: ['expérience', 'alternance', 'entreprise', 'travail', 'job', 'emploi', 'poste'],
    answer: "J.Krebs est en alternance comme Développeur Fullstack depuis 2024. Il travaille sur une plateforme de community building avec Angular, C#, TypeScript et PostgreSQL, et intègre des outils agentiques.",
  },
  {
    keywords: ['formation', 'étude', 'diplôme', 'école', 'master', 'université', 'cursus'],
    answer: "Master IA & Big Data (2023-2025). Spécialisation en Machine Learning, Deep Learning, NLP et traitement de données massives.",
  },
  {
    keywords: ['compétence', 'skill', 'maîtrise', 'niveau', 'sait', 'capable', 'force'],
    answer: "Points forts : TypeScript (95%), Next.js (90%), NestJS (85%), Python (80%), Machine Learning (75%). Passionné par les interfaces innovantes et l'IA appliquée.",
  },
  {
    keywords: ['ia', 'intelligence artificielle', 'machine learning', 'ml', 'deep learning', 'nlp'],
    answer: "J.Krebs est spécialisé en IA : Machine Learning avec scikit-learn, Deep Learning avec TensorFlow/Keras, NLP, et pgvector pour la recherche sémantique. Son master IA & Big Data valide cette expertise.",
  },
  {
    keywords: ['contact', 'joindre', 'email', 'mail', 'recrute', 'embauche', 'disponible'],
    answer: "Pour contacter J.Krebs : clique sur les neurones roses (Contact) dans le réseau. Tu trouveras GitHub, LinkedIn, Email et son CV à télécharger.",
  },
  {
    keywords: ['github', 'open source', 'code source', 'dépôt', 'repo'],
    answer: "Le GitHub de J.Krebs : github.com/KJ-devs — tu y trouveras supportHelper v2 et d'autres projets. Ce portfolio est aussi open source !",
  },
  {
    keywords: ['ce site', 'portfolio', 'comment', 'fait', 'construit', 'three', 'three.js', '3d'],
    answer: "Ce Neural Portfolio est fait avec Next.js 15, React Three Fiber + Three.js pour le rendu 3D, GSAP pour les animations, d3-force-3d pour le layout du réseau, et Tailwind CSS pour l'UI. 100% TypeScript !",
  },
  {
    keywords: ['âge', 'ans', 'né', 'nationalité', 'localisation', 'paris', 'france', 'où'],
    answer: "J.Krebs est un développeur basé en France, actuellement en Master IA & Big Data tout en travaillant en alternance. Disponible pour de nouvelles opportunités en 2025 !",
  },
  {
    keywords: ['objectif', 'futur', 'ambition', 'après', 'plan', 'suite', 'cherche'],
    answer: "Après son Master (2025), J.Krebs cherche un poste de Développeur Fullstack ou Ingénieur IA dans une entreprise innovante. Il adore les projets qui mêlent belle UI et IA.",
  },
]

const FALLBACK = "Hmm, je ne capte pas bien... Essaie de me demander : stack, projets, expérience, formation, compétences, IA, contact, GitHub..."

export function getResponse(input: string): string {
  const q = input.toLowerCase().trim()
  if (!q) return FALLBACK

  for (const qa of QAS) {
    if (qa.keywords.some((kw) => q.includes(kw))) {
      return qa.answer
    }
  }
  return FALLBACK
}
