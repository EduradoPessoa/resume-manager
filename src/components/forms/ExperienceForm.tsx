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
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import type { Experience } from '../../types/resume'

interface ExperienceFormProps {
  data: Experience[]
  onUpdate: (data: Experience[]) => void
}

interface ExperienceDialogProps {
  open: boolean
  onClose: () => void
  onSave: (experience: Experience) => void
  initialData?: Experience
}

const defaultExperience: Experience = {
  id: 0,
  position: '',
  company: '',
  location: '',
  start_date: '',
  end_date: '',
  current: false,
  description: '',
}

const ExperienceDialog = ({ open, onClose, onSave, initialData }: ExperienceDialogProps) => {
  const [experience, setExperience] = useState<Experience>(initialData || defaultExperience)

  const handleSave = () => {
    if (!experience.id) {
      // Gera um novo ID numérico
      const newId = Math.floor(Math.random() * 1000000)
      onSave({ ...experience, id: newId })
    } else {
      onSave(experience)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Experiência' : 'Adicionar Experiência'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} className="pt-2">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cargo"
              value={experience.position}
              onChange={(e) => setExperience({ ...experience, position: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Empresa"
              value={experience.company}
              onChange={(e) => setExperience({ ...experience, company: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Localização"
              value={experience.location}
              onChange={(e) => setExperience({ ...experience, location: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Data de Início"
              type="date"
              value={experience.start_date}
              onChange={(e) => setExperience({ ...experience, start_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Data de Término"
              type="date"
              value={experience.end_date}
              onChange={(e) => setExperience({ ...experience, end_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              disabled={experience.current}
              required={!experience.current}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={experience.current}
                  onChange={(e) => setExperience({ ...experience, current: e.target.checked })}
                />
              }
              label="Emprego atual"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descrição"
              value={experience.description}
              onChange={(e) => setExperience({ ...experience, description: e.target.value })}
              required
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

const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | undefined>()

  const handleAdd = () => {
    setEditingExperience(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    onUpdate(data.filter((exp) => exp.id !== id))
  }

  const handleSave = (experience: Experience) => {
    if (editingExperience) {
      onUpdate(data.map((exp) => (exp.id === experience.id ? experience : exp)))
    } else {
      onUpdate([...data, experience])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="text-gray-700">
          Experiência Profissional
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

      <div className="space-y-4">
        {data.map((experience) => (
          <Card key={experience.id} variant="outlined">
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <Typography variant="h6">{experience.position}</Typography>
                  <Typography color="textSecondary">{experience.company}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {experience.start_date} - {experience.current ? 'Atual' : experience.end_date}
                  </Typography>
                  {experience.location && (
                    <Typography variant="body2" color="textSecondary">
                      {experience.location}
                    </Typography>
                  )}
                  <Typography className="mt-2">{experience.description}</Typography>
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(experience)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(experience.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Typography color="textSecondary" align="center">
            Nenhuma experiência adicionada
          </Typography>
        )}
      </div>

      <ExperienceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingExperience}
      />
    </div>
  )
}

export default ExperienceForm
