import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  {
    name: 'Curly Wigs',
    image: '/curly-lace-front-wig.png',
    href: '/products?texture=curly'
  },
  {
    name: 'Straight Wigs',
    image: '/straight-lace-front-wig.png',
    href: '/products?texture=straight'
  },
  {
    name: 'Body Wave',
    image: '/body-wave-lace-front-wig.png',
    href: '/products?texture=body-wave'
  },
  {
    name: 'Deep Wave',
    image: '/deep-wave-lace-front-wig.png',
    href: '/products?texture=deep-wave'
  },
  {
    name: 'Bob Cuts',
    image: '/bob-cut-lace-front-wig.png',
    href: '/products?style=bob'
  },
  {
    name: 'HD Lace',
    image: '/hd-lace-front-wig.png',
    href: '/products?lace=hd'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Style
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect match from our curated collection of premium lace wigs
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <div 
                    className="aspect-square bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-white text-lg">
                      {category.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
