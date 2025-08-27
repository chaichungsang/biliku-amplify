/**
 * Centralized Error Handling for Services
 * 
 * This module provides standardized error handling and user-friendly error messages.
 */

// Error types
export interface ServiceError extends Error {
  code?: string;
  status?: number;
  details?: any;
  service?: string;
}

export interface ErrorDetails {
  title: string;
  message: string;
  code?: string;
  recoverable: boolean;
  suggestions?: string[];
}

/**
 * Custom error classes for different service types
 */
export class AuthenticationError extends Error implements ServiceError {
  code?: string;
  status?: number;
  service = 'auth';

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = 'AuthenticationError';
    this.code = code;
    this.status = status;
  }
}

export class ValidationError extends Error implements ServiceError {
  code?: string;
  service = 'validation';
  details?: any;

  constructor(message: string, details?: any, code?: string) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends Error implements ServiceError {
  code?: string;
  status?: number;
  service = 'network';

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'NetworkError';
    this.status = status;
    this.code = code;
  }
}

export class StorageError extends Error implements ServiceError {
  code?: string;
  service = 'storage';
  details?: any;

  constructor(message: string, details?: any, code?: string) {
    super(message);
    this.name = 'StorageError';
    this.code = code;
    this.details = details;
  }
}

export class GraphQLError extends Error implements ServiceError {
  code?: string;
  service = 'graphql';
  details?: any;

  constructor(message: string, details?: any, code?: string) {
    super(message);
    this.name = 'GraphQLError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Error message mappings for user-friendly messages
 */
const ERROR_MESSAGES: Record<string, ErrorDetails> = {
  // Authentication errors
  'UserNotFoundException': {
    title: 'User Not Found',
    message: 'No account found with this email address. Please check your email or create a new account.',
    code: 'USER_NOT_FOUND',
    recoverable: true,
    suggestions: ['Double-check your email address', 'Create a new account', 'Try password reset if you have an account']
  },
  'NotAuthorizedException': {
    title: 'Invalid Credentials',
    message: 'The email or password you entered is incorrect. Please try again.',
    code: 'INVALID_CREDENTIALS',
    recoverable: true,
    suggestions: ['Check your email and password', 'Use password reset if needed', 'Ensure caps lock is off']
  },
  'UserNotConfirmedException': {
    title: 'Email Not Verified',
    message: 'Please verify your email address before signing in.',
    code: 'EMAIL_NOT_VERIFIED',
    recoverable: true,
    suggestions: ['Check your email for verification link', 'Request a new verification email', 'Contact support if needed']
  },
  'PasswordResetRequiredException': {
    title: 'Password Reset Required',
    message: 'You need to reset your password before continuing.',
    code: 'PASSWORD_RESET_REQUIRED',
    recoverable: true,
    suggestions: ['Use the forgot password option', 'Check your email for reset instructions']
  },
  'InvalidPasswordException': {
    title: 'Invalid Password',
    message: 'Password does not meet the requirements. Please choose a stronger password.',
    code: 'INVALID_PASSWORD',
    recoverable: true,
    suggestions: ['Use at least 8 characters', 'Include uppercase and lowercase letters', 'Add numbers and special characters']
  },
  'UsernameExistsException': {
    title: 'Email Already Registered',
    message: 'An account with this email address already exists.',
    code: 'EMAIL_EXISTS',
    recoverable: true,
    suggestions: ['Try signing in instead', 'Use password reset if you forgot your password', 'Use a different email address']
  },

  // Network errors
  'NetworkError': {
    title: 'Connection Error',
    message: 'Unable to connect to our servers. Please check your internet connection.',
    code: 'NETWORK_ERROR',
    recoverable: true,
    suggestions: ['Check your internet connection', 'Try refreshing the page', 'Try again in a few moments']
  },
  'TimeoutError': {
    title: 'Request Timeout',
    message: 'The request took too long to complete. Please try again.',
    code: 'TIMEOUT_ERROR',
    recoverable: true,
    suggestions: ['Try again', 'Check your internet connection', 'Contact support if problem persists']
  },

  // Storage errors
  'FileSizeError': {
    title: 'File Too Large',
    message: 'The selected file is too large. Please choose a smaller file.',
    code: 'FILE_SIZE_ERROR',
    recoverable: true,
    suggestions: ['Choose a file smaller than 10MB', 'Compress your image before uploading', 'Try a different image format']
  },
  'FileTypeError': {
    title: 'Invalid File Type',
    message: 'This file type is not supported. Please choose a valid image file.',
    code: 'FILE_TYPE_ERROR',
    recoverable: true,
    suggestions: ['Use JPEG, PNG, or WebP format', 'Convert your file to a supported format', 'Choose a different image']
  },

  // GraphQL errors
  'GraphQLError': {
    title: 'Server Error',
    message: 'An error occurred while processing your request. Please try again.',
    code: 'GRAPHQL_ERROR',
    recoverable: true,
    suggestions: ['Try refreshing the page', 'Try again in a few moments', 'Contact support if problem persists']
  },

  // Generic errors
  'UnknownError': {
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR',
    recoverable: true,
    suggestions: ['Try refreshing the page', 'Try again later', 'Contact support if problem persists']
  }
};

/**
 * Error Handler Class
 */
export class ErrorHandler {
  /**
   * Process and standardize errors from different services
   */
  static handleError(error: any, context?: string): ServiceError {
    console.error(`Error in ${context || 'unknown context'}:`, error);

    // If it's already a ServiceError, return as-is
    if (error instanceof AuthenticationError || 
        error instanceof ValidationError || 
        error instanceof NetworkError || 
        error instanceof StorageError || 
        error instanceof GraphQLError) {
      return error;
    }

    // Handle Amplify Auth errors
    if (error?.name || error?.code) {
      const errorCode = error.name || error.code;
      
      if (this.isAuthError(errorCode)) {
        return new AuthenticationError(error.message, errorCode, error.status);
      }
      
      if (this.isNetworkError(errorCode)) {
        return new NetworkError(error.message, error.status, errorCode);
      }
      
      if (this.isStorageError(errorCode)) {
        return new StorageError(error.message, error.details, errorCode);
      }
    }

    // Handle GraphQL errors
    if (error?.errors || error?.graphQLErrors) {
      const firstError = error.errors?.[0] || error.graphQLErrors?.[0];
      return new GraphQLError(
        firstError?.message || 'GraphQL operation failed',
        error,
        firstError?.errorType
      );
    }

    // Handle network/fetch errors
    if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
      return new NetworkError('Network connection failed', 0, 'NETWORK_ERROR');
    }

    // Generic error fallback
    return new Error(error?.message || 'An unexpected error occurred');
  }

  /**
   * Get user-friendly error details
   */
  static getErrorDetails(error: ServiceError): ErrorDetails {
    // Try to match by error code or name
    const key = error.code || error.name || error.constructor.name;
    
    if (ERROR_MESSAGES[key]) {
      return ERROR_MESSAGES[key];
    }

    // Check for partial matches in error message
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('connection')) {
      return ERROR_MESSAGES.NetworkError;
    }
    
    if (message.includes('timeout')) {
      return ERROR_MESSAGES.TimeoutError;
    }
    
    if (message.includes('password')) {
      return ERROR_MESSAGES.InvalidPasswordException;
    }
    
    if (message.includes('email') && message.includes('exists')) {
      return ERROR_MESSAGES.UsernameExistsException;
    }
    
    if (message.includes('file') && message.includes('size')) {
      return ERROR_MESSAGES.FileSizeError;
    }
    
    if (message.includes('file') && message.includes('type')) {
      return ERROR_MESSAGES.FileTypeError;
    }

    // Fallback to unknown error
    return ERROR_MESSAGES.UnknownError;
  }

