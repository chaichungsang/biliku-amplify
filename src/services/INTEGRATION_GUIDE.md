# Biliku React Services Integration Guide

## Overview

This document provides comprehensive guidance for integrating the migrated AWS Amplify services with React components in the Biliku application.

## Architecture Overview

The services architecture consists of:

1. **Service Layer**: Core business logic services (Auth, Listing, Storage, Agreement)
2. **React Query Hooks**: Data fetching and caching layer
3. **Error Handling**: Centralized error management
4. **Type Safety**: Full TypeScript support

## Services Structure

```
src/services/
├── authService.ts          # AWS Amplify Auth integration
├── listingService.ts       # GraphQL listings management
├── storageService.ts       # S3 file uploads
├── agreementService.ts     # Legal document handling
├── serviceFactory.ts       # Service abstraction layer
├── errorHandler.ts         # Error handling utilities
└── index.ts               # Service exports

src/hooks/
├── useAuth.ts             # Authentication hooks
├── useListings.ts         # Listings data hooks
├── useStorage.ts          # File upload hooks
├── useAgreements.ts       # Agreement management hooks
└── index.ts              # Hook exports

src/types/
├── auth.ts               # Authentication types
├── listing.ts            # Listing/room types
├── storage.ts            # File upload types
├── agreement.ts          # Agreement types
└── amplify.ts           # Amplify-specific types
```

## Quick Start Integration

### 1. Setup React Query Provider

First, ensure React Query is configured in your App.tsx:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

### 2. Authentication Integration

Replace existing authentication logic with the new hooks:

```tsx
import { useAuth, useLogin, useRegister } from '@/hooks';

function LoginComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const loginMutation = useLogin();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // User is now authenticated
    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <div>Welcome, {user?.firstName}!</div>;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleLogin({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    }}>
      {/* Login form */}
    </form>
  );
}
```

### 3. Listings Integration

Update your listings page to use the new hooks:

```tsx
import { useListings, useInfiniteListings, useListingActions } from '@/hooks';

function ListingsPage() {
  const [filters, setFilters] = useState<ListingFilters>({});
  
  // For paginated results
  const { data: listingsResponse, isLoading, error } = useListings(filters);
  
  // For infinite scroll
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteListings(filters);
  
  const { toggleFavorite, isTogglingFavorite } = useListingActions();

  if (isLoading) return <div>Loading listings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {listingsResponse?.data.map(listing => (
        <RoomCard 
          key={listing.id} 
          listing={listing}
          onToggleFavorite={() => toggleFavorite(listing.id)}
          isTogglingFavorite={isTogglingFavorite}
        />
      ))}
    </div>
  );
}
```

### 4. File Upload Integration

Implement image uploads with progress tracking:

```tsx
import { useOptimizedImageUpload, useMultipleImageUpload } from '@/hooks';

function ImageUploadComponent() {
  const {
    selectedFiles,
    selectFiles,
    uploadSelected,
    isValid,
    validationErrors,
    clearFiles,
  } = useOptimizedImageUpload({
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
    autoUpload: false,
  });

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      selectFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    try {
      const results = await uploadSelected();
      console.log('Upload results:', results);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        multiple 
        accept="image/*" 
        onChange={handleFileSelection}
      />
      
      {validationErrors.map((error, index) => (
        <div key={index} className="error">{error}</div>
      ))}
      
      <div>
        Selected: {selectedFiles.length} files
      </div>
      
      <button 
        onClick={handleUpload} 
        disabled={!isValid}
      >
        Upload Images
      </button>
      
      <button onClick={clearFiles}>
        Clear
      </button>
    </div>
  );
}
```

### 5. Agreement Integration

Handle rental agreements with the new service:

```tsx
import { useAgreementActions, useUserAgreements } from '@/hooks';

function AgreementsPage() {
  const { user } = useAuth();
  const { data: agreements, isLoading } = useUserAgreements(user?.id || '');
  const { signAgreement, isSigning } = useAgreementActions();

  const handleSign = async (agreementId: string, signature: string) => {
    try {
      await signAgreement(agreementId, user!.id, { signature });
      // Agreement signed successfully
    } catch (error) {
      console.error('Signing failed:', error);
    }
  };

  if (isLoading) return <div>Loading agreements...</div>;

  return (
    <div>
      {agreements?.map(agreement => (
        <div key={agreement.id}>
          <h3>{agreement.agreementId}</h3>
          <p>Status: {agreement.status}</p>
          
          {agreement.status === 'pending_signatures' && (
            <button 
              onClick={() => handleSign(agreement.id, 'digital_signature')}
              disabled={isSigning}
            >
              {isSigning ? 'Signing...' : 'Sign Agreement'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Error Handling Best Practices

### 1. Use the Error Handler Hook

```tsx
import { useErrorHandler } from '@/services/errorHandler';

