import { Container, Typography, Button, Grid, Paper } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getResumeTemplates, getResumes } from '../services/storage'
import type { Resume, ResumeTemplate } from '../types/resume'

const Home = () => {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState<ResumeTemplate[]>([])
  const [resumes, setResumes] = useState<Resume[]>([])

  useEffect(() => {
    setTemplates(getResumeTemplates())
    setResumes(getResumes())
  }, [])

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-8">
        <Typography variant="h4" component="h1">
          Meus Currículos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
        >
          Criar Novo Currículo
        </Button>
      </div>

      {resumes.length > 0 && (
        <>
          <Typography variant="h5" className="mb-4">
            Currículos Existentes
          </Typography>
          <Grid container spacing={3} className="mb-8">
            {resumes.map((resume) => (
              <Grid item xs={12} sm={6} md={4} key={resume.id}>
                <Paper className="p-4 hover:shadow-lg transition-shadow">
                  <Typography variant="h6" className="mb-2">
                    {resume.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="mb-4">
                    {resume.personal_info.title}
                  </Typography>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/edit/${resume.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => navigate(`/view/${resume.id}`)}
                    >
                      Visualizar
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Typography variant="h5" className="mb-4">
        Templates Disponíveis
      </Typography>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Paper className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <Typography variant="h6" className="mb-2">
                {template.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="mb-4">
                {template.description}
              </Typography>
              <div className="flex justify-end">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate('/create')}
                >
                  Usar este modelo
                </Button>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
