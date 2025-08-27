/**
 * Authentication Service for AWS Amplify
 * 
 * This service provides authentication functionality using AWS Amplify Auth (Cognito).
 * It maintains the same interface as the Vue Supabase auth service for easy migration.
 */

import { 
  signIn, 
  signUp, 
  signOut, 
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  updatePassword,
  getCurrentUser,
  fetchAuthSession,
  updateUserAttributes,
  type SignInOutput,
  type SignUpOutput
} from 'aws-amplify/auth';

import type {
  User,
  AuthCredentials,
  RegisterData,
  UpdateProfileData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  EmailVerificationParams,
  AuthResponse,
  AmplifyAuthUser
} from '../types/auth';

/**
 * Authentication Service Class
 */
export class AuthService {
  /**
   * Sign in user with email and password
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse<User>> {
    try {
      const result: SignInOutput = await signIn({
        username: credentials.email.toLowerCase().trim(),
        password: credentials.password
      });

      if (result.isSignedIn) {
        const user = await this.getCurrentUser();
        return { data: user, error: null };
      } else {
        throw new Error('Sign in incomplete');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        data: null, 
        error: new Error(error.message || 'Login failed') 
      };
    }
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<AuthResponse<User>> {
    try {
      const email = userData.email.toLowerCase().trim();
      const phone = userData.phone ? 
        (userData.phone.startsWith('+') ? userData.phone : `+${userData.phone}`) : 
        undefined;

      const result: SignUpOutput = await signUp({
        username: email,
        password: userData.password,
        options: {
          userAttributes: {
            email,
            given_name: userData.firstName,
            family_name: userData.lastName,
            ...(phone && { phone_number: phone }),
            ...(userData.gender && { gender: userData.gender })
          },
          autoSignIn: true
        }
      });

      if (result.isSignUpComplete) {
        const user = await this.getCurrentUser();
        return { data: user, error: null };
      } else {
        // User needs to verify email
        return { 
          data: null, 
          error: new Error('Please check your email for verification code') 
        };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        data: null, 
        error: new Error(error.message || 'Registration failed') 
      };
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    try {
      const amplifyUser: AmplifyAuthUser = await getCurrentUser();
      const session = await fetchAuthSession();
      
      // Map Amplify user to our User interface
      const user: User = {
        id: amplifyUser.userId,
        email: amplifyUser.attributes?.email || '',
        firstName: amplifyUser.attributes?.given_name || '',
        lastName: amplifyUser.attributes?.family_name || '',
        phone: amplifyUser.attributes?.phone_number || '',
        gender: amplifyUser.attributes?.gender as 'male' | 'female' | 'other' || undefined,
        emailConfirmed: amplifyUser.attributes?.email_verified === 'true',
        createdAt: new Date().toISOString(), // Amplify doesn't provide this directly
        lastSignIn: session.tokens?.accessToken ? 
          new Date(session.tokens.accessToken.payload.iat * 1000).toISOString() : 
          undefined
      };

      return user;
    } catch (error: any) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
  }

  /**
   * Get user profile (alias for getCurrentUser)
   */
  async getProfile(): Promise<User> {
    return this.getCurrentUser();
  }

  /**
   * Update user profile
   */
  async updateProfile(userData: UpdateProfileData): Promise<AuthResponse<User>> {
    try {
      const attributes: Record<string, string> = {};
      
      if (userData.firstName) attributes.given_name = userData.firstName;
      if (userData.lastName) attributes.family_name = userData.lastName;
      if (userData.phone) {
        const formattedPhone = userData.phone.startsWith('+') ? 
          userData.phone : 
          `+${userData.phone}`;
        attributes.phone_number = formattedPhone;
      }
      if (userData.gender) attributes.gender = userData.gender;
      if (userData.email) attributes.email = userData.email;

      await updateUserAttributes({
        userAttributes: attributes
      });

      // Update password if provided
      if (userData.password) {
        await updatePassword({
          oldPassword: '', // This might need to be provided in the interface
          newPassword: userData.password
        });
      }

      const updatedUser = await this.getCurrentUser();
      return { data: updatedUser, error: null };
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { 
        data: null, 
        error: new Error(error.message || 'Profile update failed') 
      };
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      await signOut();
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Sign out failed');
    }
  }

  /**
   * Send password reset email
   */
  async forgotPassword(data: ForgotPasswordData): Promise<AuthResponse<boolean>> {
    try {
      await resetPassword({
        username: data.email.toLowerCase().trim()
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Forgot password error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Password reset failed') 
      };
    }
  }

  /**
   * Reset password with confirmation code
   */
  async resetPassword(data: ResetPasswordData): Promise<AuthResponse<boolean>> {
    try {
      // Extract email from token if available, otherwise this needs to be provided
      // In a real implementation, you'd need to store the email during forgot password
      const email = ''; // This should come from your state management
      
      await confirmResetPassword({
        username: email,
        confirmationCode: data.token,
        newPassword: data.password
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Password reset failed') 
      };
    }
  }

  /**
   * Reset password with OTP verification
   */
  async resetPasswordWithOTP(email: string, token: string, password: string): Promise<AuthResponse<boolean>> {
    try {
      await confirmResetPassword({
        username: email.toLowerCase().trim(),
        confirmationCode: token,
        newPassword: password
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Reset password with OTP error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Password reset failed') 
      };
    }
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(data: ChangePasswordData): Promise<AuthResponse<boolean>> {
    try {
      await updatePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Change password error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Password change failed') 
      };
    }
  }

  /**
   * Verify email with confirmation code
   */
  async verifyEmail(params: EmailVerificationParams): Promise<AuthResponse<boolean>> {
    try {
      await confirmSignUp({
        username: params.email.toLowerCase().trim(),
        confirmationCode: params.token_hash
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Email verification error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Email verification failed') 
      };
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<AuthResponse<boolean>> {
    try {
      await resendSignUpCode({
        username: email.toLowerCase().trim()
      });
      
      return { data: true, error: null };
    } catch (error: any) {
      console.error('Resend verification error:', error);
      return { 
        data: false, 
        error: new Error(error.message || 'Resend verification failed') 
      };
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      await getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get current auth session
   */
  async getSession() {
    try {
      const session = await fetchAuthSession();
      return session;
    } catch (error: any) {
      throw new Error(`Failed to get session: ${error.message}`);
    }
  }

  /**
   * Check if email exists (placeholder - Amplify doesn't provide this directly)
   */
  async checkEmailExists(email: string): Promise<boolean> {
    // This would need to be implemented using a custom GraphQL query
    // or Lambda function in a real application
    console.log('Email availability check for:', email);
    return false; // Assume email doesn't exist for now
  }

  /**
   * Social login (OAuth)
   */
  async socialLogin(provider: 'Google' | 'Facebook' | 'Apple'): Promise<AuthResponse<User>> {
    try {
      // This would need to be implemented with Amplify's OAuth configuration
      throw new Error('Social login not implemented yet');
    } catch (error: any) {
      return { 
        data: null, 
        error: new Error(error.message || 'Social login failed') 
      };
    }
  }

  /**
   * Send password reset email (alias)
   */
  async sendPasswordResetEmail(email: string): Promise<AuthResponse<boolean>> {
    return this.forgotPassword({ email });
  }
}

// Create singleton instance
export const authService = new AuthService();
export default authService;