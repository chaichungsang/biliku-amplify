import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import type { AmplifyUser } from '@/types/amplify';

const LoginPage: React.FC = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  // Redirect if already authenticated
  if (authStatus === 'authenticated') {
    return <Navigate to="/profile" replace />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 450,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          gutterBottom
          color="primary"
          sx={{ mb: 3 }}
        >
          Welcome to Biliku
        </Typography>
        
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Sign in to your account or create a new one to get started
        </Typography>

        <Authenticator
          socialProviders={['google']}
          signUpAttributes={['email', 'name', 'gender', 'phone_number']}
        >
          {({ signOut, user }) => {
            const amplifyUser = user as AmplifyUser;
            return (
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Welcome, {amplifyUser?.attributes?.name || amplifyUser?.username || 'User'}!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You will be redirected to your profile shortly...
                </Typography>
              </Box>
            );
          }}
        </Authenticator>
      </Paper>
    </Box>
  );
};

export default LoginPage;