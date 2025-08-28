/**
 * Listing Service for AWS Amplify GraphQL
 * 
 * This service handles room listing operations using AWS AppSync GraphQL API.
 * Updated to work with the RoomListing schema and proper form data transformation.
 */

import { generateClient, type GraphQLResult } from 'aws-amplify/api';
import { getCurrentUser } from 'aws-amplify/auth';
import storageService from './storageService';

// Import GraphQL operations
import {
  CREATE_ROOM_LISTING,
  UPDATE_ROOM_LISTING,
  DELETE_ROOM_LISTING,
  CREATE_DRAFT_LISTING,
  GET_ROOM_LISTING,
  LIST_ROOM_LISTINGS,
  GET_LISTINGS_BY_OWNER,
  type CreateRoomListingInput,
  type UpdateRoomListingInput,
  type RoomListingResponse
} from '../graphql/mutations';

import type {
  RoomListing,
  CreateListingData,
  UpdateListingData,
  ListingFilters,
  ListingsResponse,
  ListingServiceInterface,
  Favorite,
  ListingFormData
} from '../types/listing';

// Favorite operations (separate from RoomListing mutations)
const LIST_FAVORITES = /* GraphQL */ `
  query ListFavorites($filter: ModelFavoriteFilterInput, $limit: Int, $nextToken: String) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        listingId
        createdAt
        listing {
          id
          title
          price
          city
          images
          mainImageIndex
          isAvailable
        }
      }
      nextToken
    }
  }
`;

const CREATE_FAVORITE = /* GraphQL */ `
  mutation CreateFavorite($input: CreateFavoriteInput!) {
    createFavorite(input: $input) {
      id
      userId
      listingId
      createdAt
    }
  }
`;

const DELETE_FAVORITE = /* GraphQL */ `
  mutation DeleteFavorite($input: DeleteFavoriteInput!) {
    deleteFavorite(input: $input) {
      id
    }
  }
`;

/**
 * Form Data Transformation Utilities
 */
export class FormDataTransformer {
  /**
   * Transform ListingFormData to CreateRoomListingInput
   */
  static transformToCreateInput(formData: ListingFormData, ownerId: string, imageUrls: string[] = []): CreateRoomListingInput {
    // Combine all amenities and facilities into a single amenities array
    const allAmenities = [
      ...(formData.amenities || []),
      ...(formData.securityFeatures || []),
      ...(formData.kitchenFacilities || []),
      ...(formData.additionalFacilities || [])
    ];

    // Combine landmarks into nearbyFacilities
    const nearbyFacilities = formData.landmarks || [];

    // Transform room type enum values
    const roomTypeMapping: Record<string, string> = {
      'single-room': 'single_room',
      'master-bedroom': 'master_bedroom',
      'middle-room': 'middle_room',
      'small-room': 'small_room',
      'studio-unit': 'studio_unit',
      'entire-house': 'entire_house'
    };

    // Transform property type values
    const propertyTypeMapping: Record<string, string> = {
      'apartment': 'apartment',
      'house': 'house', 
      'condominium': 'condominium',
      'townhouse': 'townhouse'
    };

    // Transform furnished values
    const furnishedMapping: Record<string, string> = {
      'fully-furnished': 'fully_furnished',
      'partially-furnished': 'partially_furnished',
      'unfurnished': 'unfurnished'
    };

    // Transform gender preference
    const genderMapping: Record<string, string> = {
      'male': 'male',
      'female': 'female',
      'no-preference': 'any',
      'any': 'any'
    };

    return {
      ownerId,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      currency: 'MYR',
      roomType: roomTypeMapping[formData.roomType] || formData.roomType,
      address: formData.address,
      city: formData.city,
      state: 'Sarawak',
      location: formData.neighborhood,
      latitude: formData.latitude,
      longitude: formData.longitude,
      propertyType: propertyTypeMapping[formData.propertyType],
      furnished: furnishedMapping[formData.furnished],
      bathrooms: formData.bathrooms,
      bedrooms: formData.bedrooms,
      squareFeet: formData.squareFeet,
      floorLevel: formData.floorLevel,
      availableFrom: formData.availableFrom || new Date().toISOString().split('T')[0],
      isAvailable: true,
      isActive: true,
      genderPreference: genderMapping[formData.genderPreference] || 'any',
      smokingAllowed: formData.smokingAllowed || false,
      petsAllowed: formData.petsAllowed || false,
      visitorsAllowed: true, // Default to true
      images: imageUrls,
      mainImageIndex: formData.mainImageIndex || 0,
      amenities: allAmenities,
      nearbyFacilities,
      utilitiesIncluded: [], // Can be expanded later
      additionalRules: formData.additionalNotes ? [formData.additionalNotes] : [],
      securityDeposit: formData.deposit,
      advancePayment: formData.advancePayment,
      minimumStay: formData.minimumStay,
      noticePeriod: 30 // Default 30 days notice
    };
  }

