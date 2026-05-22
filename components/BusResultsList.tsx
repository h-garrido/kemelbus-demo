"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Bus, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { ServiceWithRoute } from '@/app/db/types';

interface BusResultsListProps {
  services: ServiceWithRoute[];
  origen: string;
  destino: string;
  fecha: string;
  originName: string;
  destinationName: string;
}

export default function BusResultsList({
  services,
  origen,
  destino,
  fecha,
  originName,
  destinationName,
}: BusResultsListProps) {
  const router = useRouter();

  const formatTime = (time: string) => {
    return time.substring(0, 5); // HH:MM
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSelectService = (serviceId: string) => {
    router.push(`/seleccionar-asiento?servicio=${serviceId}&origen=${origen}&destino=${destino}&fecha=${fecha}`);
  };

  return (
    <div className="page-white">
      {/* Header */}
      <section className="section-hero pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="back-link mb-8">
            <ArrowLeft size={18} /> Nueva búsqueda
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white italic mb-4">
            {originName} <span className="hero-accent">→</span> {destinationName}
          </h1>
          <p className="hero-subtitle text-lg capitalize">
            {fecha && formatDate(fecha)}
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        {services.length === 0 ? (
          <div className="no-results-box p-12 text-center">
            <Bus size={48} className="no-results-icon mx-auto mb-4" />
            <h3 className="no-results-title mb-2">
              No hay servicios disponibles
            </h3>
            <p className="text-gray-500">
              No encontramos buses disponibles para esta ruta y fecha.
              Intenta con otra fecha o ruta diferente.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-semibold mb-2">
              {services.length} {services.length === 1 ? 'servicio disponible' : 'servicios disponibles'}
            </p>

            {services.map((service) => (
              <div
                key={service.id}
                className="card-bus-result p-6 group cursor-pointer"
                onClick={() => handleSelectService(service.id)}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="badge-bus p-3">
                        <Bus size={24} />
                      </div>
                      <div>
                        <h3 className="route-region-title font-bold text-brand-dark">
                          {service.bus_type}
                        </h3>
                        {service.bus_number && (
                          <p className="text-sm text-gray-500">Bus {service.bus_number}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="icon-accent" />
                        <div>
                          <p className="font-bold text-xs text-gray-400 uppercase">Salida</p>
                          <p className="text-lg font-black text-brand-dark">
                            {formatTime(service.departure_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-gray-400" />
                        <div>
                          <p className="font-bold text-xs text-gray-400 uppercase">Llegada</p>
                          <p className="text-lg font-black text-gray-700">
                            {formatTime(service.arrival_time)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-blue-500" />
                        <div>
                          <p className="font-bold text-xs text-gray-400 uppercase">Duración</p>
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
                      <p className="text-3xl font-black text-brand-dark">
                        ${service.base_price.toLocaleString('es-CL')}
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 font-semibold">
                      {service.available_seats} asientos disponibles
                    </div>

                    <button
                      className="btn-primary px-6 py-3 flex items-center gap-2 group-hover:gap-3 cursor-pointer"
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
