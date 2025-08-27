// Amplify types for better TypeScript support

export interface AmplifyUser {
  username: string;
  userId: string;
  signInDetails?: any;
  attributes?: {
    email?: string;
    email_verified?: boolean;
    name?: string;
    phone_number?: string;
    gender?: string;
    [key: string]: any;
  };
}

export interface AuthenticatorContextType {
  user: AmplifyUser | undefined;
  authStatus: 'configuring' | 'authenticated' | 'unauthenticated';
  signOut: () => void;
}

// Re-export common types
export type { AmplifyUser as AuthUser };