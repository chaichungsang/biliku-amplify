import { AuthError } from 'aws-amplify/auth';

/**
 * Authentication error messages mapping for better user experience
 */
export const AUTH_ERROR_MESSAGES = {
  // Sign In Errors
  NotAuthorizedException: 'Invalid email or password. Please check your credentials.',
  UserNotConfirmedException: 'Please verify your email address before signing in.',
  UserNotFoundException: 'No account found with this email address.',
  PasswordResetRequiredException: 'You must reset your password before you can sign in.',
  UserNotConfirmedException_SignIn: 'Please verify your email address first.',
  TooManyRequestsException: 'Too many failed attempts. Please try again later.',
  
  // Sign Up Errors
  UsernameExistsException: 'An account with this email already exists. Please use a different email or sign in.',
  InvalidPasswordException: 'Password does not meet requirements. Please ensure it has at least 8 characters with uppercase, lowercase, and numbers.',
  InvalidParameterException: 'Please check all fields are filled correctly.',
  CodeDeliveryFailureException: 'Failed to send verification code. Please try again.',
  
  // General Errors
  NetworkError: 'Network error. Please check your internet connection and try again.',
  ServiceException: 'Service temporarily unavailable. Please try again later.',
  InternalErrorException: 'An unexpected error occurred. Please try again.',
  
  // Default fallback
  default: 'An error occurred. Please try again.',
};

/**
 * Formats authentication errors for display to users
 * @param error - The error object from AWS Amplify Auth
 * @returns A user-friendly error message
 */
export const formatAuthError = (error: any): string => {
  console.error('Auth Error:', error);
  
  if (!error) return AUTH_ERROR_MESSAGES.default;
  
  // Handle AuthError from aws-amplify v6
  if (error.name) {
    const errorName = error.name as keyof typeof AUTH_ERROR_MESSAGES;
    return AUTH_ERROR_MESSAGES[errorName] || error.message || AUTH_ERROR_MESSAGES.default;
  }
  
  // Handle error codes
  if (error.code) {
    const errorCode = error.code as keyof typeof AUTH_ERROR_MESSAGES;
    return AUTH_ERROR_MESSAGES[errorCode] || error.message || AUTH_ERROR_MESSAGES.default;
  }
  
  // Handle direct message
  if (error.message) {
    return error.message;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  return AUTH_ERROR_MESSAGES.default;
};

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

/**
 * Formats phone number for Malaysian format
 * @param phone - Phone number to format
 * @returns Formatted phone number with +60 prefix
 */
export const formatMalaysianPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  // If already starts with 60, add +
  if (cleaned.startsWith('60')) {
    return `+${cleaned}`;
  }
  
  // If starts with 0, replace with +60
  if (cleaned.startsWith('0')) {
    return `+60${cleaned.slice(1)}`;
  }
  
  // Otherwise, add +60 prefix
  return `+60${cleaned}`;
};

/**
 * Validates Malaysian phone number format
 * @param phone - Phone number to validate
 * @returns True if phone number is valid
 */
export const isValidMalaysianPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check for Malaysian mobile patterns
  const mobilePatterns = [
    /^(60)?1[0-46-9]\d{7,8}$/, // Malaysian mobile numbers
    /^(60)?0\d{8,9}$/, // Malaysian landline numbers
  ];
  
  return mobilePatterns.some(pattern => pattern.test(cleaned));
};

/**
 * Generates a secure random string for tokens
 * @param length - Length of the random string
 * @returns Random string
 */
export const generateRandomString = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Gets the redirect URL after successful authentication
 * @param userType - The type of user (tenant, landlord, etc.)
 * @param from - The page user was trying to access before auth
 * @returns The appropriate redirect URL
 */
export const getAuthRedirectUrl = (userType?: string, from?: string): string => {
  // If there's a specific page they were trying to access, go there
  if (from && from !== '/login' && from !== '/register') {
    return from;
  }
  
  // Default redirect based on user type
  switch (userType) {
    case 'landlord':
      return '/my-listings';
    case 'tenant':
      return '/';
    case 'admin':
      return '/admin';
    default:
      return '/profile';
  }
};

/**
 * Checks if the user is authenticated based on auth status
 * @param authStatus - The authentication status from Amplify
 * @returns True if user is authenticated
 */
export const isAuthenticated = (authStatus: string): boolean => {
  return authStatus === 'authenticated';
};

/**
 * Gets user display name from Amplify user object
 * @param user - Amplify user object
 * @returns Display name for the user
 */
export const getUserDisplayName = (user: any): string => {
  if (user?.attributes?.name || user?.attributes?.given_name) {
    return user.attributes.name || `${user.attributes.given_name} ${user.attributes.family_name || ''}`.trim();
  }
  
  if (user?.attributes?.email) {
    return user.attributes.email.split('@')[0];
  }
  
  if (user?.username) {
    return user.username;
  }
  
  return 'User';
};

/**
 * Password strength indicator
 * @param password - Password to check
 * @returns Object with strength level and score
 */
export const getPasswordStrength = (password: string): { level: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z\d]/.test(password)) score += 1;
  
  if (score <= 2) return { level: 'weak', score };
  if (score <= 4) return { level: 'medium', score };
  return { level: 'strong', score };
};

/**
 * Debounce function for input validation
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
  let timeoutId: NodeJS.Timeout;
  
  return ((...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};

/**
 * Storage keys for authentication-related data
 */
export const AUTH_STORAGE_KEYS = {
  LAST_EMAIL: 'biliku_last_email',
  USER_TYPE: 'biliku_user_type',
  AUTH_REDIRECT: 'biliku_auth_redirect',
  REMEMBER_EMAIL: 'biliku_remember_email',
} as const;

/**
 * Safely gets item from localStorage
 * @param key - Storage key
 * @returns Stored value or null
 */
export const getStorageItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Safely sets item in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export const setStorageItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn('Error writing to localStorage:', error);
  }
};

/**
 * Safely removes item from localStorage
 * @param key - Storage key
 */
export const removeStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Error removing from localStorage:', error);
  }
};