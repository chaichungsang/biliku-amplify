import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  AcUnit as AcIcon,
  Wifi as WifiIcon,
  Security as SecurityIcon,
  LocalParking as ParkingIcon,
  Kitchen as KitchenIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  LocalLaundryService as LaundryIcon,
  Store as StoreIcon,
  Bathtub as BathtubIcon,
  Lightbulb as LightIcon,
  Water as WaterIcon,
  RestaurantMenu as HalalIcon,
  AutoAwesome as FanIcon,
  Videocam as CctvIcon,
  Gavel as GuardIcon,
  HomeWork as GatedIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { ListingFormData } from '../../../pages/AddListingPage';

interface AmenitiesStepProps {
  data: ListingFormData;
  errors: Record<string, string>;
  onChange: (data: Partial<ListingFormData>) => void;
}

// Basic Amenities Options
const basicAmenities = [
  { value: 'air-conditioning', label: 'Air Conditioning', icon: <AcIcon />, description: 'Essential for Sarawak climate' },
  { value: 'ceiling-fan', label: 'Ceiling Fan', icon: <FanIcon />, description: 'Additional cooling' },
  { value: 'wifi', label: 'WiFi Internet', icon: <WifiIcon />, description: 'High-speed internet access' },
  { value: 'hot-water', label: 'Hot Water', icon: <WaterIcon />, description: 'Water heater available' },
  { value: 'natural-lighting', label: 'Natural Lighting', icon: <LightIcon />, description: 'Good natural light' },
  { value: 'ventilation', label: 'Good Ventilation', icon: <FanIcon />, description: 'Air circulation' },
];

// Security Features Options
const securityFeatures = [
  { value: 'cctv', label: 'CCTV Cameras', icon: <CctvIcon />, description: 'Surveillance system' },
  { value: 'security-guard', label: 'Security Guard', icon: <GuardIcon />, description: '24-hour security' },
  { value: 'gated-community', label: 'Gated Community', icon: <GatedIcon />, description: 'Controlled access' },
  { value: 'secure-parking', label: 'Secure Parking', icon: <ParkingIcon />, description: 'Protected parking area' },
  { value: 'door-locks', label: 'Quality Door Locks', icon: <SecurityIcon />, description: 'Secure room locks' },
  { value: 'intercom', label: 'Intercom System', icon: <SecurityIcon />, description: 'Communication system' },
];

// Parking Options
const parkingOptions = [
  { value: 'none', label: 'No Parking', description: 'Street parking only' },
  { value: 'motorcycle', label: 'Motorcycle Parking', description: 'Covered motorcycle bay' },
  { value: 'car-single', label: 'Single Car Space', description: 'One covered car park' },
  { value: 'car-multiple', label: 'Multiple Car Spaces', description: 'Two or more car parks' },
];

// Kitchen Facilities Options
const kitchenFacilities = [
  { value: 'shared-kitchen', label: 'Shared Kitchen', icon: <KitchenIcon />, description: 'Common cooking area' },
  { value: 'private-kitchen', label: 'Private Kitchen', icon: <KitchenIcon />, description: 'Own cooking space' },
  { value: 'gas-stove', label: 'Gas Stove', icon: <KitchenIcon />, description: 'Gas cooking facility' },
  { value: 'electric-stove', label: 'Electric Stove', icon: <KitchenIcon />, description: 'Electric cooking' },
  { value: 'refrigerator', label: 'Refrigerator', icon: <KitchenIcon />, description: 'Fridge access' },
  { value: 'halal-kitchen', label: 'Halal Kitchen', icon: <HalalIcon />, description: 'Halal-certified cooking area' },
];

