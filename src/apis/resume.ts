/**
 * Resume API Services
 * Handles all resume-related API calls
 */

import { mainApi, apiRequest, createUploadConfig, UploadProgressCallback } from './base';
import { API_TIMEOUTS } from '../constants';

export interface ResumeUploadResponse {
  session_id: string;
  classic_resume_url: string;
  modern_resume_url: string;
}

export interface DownloadParams {
  session_id: string;
  filename: string;
}

export class ResumeApiService {
  /**
   * Health check endpoint
   */
  static async healthCheck(): Promise<void> {
    await apiRequest(() => 
      mainApi.get('/health-check', {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json'
        },
        timeout: 10000
      })
    );
  }

  /**
   * Upload resume for enhancement
   */
  static async uploadResume(
    file: File,
    onUploadProgress?: UploadProgressCallback
  ): Promise<ResumeUploadResponse> {
    // Health check first
    await this.healthCheck();

    const formData = new FormData();
    formData.append('file', file, file.name);

    return apiRequest(() =>
      mainApi.post('/upload-resume', formData, createUploadConfig(onUploadProgress))
    );
  }

  /**
   * Download resume file
   */
  static async downloadResume(params: DownloadParams): Promise<Blob> {
    const response = await mainApi.get('/download', {
      params,
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf',
        'ngrok-skip-browser-warning': 'true'
      },
      timeout: API_TIMEOUTS.DEFAULT,
    });

    // Validate PDF response
    if (!response.headers['content-type']?.includes('application/pdf')) {
      throw new Error('Server did not return a PDF');
    }

    return response.data;
  }

  /**
   * Get resume images for mobile preview
   */
  static async getResumeImages(sessionId: string, filenames: string[]): Promise<string[]> {
    const response = await mainApi.post('/images', {
      session_id: sessionId,
      filenames,
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
      timeout: API_TIMEOUTS.DEFAULT,
      validateStatus: () => true // Handle errors manually
    });

    if (response.status === 404 || (response.data?.detail?.includes('not found'))) {
      throw new Error('Resume file not found for preview');
    }

    // Handle different response formats
    let images: string[] | undefined;
    if (Array.isArray(response.data)) {
      images = response.data;
    } else if (response.data && Array.isArray(response.data.images)) {
      images = response.data.images;
    } else if (typeof response.data === 'object') {
      const arr = Object.values(response.data).find(v => 
        Array.isArray(v) && v.every(i => typeof i === 'string')
      );
      if (arr) images = arr as string[];
    }

    if (!images || images.length === 0) {
      throw new Error('No preview images found');
    }

    return images;
  }
}