"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createBooking, confirmPayment } from '@/app/db/services';
import type { BookingRequest, PassengerInfo } from '@/app/db/types';
import { Trash2, CreditCard, ShieldCheck, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import PaymentSimulator from '@/components/PaymentSimulator';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passengersData, setPassengersData] = useState<Map<string, PassengerInfo>>(new Map());
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const updatePassengerData = (ticketId: string, field: keyof PassengerInfo, value: string) => {
    const newData = new Map(passengersData);
    const existing = newData.get(ticketId) || { name: '', rut: '' };
    newData.set(ticketId, { ...existing, [field]: value });
    setPassengersData(newData);
  };

  const handleProceedToPayment = () => {
    // Validar que todos los pasajeros tengan nombre y RUT
    for (const item of cart) {
      const passenger = passengersData.get(item.id);
      if (!passenger?.name || !passenger?.rut) {
        alert('Por favor completa los datos de todos los pasajeros');
        return;
      }
    }

    if (!userEmail) {
      alert('Por favor ingresa tu email');
      return;
    }

    setIsPaying(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    setIsProcessing(true);

    try {
      // Preparar request de booking
      const bookingRequest: BookingRequest = {
        seats: cart.map(item => ({
          seat_id: item.seat_id,
          passenger: passengersData.get(item.id) || { name: '', rut: '' }
        })),
        user_email: userEmail,
        user_phone: userPhone,
        payment_method: 'Webpay'
      };

      // Crear booking
      const result = await createBooking(bookingRequest);

      if (result.success && result.booking_id) {
        // Confirmar pago en la BD con el ID de transacción real
        await confirmPayment(result.booking_id, transactionId);

        // Limpiar carrito
        clearCart();
        
        // Mostrar confirmación
        alert(`¡Reserva confirmada! Código: ${result.booking_code}\nRecibirás un email con los detalles.`);
        
        // Redirigir al inicio
        window.location.href = "/";
      } else {
        alert('Error al procesar la reserva: ' + result.error);
        setIsPaying(false);
      }
    } catch (error) {
      console.error('Error processing booking:', error);
      alert('Error al procesar la reserva. Por favor intenta nuevamente.');
      setIsPaying(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-CL', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white">
      {/* Simulador de Pago */}
      {isPaying && !isProcessing && (
        <PaymentSimulator 
          onClose={() => setIsPaying(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Procesando */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
            <p className="text-gray-600 font-bold">Procesando tu reserva...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="bg-emerald-950 pt-32 pb-20 text-center px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white italic mb-4">
            Confirmación de <span className="text-emerald-500">Viaje</span>
          </h1>
          <p className="text-emerald-100/70 text-lg">Revisa tu reserva y completa el pago de forma segura.</p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={18} /> Continuar buscando pasajes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Lado Izquierdo: Pasajes y Datos */}
          <div className="lg:col-span-2 space-y-8">
          
          {cart.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-gray-200 rounded-[2rem] text-center">
              <p className="text-gray-400">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pasajes */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-emerald-950">Tus Pasajes</h2>
                {cart.map((item) => (
                  <div key={item.id} className="bg-white border-2 border-emerald-50 rounded-3xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="bg-emerald-600 text-white p-4 rounded-2xl">
                          <CreditCard size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-xl text-emerald-950">
                            {item.origin} → {item.destination}
                          </h3>
                          <p className="text-sm text-emerald-600 font-bold">
                            {formatDate(item.date)} • {item.time} • {item.seat}
                          </p>
                          
                          {/* Formulario de Datos del Pasajero */}
                          <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-xl">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 uppercase mb-2">
                              <User size={14} />
                              Datos del Pasajero
                            </div>
                            <input
                              type="text"
                              placeholder="Nombre completo"
                              value={passengersData.get(item.id)?.name || ''}
                              onChange={(e) => updatePassengerData(item.id, 'name', e.target.value)}
                              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <input
                              type="text"
                              placeholder="RUT (ej: 12.345.678-9)"
                              value={passengersData.get(item.id)?.rut || ''}
                              onChange={(e) => updatePassengerData(item.id, 'rut', e.target.value)}
                              className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                        <span className="text-2xl font-black text-emerald-950">
                          ${item.price.toLocaleString('es-CL')}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Datos de Contacto */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-emerald-950 mb-4">Datos de Contacto</h2>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email para envío de tickets"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono (opcional)"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full p-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lado Derecho: Totales */}
        <div className="relative">
          <div className="bg-emerald-950 text-white rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl">
            <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-4">Resumen</h2>
            
            <div className="space-y-4 mb-10 text-emerald-100/60 font-medium">
              <div className="flex justify-between">
                <span>Pasajes ({cart.length})</span>
                <span>${total.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span>Cargos por Servicio</span>
                <span className="text-emerald-400 font-bold">$0</span>
              </div>
            </div>

            <div className="flex justify-between text-3xl font-black mb-10">
              <span>Total</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>

            <button 
              onClick={handleProceedToPayment}
              disabled={cart.length === 0 || isProcessing}
              className="w-full bg-emerald-500 text-emerald-950 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 transition-all transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              Pagar con Webpay
            </button>

            <div className="mt-8 flex flex-col items-center gap-2 text-[10px] text-emerald-400/50 uppercase tracking-[0.2em]">
              <ShieldCheck size={20} />
              <span>Conexión Encriptada SSL</span>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
