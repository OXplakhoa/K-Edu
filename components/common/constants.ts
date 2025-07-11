// Application constants

export const APP_NAME = 'KEdu';
export const APP_DESCRIPTION = 'AI-Integrated Education Platform';

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 10000; // 10 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Categories
export const COURSE_CATEGORIES = [
  'All',
  'Programming',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Design',
  'Marketing',
  'Business',
  'Artificial Intelligence',
  'Blockchain',
] as const;

// Price Ranges
export const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 500K', min: 0, max: 500000 },
  { label: '500K - 1M', min: 500000, max: 1000000 },
  { label: '1M - 2M', min: 1000000, max: 2000000 },
  { label: 'Over 2M', min: 2000000, max: Infinity },
] as const;

// Course Levels
export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet.',
  SERVER_ERROR: 'Server is temporarily unavailable. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  TIMEOUT: 'Request timeout. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  FAVORITE_ADDED: 'Course added to favorites!',
  FAVORITE_REMOVED: 'Course removed from favorites!',
  SEARCH_SUCCESS: 'Search completed successfully!',
  AI_SUGGESTIONS: 'AI suggestions loaded successfully!',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  VIEW_HISTORY: 'viewHistory',
  USER_PREFERENCES: 'userPreferences',
  SEARCH_HISTORY: 'searchHistory',
} as const;

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Z-Index Values
export const Z_INDEX = {
  MODAL: 50,
  TOAST: 60,
  DROPDOWN: 40,
  HEADER: 30,
  OVERLAY: 20,
} as const; 