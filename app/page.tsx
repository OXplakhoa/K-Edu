'use client'
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <>
        <HeroSection />
        <ProductSection />
      
        <AboutSection />
      
        <Footer />
  
    </>
  );
}
