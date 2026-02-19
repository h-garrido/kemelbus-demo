import { ShieldCheck, Wind, Gauge, Zap, Cog, Eye } from 'lucide-react';
import Link from 'next/link';

export default function FlotaPage() {
  const specs = [
    { icon: <ShieldCheck size={20} />, label: "Seguridad", value: "Frenos ABS + EBS" },
    { icon: <Gauge size={20} />, label: "Control", value: "Limitador de Velocidad" },
    { icon: <Zap size={20} />, label: "Tecnología", value: "Motor Euro 6 (Eco)" },
    { icon: <Cog size={20} />, label: "Estabilidad", value: "Suspensión Neumática" },
  ];

  return (
    <div className="page-white min-h-screen">
      {/* Hero Flota */}
      <section className="section-hero pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
              Potencia y <span className="hero-accent">Seguridad</span>
            </h1>
            <p className="hero-subtitle text-lg leading-relaxed">
              En KemelBus operamos con una flota de última generación. Nuestros buses de dos pisos cuentan con los más altos estándares de seguridad internacional para garantizar un viaje tranquilo por las rutas del sur de Chile.
            </p>
          </div>
          <div className="md:w-1/2">
             {/* Imagen de un bus moderno */}
             <div className="bus-hero-image relative">
               <img 
                 src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1000" 
                 alt="Bus KemelBus" 
                 className="w-full h-full object-cover"
               />
               <div className="badge-bus absolute bottom-4 right-4 px-4 py-2 text-xs font-black uppercase">
                 Modelo 2024
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Especificaciones Técnicas */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-label mb-2">Ficha Técnica</h2>
          <p className="section-title italic uppercase">Equipamiento de Clase Mundial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, i) => (
            <div key={i} className="specs-card p-8">
              <div className="specs-icon mb-4">{spec.icon}</div>
              <p className="specs-label mb-1">{spec.label}</p>
              <p className="specs-value">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seguridad Avanzada */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-brand-dark text-3xl font-black italic uppercase">Tecnología Preventiva</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 icon-accent font-black">
                    <Eye size={24} /> <span>Sensores de Carril</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Sistemas de alerta que notifican al conductor ante cualquier desvío involuntario, aumentando la seguridad en rutas nocturnas.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 icon-accent font-black">
                    <Wind size={24} /> <span>Purificación de Aire</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nuestros buses cuentan con filtros HEPA y sistemas de renovación de aire constante para un ambiente saludable.
                  </p>
                </div>
              </div>
            </div>

            <div className="commitment-box p-10 space-y-6">
              <h4 className="commitment-title">Compromiso Kemel</h4>
              <p className="hero-subtitle text-sm leading-relaxed">
                Cada bus es sometido a un riguroso proceso de mantenimiento preventivo cada 10,000 kilómetros en nuestros propios talleres especializados.
              </p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-4xl font-black italic">100%</p>
                <p className="commitment-stat-label">Disponibilidad de GPS en Línea</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center px-6">
        <h2 className="text-brand-dark text-3xl font-black mb-8 uppercase italic">Súbete a la flota más moderna del sur</h2>
        <Link href="/" className="btn-cta-green px-12 py-5 text-lg shadow-xl">
          VER HORARIOS Y SALIDAS
        </Link>
      </section>
    </div>
  );
}