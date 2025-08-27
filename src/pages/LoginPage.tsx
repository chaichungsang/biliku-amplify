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
  styled,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Home as HomeIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { signIn, signInWithRedirect } from 'aws-amplify/auth';
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
  maxWidth: '450px',
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

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (authStatus === 'authenticated') {
    return <Navigate to="/profile" replace />;
  }

  const handleInputChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (error) setError(null);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn({
        username: formData.email,
        password: formData.password,
      });
      // Redirect will happen automatically via useAuthenticator
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle common error messages
      let errorMessage = 'Login failed. Please try again.';
      if (err.name === 'NotAuthorizedException') {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (err.name === 'UserNotConfirmedException') {
        errorMessage = 'Please verify your email address before signing in.';
      } else if (err.name === 'UserNotFoundException') {
        errorMessage = 'No account found with this email address.';
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

  const isFormValid = formData.email && formData.password;

  return (
    <AuthContainer>
      <AuthPaper elevation={0}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HomeIcon sx={{ fontSize: '3rem', color: '#cc0001', mb: 2 }} />
          <BrandTitle variant="h1">
            Welcome Back
          </BrandTitle>
          <SarawakFlagStrip />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            Sign in to access your Biliku account and find your perfect room in Sarawak
          </Typography>
        </Box>

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

        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
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

          <Box sx={{ textAlign: 'right', mt: 1, mb: 3 }}>
            <Link
              to="/forgot-password"
              style={{
                color: '#cc0001',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <AuthButton
            type="submit"
            fullWidth
            disabled={!isFormValid || loading}
            sx={{ mb: 3 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                <CheckIcon sx={{ mr: 1 }} />
                Sign In
              </>
            )}
          </AuthButton>

          <Divider sx={{ my: 3, '&::before, &::after': { borderColor: '#ddd' } }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              or continue with
            </Typography>
          </Divider>

          <GoogleButton
            fullWidth
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon />}
            sx={{ mb: 3 }}
          >
            Sign in with Google
          </GoogleButton>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#cc0001',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                Sign up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </AuthPaper>
    </AuthContainer>
  );
};

export default LoginPage;