function MyComponent() {
  const { error, errorDetails, handleError, clearError } = useErrorHandler();

  const someAsyncOperation = async () => {
    try {
      // Your async operation
    } catch (err) {
      const { error, details } = handleError(err, 'MyComponent.someAsyncOperation');
      // Error is now processed and user-friendly
    }
  };

  return (
    <div>
      {error && errorDetails && (
        <div className="error-banner">
          <h4>{errorDetails.title}</h4>
          <p>{errorDetails.message}</p>
          {errorDetails.suggestions && (
            <ul>
              {errorDetails.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          )}
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      {/* Your component content */}
    </div>
  );
}
```

### 2. Global Error Boundary

```tsx
import React from 'react';
import { ErrorHandler } from '@/services/errorHandler';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const serviceError = ErrorHandler.handleError(error, 'ErrorBoundary');
    ErrorHandler.logError(serviceError, 'React Error Boundary');
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const errorDetails = ErrorHandler.getErrorDetails(
        ErrorHandler.handleError(this.state.error)
      );

      return (
        <div className="error-fallback">
          <h2>{errorDetails.title}</h2>
          <p>{errorDetails.message}</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Configuration and Environment Setup

### Environment Variables

Add these to your `.env` file:

```env
# AWS Amplify Configuration
REACT_APP_AWS_REGION=us-east-1
REACT_APP_AWS_USER_POOL_ID=your_user_pool_id
REACT_APP_AWS_USER_POOL_CLIENT_ID=your_client_id
REACT_APP_APPSYNC_ENDPOINT=your_graphql_endpoint
REACT_APP_S3_BUCKET=your_s3_bucket

# Service Configuration
REACT_APP_BACKEND_SERVICE=amplify
REACT_APP_USE_AMPLIFY_LISTINGS=true
REACT_APP_USE_AMPLIFY_AUTH=true
REACT_APP_USE_AMPLIFY_AGREEMENTS=true
REACT_APP_USE_AMPLIFY_STORAGE=true
```

### Amplify Configuration

Ensure your `amplifyconfiguration.json` is properly configured and the services are initialized.

## Migration from Vue Components

### Common Patterns

1. **Replace Vuex with React Query**: React Query handles state management for server data
2. **Replace Vue Composables with React Hooks**: Direct mapping of functionality
3. **Replace Vue Refs with React State**: Use useState for local component state
4. **Replace Vue Watchers with useEffect**: For side effects and data watching

### Example Migration

**Vue (before):**
```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useListingStore } from '@/stores/listing';

const listingStore = useListingStore();
const listings = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    listings.value = await listingStore.fetchListings();
  } finally {
    loading.value = false;
  }
});
</script>
```

**React (after):**
```tsx
import { useListings } from '@/hooks';

function ListingsComponent() {
  const { data: listings, isLoading, error } = useListings();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {listings?.data.map(listing => (
        <div key={listing.id}>{listing.title}</div>
      ))}
    </div>
  );
}
```

## Testing Integration

### Mock Services for Testing

```tsx
// __mocks__/services.ts
export const mockAuthService = {
  getCurrentUser: jest.fn(),
  login: jest.fn(),
  register: jest.fn(),
  signOut: jest.fn(),
};

export const mockListingService = {
  getListings: jest.fn(),
  getListingById: jest.fn(),
  createListing: jest.fn(),
};

// In your test files
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';
import { useListings } from '@/hooks';

describe('useListings hook', () => {
  it('should fetch listings successfully', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } }
    });
    
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useListings(), { wrapper });

    await waitFor(() => result.current.isSuccess);
    
    expect(result.current.data).toBeDefined();
  });
});
```

## Performance Optimization

### 1. Query Optimization

- Use appropriate stale times for different data types
- Implement infinite queries for large datasets  
- Use query invalidation strategically

### 2. Image Upload Optimization

- Implement image compression before upload
- Use progressive loading for image galleries
- Implement retry logic for failed uploads

### 3. Caching Strategy

- Cache user data for 5 minutes
- Cache listings for 2 minutes  
- Cache static data (cities, amenities) for 1 hour
- Use optimistic updates for mutations

## Troubleshooting

### Common Issues

1. **Authentication Errors**: Ensure Amplify is properly configured and user pool settings are correct
2. **GraphQL Errors**: Check API endpoint and authentication headers
3. **File Upload Errors**: Verify S3 permissions and CORS configuration
4. **Cache Issues**: Use React Query DevTools to debug cache state

### Debugging Tips

1. Enable React Query DevTools in development
2. Use browser network tab to monitor API calls
3. Check Amplify logs for detailed error information
4. Use the service factory's debug methods to check service status

## Next Steps

1. **Component Migration**: Update existing React components to use the new hooks
2. **GraphQL Schema**: Ensure your GraphQL schema matches the service expectations
3. **Testing**: Add comprehensive tests for all service integrations
4. **Monitoring**: Set up error monitoring and performance tracking
5. **Documentation**: Update component documentation with new hook usage

This integration guide provides the foundation for migrating from Vue/Supabase to React/Amplify while maintaining functionality and improving developer experience with TypeScript and React Query.