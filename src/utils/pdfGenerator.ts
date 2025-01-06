import html2pdf from 'html2pdf.js'
import type { Resume } from '../types/resume'

export const generatePDF = async (resume: Resume): Promise<void> => {
  const element = document.getElementById('resume-content')
  if (!element) return

  const opt = {
    margin: [10, 10],
    filename: `${resume.personal_info.name.toLowerCase().replace(/\s+/g, '-')}-curriculo.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      logging: false,
      useCORS: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait'
    }
  }

  try {
    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
  }
}
