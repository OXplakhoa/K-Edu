'use client'
import React, { useEffect, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

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
      
      {/* Loading indicator */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center py-8">
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Loader2 className="animate-spin" size={20} />
              <span>Đang tải thêm khóa học...</span>
            </div>
          ) : (
            <div className="h-8" /> // Invisible element for intersection observer
          )}
        </div>
      )}
      
      {/* End of results */}
      {!hasMore && (
        <div className="text-center py-8 text-gray-500">
          <p>Đã hiển thị tất cả khóa học</p>
        </div>
      )}
    </div>
  );
} 