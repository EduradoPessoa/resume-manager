export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  photo: string
  about: string
}

export interface Experience {
  id: number
  company: string
  position: string
  location: string
  start_date: string
  end_date: string
  current: boolean
  description: string
}

export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  location: string
  start_date: string
  end_date: string
  current: boolean
  description: string
}

export interface Skill {
  id: number
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: number
}

export interface ResumeTemplate {
  id: number
  name: string
  description: string
  thumbnail_url: string
  created_at: string
}

export type TemplateId = 'modern' | 'minimalist'

export interface Resume {
  id: string
  title: string // Nome personalizado do currículo
  template_id: TemplateId
  personal_info: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  created_at: string
  updated_at: string
}

export type ResumeFormData = Omit<Resume, 'id'>;
