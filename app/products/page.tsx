'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Star, Heart, ShoppingCart, Filter, Grid, List } from 'lucide-react'
import { useCart } from '@/components/cart-provider'

const products = [
  {
    id: 1,
    name: 'HD Lace Curly Wig 22"',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 127,
    image: '/hd-lace-curly-wig.png',
    texture: 'curly',
    laceType: 'hd',
    length: 22,
    style: 'long'
  },
  {
    id: 2,
    name: 'Transparent Lace Body Wave 18"',
    price: 249,
    originalPrice: 329,
    rating: 4.8,
    reviews: 89,
    image: '/transparent-lace-body-wave-wig.png',
    texture: 'body-wave',
    laceType: 'transparent',
    length: 18,
    style: 'medium'
  },
  {
    id: 3,
    name: 'Bob Cut Straight Wig 12"',
    price: 199,
    originalPrice: 259,
    rating: 4.9,
    reviews: 156,
    image: '/bob-cut-lace-wig.png',
    texture: 'straight',
    laceType: 'hd',
    length: 12,
    style: 'bob'
  },
  {
    id: 4,
    name: 'Deep Wave Frontal Wig 26"',
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviews: 73,
    image: '/deep-wave-frontal-wig.png',
    texture: 'deep-wave',
    laceType: 'frontal',
    length: 26,
    style: 'long'
  },
  {
    id: 5,
    name: 'Kinky Curly HD Lace 20"',
    price: 279,
    originalPrice: 359,
    rating: 4.8,
    reviews: 94,
    image: '/placeholder.svg?height=400&width=300',
    texture: 'kinky',
    laceType: 'hd',
    length: 20,
    style: 'medium'
  },
  {
    id: 6,
    name: 'Straight Closure Wig 16"',
    price: 229,
    originalPrice: 299,
    rating: 4.6,
    reviews: 112,
    image: '/placeholder.svg?height=400&width=300',
    texture: 'straight',
    laceType: 'closure',
    length: 16,
    style: 'medium'
  }
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    texture: '',
    laceType: '',
    style: '',
    priceRange: [0, 500],
    sortBy: 'featured'
  })
  const { addItem } = useCart()

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.texture && product.texture !== filters.texture) return false
      if (filters.laceType && product.laceType !== filters.laceType) return false
      if (filters.style && product.style !== filters.style) return false
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
      return true
    })

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for 'featured'
        break
    }

    return filtered
  }, [filters])

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Premium Lace Wigs
          </h1>
          <p className="text-lg text-gray-600">
            Discover our complete collection of premium quality lace wigs
          </p>
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
                <Select value={filters.texture} onValueChange={(value) => setFilters(prev => ({ ...prev, texture: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Textures" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Textures</SelectItem>
                    <SelectItem value="straight">Straight</SelectItem>
                    <SelectItem value="curly">Curly</SelectItem>
                    <SelectItem value="body-wave">Body Wave</SelectItem>
                    <SelectItem value="deep-wave">Deep Wave</SelectItem>
                    <SelectItem value="kinky">Kinky</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Lace Type Filter */}
              <div className="space-y-2 mb-6">
                <Label>Lace Type</Label>
                <Select value={filters.laceType} onValueChange={(value) => setFilters(prev => ({ ...prev, laceType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Lace Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Lace Types</SelectItem>
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
                <Select value={filters.style} onValueChange={(value) => setFilters(prev => ({ ...prev, style: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Styles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Styles</SelectItem>
                    <SelectItem value="bob">Bob Cut</SelectItem>
                    <SelectItem value="medium">Medium Length</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 mb-6">
                <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                  max={500}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters({
                  texture: '',
                  laceType: '',
                  style: '',
                  priceRange: [0, 500],
                  sortBy: 'featured'
                })}
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} products
              </p>
              
              <div className="flex items-center gap-4">
                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
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
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    {viewMode === 'grid' ? (
                      <>
                        <div className="relative">
                          <div 
                            className="aspect-[3/4] bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url('${product.image}')` }}
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
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviews})</span>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs capitalize">
                              {product.laceType.replace('-', ' ')}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.length}"
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-gray-900">
                                ${product.price}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
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
                          style={{ backgroundImage: `url('${product.image}')` }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-1 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviews})</span>
                          </div>
                          
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-xs capitalize">
                              {product.laceType.replace('-', ' ')}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.length}"
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg text-gray-900">
                                ${product.price}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
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
                  className="mt-4"
                  onClick={() => setFilters({
                    texture: '',
                    laceType: '',
                    style: '',
                    priceRange: [0, 500],
                    sortBy: 'featured'
                  })}
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
