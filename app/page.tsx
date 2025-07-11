"use client";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductGrid from "@/components/products/ProductGrid";
import ProductModal from "@/components/products/ProductModal";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import { products } from "@/lib/data";
export default function Home() {
  return (
    <>
      <HeroSection/>
      <AboutSection/>
      
      <Footer/>
    </>
  );
}
