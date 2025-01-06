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
import type { Education } from '../../types/resume'

interface EducationFormProps {
  data: Education[]
  onUpdate: (data: Education[]) => void
}

interface EducationDialogProps {
  open: boolean
  onClose: () => void
  onSave: (education: Education) => void
  initialData?: Education
}

const defaultEducation: Education = {
  id: 0,
  institution: '',
  degree: '',
  field: '',
  location: '',
  start_date: '',
  end_date: '',
  current: false,
  description: '',
}

const EducationDialog = ({ open, onClose, onSave, initialData }: EducationDialogProps) => {
  const [education, setEducation] = useState<Education>(initialData || defaultEducation)

  const handleSave = () => {
    if (!education.id) {
      const newId = Math.floor(Math.random() * 1000000)
      onSave({ ...education, id: newId })
    } else {
      onSave(education)
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Editar Educação' : 'Adicionar Educação'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3} className="pt-2">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Instituição"
              value={education.institution}
              onChange={(e) => setEducation({ ...education, institution: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Grau"
              value={education.degree}
              onChange={(e) => setEducation({ ...education, degree: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Área"
              value={education.field}
              onChange={(e) => setEducation({ ...education, field: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Localização"
              value={education.location}
              onChange={(e) => setEducation({ ...education, location: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Data de Início"
              type="date"
              value={education.start_date}
              onChange={(e) => setEducation({ ...education, start_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Data de Término"
              type="date"
              value={education.end_date}
              onChange={(e) => setEducation({ ...education, end_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              disabled={education.current}
              required={!education.current}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={education.current}
                  onChange={(e) => setEducation({ ...education, current: e.target.checked })}
                />
              }
              label="Cursando atualmente"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descrição"
              value={education.description}
              onChange={(e) => setEducation({ ...education, description: e.target.value })}
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

const EducationForm = ({ data, onUpdate }: EducationFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingEducation, setEditingEducation] = useState<Education | undefined>()

  const handleAdd = () => {
    setEditingEducation(undefined)
    setDialogOpen(true)
  }

  const handleEdit = (education: Education) => {
    setEditingEducation(education)
    setDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    onUpdate(data.filter((edu) => edu.id !== id))
  }

  const handleSave = (education: Education) => {
    if (editingEducation) {
      onUpdate(data.map((edu) => (edu.id === education.id ? education : edu)))
    } else {
      onUpdate([...data, education])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="text-gray-700">
          Educação
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
        {data.map((education) => (
          <Card key={education.id} variant="outlined">
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <Typography variant="h6">{education.degree}</Typography>
                  <Typography color="textSecondary">{education.institution}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {education.field}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {education.start_date} - {education.current ? 'Atual' : education.end_date}
                  </Typography>
                  {education.location && (
                    <Typography variant="body2" color="textSecondary">
                      {education.location}
                    </Typography>
                  )}
                  {education.description && (
                    <Typography className="mt-2">{education.description}</Typography>
                  )}
                </div>
                <div>
                  <IconButton onClick={() => handleEdit(education)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(education.id)} size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {data.length === 0 && (
          <Typography color="textSecondary" align="center">
            Nenhuma educação adicionada
          </Typography>
        )}
      </div>

      <EducationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingEducation}
      />
    </div>
  )
}

export default EducationForm
