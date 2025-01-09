export const DATABASES = {
    ID: 'resume-manager-db'
};

export const COLLECTIONS = {
    RESUMES: {
        ID: 'resumes',
        INDEXES: [
            { key: 'user_id', type: 'key', attributes: ['user_id'] },
            { key: 'title', type: 'fulltext', attributes: ['title'] }
        ],
        PERMISSIONS: {
            read: ['user:{{user_id}}'],
            write: ['user:{{user_id}}']
        }
    },
    TEMPLATES: {
        ID: 'templates',
        INDEXES: [
            { key: 'name', type: 'fulltext', attributes: ['name'] }
        ],
        PERMISSIONS: {
            read: ['any'],
            write: ['role:admin']
        }
    }
};

export const STORAGE = {
    ID: 'resume-files',
    BUCKETS: {
        PHOTOS: {
            ID: 'profile-photos',
            PERMISSIONS: {
                read: ['any'],
                write: ['user:{{user_id}}']
            }
        },
        ATTACHMENTS: {
            ID: 'resume-attachments',
            PERMISSIONS: {
                read: ['user:{{user_id}}'],
                write: ['user:{{user_id}}']
            }
        }
    }
};
