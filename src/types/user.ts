export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  consentTerms: boolean;
  dataUsagePreferences: {
    marketing: boolean;
    analytics: boolean;
    thirdParty: boolean;
  };
}

export interface Message {
  id: string;
  userId: string;
  adminId: string;
  subject: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface UserConsent {
  id: string;
  userId: string;
  type: 'terms' | 'privacy' | 'marketing' | 'analytics' | 'thirdParty';
  granted: boolean;
  timestamp: string;
  ipAddress: string;
}