  /**
   * Transform ListingFormData to UpdateRoomListingInput
   */
  static transformToUpdateInput(id: string, formData: Partial<ListingFormData>, imageUrls?: string[]): UpdateRoomListingInput {
    const input: UpdateRoomListingInput = { id };

    if (formData.title !== undefined) input.title = formData.title;
    if (formData.description !== undefined) input.description = formData.description;
    if (formData.price !== undefined) input.price = formData.price;
    if (formData.address !== undefined) input.address = formData.address;
    if (formData.city !== undefined) input.city = formData.city;
    if (formData.neighborhood !== undefined) input.location = formData.neighborhood;
    if (formData.latitude !== undefined) input.latitude = formData.latitude;
    if (formData.longitude !== undefined) input.longitude = formData.longitude;
    if (formData.bathrooms !== undefined) input.bathrooms = formData.bathrooms;
    if (formData.bedrooms !== undefined) input.bedrooms = formData.bedrooms;
    if (formData.squareFeet !== undefined) input.squareFeet = formData.squareFeet;
    if (formData.floorLevel !== undefined) input.floorLevel = formData.floorLevel;
    if (formData.availableFrom !== undefined) input.availableFrom = formData.availableFrom;
    if (formData.smokingAllowed !== undefined) input.smokingAllowed = formData.smokingAllowed;
    if (formData.petsAllowed !== undefined) input.petsAllowed = formData.petsAllowed;
    if (formData.deposit !== undefined) input.securityDeposit = formData.deposit;
    if (formData.advancePayment !== undefined) input.advancePayment = formData.advancePayment;
    if (formData.minimumStay !== undefined) input.minimumStay = formData.minimumStay;
    if (imageUrls !== undefined) {
      input.images = imageUrls;
      input.mainImageIndex = formData.mainImageIndex || 0;
    }

    // Transform enums if provided
    if (formData.roomType !== undefined) {
      const roomTypeMapping: Record<string, string> = {
        'single-room': 'single_room',
        'master-bedroom': 'master_bedroom',
        'middle-room': 'middle_room',
        'small-room': 'small_room',
        'studio-unit': 'studio_unit',
        'entire-house': 'entire_house'
      };
      input.roomType = roomTypeMapping[formData.roomType] || formData.roomType;
    }

    if (formData.propertyType !== undefined) {
      const propertyTypeMapping: Record<string, string> = {
        'apartment': 'apartment',
        'house': 'house',
        'condominium': 'condominium',
        'townhouse': 'townhouse'
      };
      input.propertyType = propertyTypeMapping[formData.propertyType];
    }

    if (formData.furnished !== undefined) {
      const furnishedMapping: Record<string, string> = {
        'fully-furnished': 'fully_furnished',
        'partially-furnished': 'partially_furnished',
        'unfurnished': 'unfurnished'
      };
      input.furnished = furnishedMapping[formData.furnished];
    }

    if (formData.genderPreference !== undefined) {
      const genderMapping: Record<string, string> = {
        'male': 'male',
        'female': 'female',
        'no-preference': 'any',
        'any': 'any'
      };
      input.genderPreference = genderMapping[formData.genderPreference] || 'any';
    }

    // Combine amenities if provided
    if (formData.amenities || formData.securityFeatures || formData.kitchenFacilities || formData.additionalFacilities) {
      const allAmenities = [
        ...(formData.amenities || []),
        ...(formData.securityFeatures || []),
        ...(formData.kitchenFacilities || []),
        ...(formData.additionalFacilities || [])
      ];
      input.amenities = allAmenities;
    }

    if (formData.landmarks !== undefined) {
      input.nearbyFacilities = formData.landmarks;
    }

    if (formData.additionalNotes !== undefined) {
      input.additionalRules = formData.additionalNotes ? [formData.additionalNotes] : [];
    }

    return input;
  }

