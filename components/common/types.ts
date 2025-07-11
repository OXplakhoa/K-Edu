// Shared types for the entire application

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    description: string;
    category: string;
    instructor: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    rating: number;
    reviews: number;
    students: number;
    language: string;
    tags: string[];
  }
  
  export interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  }
  
  export type ToastType = 'error' | 'success' | 'info' | 'warning';
  
  export interface SearchFilters {
    category: string;
    priceRange: { min: number; max: number };
    search: string;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    hasMore: boolean;
    total: number;
    page: number;
  }
  
  export interface ApiError {
    message: string;
    code?: string;
    status?: number;
  }
  
  export type ViewType = 'all' | 'favorites' | 'suggestions' | 'history'; 