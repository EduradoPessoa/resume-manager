export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isAdmin: boolean;
  isBlocked: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  userId: string;
  adminId: string;
  subject: string;
  content: string;
  type: 'email' | 'whatsapp';
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export interface UserConsent {
  id: string;
  userId: string;
  type: 'terms' | 'privacy';
  granted: boolean;
  version: string;
  grantedAt: string;
}
