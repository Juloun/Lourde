"use client"

import { useState, useEffect } from "react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Product = Database["public"]["Tables"]["products"]["Row"]

// Enhanced fallback products data
const fallbackProducts: Product[] = [
  {
    id: "1",
    name: 'HD Lace Curly Wig 22"',
    description: "Premium HD lace curly wig with natural hairline and baby hairs. Made from 100% virgin human hair.",
    price: 299,
    original_price: 399,
    rating: 4.9,
    review_count: 127,
    image_url: "/hd-lace-curly-wig.png",
    texture: "curly",
    lace_type: "hd",
    length: 22,
    style: "long",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: 'Transparent Lace Body Wave 18"',
    description: "Transparent lace body wave wig that melts seamlessly into any skin tone. Soft and bouncy texture.",
    price: 249,
    original_price: 329,
    rating: 4.8,
    review_count: 89,
    image_url: "/transparent-lace-body-wave-wig.png",
    texture: "body-wave",
    lace_type: "transparent",
    length: 18,
    style: "medium",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: 'Bob Cut Straight Wig 12"',
    description: "Chic bob cut straight wig perfect for everyday wear. HD lace construction for natural look.",
    price: 199,
    original_price: 259,
    rating: 4.9,
    review_count: 156,
    image_url: "/bob-cut-lace-wig.png",
    texture: "straight",
    lace_type: "hd",
    length: 12,
    style: "bob",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: 'Deep Wave Frontal Wig 26"',
    description: "Luxurious deep wave frontal wig with 13x4 lace frontal. Perfect for special occasions.",
    price: 349,
    original_price: 449,
    rating: 4.7,
    review_count: 73,
    image_url: "/deep-wave-frontal-wig.png",
    texture: "deep-wave",
    lace_type: "frontal",
    length: 26,
    style: "long",
    in_stock: true,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: 'Kinky Curly HD Lace 20"',
    description: "Natural kinky curly texture with HD lace for invisible hairline. Full and voluminous.",
    price: 279,
    original_price: 359,
    rating: 4.8,
    review_count: 94,
    image_url: "/kinky-curly-wig.png",
    texture: "kinky",
    lace_type: "hd",
    length: 20,
    style: "medium",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: 'Straight Closure Wig 16"',
    description: "Sleek straight closure wig with 4x4 lace closure. Easy to install and maintain.",
    price: 229,
    original_price: 299,
    rating: 4.6,
    review_count: 112,
    image_url: "/straight-closure-wig.png",
    texture: "straight",
    lace_type: "closure",
    length: 16,
    style: "medium",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: 'Water Wave HD Lace 24"',
    description: "Beautiful water wave pattern with HD lace construction. Soft and natural movement.",
    price: 319,
    original_price: 419,
    rating: 4.8,
    review_count: 67,
    image_url: "/water-wave-wig.png",
    texture: "water-wave",
    lace_type: "hd",
    length: 24,
    style: "long",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: 'Pixie Cut Curly Wig 8"',
    description: "Short and sassy pixie cut with curly texture. Perfect for bold and confident looks.",
    price: 159,
    original_price: 219,
    rating: 4.7,
    review_count: 45,
    image_url: "/pixie-curly-wig.png",
    texture: "curly",
    lace_type: "hd",
    length: 8,
    style: "short",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: 'Loose Wave Transparent Lace 20"',
    description: "Gorgeous loose wave texture with transparent lace for seamless blending.",
    price: 289,
    original_price: 369,
    rating: 4.8,
    review_count: 82,
    image_url: "/loose-wave-wig.png",
    texture: "loose-wave",
    lace_type: "transparent",
    length: 20,
    style: "medium",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: 'Afro Kinky Coily Wig 18"',
    description: "Natural afro kinky coily texture for authentic look and feel.",
    price: 259,
    original_price: 339,
    rating: 4.6,
    review_count: 58,
    image_url: "/afro-kinky-coily-wig.png",
    texture: "afro-kinky",
    lace_type: "hd",
    length: 18,
    style: "medium",
    in_stock: true,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          setProducts(fallbackProducts)
          setUsingFallback(true)
          setError(null)
          return
        }

        const supabase = createClient()

        // If client creation failed, use fallback
        if (!supabase) {
          setProducts(fallbackProducts)
          setUsingFallback(true)
          setError(null)
          return
        }

        const { data, error: supabaseError } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false })

        if (supabaseError) {
          // Silently use fallback data - no console warnings
          setProducts(fallbackProducts)
          setUsingFallback(true)
          setError(null)
          return
        }

        if (data && data.length > 0) {
          setProducts(data)
          setUsingFallback(false)
          setError(null)
        } else {
          setProducts(fallbackProducts)
          setUsingFallback(true)
          setError(null)
        }
      } catch (err) {
        // Silently use fallback data - no console warnings
        setProducts(fallbackProducts)
        setUsingFallback(true)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error, usingFallback }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          const featured = fallbackProducts.filter((p) => p.featured).slice(0, 4)
          setProducts(featured)
          setUsingFallback(true)
          setError(null)
          return
        }

        const supabase = createClient()

        // If client creation failed, use fallback
        if (!supabase) {
          const featured = fallbackProducts.filter((p) => p.featured).slice(0, 4)
          setProducts(featured)
          setUsingFallback(true)
          setError(null)
          return
        }

        const { data, error: supabaseError } = await supabase
          .from("products")
          .select("*")
          .eq("featured", true)
          .order("created_at", { ascending: false })
          .limit(4)

        if (supabaseError) {
          // Silently use fallback data - no console warnings
          const featured = fallbackProducts.filter((p) => p.featured).slice(0, 4)
          setProducts(featured)
          setUsingFallback(true)
          setError(null)
          return
        }

        if (data && data.length > 0) {
          setProducts(data)
          setUsingFallback(false)
          setError(null)
        } else {
          const featured = fallbackProducts.filter((p) => p.featured).slice(0, 4)
          setProducts(featured)
          setUsingFallback(true)
          setError(null)
        }
      } catch (err) {
        // Silently use fallback data - no console warnings
        const featured = fallbackProducts.filter((p) => p.featured).slice(0, 4)
        setProducts(featured)
        setUsingFallback(true)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return { products, loading, error, usingFallback }
}
