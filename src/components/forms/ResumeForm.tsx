import { useState } from 'react';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { Resume } from '../../types';
import PersonalInfoForm from './PersonalInfoForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';

export interface ResumeFormProps {
  initialData?: Resume;
  onSubmit: (resume: Resume) => void;
}

const ResumeForm = ({ initialData, onSubmit }: ResumeFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [resume, setResume] = useState<Partial<Resume>>(
    initialData || {
      title: '',
      template: 'minimalist',
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        github: '',
        website: '',
        portfolio: '',
        about: ''
      },
      experience: [],
      education: [],
      skills: [],
      isPublic: false,
      isPremium: false
    }
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePersonalInfoSubmit = (personalInfo: Resume['personalInfo']) => {
    setResume((prev) => ({ ...prev, personalInfo }));
    handleNext();
  };

  const handleExperienceSubmit = (experience: Resume['experience']) => {
    setResume((prev) => ({ ...prev, experience }));
    handleNext();
  };

  const handleEducationSubmit = (education: Resume['education']) => {
    setResume((prev) => ({ ...prev, education }));
    handleNext();
  };

  const handleSkillsSubmit = (skills: Resume['skills']) => {
    setResume((prev) => ({ ...prev, skills }));
    handleNext();
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resume.title && resume.template && resume.personalInfo && resume.experience && resume.education && resume.skills) {
      onSubmit({
        ...resume,
        userId: initialData?.userId || '', // This should be set by the parent component
      } as Resume);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoForm
            initialData={resume.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resume.experience}
            onUpdate={handleExperienceSubmit}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resume.education}
            onUpdate={handleEducationSubmit}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resume.skills}
            onUpdate={handleSkillsSubmit}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <form onSubmit={handleFinalSubmit}>
            <Typography variant="h6" gutterBottom>
              Finalizar Currículo
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título do Currículo"
                  value={resume.title}
                  onChange={(e) =>
                    setResume((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Template</InputLabel>
                  <Select
                    value={resume.template}
                    label="Template"
                    onChange={(e) =>
                      setResume((prev) => ({
                        ...prev,
                        template: e.target.value as Resume['template']
                      }))
                    }
                  >
                    <MenuItem value="minimalist">Minimalista</MenuItem>
                    <MenuItem value="modern">Moderno</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={resume.isPublic}
                      onChange={(e) =>
                        setResume((prev) => ({
                          ...prev,
                          isPublic: e.target.checked
                        }))
                      }
                    />
                  }
                  label="Tornar público"
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleBack} variant="outlined">
                Voltar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Finalizar
              </Button>
            </Box>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {activeStep === 4 ? 'Finalizar' : `Passo ${activeStep + 1} de 4`}
      </Typography>
      {renderStep()}
    </Box>
  );
};

export default ResumeForm;
