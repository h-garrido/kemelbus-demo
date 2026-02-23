"use client";
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { Loader2, CheckCircle2, ShieldCheck, Lock, X } from 'lucide-react';

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

  // Keep a stable ref so the effect doesn't re-run when the parent re-renders
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);

  useEffect(() => {
    let timer3: ReturnType<typeof setTimeout>;

    const timer1 = setTimeout(() => setStep('processing'), 2000);
    const timer2 = setTimeout(() => {
      setStep('success');
      // Wait 1.5s so the user actually sees the success screen before parent takes over
      timer3 = setTimeout(() => {
        if (onSuccessRef.current) {
          onSuccessRef.current(transactionId);
        }
      }, 1500);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [transactionId]); // transactionId is stable; onSuccess handled via ref

  const stepConfigs: Record<PaymentStep, StepConfig> = {
    redirecting: {
      icon: <Loader2 className="webpay-spinner w-12 h-12 animate-spin mx-auto" />,
      title: 'Conectando con Transbank...',
      description: `Estamos estableciendo una conexión segura para procesar tu pago de $${total.toLocaleString('es-CL')}.`
    },
    processing: {
      icon: (
        <div className="flex justify-center gap-2">
          <div className="webpay-dot animate-bounce [animation-delay:-0.3s]"></div>
          <div className="webpay-dot animate-bounce [animation-delay:-0.15s]"></div>
          <div className="webpay-dot animate-bounce"></div>
        </div>
      ),
      title: 'Validando Transacción',
      description: 'Por favor, no cierres ni recargues la ventana.'
    },
    success: {
      icon: (
        <div className="payment-success-icon">
          <CheckCircle2 size={48} />
        </div>
      ),
      title: '¡Pago Exitoso!',
      description: 'Procesando tu reserva...'
    }
  };

  const currentStep = stepConfigs[step];

  return (
    <div className="payment-overlay flex items-center justify-center p-6">
      <div className="payment-modal animate-in zoom-in-95 duration-300">
        
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
              <h2 className={`${step === 'success' ? 'payment-title-success' : 'payment-title'}`}>
                {currentStep.title}
              </h2>
              {step === 'success' && (
                <p className="payment-order-code">
                  Orden #TL-{orderNumber}
                </p>
              )}
            </div>
            
            <p className="payment-description">
              {currentStep.description}
            </p>

            {step === 'redirecting' && (
              <button
                onClick={onClose}
                className="mt-2 flex items-center gap-2 mx-auto text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={15} /> Cancelar y volver al checkout
              </button>
            )}
          </div>
        </div>

        <div className="payment-footer p-4 flex items-center justify-center gap-2">
          <ShieldCheck size={14} /> Transacción Protegida por Transbank
        </div>
      </div>
    </div>
  );
};

export default PaymentSimulator;
