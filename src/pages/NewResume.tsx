import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createResume } from '../services/storage'
import type { Resume } from '../types/resume'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades']

const emptyResume: Resume = {
  id: '',
  title: '',
  personal_info: {
    name: '',
    email: '',
    phone: '',
    location: '',
    about: '',
    linkedin: '',
    portfolio: '',
    photo: ''
  },
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const NewResume = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState<Resume>(emptyResume)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSave()
    } else {
      setActiveStep((prevStep) => prevStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleUpdateData = (data: Partial<Resume>) => {
    setResumeData((prev) => ({ ...prev, ...data }))
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)
      const id = await createResume(resumeData)
      navigate(`/view/${id}`)
    } catch (err) {
      console.error('Erro ao criar currículo:', err)
      setError('Erro ao criar currículo. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personal_info}
            onUpdate={(data) => handleUpdateData({ personal_info: data })}
          />
        )
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => handleUpdateData({ experience: data })}
          />
        )
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => handleUpdateData({ education: data })}
          />
        )
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => handleUpdateData({ skills: data })}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Criar Novo Currículo
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Preencha as informações abaixo para criar seu currículo
            </p>
          </div>

          {/* Stepper */}
          <nav className="px-4 py-5 sm:px-6">
            <ol className="flex items-center">
              {steps.map((label, index) => (
                <li
                  key={label}
                  className={`flex items-center ${
                    index !== steps.length - 1 ? 'w-full' : ''
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index <= activeStep
                        ? 'bg-navy text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`ml-4 text-sm font-medium ${
                      index <= activeStep ? 'text-navy' : 'text-gray-500'
                    }`}
                  >
                    {label}
                  </span>
                  {index !== steps.length - 1 && (
                    <div className="flex-1 ml-4">
                      <div className="h-0.5 bg-gray-200"></div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Form Content */}
          <div className="px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {getStepContent(activeStep)}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-lg border-t border-gray-200">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
              >
                Cancelar
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={activeStep === 0 || loading}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy disabled:opacity-50"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-navy hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy disabled:opacity-50"
                >
                  {loading
                    ? 'Salvando...'
                    : activeStep === steps.length - 1
                    ? 'Finalizar'
                    : 'Próximo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewResume
