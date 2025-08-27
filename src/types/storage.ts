// Storage and file upload types

export interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  accessLevel?: 'guest' | 'protected' | 'private';
  expires?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  key: string;
  url: string;
  metadata?: Record<string, string>;
}

export interface StorageServiceInterface {
  uploadImage: (file: File | Blob, roomId?: string, userId?: string, options?: UploadOptions) => Promise<string>;
  uploadFile: (file: File, path: string, options?: UploadOptions) => Promise<UploadResult>;
  deleteFile: (key: string) => Promise<boolean>;
  deleteFiles: (keys: string[]) => Promise<boolean>;
  getUrl: (key: string, expires?: number) => Promise<string>;
  moveFile: (sourceKey: string, destinationKey: string) => Promise<string>;
  listFiles: (prefix: string) => Promise<string[]>;
}

export interface ImageUploadOptions extends UploadOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  generateThumbnail?: boolean;
  thumbnailSize?: number;
}

export interface ProcessedImage {
  original: string;
  thumbnail?: string;
  metadata: {
    width: number;
    height: number;
    size: number;
    format: string;
  };
}

// File validation types
export interface FileValidationRules {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  minDimensions?: { width: number; height: number };
  maxDimensions?: { width: number; height: number };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Upload state for UI components
export interface UploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  result: UploadResult | null;
}