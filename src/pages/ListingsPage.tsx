import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  styled,
} from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import RoomCard from '../components/room/RoomCard';
import SortControls from '../components/listings/SortControls';
import PaginationControls from '../components/listings/PaginationControls';
import { RoomListing, ListingFilters, PaginationInfo } from '../types/listing';

// Mock data matching Vue structure - will be replaced with real data
const mockListings: RoomListing[] = [
  {
    id: 'demo-1',
    title: 'Modern Studio Unit in City Center',
    city: 'Kuching',
    state: 'Sarawak',
    location: 'Pending',
    room_type: 'studio_unit',
    price: 800,
    images: ['/assets/images/placeholder.svg'],
    gender_preference: 'any',
    available_from: new Date().toISOString(),
    created_at: new Date().toISOString(),
    amenities: ['WiFi', 'AC', 'Parking'],
    furnished: true,
    pet_friendly: false,
  },
  {
    id: 'demo-2',
    title: 'Cozy Master Room near UNIMAS',
    city: 'Kota Samarahan',
    state: 'Sarawak',
    location: 'UNIMAS Area',
    room_type: 'master_bedroom',
    price: 450,
    images: ['/assets/images/placeholder.svg'],
    gender_preference: 'female',
    available_from: new Date().toISOString(),
    created_at: new Date().toISOString(),
    amenities: ['Private Bathroom', 'Furnished', 'WiFi'],
    furnished: true,
    pet_friendly: true,
  },
  {
    id: 'demo-3',
    title: 'Spacious Single Room in Bintulu',
    city: 'Bintulu',
    state: 'Sarawak',
    location: 'Town Area',
    room_type: 'single_room',
    price: 350,
    images: ['/assets/images/placeholder.svg'],
    gender_preference: 'male',
    available_from: new Date().toISOString(),
    created_at: new Date().toISOString(),
    amenities: ['Furnished', 'Shared Kitchen', 'Near Public Transport'],
    furnished: true,
    pet_friendly: false,
  },
];

// Styled components with Sarawak theming
const PageContainer = styled(Box)(({ theme }) => ({
  padding: '40px 0',
  fontFamily: '"Poppins", sans-serif',
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
}));

const Container = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 20px',
});

const ResultsHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },
});

const PageTitle = styled(Typography)({
  fontSize: '2.2rem',
  color: '#333',
  fontWeight: 700,
  margin: 0,
  '@media (max-width: 768px)': {
    fontSize: '1.8rem',
  },
});

const BackButton = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: '#555',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  padding: '10px 16px',
  borderRadius: '8px',
  border: '2px solid #eee',
  backgroundColor: 'white',
  transition: 'all 0.3s',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    transform: 'translateY(-2px)',
    borderColor: '#cc0001', // Sarawak red
    color: '#cc0001',
  },
});

const ResultsContainer = styled(Box)({
  marginTop: '30px',
});

const ListingsHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',
  },
});

const ListingsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '30px',
  marginBottom: '40px',
  '@media (max-width: 768px)': {
    gap: '20px',
  },
});

const LoadingSpinner = styled(Box)({
  textAlign: 'center',
  padding: '80px',
  fontSize: '1.2rem',
  color: '#666',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  '& .MuiCircularProgress-root': {
    marginBottom: '10px',
    color: '#cc0001', // Sarawak red
  },
});

const ErrorMessage = styled(Box)({
  textAlign: 'center',
  padding: '40px',
  backgroundColor: '#fff3f3',
  borderRadius: '12px',
  color: '#e53935',
  fontSize: '1.1rem',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
});

const EmptyResults = styled(Box)({
  textAlign: 'center',
  padding: '80px 20px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    color: '#ddd',
    marginBottom: '20px',
    display: 'block',
  },
  '& p': {
    fontSize: '1.2rem',
    color: '#777',
    marginBottom: '25px',
  },
});

const ResetButton = styled(Button)({
  backgroundColor: '#cc0001', // Sarawak red
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s',
  textTransform: 'none',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#b00001',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px rgba(204, 0, 1, 0.3)',
  },
});

const ListingsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ListingFilters>({
    orderBy: 'created_at',
    orderDir: 'desc',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
    totalItems: 0,
  });

  // Check if this is a default search (no filters)
  const isDefaultSearch = (
    !filters.city &&
    !filters.roomType &&
    !filters.minPrice &&
    !filters.maxPrice &&
    !filters.gender &&
    !filters.religion &&
    !filters.isPetFriendly &&
    (!filters.amenities || filters.amenities.length === 0) &&
    !filters.searchQuery &&
    !filters.availableFrom
  );

  // Parse query parameters
  useEffect(() => {
    const newFilters: ListingFilters = {
      city: searchParams.get('city') || undefined,
      roomType: searchParams.get('roomType') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      gender: searchParams.get('gender') || undefined,
      religion: searchParams.get('religion') || undefined,
      isPetFriendly: searchParams.get('isPetFriendly') === 'true',
      amenities: searchParams.getAll('amenities'),
      orderBy: searchParams.get('orderBy') || 'created_at',
      orderDir: (searchParams.get('orderDir') as 'asc' | 'desc') || 'desc',
      searchQuery: searchParams.get('searchQuery') || undefined,
      availableFrom: searchParams.get('availableFrom') || undefined,
    };
    
    const currentPage = Number(searchParams.get('page')) || 1;
    
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage }));
    
    // Fetch listings when parameters change
    fetchListings(newFilters, currentPage);
  }, [searchParams]);

  const fetchListings = async (currentFilters: ListingFilters, page: number) => {
    setLoading(true);
    setError(null);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // For now, use mock data
      // In real implementation, this would call the listing service
      if (isDefaultSearch) {
        setListings([]);
        setPagination(prev => ({
          ...prev,
          totalItems: 0,
          totalPages: 0,
        }));
      } else {
        setListings(mockListings);
        setPagination(prev => ({
          ...prev,
          totalItems: mockListings.length,
          totalPages: Math.ceil(mockListings.length / prev.itemsPerPage),
        }));
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load listings. Please try again.');
      // Fallback to mock data on error
      setListings(mockListings);
      setPagination(prev => ({
        ...prev,
        totalItems: mockListings.length,
        totalPages: Math.ceil(mockListings.length / prev.itemsPerPage),
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (newSortValue: string) => {
    if (isDefaultSearch) return;
    
    const newParams = new URLSearchParams(searchParams);
    newParams.set('orderBy', newSortValue);
    newParams.set('page', '1'); // Reset to first page when sorting
    navigate({ pathname: '/listings', search: newParams.toString() });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    navigate({ pathname: '/listings', search: newParams.toString() });
  };

  const handleViewListing = (id: string) => {
    navigate(`/listings/${id}`);
  };

  return (
    <PageContainer>
      <Container>
        <ResultsHeader>
          <PageTitle variant="h1">
            Search Results
          </PageTitle>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <BackButton sx={{ textDecoration: 'none' }}>
              <ArrowBack />
              Back to Search
            </BackButton>
          </Link>
        </ResultsHeader>

        <ResultsContainer>
          <ListingsHeader>
            <Typography variant="h4" component="h2">
              Available Rooms
            </Typography>
            <SortControls
              value={filters.orderBy || 'created_at'}
              onChange={handleSortChange}
              disabled={isDefaultSearch}
            />
          </ListingsHeader>

          {loading && (
            <LoadingSpinner>
              <CircularProgress size={32} />
              <Typography>Loading...</Typography>
            </LoadingSpinner>
          )}

          {!loading && error && (
            <ErrorMessage>
              <Typography>{error}</Typography>
            </ErrorMessage>
          )}

          {!loading && !error && isDefaultSearch && (
            <EmptyResults>
              <Search />
              <Typography>Please provide search criteria to find properties</Typography>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ResetButton sx={{ textDecoration: 'none' }}>
                  Go to Search
                </ResetButton>
              </Link>
            </EmptyResults>
          )}

          {!loading && !error && !isDefaultSearch && listings.length === 0 && (
            <EmptyResults>
              <Search />
              <Typography>No listings found matching your criteria</Typography>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <ResetButton sx={{ textDecoration: 'none' }}>
                  Modify Search
                </ResetButton>
              </Link>
            </EmptyResults>
          )}

          {!loading && !error && listings.length > 0 && (
            <>
              <ListingsGrid>
                {listings.map((listing) => (
                  <RoomCard
                    key={listing.id}
                    listing={listing}
                    onViewListing={handleViewListing}
                  />
                ))}
              </ListingsGrid>

              <PaginationControls
                pagination={pagination}
                onPageChange={handlePageChange}
                disabled={loading}
              />
            </>
          )}
        </ResultsContainer>
      </Container>
    </PageContainer>
  );
};

export default ListingsPage;