'use client'
import React, { useEffect, useRef, useCallback } from 'react';
import ProductSkeleton from '../products/ProductSkeleton';

interface InfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export default function InfiniteScroll({ 
  onLoadMore, 
  hasMore, 
  isLoading, 
  children 
}: InfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const element = loadingRef.current;
    if (element) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '20px',
        threshold: 0.1,
      });

      observerRef.current.observe(element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div>
      {children}
      
      {/* Loading Skeleton and Ending Message */}
    {hasMore ? (
      <div ref={loadingRef} className="py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="h-8" /> // Invisible element for intersection observer
        )}
      </div>
    ) : (
      <div className="text-center py-8 text-gray-500">
        <p>Đã hiển thị tất cả khóa học</p>
      </div>
    )}
    </div>
  );
} 