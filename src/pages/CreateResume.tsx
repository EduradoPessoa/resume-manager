import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Stepper, Step, StepLabel } from '@mui/material';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import type { Resume, PersonalInfo, Experience, Education, Skill } from '../types/resume';
import { createResume } from '../services/resume';
import useAuth from '../hooks/useAuth';

const steps = ['Informações Pessoais', 'Experiência', 'Educação', 'Habilidades'];

const CreateResume = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || '';

  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState<Partial<Resume>>({
    userId: user?.id,
    template: templateId,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
  });

  const handlePersonalInfoSubmit = (data: PersonalInfo) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: data,
    }));
    setActiveStep((prev) => prev + 1);
  };

  const handleExperienceSubmit = (data: Experience[]) => {
    setResumeData((prev) => ({
      ...prev,
      experience: data,
    }));
    setActiveStep((prev) => prev + 1);
  };

  const handleEducationSubmit = (data: Education[]) => {
    setResumeData((prev) => ({
      ...prev,
      education: data,
    }));
    setActiveStep((prev) => prev + 1);
  };

  const handleSkillsSubmit = async (data: Skill[]) => {
    const finalResume: Resume = {
      ...resumeData,
      id: crypto.randomUUID(),
      userId: user?.id || '',
      name: resumeData.personalInfo?.fullName || 'Meu Currículo',
      template: templateId,
      personalInfo: resumeData.personalInfo!,
      experience: resumeData.experience!,
      education: resumeData.education!,
      skills: data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await createResume(finalResume);
      navigate('/resumes');
    } catch (error) {
      console.error('Error creating resume:', error);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoForm
            initialData={resumeData.personalInfo!}
            onSubmit={handlePersonalInfoSubmit}
          />
        );
      case 1:
        return (
          <ExperienceForm
            initialData={resumeData.experience!}
            onSubmit={handleExperienceSubmit}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EducationForm
            initialData={resumeData.education!}
            onSubmit={handleEducationSubmit}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsForm
            initialData={resumeData.skills!}
            onSubmit={handleSkillsSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Stepper activeStep={activeStep} className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {renderStep()}
    </Container>
  );
};

export default CreateResume;
