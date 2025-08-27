import React, { useState } from 'react';
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  IconButton,
  Breadcrumbs,
  Link,
  Container,
  styled,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  AccountBox as AccountIcon,
} from '@mui/icons-material';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link as RouterLink } from 'react-router-dom';
import type { AmplifyUser } from '@/types/amplify';

// Styled components
const ProfileHeader = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #cc0001, #ff0000)',
  color: 'white',
  marginBottom: '30px',
}));

const StatsCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const ActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}));

interface EditProfileData {
  name: string;
  phone: string;
  bio: string;
  location: string;
  occupation: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  listingUpdates: boolean;
}

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuthenticator((context) => [
    context.user,
    context.signOut,
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editData, setEditData] = useState<EditProfileData>({
    name: '',
    phone: '',
    bio: '',
    location: '',
    occupation: '',
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    listingUpdates: true,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  React.useEffect(() => {
    document.title = 'My Profile - Biliku | Manage Your Account';
  }, []);

  if (!user) {
    return (
      <Box textAlign="center" py={8}>
        <AccountIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
        <Typography variant="h6" sx={{ mb: 2 }}>
          Please sign in to view your profile
        </Typography>
        <Button variant="contained" component={RouterLink} to="/login">
          Sign In
        </Button>
      </Box>
    );
  }

  const amplifyUser = user as AmplifyUser;
  const userAttributes = amplifyUser?.attributes || {};

  // Initialize edit data when dialog opens
  React.useEffect(() => {
    if (editDialogOpen) {
      setEditData({
        name: userAttributes.name || '',
        phone: userAttributes.phone_number || '',
        bio: userAttributes.bio || '',
        location: userAttributes.location || '',
        occupation: userAttributes.occupation || '',
      });
    }
  }, [editDialogOpen, userAttributes]);

  const handleEditProfile = () => {
    // Here you would typically call an API to update the profile
    console.log('Updating profile:', editData);
    setEditDialogOpen(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handleNotificationChange = (setting: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSaveSettings = () => {
    // Save notification settings
    console.log('Saving settings:', notifications);
    setSettingsDialogOpen(false);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Account deletion requested');
    setDeleteDialogOpen(false);
    // In a real app, you'd show a confirmation and process the deletion
  };

  const memberSince = new Date(userAttributes.created_at || Date.now()).getFullYear();

  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Typography color="text.primary">My Profile</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ py: 2 }}>
        {updateSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}

        {/* Profile Header */}
        <ProfileHeader>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mr: 3,
                      bgcolor: '#ffd100',
                      color: '#000',
                      fontSize: '3rem',
                      fontWeight: 700,
                    }}
                  >
                    {userAttributes.name?.[0]?.toUpperCase() || userAttributes.email?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 20,
                      backgroundColor: '#fff',
                      color: '#cc0001',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      width: 40,
                      height: 40,
                    }}
                  >
                    <CameraIcon />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {userAttributes.name || 'User'}
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    {userAttributes.occupation || 'Biliku Member'}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
                    Member since {memberSince} • {userAttributes.location || 'Sarawak, Malaysia'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={userAttributes.email_verified ? 'Verified' : 'Unverified'}
                      color={userAttributes.email_verified ? 'success' : 'warning'}
                      size="small"
                      sx={{ color: '#fff' }}
                    />
                    <Chip
                      label="Free Account"
                      variant="outlined"
                      size="small"
                      sx={{ color: '#fff', borderColor: '#fff' }}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => setEditDialogOpen(true)}
                  startIcon={<EditIcon />}
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      borderColor: '#ffd100',
                      backgroundColor: 'rgba(255, 209, 0, 0.1)',
                    },
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setSettingsDialogOpen(true)}
                  startIcon={<SettingsIcon />}
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    '&:hover': {
                      borderColor: '#ffd100',
                      backgroundColor: 'rgba(255, 209, 0, 0.1)',
                    },
                  }}
                >
                  Settings
                </Button>
              </Box>
            </Box>
          </CardContent>
        </ProfileHeader>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatsCard onClick={() => window.location.href = '/my-listings'}>
              <CardContent>
                <HomeIcon sx={{ fontSize: 40, color: '#cc0001', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                  3
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Listings
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard onClick={() => window.location.href = '/favorites'}>
              <CardContent>
                <FavoriteIcon sx={{ fontSize: 40, color: '#ffd100', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Favorites
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <HistoryIcon sx={{ fontSize: 40, color: '#cc0001', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                  8
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Inquiries Sent
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <AccountIcon sx={{ fontSize: 40, color: '#ffd100', mb: 1 }} />
                <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                  {new Date().getFullYear() - memberSince}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Years Member
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} md={6}>
            <ActionCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PersonIcon sx={{ color: '#cc0001', mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                </Box>

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: '#666' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Address"
                      secondary={userAttributes.email || 'Not provided'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: '#666' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Number"
                      secondary={userAttributes.phone_number || 'Not provided'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon sx={{ color: '#666' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Gender"
                      secondary={userAttributes.gender || 'Not specified'}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemIcon>
                      <BadgeIcon sx={{ color: '#666' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Account Status"
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{userAttributes.email_verified ? 'Verified Account' : 'Pending Verification'}</span>
                          <Chip
                            label={userAttributes.email_verified ? 'Verified' : 'Unverified'}
                            color={userAttributes.email_verified ? 'success' : 'warning'}
                            size="small"
                          />
                        </Box>
                      }
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </ActionCard>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <ActionCard>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <SettingsIcon sx={{ color: '#cc0001', mr: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={RouterLink}
                    to="/my-listings"
                    startIcon={<HomeIcon />}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: '#cc0001',
                      color: '#cc0001',
                      '&:hover': {
                        borderColor: '#ff0000',
                        backgroundColor: 'rgba(204, 0, 1, 0.1)',
                      },
                    }}
                  >
                    Manage My Listings
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    component={RouterLink}
                    to="/favorites"
                    startIcon={<FavoriteIcon />}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: '#cc0001',
                      color: '#cc0001',
                      '&:hover': {
                        borderColor: '#ff0000',
                        backgroundColor: 'rgba(204, 0, 1, 0.1)',
                      },
                    }}
                  >
                    My Favorites
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    component={RouterLink}
                    to="/add-listing"
                    startIcon={<HomeIcon />}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: '#ffd100',
                      color: '#cc0001',
                      '&:hover': {
                        borderColor: '#ffed4a',
                        backgroundColor: 'rgba(255, 209, 0, 0.1)',
                      },
                    }}
                  >
                    Post a New Listing
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<NotificationIcon />}
                    onClick={() => setSettingsDialogOpen(true)}
                    sx={{
                      justifyContent: 'flex-start',
                      borderColor: '#cc0001',
                      color: '#cc0001',
                      '&:hover': {
                        borderColor: '#ff0000',
                        backgroundColor: 'rgba(204, 0, 1, 0.1)',
                      },
                    }}
                  >
                    Notification Settings
                  </Button>

                  <Divider sx={{ my: 1 }} />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={signOut}
                    sx={{
                      backgroundColor: '#cc0001',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#ff0000' },
                      mt: 2,
                    }}
                  >
                    Sign Out
                  </Button>
                </Box>
              </CardContent>
            </ActionCard>
          </Grid>
        </Grid>

        {/* Account Management */}
        <Card sx={{ mt: 4, border: '1px solid #e0e0e0' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#cc0001' }}>
              Account Management
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <SecurityIcon sx={{ fontSize: 40, color: '#ffd100', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>Security</Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    Change password and manage security settings
                  </Typography>
                  <Button variant="outlined" size="small">
                    Manage Security
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <NotificationIcon sx={{ fontSize: 40, color: '#cc0001', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>Notifications</Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    Control your email and SMS preferences
                  </Typography>
                  <Button variant="outlined" size="small" onClick={() => setSettingsDialogOpen(true)}>
                    Notification Settings
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <DeleteIcon sx={{ fontSize: 40, color: '#999', mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>Delete Account</Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                    Permanently delete your account and data
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Edit Profile Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Location"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Occupation"
                value={editData.occupation}
                onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Bio"
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                margin="normal"
                multiline
                rows={3}
                placeholder="Tell others about yourself..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditProfile} variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Settings Dialog */}
        <Dialog open={settingsDialogOpen} onClose={() => setSettingsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationChange('emailNotifications')}
                  />
                }
                label="Email Notifications"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 4 }}>
                Receive important updates and messages via email
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.listingUpdates}
                    onChange={() => handleNotificationChange('listingUpdates')}
                  />
                }
                label="Listing Updates"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 4 }}>
                Get notified about inquiries on your listings
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.smsNotifications}
                    onChange={() => handleNotificationChange('smsNotifications')}
                  />
                }
                label="SMS Notifications"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 4 }}>
                Receive urgent notifications via SMS
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.marketingEmails}
                    onChange={() => handleNotificationChange('marketingEmails')}
                  />
                }
                label="Marketing Emails"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: 4 }}>
                Receive newsletters and promotional content
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSettingsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSettings} variant="contained">
              Save Settings
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ color: '#cc0001' }}>Delete Account</DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Warning:</strong> This action is irreversible. All your data will be permanently deleted.
              </Typography>
            </Alert>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to delete your account? This will permanently remove:
            </Typography>
            <List dense>
              <ListItem>
                <Typography variant="body2">• Your profile and personal information</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">• All your property listings</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">• Your favorites and saved searches</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">• Message history and communication records</Typography>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteAccount} color="error" variant="contained">
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProfilePage;