/**
 * GraphQL Mutations for Biliku Room Rental Platform
 * 
 * This file contains all GraphQL mutations for the RoomListing type
 * aligned with the actual schema.graphql definition.
 */

// Create RoomListing Mutation
export const CREATE_ROOM_LISTING = /* GraphQL */ `
  mutation CreateRoomListing($input: CreateRoomListingInput!) {
    createRoomListing(input: $input) {
      id
      ownerId
      title
      description
      price
      currency
      roomType
      address
      city
      state
      location
      postalCode
      latitude
      longitude
      propertyType
      furnished
      bathrooms
      bedrooms
      squareFeet
      floorLevel
      availableFrom
      availableTo
      isAvailable
      isActive
      genderPreference
      smokingAllowed
      petsAllowed
      visitorsAllowed
      religionPreference
      agePreference
      images
      mainImageIndex
      virtualTourUrl
      floorPlanUrl
      amenities
      nearbyFacilities
      utilitiesIncluded
      additionalRules
      securityDeposit
      advancePayment
      minimumStay
      noticePeriod
      viewCount
      favoriteCount
      inquiryCount
      createdAt
      updatedAt
      featuredUntil
    }
  }
`;

// Update RoomListing Mutation
export const UPDATE_ROOM_LISTING = /* GraphQL */ `
  mutation UpdateRoomListing($input: UpdateRoomListingInput!) {
    updateRoomListing(input: $input) {
      id
      ownerId
      title
      description
      price
      currency
      roomType
      address
      city
      state
      location
      postalCode
      latitude
      longitude
      propertyType
      furnished
      bathrooms
      bedrooms
      squareFeet
      floorLevel
      availableFrom
      availableTo
      isAvailable
      isActive
      genderPreference
      smokingAllowed
      petsAllowed
      visitorsAllowed
      religionPreference
      agePreference
      images
      mainImageIndex
      virtualTourUrl
      floorPlanUrl
      amenities
      nearbyFacilities
      utilitiesIncluded
      additionalRules
      securityDeposit
      advancePayment
      minimumStay
      noticePeriod
      viewCount
      favoriteCount
      inquiryCount
      createdAt
      updatedAt
      featuredUntil
    }
  }
`;

// Delete RoomListing Mutation
export const DELETE_ROOM_LISTING = /* GraphQL */ `
  mutation DeleteRoomListing($input: DeleteRoomListingInput!) {
    deleteRoomListing(input: $input) {
      id
    }
  }
`;

// Create Draft RoomListing Mutation (same as create but with minimal required fields)
export const CREATE_DRAFT_LISTING = /* GraphQL */ `
  mutation CreateRoomListing($input: CreateRoomListingInput!) {
    createRoomListing(input: $input) {
      id
      ownerId
      title
      description
      price
      currency
      roomType
      address
      city
      state
      isAvailable
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Get RoomListing Query (for fetching single listing)
export const GET_ROOM_LISTING = /* GraphQL */ `
  query GetRoomListing($id: ID!) {
    getRoomListing(id: $id) {
      id
      ownerId
      title
      description
      price
      currency
      roomType
      address
      city
      state
      location
      postalCode
      latitude
      longitude
      propertyType
      furnished
      bathrooms
      bedrooms
      squareFeet
      floorLevel
      availableFrom
      availableTo
      isAvailable
      isActive
      genderPreference
      smokingAllowed
      petsAllowed
      visitorsAllowed
      religionPreference
      agePreference
      images
      mainImageIndex
      virtualTourUrl
      floorPlanUrl
      amenities
      nearbyFacilities
      utilitiesIncluded
      additionalRules
      securityDeposit
      advancePayment
      minimumStay
      noticePeriod
      viewCount
      favoriteCount
      inquiryCount
      createdAt
      updatedAt
      featuredUntil
      owner {
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

// List RoomListings Query (for fetching multiple listings)
export const LIST_ROOM_LISTINGS = /* GraphQL */ `
  query ListRoomListings(
    $filter: ModelRoomListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoomListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        title
        description
        price
        currency
        roomType
        address
        city
        state
        location
        propertyType
        furnished
        bathrooms
        bedrooms
        availableFrom
        isAvailable
        isActive
        genderPreference
        smokingAllowed
        petsAllowed
        images
        mainImageIndex
        amenities
        securityDeposit
        minimumStay
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// Get user's listings query
export const GET_LISTINGS_BY_OWNER = /* GraphQL */ `
  query GetListingsByOwner(
    $ownerId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelRoomListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getListingsByOwner(
      ownerId: $ownerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        ownerId
        title
        description
        price
        currency
        roomType
        address
        city
        state
        location
        propertyType
        furnished
        bathrooms
        bedrooms
        availableFrom
        isAvailable
        isActive
        genderPreference
        images
        mainImageIndex
        amenities
        securityDeposit
        minimumStay
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

// TypeScript interfaces for the mutation inputs
export interface CreateRoomListingInput {
  ownerId: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  roomType: string;
  address: string;
  city: string;
  state: string;
  location?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: string;
  furnished?: string;
  bathrooms?: number;
  bedrooms?: number;
  squareFeet?: number;
  floorLevel?: string;
  availableFrom?: string;
  availableTo?: string;
  isAvailable?: boolean;
  isActive?: boolean;
  genderPreference?: string;
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  visitorsAllowed?: boolean;
  religionPreference?: string;
  agePreference?: string;
  images?: string[];
  mainImageIndex?: number;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  amenities?: string[];
  nearbyFacilities?: string[];
  utilitiesIncluded?: string[];
  additionalRules?: string[];
  securityDeposit?: number;
  advancePayment?: number;
  minimumStay?: number;
  noticePeriod?: number;
}

export interface UpdateRoomListingInput {
  id: string;
  ownerId?: string;
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  roomType?: string;
  address?: string;
  city?: string;
  state?: string;
  location?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: string;
  furnished?: string;
  bathrooms?: number;
  bedrooms?: number;
  squareFeet?: number;
  floorLevel?: string;
  availableFrom?: string;
  availableTo?: string;
  isAvailable?: boolean;
  isActive?: boolean;
  genderPreference?: string;
  smokingAllowed?: boolean;
  petsAllowed?: boolean;
  visitorsAllowed?: boolean;
  religionPreference?: string;
  agePreference?: string;
  images?: string[];
  mainImageIndex?: number;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  amenities?: string[];
  nearbyFacilities?: string[];
  utilitiesIncluded?: string[];
  additionalRules?: string[];
  securityDeposit?: number;
  advancePayment?: number;
  minimumStay?: number;
  noticePeriod?: number;
}

export interface DeleteRoomListingInput {
  id: string;
}

// Type definitions for the GraphQL responses
export interface RoomListingResponse {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  roomType: string;
  address: string;
  city: string;
  state: string;
  location?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  propertyType?: string;
  furnished?: string;
  bathrooms?: number;
  bedrooms?: number;
  squareFeet?: number;
  floorLevel?: string;
  availableFrom?: string;
  availableTo?: string;
  isAvailable: boolean;
  isActive: boolean;
  genderPreference?: string;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  visitorsAllowed: boolean;
  religionPreference?: string;
  agePreference?: string;
  images: string[];
  mainImageIndex?: number;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  amenities: string[];
  nearbyFacilities: string[];
  utilitiesIncluded: string[];
  additionalRules: string[];
  securityDeposit?: number;
  advancePayment?: number;
  minimumStay?: number;
  noticePeriod?: number;
  viewCount?: number;
  favoriteCount?: number;
  inquiryCount?: number;
  createdAt: string;
  updatedAt: string;
  featuredUntil?: string;
  owner?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
}