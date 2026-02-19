"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getServiceDetails, getSeats, getRouteById } from "@/app/db/services";
import type { BusService, Seat, RouteWithCities } from "@/app/db/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import { Armchair, CheckCircle, ArrowLeft, Bus } from "lucide-react";
import Link from "next/link";

function SeatSelectionContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();
  
  const serviceId = searchParams.get('servicio');
  
  const [service, setService] = useState<BusService | null>(null);
  const [route, setRoute] = useState<RouteWithCities | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [floor, setFloor] = useState<number>(1);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!serviceId) {
        setIsLoading(false);
        return;
      }

      // Cargar detalles del servicio
      const serviceData = await getServiceDetails(serviceId);
      if (!serviceData) {
        setIsLoading(false);
        return;
      }
      setService(serviceData);

      // Cargar ruta
      const routeData = await getRouteById(serviceData.route_id);
      if (routeData) {
        setRoute(routeData);
      }

      // Cargar asientos
      const seatsData = await getSeats(serviceId);
      setSeats(seatsData);
      setIsLoading(false);
    };

    loadData();
  }, [serviceId]);

  const firstFloorSeats = seats.filter(s => s.floor === 1);
  const secondFloorSeats = seats.filter(s => s.floor === 2);
  const seatsToShow = floor === 1 ? firstFloorSeats : secondFloorSeats;

  const handleSelect = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeat(seat);
    }
  };

  const handleConfirm = () => {
    if (selectedSeat && service && route) {
      addToCart({
        id: crypto.randomUUID(),
        service_id: service.id,
        seat_id: selectedSeat.id,
        origin: route.origin_city,
        destination: route.destination_city,
        date: service.departure_date,
        time: service.departure_time.substring(0, 5),
        seat: `${selectedSeat.type} - Piso ${selectedSeat.floor} - N°${selectedSeat.seat_number}`,
        seatNumber: selectedSeat.seat_number,
        price: selectedSeat.price,
      });
      
      showToast({
        message: `Asiento ${selectedSeat.seat_number} agregado al carrito`,
        type: 'success',
        duration: 3000
      });
      
      setSelectedSeat(null);
    }
  };

  if (isLoading) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <div className="loading-spinner animate-spin h-12 w-12"></div>
          <p className="hero-subtitle mt-4">Cargando mapa de asientos...</p>
        </section>
      </div>
    );
  }

  if (!serviceId || !service || !route) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <p className="hero-subtitle mb-4">Servicio no encontrado</p>
          <Link href="/" className="back-link">
            Volver al inicio
          </Link>
        </section>
      </div>
    );
  }

  const formatTime = (time: string) => time.substring(0, 5);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CL', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="page-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}

      {/* Header */}
      <section className="section-hero pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/buscar" className="back-link mb-8">
            <ArrowLeft size={18} /> Ver otros servicios
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="badge-bus p-4">
                <Bus size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-1">
                  {route.origin_city} → {route.destination_city}
                </h1>
                <p className="hero-subtitle capitalize">
                  {formatDate(service.departure_date)}
                </p>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-brand-light uppercase text-xs font-bold mb-1">Salida</p>
                <p className="text-2xl font-black text-white">{formatTime(service.departure_time)}</p>
              </div>
              <div>
                <p className="text-brand-light uppercase text-xs font-bold mb-1">Llegada</p>
                <p className="text-2xl font-black text-white">{formatTime(service.arrival_time)}</p>
              </div>
              <div>
                <p className="text-brand-light uppercase text-xs font-bold mb-1">Bus</p>
                <p className="text-xl font-black text-white">{service.bus_type}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        {/* Selección de Asientos */}
        <div className="bus-frame">
          <div className="bus-floor-nav">
            <button
              onClick={() => setFloor(1)}
              className={`flex-1 py-6 font-bold transition-all duration-300 ${
                floor === 1 
                  ? "floor-btn-active" 
                  : "floor-btn-inactive"
              }`}
            >
              Piso 1 ({firstFloorSeats.length} asientos)
            </button>
            <button
              onClick={() => setFloor(2)}
              className={`flex-1 py-6 font-bold transition-all duration-300 ${
                floor === 2 
                  ? "floor-btn-active" 
                  : "floor-btn-inactive"
              }`}
            >
              Piso 2 ({secondFloorSeats.length} asientos)
            </button>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mapa de Asientos */}
            <div className="bus-seat-map">
              <div className="text-center mb-4">
                <p className="text-xs uppercase font-bold text-gray-500">Conductor</p>
                <div className="conductor-block"></div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-8">
                {seatsToShow.map((seat) => {
                  const isOccupied = seat.status !== 'available';
                  const isSelected = selectedSeat?.id === seat.id;
                  
                  return (
                    <button
                      key={seat.id}
                      disabled={isOccupied}
                      onClick={() => handleSelect(seat)}
                      className={`
                        relative aspect-square rounded-lg flex items-center justify-center transition-all duration-300 transform
                        ${
                          isOccupied
                            ? "seat-occupied"
                            : isSelected
                              ? "seat-selected"
                              : "seat-available"
                        }
                      `}
                    >
                      <Armchair size={20} className={isSelected ? "animate-pulse" : ""} />
                      <span className="absolute -bottom-1 text-[8px] font-bold uppercase">
                        {seat.seat_number}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Leyenda */}
                <div className="mt-6 flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="seat-available w-4 h-4"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="seat-occupied w-4 h-4"></div>
                  <span>Ocupado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="seat-selected w-4 h-4"></div>
                  <span>Seleccionado</span>
                </div>
              </div>
            </div>

            {/* Panel de Información */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="seat-info-panel">
                {selectedSeat ? (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-brand-dark text-3xl font-black">
                      Asiento {selectedSeat.seat_number}
                    </p>
                    <p className="text-brand-mid font-bold uppercase text-xs">
                      {selectedSeat.type} - Piso {selectedSeat.floor}
                    </p>
                    <p className="text-brand-dark text-2xl font-bold mt-4">
                      ${selectedSeat.price.toLocaleString("es-CL")}
                    </p>
                  </div>
                ) : (
                  <p className="text-brand-muted font-bold italic text-center">
                    Selecciona un asiento
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedSeat}
                data-confirm-button
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 group disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {selectedSeat && <CheckCircle className="group-hover:animate-bounce" size={20} />}
                AGREGAR AL CARRITO
              </button>

              <Link 
                href="/checkout"
                className="text-center icon-accent font-bold hover:underline"
              >
                Ir al carrito →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SeleccionarAsientoPage() {
  return (
    <Suspense fallback={
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <div className="loading-spinner animate-spin h-12 w-12"></div>
        </section>
      </div>
    }>
      <SeatSelectionContent />
    </Suspense>
  );
}
