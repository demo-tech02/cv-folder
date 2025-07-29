/**
 * Validation Utilities
 * Common validation functions used across the application
 */

import { FILE_CONSTRAINTS } from '../constants';

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (!FILE_CONSTRAINTS.SUPPORTED_TYPES.includes(file.type as any)) {
    return {
      isValid: false,
      error: `Invalid file type: ${file.name}. Please upload PDF files only.`
    };
  }
  
  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    return {
      isValid: false,
      error: `File too large: ${file.name}. Maximum size is ${FILE_CONSTRAINTS.MAX_SIZE / (1024 * 1024)}MB.`
    };
  }
  
  return { isValid: true };
};

export const validateCoverLetterForm = (formData: {
  company: string;
  location: string;
  jobTitle: string;
  jobDescription: string;
}): { isValid: boolean; error?: string } => {
  const { company, location, jobTitle, jobDescription } = formData;
  
  if (!company.trim() || !location.trim() || !jobTitle.trim() || !jobDescription.trim()) {
    return {
      isValid: false,
      error: 'Please fill in all job details fields.'
    };
  }
  
  if (jobDescription.length < 50) {
    return {
      isValid: false,
      error: 'Job description must be at least 50 characters long.'
    };
  }
  
  return { isValid: true };
};

export const validatePaymentForm = (formData: {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}): { isValid: boolean; error?: string } => {
  const { cardNumber, expiryDate, cvv, cardholderName } = formData;
  
  if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
    return {
      isValid: false,
      error: 'Please fill all fields'
    };
  }

  const cardNumberClean = cardNumber.replace(/\s/g, '');
  if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
    return {
      isValid: false,
      error: 'Invalid card number'
    };
  }

  const [expMonth, expYear] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  if (parseInt(expMonth) < 1 || parseInt(expMonth) > 12) {
    return {
      isValid: false,
      error: 'Invalid expiry date'
    };
  }
  
  if (parseInt(expYear) < currentYear || (parseInt(expYear) === currentYear && parseInt(expMonth) < currentMonth)) {
    return {
      isValid: false,
      error: 'Card has expired'
    };
  }

  if (cvv.length < 3 || cvv.length > 4) {
    return {
      isValid: false,
      error: 'Invalid CVV'
    };
  }

  return { isValid: true };
};