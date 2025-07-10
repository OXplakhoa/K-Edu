import { products, Product } from "./data";

//Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//Mock API suggestions
export const getAISuggestions = async (userId: string): Promise<Product[]> => {
  await delay(1500);

  //Giả lập ngãu nhiên lỗi (10%)
  if (Math.random() < 0.1) {
    throw new Error("Dịch vụ AI hiện đang bị lỗi, vui lòng thử lại sau");
  }

  //Giả lập network timeout(5%)
  if (Math.random() < 0.05) {
    throw new Error("Request Timeout, vui lòng thử lại sau");
  }

  const suggestions = [
    products.find((p) => p.id === "1"),
    products.find((p) => p.id === "3"),
    products.find((p) => p.id === "6"),
  ].filter(Boolean) as Product[];
  return suggestions;
};

//Mock API product search
export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(500);

  //Giả lập lỗi server (5%)
  if (Math.random() < 0.05) {
    throw new Error("Server Error, vui lòng thử lại sau");
  }

  //Giả lập lỗi query invalid
  if (query.trim().length < 2) {
    throw new Error("Tìm kiếm phải có ít nhất 2 ký tự");
  }

  const filtered = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      )
  );
  return filtered;
};

//Mock API filter products
export const filterProducts = async (
  category: string,
  priceRange: { min: number; max: number }
): Promise<Product[]> => {
  await delay(300);

  let filtered = products;

  if (category !== "All") {
    filtered = filtered.filter((product) => product.category === category);
  }

  filtered = filtered.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );
  return filtered;
};

//Mock pagination API for infinite scroll
export const getProductsPaginated = async (
  page: number = 1,
  limit: number = 12,
  filters?: {
    category?: string;
    priceRange?: { min: number; max: number };
    search?: string;
  }
): Promise<{ products: Product[]; hasMore: boolean; total: number }> => {
  await delay(500);

  //Giả lập kết nối DB lỗi (15%)
  if (Math.random() < 0.15) {
    throw new Error("Lỗi kết nối DB, vui lòng thử lại sau");
  }

  //Giả lập page number invalid
  if (page < 1) {
    throw new Error("Trang không hợp lệ, vui lòng thử lại sau");
  }
  let filtered = products;

  //Apply filter
  if (filters?.search) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(filters.search!.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(filters.search!.toLowerCase())
        )
    );
  }
  if (filters?.category && filters.category !== "All") {
    filtered = filtered.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters?.priceRange) {
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange!.min &&
        product.price <= filters.priceRange!.max
    );
  }
  //Calculate Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filtered.slice(startIndex, endIndex);
  const hasMore = endIndex < filtered.length;
  return {
    products: paginatedProducts,
    hasMore,
    total: filtered.length,
  };
};
