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