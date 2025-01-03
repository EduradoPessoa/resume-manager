import { Container, Typography, Paper, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { PictureAsPdf as PdfIcon, Edit as EditIcon } from '@mui/icons-material'

const ViewResume = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log('Downloading PDF...')
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" component="h1">
          Visualizar Currículo
        </Typography>
        <div className="space-x-4">
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit/${id}`)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            startIcon={<PdfIcon />}
            onClick={handleDownloadPDF}
          >
            Baixar PDF
          </Button>
        </div>
      </div>

      <Paper className="p-6">
        <Typography>
          Visualizando currículo ID: {id}
        </Typography>
      </Paper>
    </Container>
  )
}

export default ViewResume
