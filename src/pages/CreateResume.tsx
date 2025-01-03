import { useState } from 'react'
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades']

const CreateResume = () => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
  }

  const handleFinish = () => {
    // TODO: Save resume data
    navigate('/')
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="mb-6">
          Criar Novo Currículo
        </Typography>

        <Stepper activeStep={activeStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="min-h-[400px] mb-6">
          {/* Step content will go here */}
          {activeStep === 0 && (
            <Typography>
              Formulário de informações pessoais virá aqui
            </Typography>
          )}
          {activeStep === 1 && (
            <Typography>
              Formulário de experiência profissional virá aqui
            </Typography>
          )}
          {activeStep === 2 && (
            <Typography>
              Formulário de educação virá aqui
            </Typography>
          )}
          {activeStep === 3 && (
            <Typography>
              Formulário de habilidades virá aqui
            </Typography>
          )}
        </div>

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
              onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default CreateResume
