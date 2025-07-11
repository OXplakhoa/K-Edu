import { clsx, type ClassValue } from "clsx"
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge"
import { Product, products } from "./data";
import { STORAGE_KEYS } from "@/components/common/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Product Management Utilities
export const productUtils = {
  // Load favorites from localStorage
  loadFavorites: (): string[] => {
    const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  },

  // Save favorites to localStorage
  saveFavorites: (favorites: string[]): void => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  },

  // Load view history from localStorage
  loadViewHistory: (): string[] => {
    const savedHistory = localStorage.getItem(STORAGE_KEYS.VIEW_HISTORY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  },

  // Save view history to localStorage
  saveViewHistory: (history: string[]): void => {
    localStorage.setItem(STORAGE_KEYS.VIEW_HISTORY, JSON.stringify(history));
  },

  // Get favorites products
  getFavoritesProducts: (favorites: string[]): Product[] => {
    return products.filter(product => favorites.includes(product.id));
  },

  // Get view history products
  getViewHistoryProducts: (viewHistory: string[]): Product[] => {
    return viewHistory.map(id => products.find(p => p.id === id)).filter(Boolean) as Product[];
  },

  // Add product to view history
  addToViewHistory: (productId: string, currentHistory: string[]): string[] => {
    const newHistory = [productId, ...currentHistory.filter(id => id !== productId)].slice(0, 10);
    productUtils.saveViewHistory(newHistory);
    return newHistory;
  },

  // Toggle favorite with toast notification
  toggleFavorite: (productId: string, currentFavorites: string[]): string[] => {
    const newFavorites = currentFavorites.includes(productId)
      ? currentFavorites.filter(id => id !== productId)
      : [...currentFavorites, productId];
    
    // Show toast notification
    const product = products.find(p => p.id === productId);
    if (product) {
      if (newFavorites.includes(productId)) {
        toast.success(`Đã thêm "${product.name}" vào yêu thích!`);
      } else {
        toast.success(`Đã xóa "${product.name}" khỏi yêu thích!`);
      }
    }
    
    return newFavorites;
  }
};

