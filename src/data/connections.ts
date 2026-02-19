import type { ConnectionData } from '@/types/connection'

export const CONNECTIONS: ConnectionData[] = [
  // ═══════════════════════════════════════════
  // Core → tout
  // ═══════════════════════════════════════════
  { source: 'me', target: 'react',            strength: 0.9 },
  { source: 'me', target: 'nextjs',           strength: 0.95 },
  { source: 'me', target: 'typescript',       strength: 0.95 },
  { source: 'me', target: 'nodejs',           strength: 0.85 },
  { source: 'me', target: 'nestjs',           strength: 0.85 },
  { source: 'me', target: 'python',           strength: 0.8 },
  { source: 'me', target: 'machine-learning', strength: 0.75 },
  { source: 'me', target: 'git',              strength: 0.9 },
  { source: 'me', target: 'supporthelper',    strength: 1.0 },
  { source: 'me', target: 'tiktok-edu',       strength: 0.9 },
  { source: 'me', target: 'neural-portfolio', strength: 0.9 },
  { source: 'me', target: 'alternance',       strength: 0.95 },
  { source: 'me', target: 'master-ia',        strength: 0.9 },
  { source: 'me', target: 'github',           strength: 0.8 },
  { source: 'me', target: 'linkedin',         strength: 0.8 },
  { source: 'me', target: 'email',            strength: 0.8 },
  { source: 'me', target: 'cv',               strength: 0.8 },

  // ═══════════════════════════════════════════
  // supportHelper v2
  // ═══════════════════════════════════════════
  { source: 'supporthelper', target: 'typescript',      strength: 0.9 },
  { source: 'supporthelper', target: 'nestjs',          strength: 0.9 },
  { source: 'supporthelper', target: 'nextjs',          strength: 0.85 },
  { source: 'supporthelper', target: 'postgresql',      strength: 0.8 },
  { source: 'supporthelper', target: 'pgvector',        strength: 0.85 },
  { source: 'supporthelper', target: 'turborepo',       strength: 0.8 },
  { source: 'supporthelper', target: 'machine-learning', strength: 0.7 },

  // ═══════════════════════════════════════════
  // EduFeed
  // ═══════════════════════════════════════════
  { source: 'tiktok-edu', target: 'nextjs',           strength: 0.85 },
  { source: 'tiktok-edu', target: 'typescript',       strength: 0.85 },
  { source: 'tiktok-edu', target: 'tailwind',         strength: 0.8 },
  { source: 'tiktok-edu', target: 'machine-learning', strength: 0.7 },
  { source: 'tiktok-edu', target: 'nlp',              strength: 0.7 },

  // ═══════════════════════════════════════════
  // Neural Portfolio
  // ═══════════════════════════════════════════
  { source: 'neural-portfolio', target: 'nextjs',     strength: 0.85 },
  { source: 'neural-portfolio', target: 'threejs',    strength: 0.95 },
  { source: 'neural-portfolio', target: 'gsap',       strength: 0.9 },
  { source: 'neural-portfolio', target: 'typescript', strength: 0.85 },
  { source: 'neural-portfolio', target: 'tailwind',   strength: 0.8 },

  // ═══════════════════════════════════════════
  // Alternance
  // ═══════════════════════════════════════════
  { source: 'alternance', target: 'react',      strength: 0.85 },
  { source: 'alternance', target: 'typescript', strength: 0.85 },
  { source: 'alternance', target: 'nodejs',     strength: 0.8 },
  { source: 'alternance', target: 'nestjs',     strength: 0.8 },
  { source: 'alternance', target: 'postgresql', strength: 0.75 },
  { source: 'alternance', target: 'git',        strength: 0.9 },
  { source: 'alternance', target: 'docker',     strength: 0.7 },

  // ═══════════════════════════════════════════
  // Master IA
  // ═══════════════════════════════════════════
  { source: 'master-ia', target: 'machine-learning', strength: 0.95 },
  { source: 'master-ia', target: 'python',           strength: 0.9 },
  { source: 'master-ia', target: 'tensorflow',       strength: 0.85 },
  { source: 'master-ia', target: 'big-data',         strength: 0.9 },
  { source: 'master-ia', target: 'nlp',              strength: 0.85 },

  // ═══════════════════════════════════════════
  // Connexions inter-skills (cohérence)
  // ═══════════════════════════════════════════
  { source: 'react',      target: 'nextjs',           strength: 0.7 },
  { source: 'react',      target: 'typescript',       strength: 0.7 },
  { source: 'nextjs',     target: 'typescript',       strength: 0.75 },
  { source: 'nextjs',     target: 'tailwind',         strength: 0.6 },
  { source: 'nodejs',     target: 'nestjs',           strength: 0.7 },
  { source: 'nodejs',     target: 'rest-api',         strength: 0.7 },
  { source: 'nestjs',     target: 'rest-api',         strength: 0.7 },
  { source: 'nestjs',     target: 'postgresql',       strength: 0.65 },
  { source: 'postgresql', target: 'pgvector',         strength: 0.8 },
  { source: 'python',     target: 'machine-learning', strength: 0.75 },
  { source: 'python',     target: 'tensorflow',       strength: 0.7 },
  { source: 'machine-learning', target: 'nlp',        strength: 0.65 },
  { source: 'machine-learning', target: 'big-data',   strength: 0.65 },
  { source: 'git',        target: 'ci-cd',            strength: 0.7 },
  { source: 'docker',     target: 'ci-cd',            strength: 0.65 },
]
