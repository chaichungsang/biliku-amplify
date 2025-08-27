import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  styled,
} from '@mui/material';
import {
  LocationOn,
  Home,
  CalendarToday,
  Schedule,
  Weekend,
  Wc,
  CheckCircle,
  Pets,
} from '@mui/icons-material';
import { RoomCardProps, RoomListing } from '../../types/listing';

// Styled components matching Vue design exactly
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
  backgroundColor: 'white',
  transition: 'transform 0.3s, box-shadow 0.3s',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  position: 'relative',
  marginBottom: '30px',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.12)',
    '& .listing-image img': {
      transform: 'scale(1.08)',
    },
  },
}));

const FlexContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '250px',
  height: '200px',
  overflow: 'hidden',
  flexShrink: 0,
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    width: '100%',
    height: '200px',
  },
});

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s',
});

const PriceOverlay = styled(Box)({
  position: 'absolute',
  bottom: '15px',
  left: 0,
  backgroundColor: '#cc0001', // Sarawak red
  color: 'white',
  padding: '10px 18px',
  fontWeight: 'bold',
  borderRadius: '0 8px 8px 0',
  fontSize: '1.2rem',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
});

const ContentArea = styled(CardContent)({
  padding: '25px',
  flexGrow: 1,
});

const RoomTitle = styled(Typography)({
  fontSize: '1.4rem',
  marginBottom: '15px',
  color: '#333',
  fontWeight: 700,
  lineHeight: 1.4,
  cursor: 'pointer',
  transition: 'color 0.3s',
  '&:hover': {
    color: '#cc0001', // Sarawak red
  },
});

const LocationText = styled(Box)({
  color: '#444',
  marginBottom: '20px',
  fontSize: '1.05rem',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontWeight: 500,
  lineHeight: 1.4,
});

const LocationIcon = styled(LocationOn)({
  color: '#cc0001', // Sarawak red
  fontSize: '1.2rem',
});

const DetailsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  marginBottom: '20px',
  paddingBottom: '20px',
  borderBottom: '1px solid #eee',
});

const DetailItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#555',
  fontSize: '0.95rem',
  '& .MuiSvgIcon-root': {
    color: '#cc0001', // Sarawak red
    fontSize: '1.1rem',
  },
});

const AmenitiesContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px',
  marginTop: '12px',
});

const AmenityTag = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '0.7rem',
  color: '#555',
  whiteSpace: 'nowrap',
  '& .MuiSvgIcon-root': {
    marginRight: '4px',
    fontSize: '0.8rem',
    color: '#4a6fa5',
  },
});

const PetFriendlyTag = styled(AmenityTag)({
  backgroundColor: '#e6f3ff',
  color: '#0066cc',
  '& .MuiSvgIcon-root': {
    color: '#0066cc',
  },
});

const RoomCard: React.FC<RoomCardProps> = ({ listing, onViewListing }) => {
  
  // Format room type to match Vue formatting
  const formatRoomType = (roomType: string): string => {
    if (!roomType) return '';
    
    const formatMap: Record<string, string> = {
      'single_room': 'Single Room',
      'master_bedroom': 'Master Bedroom', 
      'middle_room': 'Middle Room',
      'small_room': 'Small Room',
      'studio_unit': 'Studio Unit',
      'entire_house': 'Entire House',
      'studio': 'Studio Unit',
      'master': 'Master Bedroom',
      'single': 'Single Room',
    };
    
    return formatMap[roomType.toLowerCase()] || 
           roomType.replace(/_/g, ' ')
                   .split(' ')
                   .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                   .join(' ');
  };

  // Format gender preference
  const formatGender = (gender?: string): string => {
    if (!gender || gender === 'any') return 'Any Gender';
    return gender === 'male' ? 'Male Only' : 'Female Only';
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Flexible';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get top amenities for display
  const getTopAmenities = (amenitiesList?: string[]): string[] => {
    if (!amenitiesList || amenitiesList.length === 0) return [];
    
    return amenitiesList.map(item => {
      return item.split('_')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
    });
  };

  // Get main image
  const getMainImage = (): string => {
    if (listing.images && listing.images.length > 0) {
      const mainIndex = listing.main_image_index || 0;
      return listing.images[mainIndex] || listing.images[0];
    }
    return '/assets/images/placeholder.svg'; // fallback image
  };

  // Get combined amenities from listing and property
  const getAllAmenities = (): string[] => {
    const listingAmenities = listing.amenities || [];
    const propertyAmenities = listing.property?.amenities || [];
    return [...listingAmenities, ...propertyAmenities];
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/images/placeholder.svg';
  };

  return (
    <StyledCard>
      <FlexContainer>
        <ImageContainer onClick={() => onViewListing(listing.id)}>
          <StyledImage
            src={getMainImage()}
            alt={listing.title}
            loading="lazy"
            onError={handleImageError}
            className="listing-image"
          />
          <PriceOverlay>
            RM {listing.price}
          </PriceOverlay>
        </ImageContainer>

        <ContentArea>
          <RoomTitle onClick={() => onViewListing(listing.id)}>
            {listing.title}
          </RoomTitle>

          <LocationText>
            <LocationIcon />
            <span>
              {listing.location && `${listing.location}, `}
              {listing.city}, {listing.state || 'Sarawak'}
            </span>
          </LocationText>

          <DetailsContainer>
            <DetailItem>
              <Home />
              {formatRoomType(listing.room_type)}
            </DetailItem>

            {listing.gender_preference && listing.gender_preference !== 'any' && (
              <DetailItem>
                <Wc />
                {formatGender(listing.gender_preference)}
              </DetailItem>
            )}

            <DetailItem>
              <CalendarToday />
              Available: {formatDate(listing.available_from)}
            </DetailItem>

            <DetailItem>
              <Schedule />
              Listed: {formatDate(listing.created_at)}
            </DetailItem>

            {listing.furnished !== undefined && (
              <DetailItem>
                <Weekend />
                {listing.furnished === true ? 'Furnished' : 'Unfurnished'}
              </DetailItem>
            )}
          </DetailsContainer>

          <AmenitiesContainer>
            {listing.pet_friendly && (
              <PetFriendlyTag>
                <Pets />
                Pet Friendly
              </PetFriendlyTag>
            )}
            
            {getTopAmenities(getAllAmenities()).map((amenity) => (
              <AmenityTag key={amenity}>
                <CheckCircle />
                {amenity}
              </AmenityTag>
            ))}
          </AmenitiesContainer>
        </ContentArea>
      </FlexContainer>
    </StyledCard>
  );
};

export default RoomCard;