'use client'
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { categories, priceRanges } from '@/lib/data';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (category: string, priceRange: { min: number; max: number }) => void;
  onAISuggestions: () => void;
  isLoadingSuggestions: boolean;
}

export default function SearchAndFilter({
  onSearch,
  onFilter,
  onAISuggestions,
  isLoadingSuggestions
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Real-time search
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilter(category, selectedPriceRange);
  };

  const handlePriceRangeChange = (priceRange: { label: string; min: number; max: number }) => {
    setSelectedPriceRange(priceRange);
    onFilter(selectedCategory, priceRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Tìm
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng giá
          </label>
          <select
            value={selectedPriceRange.label}
            onChange={(e) => {
              const range = priceRanges.find(r => r.label === e.target.value);
              if (range) handlePriceRangeChange(range);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* AI Suggestions Button */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gợi ý AI
          </label>
          <button
            onClick={onAISuggestions}
            disabled={isLoadingSuggestions}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoadingSuggestions ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Sparkles size={20} />
            )}
            {isLoadingSuggestions ? 'Đang phân tích...' : 'Gợi ý thông minh'}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'All' || selectedPriceRange.label !== 'All Prices') && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {selectedCategory}
              <button
                onClick={() => handleCategoryChange('All')}
                className="ml-1 hover:text-blue-600 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
          {selectedPriceRange.label !== 'All Prices' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {selectedPriceRange.label}
              <button
                onClick={() => handlePriceRangeChange(priceRanges[0])}
                className="ml-1 hover:text-green-600 cursor-pointer"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
} 