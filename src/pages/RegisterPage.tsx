import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Step,
  Stepper,
  StepLabel,
  styled,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { signUp, signInWithRedirect } from 'aws-amplify/auth';
import { useAuthenticator } from '@aws-amplify/ui-react';

// Styled components matching the existing design system
const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 200px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(204, 0, 1, 0.03) 0%, rgba(0, 0, 0, 0.02) 50%, rgba(255, 209, 0, 0.03) 100%)',
  padding: '40px 20px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  },
}));

const AuthPaper = styled(Paper)(({ theme }) => ({
  padding: '40px',
  width: '100%',
  maxWidth: '500px',
  borderRadius: '12px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(204, 0, 1, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '30px 20px',
    margin: '0 10px',
  },
}));

const SarawakFlagStrip = styled(Box)(({ theme }) => ({
  height: '3px',
  background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  width: '60px',
  borderRadius: '3px',
  margin: '0 auto 30px auto',
}));

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.2rem',
  fontWeight: 700,
  textAlign: 'center',
  color: '#cc0001',
  marginBottom: '8px',
  position: 'relative',
  '&::after': {
    content: '"for Sarawakians, by Sarawakians"',
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 400,
    color: '#666',
    letterSpacing: '0.5px',
    marginTop: '5px',
    textTransform: 'uppercase',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  padding: '14px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1.05rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#cc0001',
  color: 'white',
  border: '2px solid #cc0001',
  boxShadow: '0 4px 12px rgba(204, 0, 1, 0.2)',
  '&:hover': {
    backgroundColor: '#b00001',
    borderColor: '#b00001',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(204, 0, 1, 0.3)',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    borderColor: '#cccccc',
    color: '#888888',
    transform: 'none',
    boxShadow: 'none',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  padding: '14px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1.05rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  backgroundColor: 'transparent',
  color: '#666',
  border: '2px solid #ddd',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    borderColor: '#cc0001',
    color: '#cc0001',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(204, 0, 1, 0.15)',
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  backgroundColor: 'white',
  color: '#333',
  border: '2px solid #ddd',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    borderColor: '#cc0001',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(204, 0, 1, 0.15)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cc0001',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cc0001',
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#cc0001',
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cc0001',
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#cc0001',
        borderWidth: '2px',
      },
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#cc0001',
    },
  },
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  marginBottom: '30px',
  '& .MuiStepIcon-root': {
    color: '#ddd',
    '&.Mui-active': {
      color: '#cc0001',
    },
    '&.Mui-completed': {
      color: '#ffd100',
    },
  },
  '& .MuiStepLabel-label': {
    fontSize: '0.9rem',
    '&.Mui-active': {
      color: '#cc0001',
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: '#666',
    },
  },
  '& .MuiStepConnector-line': {
    borderColor: '#ddd',
  },
  '& .Mui-active .MuiStepConnector-line': {
    borderColor: '#cc0001',
  },
  '& .Mui-completed .MuiStepConnector-line': {
    borderColor: '#ffd100',
  },
}));

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  agreeToTerms: boolean;
}

