import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Container,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <HomeIcon fontSize="large" color="primary" />,
      title: 'Quality Rooms',
      description: 'Verified room listings with detailed photos and descriptions',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Safe & Secure',
      description: 'All listings are verified and users are authenticated',
    },
    {
      icon: <SpeedIcon fontSize="large" color="primary" />,
      title: 'Quick & Easy',
      description: 'Find and book your perfect room in minutes',
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3,
          }}
        >
          Find Your Perfect Room
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          Discover affordable, safe, and comfortable room rentals in Sarawak
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<SearchIcon />}
            component={Link}
            to="/listings"
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Rooms
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/login"
            sx={{ px: 4, py: 1.5 }}
          >
            Post a Room
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Biliku?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Find Your Room?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Join thousands of students and professionals who have found their perfect room
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/listings"
          sx={{
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'grey.100',
            },
          }}
        >
          Start Searching
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;