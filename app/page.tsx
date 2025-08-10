import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import FeaturedProductsWrapper from "@/components/featured-products-wrapper"
import CategoryGrid from "@/components/category-grid"
import TestimonialSection from "@/components/testimonial-section"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <HeroSection />

      <Suspense fallback={<LoadingSpinner />}>
        <CategoryGrid />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProductsWrapper />
      </Suspense>

      <TestimonialSection />
    </main>
  )
}
