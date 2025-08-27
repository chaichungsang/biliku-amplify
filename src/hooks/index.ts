/**
 * Hooks index file - exports all custom hooks for easy importing
 */

// Authentication hooks
export * from './useAuth';

// Listing hooks
export * from './useListings';

// Storage hooks
export * from './useStorage';

// Agreement hooks
export * from './useAgreements';

// Re-export commonly used hooks with descriptive names
export { 
  useAuth as useAuthentication,
  useUser as useCurrentUser,
  useProfile as useUserProfile,
  useAuthStatus as useAuthenticationStatus
} from './useAuth';

export {
  useListings as useRoomListings,
  useListing as useRoomListing,
  useFeaturedListings as useFeaturedRooms,
  useMyListings as useMyRooms,
  useSearchListings as useRoomSearch,
  useListingActions as useRoomActions
} from './useListings';

export {
  useImageUpload as useRoomImageUpload,
  useMultipleImageUpload as useMultipleRoomImageUpload,
  useOptimizedImageUpload as useOptimizedRoomImageUpload
} from './useStorage';

export {
  useAgreement as useRentalAgreement,
  useUserAgreements as useUserRentalAgreements,
  useAgreementActions as useRentalAgreementActions,
  usePendingAgreements as usePendingRentalAgreements,
  useActiveAgreements as useActiveRentalAgreements
} from './useAgreements';