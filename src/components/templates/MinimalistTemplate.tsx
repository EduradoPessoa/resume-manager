import React from 'react'
import type { Resume } from '../../types/resume'
import { formatDate, getCurrentText } from '../../utils/date'

interface MinimalistTemplateProps {
  resume: Resume
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ resume }) => {
  return (
    <div className="p-8 space-y-6">
      {/* Cabeçalho */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{resume.personal_info.name}</h1>
        <div className="text-sm space-x-2">
          {resume.personal_info.email && <span>{resume.personal_info.email}</span>}
          {resume.personal_info.phone && <span>• {resume.personal_info.phone}</span>}
          {resume.personal_info.location && <span>• {resume.personal_info.location}</span>}
          {resume.personal_info.linkedin && (
            <span>
              • <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {resume.personal_info.portfolio && (
            <span>
              • <a href={resume.personal_info.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Perfil */}
      {resume.personal_info.about && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Perfil</h2>
          <div dangerouslySetInnerHTML={{ __html: resume.personal_info.about }} />
        </div>
      )}

      {/* Experiência */}
      {resume.experience && resume.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Experiência</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-sm">
                  {formatDate(exp.start_date, 'pt-BR')} - {exp.current ? getCurrentText('pt-BR') : formatDate(exp.end_date, 'pt-BR')}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{exp.company}</span>
                {exp.location && <span className="text-gray-600"> • {exp.location}</span>}
              </div>
              <div
                className="text-sm mt-1"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Educação */}
      {resume.education && resume.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Educação</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{edu.degree}</h3>
                <span className="text-sm">
                  {formatDate(edu.start_date, 'pt-BR')} - {edu.current ? getCurrentText('pt-BR') : formatDate(edu.end_date, 'pt-BR')}
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{edu.institution}</span>
                {edu.location && <span className="text-gray-600"> • {edu.location}</span>}
              </div>
              {edu.description && (
                <div
                  className="text-sm mt-1"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Habilidades */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold border-b pb-1 mb-2">Habilidades</h2>
          <div className="grid grid-cols-2 gap-2">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center text-sm">
                <span>{skill.name}</span>
                <span className="text-gray-600">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MinimalistTemplate
