import { products, Product } from "./data";

//Mock API delay
const delay = (ms:number) => new Promise(resolve => setTimeout(resolve,ms));

//Mock API suggestions for AI
export const getAISuggestions = async(userId: string): Promise<Product[]> => {
    await delay(1500);

    //Giả lập ngãu nhiên lỗi (10%)
    if(Math.random() < 0.1){
        throw new Error('Dịch vụ AI hiện đang bị lỗi, vui lòng thử lại sau')
    }

    //Giả lập network timeout(5%)
    if (Math.random() < 0.05){
        throw new Error('Request Timeout, vui lòng thử lại sau')
    }
    
    const suggestions = [
        products.find(p => p.id === '1'),
        products.find(p => p.id === '3'),
        products.find(p => p.id === '6'),
    ].filter(Boolean) as Product[];
    return suggestions
}

