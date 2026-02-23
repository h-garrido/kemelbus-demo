'use client';

import { MapPin, ArrowRight, Mountain, Ship, Waves } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const destinations = [
  {
    city: "Puerto Montt",
    description: "Terminal principal de KemelBus. Hub de conexión hacia la Patagonia Norte.",
    routes: ["Puerto Montt → Hornopirén", "Puerto Montt → Chaitén"],
    icon: <Waves className="route-icon-central" />,
    color: "card-route-central"
  },
  {
    city: "Hornopirén",
    description: "Puerta de entrada a la Carretera Austral. Rodeada de volcanes y fiordos.",
    routes: ["Hornopirén → Puerto Montt", "Hornopirén → Chaitén"],
    icon: <Mountain className="route-icon-sur" />,
    color: "card-route-sur"
  },
  {
    city: "Chaitén",
    description: "Capital de la provincia de Palena, en el corazón de la Patagonia chilena.",
    routes: ["Chaitén → Puerto Montt", "Chaitén → Hornopirén"],
    icon: <Ship className="route-icon-norte" />,
    color: "card-route-norte"
  }
];

const Routes = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  return (
    <section id="rutas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div
          ref={titleRef}
          className={`flex flex-col md:flex-row justify-between items-center mb-16 gap-4 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center md:text-left">
            <h2 className="section-label mb-2">Conectando la Patagonia</h2>
            <p className="section-title">Nuestras Ciudades y Rutas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div 
                key={index}
                ref={ref}
                className={`card-route p-8 ${dest.color} ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  {dest.icon}
                </div>
                <h3 className="route-region-title">{dest.city}</h3>
              </div>

              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{dest.description}</p>

              <ul className="space-y-4">
                {dest.routes.map((route, rIndex) => (
                  <li key={rIndex} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3 text-brand-dark font-medium">
                      <MapPin size={16} className="icon-accent" />
                      {route}
                    </div>
                    <ArrowRight size={14} className="route-arrow" />
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 route-divider">
                <p className="route-footer-text">Salidas diarias desde Terminal KemelBus</p>
              </div>
            </div>
            );
          })}
        </div>

        {/* Banner de conectividad regional */}
        <div className="banner-connectivity mt-16 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-2">¿Viajas por la Patagonia?</h4>
              <p className="hero-subtitle">Salidas diarias conectando Puerto Montt, Hornopirén y Chaitén.</p>
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="text-center px-6 stats-divider">
              <p className="stat-number">3</p>
              <p className="stat-label">Terminales</p>
            </div>
            <div className="text-center px-6">
              <p className="stat-number">3</p>
              <p className="stat-label">Rutas Activas</p>
            </div>
          </div>
          {/* Decoración abstracta */}
          <div className="hero-decoration absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Routes;
