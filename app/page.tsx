import AboutSection from "@/components/sections/AboutSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/error/ErrorBoundary";

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <ProductSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
