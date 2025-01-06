import React from 'react'
import type { Resume } from '../types/resume'
import { formatDate } from '../utils/date'

interface PrintableResumeProps {
  resume: Resume
}

const PrintableResume: React.FC<PrintableResumeProps> = ({ resume }) => {
  return (
    <div className="print-container">
      {/* Cabeçalho */}
      <div className="header">
        <h1>{resume.personal_info.name}</h1>
        <div className="contact-info">
          {resume.personal_info.email && <span>{resume.personal_info.email}</span>}
          {resume.personal_info.phone && <span>{resume.personal_info.phone}</span>}
          {resume.personal_info.location && <span>{resume.personal_info.location}</span>}
          {resume.personal_info.linkedin && (
            <span>
              <a href={resume.personal_info.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </span>
          )}
          {resume.personal_info.portfolio && (
            <span>
              <a href={resume.personal_info.portfolio} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Perfil */}
      {resume.personal_info.about && (
        <div className="section">
          <h2>Profile</h2>
          <div dangerouslySetInnerHTML={{ __html: resume.personal_info.about }} />
        </div>
      )}

      {/* Experiência */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="section">
          <h2>Work Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="item">
              <div className="item-header">
                <h3>{exp.position}</h3>
                <span className="date">
                  {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                </span>
              </div>
              <div className="item-subheader">
                <span className="company">{exp.company}</span>
                {exp.location && <span className="location">{exp.location}</span>}
              </div>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Educação */}
      {resume.education && resume.education.length > 0 && (
        <div className="section">
          <h2>Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="item">
              <div className="item-header">
                <h3>{edu.degree}</h3>
                <span className="date">
                  {formatDate(edu.start_date)} - {edu.current ? 'Present' : formatDate(edu.end_date)}
                </span>
              </div>
              <div className="item-subheader">
                <span className="institution">{edu.institution}</span>
                {edu.location && <span className="location">{edu.location}</span>}
              </div>
              {edu.description && (
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: edu.description }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Habilidades */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PrintableResume
