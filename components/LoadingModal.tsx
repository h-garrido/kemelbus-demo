import LoadingSpinner from '@/components/LoadingSpinner';

interface LoadingModalProps {
  message?: string;
  submessage?: string;
}

export default function LoadingModal({
  message = 'Cargando...',
  submessage,
}: LoadingModalProps) {
  return (
    <div className="payment-overlay flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-5 w-full max-w-xs text-center animate-in zoom-in-95 duration-200">
        <LoadingSpinner size="lg" />
        <div>
          <p className="font-black text-brand-dark text-lg leading-snug">{message}</p>
          {submessage && (
            <p className="text-gray-400 text-sm mt-1">{submessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
