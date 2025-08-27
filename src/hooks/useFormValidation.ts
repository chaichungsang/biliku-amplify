import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, formData?: Record<string, any>) => string | null;
  message?: string;
}

export interface ValidationRules {
  [field: string]: ValidationRule | ValidationRule[];
}

export interface ValidationErrors {
  [field: string]: string | null;
}

export interface UseFormValidationReturn {
  errors: ValidationErrors;
  isValid: boolean;
  validateField: (field: string, value: any) => string | null;
  validateForm: (data: Record<string, any>) => boolean;
  clearErrors: () => void;
  clearFieldError: (field: string) => void;
  setError: (field: string, message: string) => void;
}

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9+\-\s()]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  mediumPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  malaysianPhone: /^(\+?6?01[0-46-9]-*[0-9]{7,8}|(\+?6?0[0-9]{1})-*[0-9]{7,8})$/,
  name: /^[a-zA-Z\s'-]+$/,
};

// Common validation rules
export const CommonValidationRules = {
  email: {
    required: true,
    pattern: ValidationPatterns.email,
    message: 'Please enter a valid email address',
  },
  password: {
    required: true,
    minLength: 8,
    pattern: ValidationPatterns.mediumPassword,
    message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
  },
  confirmPassword: (originalField: string) => ({
    required: true,
    custom: (value: any, formData?: Record<string, any>) => {
      if (formData && value !== formData[originalField]) {
        return 'Passwords do not match';
      }
      return null;
    },
  }),
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: ValidationPatterns.name,
    message: 'First name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: ValidationPatterns.name,
    message: 'Last name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
  },
  phone: {
    required: true,
    pattern: ValidationPatterns.phone,
    message: 'Please enter a valid phone number',
  },
  malaysianPhone: {
    required: true,
    pattern: ValidationPatterns.malaysianPhone,
    message: 'Please enter a valid Malaysian phone number',
  },
  required: (message?: string) => ({
    required: true,
    message: message || 'This field is required',
  }),
  agreeToTerms: {
    custom: (value: boolean, formData?: Record<string, any>) => {
      if (!value) return 'You must agree to the Terms and Privacy Policy';
      return null;
    },
  },
};

const validateSingleRule = (value: any, rule: ValidationRule, formData?: Record<string, any>): string | null => {
  // Check required
  if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    return rule.message || 'This field is required';
  }

  // If field is empty and not required, skip other validations
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  // Check minimum length
  if (rule.minLength && value.length < rule.minLength) {
    return rule.message || `Minimum length is ${rule.minLength} characters`;
  }

  // Check maximum length
  if (rule.maxLength && value.length > rule.maxLength) {
    return rule.message || `Maximum length is ${rule.maxLength} characters`;
  }

  // Check pattern
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.message || 'Invalid format';
  }

  // Check custom validation
  if (rule.custom) {
    return rule.custom(value, formData);
  }

  return null;
};

const validateField = (field: string, value: any, rules: ValidationRules, formData?: Record<string, any>): string | null => {
  const fieldRules = rules[field];
  if (!fieldRules) return null;

  // Handle array of rules
  if (Array.isArray(fieldRules)) {
    for (const rule of fieldRules) {
      const error = validateSingleRule(value, rule, formData);
      if (error) return error;
    }
    return null;
  }

  // Handle single rule
  return validateSingleRule(value, fieldRules, formData);
};

export const useFormValidation = (rules: ValidationRules): UseFormValidationReturn => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateFieldCallback = useCallback((field: string, value: any, formData?: Record<string, any>): string | null => {
    const error = validateField(field, value, rules, formData);
    
    setErrors(prev => ({
      ...prev,
      [field]: error,
    }));

    return error;
  }, [rules]);

  const validateForm = useCallback((data: Record<string, any>): boolean => {
    const newErrors: ValidationErrors = {};
    let isFormValid = true;

    // Validate each field that has rules
    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field], rules, data);
      newErrors[field] = error;
      if (error) isFormValid = false;
    });

    setErrors(newErrors);
    return isFormValid;
  }, [rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: null,
    }));
  }, []);

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const isValid = Object.values(errors).every(error => !error);

  return {
    errors,
    isValid,
    validateField: validateFieldCallback,
    validateForm,
    clearErrors,
    clearFieldError,
    setError,
  };
};

// Specific validation hook for authentication forms
export const useAuthValidation = () => {
  const loginRules: ValidationRules = {
    email: CommonValidationRules.email,
    password: CommonValidationRules.required('Password is required'),
  };

  const registerRules: ValidationRules = {
    email: CommonValidationRules.email,
    password: CommonValidationRules.password,
    confirmPassword: CommonValidationRules.confirmPassword('password'),
    firstName: CommonValidationRules.firstName,
    lastName: CommonValidationRules.lastName,
    phone: CommonValidationRules.phone,
    gender: CommonValidationRules.required('Please select your gender'),
    agreeToTerms: CommonValidationRules.agreeToTerms,
  };

  const forgotPasswordRules: ValidationRules = {
    email: CommonValidationRules.email,
  };

  const resetPasswordRules: ValidationRules = {
    password: CommonValidationRules.password,
    confirmPassword: CommonValidationRules.confirmPassword('password'),
  };

  return {
    loginValidation: useFormValidation(loginRules),
    registerValidation: useFormValidation(registerRules),
    forgotPasswordValidation: useFormValidation(forgotPasswordRules),
    resetPasswordValidation: useFormValidation(resetPasswordRules),
  };
};

export default useFormValidation;