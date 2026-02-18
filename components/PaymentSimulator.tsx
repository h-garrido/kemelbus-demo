"use client";
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Loader2, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

interface PaymentSimulatorProps {
  onClose: () => void;
  onSuccess?: (transactionId: string) => void;
}

type PaymentStep = 'redirecting' | 'processing' | 'success';

interface StepConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PaymentSimulator = ({ onClose, onSuccess }: PaymentSimulatorProps) => {
  const { total } = useCart();
  const [step, setStep] = useState<PaymentStep>('redirecting');
  const [orderNumber] = useState(() => Math.floor(Math.random() * 100000));
  const [transactionId] = useState(() => `TBK-${Date.now()}-${Math.floor(Math.random() * 10000)}`);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep('processing'), 2000);
    const timer2 = setTimeout(() => {
      setStep('success');
      // Llamar al callback de éxito si existe
      if (onSuccess) {
        onSuccess(transactionId);
      }
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onSuccess, transactionId]);

  const stepConfigs: Record<PaymentStep, StepConfig> = {
    redirecting: {
      icon: <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />,
      title: 'Conectando con Transbank...',
      description: `Estamos estableciendo una conexión segura para procesar tu pago de $${total.toLocaleString('es-CL')}.`
    },
    processing: {
      icon: (
        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
        </div>
      ),
      title: 'Validando Transacción',
      description: 'Por favor, no cierres ni recargues la ventana.'
    },
    success: {
      icon: (
        <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 size={48} />
        </div>
      ),
      title: '¡Pago Exitoso!',
      description: 'Procesando tu reserva...'
    }
  };

  const currentStep = stepConfigs[step];

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Cabecera Estilo Webpay */}
        <div className="bg-webpay p-6 text-white flex justify-between items-center">
          <div className="font-black italic text-xl tracking-tighter">
            Webpay<span className="font-light">Plus</span>
          </div>
          <Lock size={18} />
        </div>

        <div className="p-10 text-center">
          <div className={`space-y-6 ${step === 'success' ? 'animate-in fade-in zoom-in duration-500' : ''}`}>
            {currentStep.icon}
            
            <div>
              <h2 className={`text-xl font-bold ${step === 'success' ? 'text-2xl text-emerald-950' : 'text-gray-800'}`}>
                {currentStep.title}
              </h2>
              {step === 'success' && (
                <p className="text-emerald-700 font-bold mt-1">
                  Orden #TL-{orderNumber}
                </p>
              )}
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 flex items-center justify-center gap-2 border-t text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <ShieldCheck size={14} /> Transacción Protegida por Transbank
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulator;
