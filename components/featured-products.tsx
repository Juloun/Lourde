"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useFeaturedProducts } from "@/hooks/use-products"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function FeaturedProducts() {
  const { products: featuredProducts, loading, error, usingFallback } = useFeaturedProducts()

  if (loading) return <LoadingSpinner />

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most loved premium wigs, handpicked for their exceptional quality and style
          </p>
          {usingFallback && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-amber-700">
                🚀 <strong>Demo Mode:</strong> Showing sample products. Connect your database to see live inventory.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div
                    className="aspect-[3/4] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${product.image_url}')` }}
                  />
                  <Badge className="absolute top-3 left-3 bg-rose-600 text-white">
                    {product.featured ? "Featured" : "New"}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-700"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.review_count})</span>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs capitalize">
                      {product.lace_type.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.length}"
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">${product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white bg-transparent"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
