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