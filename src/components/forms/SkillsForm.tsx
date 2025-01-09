import { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { Skill } from '../../types/resume';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SkillsFormProps {
  data: Skill[];
  onSubmit: (skills: Skill[]) => void;
  onBack?: () => void;
}

const emptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: '',
  level: 'Beginner' as SkillLevel,
  years: 0
});

const SkillsForm = ({ data, onSubmit, onBack }: SkillsFormProps) => {
  const [skills, setSkills] = useState<Skill[]>(data || []);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    id: '',
    name: '',
    level: 'Beginner' as SkillLevel,
    years: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSkillChange = (index: number, field: keyof Skill, value: string | number | SkillLevel) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkills(updatedSkills);
    validateSkill(updatedSkills[index]);
  };

  const validateSkill = (skill: Skill) => {
    const newErrors: Record<string, string> = {};
    
    if (!skill.name) {
      newErrors[`name-${skill.id}`] = 'Nome é obrigatório';
    }
    
    if (skill.years < 0) {
      newErrors[`years-${skill.id}`] = 'Anos de experiência deve ser maior ou igual a 0';
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    skills.forEach(skill => {
      if (!skill.name) {
        newErrors[`name-${skill.id}`] = 'Nome é obrigatório';
        isValid = false;
      }
      if (skill.years < 0) {
        newErrors[`years-${skill.id}`] = 'Anos de experiência deve ser maior ou igual a 0';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleAddSkill = () => {
    setSkills([...skills, emptySkill()]);
  };

  const handleRemoveSkill = (index: number) => {
    if (skills.length > 1) {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(skills);
    }
  };

  const handleLevelChange = (level: SkillLevel) => {
    setCurrentSkill({ ...currentSkill, level });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Habilidades
      </Typography>

      {skills.map((skill, index) => (
        <Box key={skill.id} sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nome da Habilidade"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                error={!!errors[`name-${skill.id}`]}
                helperText={errors[`name-${skill.id}`]}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Nível</InputLabel>
                <Select
                  value={skill.level}
                  label="Nível"
                  onChange={(e) => handleSkillChange(index, 'level', e.target.value as SkillLevel)}
                >
                  <MenuItem value="Beginner">Iniciante</MenuItem>
                  <MenuItem value="Intermediate">Intermediário</MenuItem>
                  <MenuItem value="Advanced">Avançado</MenuItem>
                  <MenuItem value="Expert">Especialista</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Anos de Experiência"
                value={skill.years}
                onChange={(e) => handleSkillChange(index, 'years', parseInt(e.target.value) || 0)}
                error={!!errors[`years-${skill.id}`]}
                helperText={errors[`years-${skill.id}`]}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <IconButton
                onClick={() => handleRemoveSkill(index)}
                disabled={skills.length === 1}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Nível</InputLabel>
              <Select
                value={currentSkill.level}
                label="Nível"
                onChange={(e) => handleLevelChange(e.target.value as SkillLevel)}
              >
                <MenuItem value="Beginner">Iniciante</MenuItem>
                <MenuItem value="Intermediate">Intermediário</MenuItem>
                <MenuItem value="Advanced">Avançado</MenuItem>
                <MenuItem value="Expert">Especialista</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Button
        type="button"
        startIcon={<AddIcon />}
        onClick={handleAddSkill}
        sx={{ mb: 3 }}
      >
        Adicionar Habilidade
      </Button>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {onBack && (
          <Button onClick={onBack} variant="outlined">
            Voltar
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          Próximo
        </Button>
      </Box>
    </form>
  );
};

export default SkillsForm;
