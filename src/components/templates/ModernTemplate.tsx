import React from 'react';
import { formatDate } from '../../utils/dateFormatter';
import type { Resume } from '../../types/resume';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-navy text-white p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
          <p className="text-sm text-gray-300">{resume.personalInfo.email}</p>
          <p className="text-sm text-gray-300">{resume.personalInfo.phone}</p>
          <p className="text-sm text-gray-300">{resume.personalInfo.location}</p>
        </div>

        {resume.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Sobre</h2>
            <p className="text-sm text-gray-300">{resume.personalInfo.summary}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Links</h2>
          <div className="space-y-2">
            {resume.personalInfo.linkedin && (
              <a
                href={resume.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white block"
              >
                LinkedIn
              </a>
            )}
            {resume.personalInfo.website && (
              <a
                href={resume.personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white block"
              >
                Website
              </a>
            )}
            {resume.personalInfo.github && (
              <a
                href={resume.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white block"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Experiência Profissional</h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-navy pl-4">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-gray-600 mb-2">
                    {exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate!)}
                  </p>
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
            <h2 className="text-2xl font-bold mb-4">Educação</h2>
            <div className="space-y-6">
              {resume.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-navy pl-4">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <p className="text-gray-600 mb-1">
                    {edu.institution} | {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate!)}
                  </p>
                  <p className="text-gray-600">{edu.field}</p>
                  {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
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
            <h2 className="text-2xl font-bold mb-4">Habilidades</h2>
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

export default ModernTemplate;
