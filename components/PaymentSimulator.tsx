"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Loader2, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

interface PaymentSimulatorProps {
  onClose: () => void;
}

const PaymentSimulator = ({ onClose }: PaymentSimulatorProps) => {
  const { clearCart, total } = useCart();
  const [step, setStep] = useState<'redirecting' | 'processing' | 'success'>('redirecting');

  useEffect(() => {
    // Simulación de tiempos de espera de Transbank
    const timer1 = setTimeout(() => setStep('processing'), 2000);
    const timer2 = setTimeout(() => {
      setStep('success');
      clearCart(); // Vaciamos el carrito al completar el pago
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [clearCart]);

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Cabecera Estilo Webpay (Rojo Transbank) */}
        <div className="bg-webpay p-6 text-white flex justify-between items-center">
          <div className="font-black italic text-xl tracking-tighter">Webpay<span className="font-light">Plus</span></div>
          <Lock size={18} />
        </div>

        <div className="p-10 text-center">
          {step === 'redirecting' && (
            <div className="space-y-6">
              <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
              <h2 className="text-xl font-bold text-gray-800">Conectando con Transbank...</h2>
              <p className="text-sm text-gray-500">Estamos estableciendo una conexión segura para procesar tu pago de ${total.toLocaleString('es-CL')}.</p>
            </div>
          )}

          {step === 'processing' && (
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Validando Transacción</h2>
              <p className="text-sm text-gray-500">Por favor, no cierres ni recargues la ventana.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-emerald-950">¡Pago Exitoso!</h2>
                <p className="text-emerald-700 font-bold mt-1">Orden #TL-{Math.floor(Math.random() * 100000)}</p>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Tus pasajes han sido enviados a tu correo electrónico. Recuerda presentarlos en tu celular al momento de abordar.
              </p>
              <button 
                onClick={onClose}
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all"
              >
                VOLVER AL INICIO
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 flex items-center justify-center gap-2 border-t text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} /> Transacción Protegida por Transbank
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulator;
