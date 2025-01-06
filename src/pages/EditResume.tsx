import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import { getResume, updateResume } from '../services/storage'
import type { Resume, Experience, Education, Skill } from '../types/resume'

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades']

const EditResume = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resumeData, setResumeData] = useState<Resume | null>(null)

  useEffect(() => {
    if (!id) {
      setError('ID do currículo não fornecido')
      return
    }

    const loadResume = () => {
      try {
        const resume = getResume(id)
        
        if (!resume) {
          setError('Currículo não encontrado')
          setTimeout(() => navigate('/'), 2000)
          return
        }

        setResumeData(resume)
      } catch (err) {
        console.error('Erro ao carregar currículo:', err)
        setError('Erro ao carregar currículo')
      } finally {
        setLoading(false)
      }
    }

    loadResume()
  }, [id, navigate])

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleUpdateData = (data: Partial<Resume>) => {
    setResumeData((prev) => {
      if (!prev) return null
      return { ...prev, ...data }
    })
  }

  const handleSave = () => {
    if (!resumeData || !id) return

    try {
      updateResume(id, {
        ...resumeData,
        updated_at: new Date().toISOString()
      })
      navigate(`/view/${id}`)
    } catch (err) {
      console.error('Erro ao salvar currículo:', err)
      setError('Erro ao salvar currículo')
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Paper className="p-6 flex justify-center items-center">
          <CircularProgress />
        </Paper>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Paper className="p-6">
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    )
  }

  if (!resumeData) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Paper className="p-6">
          <Typography>Currículo não encontrado</Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="mb-6 text-gray-800 font-bold">
          Editar Currículo
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="mt-8">
          {activeStep === 0 && (
            <PersonalInfoForm
              data={resumeData.personal_info}
              onUpdate={(data) => handleUpdateData({ personal_info: data })}
            />
          )}
          {activeStep === 1 && (
            <ExperienceForm
              data={resumeData.experience}
              onUpdate={(data: Experience[]) => handleUpdateData({ experience: data })}
            />
          )}
          {activeStep === 2 && (
            <EducationForm
              data={resumeData.education}
              onUpdate={(data: Education[]) => handleUpdateData({ education: data })}
            />
          )}
          {activeStep === 3 && (
            <SkillsForm
              data={resumeData.skills}
              onUpdate={(data: Skill[]) => handleUpdateData({ skills: data })}
            />
          )}
        </div>

        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Voltar
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Cancelar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Salvar
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Próximo
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default EditResume
