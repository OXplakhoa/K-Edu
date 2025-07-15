import { products, Product } from "./data";

//Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//Mock API suggestions
export const getAISuggestions = async (userId: string): Promise<Product[]> => {
  await delay(1500);
  console.log(userId);
  // if (Math.random() < 0.9) {
  //   throw new Error("Dịch vụ AI hiện đang bị lỗi, vui lòng thử lại sau");
  // }

  // if (Math.random() < 0.9) {
  //   throw new Error("Request Timeout, vui lòng thử lại sau");
  // }

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

  // if (Math.random() < 0.9) {
  //   throw new Error("Server Error, vui lòng thử lại sau");
  // }

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

  // if (Math.random() < 0.15) {
  //   throw new Error("Lỗi kết nối DB, vui lòng thử lại sau");
  // }

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

//Mock AI Chat Response
export const getChatbotResponse = async (message: string): Promise<string> => {
  await delay(1000);

  // if (Math.random() < 0.08) {
  //   throw new Error("Dịch vụ AI hiện đang bị lỗi, vui lòng thử lại sau");
  // }

  // if (Math.random() < 0.05) {
  //   throw new Error("Request Timeout, vui lòng thử lại sau");
  // }

  if (!message.trim()) {
    throw new Error("Vui lòng nhập tin nhắn");
  }
  
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("javascript") || lowerMessage.includes("js")) {
    return "Tôi nghĩ bạn nên tham gia khóa học 'Complete Javascript Course 2025' - khóa học này hoàn hảo cho người mới bắt đầu và bao gồm đầy đủ các khái niệm từ cơ bản đến nâng cao!";
  }
  if (
    lowerMessage.includes("python") ||
    lowerMessage.includes("data science")
  ) {
    return "Bạn nên xem qua khóa học 'Python for Data Science'! Khóa này dành cho người mới và bao gồm phân tích dữ liệu, machine learning và tính toán khoa học.";
  }

  if (
    lowerMessage.includes("web development") ||
    lowerMessage.includes("html") ||
    lowerMessage.includes("css")
  ) {
    return "Khóa học 'Web Development Bootcamp' sẽ rất phù hợp với bạn! Khóa này bao gồm HTML, CSS, JavaScript và các framework hiện đại trong một lộ trình toàn diện 20 giờ.";
  }

  if (
    lowerMessage.includes("mobile") ||
    lowerMessage.includes("react native")
  ) {
    return "Tôi đề xuất khóa học 'React Native Masterclass' - một khóa học trình độ trung cấp giúp bạn xây dựng ứng dụng mobile đa nền tảng.";
  }

  if (
    lowerMessage.includes("design") ||
    lowerMessage.includes("ui") ||
    lowerMessage.includes("ux")
  ) {
    return "Khóa học 'Advanced UI/UX Design' là lựa chọn tuyệt vời để học các nguyên lý thiết kế hiện đại và sử dụng công cụ như Figma!";
  }

  if (
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("ai")
  ) {
    return "Hãy thử khóa học 'Machine Learning Fundamentals'! Đây là khóa học nâng cao về thuật toán ML, mạng neural và các ứng dụng AI.";
  }
  return "Tôi rất vui lòng giúp bạn tìm khóa học hoàn hảo! Bạn có thể cho tôi biết thêm về những gì bạn muốn học không? Ví dụ, bạn có hứng thú với lập trình, thiết kế, khoa học dữ liệu hay điều gì khác không?"
};
