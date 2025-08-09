import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Marie Johnson',
    rating: 5,
    text: 'The HD lace is absolutely invisible! I get compliments everywhere I go. The quality is unmatched.',
    image: '/placeholder.svg?height=60&width=60',
    product: 'HD Lace Curly Wig 20"'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    rating: 5,
    text: 'Fast shipping, amazing customer service, and the wig exceeded my expectations. Will definitely order again!',
    image: '/placeholder.svg?height=60&width=60',
    product: 'Transparent Lace Straight 18"'
  },
  {
    id: 3,
    name: 'Jessica Brown',
    rating: 5,
    text: 'Perfect for my lifestyle. The bob cut is exactly what I wanted and the lace melts beautifully.',
    image: '/placeholder.svg?height=60&width=60',
    product: 'Bob Cut HD Lace 14"'
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their hair needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-rose-600 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${testimonial.image}')` }}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.product}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
