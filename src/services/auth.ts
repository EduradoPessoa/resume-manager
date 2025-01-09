import { ID } from 'appwrite';
import { appwrite } from '../config/appwrite';
import { createUser, updateUser } from './users';
import type { User } from '../types/user';

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  isAdmin: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  consentTerms: boolean;
  dataUsagePreferences: {
    marketing: boolean;
    analytics: boolean;
    thirdParty: boolean;
  };
}

export const register = async (
  email: string,
  password: string,
  name: string,
  consentTerms: boolean,
  dataUsagePreferences: User['dataUsagePreferences']
): Promise<User> => {
  try {
    // Criar conta no Appwrite
    const account = await appwrite.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Criar documento do usuário com as preferências de LGPD
    const user = await createUser({
      id: account.$id,
      email,
      name,
      consentTerms,
      dataUsagePreferences,
      isAdmin: email === 'admin@phoenyx.com.br',
    });

    // Fazer login automaticamente
    await login(email, password);

    return user;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    // Criar sessão no Appwrite
    await appwrite.account.createSession(email, password);

    // Buscar usuário atual
    const currentUser = await getCurrentUser();

    if (currentUser && currentUser.isBlocked) {
      await logout();
      throw new Error('Sua conta está bloqueada. Entre em contato com o suporte.');
    }

    // Atualizar último login
    if (currentUser) {
      await updateUser(currentUser.id, {
        lastLogin: new Date().toISOString(),
      });
    }

    return currentUser;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await appwrite.account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const account = await appwrite.account.get();
    return {
      id: account.$id,
      email: account.email,
      name: account.name,
      isAdmin: account.email === 'admin@phoenyx.com.br',
      isBlocked: false, // Será atualizado quando buscarmos do banco
      createdAt: account.$createdAt,
      updatedAt: account.$updatedAt,
      consentTerms: true, // Será atualizado quando buscarmos do banco
      dataUsagePreferences: {
        marketing: false,
        analytics: false,
        thirdParty: false,
      }, // Será atualizado quando buscarmos do banco
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
