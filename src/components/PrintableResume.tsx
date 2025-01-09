import React from 'react';
import { formatDate } from '../utils/dateFormatter';
import type { Resume } from '../types/resume';

interface PrintableResumeProps {
  resume: Resume;
}

const PrintableResume: React.FC<PrintableResumeProps> = ({ resume }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{resume.personalInfo.fullName}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{resume.personalInfo.email}</p>
          <p>{resume.personalInfo.phone}</p>
          <p>{resume.personalInfo.location}</p>
          {resume.personalInfo.linkedin && (
            <p>
              <a
                href={resume.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          )}
          {resume.personalInfo.website && (
            <p>
              <a
                href={resume.personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            </p>
          )}
        </div>
      </header>

      {/* Summary */}
      {resume.personalInfo.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumo Profissional</h2>
          <p className="text-gray-700">{resume.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Experiência Profissional</h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-gray-600">
                  {exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate!)}
                </p>
                <p className="mt-2 text-gray-700">{exp.description}</p>
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
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Educação</h2>
          <div className="space-y-6">
            {resume.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.institution} | {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate!)}
                </p>
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
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Habilidades</h2>
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
  );
};

export default PrintableResume;
