import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { getResumes, deleteResume } from '../services/storage'
import type { Resume } from '../types/resume'

const ResumeList = () => {
  const navigate = useNavigate()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = () => {
    const loadedResumes = getResumes()
    setResumes(loadedResumes)
  }

  const handleDelete = (id: string) => {
    try {
      deleteResume(id)
      loadResumes()
    } catch (err) {
      console.error('Erro ao excluir currículo:', err)
    }
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, resumeId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedResumeId(resumeId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedResumeId(null)
  }

  const handleAction = (action: 'view' | 'edit' | 'delete') => {
    if (!selectedResumeId) return

    switch (action) {
      case 'view':
        navigate(`/view/${selectedResumeId}`)
        break
      case 'edit':
        navigate(`/edit/${selectedResumeId}`)
        break
      case 'delete':
        handleDelete(selectedResumeId)
        break
    }

    handleMenuClose()
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" component="h1" className="text-gray-800 font-bold">
          Meus Currículos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/new')}
        >
          Novo Currículo
        </Button>
      </div>

      <Grid container spacing={3}>
        {resumes.map((resume) => (
          <Grid item xs={12} sm={6} md={4} key={resume.id}>
            <Card className="h-full flex flex-col">
              <CardContent className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <Typography variant="h6" component="h2" className="text-gray-800">
                      {resume.title}
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-600 mb-1">
                      {resume.personal_info.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Criado em {new Date(resume.created_at).toLocaleDateString()}
                      <br />
                      Template: {resume.template_id === 'modern' ? 'Moderno' : 'Minimalista'}
                    </Typography>
                  </div>
                  <IconButton
                    aria-label="mais opções"
                    onClick={(e) => handleMenuClick(e, resume.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ViewIcon className="mr-2" /> Visualizar
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <EditIcon className="mr-2" /> Editar
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} className="text-red-600">
          <DeleteIcon className="mr-2" /> Excluir
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default ResumeList
