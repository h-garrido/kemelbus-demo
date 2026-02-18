"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, MapPin, Calendar } from 'lucide-react';
import { getOriginCities, getDestinationCities } from '@/app/db/services';
import type { City } from '@/app/db/types';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar ciudades de origen al montar el componente
  useEffect(() => {
    const loadOriginCities = async () => {
      const cities = await getOriginCities();
      setOriginCities(cities);
      setIsLoading(false);
    };
    loadOriginCities();
  }, []);

  // Cargar ciudades de destino cuando cambia el origen
  useEffect(() => {
    if (selectedOrigin) {
      const loadDestinationCities = async () => {
        const cities = await getDestinationCities(selectedOrigin);
        setDestinationCities(cities);
        setSelectedDestination(''); // Reset destination
      };
      loadDestinationCities();
    }
  }, [selectedOrigin]);

  // Establecer fecha mínima como hoy
  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    if (!selectedOrigin || !selectedDestination || !selectedDate) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Navegar a la página de búsqueda con parámetros
    router.push(`/buscar?origen=${selectedOrigin}&destino=${selectedDestination}&fecha=${selectedDate}`);
  };

  return (
    <section className="relative bg-emerald-950 pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Fondo con textura */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2000" 
          alt="Rutas de Chile" 
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left mb-12">
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-6 animate-[fadeInUp_0.6s_ease-out]">
            Viaja por Chile con <br />
            <span className="text-emerald-500 underline decoration-emerald-800">Seguridad y Confort</span>
          </h1>
          <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl animate-[fadeInUp_0.8s_ease-out]">
            Reserva tus pasajes en línea para las principales rutas del país. 
            Buses de última generación con servicio Salón Cama.
          </p>
        </div>

        {/* Buscador de Pasajes */}
        <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl border-b-8 border-emerald-600 animate-[fadeInUp_1s_ease-out]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Origen */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <MapPin size={14} /> Origen
              </label>
              <select 
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                disabled={isLoading}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all disabled:opacity-50"
              >
                <option value="">Seleccione origen</option>
                {originCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Destino */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <MapPin size={14} /> Destino
              </label>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                disabled={!selectedOrigin || destinationCities.length === 0}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all disabled:opacity-50"
              >
                <option value="">Seleccione destino</option>
                {destinationCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-900 uppercase flex items-center gap-2">
                <Calendar size={14} /> Fecha de Salida
              </label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Botón Buscar */}
            <div>
              <button 
                onClick={handleSearch}
                disabled={!selectedOrigin || !selectedDestination || !selectedDate}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Search size={20} /> BUSCAR PASAJES
              </button>
            </div>

          </div>        
        </div>
      </div>
    </section>
  );
};

export default Hero;