"use client";
import { Search, MapPin, Calendar, Ticket, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-emerald-950 pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Fondo con textura */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000" 
          alt="Rutas de Chile" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6">
            Viaja por Chile con <br />
            <span className="text-emerald-500 underline decoration-emerald-800">Seguridad y Confort</span>
          </h1>
          <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl">
            Reserva tus pasajes en línea para las principales rutas del país. 
            Buses de última generación con servicio Salón Cama.
          </p>
        </div>

        {/* Buscador de Pasajes */}
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl border-b-8 border-emerald-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Origen */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <MapPin size={14} /> Origen
              </label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                <option>Santiago (Terminal Sur)</option>
                <option>Concepción</option>
                <option>Puerto Montt</option>
                <option>Temuco</option>
              </select>
            </div>

            {/* Destino */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <MapPin size={14} /> Destino
              </label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                <option>Seleccione destino</option>
                <option>Pucón</option>
                <option>Valdivia</option>
                <option>Castro</option>
                <option>Osorno</option>
              </select>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <Calendar size={14} /> Fecha de Salida
              </label>
              <input 
                type="date" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Botón Buscar */}
            <div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg">
                <Search size={20} /> BUSCAR PASAJES
              </button>
            </div>

          </div>

          {/* Opciones rápidas debajo del buscador */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1"><Ticket size={14} className="text-emerald-600" /> Revisa tu pasaje</span>
            <span className="flex items-center gap-1"><ChevronRight size={14} className="text-emerald-600" /> Horarios de Salida</span>
            <span className="flex items-center gap-1"><ChevronRight size={14} className="text-emerald-600" /> Centros de Ayuda</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;