"use client";
import { useState } from 'react';
import { Tag, X, ArrowRight } from 'lucide-react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="top-banner py-2 px-4 relative flex items-center justify-center gap-3 text-sm font-medium animate-in fade-in duration-500">
      <Tag size={16} className="animate-bounce" />
      <p>
        ¡Oferta de Verano! <span className="font-black">20% OFF</span> comprando con 10 días de anticipación.
      </p>
      <button className="top-banner-cta flex items-center gap-1 px-3 py-0.5 ml-2">
        Canjear cupón <ArrowRight size={14} />
      </button>
      
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 hover:rotate-90 transition-transform p-1"
        aria-label="Cerrar aviso"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default TopBanner;