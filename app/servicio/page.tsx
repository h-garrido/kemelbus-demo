import { Armchair, MapPin, Wifi, BatteryCharging, ShieldCheck, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import img3 from '@/app/assets/img/img3.jpg';

export default function ServiciosPage() {
  const amenities = [
    { icon: <Clock size={24} />, title: "Puntualidad", desc: "Salidas diarias a las 07:30 y 13:00 horas desde cada terminal." },
    { icon: <Wifi size={24} />, title: "WiFi a Bordo", desc: "Conexión disponible durante el recorrido." },
    { icon: <BatteryCharging size={24} />, title: "Cargadores USB", desc: "Mantente conectado durante todo el viaje." },
    { icon: <ShieldCheck size={24} />, title: "Seguridad GPS", desc: "Monitoreo en tiempo real y conductores certificados." },
  ];

  return (
    <div className="page-white">
      {/* Hero de Servicios */}
      <section className="section-hero pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 italic uppercase tracking-tighter">
          Nuestros <span className="hero-accent">Servicios</span>
        </h1>
        <p className="hero-subtitle max-w-2xl mx-auto text-lg font-medium">
          Viaja cómodo y seguro entre Puerto Montt, Hornopirén y Chaitén con KemelBus. Servicio Semi Cama con tarifas especiales para estudiantes, adultos mayores y residentes.
        </p>
      </section>

      {/* Clases de Asiento (El Corazón del Bus) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-brand-dark text-3xl font-black uppercase italic">Confort en cada viaje</h2>
            
            <div className="seat-class-semicama p-8">
              <div className="flex items-center gap-4 mb-4">
                <Armchair className="text-gray-600" size={32} />
                <h3 className="text-2xl font-black text-gray-900">Semi Cama</h3>
              </div>
              <p className="text-gray-600 mb-4 font-medium">
                Asientos reclinables cómodos con climatización controlada, ideal para disfrutar del paisaje patagónico en los recorridos entre Puerto Montt, Hornopirén y Chaitén.
              </p>
              <ul className="text-sm font-bold text-gray-500 space-y-1">
                <li>• Asientos reclinables</li>
                <li>• Climatización a bordo</li>
                <li>• Baño a bordo</li>
              </ul>
            </div>

            <div className="seat-class-premium p-8">
              <div className="flex items-center gap-4 mb-4">
                <Armchair className="icon-accent" size={32} />
                <h3 className="text-brand-dark text-2xl font-black">Tarifas por tipo de pasajero</h3>
              </div>
              <ul className="text-sm font-bold text-brand-mid space-y-2">
                <li>• <strong>Normal:</strong> tarifa estándar para todos los pasajeros</li>
                <li>• <strong>Estudiante:</strong> tarifa preferencial con credencial vigente</li>
                <li>• <strong>Adulto Mayor:</strong> tarifa reducida (ruta Puerto Montt – Hornopirén)</li>
                <li>• <strong>Residente:</strong> tarifa local para habitantes de Hornopirén y Chaitén</li>
              </ul>
            </div>
          </div>

          <div className="page-light relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src={img3}
              alt="Bus KemelBus con destino Hornopirén" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Amenidades Grilla */}
      <section className="section-dark-bg py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {amenities.map((item, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="amenity-icon">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="hero-subtitle text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oficinas de Venta */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="cargo-section p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="cargo-icon w-20 h-20 mb-6 flex items-center justify-center">
              <MapPin size={40} />
            </div>
            <h2 className="section-title italic uppercase tracking-tighter">Puntos de <span className="icon-accent">Venta</span></h2>
          </div>
          <div className="md:w-2/3 space-y-6">
            <h3 className="text-brand-dark text-2xl font-bold">Compra tu pasaje en nuestras oficinas</h3>
            <p className="text-brand-muted text-lg leading-relaxed font-medium">
              Además de la compra en línea, puedes adquirir tus pasajes directamente en nuestros puntos de atención.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="tag-pill px-4 py-2">PUERTO MONTT — TERMINAL MUNICIPAL, OF. N°40</span>
              <span className="tag-pill px-4 py-2">HORNOPIRÉN — TERMINAL MUNICIPAL, OF. N°03</span>
              <span className="tag-pill px-4 py-2">CHAITÉN — GREEN PATAGONIA TRAVEL (FRENTE COPEC)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="pb-24 text-center px-6">
          <div className="cta-green-block max-w-4xl mx-auto p-12">
            <h2 className="text-3xl md:text-4xl font-black mb-6 italic uppercase">¿Listo para tu próximo viaje?</h2>
            <Link href="/" className="btn-cta-dark inline-block px-12 py-5 text-lg">
            RESERVAR AHORA
          </Link>
        </div>
      </section>
    </div>
  );
}