/**
 * Storage Hooks using React Query
 * 
 * These hooks provide file upload and storage functionality with progress tracking.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { getStorageService } from '../services/serviceFactory';
import type { 
  UploadResult, 
  UploadOptions, 
  ImageUploadOptions,
  UploadState 
} from '../types/storage';

const storageService = getStorageService();

/**
 * Hook for uploading images with progress tracking
 */
export const useImageUpload = () => {
  const [uploadStates, setUploadStates] = useState<Record<string, UploadState>>({});
  
  const uploadMutation = useMutation({
    mutationFn: async ({ 
      file, 
      roomId, 
      userId, 
      options,
      uploadId 
    }: {
      file: File | Blob;
      roomId?: string;
      userId?: string;
      options?: ImageUploadOptions;
      uploadId: string;
    }) => {
      // Set uploading state
      setUploadStates(prev => ({
        ...prev,
        [uploadId]: {
          isUploading: true,
          progress: 0,
          error: null,
          result: null
        }
      }));
      
      try {
        const url = await storageService.uploadImage(file, roomId, userId, options);
        
        const result: UploadResult = {
          key: url, // For now, using URL as key
          url,
          metadata: options?.metadata
        };
        
        // Set success state
        setUploadStates(prev => ({
          ...prev,
          [uploadId]: {
            isUploading: false,
            progress: 100,
            error: null,
            result
          }
        }));
        
        return result;
      } catch (error: any) {
        // Set error state
        setUploadStates(prev => ({
          ...prev,
          [uploadId]: {
            isUploading: false,
            progress: 0,
            error: error.message,
            result: null
          }
        }));
        throw error;
      }
    },
  });
  
  const uploadImage = useCallback(async (
    file: File | Blob,
    roomId?: string,
    userId?: string,
    options?: ImageUploadOptions
  ) => {
    const uploadId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return uploadMutation.mutateAsync({
      file,
      roomId,
      userId,
      options,
      uploadId
    });
  }, [uploadMutation]);
  
  const getUploadState = useCallback((uploadId: string): UploadState => {
    return uploadStates[uploadId] || {
      isUploading: false,
      progress: 0,
      error: null,
      result: null
    };
  }, [uploadStates]);
  
  const clearUploadState = useCallback((uploadId: string) => {
    setUploadStates(prev => {
      const { [uploadId]: removed, ...rest } = prev;
      return rest;
    });
  }, []);
  
  return {
    uploadImage,
    getUploadState,
    clearUploadState,
    uploadStates,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
    reset: uploadMutation.reset,
  };
};

/**
 * Hook for uploading multiple images
 */
export const useMultipleImageUpload = () => {
  const { uploadImage, uploadStates } = useImageUpload();
  const [batchStates, setBatchStates] = useState<Record<string, {
    totalFiles: number;
    completedFiles: number;
    failedFiles: number;
    results: UploadResult[];
    errors: string[];
    isComplete: boolean;
  }>>({});
  
  const uploadMultipleImages = useCallback(async (
    files: (File | Blob)[],
    roomId?: string,
    userId?: string,
    options?: ImageUploadOptions
  ): Promise<UploadResult[]> => {
    const batchId = `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize batch state
    setBatchStates(prev => ({
      ...prev,
      [batchId]: {
        totalFiles: files.length,
        completedFiles: 0,
        failedFiles: 0,
        results: [],
        errors: [],
        isComplete: false
      }
    }));
    
    const results: UploadResult[] = [];
    const errors: string[] = [];
    
    // Upload files concurrently
    await Promise.allSettled(
      files.map(async (file, index) => {
        try {
          const result = await uploadImage(file, roomId, userId, options);
          results[index] = result;
          
          // Update batch state
          setBatchStates(prev => {
            const batch = prev[batchId];
            if (batch) {
              return {
                ...prev,
                [batchId]: {
                  ...batch,
                  completedFiles: batch.completedFiles + 1,
                  results: [...batch.results, result]
                }
              };
            }
            return prev;
          });
        } catch (error: any) {
          errors[index] = error.message;
          
          // Update batch state
          setBatchStates(prev => {
            const batch = prev[batchId];
            if (batch) {
              return {
                ...prev,
                [batchId]: {
                  ...batch,
                  failedFiles: batch.failedFiles + 1,
                  errors: [...batch.errors, error.message]
                }
              };
            }
            return prev;
          });
        }
      })
    );
    
    // Mark batch as complete
    setBatchStates(prev => {
      const batch = prev[batchId];
      if (batch) {
        return {
          ...prev,
          [batchId]: {
            ...batch,
            isComplete: true
          }
        };
      }
      return prev;
    });
    
    // Filter out failed uploads
    const successfulResults = results.filter(Boolean);
    
    if (errors.some(Boolean)) {
      const errorMessage = `${errors.filter(Boolean).length} out of ${files.length} uploads failed`;
      throw new Error(errorMessage);
    }
    
    return successfulResults;
  }, [uploadImage]);
  
  const getBatchState = useCallback((batchId: string) => {
    return batchStates[batchId];
  }, [batchStates]);
  
  const clearBatchState = useCallback((batchId: string) => {
    setBatchStates(prev => {
      const { [batchId]: removed, ...rest } = prev;
      return rest;
    });
  }, []);
  
  return {
    uploadMultipleImages,
    getBatchState,
    clearBatchState,
    batchStates,
  };
};

/**
 * Hook for uploading any file
 */
export const useFileUpload = () => {
  return useMutation({
    mutationFn: ({ 
      file, 
      path, 
      options 
    }: {
      file: File;
      path: string;
      options?: UploadOptions;
    }) => {
      return storageService.uploadFile(file, path, options);
    },
  });
};

/**
 * Hook for deleting files
 */
export const useDeleteFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (key: string) => storageService.deleteFile(key),
    onSuccess: () => {
      // Invalidate any cached data that might depend on the deleted file
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

/**
 * Hook for deleting multiple files
 */
export const useDeleteFiles = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (keys: string[]) => storageService.deleteFiles(keys),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

/**
 * Hook for getting file URLs
 */
export const useGetFileUrl = () => {
  return useMutation({
    mutationFn: ({ key, expires }: { key: string; expires?: number }) =>
      storageService.getUrl(key, expires),
  });
};

/**
 * Hook for moving files
 */
export const useMoveFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      sourceKey, 
      destinationKey 
    }: {
      sourceKey: string;
      destinationKey: string;
    }) => storageService.moveFile(sourceKey, destinationKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

/**
 * Hook for moving images from temp to room folder
 */
export const useMoveImageToRoom = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      tempUrl, 
      userId, 
      roomId 
    }: {
      tempUrl: string;
      userId: string;
      roomId: string;
    }) => storageService.moveImageToRoom(tempUrl, userId, roomId),
    onSuccess: () => {
      // Invalidate listing queries that might use the moved images
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
};

/**
 * Custom hook for image upload with validation and optimization
 */
export const useOptimizedImageUpload = (options: {
  maxFiles?: number;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  autoUpload?: boolean;
} = {}) => {
  const { 
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    autoUpload = false
  } = options;
  
  const { uploadMultipleImages } = useMultipleImageUpload();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const validateFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const errors: string[] = [];
    
    // Check number of files
    if (fileArray.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
    }
    
    // Check each file
    fileArray.forEach((file, index) => {
      // Check file size
      if (file.size > maxSize) {
        errors.push(`File ${index + 1}: Size exceeds ${Math.round(maxSize / 1024 / 1024)}MB`);
      }
      
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        errors.push(`File ${index + 1}: Type ${file.type} not allowed`);
      }
    });
    
    setValidationErrors(errors);
    return errors.length === 0;
  }, [maxFiles, maxSize, allowedTypes]);
  
  const selectFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    if (validateFiles(fileArray)) {
      setSelectedFiles(fileArray);
      
      if (autoUpload) {
        uploadMultipleImages(fileArray);
      }
    }
  }, [validateFiles, autoUpload, uploadMultipleImages]);
  
  const clearFiles = useCallback(() => {
    setSelectedFiles([]);
    setValidationErrors([]);
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  const uploadSelected = useCallback(async (roomId?: string, userId?: string) => {
    if (selectedFiles.length === 0) {
      throw new Error('No files selected');
    }
    
    return uploadMultipleImages(selectedFiles, roomId, userId);
  }, [selectedFiles, uploadMultipleImages]);
  
  return {
    selectedFiles,
    validationErrors,
    selectFiles,
    clearFiles,
    removeFile,
    uploadSelected,
    isValid: validationErrors.length === 0 && selectedFiles.length > 0,
    fileCount: selectedFiles.length,
  };
};