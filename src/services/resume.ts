import { databases } from '../config/appwrite';
import { Resume } from '../types/resume';

export const createResume = async (resume: Resume): Promise<string> => {
  try {
    const response = await databases.createDocument(
      'default',
      'resumes',
      resume.id,
      resume
    );
    return response.$id;
  } catch (error) {
    console.error('Error creating resume:', error);
    throw error;
  }
};

export const getResume = async (id: string): Promise<Resume | null> => {
  try {
    const response = await databases.getDocument('default', 'resumes', id);
    return response as unknown as Resume;
  } catch (error) {
    console.error('Error getting resume:', error);
    return null;
  }
};

export const updateResume = async (id: string, data: Partial<Resume>): Promise<Resume | null> => {
  try {
    const response = await databases.updateDocument('default', 'resumes', id, data);
    return response as unknown as Resume;
  } catch (error) {
    console.error('Error updating resume:', error);
    return null;
  }
};

export const deleteResume = async (id: string): Promise<boolean> => {
  try {
    await databases.deleteDocument('default', 'resumes', id);
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
};

export const listResumes = async (): Promise<Resume[]> => {
  try {
    const response = await databases.listDocuments('default', 'resumes');
    return response.documents as unknown as Resume[];
  } catch (error) {
    console.error('Error listing resumes:', error);
    return [];
  }
};
