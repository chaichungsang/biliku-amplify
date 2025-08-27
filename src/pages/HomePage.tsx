import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Pagination,
  Fade,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  PeopleAlt as MixedIcon,
  Pets as PetsIcon,
  CheckCircle as CheckIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

// Import data
import { sarawakCities } from '../data/sarawakCities';
import { roomTypes } from '../data/roomTypes';
import { amenities } from '../data/amenities';
import { religions } from '../data/religions';

// Styled components matching Vue styles
const HeroSection = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, 
      rgba(255, 248, 225, 0.98) 0%, 
      rgba(255, 255, 255, 0.95) 15%,
      rgba(255, 209, 0, 0.12) 30%,
      rgba(255, 248, 225, 0.95) 50%,
      rgba(204, 0, 1, 0.08) 70%,
      rgba(255, 209, 0, 0.15) 85%,
      rgba(255, 248, 225, 0.98) 100%
    ),
    radial-gradient(ellipse at top left, rgba(204, 0, 1, 0.08) 0%, transparent 60%),
    radial-gradient(ellipse at bottom right, rgba(255, 209, 0, 0.12) 0%, transparent 65%)
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: '#333333',
  textAlign: 'center',
  padding: '80px 20px',
  borderBottom: '6px solid #ffd100',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(45deg, transparent 48%, rgba(255, 209, 0, 0.04) 50%, transparent 52%),
      linear-gradient(-45deg, transparent 48%, rgba(204, 0, 1, 0.02) 50%, transparent 52%)
    `,
    backgroundSize: '60px 60px',
    opacity: 0.5,
    pointerEvents: 'none'
  }
}));

const HeroTextContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '120px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HeroFreeBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
  color: '#2d3748',
  padding: '8px 16px',
  borderRadius: '25px',
  fontWeight: 700,
  fontSize: '0.9rem',
  marginTop: '15px',
  marginBottom: '25px',
  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
  animation: 'pulse 2s infinite alternate',
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
      transform: 'scale(1)',
    },
    '100%': {
      boxShadow: '0 6px 20px rgba(255, 215, 0, 0.5)',
      transform: 'scale(1.02)',
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.98) 0%, 
      rgba(255, 248, 225, 0.95) 25%,
      rgba(255, 255, 255, 0.96) 50%,
      rgba(255, 248, 225, 0.95) 75%,
      rgba(255, 255, 255, 0.98) 100%
    )
  `,
  borderRadius: '16px',
  padding: '35px',
  maxWidth: '1000px',
  margin: '0 auto',
  boxShadow: '0 12px 40px rgba(204, 0, 1, 0.08), 0 6px 20px rgba(255, 209, 0, 0.12)',
  border: '2px solid rgba(255, 209, 0, 0.4)',
  position: 'relative',
  backdropFilter: 'blur(8px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, rgba(0, 0, 0, 0.8) 33%, rgba(0, 0, 0, 0.8) 66%, #ffd100 66%, #ffd100 100%)',
    borderRadius: '16px 16px 0 0'
  }
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5a5f',
  color: 'white',
  borderRadius: '8px',
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#ff4448',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 15px rgba(255, 90, 95, 0.3)',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    color: '#888888',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
}));

const GenderButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  padding: '8px 12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  backgroundColor: active ? '#4a6fa5' : 'white',
  color: active ? 'white' : '#666',
  cursor: 'pointer',
  fontSize: '0.9rem',
  '&:hover': {
    backgroundColor: active ? '#4a6fa5' : '#f5f5f5',
    transform: 'translateY(-1px)',
  },
}));

const FeatureToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: active ? '#4a6fa5' : '#f5f5f5',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '4px 10px',
  fontSize: '0.75rem',
  cursor: 'pointer',
  color: active ? 'white' : '#555',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: active ? '#4a6fa5' : '#e8e8e8',
    borderColor: active ? '#4a6fa5' : '#ccc',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '30px',
  gap: '15px',
}));

