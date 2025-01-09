import { useState } from 'react';
import { storage } from '../config/appwrite';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);
      setError(null);

      const response = await storage.createFile(
        'default',
        crypto.randomUUID(),
        file
      );

      return response.$id;
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
    error
  };
};
