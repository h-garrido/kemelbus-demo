"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PaymentSimulator from '@/components/PaymentSimulator'; // Importar

export default function CheckoutPage() {
  const { cart, removeFromCart, total } = useCart();
  const [isPaying, setIsPaying] = useState(false);

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      {/* Si el estado es pagando, mostramos el simulador */}
      {isPaying && <PaymentSimulator onClose={() => {
        setIsPaying(false);
        window.location.href = "/"; // Redirigir al inicio tras el éxito
      }} />}

      <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 hover:gap-3 transition-all">
        <ArrowLeft size={18} /> Continuar buscando pasajes
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Lado Izquierdo: Pasajes y Datos */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className="text-4xl font-black text-emerald-950">Confirmación de Viaje</h1>
          
          {cart.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-gray-200 rounded-[2rem] text-center">
              <p className="text-gray-400">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white border-2 border-emerald-50 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-600 text-white p-4 rounded-2xl">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-emerald-950">{item.origin} → {item.destination}</h3>
                      <p className="text-sm text-emerald-600 font-bold">{item.date} • {item.seat}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                    <span className="text-2xl font-black text-emerald-950">
                      ${item.price.toLocaleString('es-CL')}
                    </span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
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
              onClick={() => setIsPaying(true)}
              disabled={cart.length === 0}
              className="w-full bg-emerald-500 text-emerald-950 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-400 disabled:bg-gray-700 disabled:text-gray-500 transition-all transform hover:scale-[1.02]"
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
    </div>
  );
}
