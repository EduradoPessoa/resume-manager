import React, { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useResumes } from '../hooks/useResumes'
import { getResume, updateResume } from '../services/storage'
import { generatePDF } from '../utils/pdfGenerator'
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  IconButton,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import {
  Download as DownloadIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon
} from '@mui/icons-material'
import html2pdf from 'html2pdf.js'
import type { Resume, TemplateId } from '../types/resume'
import ModernTemplate from '../components/templates/ModernTemplate'
import MinimalistTemplate from '../components/templates/MinimalistTemplate'
import Watermark from '../components/Watermark'

const ViewResume: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [resume, setResume] = useState<Resume | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('modern')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) return

    try {
      const loadedResume = getResume(id)
      if (!loadedResume) {
        setError('Currículo não encontrado')
        return
      }
      setResume(loadedResume)
      setSelectedTemplate(loadedResume.template_id)
    } catch (err) {
      console.error('Erro ao carregar currículo:', err)
      setError('Erro ao carregar currículo')
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleDownloadPDF = async () => {
    if (!resume || !printRef.current) return

    const element = printRef.current
    // Temporariamente remove a classe hidden para gerar o PDF
    element.classList.remove('hidden')
    
    const opt = {
      margin: [5, 5, 5, 5], // [top, right, bottom, left] em mm
      filename: `${resume.personal_info.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true,
        width: 827, // A4 width in pixels at 96 DPI
        windowWidth: 827
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        hotfixes: ['px_scaling']
      }
    }

    try {
      await html2pdf().set(opt).from(element).save()
    } catch (err) {
      console.error('Erro ao gerar PDF:', err)
      setError('Erro ao gerar PDF')
    } finally {
      // Restaura a classe hidden
      element.classList.add('hidden')
    }
  }

  const handleTemplateChange = (newTemplate: TemplateId) => {
    if (!resume || !id) return

    try {
      const updatedResume = {
        ...resume,
        template_id: newTemplate,
        updated_at: new Date().toISOString()
      }
      updateResume(id, updatedResume)
      setResume(updatedResume)
      setSelectedTemplate(newTemplate)
    } catch (err) {
      console.error('Erro ao atualizar template:', err)
      setError('Erro ao atualizar template')
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Paper className="p-6">
          <Typography>Carregando...</Typography>
        </Paper>
      </Container>
    )
  }

  if (error || !resume) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Paper className="p-6">
          <Typography color="error">{error || 'Currículo não encontrado'}</Typography>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <Typography variant="h4" component="h1" className="text-gray-800 font-bold">
            {resume.personal_info.name}
          </Typography>

          <div className="flex gap-2">
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/edit/${id}`)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ContentCopyIcon />}
              onClick={() => navigate(`/copy/${id}`)}
            >
              Copiar
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <FormControl size="small">
            <InputLabel>Template</InputLabel>
            <Select
              value={selectedTemplate}
              label="Template"
              onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
            >
              <MenuItem value="modern">Moderno</MenuItem>
              <MenuItem value="minimalist">Minimalista</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Template para visualização na tela */}
        <div className="no-print">
          {selectedTemplate === 'modern' ? (
            <ModernTemplate resume={resume} />
          ) : (
            <MinimalistTemplate resume={resume} />
          )}
        </div>

        {/* Template para impressão */}
        <div ref={printRef} className="hidden print-only">
          {selectedTemplate === 'modern' ? (
            <ModernTemplate resume={resume} />
          ) : (
            <MinimalistTemplate resume={resume} />
          )}
          {!user?.isPremium && <Watermark />}
        </div>

        {/* Mensagem para usuários não premium */}
        {!user?.isPremium && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Remova a marca d'água!
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Assine o plano profissional por apenas R$ 9,00/mês e tenha acesso a currículos sem marca d'água.{' '}
                    <button
                      onClick={() => navigate('/upgrade')}
                      className="font-medium underline hover:text-blue-800"
                    >
                      Saiba mais
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Paper>
    </Container>
  )
}

export default ViewResume
