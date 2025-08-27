import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { AmplifyUser } from '@/types/amplify';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
    context.signOut,
  ]);

  if (!user) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6">Please sign in to view your profile</Typography>
      </Box>
    );
  }

  const amplifyUser = user as AmplifyUser;
  const userAttributes = amplifyUser?.attributes || {};

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  {userAttributes.name?.[0]?.toUpperCase() || userAttributes.email?.[0]?.toUpperCase() || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {userAttributes.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Member since {new Date().getFullYear()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <List>
                {userAttributes.email && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={userAttributes.email}
                    />
                  </ListItem>
                )}

                {userAttributes.phone_number && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone"
                      secondary={userAttributes.phone_number}
                    />
                  </ListItem>
                )}

                {userAttributes.gender && (
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gender"
                      secondary={userAttributes.gender}
                    />
                  </ListItem>
                )}

                <ListItem>
                  <ListItemIcon>
                    <BadgeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Account Status"
                    secondary={userAttributes.email_verified ? 'Verified' : 'Pending Verification'}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  href="/my-listings"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  My Room Listings
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  href="/my-favorites"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  My Favorites
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  href="/room-form"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Post a New Room
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  href="/agreements"
                  sx={{ justifyContent: 'flex-start' }}
                >
                  My Agreements
                </Button>

                <Divider sx={{ my: 1 }} />

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={signOut}
                  sx={{ mt: 2 }}
                >
                  Sign Out
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Statistics
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Listings
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Favorites
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;