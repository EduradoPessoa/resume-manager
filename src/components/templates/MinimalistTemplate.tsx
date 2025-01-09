import React from 'react';
import { formatDate } from '../../utils/dateFormatter';
import type { Resume } from '../../types/resume';

interface MinimalistTemplateProps {
  resume: Resume;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ resume }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="text-center py-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
          <div className="flex justify-center space-x-4">
            {resume.personalInfo.linkedin && (
              <a
                href={resume.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
            {resume.personalInfo.website && (
              <a
                href={resume.personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            )}
            {resume.personalInfo.github && (
              <a
                href={resume.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Resumo Profissional</h2>
            <p className="text-gray-700">{resume.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Experiência Profissional</h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <span className="text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate!)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.company}</p>
                  <p className="text-gray-700">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Educação</h2>
            <div className="space-y-6">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-semibold">{edu.degree}</h3>
                    <span className="text-gray-600">
                      {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate!)}
                    </span>
                  </div>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-600">{edu.field}</p>
                  {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {edu.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4">Habilidades</h2>
            <div className="grid grid-cols-2 gap-4">
              {resume.skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-600">
                    {skill.level} • {skill.years} {skill.years === 1 ? 'ano' : 'anos'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalistTemplate;
