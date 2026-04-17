export type NeuronCategory = 'core' | 'skill' | 'project' | 'experience' | 'contact'

export interface MediaItem {
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  alt: string
  caption?: string
}

export interface CoreMeta {
  type: 'core'
  bio: string
  title: string
  photo?: string
}

export interface SkillMeta {
  type: 'skill'
  level: number // 0 à 100
  domain: 'frontend' | 'backend' | 'ai' | 'devops' | 'ai-tools'
}

export interface ProjectMeta {
  type: 'project'
  stack: string[]
  highlights: string[]
  links: {
    github?: string
    live?: string
  }
  media?: MediaItem[]
}

export interface ExperienceMeta {
  type: 'experience'
  period: string
  skills: string[]
}

export interface ContactMeta {
  type: 'contact'
  link: string
  action: 'url' | 'mailto'
}

export type NeuronMeta = CoreMeta | SkillMeta | ProjectMeta | ExperienceMeta | ContactMeta

export interface NeuronData {
  id: string
  label: string
  category: NeuronCategory
  description: string
  size: number
  color?: string
  icon?: string
  metadata: NeuronMeta
}
