import { Container, Typography, Button, Grid, Paper } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

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

      <Grid container spacing={3}>
        {/* Template cards will go here */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <Typography variant="h6" className="mb-2">
              Currículo Profissional
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Um modelo profissional e moderno, ideal para destacar suas habilidades e experiências.
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

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <Typography variant="h6" className="mb-2">
              Currículo Criativo
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Um design criativo e único, perfeito para profissionais de áreas criativas.
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

        <Grid item xs={12} sm={6} md={4}>
          <Paper className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <Typography variant="h6" className="mb-2">
              Currículo Minimalista
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
              Um layout limpo e minimalista, focado em clareza e objetividade.
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
      </Grid>
    </Container>
  )
}

export default Home
