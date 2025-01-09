export type SkillLevel = 1 | 2 | 3 | 4;

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
  about?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  years: number;
  category?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview?: string;
  isPremium: boolean;
}

export interface Resume {
  id?: string;
  userId: string;
  title: string;
  template: 'minimalist' | 'modern';
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  createdAt?: string;
  updatedAt?: string;
  isPublic?: boolean;
  isPremium?: boolean;
}
