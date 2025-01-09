export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  photo?: string;
  about?: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: string;
  years: number;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  preview_url?: string;
}

export type ResumeTemplate = Template;

export interface Resume {
  id: string;
  title: string;
  template_id: number;
  personal_info: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  created_at?: string;
  updated_at?: string;
}
