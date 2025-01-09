export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  field: string;
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
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview?: string;
  isPremium: boolean;
}

export interface Resume {
  id: string;
  userId: string;
  name: string;
  template: 'minimalist' | 'modern';
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  createdAt: string;
  updatedAt: string;
  isPublic?: boolean;
  isPremium?: boolean;
}
