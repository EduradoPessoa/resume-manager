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
  id: string
  company: string
  position: string
  location: string
  start_date: string
  end_date: string
  current: boolean
  description: string
}

export interface Education {
  id: string
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
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  years: number
}

export interface Template {
  id: string
  name: string
  description: string
}

export interface Resume {
  id: string
  title: string
  personal_info: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  template: string
  created_at: string
  updated_at: string
}
