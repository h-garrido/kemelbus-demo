"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getServiceDetails, getSeats, getRouteById, getRouteFares } from "@/app/db/services";
import type { BusService, Seat, RouteWithCities, RouteFare } from "@/app/db/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import { Armchair, CheckCircle, ArrowLeft, Bus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

function SeatSelectionContent() {
  const searchParams = useSearchParams();
  const { addToCart, cart } = useCart();
  const { toast, showToast, hideToast } = useToast();

  const serviceId    = searchParams.get('servicio');
  const origenParam  = searchParams.get('origen');
  const destinoParam = searchParams.get('destino');
  const fechaParam   = searchParams.get('fecha');

  // Reconstruir URL de retorno con los parámetros de búsqueda originales
  const backUrl =
    origenParam && destinoParam && fechaParam
      ? `/buscar?origen=${origenParam}&destino=${destinoParam}&fecha=${fechaParam}`
      : '/buscar';

  const [service, setService] = useState<BusService | null>(null);
  const [route,   setRoute]   = useState<RouteWithCities | null>(null);
  const [seats,   setSeats]   = useState<Seat[]>([]);
  const [fares,   setFares]   = useState<RouteFare[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [selectedFareType, setSelectedFareType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!serviceId) { setIsLoading(false); return; }

      const serviceData = await getServiceDetails(serviceId);
      if (!serviceData) { setIsLoading(false); return; }
      setService(serviceData);

      const routeData = await getRouteById(serviceData.route_id);
      if (routeData) {
        setRoute(routeData);
        const faresData = await getRouteFares(routeData.id);
        setFares(faresData);
        // Preseleccionar la primera tarifa
        if (faresData.length > 0) setSelectedFareType(faresData[0].fare_type);
      }

      const seatsData = await getSeats(serviceId);
      setSeats(seatsData);
      setIsLoading(false);
    };

    loadData();
  }, [serviceId]);

  // Asientos de este servicio que ya están en el carrito
  const cartSeatIds = new Set(
    cart.filter(i => i.service_id === serviceId).map(i => i.seat_id)
  );

  const handleSelect = (seat: Seat) => {
    if (seat.status !== 'available' || cartSeatIds.has(seat.id)) return;
    // Toggle: si ya está seleccionado, lo deselecciona
    setSelectedSeat(prev => (prev?.id === seat.id ? null : seat));
  };

  const handleConfirm = () => {
    if (selectedSeat && service && route) {
      const activeFare = fares.find(f => f.fare_type === selectedFareType);
      const farePrice  = activeFare ? activeFare.price : selectedSeat.price;
      const fareLabel  = selectedFareType || 'Normal';
      addToCart({
        id: crypto.randomUUID(),
        service_id: service.id,
        seat_id: selectedSeat.id,
        origin: route.origin_city,
        destination: route.destination_city,
        date: service.departure_date,
        time: service.departure_time.substring(0, 5),
        seat: `${selectedSeat.type} - N°${selectedSeat.seat_number}`,
        seatNumber: selectedSeat.seat_number,
        price: farePrice,
        fare_type: fareLabel,
      });
      showToast({ message: `Asiento ${selectedSeat.seat_number} agregado al carrito`, type: 'success', duration: 3000 });
      setSelectedSeat(null);
    }
  };;

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <div className="flex justify-center"><LoadingSpinner size="lg" /></div>
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
          <Link href="/" className="back-link">Volver al inicio</Link>
        </section>
      </div>
    );
  }

  const formatTime = (t: string) => t.substring(0, 5);
  const formatDate = (d: string) =>
    new Date(d + 'T00:00:00').toLocaleDateString('es-CL', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

  // ── Agrupación de asientos en filas de 4 (columnas A B | C D) ───────────
  const rows: Seat[][] = [];
  for (let i = 0; i < seats.length; i += 4) rows.push(seats.slice(i, i + 4));

  const availableCount = seats.filter(s => s.status === 'available' && !cartSeatIds.has(s.id)).length;
  const occupiedCount  = seats.filter(s => s.status !== 'available').length;
  const cartCount      = cartSeatIds.size;

  const getSeatClass = (seat: Seat) => {
    if (cartSeatIds.has(seat.id))     return 'seat-in-cart';
    if (seat.status !== 'available')  return 'seat-occupied';
    if (selectedSeat?.id === seat.id) return 'seat-selected';
    return 'seat-available';
  };

  const SeatButton = ({ seat }: { seat: Seat }) => (
    <button
      disabled={seat.status !== 'available' || cartSeatIds.has(seat.id)}
      onClick={() => handleSelect(seat)}
      title={`Asiento ${seat.seat_number} — ${seat.type} — $${seat.price.toLocaleString('es-CL')}`}
      className={`relative h-11 rounded-md flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${getSeatClass(seat)}`}
    >
      <Armchair size={14} />
      <span className="text-[10px] font-black leading-none">{seat.seat_number}</span>
    </button>
  );

  return (
    <div className="page-white">
      {toast && (
        <Toast message={toast.message} type={toast.type} duration={toast.duration} onClose={hideToast} />
      )}

      {/* ── Header ── */}
      <section className="section-hero pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href={backUrl} className="back-link mb-8 inline-flex">
            <ArrowLeft size={18} /> Ver otros servicios
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="badge-bus p-4"><Bus size={32} /></div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-1">
                  {route.origin_city} → {route.destination_city}
                </h1>
                <p className="hero-subtitle capitalize">{formatDate(service.departure_date)}</p>
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

      {/* ── Cuerpo ── */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="bus-frame">
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ────── Mapa de asientos ────── */}
            <div className="bus-seat-map">

              {/* Frente del bus */}
              <div className="flex flex-col items-center mb-2">
                <div className="bus-windshield" />
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mt-2 mb-1">
                  Conductor
                </p>
                <div className="conductor-block" />
              </div>

              {/* Cabeceras de columna */}
              <div className="grid grid-cols-[1fr_1fr_28px_1fr_1fr] gap-2 text-center text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-5 mb-2 px-0.5">
                <span>A</span><span>B</span><span /><span>C</span><span>D</span>
              </div>

              {/* Filas */}
              <div className="space-y-1.5">
                {rows.map((row, rowIdx) => (
                  <div key={rowIdx} className="grid grid-cols-[1fr_1fr_28px_1fr_1fr] gap-2 items-center">
                    {row[0] ? <SeatButton seat={row[0]} /> : <div />}
                    {row[1] ? <SeatButton seat={row[1]} /> : <div />}
                    {/* Número de fila en el pasillo */}
                    <div className="text-center text-[9px] font-bold text-gray-400 leading-none select-none">
                      {rowIdx + 1}
                    </div>
                    {row[2] ? <SeatButton seat={row[2]} /> : <div />}
                    {row[3] ? <SeatButton seat={row[3]} /> : <div />}
                  </div>
                ))}
              </div>

              {/* Parte trasera del bus */}
              <div className="mt-3 h-2.5 bg-gray-800 rounded-b-2xl opacity-20" />

              {/* Contadores */}
              <div className="mt-4 flex justify-center gap-5 text-xs font-bold">
                <span className="text-emerald-600">{availableCount} disponibles</span>
                {cartCount > 0 && <span className="text-blue-600">{cartCount} en carrito</span>}
                <span className="text-gray-400">{occupiedCount} ocupados</span>
              </div>

              {/* Leyenda */}
              <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded seat-available flex items-center justify-center shrink-0">
                    <Armchair size={11} />
                  </div>
                  <span>Semi Cama</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded seat-selected flex items-center justify-center shrink-0">
                    <Armchair size={11} />
                  </div>
                  <span>Seleccionado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded seat-occupied shrink-0" />
                  <span>Ocupado</span>
                </div>
                {cartCount > 0 && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded seat-in-cart flex items-center justify-center shrink-0">
                      <Armchair size={11} />
                    </div>
                    <span>En carrito</span>
                  </div>
                )}
              </div>
            </div>

            {/* ────── Panel de información ────── */}
            <div className="flex flex-col justify-center space-y-6">

              {!selectedSeat && (
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  ← Selecciona un asiento en el mapa
                </p>
              )}

              {/* Tarjeta del asiento */}
              <div className="seat-info-panel">
                {selectedSeat ? (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                          Asiento seleccionado
                        </p>
                        <p className="text-brand-dark text-4xl font-black leading-none">
                          N° {selectedSeat.seat_number}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-xs font-black uppercase px-3 py-1 rounded-full mb-2 bg-gray-100 text-gray-600">
                          {selectedSeat.type}
                        </span>
                        <p className="text-brand-dark text-2xl font-black">
                          ${(fares.find(f => f.fare_type === selectedFareType)?.price ?? selectedSeat.price).toLocaleString('es-CL')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedSeat(null)}
                      className="text-xs text-gray-400 hover:text-red-400 font-semibold transition-colors"
                    >
                      Cambiar selección ✕
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Armchair size={32} className="mx-auto mb-2 text-gray-200" />
                    <p className="text-brand-muted font-bold italic">Ningún asiento seleccionado</p>
                  </div>
                )}
              </div>

              {/* Selector de tarifa */}
              {fares.length > 0 && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tipo de tarifa</p>
                  <div className="grid grid-cols-1 gap-2">
                    {fares.map((fare) => (
                      <label
                        key={fare.fare_type}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedFareType === fare.fare_type
                            ? 'border-brand-dark bg-white shadow-sm'
                            : 'border-transparent bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="fare_type"
                            value={fare.fare_type}
                            checked={selectedFareType === fare.fare_type}
                            onChange={() => setSelectedFareType(fare.fare_type)}
                            className="accent-brand-dark"
                          />
                          <span className="text-sm font-semibold text-brand-dark">{fare.fare_type}</span>
                        </div>
                        <span className="text-sm font-black text-brand-dark">${fare.price.toLocaleString('es-CL')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón agregar */}
              <button
                onClick={handleConfirm}
                disabled={!selectedSeat}
                data-confirm-button
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 group
                           disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {selectedSeat && <CheckCircle className="group-hover:animate-bounce" size={20} />}
                AGREGAR AL CARRITO
              </button>

              {/* Ir al carrito */}
              {cart.length > 0 && (
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 text-sm font-bold
                             bg-emerald-50 text-emerald-700 border border-emerald-200
                             rounded-xl py-3 hover:bg-emerald-100 transition-colors"
                >
                  <ShoppingCart size={16} />
                  Ver carrito ({cart.length} {cart.length === 1 ? 'asiento' : 'asientos'}) →
                </Link>
              )}
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
          <div className="flex justify-center"><LoadingSpinner size="lg" /></div>
        </section>
      </div>
    }>
      <SeatSelectionContent />
    </Suspense>
  );
}
