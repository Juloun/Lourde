import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/beautiful-black-woman-curly-wig.png')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm">Trusted by 10,000+ customers</span>
        </div>
        
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Premium Lace Wigs
          <br />
          <span className="text-rose-300">Redefined</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 font-light">
          Cheve ki pote fyète, bèlte, ak konfyans
        </p>
        
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Discover our collection of HD lace, transparent lace, and premium quality wigs 
          in every texture and length from 10" to 30"+
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 text-lg">
              Shop Collection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/consultation">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-4 text-lg">
              Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