  /**
   * Transform GraphQL RoomListingResponse to RoomListing interface
   */
  static transformFromGraphQL(response: RoomListingResponse): RoomListing {
    return {
      id: response.id,
      title: response.title,
      description: response.description,
      city: response.city,
      state: response.state,
      location: response.location,
      address: response.address,
      room_type: response.roomType,
      price: response.price,
      images: response.images || [],
      main_image_index: response.mainImageIndex || 0,
      gender_preference: response.genderPreference as 'male' | 'female' | 'any',
      religion_preference: response.religionPreference,
      available_from: response.availableFrom,
      created_at: response.createdAt,
      updated_at: response.updatedAt,
      furnished: response.furnished === 'fully_furnished',
      pet_friendly: response.petsAllowed,
      amenities: response.amenities || [],
      is_available: response.isAvailable,
      user_id: response.ownerId,
      userId: response.ownerId,
      owner: response.owner ? {
        first_name: response.owner.firstName,
        last_name: response.owner.lastName,
        phone: response.owner.phone || ''
      } : undefined
    };
  }
}

/**
 * Listing Service Class
 */
export class ListingService implements ListingServiceInterface {
  private client = generateClient();

  /**
   * Get current authenticated user
   */
  private async getCurrentUserId(): Promise<string> {
    try {
      const user = await getCurrentUser();
      return user.userId;
    } catch (error) {
      throw new Error('User must be authenticated');
    }
  }

