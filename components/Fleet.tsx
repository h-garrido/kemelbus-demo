'use client';

import Image from 'next/image';
import { Monitor, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import img4 from '@/app/assets/img/img4.jpg';
import img5 from '@/app/assets/img/img5.jpg';

const fleetDetails = [
  {
    type: "Bus Semi Cama",
    seats: "Semi Cama",
    description: "Carrocería Busscar Vissta Buss HI sobre chasis Mercedes-Benz. Unidad climatizada que opera en la Región de Los Lagos, fotografiada frente a la cordillera patagónica con sus característicos cumbres nevadas.",
    amenities: ["Asientos reclinables", "Climatización", "Baño a bordo"],
    image: img4,
    imageAlt: "Bus KemelBus Busscar Vissta Buss HI con cumbres nevadas al fondo, Región de Los Lagos",
  },
  {
    type: "Bus Semi Cama",
    seats: "Semi Cama",
    description: "Carrocería Mascarello Roma sobre chasis Mercedes-Benz. Unidad con aire acondicionado, sistema de entretenimiento a bordo (música y video) y baño, operando en las rutas de la Patagonia Norte.",
    amenities: ["GPS en tiempo real", "WiFi a bordo", "Cargadores USB"],
    image: img5,
    imageAlt: "Bus KemelBus Mascarello Roma en librea turquesa y verde, estacionado en patio de operaciones",
  }
];

const Fleet = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  return (
    <section id="flota" className="page-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-label mb-4">Nuestra Flota</h2>
          <p className="section-title md:text-5xl">Flota de Última Generación</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {fleetDetails.map((item, idx) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div
                key={idx}
                ref={ref}
                className={`card-fleet p-8 md:p-12 group ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-brand-dark text-3xl font-black">{item.type}</h3>
                  <p className="icon-accent font-bold">{item.seats}</p>
                </div>
                <div className="contact-icon-wrapper p-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Monitor size={32} />
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">{item.description}</p>
              
              <ul className="grid grid-cols-1 gap-4 mb-8">
                {item.amenities.map((feature, fIdx) => (
                  <li key={fIdx} className="fleet-amenity">
                    <Check size={18} className="icon-accent" /> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
