/**
 * Cover Letter API Services
 * Handles all cover letter-related API calls
 */

import { mainApi, apiRequest, createUploadConfig, UploadProgressCallback } from './base';
import { API_TIMEOUTS } from '../constants';

export interface CoverLetterFormData {
  company: string;
  location: string;
  jobTitle: string;
  jobDescription: string;
}

export interface CoverLetterUploadResponse {
  session_id: string;
  file_name?: string;
  filename?: string;
  cover_letter_filename?: string;
}

export class CoverLetterApiService {
  /**
   * Generate cover letter
   */
  static async generateCoverLetter(
    file: File,
    formData: CoverLetterFormData,
    onUploadProgress?: UploadProgressCallback
  ): Promise<CoverLetterUploadResponse> {
    const uploadFormData = new FormData();
    
    uploadFormData.append('file', file, file.name);
    uploadFormData.append('company', formData.company);
    uploadFormData.append('location', formData.location);
    uploadFormData.append('job_title', formData.jobTitle);
    uploadFormData.append('job_description', formData.jobDescription);

    console.log('Sending cover letter generation request:', {
      fileName: file.name,
      company: formData.company,
      location: formData.location,
      jobTitle: formData.jobTitle,
      jobDescriptionLength: formData.jobDescription.length,
    });

    return apiRequest(() =>
      mainApi.post('/generate-cover-letter', uploadFormData, 
        createUploadConfig(onUploadProgress, API_TIMEOUTS.COVER_LETTER)
      )
    );
  }

  /**
   * Download cover letter
   */
  static async downloadCoverLetter(sessionId: string, filename: string): Promise<Blob> {
    if (!filename || filename === 'undefined' || filename === 'null') {
      throw new Error('Cover letter filename is missing or invalid');
    }

    const encodedFilename = encodeURIComponent(filename);
    const downloadUrl = `/download?session_id=${sessionId}&filename=${encodedFilename}`;
    
    console.log('Downloading cover letter from:', downloadUrl);

    const response = await mainApi.get(downloadUrl, {
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
   * Get cover letter images for mobile preview
   */
  static async getCoverLetterImages(sessionId: string, filename: string): Promise<string[]> {
    const response = await mainApi.post('/images', {
      session_id: sessionId,
      filename,
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json',
      },
      timeout: API_TIMEOUTS.DEFAULT,
    });

    // Handle different response formats
    let images: string[] | undefined;
    if (Array.isArray(response.data)) {
      images = response.data;
    } else if (response.data && Array.isArray(response.data.images)) {
      images = response.data.images;
    }

    if (!images || images.length === 0) {
      throw new Error('No preview images found');
    }

    return images;
  }
}