const steps = ['Account Details', 'Personal Info', 'Complete'];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    agreeToTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirect if already authenticated
  if (authStatus === 'authenticated') {
    return <Navigate to="/profile" replace />;
  }

  const handleInputChange = (field: keyof RegisterFormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value as string;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'agreeToTerms' ? (event.target as HTMLInputElement).checked : value,
    }));
    if (error) setError(null);
  };

  const handleSelectChange = (field: keyof RegisterFormData) => (
    event: any
  ) => {
    const value = event.target.value as string;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError(null);
  };

  const validateStep = (step: number): string | null => {
    switch (step) {
      case 0:
        if (!formData.email) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Please enter a valid email address';
        if (!formData.password) return 'Password is required';
        if (formData.password.length < 8) return 'Password must be at least 8 characters long';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        if (!formData.confirmPassword) return 'Please confirm your password';
        if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
        return null;
      
      case 1:
        if (!formData.firstName) return 'First name is required';
        if (!formData.lastName) return 'Last name is required';
        if (!formData.phone) return 'Phone number is required';
        if (!/^[0-9+\-\s()]+$/.test(formData.phone)) return 'Please enter a valid phone number';
        if (!formData.gender) return 'Please select your gender';
        if (!formData.agreeToTerms) return 'You must agree to the Terms and Privacy Policy';
        return null;
      
      default:
        return null;
    }
  };

  const handleNext = () => {
    const validationError = validateStep(activeStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError(null);
  };

  const handleRegister = async () => {
    const validationError = validateStep(1);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: formData.firstName,
            family_name: formData.lastName,
            phone_number: formData.phone.replace(/\D/g, '').startsWith('60') 
              ? `+${formData.phone.replace(/\D/g, '')}` 
              : `+60${formData.phone.replace(/\D/g, '')}`,
            gender: formData.gender,
          },
          autoSignIn: false, // We'll handle verification first
        },
      });

      if (result.isSignUpComplete) {
        setSuccess('Account created successfully! Please check your email to verify your account.');
        setActiveStep(2);
      } else {
        setSuccess('Account created! Please check your email for a verification code.');
        setActiveStep(2);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      let errorMessage = 'Registration failed. Please try again.';
      if (err.name === 'UsernameExistsException') {
        errorMessage = 'An account with this email already exists. Please use a different email or sign in.';
      } else if (err.name === 'InvalidPasswordException') {
        errorMessage = 'Password does not meet requirements. Please ensure it has at least 8 characters with uppercase, lowercase, and numbers.';
      } else if (err.name === 'InvalidParameterException') {
        errorMessage = 'Please check all fields are filled correctly.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({
        provider: 'Google'
      });
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError('Google sign-in failed. Please try again.');
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ width: '100%' }}>
            <StyledTextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#cc0001' }} />
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              margin="normal"
              helperText="At least 8 characters with uppercase, lowercase, and numbers"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#cc0001' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#cc0001' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        );

      case 1:
        return (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <StyledTextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#cc0001' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                required
                margin="normal"
              />
            </Box>

            <StyledTextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              required
              margin="normal"
              placeholder="e.g., 012-345-6789"
              helperText="Malaysian phone number (without +60)"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#cc0001' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <StyledFormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={handleSelectChange('gender')}
                  label="Gender"
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                </Select>
              </StyledFormControl>

            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange('agreeToTerms')}
                  sx={{
                    color: '#cc0001',
                    '&.Mui-checked': {
                      color: '#cc0001',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{' '}
                  <Link 
                    to="/terms" 
                    style={{ color: '#cc0001', textDecoration: 'none' }}
                    target="_blank"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link 
                    to="/privacy" 
                    style={{ color: '#cc0001', textDecoration: 'none' }}
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mt: 2, alignItems: 'flex-start' }}
            />
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckIcon sx={{ fontSize: '4rem', color: '#ffd100', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#cc0001', fontWeight: 600 }}>
              Registration Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Welcome to Biliku! Please check your email and click the verification link to complete your registration.
            </Typography>
            <AuthButton
              onClick={() => navigate('/login')}
              startIcon={<CheckIcon />}
            >
              Go to Sign In
            </AuthButton>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <AuthContainer>
      <AuthPaper elevation={0}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HomeIcon sx={{ fontSize: '3rem', color: '#cc0001', mb: 2 }} />
          <BrandTitle variant="h1">
            Join Biliku
          </BrandTitle>
          <SarawakFlagStrip />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            Create your account to start finding or listing rooms in Sarawak
          </Typography>
        </Box>

        <StyledStepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </StyledStepper>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: '8px',
              '& .MuiAlert-icon': { color: '#cc0001' }
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              borderRadius: '8px',
              '& .MuiAlert-icon': { color: '#ffd100' }
            }}
          >
            {success}
          </Alert>
        )}

        {renderStepContent(activeStep)}

        {activeStep < 2 && (
          <>
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <SecondaryButton
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackIcon />}
                sx={{ flex: 1 }}
              >
                Back
              </SecondaryButton>
              {activeStep === steps.length - 2 ? (
                <AuthButton
                  onClick={handleRegister}
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                  sx={{ flex: 2 }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </AuthButton>
              ) : (
                <AuthButton
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ flex: 2 }}
                >
                  Continue
                </AuthButton>
              )}
            </Box>

            {activeStep === 0 && (
              <>
                <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#ddd' } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    or sign up with
                  </Typography>
                </Divider>

                <GoogleButton
                  fullWidth
                  onClick={handleGoogleSignIn}
                  startIcon={<GoogleIcon />}
                  sx={{ mb: 3 }}
                >
                  Sign up with Google
                </GoogleButton>
              </>
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#cc0001',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </>
        )}
      </AuthPaper>
    </AuthContainer>
  );
};

export default RegisterPage;