/**
 * Authentication Hooks using React Query
 * 
 * These hooks provide authentication functionality with caching and state management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getAuthService } from '../services/serviceFactory';
import type {
  User,
  AuthCredentials,
  RegisterData,
  UpdateProfileData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  EmailVerificationParams
} from '../types/auth';

const authService = getAuthService();

// Query keys for React Query
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  session: () => [...authKeys.all, 'session'] as const,
};

/**
 * Hook to get current authenticated user
 */
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async (): Promise<User | null> => {
      try {
        const user = await authService.getCurrentUser();
        return user;
      } catch (error) {
        return null; // User is not authenticated
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on auth failures
  });
};

/**
 * Hook to get user profile (alias for useUser)
 */
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: async (): Promise<User | null> => {
      try {
        const user = await authService.getProfile();
        return user;
      } catch (error) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

/**
 * Hook to check authentication status
 */
export const useAuthStatus = () => {
  const { data: user, isLoading, error } = useUser();
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error
  };
};

/**
 * Hook for login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      const result = await authService.login(credentials);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: (user) => {
      // Update user cache
      queryClient.setQueryData(authKeys.user(), user);
      queryClient.setQueryData(authKeys.profile(), user);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

/**
 * Hook for registration mutation
 */
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: RegisterData) => {
      const result = await authService.register(userData);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: (user) => {
      if (user) {
        // Update user cache
        queryClient.setQueryData(authKeys.user(), user);
        queryClient.setQueryData(authKeys.profile(), user);
        // Invalidate related queries
        queryClient.invalidateQueries({ queryKey: authKeys.all });
      }
    },
  });
};

/**
 * Hook for logout mutation
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await authService.signOut();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Set user to null
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.setQueryData(authKeys.profile(), null);
    },
  });
};

/**
 * Hook for profile update mutation
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userData: UpdateProfileData) => {
      const result = await authService.updateProfile(userData);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: (user) => {
      // Update user cache
      queryClient.setQueryData(authKeys.user(), user);
      queryClient.setQueryData(authKeys.profile(), user);
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

/**
 * Hook for forgot password mutation
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const result = await authService.forgotPassword(data);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
};

/**
 * Hook for reset password mutation
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const result = await authService.resetPassword(data);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
};

/**
 * Hook for reset password with OTP mutation
 */
export const useResetPasswordWithOTP = () => {
  return useMutation({
    mutationFn: async ({ email, token, password }: { email: string; token: string; password: string }) => {
      const result = await authService.resetPasswordWithOTP(email, token, password);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
};

/**
 * Hook for change password mutation
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      const result = await authService.changePassword(data);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
};

/**
 * Hook for email verification mutation
 */
export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: EmailVerificationParams) => {
      const result = await authService.verifyEmail(params);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
    onSuccess: () => {
      // Invalidate user data to refresh email verification status
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

/**
 * Hook for resend verification email mutation
 */
export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const result = await authService.resendVerification(email);
      if (result.error) {
        throw result.error;
      }
      return result.data;
    },
  });
};

/**
 * Hook for checking email availability
 */
export const useCheckEmailExists = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await authService.checkEmailExists(email);
    },
  });
};

/**
 * Custom hook for complete authentication state and actions
 */
export const useAuth = () => {
  const { data: user, isLoading, error } = useUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  
  const login = useCallback(async (credentials: AuthCredentials) => {
    return loginMutation.mutateAsync(credentials);
  }, [loginMutation]);
  
  const register = useCallback(async (userData: RegisterData) => {
    return registerMutation.mutateAsync(userData);
  }, [registerMutation]);
  
  const logout = useCallback(async () => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);
  
  const updateProfile = useCallback(async (userData: UpdateProfileData) => {
    return updateProfileMutation.mutateAsync(userData);
  }, [updateProfileMutation]);
  
  return {
    // State
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    error: error || loginMutation.error || registerMutation.error,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    
    // Mutation errors
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,
    updateProfileError: updateProfileMutation.error,
  };
};