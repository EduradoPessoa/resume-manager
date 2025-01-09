import { Models } from 'appwrite';

export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';

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
  position: string;
  company: string;
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

export interface User extends Models.User<Preferences> {
  id: string;
  email: string;
  name: string;
  phone: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isPremium: boolean;
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: boolean;
  };
  dataUsagePreferences?: DataUsagePreferences;
  consentTerms?: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DataUsagePreferences {
  analytics: boolean;
  marketing: boolean;
  thirdParty: boolean;
}

export interface Preferences {
  theme?: 'light' | 'dark';
  language?: string;
  notifications?: boolean;
}

export interface Message {
  id: string;
  userId: string;
  adminId: string;
  subject: string;
  content: string;
  type: 'email' | 'whatsapp';
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export interface UserConsent {
  id: string;
  userId: string;
  type: 'terms' | 'privacy';
  granted: boolean;
  version: string;
  grantedAt: string;
}
