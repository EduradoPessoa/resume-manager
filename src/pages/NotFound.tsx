import { Container, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" className="py-16 text-center">
      <Typography variant="h1" className="mb-4 text-6xl font-bold text-gray-800">
        404
      </Typography>
      <Typography variant="h4" className="mb-4 text-gray-600">
        Página não encontrada
      </Typography>
      <Typography variant="body1" className="mb-8 text-gray-500">
        A página que você está procurando não existe ou foi movida.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
      >
        Voltar para a página inicial
      </Button>
    </Container>
  )
}

export default NotFound
