"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createBooking, confirmPayment } from '@/app/db/services';
import type { BookingRequest, PassengerInfo } from '@/app/db/types';
import { Trash2, ShieldCheck, ArrowLeft, User, Bus, Calendar, Clock, Armchair, ChevronDown, ChevronUp, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import PaymentSimulator from '@/components/PaymentSimulator';
import LoadingSpinner from '@/components/LoadingSpinner';

const emptyPassenger = (): PassengerInfo => ({
  name: '',
  document_type: 'rut',
  document_number: '',
  birth_date: '',
  email: '',
  phone: '',
});

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [passengersData, setPassengersData] = useState<Map<string, PassengerInfo>>(new Map());
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(cart.map(i => i.id)));
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const updatePassengerData = (ticketId: string, field: keyof PassengerInfo, value: string) => {
    const newData = new Map(passengersData);
    const existing = newData.get(ticketId) ?? emptyPassenger();
    newData.set(ticketId, { ...existing, [field]: value });
    setPassengersData(newData);

    // Limpiar error del campo al escribir
    if (errors[ticketId]?.[field]) {
      setErrors(prev => {
        const next = { ...prev };
        const fieldErrors = { ...next[ticketId] };
        delete fieldErrors[field];
        next[ticketId] = fieldErrors;
        return next;
      });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    setPassengersData(prev => {
      const next = new Map(prev);
      next.delete(itemId);
      return next;
    });
    setExpandedCards(prev => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
    setErrors(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const validate = () => {
    const newErrors: Record<string, Record<string, string>> = {};
    let valid = true;

    for (const item of cart) {
      const p = passengersData.get(item.id) ?? emptyPassenger();
      const fieldErrors: Record<string, string> = {};

      if (!p.name.trim()) {
        fieldErrors.name = 'El nombre es obligatorio';
        valid = false;
      }
      if (!p.document_number.trim()) {
        fieldErrors.document_number = 'El número de documento es obligatorio';
        valid = false;
      }
      if (!p.birth_date) {
        fieldErrors.birth_date = 'La fecha de nacimiento es obligatoria';
        valid = false;
      }

      if (Object.keys(fieldErrors).length > 0) {
        newErrors[item.id] = fieldErrors;
        // Expandir tarjeta con errores
        setExpandedCards(prev => new Set([...prev, item.id]));
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim()) {
      newErrors['contact'] = { email: 'El email es obligatorio para enviar los tickets' };
      valid = false;
    } else if (!emailRegex.test(userEmail)) {
      newErrors['contact'] = { email: 'Ingresa un email válido' };
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleProceedToPayment = () => {
    if (validate()) setIsPaying(true);
  };

  const handlePaymentSuccess = async (transactionId: string) => {
    setIsProcessing(true);
    try {
      const bookingRequest: BookingRequest = {
        seats: cart.map(item => ({
          seat_id: item.seat_id,
          passenger: passengersData.get(item.id) ?? emptyPassenger(),
          fare_type: item.fare_type,
          fare_price: item.price,
        })),
        user_email: userEmail,
        user_phone: userPhone,
        payment_method: 'Webpay',
      };

      const result = await createBooking(bookingRequest);

      if (result.success && result.booking_id) {
        await confirmPayment(result.booking_id, transactionId);
        clearCart();
        alert(`¡Reserva confirmada!\nCódigo: ${result.booking_code}\nRecibirás un email con los detalles.`);
        window.location.href = '/';
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

  const today = new Date().toISOString().split('T')[0];

  // ─── UI helpers ──────────────────────────────────────────────────────────
  const inputBase =
    'input-base text-sm';
  const inputError = (id: string, field: string) =>
    errors[id]?.[field] ? 'error' : '';

  return (
    <div className="section-gray-bg min-h-screen">
      {/* Simulador de Pago */}
      {isPaying && !isProcessing && (
        <PaymentSimulator
          onClose={() => setIsPaying(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Procesando */}
      {isProcessing && (
        <div className="payment-overlay flex items-center justify-center">
          <div className="payment-modal p-8 text-center">
            <div className="flex justify-center mb-4"><LoadingSpinner size="lg" /></div>
            <p className="text-gray-700 font-bold">Procesando tu reserva...</p>
            <p className="text-gray-400 text-sm mt-1">No cierres ni recargues la ventana</p>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="section-hero pt-32 pb-20 text-center px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white italic mb-4">
            Confirmación de <span className="hero-accent">Viaje</span>
          </h1>
          <p className="hero-subtitle text-lg">
            Completa los datos de cada pasajero y revisa tu reserva antes de pagar.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-6">
        <Link
          href="/buscar"
          className="back-link-light mb-10"
        >
          <ArrowLeft size={18} /> Agregar otro pasaje
        </Link>

        {cart.length === 0 ? (
          <div className="no-results-box p-16 text-center bg-white">
            <Bus size={48} className="no-results-icon mx-auto mb-4" />
            <p className="text-gray-400 font-medium mb-6">Tu carrito está vacío</p>
            <Link
              href="/"
              className="btn-primary inline-block px-8 py-3"
            >
              Buscar pasajes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ─── Izquierda ───────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Pasajeros */}
              {cart.map((item, index) => {
                const p = passengersData.get(item.id) ?? emptyPassenger();
                const isExpanded = expandedCards.has(item.id);
                const hasErrors = !!errors[item.id];

                return (
                  <div
                    key={item.id}
                    className={`passenger-card${hasErrors ? ' passenger-card-error' : ''}`}
                  >
                    {/* Cabecera del pasajero */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleCard(item.id)}
                      onKeyDown={(e) => e.key === 'Enter' && toggleCard(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="badge-bus w-10 h-10 flex items-center justify-center font-black text-lg shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-black text-brand-dark text-lg leading-tight">
                            {p.name.trim() || `Pasajero ${index + 1}`}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-brand-mid font-semibold">
                            <span className="flex items-center gap-1">
                              <Bus size={11} /> {item.origin} → {item.destination}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={11} /> {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={11} /> {item.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Armchair size={11} /> {item.seat}
                            </span>
                            <span className="inline-block px-2 py-0.5 rounded-full bg-brand-dark/10 text-brand-dark font-bold">
                              {item.fare_type}
                            </span>
                          </div>
                          {hasErrors && (
                            <p className="text-xs text-red-500 font-bold mt-1">
                              ⚠ Completa los campos requeridos
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="text-brand-dark text-xl font-black">
                          ${item.price.toLocaleString('es-CL')}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveItem(item.id); }}
                          className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors"
                          title="Eliminar pasaje"
                        >
                          <Trash2 size={18} />
                        </button>
                        {isExpanded ? (
                          <ChevronUp size={20} className="icon-accent" />
                        ) : (
                          <ChevronDown size={20} className="icon-accent" />
                        )}
                      </div>
                    </div>

                    {/* Formulario expandible */}
                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-5 passenger-form-divider pt-5">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-mid uppercase tracking-widest">
                          <User size={14} />
                          Datos del Pasajero {index + 1}
                        </div>

                        {/* Nombre */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                            Nombre completo <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: Juan Andrés Pérez González"
                            value={p.name}
                            onChange={(e) => updatePassengerData(item.id, 'name', e.target.value)}
                            className={`${inputBase} ${inputError(item.id, 'name')}`}
                          />
                          {errors[item.id]?.name && (
                            <p className="text-xs text-red-500 mt-1">{errors[item.id].name}</p>
                          )}
                        </div>

                        {/* Documento */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                              Tipo de documento <span className="text-red-400">*</span>
                            </label>
                            <select
                              value={p.document_type}
                              onChange={(e) => updatePassengerData(item.id, 'document_type', e.target.value)}
                              className={`${inputBase} ${inputError(item.id, 'document_type')}`}
                            >
                              <option value="rut">RUT</option>
                              <option value="passport">Pasaporte</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                              {p.document_type === 'rut' ? 'RUT' : 'N° Pasaporte'} <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder={p.document_type === 'rut' ? 'Ej: 12.345.678-9' : 'Ej: A01234567'}
                              value={p.document_number}
                              onChange={(e) => updatePassengerData(item.id, 'document_number', e.target.value)}
                              className={`${inputBase} ${inputError(item.id, 'document_number')}`}
                            />
                            {errors[item.id]?.document_number && (
                              <p className="text-xs text-red-500 mt-1">{errors[item.id].document_number}</p>
                            )}
                          </div>
                        </div>

                        {/* Fecha de nacimiento */}
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                            Fecha de nacimiento <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="date"
                            max={today}
                            value={p.birth_date}
                            onChange={(e) => updatePassengerData(item.id, 'birth_date', e.target.value)}
                            className={`${inputBase} ${inputError(item.id, 'birth_date')}`}
                          />
                          {errors[item.id]?.birth_date && (
                            <p className="text-xs text-red-500 mt-1">{errors[item.id].birth_date}</p>
                          )}
                        </div>

                        {/* Email y Teléfono opcionales del pasajero */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                              Email del pasajero <span className="text-gray-300">(opcional)</span>
                            </label>
                            <input
                              type="email"
                              placeholder="pasajero@email.com"
                              value={p.email ?? ''}
                              onChange={(e) => updatePassengerData(item.id, 'email', e.target.value)}
                              className={`${inputBase}`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                              Teléfono del pasajero <span className="text-gray-300">(opcional)</span>
                            </label>
                            <input
                              type="tel"
                              placeholder="+56 9 1234 5678"
                              value={p.phone ?? ''}
                              onChange={(e) => updatePassengerData(item.id, 'phone', e.target.value)}
                              className={`${inputBase}`}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Datos de Contacto de la Reserva */}
              <div className="contact-form-card p-6 shadow-sm rounded-3xl">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-mid uppercase tracking-widest mb-5">
                  <Mail size={14} />
                  Datos para la confirmación de la reserva
                </div>
                <p className="text-sm text-gray-500 mb-5">
                  Te enviaremos el código de reserva y los tickets a este correo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Email de contacto <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="tucorreo@email.com"
                      value={userEmail}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        if (errors['contact']?.email) {
                          setErrors(prev => { const n = { ...prev }; delete n['contact']; return n; });
                        }
                      }}
                      className={`${inputBase} ${errors['contact']?.email ? 'error' : ''}`}
                    />
                    {errors['contact']?.email && (
                      <p className="text-xs text-red-500 mt-1">{errors['contact'].email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                      Teléfono <span className="text-gray-300">(opcional)</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className={`${inputBase} pl-9`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Derecha: Resumen ─────────────────────────────────── */}
            <div className="relative">
              <div className="section-dark-bg text-white rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Resumen</h2>

                <div className="space-y-3 mb-6">
                  {cart.map((item, i) => (
                    <div key={item.id} className="flex justify-between items-start text-sm hero-subtitle">
                      <span className="leading-snug">
                        Pasajero {i + 1} — Asiento {item.seatNumber}
                      </span>
                      <span className="font-bold text-white shrink-0 ml-3">
                        ${item.price.toLocaleString('es-CL')}
                      </span>
                    </div>
                  ))}
                </div>

                  <div className="space-y-3 mb-8 pt-4 border-t border-white/10 hero-subtitle font-medium text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} {cart.length === 1 ? 'pasaje' : 'pasajes'})</span>
                    <span>${total.toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cargos por servicio</span>
                    <span className="icon-accent font-bold">$0</span>
                  </div>
                </div>

                <div className="flex justify-between text-3xl font-black mb-8">
                  <span>Total</span>
                  <span>${total.toLocaleString('es-CL')}</span>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={cart.length === 0 || isProcessing}
                  className="btn-cta-green w-full py-5 text-lg uppercase tracking-widest disabled:bg-gray-700 disabled:text-gray-500 disabled:hover:scale-100"
                >
                  Pagar con Webpay
                </button>

                <div className="mt-8 flex flex-col items-center gap-2 ssl-text">
                  <ShieldCheck size={20} />
                  <span>Conexión Encriptada SSL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}


