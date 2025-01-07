import { useState } from 'react'
import type { Skill } from '../../types/resume'

interface SkillsFormProps {
  data: Skill[]
  onUpdate: (data: Skill[]) => void
}

interface SkillDialogProps {
  open: boolean
  onClose: () => void
  onSave: (skill: Skill) => void
  initialData?: Skill
}

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const

const defaultSkill: Skill = {
  id: '',
  name: '',
  level: 'Intermediate',
  years: 0,
}

const SkillDialog = ({ open, onClose, onSave, initialData }: SkillDialogProps) => {
  const [skill, setSkill] = useState<Skill>(initialData || defaultSkill)
  const [errors, setErrors] = useState<Partial<Record<keyof Skill, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof Skill, string>> = {}

    if (!skill.name.trim()) {
      newErrors.name = 'Nome da habilidade é obrigatório'
    }

    if (skill.years < 0) {
      newErrors.years = 'Anos de experiência deve ser maior ou igual a 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    if (!skill.id) {
      onSave({
        ...skill,
        id: Date.now().toString()
      })
    } else {
      onSave(skill)
    }
    onClose()
  }

  const getLevelLabel = (level: typeof skillLevels[number]) => {
    switch (level) {
      case 'Beginner':
        return 'Básico'
      case 'Intermediate':
        return 'Intermediário'
      case 'Advanced':
        return 'Avançado'
      case 'Expert':
        return 'Especialista'
      default:
        return level
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {initialData ? 'Editar Habilidade' : 'Adicionar Habilidade'}
              </h3>

              <div className="space-y-4">
                {/* Nome da Habilidade */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome da Habilidade
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={skill.name}
                    onChange={(e) =>
                      setSkill({ ...skill, name: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.name ? 'border-red-300' : ''
                    }`}
                    placeholder="Ex: React.js"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Nível */}
                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nível
                  </label>
                  <select
                    id="level"
                    value={skill.level}
                    onChange={(e) =>
                      setSkill({
                        ...skill,
                        level: e.target.value as typeof skillLevels[number],
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm"
                  >
                    {skillLevels.map((level) => (
                      <option key={level} value={level}>
                        {getLevelLabel(level)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Anos de Experiência */}
                <div>
                  <label
                    htmlFor="years"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Anos de Experiência
                  </label>
                  <input
                    type="number"
                    id="years"
                    value={skill.years}
                    onChange={(e) =>
                      setSkill({ ...skill, years: Number(e.target.value) })
                    }
                    min={0}
                    step={1}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.years ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.years && (
                    <p className="mt-1 text-sm text-red-600">{errors.years}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full justify-center rounded-md bg-navy px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>()

  const handleAdd = () => {
    setEditingSkill(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta habilidade?')) {
      onUpdate(data.filter((skill) => skill.id !== id))
    }
  }

  const handleSave = (skill: Skill) => {
    if (editingSkill) {
      onUpdate(data.map((s) => (s.id === skill.id ? skill : s)))
    } else {
      onUpdate([...data, skill])
    }
  }

  const getLevelLabel = (level: typeof skillLevels[number]) => {
    switch (level) {
      case 'Beginner':
        return 'Básico'
      case 'Intermediate':
        return 'Intermediário'
      case 'Advanced':
        return 'Avançado'
      case 'Expert':
        return 'Especialista'
      default:
        return level
    }
  }

  const getLevelColor = (level: typeof skillLevels[number]) => {
    switch (level) {
      case 'Beginner':
        return 'bg-gray-100 text-gray-800'
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800'
      case 'Advanced':
        return 'bg-green-100 text-green-800'
      case 'Expert':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Lista de Habilidades */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((skill) => (
          <div
            key={skill.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getLevelColor(
                        skill.level
                      )}`}
                    >
                      {getLevelLabel(skill.level)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {skill.years} {skill.years === 1 ? 'ano' : 'anos'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="text-gray-400 hover:text-navy"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Adicionar */}
      <button
        onClick={handleAdd}
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
      >
        <svg
          className="-ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Adicionar Habilidade
      </button>

      {/* Modal de Edição */}
      <SkillDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingSkill}
      />
    </div>
  )
}

export default SkillsForm
