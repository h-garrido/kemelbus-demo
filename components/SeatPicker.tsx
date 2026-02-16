"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Armchair, CheckCircle } from 'lucide-react';

// Simulación de datos de asientos
const generateSeats = (rows: number, prefix: string) => {
  return Array.from({ length: rows * 4 }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    number: i + 1,
    isOccupied: Math.random() < 0.3, // 30% de probabilidad de estar ocupado
    type: prefix === 'P1' ? 'Salón Cama' : 'Semi Cama',
    price: prefix === 'P1' ? 28900 : 18500
  }));
};

const SeatPicker = () => {
  const { addToCart } = useCart();
  const [floor, setFloor] = useState(1);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);

  const firstFloorSeats = generateSeats(3, 'P1'); // Piso 1: Salón Cama
  const secondFloorSeats = generateSeats(10, 'P2'); // Piso 2: Semi Cama

  const seatsToShow = floor === 1 ? firstFloorSeats : secondFloorSeats;

  const handleSelect = (seat: any) => {
    if (!seat.isOccupied) {
      setSelectedSeat(seat);
    }
  };

  const handleConfirm = () => {
    if (selectedSeat) {
      addToCart({
        id: Math.random().toString(36),
        origin: "Santiago",
        destination: "Puerto Montt",
        date: "2024-12-15",
        seat: `${selectedSeat.type} - N°${selectedSeat.number}`,
        price: selectedSeat.price
      });
      setSelectedSeat(null);
      alert("Asiento añadido al carrito");
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Selector de Piso */}
          <div className="flex border-b">
            <button 
              onClick={() => setFloor(1)}
              className={`flex-1 py-6 font-bold transition-all ${floor === 1 ? 'bg-emerald-600 text-white' : 'text-emerald-950 hover:bg-emerald-50'}`}
            >
              Piso 1: Salón Cama
            </button>
            <button 
              onClick={() => setFloor(2)}
              className={`flex-1 py-6 font-bold transition-all ${floor === 2 ? 'bg-emerald-600 text-white' : 'text-emerald-950 hover:bg-emerald-50'}`}
            >
              Piso 2: Semi Cama
            </button>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* El Bus Visual */}
            <div className="bg-gray-200 rounded-3xl p-6 border-x-8 border-emerald-900 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-emerald-950 text-white text-[10px] px-4 py-1 rounded-full uppercase tracking-widest font-bold">
                Frente del Bus
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-8">
                {seatsToShow.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.isOccupied}
                    onClick={() => handleSelect(seat)}
                    className={`
                      relative aspect-square rounded-lg flex items-center justify-center transition-all
                      ${seat.isOccupied ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 
                        selectedSeat?.id === seat.id ? 'bg-emerald-500 text-white scale-110 shadow-lg' : 
                        'bg-white text-emerald-900 border-2 border-emerald-100 hover:border-emerald-500'}
                    `}
                  >
                    <Armchair size={20} />
                    <span className="absolute -bottom-1 text-[8px] font-bold uppercase">{seat.number}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Resumen de Selección */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl font-black text-emerald-950 mb-2">Tu Selección</h3>
                <p className="text-gray-500 text-sm">Elige el asiento que prefieras para tu viaje.</p>
              </div>

              {selectedSeat ? (
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 animate-in fade-in slide-in-from-right-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-emerald-900 font-bold uppercase text-xs">Asiento Seleccionado</span>
                    <CheckCircle className="text-emerald-600" size={20} />
                  </div>
                  <p className="text-3xl font-black text-emerald-950">N° {selectedSeat.number}</p>
                  <p className="text-emerald-700 font-medium">{selectedSeat.type}</p>
                  <p className="text-2xl font-bold mt-4 text-emerald-900">
                    ${selectedSeat.price.toLocaleString('es-CL')}
                  </p>
                </div>
              ) : (
                <div className="p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400">
                  Selecciona un asiento disponible en el mapa
                </div>
              )}

              <button 
                onClick={handleConfirm}
                disabled={!selectedSeat}
                className={`w-full py-4 rounded-xl font-black transition-all shadow-lg ${
                  selectedSeat 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                CONFIRMAR Y AGREGAR
              </button>

              {/* Leyenda */}
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded-sm"></div> Libre</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-300 rounded-sm"></div> Ocupado</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Tu Selección</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatPicker;
