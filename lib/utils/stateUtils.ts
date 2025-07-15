import { SearchFilters } from "@/config";

export const stateUtils = {
  // Create initial filters state
  createInitialFilters: (): SearchFilters => ({
    category: "All",
    priceRange: { min: 0, max: Infinity },
    search: "",
  }),

  // Update filters state
  updateFilters: (
    currentFilters: SearchFilters,
    updates: Partial<SearchFilters>
  ) => ({
    ...currentFilters,
    ...updates,
  }),
};