// Additional Facilities Options
const additionalFacilities = [
  { value: 'swimming-pool', label: 'Swimming Pool', icon: <PoolIcon />, description: 'Shared pool facility' },
  { value: 'gym', label: 'Gym/Fitness Center', icon: <GymIcon />, description: 'Exercise facilities' },
  { value: 'laundry', label: 'Laundry Facilities', icon: <LaundryIcon />, description: 'Washing machines' },
  { value: 'near-shops', label: 'Near Shopping Centers', icon: <StoreIcon />, description: 'Close to malls/shops' },
  { value: 'prayer-room', label: 'Prayer Room/Space', icon: <HalalIcon />, description: 'Religious facilities' },
  { value: 'study-area', label: 'Study/Common Area', icon: <LightIcon />, description: 'Shared study space' },
  { value: 'balcony-view', label: 'Balcony with View', icon: <AutoAwesome />, description: 'Scenic balcony' },
  { value: 'near-university', label: 'Near University', icon: <LightIcon />, description: 'Close to education' },
];

const AmenitiesStep: React.FC<AmenitiesStepProps> = ({ data, errors, onChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleAmenityToggle = (category: keyof ListingFormData, value: string) => {
    const currentValues = (data[category] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    onChange({ [category]: newValues });
  };

  const handleParkingChange = (value: string) => {
    onChange({ parking: value });
  };

  const isSelected = (category: keyof ListingFormData, value: string): boolean => {
    const currentValues = (data[category] as string[]) || [];
    return currentValues.includes(value);
  };

  const getSelectedCount = (category: keyof ListingFormData): number => {
    const currentValues = (data[category] as string[]) || [];
    return currentValues.length;
  };

  const AmenityCard = ({ 
    item, 
    category, 
    selected 
  }: { 
    item: any; 
    category: keyof ListingFormData; 
    selected: boolean;
  }) => (
    <Card
      onClick={() => handleAmenityToggle(category, item.value)}
      sx={{
        cursor: 'pointer',
        border: selected ? '2px solid #cc0001' : '1px solid #e0e0e0',
        backgroundColor: selected ? 'rgba(204, 0, 1, 0.05)' : '#fff',
        transition: 'all 0.2s ease-in-out',
        minHeight: 120,
        '&:hover': {
          borderColor: '#cc0001',
          backgroundColor: selected ? 'rgba(204, 0, 1, 0.08)' : 'rgba(204, 0, 1, 0.02)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(204, 0, 1, 0.15)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }}
    >
      <CardContent sx={{ 
        textAlign: 'center', 
        p: 2, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        '&:last-child': { pb: 2 } 
      }}>
        {selected && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#cc0001',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckIcon sx={{ color: '#fff', fontSize: 16 }} />
          </Box>
        )}
        <Box sx={{ color: selected ? '#cc0001' : '#666', mb: 1, fontSize: '1.5rem' }}>
          {item.icon}
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: selected ? 600 : 500,
            color: selected ? '#cc0001' : '#333',
            mb: 0.5,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {item.label}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#666',
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            lineHeight: 1.2
          }}
        >
          {item.description}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          color: '#cc0001',
          fontWeight: 600,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        <AutoAwesome />
        Amenities & Features
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
        Select the amenities and features available at your property to help tenants make informed decisions
      </Typography>

      <Grid container spacing={4}>
        {/* Basic Amenities Section */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <AcIcon sx={{ color: '#cc0001' }} />
              Basic Amenities
              <Chip 
                label={`${getSelectedCount('amenities')} selected`} 
                size="small" 
                sx={{ 
                  backgroundColor: getSelectedCount('amenities') > 0 ? '#cc0001' : '#e0e0e0',
                  color: getSelectedCount('amenities') > 0 ? '#fff' : '#666',
                  ml: 1 
                }} 
              />
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Essential features for comfortable living in Sarawak's tropical climate
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {basicAmenities.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.value}>
                <AmenityCard
                  item={item}
                  category="amenities"
                  selected={isSelected('amenities', item.value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Security Features Section */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <SecurityIcon sx={{ color: '#cc0001' }} />
              Security Features
              <Chip 
                label={`${getSelectedCount('securityFeatures')} selected`} 
                size="small" 
                sx={{ 
                  backgroundColor: getSelectedCount('securityFeatures') > 0 ? '#cc0001' : '#e0e0e0',
                  color: getSelectedCount('securityFeatures') > 0 ? '#fff' : '#666',
                  ml: 1 
                }} 
              />
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Safety and security measures for peace of mind
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {securityFeatures.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.value}>
                <AmenityCard
                  item={item}
                  category="securityFeatures"
                  selected={isSelected('securityFeatures', item.value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Parking Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <ParkingIcon sx={{ color: '#cc0001' }} />
              Parking Availability
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              What parking options are available?
            </Typography>
          </Box>
          <FormControl 
            fullWidth 
            error={!!errors.parking}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#cc0001',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#cc0001',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#cc0001',
              },
            }}
          >
            <InputLabel>Parking Type</InputLabel>
            <Select
              value={data.parking || ''}
              onChange={(e) => handleParkingChange(e.target.value)}
              label="Parking Type"
            >
              {parkingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box>
                    <Typography variant="body1">{option.label}</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      {option.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.parking && (
              <FormHelperText>{errors.parking}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Kitchen Facilities Section */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <KitchenIcon sx={{ color: '#cc0001' }} />
              Kitchen Facilities
              <Chip 
                label={`${getSelectedCount('kitchenFacilities')} selected`} 
                size="small" 
                sx={{ 
                  backgroundColor: getSelectedCount('kitchenFacilities') > 0 ? '#cc0001' : '#e0e0e0',
                  color: getSelectedCount('kitchenFacilities') > 0 ? '#fff' : '#666',
                  ml: 1 
                }} 
              />
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Cooking facilities and dietary considerations
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {kitchenFacilities.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.value}>
                <AmenityCard
                  item={item}
                  category="kitchenFacilities"
                  selected={isSelected('kitchenFacilities', item.value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Additional Facilities Section */}
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#333', 
                fontWeight: 600, 
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <PoolIcon sx={{ color: '#cc0001' }} />
              Additional Facilities & Location Benefits
              <Chip 
                label={`${getSelectedCount('additionalFacilities')} selected`} 
                size="small" 
                sx={{ 
                  backgroundColor: getSelectedCount('additionalFacilities') > 0 ? '#cc0001' : '#e0e0e0',
                  color: getSelectedCount('additionalFacilities') > 0 ? '#fff' : '#666',
                  ml: 1 
                }} 
              />
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              Extra amenities and nearby conveniences that add value
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {additionalFacilities.map((item) => (
              <Grid item xs={6} sm={4} md={3} key={item.value}>
                <AmenityCard
                  item={item}
                  category="additionalFacilities"
                  selected={isSelected('additionalFacilities', item.value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', mt: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#cc0001', mb: 2, fontSize: '1rem' }}>
                📋 Selection Summary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Basic Amenities
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#cc0001' }}>
                    {getSelectedCount('amenities')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Security Features
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#cc0001' }}>
                    {getSelectedCount('securityFeatures')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Kitchen Facilities
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#cc0001' }}>
                    {getSelectedCount('kitchenFacilities')}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Additional Features
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#cc0001' }}>
                    {getSelectedCount('additionalFacilities')}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Tips Section */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#856404', mb: 2, fontSize: '1rem' }}>
                💡 Tips for Selecting Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                <Chip
                  label="AC is essential in Sarawak"
                  size="small"
                  sx={{ backgroundColor: '#fff', color: '#856404' }}
                />
                <Chip
                  label="Security features increase demand"
                  size="small"
                  sx={{ backgroundColor: '#fff', color: '#856404' }}
                />
                <Chip
                  label="Consider cultural preferences"
                  size="small"
                  sx={{ backgroundColor: '#fff', color: '#856404' }}
                />
                <Chip
                  label="Highlight unique features"
                  size="small"
                  sx={{ backgroundColor: '#fff', color: '#856404' }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: '#856404' }}>
                Select amenities that accurately represent your property. 
                Misleading information can lead to disappointed tenants and negative reviews.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AmenitiesStep;