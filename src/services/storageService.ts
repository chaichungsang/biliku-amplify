/**
 * Storage Service for AWS Amplify S3
 * 
 * This service handles file uploads, downloads, and management using AWS Amplify Storage.
 * It maintains compatibility with the Vue Supabase storage interface.
 */

import { 
  uploadData, 
  getUrl, 
  remove, 
  list,
  copy,
  type UploadDataWithPathOutput
} from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';
import { getCurrentUser } from 'aws-amplify/auth';

import type {
  StorageServiceInterface,
  UploadOptions,
  UploadResult,
  ImageUploadOptions,
  ProcessedImage,
  FileValidationRules,
  ValidationResult
} from '../types/storage';

/**
 * Storage Service Class
 */
export class StorageService implements StorageServiceInterface {
  private readonly bucketPrefix = 'public/';
  private readonly imagePrefix = 'roomimages/';

  /**
   * Upload an image file to S3
   */
  async uploadImage(
    file: File | Blob, 
    roomId?: string, 
    userId?: string,
    options: ImageUploadOptions = {}
  ): Promise<string> {
    try {
      // Get current user if userId not provided
      let currentUserId = userId;
      if (!currentUserId) {
        try {
          const user = await getCurrentUser();
          currentUserId = user.userId;
        } catch (error) {
          throw new Error('User must be authenticated to upload images');
        }
      }

      // Validate file
      const validation = this.validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(`Invalid file: ${validation.errors.join(', ')}`);
      }

      // Generate file extension and name
      const fileExt = this.getFileExtension(file);
      const fileName = `${uuidv4()}.${fileExt}`;

      // Create storage path: roomimages/userId/roomId/filename or roomimages/userId/temp/filename
      const folder = roomId || 'temp';
      const path = `${this.bucketPrefix}${this.imagePrefix}${currentUserId}/${folder}/${fileName}`;

      console.log('Uploading image to S3 path:', path);

      // Upload file to S3
      const uploadTask = uploadData({
        path,
        data: file,
        options: {
          contentType: file.type || `image/${fileExt}`,
          metadata: {
            roomId: roomId || 'temp',
            userId: currentUserId,
            uploadedAt: new Date().toISOString(),
            originalName: file instanceof File ? file.name : 'blob',
            ...options.metadata
          },
          ...options
        }
      });

      const uploadResult = await uploadTask.result;

      // Get public URL
      const urlResult = await getUrl({
        path,
        options: {
          expiresIn: options.expires || 86400 // 24 hours default
        }
      });

      const publicUrl = urlResult.url.toString();
      console.log('Generated S3 URL:', publicUrl);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  /**
   * Upload any file to S3
   */
  async uploadFile(
    file: File, 
    path: string, 
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    try {
      const fullPath = path.startsWith(this.bucketPrefix) ? path : `${this.bucketPrefix}${path}`;

      const uploadResult = await uploadData({
        path: fullPath,
        data: file,
        options: {
          contentType: file.type,
          metadata: {
            originalName: file.name,
            size: file.size.toString(),
            uploadedAt: new Date().toISOString(),
            ...options.metadata
          },
          ...options
        }
      }).result;

      const urlResult = await getUrl({
        path: fullPath,
        options: {
          expiresIn: options.expires || 86400
        }
      });

      return {
        key: fullPath,
        url: urlResult.url.toString(),
        metadata: options.metadata
      };
    } catch (error: any) {
      console.error('Error uploading file:', error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string): Promise<boolean> {
    try {
      const path = key.startsWith(this.bucketPrefix) ? key : `${this.bucketPrefix}${key}`;
      await remove({ path });
      console.log('Deleted file:', path);
      return true;
    } catch (error: any) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  /**
   * Delete multiple files from S3
   */
  async deleteFiles(keys: string[]): Promise<boolean> {
    try {
      const deletionPromises = keys.map(key => this.deleteFile(key));
      const results = await Promise.allSettled(deletionPromises);
      
      const failedDeletions = results.filter(result => result.status === 'rejected');
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} files`);
        return false;
      }
      
      return true;
    } catch (error: any) {
      console.error('Error deleting files:', error);
      return false;
    }
  }

  /**
   * Get signed URL for a file
   */
  async getUrl(key: string, expires: number = 86400): Promise<string> {
    try {
      const path = key.startsWith(this.bucketPrefix) ? key : `${this.bucketPrefix}${key}`;
      
      const urlResult = await getUrl({
        path,
        options: {
          expiresIn: expires
        }
      });

      return urlResult.url.toString();
    } catch (error: any) {
      console.error('Error getting URL:', error);
      throw new Error(`Failed to get URL: ${error.message}`);
    }
  }

  /**
   * Move file from one location to another
   */
  async moveFile(sourceKey: string, destinationKey: string): Promise<string> {
    try {
      const sourcePath = sourceKey.startsWith(this.bucketPrefix) ? sourceKey : `${this.bucketPrefix}${sourceKey}`;
      const destinationPath = destinationKey.startsWith(this.bucketPrefix) ? destinationKey : `${this.bucketPrefix}${destinationKey}`;

      // Copy file to new location
      await copy({
        source: { path: sourcePath },
        destination: { path: destinationPath }
      });

      // Delete original file
      await remove({ path: sourcePath });

      // Return new URL
      return this.getUrl(destinationPath);
    } catch (error: any) {
      console.error('Error moving file:', error);
      throw new Error(`Failed to move file: ${error.message}`);
    }
  }

  /**
   * List files with given prefix
   */
  async listFiles(prefix: string): Promise<string[]> {
    try {
      const fullPrefix = prefix.startsWith(this.bucketPrefix) ? prefix : `${this.bucketPrefix}${prefix}`;
      
      const result = await list({
        path: fullPrefix
      });

      return result.items.map(item => item.path);
    } catch (error: any) {
      console.error('Error listing files:', error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Move image from temp folder to room folder
   */
  async moveImageToRoom(tempUrl: string, userId: string, roomId: string): Promise<string> {
    try {
      // Extract filename from URL
      const fileName = this.extractFileNameFromUrl(tempUrl);
      
      const sourcePath = `${this.bucketPrefix}${this.imagePrefix}${userId}/temp/${fileName}`;
      const destinationPath = `${this.bucketPrefix}${this.imagePrefix}${userId}/${roomId}/${fileName}`;

      return this.moveFile(sourcePath, destinationPath);
    } catch (error: any) {
      console.error('Error moving image to room folder:', error);
      throw error;
    }
  }

  /**
   * Delete image by URL
   */
  async deleteImageByUrl(imageUrl: string): Promise<boolean> {
    try {
      const key = this.extractS3KeyFromUrl(imageUrl);
      if (!key) {
        console.error('Invalid S3 URL format:', imageUrl);
        return false;
      }
      
      return this.deleteFile(key);
    } catch (error: any) {
      console.error('Error deleting image by URL:', error);
      return false;
    }
  }

  /**
   * Validate image file
   */
  private validateImageFile(file: File | Blob): ValidationResult {
    const errors: string[] = [];
    
    // Default validation rules for images
    const rules: FileValidationRules = {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
    };

    // Check file size
    if (rules.maxSize && file.size > rules.maxSize) {
      errors.push(`File size (${Math.round(file.size / 1024 / 1024)}MB) exceeds maximum allowed size (${Math.round(rules.maxSize / 1024 / 1024)}MB)`);
    }

    // Check file type
    if (rules.allowedTypes && !rules.allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed. Allowed types: ${rules.allowedTypes.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Get file extension from file
   */
  private getFileExtension(file: File | Blob): string {
    if (file instanceof File && file.name) {
      return file.name.split('.').pop()?.toLowerCase() || 'jpg';
    }
    
    // Determine extension from MIME type
    const mimeType = file.type.toLowerCase();
    switch (mimeType) {
      case 'image/jpeg':
      case 'image/jpg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'image/webp':
        return 'webp';
      case 'image/heic':
        return 'heic';
      case 'image/heif':
        return 'heif';
      default:
        return 'jpg';
    }
  }

  /**
   * Extract S3 key from full URL
   */
  private extractS3KeyFromUrl(url: string): string | null {
    try {
      // Handle different S3 URL formats
      const urlParts = new URL(url);
      
      // For CloudFront or S3 direct URLs
      if (urlParts.pathname.includes('/public/')) {
        const publicIndex = urlParts.pathname.indexOf('/public/');
        return urlParts.pathname.substring(publicIndex + 1); // Remove leading slash
      }
      
      // For other formats, try to extract from pathname
      const pathParts = urlParts.pathname.split('/');
      const publicIndex = pathParts.findIndex(part => part === 'public');
      
      if (publicIndex !== -1) {
        return pathParts.slice(publicIndex).join('/');
      }
      
      return null;
    } catch (error) {
      console.error('Error extracting S3 key from URL:', error);
      return null;
    }
  }

  /**
   * Extract filename from URL
   */
  private extractFileNameFromUrl(url: string): string {
    try {
      const urlParts = new URL(url);
      const pathParts = urlParts.pathname.split('/');
      return pathParts[pathParts.length - 1].split('?')[0]; // Remove query parameters
    } catch (error) {
      console.error('Error extracting filename from URL:', error);
      return 'unknown';
    }
  }
}

// Create singleton instance
export const storageService = new StorageService();
export default storageService;