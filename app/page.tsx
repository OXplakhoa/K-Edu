"use client";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import { products } from "@/lib/data";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      <ProductCard product={products[0]} onViewDetails={() => {}} onToggleFavorite={() => {}} isFavorite={false}/>
      <ProductSkeleton/>
      <Footer/>
    </>
  );
}
