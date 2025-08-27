/**
 * Service Factory for Backend Migration
 * 
 * This factory allows switching between different service implementations
 * and provides a unified interface for the React application.
 */

import authService from './authService';
import listingService from './listingService';
import storageService from './storageService';
import agreementService from './agreementService';

import type { AuthService } from './authService';
import type { ListingService } from './listingService';
import type { StorageService } from './storageService';
import type { AgreementService } from './agreementService';

// Configuration for service selection
interface ServiceConfig {
  backend: 'amplify' | 'supabase';
  features: {
    listings: boolean;
    auth: boolean;
    agreements: boolean;
    storage: boolean;
  };
}

const SERVICE_CONFIG: ServiceConfig = {
  // Set to 'amplify' or 'supabase' to control which backend to use
  backend: (process.env.REACT_APP_BACKEND_SERVICE as 'amplify' | 'supabase') || 'amplify',
  
  // Feature flags for gradual migration
  features: {
    listings: process.env.REACT_APP_USE_AMPLIFY_LISTINGS === 'true' || true,
    auth: process.env.REACT_APP_USE_AMPLIFY_AUTH === 'true' || true,
    agreements: process.env.REACT_APP_USE_AMPLIFY_AGREEMENTS === 'true' || true,
    storage: process.env.REACT_APP_USE_AMPLIFY_STORAGE === 'true' || true
  }
};

/**
 * Service Factory Class
 */
export class ServiceFactory {
  private config: ServiceConfig;
  
  constructor(config: ServiceConfig = SERVICE_CONFIG) {
    this.config = config;
  }

  /**
   * Get the authentication service
   */
  getAuthService(): AuthService {
    // For now, always return Amplify auth service
    // In the future, this could switch between implementations
    return authService;
  }

  /**
   * Get the listing service
   */
  getListingService(): ListingService {
    // For now, always return Amplify listing service
    // In the future, this could switch between implementations
    return listingService;
  }

  /**
   * Get the storage service
   */
  getStorageService(): StorageService {
    // For now, always return Amplify storage service
    // In the future, this could switch between implementations
    return storageService;
  }

  /**
   * Get the agreement service
   */
  getAgreementService(): AgreementService {
    // For now, always return Amplify agreement service
    // In the future, this could switch between implementations
    return agreementService;
  }

  /**
   * Check if Amplify is being used for any service
   */
  isUsingAmplify(): boolean {
    return this.config.backend === 'amplify' || 
           Object.values(this.config.features).some(flag => flag);
  }

  /**
   * Check if a specific feature is using Amplify
   */
  isFeatureUsingAmplify(feature: keyof ServiceConfig['features']): boolean {
    return this.config.backend === 'amplify' || this.config.features[feature];
  }

  /**
   * Get current configuration
   */
  getConfig(): ServiceConfig {
    return { ...this.config };
  }

  /**
   * Update configuration at runtime
   */
  updateConfig(newConfig: Partial<ServiceConfig>): void {
    this.config = { 
      ...this.config, 
      ...newConfig,
      features: {
        ...this.config.features,
        ...newConfig.features
      }
    };
  }

  /**
   * Get service status for debugging
   */
  getServiceStatus(): Record<string, any> {
    return {
      backend: this.config.backend,
      features: this.config.features,
      services: {
        auth: 'Amplify Auth (Cognito)',
        listing: 'Amplify GraphQL (AppSync)',
        storage: 'Amplify Storage (S3)',
        agreement: 'Amplify GraphQL (AppSync)'
      },
      isAmplifyEnabled: this.isUsingAmplify()
    };
  }
}

// Create singleton instance
const serviceFactory = new ServiceFactory();

// Export convenience methods for direct service access
export const getAuthService = () => serviceFactory.getAuthService();
export const getListingService = () => serviceFactory.getListingService();
export const getStorageService = () => serviceFactory.getStorageService();
export const getAgreementService = () => serviceFactory.getAgreementService();

// Export the factory instance and class
export { serviceFactory };
export default serviceFactory;

// Export service types for TypeScript
export type {
  AuthService,
  ListingService,
  StorageService,
  AgreementService,
  ServiceConfig
};