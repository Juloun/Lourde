"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Heart, ShoppingCart, Filter, Grid, List } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useProducts } from "@/hooks/use-products"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function ProductsPage() {
  const { products: allProducts, loading: productsLoading, error, usingFallback } = useProducts()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    texture: "all",
    laceType: "all",
    style: "all",
    priceRange: [0, 500],
    sortBy: "featured",
  })
  const { addItem } = useCart()

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      if (filters.texture !== "all" && product.texture !== filters.texture) return false
      if (filters.laceType !== "all" && product.lace_type !== filters.laceType) return false
      if (filters.style !== "all" && product.style !== filters.style) return false
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
      return true
    })

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      default:
        // Keep original order for 'featured'
        break
    }

    return filtered
  }, [filters, allProducts])

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
    addItem({
      id: Number.parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.image_url,
    })
  }

  if (productsLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Premium Lace Wigs</h1>
          <p className="text-lg text-gray-600">Discover our complete collection of premium quality lace wigs</p>
          {usingFallback && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-2xl">
              <p className="text-sm text-amber-700">
                🚀 <strong>Demo Mode:</strong> You're viewing our sample product catalog. To see live inventory, please
                set up your Supabase database connection.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Texture Filter */}
              <div className="space-y-2 mb-6">
                <Label>Texture</Label>
                <Select
                  value={filters.texture}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, texture: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Textures" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Textures</SelectItem>
                    <SelectItem value="straight">Straight</SelectItem>
                    <SelectItem value="curly">Curly</SelectItem>
                    <SelectItem value="body-wave">Body Wave</SelectItem>
                    <SelectItem value="deep-wave">Deep Wave</SelectItem>
                    <SelectItem value="kinky">Kinky</SelectItem>
                    <SelectItem value="water-wave">Water Wave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lace Type Filter */}
              <div className="space-y-2 mb-6">
                <Label>Lace Type</Label>
                <Select
                  value={filters.laceType}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, laceType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Lace Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Lace Types</SelectItem>
                    <SelectItem value="hd">HD Lace</SelectItem>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="frontal">Frontal</SelectItem>
                    <SelectItem value="closure">Closure</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Style Filter */}
              <div className="space-y-2 mb-6">
                <Label>Style</Label>
                <Select
                  value={filters.style}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, style: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Styles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="bob">Bob Cut</SelectItem>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="medium">Medium Length</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 mb-6">
                <Label>
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() =>
                  setFilters({
                    texture: "all",
                    laceType: "all",
                    style: "all",
                    priceRange: [0, 500],
                    sortBy: "featured",
                  })
                }
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Showing {filteredProducts.length} products</p>

              <div className="flex items-center gap-4">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative">
                          <div
                            className="aspect-[3/4] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url('${product.image_url}')` }}
                          />
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
                            <Button
                              size="sm"
                              className="bg-rose-600 hover:bg-rose-700"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex gap-4 p-4">
                        <div
                          className="w-32 h-32 bg-cover bg-center rounded-lg flex-shrink-0"
                          style={{ backgroundImage: `url('${product.image_url}')` }}
                        />
                        <div className="flex-1">
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

                          <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>

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
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                className="bg-rose-600 hover:bg-rose-700"
                                onClick={() => handleAddToCart(product)}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() =>
                    setFilters({
                      texture: "all",
                      laceType: "all",
                      style: "all",
                      priceRange: [0, 500],
                      sortBy: "featured",
                    })
                  }
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
