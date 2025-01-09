import React from 'react';
import { Resume } from '../../types';

interface ModernTemplateProps {
  resume: Resume;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ resume }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 bg-blue-50 p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-blue-900">{resume.personalInfo.fullName}</h1>
          <p className="text-blue-700 mt-2">{resume.personalInfo.location}</p>
          <p className="text-blue-700">{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
          
          <div className="mt-4 space-x-4">
            {resume.personalInfo.linkedin && (
              <a href={resume.personalInfo.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
            
            {resume.personalInfo.github && (
              <a href={resume.personalInfo.github} className="text-blue-600 hover:underline">
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
              Resumo Profissional
            </h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
              Experiência Profissional
            </h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-semibold text-blue-800">{exp.position}</h3>
                </div>
                <p className="text-blue-700">{exp.company} • {exp.location}</p>
                <p className="text-gray-600 mb-2">
                  {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                </p>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700 ml-4">{achievement}</li>
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
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
              Educação
            </h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-blue-800">{edu.degree}</h3>
                <p className="text-blue-700">{edu.institution} • {edu.location}</p>
                <p className="text-gray-600 mb-2">
                  {edu.startDate} - {edu.current ? 'Presente' : edu.endDate}
                </p>
                {edu.description && <p className="text-gray-700 mb-2">{edu.description}</p>}
                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="text-gray-700 ml-4">{achievement}</li>
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
            <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b-2 border-blue-200 pb-2">
              Habilidades
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {resume.skills.map((skill, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <span className="font-medium text-blue-800">{skill.name}</span>
                  <span className="text-blue-600 ml-2">
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

export default ModernTemplate;
