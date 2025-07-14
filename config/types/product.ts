// Product type
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