"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/Toast";
import { Armchair, CheckCircle } from "lucide-react";

interface Seat {
  id: string;
  number: number;
  isOccupied: boolean;
  type: "Premium" | "Clásico";
  price: number;
}

const generateSeats = (rows: number): Seat[] => {
  return Array.from({ length: rows * 4 }, (_, i) => ({
    id: `S-${i + 1}`,
    number: i + 1,
    isOccupied: Math.random() < 0.3,
    type: i < 8 ? "Premium" : "Clásico",
    price: i < 8 ? 28900 : 18500,
  }));
};

const SeatPicker = () => {
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setSeats(generateSeats(10));
    setHasMounted(true);
  }, []);

  const seatsToShow = seats;

  const handleSelect = (seat: Seat) => {
    if (!seat.isOccupied) setSelectedSeat(seat);
  };

  const handleConfirm = () => {
    if (selectedSeat) {
      addToCart({
        id: crypto.randomUUID(),
        origin: "Santiago",
        destination: "Puerto Montt",
        date: "2026-02-20",
        seat: `${selectedSeat.type} - N°${selectedSeat.number}`,
        price: selectedSeat.price,
      });
      
      // Mostrar notificación
      showToast({
        message: `Asiento ${selectedSeat.number} agregado al carrito`,
        type: 'success',
        duration: 3000
      });
      
      // Feedback visual temporal
      const button = document.querySelector('[data-confirm-button]');
      if (button) {
        button.classList.add('scale-95');
        setTimeout(() => button.classList.remove('scale-95'), 200);
      }
      
      setSelectedSeat(null);
    }
  };

  // 3. Importante: No renderizamos los botones hasta que el cliente esté listo
  if (!hasMounted) {
    return (
      <div className="py-20 text-center text-brand-dark font-bold">
        Cargando mapa de asientos...
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}
      <section className="section-gray-bg py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="section-title md:text-5xl text-center mb-12">
          Selección de Asiento
        </h2>
        <div className="bus-frame">
          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bus-seat-map">
              <div className="grid grid-cols-4 gap-4 mt-8">
                {seatsToShow.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.isOccupied}
                    onClick={() => handleSelect(seat)}
                    className={`
                      relative aspect-square rounded-lg flex items-center justify-center transition-all duration-300 transform
                      ${
                        seat.isOccupied
                          ? "seat-occupied"
                          : selectedSeat?.id === seat.id
                            ? "seat-selected"
                            : "seat-available"
                      }
                    `}
                  >
                    <Armchair size={20} className={selectedSeat?.id === seat.id ? "animate-pulse" : ""} />
                    <span className="absolute -bottom-1 text-[8px] font-bold uppercase">
                      {seat.number}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div className="seat-info-panel">
                {selectedSeat ? (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-brand-dark text-3xl font-black">
                      Asiento {selectedSeat.number}
                    </p>
                    <p className="text-brand-mid font-bold uppercase text-xs">
                      {selectedSeat.type}
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
                AGREGAR AL VIAJE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default SeatPicker;
