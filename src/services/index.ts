/**
 * Services index file - exports all services for easy importing
 */

// Individual services
export { default as authService, AuthService } from './authService';
export { default as listingService, ListingService } from './listingService';
export { default as storageService, StorageService } from './storageService';
export { default as agreementService, AgreementService } from './agreementService';

// Service factory
export { 
  default as serviceFactory,
  ServiceFactory,
  getAuthService,
  getListingService,
  getStorageService,
  getAgreementService
} from './serviceFactory';

// Error handling
export * from './errorHandler';

// Re-export types
export type { ServiceConfig } from './serviceFactory';