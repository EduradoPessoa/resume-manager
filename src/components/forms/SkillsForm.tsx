import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  IconButton,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Skill } from '../../types/resume'

interface SkillsFormProps {
  data: Skill[]
  onUpdate: (data: Skill[]) => void
}

interface SkillDialogProps {
  open: boolean
  onClose: () => void
  onSave: (skill: Skill) => void
  initialData?: Skill
}

const skillLevels = ['Básico', 'Intermediário', 'Avançado', 'Especialista'] as const

const defaultSkill: Skill = {
  id: 0,
  name: '',
  level: 'Intermediário',
  years: 0,
}

const SkillDialog = ({ open, onClose, onSave, initialData }: SkillDialogProps) => {
  const [skill, setSkill] = useState<Skill>(initialData || defaultSkill)

  const handleSave = () => {
    if (!skill.id) {
      const newId = Math.floor(Math.random() * 1000000)
      onSave({ ...skill, id: newId })
    } else {
      onSave(skill)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Habilidade' : 'Adicionar Habilidade'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} className="pt-2">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da Habilidade"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Nível</InputLabel>
              <Select
                value={skill.level}
                label="Nível"
                onChange={(e) => setSkill({ ...skill, level: e.target.value as typeof skillLevels[number] })}
              >
                {skillLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Anos de Experiência"
              value={skill.years}
              onChange={(e) => setSkill({ ...skill, years: Number(e.target.value) })}
              inputProps={{ min: 0, step: 1 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>()

  const handleAdd = () => {
    setEditingSkill(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    onUpdate(data.filter((skill) => skill.id !== id))
  }

  const handleSave = (skill: Skill) => {
    if (editingSkill) {
      onUpdate(data.map((s) => (s.id === skill.id ? skill : s)))
    } else {
      onUpdate([...data, skill])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="text-gray-700">
          Habilidades
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Adicionar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill) => (
          <Card key={skill.id} variant="outlined">
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <Typography variant="h6">{skill.name}</Typography>
                  <Typography color="textSecondary">
                    {skill.level} • {skill.years} {skill.years === 1 ? 'ano' : 'anos'}
                  </Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(skill)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(skill.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {data.length === 0 && (
        <Typography color="textSecondary" align="center">
          Nenhuma habilidade adicionada
        </Typography>
      )}

      <SkillDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingSkill}
      />
    </div>
  )
}

export default SkillsForm
