import { products, Product } from "./data";

//Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//Mock API suggestions for AI
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

//Mock API for product search
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
