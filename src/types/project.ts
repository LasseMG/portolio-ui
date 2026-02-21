export interface Highlight {
  name: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  type?: 'external' | 'internal'
  detailedDescription?: string
  url?: string
  githubUrl?: string
  imageUrl?: string
  thumbnail?: string
  technologies?: string[]
  features?: string[]
  color?: string
  highlights?: Highlight[]
}
