import type { Resume, Template } from '../types/resume';

const templates: Template[] = [
  {
    id: 1,
    name: 'Moderno',
    description: 'Um modelo moderno e profissional',
  },
  {
    id: 2,
    name: 'Clássico',
    description: 'Um modelo tradicional e elegante',
  },
  {
    id: 3,
    name: 'Criativo',
    description: 'Um modelo diferenciado para áreas criativas',
  },
];

const STORAGE_KEY = 'resumes';

export const getResumes = (): Resume[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getResume = (id: string): Resume | null => {
  const resumes = getResumes();
  return resumes.find(resume => resume.id === id) || null;
};

export const createResume = (resume: Resume): string => {
  const resumes = getResumes();
  resumes.push(resume);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  return resume.id;
};

export const updateResume = (id: string, data: Partial<Resume>): Resume | null => {
  const resumes = getResumes();
  const index = resumes.findIndex(resume => resume.id === id);
  
  if (index === -1) return null;
  
  resumes[index] = { ...resumes[index], ...data };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  return resumes[index];
};

export const deleteResume = (id: string): boolean => {
  const resumes = getResumes();
  const filteredResumes = resumes.filter(resume => resume.id !== id);
  
  if (filteredResumes.length === resumes.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResumes));
  return true;
};

export const getTemplates = (): Template[] => {
  return templates;
};

export const getTemplate = (id: number): Template | null => {
  return templates.find(template => template.id === id) || null;
};
