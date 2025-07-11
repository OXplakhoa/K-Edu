"use client";

import { Product } from "@/lib/data";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  favorites: string[];
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isLoading?: boolean;
  skeletonCount?: number;
}

export default function ProductGrid({
  products,
  favorites,
  onViewDetails,
  onToggleFavorite,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Không tìm thấy khóa học phù hợp
        </h3>
        <p className="text-gray-500">Thử thay đổi từ khóa hoặc bộ lọc</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          product={product}
          onViewDetails={onViewDetails}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
          key={product.id}
        />
      ))}
    </div>
  );
}
