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
  type: "Salón Cama" | "Semi Cama";
  price: number;
}

const generateSeats = (rows: number, prefix: string): Seat[] => {
  return Array.from({ length: rows * 4 }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    number: i + 1,
    // La aleatoriedad ahora solo ocurrirá en el cliente
    isOccupied: Math.random() < 0.3,
    type: prefix === "P1" ? "Salón Cama" : "Semi Cama",
    price: prefix === "P1" ? 28900 : 18500,
  }));
};

const SeatPicker = () => {
  const { addToCart } = useCart();
  const { toast, showToast, hideToast } = useToast();
  const [floor, setFloor] = useState<number>(1);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // 1. Inicializamos con arreglos vacíos para que coincidan servidor y cliente
  const [firstFloorSeats, setFirstFloorSeats] = useState<Seat[]>([]);
  const [secondFloorSeats, setSecondFloorSeats] = useState<Seat[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  // 2. Usamos useEffect para generar los datos SOLO en el navegador
  useEffect(() => {
    setFirstFloorSeats(generateSeats(3, "P1"));
    setSecondFloorSeats(generateSeats(10, "P2"));
    setHasMounted(true);
  }, []);

  const seatsToShow = floor === 1 ? firstFloorSeats : secondFloorSeats;

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
      <div className="py-20 text-center text-emerald-900 font-bold">
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
      <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-emerald-950 text-center mb-12">
          Selección de Asiento
        </h2>
        <div className="bg-white rounded-[3rem] shadow-xl border border-emerald-100 overflow-hidden">
          <div className="flex border-b border-emerald-50">
            <button
              onClick={() => setFloor(1)}
              className={`flex-1 py-6 font-bold transition-all duration-300 ${floor === 1 ? "bg-emerald-600 text-white shadow-lg" : "text-emerald-950 hover:bg-emerald-50 hover:text-emerald-600"}`}
            >
              Piso 1: Salón Cama
            </button>
            <button
              onClick={() => setFloor(2)}
              className={`flex-1 py-6 font-bold transition-all duration-300 ${floor === 2 ? "bg-emerald-600 text-white shadow-lg" : "text-emerald-950 hover:bg-emerald-50 hover:text-emerald-600"}`}
            >
              Piso 2: Semi Cama
            </button>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-100 rounded-3xl p-6 border-x-8 border-emerald-900 relative">
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
                          ? "bg-gray-300 text-gray-400 cursor-not-allowed opacity-50"
                          : selectedSeat?.id === seat.id
                            ? "bg-emerald-500 text-white scale-110 shadow-xl shadow-emerald-500/50 ring-2 ring-emerald-300"
                            : "bg-white text-emerald-900 border-2 border-emerald-100 hover:border-emerald-500 hover:scale-105 hover:shadow-md active:scale-95"
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
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 min-h-[140px] flex flex-col justify-center transition-all duration-300">
                {selectedSeat ? (
                  <div className="animate-[fadeIn_0.3s_ease-out]">
                    <p className="text-3xl font-black text-emerald-950">
                      Asiento {selectedSeat.number}
                    </p>
                    <p className="text-emerald-700 font-bold uppercase text-xs">
                      {selectedSeat.type}
                    </p>
                    <p className="text-2xl font-bold mt-4 text-emerald-900">
                      ${selectedSeat.price.toLocaleString("es-CL")}
                    </p>
                  </div>
                ) : (
                  <p className="text-emerald-800/50 font-bold italic text-center">
                    Selecciona un asiento
                  </p>
                )}
              </div>

              <button
                onClick={handleConfirm}
                disabled={!selectedSeat}
                data-confirm-button
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black disabled:bg-gray-200 disabled:text-gray-400 transition-all duration-300 hover:bg-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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
