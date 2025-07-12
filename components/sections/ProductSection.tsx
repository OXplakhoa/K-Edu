"use client";
import React, { useState, useEffect } from "react";
import { Heart, Eye, Star, AlertTriangle, X } from "lucide-react";
import { products } from "@/lib/data";
import { Product, ViewType } from "@/components/common/types";
import { ToastType } from "@/components/ui/Toast";
import ProductGrid from "@/components/products/ProductGrid";
import ProductModal from "@/components/products/ProductModal";
import SearchAndFilter from "@/components/search/SearchAndFilter";
import InfiniteScroll from "@/components/features/InfiniteScroll";
import { ToastContainer } from "@/components/ui/Toast";
import { productUtils, errorUtils, stateUtils, toastUtils } from "@/lib/utils";
import { getProductsPaginated, getAISuggestions } from "@/lib/api";
import ProductSkeleton from "../products/ProductSkeleton";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export default function ProductSection() {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [currentFilters, setCurrentFilters] = useState(
    stateUtils.createInitialFilters()
  );

  // Load favorites from localStorage
  useEffect(() => {
    setFavorites(productUtils.loadFavorites());
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    productUtils.saveFavorites(favorites);
  }, [favorites]);

  // Load initial products
  useEffect(() => {
    loadInitialProducts();
  }, []);

  // Update displayedProducts when favorites or viewHistory change
  useEffect(() => {
    if (currentView === "favorites") {
      setDisplayedProducts(productUtils.getFavoritesProducts(favorites));
    } else if (currentView === "history") {
      setDisplayedProducts(productUtils.getViewHistoryProducts(viewHistory));
    }
  }, [favorites, viewHistory]);

  const addToast = (message: string, type: ToastType, duration?: number) => {
    const newToast = toastUtils.createToast(message, type, duration);
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const loadInitialProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getProductsPaginated(1, 12);
      setDisplayedProducts(result.products);
      setHasMore(result.hasMore);
      setCurrentPage(1);
    } catch (error) {
      const errorMessage = errorUtils.handleApiError(
        error,
        "Có lỗi xảy ra khi tải dữ liệu"
      );
      setError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    const newFavorites = productUtils.toggleFavorite(productId, favorites);
    setFavorites(newFavorites);

    // Show toast notification
    const product = products.find((p) => p.id === productId);
    if (product) {
      const message = newFavorites.includes(productId)
        ? `Đã thêm "${product.name}" vào yêu thích!`
        : `Đã xóa "${product.name}" khỏi yêu thích!`;
      addToast(message, "success", 3000);
    }
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);

    // Add to view history
    const newHistory = productUtils.addToViewHistory(product.id, viewHistory);
    setViewHistory(newHistory);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setCurrentFilters((prev) =>
        stateUtils.updateFilters(prev, { search: "" })
      );
      await loadInitialProducts();
      setCurrentView("all");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCurrentFilters((prev) =>
      stateUtils.updateFilters(prev, { search: query })
    );
    try {
      const result = await getProductsPaginated(1, 12, { search: query });
      setDisplayedProducts(result.products);
      setHasMore(result.hasMore);
      setCurrentPage(1);
      setCurrentView("all");
    } catch (error) {
      const errorMessage = errorUtils.handleApiError(
        error,
        "Có lỗi xảy ra khi tìm kiếm"
      );
      setError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = async (
    category: string,
    priceRange: { min: number; max: number }
  ) => {
    setIsLoading(true);
    setError(null);
    setCurrentFilters({ category, priceRange, search: "" });
    try {
      const result = await getProductsPaginated(1, 12, {
        category,
        priceRange,
      });
      setDisplayedProducts(result.products);
      setHasMore(result.hasMore);
      setCurrentPage(1);
      setCurrentView("all");
    } catch (error) {
      const errorMessage = errorUtils.handleApiError(
        error,
        "Có lỗi xảy ra khi lọc sản phẩm"
      );
      setError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAISuggestions = async () => {
    setIsLoadingSuggestions(true);
    setError(null);
    try {
      const suggestions = await getAISuggestions("user123");
      setDisplayedProducts(suggestions);
      setCurrentView("suggestions");
      setHasMore(false); // AI suggestions don't have pagination
      const successMessage = "Đã tìm thấy gợi ý phù hợp cho bạn!";
      addToast(successMessage, "success");
    } catch (error) {
      const errorMessage = errorUtils.handleApiError(
        error,
        "Không thể lấy gợi ý lúc này. Vui lòng thử lại sau."
      );
      setError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const result = await getProductsPaginated(nextPage, 12, currentFilters);
      setDisplayedProducts((prev) => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      const errorMessage = errorUtils.handleApiError(
        error,
        "Có lỗi xảy ra khi tải thêm dữ liệu"
      );
      addToast(errorMessage, "error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    switch (view) {
      case "all":
        setDisplayedProducts(products);
        break;
      case "favorites":
        setDisplayedProducts(productUtils.getFavoritesProducts(favorites));
        break;
      case "history":
        setDisplayedProducts(productUtils.getViewHistoryProducts(viewHistory));
        break;
    }
  };

  return (
    <div id="courses" className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Khám phá khóa học
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tìm kiếm và khám phá các khóa học chất lượng cao với sự hỗ trợ của
            AI
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          onAISuggestions={handleAISuggestions}
          isLoadingSuggestions={isLoadingSuggestions}
        />

        {/* View Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleViewChange("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
              currentView === "all"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
            } cursor-pointer`}
          >
            Tất cả ({hasMore ? products.length : displayedProducts.length})
          </button>
          <button
            onClick={() => handleViewChange("favorites")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
              currentView === "favorites"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
            } cursor-pointer`}
          >
            <Heart size={16} className="inline mr-2" />
            Yêu thích ({favorites.length})
          </button>
          {viewHistory.length > 0 && (
            <button
              onClick={() => handleViewChange("history")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                currentView === "history"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md"
              } cursor-pointer`}
            >
              <Eye size={16} className="inline mr-2" />
              Đã xem ({viewHistory.length})
            </button>
          )}
        </div>

        {/* Results Info */}
        {currentView === "suggestions" && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-blue-600" size={20} />
              <span className="font-medium text-blue-800">
                Gợi ý AI dựa trên hành vi của bạn
              </span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isLoadingSuggestions ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <InfiniteScroll
            onLoadMore={handleLoadMore}
            hasMore={hasMore && currentView === "all"}
            isLoading={isLoadingMore}
          >
            <ProductGrid
              products={displayedProducts}
              favorites={favorites}
              onViewDetails={handleViewDetails}
              onToggleFavorite={handleToggleFavorite}
              isLoading={isLoading}
            />
          </InfiniteScroll>
        )}

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={
            selectedProduct
              ? productUtils.isFavorite(selectedProduct.id, favorites)
              : false
          }
        />

        {/* Error Display */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-4 hover:opacity-80"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Toast Container */}
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    </div>
  );
}
