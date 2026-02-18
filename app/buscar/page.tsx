"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAvailableServices, getCities } from '@/app/db/services';
import type { ServiceWithRoute } from '@/app/db/types';
import { ArrowLeft, Clock, Bus, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [services, setServices] = useState<ServiceWithRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originName, setOriginName] = useState('');
  const [destinationName, setDestinationName] = useState('');

  const origen = searchParams.get('origen');
  const destino = searchParams.get('destino');
  const fecha = searchParams.get('fecha');

  useEffect(() => {
    const loadServices = async () => {
      if (!origen || !destino || !fecha) {
        setIsLoading(false);
        return;
      }

      // Cargar nombres de ciudades
      const cities = await getCities();
      const originCity = cities.find(c => c.id === origen);
      const destCity = cities.find(c => c.id === destino);
      
      setOriginName(originCity?.name || '');
      setDestinationName(destCity?.name || '');

      // Cargar servicios
      const availableServices = await getAvailableServices(origen, destino, fecha);
      setServices(availableServices);
      setIsLoading(false);
    };

    loadServices();
  }, [origen, destino, fecha]);

  const formatTime = (time: string) => {
    return time.substring(0, 5); // HH:MM
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSelectService = (serviceId: string) => {
    // Navegar a la página de selección de asientos con el servicio
    router.push(`/seleccionar-asiento?servicio=${serviceId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-emerald-950 pt-32 pb-20 px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          <p className="mt-4 text-emerald-100/70">Buscando servicios disponibles...</p>
        </section>
      </div>
    );
  }

  if (!origen || !destino || !fecha) {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-emerald-950 pt-32 pb-20 px-6 text-center">
          <p className="text-emerald-100/70">Parámetros de búsqueda inválidos</p>
          <Link href="/" className="mt-4 inline-block text-emerald-400 hover:underline font-bold">
            Volver al inicio
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-emerald-950 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={18} /> Nueva búsqueda
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white italic mb-4">
            {originName} <span className="text-emerald-500">→</span> {destinationName}
          </h1>
          <p className="text-emerald-100/70 text-lg capitalize">
            {fecha && formatDate(fecha)}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">

      {services.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
          <Bus size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            No hay servicios disponibles
          </h3>
          <p className="text-gray-500">
            No encontramos buses disponibles para esta ruta y fecha. 
            Intenta con otra fecha o ruta diferente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            {services.length} {services.length === 1 ? 'servicio disponible' : 'servicios disponibles'}
          </p>
          
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border-2 border-emerald-100 rounded-3xl p-6 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer group"
              onClick={() => handleSelectService(service.id)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-emerald-600 text-white p-3 rounded-2xl">
                      <Bus size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-emerald-950">
                        {service.bus_type}
                      </h3>
                      {service.bus_number && (
                        <p className="text-sm text-gray-500">Bus {service.bus_number}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={16} className="text-emerald-600" />
                      <div>
                        <p className="font-bold">Salida</p>
                        <p className="text-lg font-black text-emerald-950">
                          {formatTime(service.departure_time)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={16} className="text-gray-400" />
                      <div>
                        <p className="font-bold">Llegada</p>
                        <p className="text-lg font-black text-gray-700">
                          {formatTime(service.arrival_time)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-blue-500" />
                      <div>
                        <p className="font-bold">Duración</p>
                        <p className="text-lg font-black text-gray-700">
                          {service.route.duration_hours}h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 min-w-[180px]">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase font-bold">Desde</p>
                    <p className="text-3xl font-black text-emerald-950">
                      ${service.base_price.toLocaleString('es-CL')}
                    </p>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {service.available_seats} asientos disponibles
                  </div>

                  <button 
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 group-hover:gap-3"
                  >
                    Seleccionar Asientos
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </section>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen">
        <section className="bg-emerald-950 pt-32 pb-20 px-6 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
        </section>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
