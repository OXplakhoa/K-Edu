// API type
export interface ApiError {
    message: string;
    code?: string;
    status?: number;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    hasMore: boolean;
    total: number;
    page: number;
  }