const SarawakFlagStrip = styled(Box)(({ theme }) => ({
  height: '3px',
  background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
  flex: 1,
  maxWidth: '150px',
  borderRadius: '3px',
}));

const ListingCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 248, 225, 0.8) 50%, #ffffff 100%)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 2px 15px rgba(204, 0, 1, 0.08), 0 1px 6px rgba(255, 209, 0, 0.1)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  border: '1px solid rgba(255, 209, 0, 0.3)',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, #000000 33%, #000000 66%, #ffd100 66%, #ffd100 100%)',
    opacity: 0.6
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(204, 0, 1, 0.15), 0 4px 15px rgba(255, 209, 0, 0.2)',
    background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 248, 225, 0.95) 50%, #ffffff 100%)',
    '&::before': {
      opacity: 1
    }
  },
}));

const ListingImage = styled(CardMedia)(({ theme }) => ({
  width: '300px',
  height: '220px',
  flexShrink: 0,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '200px',
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '15px',
  left: '0',
  backgroundColor: '#ff5a5f',
  color: 'white',
  padding: '8px 15px',
  fontWeight: 'bold',
  borderRadius: '0 4px 4px 0',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
}));

interface SearchFilters {
  searchQuery: string;
  city: string;
  roomType: string;
  minPrice: string;
  maxPrice: string;
  genderPreference: string;
  religionPreference: string;
  isPetFriendly: boolean;
  amenities: string[];
  availableFrom: string;
}

interface Listing {
  id: string;
  title: string;
  city: string;
  state?: string;
  location?: string;
  room_type: string;
  price: number;
  images?: string[];
  gender_preference?: string;
  available_from?: string;
  created_at: string;
  amenities?: string[];
  property?: {
    amenities?: string[];
  };
}

interface HeroMessage {
  id: number;
  title: string;
  subtitle: string;
  badgeIcon: React.ReactNode;
  badgeText: string;
}

