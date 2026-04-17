import type { Skill } from '@/types/portfolio'

export const SKILLS: Skill[] = [
  // Frontend
  { id: 'react',      name: 'React',        level: 88, domain: 'frontend' },
  { id: 'nextjs',     name: 'Next.js',      level: 90, domain: 'frontend' },
  { id: 'typescript', name: 'TypeScript',   level: 92, domain: 'frontend' },
  { id: 'tailwind',   name: 'Tailwind CSS', level: 85, domain: 'frontend' },
  { id: 'threejs',    name: 'Three.js',     level: 75, domain: 'frontend' },
  { id: 'gsap',       name: 'GSAP',         level: 78, domain: 'frontend' },
  // Backend
  { id: 'nodejs',     name: 'Node.js',      level: 85, domain: 'backend' },
  { id: 'nestjs',     name: 'NestJS',       level: 82, domain: 'backend' },
  { id: 'python',     name: 'Python',       level: 80, domain: 'backend' },
  { id: 'postgresql', name: 'PostgreSQL',   level: 78, domain: 'backend' },
  { id: 'rest-api',   name: 'REST API',     level: 88, domain: 'backend' },
  // AI
  { id: 'machine-learning', name: 'Machine Learning', level: 75, domain: 'ai' },
  { id: 'tensorflow', name: 'TensorFlow',   level: 65, domain: 'ai' },
  { id: 'big-data',   name: 'Big Data',     level: 72, domain: 'ai' },
  { id: 'nlp',        name: 'NLP',          level: 70, domain: 'ai' },
  { id: 'pgvector',   name: 'pgvector',     level: 65, domain: 'ai' },
  // AI Tools
  { id: 'claude-code',       name: 'Claude Code',       level: 90, domain: 'ai-tools' },
  { id: 'github-copilot',    name: 'GitHub Copilot',    level: 85, domain: 'ai-tools' },
  { id: 'ai-agents',         name: 'AI Agents',         level: 82, domain: 'ai-tools' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', level: 85, domain: 'ai-tools' },
  { id: 'mcp',               name: 'MCP',               level: 80, domain: 'ai-tools' },
  // DevOps
  { id: 'git',        name: 'Git',          level: 90, domain: 'devops' },
  { id: 'docker',     name: 'Docker',       level: 75, domain: 'devops' },
  { id: 'ci-cd',      name: 'CI/CD',        level: 72, domain: 'devops' },
  { id: 'turborepo',  name: 'Turborepo',    level: 68, domain: 'devops' },
]

export const SKILLS_BY_ID: Record<string, Skill> = Object.fromEntries(
  SKILLS.map((s) => [s.id, s])
)
