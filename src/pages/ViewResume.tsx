import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper } from '@mui/material';
import { getResume } from '../services/storage';
import type { Resume } from '../types/resume';

const ViewResume = () => {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      if (id) {
        try {
          const data = await getResume(id);
          setResume(data);
        } catch (error) {
          console.error('Error fetching resume:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!resume) {
    return <div>Resume not found</div>;
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Paper className="p-6">
        <h1 className="text-2xl font-bold mb-4">{resume.title}</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <div>
            <p><strong>Name:</strong> {resume.personal_info.name}</p>
            <p><strong>Email:</strong> {resume.personal_info.email}</p>
            <p><strong>Phone:</strong> {resume.personal_info.phone}</p>
            <p><strong>Location:</strong> {resume.personal_info.location}</p>
            {resume.personal_info.linkedin && (
              <p><strong>LinkedIn:</strong> {resume.personal_info.linkedin}</p>
            )}
            {resume.personal_info.portfolio && (
              <p><strong>Portfolio:</strong> {resume.personal_info.portfolio}</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-semibold">{exp.position}</h3>
              <p>{exp.company} - {exp.location}</p>
              <p>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
              <p>{edu.institution} - {edu.location}</p>
              <p>{edu.start_date} - {edu.current ? 'Present' : edu.end_date}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          {resume.skills.map((skill) => (
            <div key={skill.id} className="mb-2">
              <p>
                <strong>{skill.name}</strong> - {skill.level}
                {skill.years > 0 && ` (${skill.years} years)`}
              </p>
            </div>
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default ViewResume;
