import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Stepper, Step, StepLabel, TextField } from '@mui/material';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import { createResume } from '../services/storage';
import type { Resume, PersonalInfo, Experience, Education, Skill } from '../types/resume';

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades'];

interface FormProps<T> {
  data: T;
  onSubmit: (data: T) => void;
  onBack?: () => void;
}

const CreateResume = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState<Resume>({
    id: crypto.randomUUID(),
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
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    const newResumeId = createResume(resumeData);
    navigate(`/view/${newResumeId}`);
  };

  const updateResumeData = (data: Partial<Resume>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personal_info}
            onSubmit={(data: PersonalInfo) => {
              updateResumeData({ personal_info: data });
              handleNext();
            }}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onSubmit={(data: Experience[]) => {
              updateResumeData({ experience: data });
              handleNext();
            }}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onSubmit={(data: Education[]) => {
              updateResumeData({ education: data });
              handleNext();
            }}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onSubmit={(data: Skill[]) => {
              updateResumeData({ skills: data });
              handleSubmit();
            }}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="mb-6">
          Criar Novo Currículo
        </Typography>

        <TextField
          fullWidth
          label="Título do Currículo"
          value={resumeData.title}
          onChange={(e) => updateResumeData({ title: e.target.value })}
          className="mb-6"
        />

        <Stepper activeStep={activeStep} className="mb-6">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStep()}
      </Paper>
    </Container>
  );
};

export default CreateResume;
