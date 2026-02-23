"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import img1 from '@/app/assets/img/img1.jpg';
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
    <section className="section-hero relative lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Fondo con textura */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image 
          src={img1}
          alt="Rutas de Chile" 
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center md:text-left mb-12">
          <h1 className="hero-title text-4xl md:text-7xl font-black leading-tight mb-6 animate-[fadeInUp_0.6s_ease-out]">
            Viaja por la Patagonia con <br />
            <span className="hero-accent underline">Seguridad y Confort</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-xl max-w-2xl animate-[fadeInUp_0.8s_ease-out]">
            Reserva tus pasajes en línea para viajar entre Puerto Montt, Hornopirén y Chaitén.
            Buses cómodos y puntuales en la Patagonia Norte de Chile.
          </p>
        </div>

        {/* Buscador de Pasajes */}
        <div className="search-box p-4 md:p-8 animate-[fadeInUp_1s_ease-out]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Origen */}
            <div className="space-y-2">
              <label className="search-label flex items-center gap-2">
                <MapPin size={14} /> Origen
              </label>
              <select 
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                disabled={isLoading}
                className="input-base"
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
              <label className="search-label flex items-center gap-2">
                <MapPin size={14} /> Destino
              </label>
              <select 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                disabled={!selectedOrigin || destinationCities.length === 0}
                className="input-base"
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
              <label className="search-label flex items-center gap-2">
                <Calendar size={14} /> Fecha de Salida
              </label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                className="input-base"
              />
            </div>

            {/* Botón Buscar */}
            <div>
              <button 
                onClick={handleSearch}
                disabled={!selectedOrigin || !selectedDestination || !selectedDate}
                className="btn-search flex items-center justify-center gap-2"
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