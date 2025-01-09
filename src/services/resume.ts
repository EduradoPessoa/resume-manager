import { ID, Query } from 'appwrite';
import { databases, storage } from '../config/appwrite';
import { DATABASES, COLLECTIONS, STORAGE } from '../config/collections';
import type { Resume } from '../types/resume';

export const resumeService = {
    // Create a new resume
    async create(resume: Resume, userId: string) {
        return await databases.createDocument(
            DATABASES.ID,
            COLLECTIONS.RESUMES.ID,
            ID.unique(),
            {
                ...resume,
                user_id: userId
            }
        );
    },

    // Get all resumes for a user
    async list(userId: string) {
        return await databases.listDocuments(
            DATABASES.ID,
            COLLECTIONS.RESUMES.ID,
            [
                Query.equal('user_id', userId)
            ]
        );
    },

    // Get a specific resume
    async get(resumeId: string) {
        return await databases.getDocument(
            DATABASES.ID,
            COLLECTIONS.RESUMES.ID,
            resumeId
        );
    },

    // Update a resume
    async update(resumeId: string, resume: Partial<Resume>) {
        return await databases.updateDocument(
            DATABASES.ID,
            COLLECTIONS.RESUMES.ID,
            resumeId,
            resume
        );
    },

    // Delete a resume
    async delete(resumeId: string) {
        return await databases.deleteDocument(
            DATABASES.ID,
            COLLECTIONS.RESUMES.ID,
            resumeId
        );
    },

    // Upload profile photo
    async uploadPhoto(file: File, userId: string) {
        const fileId = ID.unique();
        await storage.createFile(
            STORAGE.BUCKETS.PHOTOS.ID,
            fileId,
            file
        );
        return fileId;
    },

    // Get photo preview URL
    getPhotoUrl(fileId: string) {
        return storage.getFilePreview(
            STORAGE.BUCKETS.PHOTOS.ID,
            fileId,
            400, // width
            400  // height
        );
    },

    // Delete photo
    async deletePhoto(fileId: string) {
        return await storage.deleteFile(
            STORAGE.BUCKETS.PHOTOS.ID,
            fileId
        );
    }
};
