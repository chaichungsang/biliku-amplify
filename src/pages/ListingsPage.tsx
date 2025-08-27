import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material';
import { LocationOn, AttachMoney } from '@mui/icons-material';

// Mock data for now - will be replaced with real data
const mockRooms = [
  {
    id: '1',
    title: 'Cozy Single Room near UNIMAS',
    price: 350,
    location: 'Kota Samarahan',
    roomType: 'Single Room',
    images: ['https://via.placeholder.com/300x200?text=Room+1'],
    amenities: ['WiFi', 'AC', 'Private Bathroom'],
    availability: true,
  },
  {
    id: '2',
    title: 'Shared Room in City Center',
    price: 250,
    location: 'Kuching',
    roomType: 'Shared Room',
    images: ['https://via.placeholder.com/300x200?text=Room+2'],
    amenities: ['WiFi', 'Kitchen', 'Laundry'],
    availability: true,
  },
  {
    id: '3',
    title: 'Master Room with Attached Bathroom',
    price: 500,
    location: 'Petra Jaya',
    roomType: 'Master Room',
    images: ['https://via.placeholder.com/300x200?text=Room+3'],
    amenities: ['WiFi', 'AC', 'Private Bathroom', 'Parking'],
    availability: true,
  },
];

const ListingsPage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [rooms, setRooms] = React.useState(mockRooms);

  if (loading) {
    return (
      <Box className="loading">
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading rooms...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Available Rooms
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {rooms.length} rooms available in Sarawak
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card className="room-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={room.images[0]}
                alt={room.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {room.title}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                    {room.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AttachMoney fontSize="small" color="primary" />
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    RM {room.price}/month
                  </Typography>
                </Box>

                <Chip
                  label={room.roomType}
                  size="small"
                  color="secondary"
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                  {room.amenities.length > 3 && (
                    <Chip
                      label={`+${room.amenities.length - 3} more`}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  )}
                </Box>
              </CardContent>
              
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  href={`/listings/${room.id}`}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rooms.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No rooms found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ListingsPage;