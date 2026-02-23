'use client';

import { Monitor, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const fleetDetails = [
  {
    type: "Bus Semi Cama",
    seats: "Semi Cama",
    description: "Asientos reclinables y cómodos, ideales para los recorridos entre Puerto Montt, Hornopirén y Chaitén por la Carretera Austral.",
    amenities: ["Asientos reclinables", "Climatización", "Baño a bordo"],
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
              
              <div className="fleet-image-placeholder h-48 flex items-center justify-center italic font-medium overflow-hidden">
                {/* Aquí pondrías una foto real del interior del bus */}
                [ Foto Interior {item.type} ]
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
