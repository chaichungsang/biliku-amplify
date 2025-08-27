// TypeScript interfaces for listing/room data based on Vue ListingsView component

export interface RoomListing {
  id: string;
  title: string;
  description?: string;
  city: string;
  state?: string;
  location?: string;
  address?: string;
  room_type: string;
  price: number;
  images: string[];
  main_image_index?: number;
  gender_preference?: 'male' | 'female' | 'any';
  religion_preference?: string;
  available_from?: string;
  created_at: string;
  updated_at?: string;
  furnished?: boolean;
  pet_friendly?: boolean;
  amenities?: string[];
  property?: {
    amenities?: string[];
  };
  is_available?: boolean;
  user_id?: string;
  userId?: string; // Amplify format
  owner?: {
    first_name: string;
    last_name: string;
    phone: string;
  };
}

export interface CreateListingData {
  title: string;
  description: string;
  price: number;
  roomType: string;
  city: string;
  location?: string;
  address: string;
  amenities: string[];
  images?: File[];
  mainImageIndex?: number;
  availableFrom?: string;
  genderPreference?: 'male' | 'female' | 'any';
  religionPreference?: string;
  petFriendly?: boolean;
}

export interface UpdateListingData extends Partial<CreateListingData> {
  existingImages?: string[];
}

export interface ListingFilters {
  city?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string;
  religion?: string;
  isPetFriendly?: boolean;
  amenities?: string[];
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  searchQuery?: string;
  availableFrom?: string;
  limit?: number;
  nextToken?: string;
}

export interface ListingsResponse {
  data: RoomListing[];
  nextToken?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// Props interfaces for components
export interface RoomCardProps {
  listing: RoomListing;
  onViewListing: (id: string) => void;
}

export interface ListingsGridProps {
  listings: RoomListing[];
  loading?: boolean;
  error?: string | null;
  onViewListing: (id: string) => void;
}

export interface PaginationControlsProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export interface SortControlsProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

// Service interfaces
export interface ListingServiceInterface {
  getListings: (params?: ListingFilters & { page?: number; limit?: number; nextToken?: string }) => Promise<ListingsResponse>;
  getListingById: (id: string) => Promise<RoomListing>;
  getFeaturedListings: () => Promise<RoomListing[]>;
  searchListings: (query: string) => Promise<RoomListing[]>;
  getMyListings: () => Promise<RoomListing[]>;
  createListing: (listingData: CreateListingData) => Promise<RoomListing>;
  updateListing: (id: string, listingData: UpdateListingData) => Promise<RoomListing>;
  deleteListing: (id: string) => Promise<boolean>;
  toggleListingStatus: (id: string) => Promise<RoomListing>;
  getRelatedListings: (id: string) => Promise<RoomListing[]>;
  addFavorite: (roomId: string) => Promise<any>;
  removeFavorite: (favoriteId: string) => Promise<boolean>;
  getFavorites: () => Promise<any[]>;
  isFavorite: (roomId: string) => Promise<boolean>;
  toggleFavorite: (roomId: string) => Promise<boolean>;
}

// Favorite types
export interface Favorite {
  id: string;
  userId: string;
  roomId: string;
  createdAt: string;
  room?: RoomListing;
}