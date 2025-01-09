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
import type { Skill, SkillLevel } from '../../types';

export interface SkillsFormProps {
  data: Skill[];
  onUpdate: (skills: Skill[]) => void;
  onBack?: () => void;
}

interface InternalSkill extends Skill {
  id: string;
}

const emptySkill = (): InternalSkill => ({
  id: crypto.randomUUID(),
  name: '',
  level: 1,
  years: 0
});

const skillLevelLabels: Record<SkillLevel, string> = {
  1: 'Iniciante',
  2: 'Intermediário',
  3: 'Avançado',
  4: 'Especialista'
};

const SkillsForm = ({ data, onUpdate, onBack }: SkillsFormProps) => {
  const [skills, setSkills] = useState<InternalSkill[]>(
    data.map(skill => ({ ...skill, id: crypto.randomUUID() }))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateSkill = (skill: InternalSkill) => {
    const newErrors: Record<string, string> = {};

    if (!skill.name) {
      newErrors[`${skill.id}-name`] = 'O nome da habilidade é obrigatório';
    }
    if (skill.years < 0) {
      newErrors[`${skill.id}-years`] = 'Anos de experiência deve ser maior ou igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkills(updatedSkills);
    validateSkill(updatedSkills[index]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = skills.every(validateSkill);
    if (isValid) {
      onUpdate(skills.map(({ id, ...skill }) => skill));
    }
  };

  const addSkill = () => {
    setSkills([...skills, emptySkill()]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Habilidades
      </Typography>

      {skills.map((skill, index) => (
        <Box key={skill.id} sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <Typography variant="subtitle1">
                {skill.name || `Habilidade ${index + 1}`}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton 
                onClick={() => removeSkill(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome da Habilidade"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                error={!!errors[`${skill.id}-name`]}
                helperText={errors[`${skill.id}-name`]}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nível</InputLabel>
                <Select
                  value={skill.level}
                  label="Nível"
                  onChange={(e) => handleSkillChange(index, 'level', e.target.value as SkillLevel)}
                >
                  {Object.entries(skillLevelLabels).map(([value, label]) => (
                    <MenuItem key={value} value={Number(value)}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Anos de Experiência"
                type="number"
                value={skill.years}
                onChange={(e) => handleSkillChange(index, 'years', parseInt(e.target.value) || 0)}
                error={!!errors[`${skill.id}-years`]}
                helperText={errors[`${skill.id}-years`]}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Categoria"
                value={skill.category}
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<AddIcon />}
          onClick={addSkill}
          variant="outlined"
          fullWidth
        >
          Adicionar Habilidade
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        {onBack && (
          <Button onClick={onBack} variant="outlined">
            Voltar
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={skills.length === 0}
        >
          Próximo
        </Button>
      </Box>
    </form>
  );
};

export default SkillsForm;
