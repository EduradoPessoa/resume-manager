import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Typography, Stepper, Step, StepLabel, TextField } from '@mui/material'
import PersonalInfoForm from '../components/forms/PersonalInfoForm'
import ExperienceForm from '../components/forms/ExperienceForm'
import EducationForm from '../components/forms/EducationForm'
import SkillsForm from '../components/forms/SkillsForm'
import { createResume } from '../services/storage'
import type { Resume, PersonalInfo, Experience, Education, Skill } from '../types/resume'

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades']

const CreateResume = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [resumeData, setResumeData] = useState<Partial<Resume>>({
    title: '',
    template_id: 1,
    personal_info: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      photo: '',
      about: ''
    },
    experience: [],
    education: [],
    skills: []
  })

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = () => {
    if (!resumeData.personal_info || !resumeData.experience || !resumeData.education || !resumeData.skills) {
      console.error('Missing required data');
      return;
    }
    const newResumeId = createResume(resumeData as Resume)
    navigate(`/view/${newResumeId}`)
  }

  const updateResumeData = (data: Partial<Resume>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personal_info}
            onSubmit={(data) => {
              updateResumeData({ personal_info: data })
              handleNext()
            }}
          />
        )
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onSubmit={(data) => {
              updateResumeData({ experience: data })
              handleNext()
            }}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onSubmit={(data) => {
              updateResumeData({ education: data })
              handleNext()
            }}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onSubmit={(data) => {
              updateResumeData({ skills: data })
              handleSubmit()
            }}
            onBack={handleBack}
          />
        )
      default:
        return null
    }
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="mb-6">
          Criar Novo Currículo
        </Typography>

        <div className="mb-6">
          <TextField
            fullWidth
            label="Nome do Currículo"
            value={resumeData.title}
            onChange={(e) => updateResumeData({ title: e.target.value })}
            helperText="Dê um nome para identificar este currículo (ex: 'Currículo TI', 'Versão em Inglês')"
            required
          />
        </div>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}
      </Paper>
    </Container>
  )
}

export default CreateResume