  /**
   * Get paginated listings with filters
   */
  async getListings(params: ListingFilters & { page?: number; limit?: number; nextToken?: string } = {}): Promise<ListingsResponse> {
    try {
      const variables: any = {
        limit: params.limit || 10,
        nextToken: params.nextToken
      };

      // Build filter based on parameters
      const filter: any = {};
      
      // Always filter for available properties
      filter.isAvailable = { eq: true };
      filter.isActive = { eq: true };

      if (params.city) {
        filter.city = { eq: params.city };
      }

      if (params.roomType) {
        filter.roomType = { eq: params.roomType };
      }

      if (params.minPrice || params.maxPrice) {
        filter.price = {};
        if (params.minPrice) filter.price.ge = params.minPrice;
        if (params.maxPrice) filter.price.le = params.maxPrice;
      }

      if (params.gender) {
        filter.or = [
          { genderPreference: { eq: params.gender } },
          { genderPreference: { eq: 'any' } }
        ];
      }

      if (params.religion) {
        filter.religionPreference = { eq: params.religion };
      }

      if (params.isPetFriendly) {
        filter.petsAllowed = { eq: true };
      }

      if (params.availableFrom) {
        filter.availableFrom = { ge: params.availableFrom };
      }

      if (Object.keys(filter).length > 0) {
        variables.filter = filter;
      }

      const result: GraphQLResult<any> = await this.client.graphql({
        query: LIST_ROOM_LISTINGS,
        variables
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to fetch listings');
      }

      let listings = result.data?.listRoomListings?.items || [];

      // Apply amenities filter in memory if needed
      if (params.amenities && params.amenities.length > 0) {
        listings = listings.filter((listing: any) => {
          if (!listing.amenities) return false;
          return params.amenities!.some(amenity => 
            listing.amenities.includes(amenity.toLowerCase())
          );
        });
      }

      // Apply search query filter if provided
      if (params.searchQuery) {
        const query = params.searchQuery.toLowerCase();
        listings = listings.filter((listing: any) => 
          listing.title?.toLowerCase().includes(query) ||
          listing.description?.toLowerCase().includes(query) ||
          listing.location?.toLowerCase().includes(query) ||
          listing.city?.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      if (params.orderBy) {
        const direction = params.orderDir || 'asc';
        listings.sort((a: any, b: any) => {
          let aVal = a[params.orderBy!];
          let bVal = b[params.orderBy!];
          
          if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
          }
          
          if (direction === 'desc') {
            return bVal > aVal ? 1 : -1;
          }
          return aVal > bVal ? 1 : -1;
        });
      }

      return {
        data: listings.map(FormDataTransformer.transformFromGraphQL),
        nextToken: result.data?.listRoomListings?.nextToken,
        meta: {
          page: params.page || 1,
          limit: params.limit || 10,
          total: listings.length
        }
      };
    } catch (error: any) {
      console.error('Error fetching listings:', error);
      throw new Error(error.message || 'Failed to fetch listings');
    }
  }

  /**
   * Get listing by ID
   */
  async getListingById(id: string): Promise<RoomListing> {
    try {
      const result: GraphQLResult<any> = await this.client.graphql({
        query: GET_ROOM_LISTING,
        variables: { id }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to fetch listing');
      }

      const listing = result.data?.getRoomListing;
      if (!listing) {
        throw new Error('Listing not found');
      }

      return FormDataTransformer.transformFromGraphQL(listing);
    } catch (error: any) {
      console.error('Error fetching listing by ID:', error);
      throw new Error(error.message || 'Failed to fetch listing');
    }
  }


  /**
   * Get user's listings
   */
  async getMyListings(): Promise<RoomListing[]> {
    try {
      const userId = await this.getCurrentUserId();
      
      const result: GraphQLResult<any> = await this.client.graphql({
        query: GET_LISTINGS_BY_OWNER,
        variables: {
          ownerId: userId,
          limit: 100
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to fetch user listings');
      }

      return (result.data?.getListingsByOwner?.items || []).map(FormDataTransformer.transformFromGraphQL);
    } catch (error: any) {
      console.error('Error fetching user listings:', error);
      throw new Error(error.message || 'Failed to fetch user listings');
    }
  }

  /**
   * Create new listing from form data
   */
  async createListingFromForm(formData: ListingFormData): Promise<RoomListing> {
    try {
      const userId = await this.getCurrentUserId();

      // Upload images first if any
      let uploadedImages: string[] = [];
      if (formData.images && formData.images.length > 0) {
        console.log(`Uploading ${formData.images.length} images`);
        uploadedImages = await Promise.all(
          formData.images.map(async (image) => {
            return await storageService.uploadImage(image, undefined, userId);
          })
        );
      }

      // Transform form data to GraphQL input
      const input = FormDataTransformer.transformToCreateInput(formData, userId, uploadedImages);

      const result: GraphQLResult<any> = await this.client.graphql({
        query: CREATE_ROOM_LISTING,
        variables: { input }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to create listing');
      }

      const createdListing = result.data?.createRoomListing;
      
      // Move images from temp to listing folder if listing was created successfully
      if (createdListing && uploadedImages.length > 0) {
        const listingId = createdListing.id;
        const movedImages: string[] = [];
        
        for (const imageUrl of uploadedImages) {
          try {
            const newUrl = await storageService.moveImageToRoom(imageUrl, userId, listingId);
            movedImages.push(newUrl);
          } catch (error) {
            console.error('Error moving image:', error);
            movedImages.push(imageUrl); // Keep original if move fails
          }
        }

        // Update the listing with new image URLs if any were moved
        if (movedImages.some((url, i) => url !== uploadedImages[i])) {
          await this.client.graphql({
            query: UPDATE_ROOM_LISTING,
            variables: {
              input: {
                id: listingId,
                images: movedImages
              }
            }
          });
          createdListing.images = movedImages;
        }
      }

      return FormDataTransformer.transformFromGraphQL(createdListing);
    } catch (error: any) {
      console.error('Error creating listing:', error);
      throw new Error(error.message || 'Failed to create listing');
    }
  }

  /**
   * Create new listing (legacy interface)
   */
  async createListing(listingData: CreateListingData): Promise<RoomListing> {
    // Convert legacy format to form data format
    const formData: ListingFormData = {
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      roomType: listingData.roomType,
      propertyType: 'apartment', // Default
      address: listingData.address,
      city: listingData.city,
      neighborhood: listingData.location || '',
      landmarks: [],
      furnished: 'fully-furnished', // Default
      bedrooms: 1,
      bathrooms: 1,
      floorLevel: '',
      amenities: listingData.amenities || [],
      securityFeatures: [],
      parking: '',
      kitchenFacilities: [],
      additionalFacilities: [],
      availableFrom: listingData.availableFrom || new Date().toISOString().split('T')[0],
      minimumStay: 6,
      deposit: 0,
      advancePayment: 1,
      utilityDeposits: { electricity: 0, water: 0, internet: 0 },
      genderPreference: listingData.genderPreference || 'any',
      smokingAllowed: false,
      petsAllowed: listingData.petFriendly || false,
      images: listingData.images || [],
      mainImageIndex: listingData.mainImageIndex || 0,
      contactMethods: [],
      viewingAvailability: [],
      responseTime: '24-hours',
      additionalNotes: ''
    };

    return this.createListingFromForm(formData);
  }

  /**
   * Update listing from form data
   */
  async updateListingFromForm(id: string, formData: Partial<ListingFormData>): Promise<RoomListing> {
    try {
      const userId = await this.getCurrentUserId();
      
      // Get current listing to check ownership and existing images
      const currentListing = await this.getListingById(id);
      
      if (currentListing.userId !== userId && currentListing.user_id !== userId) {
        throw new Error('You can only update your own listings');
      }

      let finalImageUrls: string[] | undefined = undefined;

      // Handle image updates if images are provided
      if (formData.images !== undefined) {
        // Upload new images
        const uploadedImages = await Promise.all(
          formData.images.map(async (image) => {
            return await storageService.uploadImage(image, id, userId);
          })
        );

        finalImageUrls = uploadedImages;

        // Delete old images that are not in the new set
        const currentImages = currentListing.images || [];
        const imagesToDelete = currentImages.filter(img => !finalImageUrls!.includes(img));
        
        if (imagesToDelete.length > 0) {
          console.log(`Deleting ${imagesToDelete.length} removed images`);
          await Promise.all(
            imagesToDelete.map(async (imageUrl) => {
              await storageService.deleteImageByUrl(imageUrl);
            })
          );
        }
      }

      // Transform form data to update input
      const input = FormDataTransformer.transformToUpdateInput(id, formData, finalImageUrls);

      const result: GraphQLResult<any> = await this.client.graphql({
        query: UPDATE_ROOM_LISTING,
        variables: { input }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to update listing');
      }

      return FormDataTransformer.transformFromGraphQL(result.data?.updateRoomListing);
    } catch (error: any) {
      console.error('Error updating listing:', error);
      throw new Error(error.message || 'Failed to update listing');
    }
  }

  /**
   * Update existing listing (legacy interface)
   */
  async updateListing(id: string, listingData: UpdateListingData): Promise<RoomListing> {
    // Convert legacy update data to partial form data
    const formData: Partial<ListingFormData> = {
      title: listingData.title,
      description: listingData.description,
      price: listingData.price,
      roomType: listingData.roomType,
      address: listingData.address,
      city: listingData.city,
      neighborhood: listingData.location,
      amenities: listingData.amenities,
      availableFrom: listingData.availableFrom,
      genderPreference: listingData.genderPreference,
      petsAllowed: listingData.petFriendly,
      images: listingData.images,
      mainImageIndex: listingData.mainImageIndex
    };

    return this.updateListingFromForm(id, formData);
  }

  /**
   * Save draft listing
   */
  async saveDraftListing(formData: Partial<ListingFormData>): Promise<RoomListing> {
    try {
      const userId = await this.getCurrentUserId();

      // Create minimal draft with basic required fields
      const draftInput: CreateRoomListingInput = {
        ownerId: userId,
        title: formData.title || 'Draft Listing',
        description: formData.description || '',
        price: formData.price || 0,
        currency: 'MYR',
        roomType: formData.roomType || 'single_room',
        address: formData.address || '',
        city: formData.city || '',
        state: 'Sarawak',
        isAvailable: false, // Draft listings are not available
        isActive: false, // Draft listings are not active
        amenities: [],
        images: [],
        nearbyFacilities: [],
        utilitiesIncluded: [],
        additionalRules: [],
        smokingAllowed: false,
        petsAllowed: false,
        visitorsAllowed: true
      };

      const result: GraphQLResult<any> = await this.client.graphql({
        query: CREATE_DRAFT_LISTING,
        variables: { input: draftInput }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to save draft');
      }

      return FormDataTransformer.transformFromGraphQL(result.data?.createRoomListing);
    } catch (error: any) {
      console.error('Error saving draft:', error);
      throw new Error(error.message || 'Failed to save draft');
    }
  }

  /**
   * Delete listing
   */
  async deleteListing(id: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      
      // Get listing to check ownership and delete images
      const listing = await this.getListingById(id);
      
      if (listing.userId !== userId && listing.user_id !== userId) {
        throw new Error('You can only delete your own listings');
      }

      // Delete associated images
      if (listing.images && listing.images.length > 0) {
        console.log(`Deleting ${listing.images.length} images for listing ${id}`);
        await Promise.all(
          listing.images.map(async (imageUrl) => {
            await storageService.deleteImageByUrl(imageUrl);
          })
        );
      }

      // Delete the listing
      const result: GraphQLResult<any> = await this.client.graphql({
        query: DELETE_ROOM_LISTING,
        variables: { input: { id } }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to delete listing');
      }

      return true;
    } catch (error: any) {
      console.error('Error deleting listing:', error);
      throw new Error(error.message || 'Failed to delete listing');
    }
  }

  /**
   * Toggle listing availability status
   */
  async toggleListingStatus(id: string): Promise<RoomListing> {
    try {
      const userId = await this.getCurrentUserId();
      const listing = await this.getListingById(id);
      
      if (listing.userId !== userId && listing.user_id !== userId) {
        throw new Error('You can only update your own listings');
      }

      const result: GraphQLResult<any> = await this.client.graphql({
        query: UPDATE_ROOM_LISTING,
        variables: {
          input: {
            id,
            isAvailable: !listing.is_available
          }
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to toggle listing status');
      }

      return FormDataTransformer.transformFromGraphQL(result.data?.updateRoomListing);
    } catch (error: any) {
      console.error('Error toggling listing status:', error);
      throw new Error(error.message || 'Failed to toggle listing status');
    }
  }

  /**
   * Get related listings
   */
  async getRelatedListings(id: string): Promise<RoomListing[]> {
    try {
      const currentListing = await this.getListingById(id);
      
      const result = await this.getListings({
        city: currentListing.city,
        roomType: currentListing.room_type,
        limit: 4
      });

      // Filter out the current listing
      return result.data.filter(listing => listing.id !== id);
    } catch (error: any) {
      console.error('Error fetching related listings:', error);
      throw new Error(error.message || 'Failed to fetch related listings');
    }
  }

  /**
   * Add listing to favorites
   */
  async addFavorite(listingId: string): Promise<any> {
    try {
      const userId = await this.getCurrentUserId();

      const result: GraphQLResult<any> = await this.client.graphql({
        query: CREATE_FAVORITE,
        variables: {
          input: {
            userId,
            roomId: listingId,
            createdAt: new Date().toISOString()
          }
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to add favorite');
      }

      return result.data?.createFavorite;
    } catch (error: any) {
      console.error('Error adding favorite:', error);
      throw new Error(error.message || 'Failed to add favorite');
    }
  }

  /**
   * Remove favorite listing
   */
  async removeFavorite(favoriteId: string): Promise<boolean> {
    try {
      const result: GraphQLResult<any> = await this.client.graphql({
        query: DELETE_FAVORITE,
        variables: { input: { id: favoriteId } }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to remove favorite');
      }

      return true;
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      throw new Error(error.message || 'Failed to remove favorite');
    }
  }

  /**
   * Get user's favorite listings
   */
  async getFavorites(): Promise<Favorite[]> {
    try {
      const userId = await this.getCurrentUserId();

      const result: GraphQLResult<any> = await this.client.graphql({
        query: LIST_FAVORITES,
        variables: {
          filter: {
            userId: { eq: userId }
          },
          limit: 100
        }
      });

      if (result.errors) {
        throw new Error(result.errors[0]?.message || 'Failed to fetch favorites');
      }

      return result.data?.listFavorites?.items || [];
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      throw new Error(error.message || 'Failed to fetch favorites');
    }
  }

  /**
   * Check if listing is favorited
   */
  async isFavorite(listingId: string): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();

      const result: GraphQLResult<any> = await this.client.graphql({
        query: LIST_FAVORITES,
        variables: {
          filter: {
            userId: { eq: userId },
            roomId: { eq: listingId }
          },
          limit: 1
        }
      });

      return result.data?.listFavorites?.items?.length > 0;
    } catch (error: any) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(listingId: string): Promise<boolean> {
    try {
      const isFav = await this.isFavorite(listingId);
      
      if (isFav) {
        const favorites = await this.getFavorites();
        const favorite = favorites.find(fav => fav.roomId === listingId);
        if (favorite) {
          await this.removeFavorite(favorite.id);
        }
      } else {
        await this.addFavorite(listingId);
      }

      return true;
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      throw new Error(error.message || 'Failed to toggle favorite');
    }
  }

  // Legacy mapping methods removed - now using FormDataTransformer

  /**
   * Search listings (uses general getListings with searchQuery)
   */
  async searchListings(query: string): Promise<RoomListing[]> {
    try {
      const result = await this.getListings({ 
        searchQuery: query, 
        limit: 50 
      });
      return result.data;
    } catch (error: any) {
      console.error('Error searching listings:', error);
      throw new Error(error.message || 'Failed to search listings');
    }
  }

  /**
   * Get featured listings
   */
  async getFeaturedListings(): Promise<RoomListing[]> {
    try {
      const result = await this.getListings({ limit: 6 });
      return result.data;
    } catch (error: any) {
      console.error('Error fetching featured listings:', error);
      throw new Error(error.message || 'Failed to fetch featured listings');
    }
  }
}

// Create singleton instance
export const listingService = new ListingService();
export default listingService;