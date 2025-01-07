import { useState } from 'react'
import type { Education } from '../../types/resume'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface EducationFormProps {
  data: Education[]
  onUpdate: (data: Education[]) => void
}

interface EducationDialogProps {
  open: boolean
  onClose: () => void
  onSave: (education: Education) => void
  initialData?: Education
}

const defaultEducation: Education = {
  id: '',
  institution: '',
  degree: '',
  field: '',
  location: '',
  start_date: '',
  end_date: '',
  current: false,
  description: '',
}

const EducationDialog = ({ open, onClose, onSave, initialData }: EducationDialogProps) => {
  const [education, setEducation] = useState<Education>(initialData || defaultEducation)
  const [errors, setErrors] = useState<Partial<Record<keyof Education, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof Education, string>> = {}

    if (!education.institution.trim()) {
      newErrors.institution = 'Instituição é obrigatória'
    }

    if (!education.degree.trim()) {
      newErrors.degree = 'Grau é obrigatório'
    }

    if (!education.field.trim()) {
      newErrors.field = 'Área é obrigatória'
    }

    if (!education.start_date) {
      newErrors.start_date = 'Data de início é obrigatória'
    }

    if (!education.current && !education.end_date) {
      newErrors.end_date = 'Data de término é obrigatória'
    }

    if (!education.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    if (!education.id) {
      onSave({
        ...education,
        id: Date.now().toString()
      })
    } else {
      onSave(education)
    }
    onClose()
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
                {initialData ? 'Editar Educação' : 'Adicionar Educação'}
              </h3>

              <div className="space-y-4">
                {/* Instituição */}
                <div>
                  <label
                    htmlFor="institution"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Instituição
                  </label>
                  <input
                    type="text"
                    id="institution"
                    value={education.institution}
                    onChange={(e) =>
                      setEducation({ ...education, institution: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.institution ? 'border-red-300' : ''
                    }`}
                    placeholder="Ex: Universidade de São Paulo"
                  />
                  {errors.institution && (
                    <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
                  )}
                </div>

                {/* Grau */}
                <div>
                  <label
                    htmlFor="degree"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Grau
                  </label>
                  <input
                    type="text"
                    id="degree"
                    value={education.degree}
                    onChange={(e) =>
                      setEducation({ ...education, degree: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.degree ? 'border-red-300' : ''
                    }`}
                    placeholder="Ex: Bacharelado"
                  />
                  {errors.degree && (
                    <p className="mt-1 text-sm text-red-600">{errors.degree}</p>
                  )}
                </div>

                {/* Área */}
                <div>
                  <label
                    htmlFor="field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Área
                  </label>
                  <input
                    type="text"
                    id="field"
                    value={education.field}
                    onChange={(e) =>
                      setEducation({ ...education, field: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.field ? 'border-red-300' : ''
                    }`}
                    placeholder="Ex: Ciência da Computação"
                  />
                  {errors.field && (
                    <p className="mt-1 text-sm text-red-600">{errors.field}</p>
                  )}
                </div>

                {/* Localização */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Localização
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={education.location}
                    onChange={(e) =>
                      setEducation({ ...education, location: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm"
                    placeholder="Ex: São Paulo, SP"
                  />
                </div>

                {/* Datas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="start_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Data de Início
                    </label>
                    <input
                      type="date"
                      id="start_date"
                      value={education.start_date}
                      onChange={(e) =>
                        setEducation({ ...education, start_date: e.target.value })
                      }
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                        errors.start_date ? 'border-red-300' : ''
                      }`}
                    />
                    {errors.start_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="end_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Data de Término
                    </label>
                    <input
                      type="date"
                      id="end_date"
                      value={education.end_date}
                      onChange={(e) =>
                        setEducation({ ...education, end_date: e.target.value })
                      }
                      disabled={education.current}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                        errors.end_date ? 'border-red-300' : ''
                      } ${education.current ? 'bg-gray-100' : ''}`}
                    />
                    {errors.end_date && (
                      <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                    )}
                  </div>
                </div>

                {/* Cursando */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="current"
                    checked={education.current}
                    onChange={(e) =>
                      setEducation({
                        ...education,
                        current: e.target.checked,
                        end_date: e.target.checked ? '' : education.end_date,
                      })
                    }
                    className="h-4 w-4 text-navy focus:ring-navy border-gray-300 rounded"
                  />
                  <label htmlFor="current" className="ml-2 block text-sm text-gray-900">
                    Cursando
                  </label>
                </div>

                {/* Descrição */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={education.description}
                    onChange={(e) =>
                      setEducation({ ...education, description: e.target.value })
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-navy focus:ring-navy sm:text-sm ${
                      errors.description ? 'border-red-300' : ''
                    }`}
                    placeholder="Descreva suas principais atividades e conquistas acadêmicas..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
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

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | undefined>()

  const handleAdd = () => {
    setEditingEducation(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta educação?')) {
      onUpdate(data.filter((edu) => edu.id !== id))
    }
  }

  const handleSave = (education: Education) => {
    if (editingEducation) {
      onUpdate(data.map((edu) => (edu.id === education.id ? education : edu)))
    } else {
      onUpdate([...data, education])
    }
  }

  const formatDate = (date: string) => {
    if (!date) return ''
    return format(new Date(date), 'MMM yyyy', { locale: ptBR })
  }

  return (
    <div className="space-y-6">
      {/* Lista de Educação */}
      <div className="space-y-4">
        {data.map((education) => (
          <div
            key={education.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {education.degree} em {education.field}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {education.institution} • {education.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(education.start_date)} -{' '}
                    {education.current ? 'Cursando' : formatDate(education.end_date)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(education)}
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
                    onClick={() => handleDelete(education.id)}
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
              <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">
                {education.description}
              </p>
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
        Adicionar Educação
      </button>

      {/* Modal de Edição */}
      <EducationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingEducation}
      />
    </div>
  )
}

export default EducationForm