const heroMessages: HeroMessage[] = [
  {
    id: 0,
    title: 'Find Your Perfect Room in Sarawak',
    subtitle: 'Discover affordable, quality accommodations across Sarawak\'s cities',
    badgeIcon: <StarIcon />,
    badgeText: 'Browsing properties is 100% FREE',
  },
  {
    id: 1,
    title: 'Rent out your rooms and houses in Sarawak',
    subtitle: 'Free listing services in Biliku, for Sarawakians by Sarawakians',
    badgeIcon: <HomeIcon />,
    badgeText: 'Listing your property is 100% FREE',
  },
  {
    id: 2,
    title: 'Property Agents Welcome!',
    subtitle: 'Post your property with us for free to help Sarawakians find their perfect homes',
    badgeIcon: <BusinessIcon />,
    badgeText: 'Agent listings are also 100% FREE',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Search filters state
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchQuery: '',
    city: '',
    roomType: '',
    minPrice: '',
    maxPrice: '',
    genderPreference: '',
    religionPreference: '',
    isPetFriendly: false,
    amenities: [],
    availableFrom: '',
  });

  // Listing data state
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Hero message rotation
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const itemsPerPage = 20;

  // Today's date for date input validation
  const todayFormatted = new Date().toISOString().split('T')[0];

  // Check if any search criteria are provided
  const hasSearchCriteria = Object.entries(searchFilters).some(([key, value]) => {
    if (key === 'amenities') return (value as string[]).length > 0;
    if (key === 'isPetFriendly') return value === true;
    return value !== '' && value !== null && value !== undefined;
  });

  // Hero message rotation effect
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  // Fetch listings on component mount
  useEffect(() => {
    fetchAllListings();
  }, [currentPage]);

  const fetchAllListings = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock data for now - replace with actual API call
      const mockListings: Listing[] = [
        {
          id: 'demo-1',
          title: 'Modern Studio Unit in City Center',
          city: 'Kuching',
          state: 'Sarawak',
          location: 'City Center',
          room_type: 'studio_unit',
          price: 800,
          images: ['/placeholder-room.jpg'],
          gender_preference: 'any',
          available_from: '2024-02-01',
          created_at: '2024-01-15T10:00:00Z',
          amenities: ['wifi', 'air_conditioning', 'kitchen'],
        },
        {
          id: 'demo-2',
          title: 'Cozy Single Room Near University',
          city: 'Kuching',
          state: 'Sarawak',
          location: 'UNIMAS Area',
          room_type: 'single_room',
          price: 450,
          images: ['/placeholder-room.jpg'],
          gender_preference: 'female',
          available_from: '2024-02-15',
          created_at: '2024-01-20T14:30:00Z',
          amenities: ['wifi', 'study_desk', 'wardrobe'],
        },
        {
          id: 'demo-3',
          title: 'Spacious Master Bedroom with Ensuite',
          city: 'Sibu',
          state: 'Sarawak',
          location: 'Town Center',
          room_type: 'master_bedroom',
          price: 650,
          images: ['/placeholder-room.jpg'],
          gender_preference: 'male',
          available_from: '2024-03-01',
          created_at: '2024-01-25T09:15:00Z',
          amenities: ['wifi', 'air_conditioning', 'parking'],
        },
      ];

      setAllListings(mockListings);
      setTotalItems(mockListings.length);
      setTotalPages(Math.ceil(mockListings.length / itemsPerPage));
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof SearchFilters, value: string | boolean | string[]) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    handleInputChange(name as keyof SearchFilters, value);
  };

  const toggleAmenity = (amenity: string) => {
    const formattedAmenity = amenity.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
    const currentAmenities = searchFilters.amenities;
    
    if (currentAmenities.includes(formattedAmenity)) {
      handleInputChange('amenities', currentAmenities.filter(a => a !== formattedAmenity));
    } else {
      handleInputChange('amenities', [...currentAmenities, formattedAmenity]);
    }
  };

  const searchProperties = () => {
    if (!hasSearchCriteria) return;

    const queryParams = new URLSearchParams();
    
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (key === 'amenities') {
        if ((value as string[]).length > 0) {
          queryParams.set(key, (value as string[]).join(','));
        }
      } else if (key === 'isPetFriendly') {
        if (value === true) queryParams.set(key, 'true');
      } else if (value !== '' && value !== null && value !== undefined) {
        queryParams.set(key, String(value));
      }
    });

    queryParams.set('page', '1');
    navigate(`/listings?${queryParams.toString()}`);
  };

  const viewListingDetails = (id: string) => {
    navigate(`/listings/${id}`);
  };

  const formatRoomType = (type: string) => {
    const formatMap: { [key: string]: string } = {
      single_room: 'Single Room',
      master_bedroom: 'Master Bedroom',
      middle_room: 'Middle Room',
      small_room: 'Small Room',
      studio_unit: 'Studio Unit',
      entire_house: 'Entire House',
      whole_house: 'Whole House',
    };

    return formatMap[type.toLowerCase()] || type.replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatAmenityName = (amenity: string) => {
    return amenity.replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const currentMessage = heroMessages[currentMessageIndex];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <HeroSection>
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
          <HeroTextContainer>
            <Fade key={currentMessageIndex} in timeout={600}>
              <Box sx={{ textAlign: 'center', width: '100%' }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    fontWeight: 700,
                    marginBottom: '15px',
                    color: '#cc0001',
                    textShadow: '1px 1px 3px rgba(255, 209, 0, 0.3)',
                  }}
                >
                  {currentMessage.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.2rem' },
                    marginBottom: '30px',
                    color: '#555555',
                    maxWidth: '700px',
                    margin: '0 auto 30px auto',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {currentMessage.subtitle}
                </Typography>
                <HeroFreeBadge>
                  {currentMessage.badgeIcon}
                  <span>{currentMessage.badgeText}</span>
                </HeroFreeBadge>
              </Box>
            </Fade>
          </HeroTextContainer>

          {/* Search Container */}
          <SearchContainer>
            {/* Address Search */}
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                label="Search by Address or Keyword"
                placeholder="Enter address, area or keywords..."
                value={searchFilters.searchQuery}
                onChange={(e) => handleInputChange('searchQuery', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                  },
                }}
              />
            </Box>

            {/* Search Fields Row 1 */}
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="city"
                    value={searchFilters.city}
                    onChange={handleSelectChange}
                    label="City"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="">All Cities</MenuItem>
                    {sarawakCities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Room Type</InputLabel>
                  <Select
                    name="roomType"
                    value={searchFilters.roomType}
                    onChange={handleSelectChange}
                    label="Room Type"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {roomTypes.map((type) => (
                      <MenuItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#333', marginBottom: '8px', fontWeight: 600 }}>
                    Gender Preference
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(204, 0, 1, 0.05)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255, 209, 0, 0.3)' }}>
                    <GenderButton
                      active={searchFilters.genderPreference === ''}
                      onClick={() => handleInputChange('genderPreference', '')}
                    >
                      <MixedIcon />
                      <span>No Preference</span>
                    </GenderButton>
                    <GenderButton
                      active={searchFilters.genderPreference === 'male'}
                      onClick={() => handleInputChange('genderPreference', 'male')}
                    >
                      <MaleIcon />
                      <span>Male</span>
                    </GenderButton>
                    <GenderButton
                      active={searchFilters.genderPreference === 'female'}
                      onClick={() => handleInputChange('genderPreference', 'female')}
                    >
                      <FemaleIcon />
                      <span>Female</span>
                    </GenderButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Search Fields Row 2 */}
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item xs={12} sm={6} md={4}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#333', marginBottom: '8px', fontWeight: 600 }}>
                    Price Range (RM)
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <TextField
                      type="number"
                      placeholder="Min"
                      value={searchFilters.minPrice}
                      onChange={(e) => handleInputChange('minPrice', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
                      inputProps={{ min: 0 }}
                    />
                    <Typography sx={{ color: '#666', fontWeight: 'bold' }}>-</Typography>
                    <TextField
                      type="number"
                      placeholder="Max"
                      value={searchFilters.maxPrice}
                      onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
                      inputProps={{ min: 0 }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Religion</InputLabel>
                  <Select
                    name="religionPreference"
                    value={searchFilters.religionPreference}
                    onChange={handleSelectChange}
                    label="Religion"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="">No Preference</MenuItem>
                    {religions.map((religion) => (
                      <MenuItem key={religion} value={religion.toLowerCase()}>
                        {religion}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#333', marginBottom: '8px', fontWeight: 600 }}>
                    Available From
                  </Typography>
                  <TextField
                    type="date"
                    value={searchFilters.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    inputProps={{ min: todayFormatted }}
                    sx={{ 
                      width: '100%',
                      '& .MuiOutlinedInput-root': { backgroundColor: 'white' }
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Features & Amenities */}
            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="body2" sx={{ color: '#333', marginBottom: '8px', fontWeight: 600 }}>
                Features & Amenities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <FeatureToggleButton
                  active={searchFilters.isPetFriendly}
                  onClick={() => handleInputChange('isPetFriendly', !searchFilters.isPetFriendly)}
                >
                  <PetsIcon sx={{ marginRight: '4px', fontSize: '0.8rem' }} />
                  Pet Friendly
                </FeatureToggleButton>
                {amenities.map((amenity) => {
                  const formattedAmenity = amenity.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
                  const isActive = searchFilters.amenities.includes(formattedAmenity);
                  return (
                    <FeatureToggleButton
                      key={amenity}
                      active={isActive}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <CheckIcon sx={{ marginRight: '4px', fontSize: '0.8rem' }} />
                      {amenity}
                    </FeatureToggleButton>
                  );
                })}
              </Box>
            </Box>

            {/* Search Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <SearchButton
                onClick={searchProperties}
                disabled={!hasSearchCriteria}
              >
                <SearchIcon />
                Search
              </SearchButton>
            </Box>
          </SearchContainer>
        </Box>
      </HeroSection>

      {/* Featured Listings */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          padding: '60px 20px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 225, 0.8) 30%, rgba(255, 255, 255, 0.9) 70%, rgba(255, 248, 225, 0.85) 100%)',
          borderRadius: '25px 25px 0 0',
          position: 'relative',
          marginTop: '-20px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70%',
            height: '4px',
            background: 'linear-gradient(to right, #cc0001 0%, #cc0001 33%, rgba(0, 0, 0, 0.6) 33%, rgba(0, 0, 0, 0.6) 66%, #ffd100 66%, #ffd100 100%)',
            borderRadius: '0 0 4px 4px'
          }
        }}
      >
        <SectionHeader>
          <SarawakFlagStrip />
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: '2rem',
              textAlign: 'center',
              color: '#d32f2f',
              fontWeight: 600,
            }}
          >
            Available Rooms
          </Typography>
          <SarawakFlagStrip />
        </SectionHeader>

        {loading ? (
          <Box sx={{ textAlign: 'center', padding: '60px' }}>
            <CircularProgress sx={{ color: '#ff5a5f', marginBottom: '10px' }} />
            <Typography variant="h6" color="text.secondary">
              Loading listings...
            </Typography>
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ maxWidth: '600px', margin: '0 auto' }}>
            {error}
          </Alert>
        ) : (
          <Box>
            {allListings.length === 0 ? (
              <Box sx={{ textAlign: 'center', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                <HomeIcon sx={{ fontSize: '3.5rem', color: '#ddd', marginBottom: '20px' }} />
                <Typography variant="h6" color="text.secondary">
                  No listings available at the moment.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {allListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    onClick={() => viewListingDetails(listing.id)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <ListingImage
                        image={listing.images?.[0] || '/placeholder-room.jpg'}
                        title={listing.title}
                      />
                      <PriceTag>RM {listing.price}</PriceTag>
                    </Box>
                    <CardContent sx={{ flex: 1, padding: '15px' }}>
                      <Typography variant="h6" sx={{ fontSize: '1.2rem', marginBottom: '8px', color: '#333', fontWeight: 600 }}>
                        {listing.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666', fontSize: '0.9rem' }}>
                        <LocationIcon sx={{ color: '#ff5a5f', marginRight: '5px', fontSize: '1rem' }} />
                        {listing.location && `${listing.location}, `}{listing.city}, {listing.state || 'Sarawak'}
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}>
                          <HomeIcon sx={{ color: '#ff5a5f', fontSize: '0.85rem' }} />
                          {formatRoomType(listing.room_type)}
                        </Box>
                        {listing.gender_preference && listing.gender_preference !== 'any' && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}>
                            <PeopleIcon sx={{ color: '#ff5a5f', fontSize: '0.85rem' }} />
                            {listing.gender_preference === 'male' ? 'Male Only' : 'Female Only'}
                          </Box>
                        )}
                        {listing.available_from && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}>
                            <CalendarIcon sx={{ color: '#ff5a5f', fontSize: '0.85rem' }} />
                            Available: {formatDate(listing.available_from)}
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#555' }}>
                          <TimeIcon sx={{ color: '#ff5a5f', fontSize: '0.85rem' }} />
                          Listed: {formatDate(listing.created_at)}
                        </Box>
                      </Box>
                      {(listing.amenities?.length || listing.property?.amenities?.length) && (
                        <Box sx={{ marginTop: '6px' }}>
                          <Typography variant="body2" sx={{ fontSize: '0.85rem', marginBottom: '4px', color: '#555', fontWeight: 600 }}>
                            Amenities:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {(listing.amenities || listing.property?.amenities || []).map((amenity) => (
                              <Chip
                                key={amenity}
                                label={formatAmenityName(amenity)}
                                size="small"
                                icon={<CheckIcon />}
                                sx={{
                                  fontSize: '0.75rem',
                                  backgroundColor: '#f0f0f0',
                                  '& .MuiChip-icon': {
                                    color: '#ff5a5f',
                                    fontSize: '0.7rem',
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </ListingCard>
                ))}
              </Box>
            )}

            {/* Pagination */}
            {allListings.length > 0 && totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px', gap: '20px' }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, page) => setCurrentPage(page)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;