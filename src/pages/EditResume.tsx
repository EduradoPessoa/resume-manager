import { Container, Typography, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'

const EditResume = () => {
  const { id } = useParams()

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper className="p-6">
        <Typography variant="h4" component="h1" className="mb-6">
          Editar Currículo
        </Typography>
        <Typography>
          Editando currículo ID: {id}
        </Typography>
      </Paper>
    </Container>
  )
}

export default EditResume
