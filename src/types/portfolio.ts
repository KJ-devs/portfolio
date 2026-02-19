export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  highlights: string[]
  links: {
    github?: string
    live?: string
  }
}

export interface Experience {
  id: string
  title: string
  period: string
  description: string
  skills: string[]
}

export interface Skill {
  id: string
  name: string
  level: number
  domain: 'frontend' | 'backend' | 'ai' | 'devops'
}
