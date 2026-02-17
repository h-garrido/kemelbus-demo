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
    <div className="bg-white min-h-screen">
      {/* Hero Flota */}
      <section className="bg-emerald-950 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
              Potencia y <span className="text-emerald-500">Seguridad</span>
            </h1>
            <p className="text-emerald-100/70 text-lg leading-relaxed">
              En KemelBus operamos con una flota de última generación. Nuestros buses de dos pisos cuentan con los más altos estándares de seguridad internacional para garantizar un viaje tranquilo por las rutas del sur de Chile.
            </p>
          </div>
          <div className="md:w-1/2">
             {/* Imagen de un bus moderno */}
             <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-emerald-900/50">
               <img 
                 src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1000" 
                 alt="Bus KemelBus" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-black uppercase">
                 Modelo 2024
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Especificaciones Técnicas */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-2">Ficha Técnica</h2>
          <p className="text-4xl font-black text-emerald-950 italic uppercase">Equipamiento de Clase Mundial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-emerald-200 transition-colors">
              <div className="text-emerald-600 mb-4">{spec.icon}</div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{spec.label}</p>
              <p className="text-xl font-black text-emerald-950">{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seguridad Avanzada */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-3xl font-black text-emerald-950 italic uppercase">Tecnología Preventiva</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600 font-black">
                    <Eye size={24} /> <span>Sensores de Carril</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Sistemas de alerta que notifican al conductor ante cualquier desvío involuntario, aumentando la seguridad en rutas nocturnas.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-600 font-black">
                    <Wind size={24} /> <span>Purificación de Aire</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nuestros buses cuentan con filtros HEPA y sistemas de renovación de aire constante para un ambiente saludable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-950 p-10 rounded-[3rem] text-white space-y-6">
              <h4 className="text-2xl font-black italic uppercase text-emerald-500">Compromiso Kemel</h4>
              <p className="text-sm text-emerald-100/60 leading-relaxed">
                Cada bus es sometido a un riguroso proceso de mantenimiento preventivo cada 10,000 kilómetros en nuestros propios talleres especializados.
              </p>
              <div className="pt-6 border-t border-white/10">
                <p className="text-4xl font-black italic">100%</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">Disponibilidad de GPS en Línea</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-black text-emerald-950 mb-8 uppercase italic">Súbete a la flota más moderna del sur</h2>
        <Link href="/" className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
          VER HORARIOS Y SALIDAS
        </Link>
      </section>
    </div>
  );
}