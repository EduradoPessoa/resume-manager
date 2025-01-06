import React from 'react'
import type { Resume } from '../../types/resume'
import { formatDate } from '../../utils/date'

interface ModernTemplateProps {
  resume: Resume
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Coluna da esquerda - Informações principais */}
      <div className="flex-grow space-y-6 max-w-3xl">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4">
          {resume.personal_info.photo && (
            <img
              src={resume.personal_info.photo}
              alt={resume.personal_info.name}
              className="w-24 h-24 rounded-full"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {resume.personal_info.name}
            </h1>
          </div>
        </div>

        {/* Perfil */}
        {resume.personal_info.about && (
          <section>
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: resume.personal_info.about }}
            />
          </section>
        )}

        {/* Experiência */}
        {resume.experience && resume.experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    {exp.company} • {exp.location}
                  </div>
                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Educação */}
        {resume.education && resume.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="space-y-6">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.start_date)} - {edu.current ? 'Present' : formatDate(edu.end_date)}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    {edu.institution} • {edu.location}
                  </div>
                  {edu.description && (
                    <div
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{ __html: edu.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Coluna da direita - Contato e Habilidades */}
      <div className="md:w-64 space-y-6">
        <div className="bg-navy text-white p-6 rounded-lg space-y-6">
          {/* Contato */}
          <section>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="space-y-2 text-gray-200">
              <div>{resume.personal_info.email}</div>
              <div>{resume.personal_info.phone}</div>
              <div>{resume.personal_info.location}</div>
              {resume.personal_info.linkedin && (
                <div>
                  <a
                    href={resume.personal_info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Links */}
          {resume.personal_info.portfolio && (
            <section>
              <h2 className="text-xl font-bold mb-4">Links</h2>
              <div>
                <a
                  href={resume.personal_info.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-white"
                >
                  Portfolio
                </a>
              </div>
            </section>
          )}

          {/* Habilidades */}
          {resume.skills && resume.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="space-y-2">
                {resume.skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-200">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModernTemplate
