import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Breadcrumbs,
  Link,
  Fab,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Tab,
  Tabs,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  VisibilityOff as HideIcon,
  Share as ShareIcon,
  ContentCopy as CopyIcon,
  Analytics as AnalyticsIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as PriceIcon,
  Home as HomeIcon,
  CheckCircle as ActiveIcon,
  Pause as PausedIcon,
  Schedule as PendingIcon,
  Clear as ExpiredIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Styled components
const ListingCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  zIndex: 2,
  fontWeight: 600,
  ...(status === 'active' && {
    backgroundColor: '#4caf50',
    color: 'white',
  }),
  ...(status === 'paused' && {
    backgroundColor: '#ff9800',
    color: 'white',
  }),
  ...(status === 'pending' && {
    backgroundColor: '#2196f3',
    color: 'white',
  }),
  ...(status === 'expired' && {
    backgroundColor: '#f44336',
    color: 'white',
  }),
}));

const StatsCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  },
}));

interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  city: string;
  location: string;
  roomType: string;
  status: 'active' | 'paused' | 'pending' | 'expired';
  createdAt: string;
  views: number;
  inquiries: number;
  favorites: number;
  genderPreference?: string;
  amenities: string[];
}

const MyListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  React.useEffect(() => {
    document.title = 'My Listings - Biliku | Manage Your Property Listings';
  }, []);

  // Mock data - replace with actual API data
  const mockListings: Listing[] = [
    {
      id: '1',
      title: 'Modern Studio Apartment in City Center',
      description: 'Fully furnished studio unit with excellent amenities',
      images: ['/placeholder-room.jpg'],
      price: 800,
      city: 'Kuching',
      location: 'City Center',
      roomType: 'Studio Unit',
      status: 'active',
      createdAt: '2024-01-15',
      views: 245,
      inquiries: 12,
      favorites: 8,
      genderPreference: 'any',
      amenities: ['wifi', 'air_conditioning', 'kitchen', 'parking'],
    },
    {
      id: '2',
      title: 'Cozy Single Room Near University',
      description: 'Perfect for students, walking distance to UNIMAS',
      images: ['/placeholder-room.jpg'],
      price: 450,
      city: 'Kuching',
      location: 'UNIMAS Area',
      roomType: 'Single Room',
      status: 'paused',
      createdAt: '2024-01-10',
      views: 189,
      inquiries: 8,
      favorites: 15,
      genderPreference: 'female',
      amenities: ['wifi', 'study_desk', 'wardrobe'],
    },
    {
      id: '3',
      title: 'Master Bedroom with Ensuite',
      description: 'Spacious master bedroom in landed property',
      images: ['/placeholder-room.jpg'],
      price: 650,
      city: 'Sibu',
      location: 'Town Center',
      roomType: 'Master Bedroom',
      status: 'pending',
      createdAt: '2024-01-20',
      views: 67,
      inquiries: 3,
      favorites: 5,
      genderPreference: 'male',
      amenities: ['wifi', 'air_conditioning', 'parking', 'private_bathroom'],
    },
  ];

  const [listings, setListings] = useState<Listing[]>(mockListings);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, listing: Listing) => {
    setAnchorEl(event.currentTarget);
    setSelectedListing(listing);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedListing(null);
  };

  const handleDeleteListing = () => {
    if (selectedListing) {
      setListings(prev => prev.filter(listing => listing.id !== selectedListing.id));
      setDeleteDialogOpen(false);
      setAlertMessage(`Listing "${selectedListing.title}" has been deleted successfully.`);
      setTimeout(() => setAlertMessage(''), 5000);
    }
    handleMenuClose();
  };

  const handleToggleStatus = (listingId: string) => {
    setListings(prev => prev.map(listing => 
      listing.id === listingId 
        ? { ...listing, status: listing.status === 'active' ? 'paused' : 'active' } 
        : listing
    ));
    const listing = listings.find(l => l.id === listingId);
    const newStatus = listing?.status === 'active' ? 'paused' : 'active';
    setAlertMessage(`Listing status changed to ${newStatus}.`);
    setTimeout(() => setAlertMessage(''), 3000);
    handleMenuClose();
  };

  const handleShareListing = () => {
    if (selectedListing) {
      const url = `${window.location.origin}/listings/${selectedListing.id}`;
      navigator.clipboard.writeText(url);
      setAlertMessage('Listing URL copied to clipboard!');
      setTimeout(() => setAlertMessage(''), 3000);
    }
    setShareDialogOpen(false);
    handleMenuClose();
  };

  const getFilteredListings = () => {
    switch (tabValue) {
      case 0: return listings;
      case 1: return listings.filter(l => l.status === 'active');
      case 2: return listings.filter(l => l.status === 'paused');
      case 3: return listings.filter(l => l.status === 'pending');
      case 4: return listings.filter(l => l.status === 'expired');
      default: return listings;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <ActiveIcon />;
      case 'paused': return <PausedIcon />;
      case 'pending': return <PendingIcon />;
      case 'expired': return <ExpiredIcon />;
      default: return <ActiveIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'pending': return 'info';
      case 'expired': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const totalInquiries = listings.reduce((sum, listing) => sum + listing.inquiries, 0);
  const totalFavorites = listings.reduce((sum, listing) => sum + listing.favorites, 0);
  const activeListings = listings.filter(l => l.status === 'active').length;

  return (
    <Box>
      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/profile" color="inherit">
            Profile
          </Link>
          <Typography color="text.primary">My Listings</Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {alertMessage && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setAlertMessage('')}>
            {alertMessage}
          </Alert>
        )}

        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#cc0001', mb: 1 }}>
              My Listings
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Manage your property listings and track their performance
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add-listing')}
            sx={{
              backgroundColor: '#cc0001',
              '&:hover': { backgroundColor: '#ff0000' },
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Add New Listing
          </Button>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <HomeIcon sx={{ fontSize: 40, color: '#cc0001', mr: 1 }} />
                  <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                    {listings.length}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Total Listings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {activeListings} active
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <ViewIcon sx={{ fontSize: 40, color: '#ffd100', mr: 1 }} />
                  <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                    {totalViews}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Total Views
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Across all listings
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <MessageIcon sx={{ fontSize: 40, color: '#cc0001', mr: 1 }} />
                  <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                    {totalInquiries}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Inquiries
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Messages received
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <FavoriteIcon sx={{ fontSize: 40, color: '#ffd100', mr: 1 }} />
                  <Typography variant="h4" sx={{ color: '#cc0001', fontWeight: 700 }}>
                    {totalFavorites}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Favorites
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Times favorited
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Card sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, newValue) => setTabValue(newValue)}
            sx={{ px: 2 }}
          >
            <Tab 
              label={
                <Badge badgeContent={listings.length} color="primary">
                  All Listings
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={listings.filter(l => l.status === 'active').length} color="success">
                  Active
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={listings.filter(l => l.status === 'paused').length} color="warning">
                  Paused
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={listings.filter(l => l.status === 'pending').length} color="info">
                  Pending
                </Badge>
              } 
            />
            <Tab 
              label={
                <Badge badgeContent={listings.filter(l => l.status === 'expired').length} color="error">
                  Expired
                </Badge>
              } 
            />
          </Tabs>
        </Card>

        {/* Listings Grid */}
        {getFilteredListings().length === 0 ? (
          <Card sx={{ p: 6, textAlign: 'center' }}>
            <HomeIcon sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
              No listings found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#888' }}>
              {tabValue === 0 
                ? "You haven't created any listings yet. Start by posting your first property!"
                : `No listings with ${['all', 'active', 'paused', 'pending', 'expired'][tabValue]} status.`
              }
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/add-listing')}
              sx={{
                backgroundColor: '#cc0001',
                '&:hover': { backgroundColor: '#ff0000' },
              }}
            >
              Create Your First Listing
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {getFilteredListings().map((listing) => (
              <Grid item xs={12} sm={6} md={4} key={listing.id}>
                <ListingCard>
                  <Box sx={{ position: 'relative' }}>
                    <StatusChip
                      status={listing.status}
                      label={listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      icon={getStatusIcon(listing.status)}
                      size="small"
                    />
                    <CardMedia
                      component="img"
                      height="200"
                      image={listing.images[0]}
                      alt={listing.title}
                    />
                    <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, listing)}
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                      {listing.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ color: '#666', fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {listing.location}, {listing.city}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PriceIcon sx={{ color: '#cc0001', fontSize: 18, mr: 0.5 }} />
                      <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 700 }}>
                        RM {listing.price}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', ml: 0.5 }}>
                        /month
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Performance Metrics */}
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
                            {listing.views}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                            Views
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
                            {listing.inquiries}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                            Inquiries
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#cc0001', fontWeight: 600 }}>
                            {listing.favorites}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#666' }}>
                            Favorites
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarIcon sx={{ color: '#666', fontSize: 14, mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        Created {formatDate(listing.createdAt)}
                      </Typography>
                    </Box>

                    {/* Quick Actions */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/listings/${listing.id}`)}
                        sx={{
                          flex: 1,
                          borderColor: '#cc0001',
                          color: '#cc0001',
                          '&:hover': {
                            borderColor: '#ff0000',
                            backgroundColor: 'rgba(204, 0, 1, 0.1)',
                          },
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/edit-listing/${listing.id}`)}
                        sx={{
                          flex: 1,
                          borderColor: '#ffd100',
                          color: '#cc0001',
                          '&:hover': {
                            borderColor: '#ffed4a',
                            backgroundColor: 'rgba(255, 209, 0, 0.1)',
                          },
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </CardContent>
                </ListingCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate(`/listings/${selectedListing?.id}`)}>
            <ListItemIcon>
              <ViewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Listing</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate(`/edit-listing/${selectedListing?.id}`)}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit Listing</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => selectedListing && handleToggleStatus(selectedListing.id)}>
            <ListItemIcon>
              {selectedListing?.status === 'active' ? <PausedIcon fontSize="small" /> : <ActiveIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText>
              {selectedListing?.status === 'active' ? 'Pause Listing' : 'Activate Listing'}
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={() => setShareDialogOpen(true)}>
            <ListItemIcon>
              <ShareIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Share Listing</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setDeleteDialogOpen(true)} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete Listing</ListItemText>
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Delete Listing</DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 2 }}>
              This action cannot be undone.
            </Alert>
            <Typography variant="body1">
              Are you sure you want to delete the listing "{selectedListing?.title}"?
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
              This will permanently remove the listing and all associated data including:
            </Typography>
            <List dense sx={{ mt: 1 }}>
              <ListItem>
                <Typography variant="body2">• Property details and images</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">• Inquiry messages and communication</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">• Performance statistics and analytics</Typography>
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteListing} color="error" variant="contained">
              Delete Listing
            </Button>
          </DialogActions>
        </Dialog>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Share Listing</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Share "{selectedListing?.title}" with others:
            </Typography>
            <Box sx={{
              backgroundColor: '#f5f5f5',
              p: 2,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}>
              <Typography variant="body2" sx={{ flexGrow: 1, wordBreak: 'break-all' }}>
                {`${window.location.origin}/listings/${selectedListing?.id}`}
              </Typography>
              <IconButton onClick={handleShareListing}>
                <CopyIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Click the copy icon to copy the URL to your clipboard.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
            <Button onClick={handleShareListing} variant="contained">
              Copy Link
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          onClick={() => navigate('/add-listing')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#cc0001',
            '&:hover': { backgroundColor: '#ff0000' },
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
    </Box>
  );
};

export default MyListingsPage;