export const stateUtils = {
    // Create initial filters state
    createInitialFilters: () => ({
      category: 'All',
      priceRange: { min: 0, max: Infinity },
      search: ''
    }),
  
    // Update filters state
    updateFilters: (
      currentFilters: any, 
      updates: Partial<{ category: string; priceRange: { min: number; max: number }; search: string }>
    ) => ({
      ...currentFilters,
      ...updates
    })
  };