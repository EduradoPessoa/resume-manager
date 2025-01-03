import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" className="py-16">
      <div className="text-center">
        <Typography variant="h1" className="mb-4">
          404
        </Typography>
        <Typography variant="h4" className="mb-4">
          Página não encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-8">
          A página que você está procurando não existe ou foi movida.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
        >
          Voltar para a página inicial
        </Button>
      </div>
    </Container>
  )
}

export default NotFound
