import { useState } from 'react';
import { storage } from '../config/appwrite';
import { ID } from 'appwrite';
import { STORAGE } from '../config/collections';

export const useFileUpload = (bucketId: string) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const upload = async (file: File) => {
        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            const fileId = ID.unique();
            
            // Upload the file
            await storage.createFile(
                bucketId,
                fileId,
                file
            );

            // Get the file URL
            const fileUrl = storage.getFileView(bucketId, fileId);
            
            setProgress(100);
            return { fileId, fileUrl };
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const deleteFile = async (fileId: string) => {
        try {
            await storage.deleteFile(bucketId, fileId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Delete failed');
            throw err;
        }
    };

    return {
        upload,
        deleteFile,
        uploading,
        progress,
        error
    };
};

export default useFileUpload;
