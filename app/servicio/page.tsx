import { Armchair, Luggage, Truck, Wifi, BatteryCharging, Coffee, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ServiciosPage() {
  const amenities = [
    { icon: <Wifi size={24} />, title: "WiFi a Bordo", desc: "Conexión gratuita en nuestras rutas principales." },
    { icon: <BatteryCharging size={24} />, title: "Cargadores USB", desc: "Mantén tus dispositivos con carga durante todo el viaje." },
    { icon: <Coffee size={24} />, title: "Snack & Café", desc: "Servicio de cortesía en trayectos de larga distancia." },
    { icon: <ShieldCheck size={24} />, title: "Seguridad GPS", desc: "Monitoreo en tiempo real y conductores certificados." },
  ];

  return (
    <div className="bg-white">
      {/* Hero de Servicios */}
      <section className="bg-emerald-950 pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 italic uppercase tracking-tighter">
          Nuestros <span className="text-emerald-500">Servicios</span>
        </h1>
        <p className="text-emerald-100/70 max-w-2xl mx-auto text-lg font-medium">
          En KemelBus no solo vendemos pasajes, entregamos una experiencia de viaje superior con tecnología de punta y la calidez del sur.
        </p>
      </section>

      {/* Clases de Asiento (El Corazón del Bus) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-black text-emerald-950 uppercase italic">Confort en cada nivel</h2>
            
            <div className="bg-emerald-50 p-8 rounded-[2rem] border-l-8 border-emerald-600 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Armchair className="text-emerald-600" size={32} />
                <h3 className="text-2xl font-black text-emerald-900">Salón Cama Premium</h3>
              </div>
              <p className="text-emerald-900/70 mb-4 font-medium">
                Ubicado en el primer piso. Asientos de cuero con inclinación de 180°, extra anchos y con separadores de privacidad para un descanso total.
              </p>
              <ul className="text-sm font-bold text-emerald-700 space-y-1">
                <li>• Máximo espacio entre filas</li>
                <li>• Atención personalizada</li>
                <li>• Mantas y almohadas sanitizadas</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-[2rem] border-l-8 border-gray-400 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <Armchair className="text-gray-600" size={32} />
                <h3 className="text-2xl font-black text-gray-900">Semi Cama Panorámico</h3>
              </div>
              <p className="text-gray-600 mb-4 font-medium">
                Ubicado en el segundo piso. Disfruta de la mejor vista de la ruta con asientos reclinables de 150° y climatización controlada.
              </p>
              <ul className="text-sm font-bold text-gray-500 space-y-1">
                <li>• Vista panorámica frontal</li>
                <li>• Reposapiés ajustable</li>
                <li>• Excelente relación precio-calidad</li>
              </ul>
            </div>
          </div>

          <div className="relative h-[500px] bg-emerald-100 rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000" 
              alt="Interior KemelBus" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Amenidades Grilla */}
      <section className="py-20 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {amenities.map((item, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-emerald-100/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kemel Cargo */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-emerald-50 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 border border-emerald-100 shadow-sm">
          <div className="md:w-1/3">
            <div className="bg-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl mb-6">
              <Truck size={40} />
            </div>
            <h2 className="text-4xl font-black text-emerald-950 italic uppercase tracking-tighter">Kemel<span className="text-emerald-600">Cargo</span></h2>
          </div>
          <div className="md:w-2/3 space-y-6">
            <h3 className="text-2xl font-bold text-emerald-900">Enviamos tus encomiendas a todo el sur</h3>
            <p className="text-emerald-900/70 text-lg leading-relaxed font-medium">
              Aprovechamos la frecuencia de nuestras rutas para llevar tus paquetes de forma rápida y segura. Contamos con seguimiento en línea y entrega en terminal o domicilio.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white px-4 py-2 rounded-full text-xs font-black text-emerald-700 shadow-sm">ENVÍO DE DOCUMENTOS</span>
              <span className="bg-white px-4 py-2 rounded-full text-xs font-black text-emerald-700 shadow-sm">CARGA SOBREDIMENSIONADA</span>
              <span className="bg-white px-4 py-2 rounded-full text-xs font-black text-emerald-700 shadow-sm">CONVENIOS EMPRESA</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pb-24 text-center px-6">
        <div className="bg-emerald-600 max-w-4xl mx-auto p-12 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-900/20">
          <h2 className="text-3xl md:text-4xl font-black mb-6 italic uppercase">¿Listo para tu próximo viaje?</h2>
          <Link href="/" className="inline-block bg-emerald-950 text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform">
            RESERVAR AHORA
          </Link>
        </div>
      </section>
    </div>
  );
}