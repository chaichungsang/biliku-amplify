import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Home as HomeIcon, ArrowBack } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: '6rem',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2,
        }}
      >
        404
      </Typography>
      
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 600 }}
      >
        Sorry, the page you are looking for doesn't exist or has been moved. 
        Let's get you back to finding your perfect room.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="contained"
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          size="large"
        >
          Go Home
        </Button>
        
        <Button
          variant="outlined"
          onClick={() => window.history.back()}
          startIcon={<ArrowBack />}
          size="large"
        >
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;