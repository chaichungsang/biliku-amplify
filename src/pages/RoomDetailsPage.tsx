import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  LocationOn,
  AttachMoney,
  Wifi,
  AcUnit,
  Bathroom,
  LocalParking,
  Kitchen,
  LocalLaundryService,
  Phone,
  Email,
} from '@mui/icons-material';

// Mock data - will be replaced with real data
const mockRoom = {
  id: '1',
  title: 'Cozy Single Room near UNIMAS',
  description: 'A comfortable single room perfect for students. Located in a quiet residential area with easy access to UNIMAS. The room is fully furnished with a single bed, study desk, wardrobe, and has a private bathroom.',
  price: 350,
  deposit: 350,
  location: 'Kota Samarahan',
  city: 'Kota Samarahan',
  roomType: 'Single Room',
  images: [
    'https://via.placeholder.com/600x400?text=Room+1',
    'https://via.placeholder.com/600x400?text=Room+1+Bathroom',
    'https://via.placeholder.com/600x400?text=Room+1+View',
  ],
  amenities: ['WiFi', 'AC', 'Private Bathroom', 'Study Desk', 'Wardrobe'],
  availability: true,
  availableFrom: '2024-01-01',
  contractDuration: 12,
  utilitiesIncluded: true,
  internetIncluded: true,
  furnished: true,
  petFriendly: false,
  smokingAllowed: false,
  genderPreference: 'Female',
  contactWhatsApp: '+60123456789',
  contactEmail: 'owner@example.com',
  user: {
    name: 'Sarah Lee',
    email: 'sarah@example.com',
  },
};

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi />,
  'AC': <AcUnit />,
  'Private Bathroom': <Bathroom />,
  'Parking': <LocalParking />,
  'Kitchen': <Kitchen />,
  'Laundry': <LocalLaundryService />,
};

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = React.useState(mockRoom);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!room) {
    return (
      <Alert severity="error">
        Room not found
      </Alert>
    );
  }

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the room: ${room.title}`);
    const whatsappUrl = `https://wa.me/${room.contactWhatsApp.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactEmail = () => {
    const subject = encodeURIComponent(`Inquiry about: ${room.title}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in your room listing: ${room.title}\n\nPlease let me know if it's still available.\n\nThank you!`);
    const emailUrl = `mailto:${room.contactEmail}?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={room.images[currentImageIndex]}
              alt={room.title}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
          
          {room.images.length > 1 && (
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {room.images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      opacity: index === currentImageIndex ? 1 : 0.7,
                      border: index === currentImageIndex ? 2 : 0,
                      borderColor: 'primary.main',
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <CardMedia
                      component="img"
                      height="100"
                      image={image}
                      alt={`${room.title} ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Room Details */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              {room.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                {room.location}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AttachMoney fontSize="small" color="primary" />
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                RM {room.price}
                <Typography component="span" variant="body2" color="text.secondary">
                  /month
                </Typography>
              </Typography>
            </Box>

            {room.deposit > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Deposit: RM {room.deposit}
              </Typography>
            )}

            <Box sx={{ mb: 3 }}>
              <Chip label={room.roomType} color="secondary" sx={{ mr: 1, mb: 1 }} />
              {room.genderPreference && (
                <Chip label={`${room.genderPreference} Only`} variant="outlined" sx={{ mb: 1 }} />
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Phone />}
                onClick={handleContactWhatsApp}
                sx={{ mb: 1 }}
              >
                WhatsApp Owner
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Email />}
                onClick={handleContactEmail}
              >
                Email Owner
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
              Room Details
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Available From"
                  secondary={new Date(room.availableFrom).toLocaleDateString()}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Contract Duration"
                  secondary={`${room.contractDuration} months`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Utilities"
                  secondary={room.utilitiesIncluded ? 'Included' : 'Not included'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Furnished"
                  secondary={room.furnished ? 'Yes' : 'No'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Pet Friendly"
                  secondary={room.petFriendly ? 'Yes' : 'No'}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Smoking"
                  secondary={room.smokingAllowed ? 'Allowed' : 'Not allowed'}
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Description and Amenities */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {room.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>
            <Grid container spacing={2}>
              {room.amenities.map((amenity) => (
                <Grid item xs={6} sm={4} md={3} key={amenity}>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    {amenityIcons[amenity] && (
                      <Box sx={{ mr: 1, color: 'primary.main' }}>
                        {amenityIcons[amenity]}
                      </Box>
                    )}
                    <Typography variant="body2">{amenity}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoomDetailsPage;