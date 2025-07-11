export default function ProductSkeleton() {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* Image Skeleton */}
        <div className="h-48 bg-gray-300"></div>
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          
          {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          
          {/* Instructor */}
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="h-3 bg-gray-300 rounded w-8"></div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
          
          {/* Course Info */}
          <div className="flex gap-4">
            <div className="h-3 bg-gray-300 rounded w-16"></div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
          
          {/* Level */}
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          
          {/* Price */}
          <div className="h-5 bg-gray-300 rounded w-24"></div>
          
          {/* Button */}
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  } 