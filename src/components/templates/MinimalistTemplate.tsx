import React from 'react';
import { formatDate } from '../../utils/dateFormatter';
import type { Resume } from '../../types/resume';

interface MinimalistTemplateProps {
  resume: Resume;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ resume }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">{resume.personalInfo.fullName}</h1>
          <p className="text-gray-600">{resume.personalInfo.location}</p>
          <p className="text-gray-600">{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
          
          {resume.personalInfo.linkedin && (
            <a href={resume.personalInfo.linkedin} className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          
          {resume.personalInfo.github && (
            <a href={resume.personalInfo.github} className="text-blue-600 hover:underline ml-4">
              GitHub
            </a>
          )}
        </header>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4">Resumo Profissional</h2>
            <p className="text-gray-700">{resume.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4">Experiência Profissional</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                <p className="text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Presente' : formatDate(exp.endDate!)}
                </p>
                <p className="mt-2">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4">Educação</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                <p className="text-gray-600">
                  {formatDate(edu.startDate)} - {edu.current ? 'Presente' : formatDate(edu.endDate!)}
                </p>
                {edu.description && <p className="mt-2">{edu.description}</p>}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside mt-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 mb-4">Habilidades</h2>
            <div className="grid grid-cols-2 gap-4">
              {resume.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-600 ml-2">
                    ({skill.years} {skill.years === 1 ? 'ano' : 'anos'})
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
