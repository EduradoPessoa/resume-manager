import { databases } from '../src/config/appwrite';
import { DATABASES, COLLECTIONS } from '../src/config/collections';
import { ID } from 'appwrite';

async function migrateData() {
    try {
        // Get data from localStorage
        const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
        const templates = JSON.parse(localStorage.getItem('templates') || '[]');

        // Migrate resumes
        for (const resume of resumes) {
            await databases.createDocument(
                DATABASES.ID,
                COLLECTIONS.RESUMES.ID,
                ID.unique(),
                {
                    ...resume,
                    // Add any necessary transformations here
                    user_id: resume.userId || 'default' // Example transformation
                }
            );
        }

        // Migrate templates
        for (const template of templates) {
            await databases.createDocument(
                DATABASES.ID,
                COLLECTIONS.TEMPLATES.ID,
                ID.unique(),
                template
            );
        }

        console.log('Migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

// Run migration
migrateData();
