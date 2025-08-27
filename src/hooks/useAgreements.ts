/**
 * Agreement Hooks using React Query
 * 
 * These hooks provide rental agreement functionality with caching and state management.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getAgreementService } from '../services/serviceFactory';
import type {
  RentalAgreement,
  CreateRentalAgreementData,
  SignAgreementData,
  AgreementResponse
} from '../types/agreement';

const agreementService = getAgreementService();

// Query keys for React Query
export const agreementKeys = {
  all: ['agreements'] as const,
  lists: () => [...agreementKeys.all, 'list'] as const,
  list: (userId: string) => [...agreementKeys.lists(), userId] as const,
  detail: (id: string) => [...agreementKeys.all, 'detail', id] as const,
  userAgreements: (userId: string) => [...agreementKeys.all, 'user', userId] as const,
};

/**
 * Hook to get a specific agreement by ID
 */
export const useAgreement = (agreementId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: agreementKeys.detail(agreementId),
    queryFn: () => agreementService.getAgreement(agreementId),
    enabled: !!agreementId && enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry for 404 errors
      if (error?.message?.includes('not found')) return false;
      return failureCount < 3;
    },
  });
};

/**
 * Hook to get user's agreements (as landlord or tenant)
 */
export const useUserAgreements = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: agreementKeys.userAgreements(userId),
    queryFn: () => agreementService.getUserAgreements(userId),
    enabled: !!userId && enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook for creating a new rental agreement
 */
export const useCreateAgreement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (agreementData: CreateRentalAgreementData) =>
      agreementService.createRentalAgreement(agreementData),
    onSuccess: (response: AgreementResponse<RentalAgreement>) => {
      const agreement = response.data;
      
      // Add the new agreement to cache
      queryClient.setQueryData(agreementKeys.detail(agreement.id), agreement);
      
      // Invalidate user agreements lists
      queryClient.invalidateQueries({ queryKey: agreementKeys.lists() });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(agreement.landlordId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(agreement.tenantId) 
      });
    },
  });
};

/**
 * Hook for signing an agreement
 */
export const useSignAgreement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      agreementId, 
      userId, 
      signatureData 
    }: {
      agreementId: string;
      userId: string;
      signatureData: SignAgreementData;
    }) => agreementService.signAgreement(agreementId, userId, signatureData),
    onSuccess: (response: AgreementResponse<RentalAgreement>, { agreementId, userId }) => {
      const agreement = response.data;
      
      // Update the agreement in cache
      queryClient.setQueryData(agreementKeys.detail(agreementId), agreement);
      
      // Invalidate user agreements to refresh the lists
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(agreement.landlordId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(agreement.tenantId) 
      });
    },
  });
};

/**
 * Hook for updating agreement status
 */
export const useUpdateAgreementStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      agreementId, 
      status, 
      userId 
    }: {
      agreementId: string;
      status: RentalAgreement['status'];
      userId: string;
    }) => agreementService.updateAgreementStatus(agreementId, status, userId),
    onSuccess: (updatedAgreement, { userId }) => {
      // Update the agreement in cache
      queryClient.setQueryData(agreementKeys.detail(updatedAgreement.id), updatedAgreement);
      
      // Invalidate user agreements to refresh the lists
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(userId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(updatedAgreement.landlordId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: agreementKeys.userAgreements(updatedAgreement.tenantId) 
      });
    },
  });
};

/**
 * Hook for generating agreement HTML
 */
export const useGenerateAgreementHTML = () => {
  return useMutation({
    mutationFn: (agreementData: RentalAgreement) =>
      agreementService.generateAgreementHTML(agreementData),
  });
};

/**
 * Custom hook for complete agreement functionality
 */