  /**
   * Log error for monitoring/debugging
   */
  static logError(error: ServiceError, context?: string, userId?: string): void {
    const errorLog = {
      error: {
        name: error.name,
        message: error.message,
        code: error.code,
        status: error.status,
        service: error.service,
        stack: error.stack
      },
      context,
      userId,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    };

    // In production, this would send to error monitoring service
    console.error('Service Error:', errorLog);
    
    // TODO: Send to error monitoring service (e.g., Sentry, Bugsnag)
  }

  /**
   * Check if error is authentication-related
   */
  private static isAuthError(errorCode: string): boolean {
    const authErrors = [
      'UserNotFoundException',
      'NotAuthorizedException',
      'UserNotConfirmedException',
      'PasswordResetRequiredException',
      'InvalidPasswordException',
      'UsernameExistsException',
      'CodeMismatchException',
      'ExpiredCodeException',
      'InvalidParameterException'
    ];
    
    return authErrors.includes(errorCode);
  }

  /**
   * Check if error is network-related
   */
  private static isNetworkError(errorCode: string): boolean {
    const networkErrors = [
      'NetworkError',
      'TimeoutError',
      'ERR_NETWORK',
      'ERR_INTERNET_DISCONNECTED',
      'ERR_CONNECTION_REFUSED'
    ];
    
    return networkErrors.includes(errorCode) || 
           errorCode.startsWith('ERR_') ||
           errorCode.includes('NETWORK');
  }

  /**
   * Check if error is storage-related
   */
  private static isStorageError(errorCode: string): boolean {
    const storageErrors = [
      'NoSuchKey',
      'AccessDenied',
      'InvalidRequest',
      'FileSizeError',
      'FileTypeError'
    ];
    
    return storageErrors.includes(errorCode);
  }
}

/**
 * Utility function to handle async operations with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string,
  userId?: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const serviceError = ErrorHandler.handleError(error, context);
    ErrorHandler.logError(serviceError, context, userId);
    throw serviceError;
  }
}

/**
 * React Hook for error handling
 */
import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState<ServiceError | null>(null);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);

  const handleError = useCallback((error: any, context?: string) => {
    const serviceError = ErrorHandler.handleError(error, context);
    const details = ErrorHandler.getErrorDetails(serviceError);
    
    setError(serviceError);
    setErrorDetails(details);
    
    // Log the error
    ErrorHandler.logError(serviceError, context);
    
    return { error: serviceError, details };
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setErrorDetails(null);
  }, []);

  return {
    error,
    errorDetails,
    handleError,
    clearError,
    hasError: !!error
  };
};