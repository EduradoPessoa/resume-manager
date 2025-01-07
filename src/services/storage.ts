import type { Resume, Template } from '../types/resume'
import { getCurrentUser } from './auth'

const STORAGE_KEY_PREFIX = 'resumes'
const TEMPLATES_KEY_PREFIX = 'templates'

const getStorageKeyForUser = () => {
  const user = getCurrentUser()
  if (!user) throw new Error('Usuário não autenticado')
  return `${STORAGE_KEY_PREFIX}_${user.id}`
}

const getTemplatesKeyForUser = () => {
  const user = getCurrentUser()
  if (!user) throw new Error('Usuário não autenticado')
  return `${TEMPLATES_KEY_PREFIX}_${user.id}`
}

const defaultTemplates: Template[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Um template moderno e profissional'
  },
  {
    id: 'minimalist',
    name: 'Minimalista',
    description: 'Um template limpo e minimalista'
  }
]

export const initializeTemplates = () => {
  try {
    const templatesKey = getTemplatesKeyForUser()
    const templates = localStorage.getItem(templatesKey)
    if (!templates) {
      localStorage.setItem(templatesKey, JSON.stringify(defaultTemplates))
    }
  } catch (error) {
    console.error('Error initializing templates:', error)
  }
}

export const initializeStorage = () => {
  try {
    const storageKey = getStorageKeyForUser()
    const resumes = localStorage.getItem(storageKey)
    if (!resumes) {
      localStorage.setItem(storageKey, JSON.stringify([]))
    }
  } catch (error) {
    console.error('Error initializing storage:', error)
    throw new Error('Não foi possível inicializar o armazenamento')
  }
}

export const getResumes = async (): Promise<Resume[]> => {
  try {
    initializeStorage()
    const storageKey = getStorageKeyForUser()
    const data = localStorage.getItem(storageKey)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error getting resumes:', error)
    throw new Error('Não foi possível carregar os currículos')
  }
}

export const getResume = async (id: string): Promise<Resume | null> => {
  try {
    const resumes = await getResumes()
    return resumes.find((resume) => resume.id === id) || null
  } catch (error) {
    console.error('Error getting resume:', error)
    throw new Error('Não foi possível carregar o currículo')
  }
}

export const createResume = async (resume: Omit<Resume, 'id'>): Promise<string> => {
  try {
    const resumes = await getResumes()
    const newResume: Resume = {
      ...resume,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const storageKey = getStorageKeyForUser()
    localStorage.setItem(storageKey, JSON.stringify([...resumes, newResume]))

    return newResume.id
  } catch (error) {
    console.error('Error creating resume:', error)
    throw new Error('Não foi possível criar o currículo')
  }
}

export const updateResume = async (
  id: string,
  updates: Partial<Resume>
): Promise<Resume> => {
  try {
    const resumes = await getResumes()
    const index = resumes.findIndex((resume) => resume.id === id)

    if (index === -1) {
      throw new Error('Currículo não encontrado')
    }

    const updatedResume = {
      ...resumes[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    resumes[index] = updatedResume

    const storageKey = getStorageKeyForUser()
    localStorage.setItem(storageKey, JSON.stringify(resumes))

    return updatedResume
  } catch (error) {
    console.error('Error updating resume:', error)
    throw new Error('Não foi possível atualizar o currículo')
  }
}

export const deleteResume = async (id: string): Promise<void> => {
  try {
    const resumes = await getResumes()
    const filteredResumes = resumes.filter((resume) => resume.id !== id)

    const storageKey = getStorageKeyForUser()
    localStorage.setItem(storageKey, JSON.stringify(filteredResumes))
  } catch (error) {
    console.error('Error deleting resume:', error)
    throw new Error('Não foi possível excluir o currículo')
  }
}

export const getTemplates = async (): Promise<Template[]> => {
  try {
    initializeTemplates()
    const templatesKey = getTemplatesKeyForUser()
    const data = localStorage.getItem(templatesKey)
    return data ? JSON.parse(data) : defaultTemplates
  } catch (error) {
    console.error('Error getting templates:', error)
    return defaultTemplates
  }
}

export const clearAllData = () => {
  try {
    const user = getCurrentUser()
    if (!user) return

    // Limpar currículos
    const storageKey = getStorageKeyForUser()
    localStorage.removeItem(storageKey)

    // Limpar templates
    const templatesKey = getTemplatesKeyForUser()
    localStorage.removeItem(templatesKey)

    // Reinicializar armazenamento
    initializeStorage()
    initializeTemplates()
  } catch (error) {
    console.error('Error clearing data:', error)
    throw new Error('Não foi possível limpar os dados')
  }
}
