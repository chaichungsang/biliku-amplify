// Authentication types for the Biliku application

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  userType?: 'tenant' | 'landlord' | 'agent' | 'admin';
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  isVip?: boolean;
  emailConfirmed: boolean;
  createdAt: string;
  lastSignIn?: string;
  profileId?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  userType?: 'tenant' | 'landlord';
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  email?: string;
  password?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  refreshToken?: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface EmailVerificationParams {
  token_hash: string;
  email: string;
}

export interface AuthResponse<T = any> {
  data: T | null;
  error: Error | null;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface SocialLoginProvider {
  provider: 'google' | 'facebook' | 'apple';
}

// Amplify-specific types
export interface AmplifyAuthUser {
  username: string;
  userId: string;
  signInDetails?: any;
  attributes?: {
    email?: string;
    email_verified?: string;
    given_name?: string;
    family_name?: string;
    phone_number?: string;
    gender?: string;
    [key: string]: any;
  };
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthCredentials) => Promise<AuthResponse<User>>;
  register: (userData: RegisterData) => Promise<AuthResponse<User>>;
  logout: () => Promise<void>;
  updateProfile: (userData: UpdateProfileData) => Promise<AuthResponse<User>>;
  forgotPassword: (data: ForgotPasswordData) => Promise<AuthResponse<boolean>>;
  resetPassword: (data: ResetPasswordData) => Promise<AuthResponse<boolean>>;
  changePassword: (data: ChangePasswordData) => Promise<AuthResponse<boolean>>;
  verifyEmail: (params: EmailVerificationParams) => Promise<AuthResponse<boolean>>;
  resendVerification: (email: string) => Promise<AuthResponse<boolean>>;
  socialLogin: (provider: SocialLoginProvider) => Promise<AuthResponse<User>>;
  refreshToken: () => Promise<void>;
}