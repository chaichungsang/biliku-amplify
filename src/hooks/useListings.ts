/**
 * Listing Hooks using React Query
 * 
 * These hooks provide room listing functionality with caching and state management.
 */

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getListingService } from '../services/serviceFactory';
import type {
  RoomListing,
  CreateListingData,
  UpdateListingData,
  ListingFilters,
  ListingsResponse,
  Favorite
} from '../types/listing';

const listingService = getListingService();

// Query keys for React Query
export const listingKeys = {
  all: ['listings'] as const,
  lists: () => [...listingKeys.all, 'list'] as const,
  list: (filters?: ListingFilters) => [...listingKeys.lists(), { filters }] as const,
  detail: (id: string) => [...listingKeys.all, 'detail', id] as const,
  featured: () => [...listingKeys.all, 'featured'] as const,
  myListings: () => [...listingKeys.all, 'my-listings'] as const,
  search: (query: string) => [...listingKeys.all, 'search', query] as const,
  related: (id: string) => [...listingKeys.all, 'related', id] as const,
  favorites: () => [...listingKeys.all, 'favorites'] as const,
};

/**
 * Hook to get paginated listings with filters
 */
export const useListings = (filters: ListingFilters & { page?: number; limit?: number } = {}) => {
  return useQuery({
    queryKey: listingKeys.list(filters),
    queryFn: () => listingService.getListings(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get infinite listings with pagination
 */
export const useInfiniteListings = (filters: ListingFilters = {}) => {
  return useInfiniteQuery({
    queryKey: [...listingKeys.list(filters), 'infinite'],
    queryFn: ({ pageParam = null }) => 
      listingService.getListings({ 
        ...filters, 
        nextToken: pageParam as string | undefined,
        limit: filters.limit || 10 
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: ListingsResponse) => lastPage.nextToken || null,
    staleTime: 2 * 60 * 1000,
  });
};

/**
 * Hook to get a specific listing by ID
 */
export const useListing = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: listingKeys.detail(id),
    queryFn: () => listingService.getListingById(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry for 404 errors
      if (error?.message?.includes('not found')) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook to get featured listings
 */
export const useFeaturedListings = () => {
  return useQuery({
    queryKey: listingKeys.featured(),
    queryFn: () => listingService.getFeaturedListings(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to get user's own listings
 */
export const useMyListings = () => {
  return useQuery({
    queryKey: listingKeys.myListings(),
    queryFn: () => listingService.getMyListings(),
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to search listings
 */
export const useSearchListings = (query: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: listingKeys.search(query),
    queryFn: () => listingService.searchListings(query),
    enabled: !!query && enabled,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

/**
 * Hook to get related listings
 */
export const useRelatedListings = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: listingKeys.related(id),
    queryFn: () => listingService.getRelatedListings(id),
    enabled: !!id && enabled,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for creating a new listing
 */
export const useCreateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (listingData: CreateListingData) => 
      listingService.createListing(listingData),
    onSuccess: (newListing) => {
      // Invalidate and refetch listings
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.myListings() });
      queryClient.invalidateQueries({ queryKey: listingKeys.featured() });
      
      // Add the new listing to cache
      queryClient.setQueryData(listingKeys.detail(newListing.id), newListing);
    },
  });
};

/**
 * Hook for updating an existing listing
 */
export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListingData }) =>
      listingService.updateListing(id, data),
    onSuccess: (updatedListing) => {
      // Update the specific listing in cache
      queryClient.setQueryData(listingKeys.detail(updatedListing.id), updatedListing);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.myListings() });
      queryClient.invalidateQueries({ queryKey: listingKeys.featured() });
    },
  });
};

/**
 * Hook for deleting a listing
 */
export const useDeleteListing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => listingService.deleteListing(id),
    onSuccess: (_, deletedId) => {
      // Remove the listing from cache
      queryClient.removeQueries({ queryKey: listingKeys.detail(deletedId) });
      
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.myListings() });
      queryClient.invalidateQueries({ queryKey: listingKeys.featured() });
    },
  });
};

/**
 * Hook for toggling listing availability status
 */
