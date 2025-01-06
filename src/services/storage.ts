import type { Resume, ResumeTemplate } from '../types/resume'

const STORAGE_KEY = 'resumes'
const TEMPLATES_KEY = 'resume_templates'

// Templates padrão
const defaultTemplates: ResumeTemplate[] = [
  {
    id: 1,
    name: 'Moderno',
    description: 'Layout moderno com barra lateral',
    thumbnail_url: '/templates/modern.png',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'Clássico',
    description: 'Layout tradicional e profissional',
    thumbnail_url: '/templates/classic.png',
    created_at: new Date().toISOString(),
  },
]

// Inicializa os templates se não existirem
const initTemplates = () => {
  const templates = localStorage.getItem(TEMPLATES_KEY)
  if (!templates) {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates))
  }
}

// Inicializa os currículos se não existirem
const initResumes = () => {
  const resumes = localStorage.getItem(STORAGE_KEY)
  if (!resumes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }
}

// Inicializa o storage
initTemplates()
initResumes()

// Funções de manipulação de currículos
export const getResumes = (): Resume[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    
    const resumes = JSON.parse(data)
    console.log('Currículos carregados:', resumes)
    return resumes
  } catch (err) {
    console.error('Erro ao carregar currículos:', err)
    return []
  }
}

export const getResume = (id: string): Resume | null => {
  try {
    console.log('Buscando currículo:', id)
    const resumes = getResumes()
    const resume = resumes.find(r => r.id === id)
    console.log('Currículo encontrado:', resume)
    return resume || null
  } catch (err) {
    console.error('Erro ao buscar currículo:', err)
    return null
  }
}

export const createResume = (resume: Omit<Resume, 'id'>): string => {
  try {
    const resumes = getResumes()
    const id = Math.random().toString(36).substr(2, 9)
    const now = new Date().toISOString()
    const newResume = { 
      ...resume, 
      id,
      created_at: now,
      updated_at: now,
      template_id: resume.template_id || 'modern'
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...resumes, newResume]))
    console.log('Currículo criado:', newResume)
    return id
  } catch (err) {
    console.error('Erro ao criar currículo:', err)
    throw err
  }
}

export const updateResume = (id: string, resume: Resume): void => {
  try {
    console.log('Atualizando currículo:', id, resume)
    const resumes = getResumes()
    const index = resumes.findIndex(r => r.id === id)
    
    if (index === -1) {
      throw new Error('Currículo não encontrado')
    }
    
    const updatedResume = {
      ...resume,
      updated_at: new Date().toISOString()
    }
    
    resumes[index] = updatedResume
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes))
    console.log('Currículo atualizado com sucesso')
  } catch (err) {
    console.error('Erro ao atualizar currículo:', err)
    throw err
  }
}

export const deleteResume = (id: string): void => {
  try {
    console.log('Excluindo currículo:', id)
    const resumes = getResumes()
    const filtered = resumes.filter(r => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    console.log('Currículo excluído com sucesso')
  } catch (err) {
    console.error('Erro ao excluir currículo:', err)
    throw err
  }
}

// Funções de manipulação de templates
export const getResumeTemplates = (): ResumeTemplate[] => {
  try {
    const data = localStorage.getItem(TEMPLATES_KEY)
    return data ? JSON.parse(data) : defaultTemplates
  } catch (err) {
    console.error('Erro ao carregar templates:', err)
    return defaultTemplates
  }
}

export const getResumeTemplate = (id: number): ResumeTemplate | null => {
  try {
    const templates = getResumeTemplates()
    return templates.find(t => t.id === id) || null
  } catch (err) {
    console.error('Erro ao buscar template:', err)
    return null
  }
}

// Função para limpar todos os dados (útil para testes)
export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(TEMPLATES_KEY)
    initTemplates()
    initResumes()
    console.log('Storage limpo com sucesso')
  } catch (err) {
    console.error('Erro ao limpar storage:', err)
    throw err
  }
}

const defaultResume: Resume = {
  id: Math.random().toString(36).substr(2, 9),
  title: 'Meu Currículo',
  template_id: 'modern',
  personal_info: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    photo: '',
    about: '',
  },
  experience: [],
  education: [],
  skills: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}
