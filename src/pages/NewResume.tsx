import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from '@mui/material'
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
  template_id: 'modern',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const NewResume = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState<Resume>(emptyResume)
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleUpdateData = (data: Partial<Resume>) => {
    setResumeData((prev) => ({ ...prev, ...data }))
  }

  const handleSave = () => {
    try {
      const id = createResume(resumeData)
      navigate(`/view/${id}`)
    } catch (err) {
      console.error('Erro ao criar currículo:', err)
      setError('Erro ao criar currículo')
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
    <Container maxWidth="lg" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="text-gray-800 font-bold mb-6">
          Novo Currículo
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Typography color="error" className="mb-4">
            {error}
          </Typography>
        )}

        <div className="mb-8">{getStepContent(activeStep)}</div>

        <div className="flex justify-between">
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Voltar
          </Button>
          <div>
            <Button
              variant="contained"
              onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
              className="ml-2"
            >
              {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default NewResume