export const useToggleListingStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => listingService.toggleListingStatus(id),
    onSuccess: (updatedListing) => {
      // Update the specific listing in cache
      queryClient.setQueryData(listingKeys.detail(updatedListing.id), updatedListing);
      
      // Update the listing in any list queries
      queryClient.invalidateQueries({ queryKey: listingKeys.lists() });
      queryClient.invalidateQueries({ queryKey: listingKeys.myListings() });
    },
  });
};

/**
 * Hook to get user's favorite listings
 */
export const useFavorites = () => {
  return useQuery({
    queryKey: listingKeys.favorites(),
    queryFn: () => listingService.getFavorites(),
    staleTime: 2 * 60 * 1000,
  });
};

/**
 * Hook to check if a listing is favorited
 */
export const useIsFavorite = (roomId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...listingKeys.favorites(), 'check', roomId],
    queryFn: () => listingService.isFavorite(roomId),
    enabled: !!roomId && enabled,
    staleTime: 1 * 60 * 1000,
  });
};

/**
 * Hook for adding a listing to favorites
 */
export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (roomId: string) => listingService.addFavorite(roomId),
    onSuccess: (_, roomId) => {
      // Invalidate favorites queries
      queryClient.invalidateQueries({ queryKey: listingKeys.favorites() });
      // Update is favorite status
      queryClient.setQueryData([...listingKeys.favorites(), 'check', roomId], true);
    },
  });
};

/**
 * Hook for removing a listing from favorites
 */
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (favoriteId: string) => listingService.removeFavorite(favoriteId),
    onSuccess: (_, favoriteId) => {
      // Invalidate favorites queries
      queryClient.invalidateQueries({ queryKey: listingKeys.favorites() });
    },
  });
};

/**
 * Hook for toggling favorite status
 */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (roomId: string) => listingService.toggleFavorite(roomId),
    onSuccess: (_, roomId) => {
      // Invalidate favorites queries
      queryClient.invalidateQueries({ queryKey: listingKeys.favorites() });
      // Invalidate the specific favorite status check
      queryClient.invalidateQueries({ 
        queryKey: [...listingKeys.favorites(), 'check', roomId] 
      });
    },
  });
};

/**
 * Custom hook for complete listing functionality
 */
export const useListingActions = () => {
  const createMutation = useCreateListing();
  const updateMutation = useUpdateListing();
  const deleteMutation = useDeleteListing();
  const toggleStatusMutation = useToggleListingStatus();
  const toggleFavoriteMutation = useToggleFavorite();
  
  const createListing = useCallback(async (data: CreateListingData) => {
    return createMutation.mutateAsync(data);
  }, [createMutation]);
  
  const updateListing = useCallback(async (id: string, data: UpdateListingData) => {
    return updateMutation.mutateAsync({ id, data });
  }, [updateMutation]);
  
  const deleteListing = useCallback(async (id: string) => {
    return deleteMutation.mutateAsync(id);
  }, [deleteMutation]);
  
  const toggleStatus = useCallback(async (id: string) => {
    return toggleStatusMutation.mutateAsync(id);
  }, [toggleStatusMutation]);
  
  const toggleFavorite = useCallback(async (roomId: string) => {
    return toggleFavoriteMutation.mutateAsync(roomId);
  }, [toggleFavoriteMutation]);
  
  return {
    // Actions
    createListing,
    updateListing,
    deleteListing,
    toggleStatus,
    toggleFavorite,
    
    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isTogglingStatus: toggleStatusMutation.isPending,
    isTogglingFavorite: toggleFavoriteMutation.isPending,
    
    // Errors
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    toggleStatusError: toggleStatusMutation.error,
    toggleFavoriteError: toggleFavoriteMutation.error,
  };
};

/**
 * Hook for search functionality with debouncing
 */
export const useListingSearch = (initialQuery: string = '') => {
  const queryClient = useQueryClient();
  
  const searchMutation = useMutation({
    mutationFn: (query: string) => {
      if (!query.trim()) return Promise.resolve([]);
      return listingService.searchListings(query);
    },
    onSuccess: (results, query) => {
      // Cache the search results
      queryClient.setQueryData(listingKeys.search(query), results);
    },
  });
  
  const search = useCallback(async (query: string) => {
    return searchMutation.mutateAsync(query);
  }, [searchMutation]);
  
  return {
    search,
    results: searchMutation.data || [],
    isSearching: searchMutation.isPending,
    searchError: searchMutation.error,
    reset: () => searchMutation.reset(),
  };
};