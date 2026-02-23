'use client';

import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const reviews = [
  {
    name: "Camila Arancibia",
    route: "Ruta: Puerto Montt - Chaitén",
    text: "Excelente servicio. El bus salió puntual y los asientos Semi Cama son muy cómodos para el trayecto por la Carretera Austral. Los conductores muy amables y atentos.",
    rating: 5
  },
  {
    name: "Ricardo Lagos M.",
    route: "Ruta: Hornopirén - Puerto Montt",
    text: "Me sorprendió la puntualidad y la limpieza del bus en cada tramo. Ideal para quienes viajamos seguido por la zona. Totalmente recomendado.",
    rating: 5
  },
  {
    name: "Elena Fuenzalida",
    route: "Ruta: Puerto Montt - Hornopirén",
    text: "Viajé con mi mascota de asistencia y no tuve ningún problema. Un servicio muy profesional y seguro para recorrer la Patagonia.",
    rating: 4
  }
];

const Testimonials = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  return (
    <section className="page-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-label mb-3">Experiencias Reales</h2>
          <p className="section-title">Lo que dicen nuestros pasajeros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div 
                key={index} 
                ref={ref}
                className={`card-testimonial p-8 relative group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="quote-icon absolute top-6 right-8 group-hover:scale-110 transition-all duration-300" size={40} />
              
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                <p className="review-text mb-8">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="avatar group-hover:scale-110 transition-all duration-300">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="review-author-name">{review.name}</h4>
                    <p className="review-author-route">{review.route}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

