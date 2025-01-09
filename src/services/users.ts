import { ID, Query, Permission, Role } from 'appwrite';
import { databases } from '../config/appwrite';
import type { User, Message, UserConsent } from '../types/user';

const USERS_COLLECTION = process.env.VITE_APPWRITE_USERS_COLLECTION_ID!;
const MESSAGES_COLLECTION = process.env.VITE_APPWRITE_MESSAGES_COLLECTION_ID!;
const CONSENTS_COLLECTION = process.env.VITE_APPWRITE_CONSENTS_COLLECTION_ID!;
const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID!;

export const createUser = async (userData: Partial<User>): Promise<User> => {
  try {
    const user = await databases.createDocument(
      DATABASE_ID,
      USERS_COLLECTION,
      ID.unique(),
      {
        ...userData,
        isAdmin: false,
        isBlocked: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(userData.id!)),
        Permission.update(Role.user(userData.id!)),
        Permission.read(Role.users()),
        Permission.write(Role.users()),
      ]
    );
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  try {
    const user = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION,
      userId,
      {
        ...userData,
        updatedAt: new Date().toISOString(),
      }
    );
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    // Primeiro, anonimizamos os dados do usuário
    await updateUser(userId, {
      name: '[Usuário Removido]',
      email: `deleted_${userId}@example.com`,
      dataUsagePreferences: {
        marketing: false,
        analytics: false,
        thirdParty: false,
      },
    });

    // Depois, marcamos como excluído (soft delete)
    await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION,
      userId,
      {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const blockUser = async (userId: string): Promise<User> => {
  try {
    const user = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION,
      userId,
      {
        isBlocked: true,
        updatedAt: new Date().toISOString(),
      }
    );
    return user;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

export const unblockUser = async (userId: string): Promise<User> => {
  try {
    const user = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION,
      userId,
      {
        isBlocked: false,
        updatedAt: new Date().toISOString(),
      }
    );
    return user;
  } catch (error) {
    console.error('Error unblocking user:', error);
    throw error;
  }
};

export const sendMessage = async (
  adminId: string,
  userId: string,
  subject: string,
  content: string
): Promise<Message> => {
  try {
    const message = await databases.createDocument(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      ID.unique(),
      {
        adminId,
        userId,
        subject,
        content,
        read: false,
        createdAt: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(userId)),
        Permission.read(Role.user(adminId)),
      ]
    );
    return message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getUserMessages = async (userId: string): Promise<Message[]> => {
  try {
    const messages = await databases.listDocuments(
      DATABASE_ID,
      MESSAGES_COLLECTION,
      [
        Query.equal('userId', userId),
        Query.orderDesc('createdAt'),
      ]
    );
    return messages.documents as Message[];
  } catch (error) {
    console.error('Error getting user messages:', error);
    throw error;
  }
};

export const recordConsent = async (
  userId: string,
  type: UserConsent['type'],
  granted: boolean,
  ipAddress: string
): Promise<UserConsent> => {
  try {
    const consent = await databases.createDocument(
      DATABASE_ID,
      CONSENTS_COLLECTION,
      ID.unique(),
      {
        userId,
        type,
        granted,
        ipAddress,
        timestamp: new Date().toISOString(),
      },
      [
        Permission.read(Role.user(userId)),
        Permission.read(Role.users()),
      ]
    );
    return consent;
  } catch (error) {
    console.error('Error recording consent:', error);
    throw error;
  }
};

export const getUserConsents = async (userId: string): Promise<UserConsent[]> => {
  try {
    const consents = await databases.listDocuments(
      DATABASE_ID,
      CONSENTS_COLLECTION,
      [
        Query.equal('userId', userId),
        Query.orderDesc('timestamp'),
      ]
    );
    return consents.documents as UserConsent[];
  } catch (error) {
    console.error('Error getting user consents:', error);
    throw error;
  }
};
