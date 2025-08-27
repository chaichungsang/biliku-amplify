import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  styled,
} from '@mui/material';
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { resetPassword } from 'aws-amplify/auth';
import { formatAuthError } from '../utils/authHelpers';

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

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword({ username: email });
      setSuccess(true);
    } catch (err: any) {
      console.error('Forgot password error:', err);
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError(null);
  };

  if (success) {
    return (
      <AuthContainer>
        <AuthPaper elevation={0}>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <SendIcon sx={{ fontSize: '4rem', color: '#ffd100', mb: 2 }} />
            <BrandTitle variant="h1">
              Check Your Email
            </BrandTitle>
            <SarawakFlagStrip />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 1.6, mb: 4 }}
            >
              We've sent password reset instructions to <strong>{email}</strong>
            </Typography>
            
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Please check your email and click the reset link. If you don't see the email, check your spam folder.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <AuthButton
                onClick={() => navigate('/login')}
                startIcon={<ArrowBackIcon />}
              >
                Back to Sign In
              </AuthButton>
              
              <SecondaryButton
                onClick={() => {
                  setSuccess(false);
                  setEmail('');
                }}
              >
                Try Different Email
              </SecondaryButton>
            </Box>
          </Box>
        </AuthPaper>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthPaper elevation={0}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <HomeIcon sx={{ fontSize: '3rem', color: '#cc0001', mb: 2 }} />
          <BrandTitle variant="h1">
            Reset Password
          </BrandTitle>
          <SarawakFlagStrip />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}
          >
            Enter your email address and we'll send you instructions to reset your password
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

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <StyledTextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
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

          <Box sx={{ display: 'flex', gap: 2, mt: 4, flexDirection: 'column' }}>
            <AuthButton
              type="submit"
              disabled={!email || loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </AuthButton>

            <Link to="/login" style={{ textDecoration: 'none' }}>
              <SecondaryButton startIcon={<ArrowBackIcon />}>
                Back to Sign In
              </SecondaryButton>
            </Link>
          </Box>
        </Box>

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
      </AuthPaper>
    </AuthContainer>
  );
};

export default ForgotPasswordPage;