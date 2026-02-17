'use client';

import { Star, Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const reviews = [
  {
    name: "Camila Arancibia",
    route: "Ruta: Santiago - Temuco",
    text: "Excelente servicio. El bus salió puntual y el asiento Salón Cama es realmente cómodo para viajar de noche. Los auxiliares muy amables.",
    rating: 5
  },
  {
    name: "Ricardo Lagos M.",
    route: "Ruta: Concepción - Puerto Montt",
    text: "Me sorprendió la limpieza del bus y que el WiFi funcionara todo el trayecto. Ideal para quienes necesitamos trabajar durante el viaje.",
    rating: 5
  },
  {
    name: "Elena Fuenzalida",
    route: "Ruta: Antofagasta - La Serena",
    text: "Viajé con mi mascota de asistencia y no tuve ningún problema. Un servicio muy profesional y seguro. Totalmente recomendado.",
    rating: 4
  }
];

const Testimonials = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3">Experiencias Reales</h2>
          <p className="text-4xl font-black text-emerald-950">Lo que dicen nuestros pasajeros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div 
                key={index} 
                ref={ref}
                className={`bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 relative group hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 hover:border-emerald-300 transition-all duration-500 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="absolute top-6 right-8 text-emerald-200 group-hover:text-emerald-500 group-hover:scale-110 transition-all duration-300" size={40} />
              
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-emerald-500 text-emerald-500 group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>

                <p className="text-emerald-900/80 italic mb-8 leading-relaxed">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center font-bold text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950">{review.name}</h4>
                    <p className="text-xs text-emerald-600 font-medium">{review.route}</p>
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

