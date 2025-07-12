'use client'
import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Clock, Users, Heart, Tag } from 'lucide-react';
import { Product } from '@/lib/data';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export default function ProductModal({ 
  product, 
  isOpen, 
  onClose, 
  onToggleFavorite, 
  isFavorite 
}: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // const handleClickOutside = useCallback((event: MouseEvent) => {
    //   if(modalRef.current && !modalRef.current.contains(event.target as Node)){
    //     onClose
    //   }
    // },[])

    // Handle escape key to close modal
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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

  // Don't render if modal is not open or no product
  if (!product || !isOpen) return null;

  // Create modal content
  const modalContent = (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Chi tiết khóa học</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Đóng modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              {/* Course Image */}
              <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {product.name.charAt(0)}
                  </div>
                </div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200"
                  aria-label={isFavorite ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
                >
                  <Heart 
                    size={24} 
                    className={`transition-colors duration-200 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                
                {/* Discount Badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </div>
                )}
              </div>

              {/* Course Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Instructor */}
              <p className="text-lg text-gray-600 mb-4">
                Giảng viên: <span className="font-semibold">{product.instructor}</span>
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-600">
                  ({formatNumber(product.reviews)} đánh giá)
                </span>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Thời lượng</p>
                    <p className="font-semibold">{product.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Học viên</p>
                    <p className="font-semibold">{formatNumber(product.students)}</p>
                  </div>
                </div>
              </div>

              {/* Level and Language */}
              <div className="flex gap-4 mb-6">
                <span className={`inline-block px-3 py-2 rounded-full text-sm font-medium ${
                  product.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  product.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.level}
                </span>
                <span className="inline-block px-3 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {product.language}
                </span>
              </div>
            </div>

            {/* Right Column - Details and Price */}
            <div>
              {/* Price Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg">
                  Đăng ký khóa học
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Mô tả khóa học</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Tag size={20} />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* What you'll learn */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Bạn sẽ học được gì</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Nắm vững kiến thức cơ bản đến nâng cao</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Thực hành với các dự án thực tế</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Hỗ trợ từ giảng viên và cộng đồng</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">Chứng chỉ hoàn thành khóa học</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render modal outside the normal DOM hierarchy
  return createPortal(modalContent, document.body);
} 