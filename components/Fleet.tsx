'use client';

import { Users, Wind, Monitor, Coffee, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const fleetDetails = [
  {
    type: "Premium Suite",
    seats: "Salón Cama 180°",
    description: "Máximo descanso en el primer piso. Asientos de cuero totalmente reclinables.",
    amenities: ["Cargador USB", "Manta y Almohada", "Cenas abordo"],
  },
  {
    type: "Ejecutivo",
    seats: "Semi Cama",
    description: "Ubicados en el segundo piso con vista panorámica y climatización controlada.",
    amenities: ["WiFi Gratis", "Reposapiés", "Baño Químico"],
  }
];

const Fleet = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  return (
    <section id="flota" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-sm mb-4">Nuestra Flota</h2>
          <p className="text-4xl md:text-5xl font-black text-emerald-950">Tecnología de Doble Piso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {fleetDetails.map((item, idx) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div
                key={idx}
                ref={ref}
                className={`bg-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-300 transition-all duration-500 cursor-pointer group ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-emerald-950">{item.type}</h3>
                  <p className="text-emerald-600 font-bold">{item.seats}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-emerald-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {idx === 0 ? <Coffee size={32} /> : <Monitor size={32} />}
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">{item.description}</p>
              
              <ul className="grid grid-cols-1 gap-4 mb-8">
                {item.amenities.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-emerald-900 font-medium bg-white/50 p-3 rounded-lg hover:bg-white hover:shadow-md hover:translate-x-2 transition-all duration-300">
                    <Check size={18} className="text-emerald-500" /> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="h-48 bg-emerald-200 rounded-2xl flex items-center justify-center text-emerald-800 italic font-medium overflow-hidden group-hover:bg-emerald-300 transition-colors duration-300">
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
