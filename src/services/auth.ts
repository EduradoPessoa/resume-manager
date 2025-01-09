import { Account, Client, ID } from 'appwrite';
import { appwriteClient } from '../config/appwrite';

export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
}

class AuthService {
  private account: Account;

  constructor() {
    this.account = new Account(appwriteClient);
  }

  async createAccount(email: string, password: string, name: string): Promise<User> {
    try {
      const response = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      return {
        id: response.$id,
        email: response.email,
        name: response.name,
        isPremium: false
      };
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const session = await this.account.createEmailSession(email, password);
      const account = await this.account.get();

      return {
        id: account.$id,
        email: account.email,
        name: account.name,
        isPremium: false
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const account = await this.account.get();
      return {
        id: account.$id,
        email: account.email,
        name: account.name,
        isPremium: false
      };
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