export const useAgreementActions = () => {
  const createMutation = useCreateAgreement();
  const signMutation = useSignAgreement();
  const updateStatusMutation = useUpdateAgreementStatus();
  
  const createAgreement = useCallback(async (data: CreateRentalAgreementData) => {
    const result = await createMutation.mutateAsync(data);
    return result.data;
  }, [createMutation]);
  
  const signAgreement = useCallback(async (
    agreementId: string,
    userId: string,
    signatureData: SignAgreementData
  ) => {
    const result = await signMutation.mutateAsync({ agreementId, userId, signatureData });
    return result.data;
  }, [signMutation]);
  
  const updateStatus = useCallback(async (
    agreementId: string,
    status: RentalAgreement['status'],
    userId: string
  ) => {
    return updateStatusMutation.mutateAsync({ agreementId, status, userId });
  }, [updateStatusMutation]);
  
  return {
    // Actions
    createAgreement,
    signAgreement,
    updateStatus,
    
    // Loading states
    isCreating: createMutation.isPending,
    isSigning: signMutation.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
    
    // Errors
    createError: createMutation.error,
    signError: signMutation.error,
    updateStatusError: updateStatusMutation.error,
    
    // Success states
    createSuccess: createMutation.isSuccess,
    signSuccess: signMutation.isSuccess,
    updateStatusSuccess: updateStatusMutation.isSuccess,
  };
};

/**
 * Hook to filter agreements by status
 */
export const useAgreementsByStatus = (
  userId: string, 
  status?: RentalAgreement['status'],
  enabled: boolean = true
) => {
  const { data: agreements, ...queryResult } = useUserAgreements(userId, enabled);
  
  const filteredAgreements = agreements?.filter(agreement => 
    status ? agreement.status === status : true
  ) || [];
  
  return {
    ...queryResult,
    data: filteredAgreements,
    agreements: filteredAgreements,
  };
};

/**
 * Hook to get agreements where user is landlord
 */
export const useLandlordAgreements = (userId: string, enabled: boolean = true) => {
  const { data: agreements, ...queryResult } = useUserAgreements(userId, enabled);
  
  const landlordAgreements = agreements?.filter(agreement => 
    agreement.landlordId === userId
  ) || [];
  
  return {
    ...queryResult,
    data: landlordAgreements,
    agreements: landlordAgreements,
  };
};

/**
 * Hook to get agreements where user is tenant
 */
export const useTenantAgreements = (userId: string, enabled: boolean = true) => {
  const { data: agreements, ...queryResult } = useUserAgreements(userId, enabled);
  
  const tenantAgreements = agreements?.filter(agreement => 
    agreement.tenantId === userId
  ) || [];
  
  return {
    ...queryResult,
    data: tenantAgreements,
    agreements: tenantAgreements,
  };
};

/**
 * Hook to get pending agreements (requiring user's signature)
 */
export const usePendingAgreements = (userId: string, enabled: boolean = true) => {
  const { data: agreements, ...queryResult } = useUserAgreements(userId, enabled);
  
  const pendingAgreements = agreements?.filter(agreement => {
    const isLandlord = agreement.landlordId === userId;
    const isTenant = agreement.tenantId === userId;
    
    // Check if user needs to sign
    if (isLandlord && !agreement.landlordSignature) return true;
    if (isTenant && !agreement.tenantSignature) return true;
    
    return false;
  }) || [];
  
  return {
    ...queryResult,
    data: pendingAgreements,
    agreements: pendingAgreements,
    count: pendingAgreements.length,
  };
};

/**
 * Hook to get active agreements
 */
export const useActiveAgreements = (userId: string, enabled: boolean = true) => {
  return useAgreementsByStatus(userId, 'active', enabled);
};

/**
 * Hook to get draft agreements
 */
export const useDraftAgreements = (userId: string, enabled: boolean = true) => {
  return useAgreementsByStatus(userId, 'draft', enabled);
};

/**
 * Hook to check if user can sign an agreement
 */
export const useCanSignAgreement = (agreement: RentalAgreement | null, userId: string) => {
  if (!agreement) return false;
  
  const isLandlord = agreement.landlordId === userId;
  const isTenant = agreement.tenantId === userId;
  
  // User must be either landlord or tenant
  if (!isLandlord && !isTenant) return false;
  
  // Check if user hasn't signed yet
  if (isLandlord && !agreement.landlordSignature) return true;
  if (isTenant && !agreement.tenantSignature) return true;
  
  return false;
};

/**
 * Hook to check if agreement is fully signed
 */
export const useIsAgreementFullySigned = (agreement: RentalAgreement | null) => {
  return !!(agreement?.landlordSignature && agreement?.tenantSignature);
};