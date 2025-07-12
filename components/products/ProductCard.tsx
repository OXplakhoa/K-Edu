'use client'
import React from 'react';
import { Heart, Star, Clock, Users } from 'lucide-react';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export default function ProductCard({ 
  product, 
  onViewDetails, 
  onToggleFavorite, 
  isFavorite 
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group transform hover:-translate-y-2 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
          <div className="text-white text-4xl font-bold opacity-20">
            {product.name.charAt(0)}
          </div>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 cursor-pointer"
        >
          <Heart 
            size={20} 
            className={`transition-colors duration-200 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        
        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="text-xs text-blue-600 font-medium mb-2">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors min-h-[3.5rem] overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis'
        }}>
          {product.name}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-3">
          by {product.instructor}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({formatNumber(product.reviews)} reviews)
          </span>
        </div>

        {/* Course Info */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{product.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} />
            <span>{formatNumber(product.students)} students</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="mb-4">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            product.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            product.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.level}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 hover:scale-105 transition-all duration-200 font-medium shadow-md hover:shadow-lg mt-auto cursor-pointer"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
} 