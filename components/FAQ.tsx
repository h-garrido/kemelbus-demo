"use client";
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "¿Con cuánta anticipación debo llegar al terminal?",
    answer: "Recomendamos llegar al menos 30 minutos antes de la hora de salida programada para el embarque y chequeo de equipaje en los andenes correspondientes."
  },
  {
    question: "¿Cuál es la política de equipaje permitido?",
    answer: "Cada pasajero tiene derecho a transportar hasta 30 kilos de equipaje sin costo, distribuidos en un máximo de dos bultos que quepan en el maletero del bus. El equipaje de mano debe ser pequeño y no obstruir el tránsito."
  },
  {
    question: "¿Puedo anular o cambiar mi pasaje?",
    answer: "Sí. De acuerdo a la normativa chilena, puedes anular tu pasaje con un mínimo de 4 horas de anticipación a la salida del bus, obteniendo una devolución del 85% del valor pagado."
  },
  {
    question: "¿Se permite el viaje con mascotas?",
    answer: "Por seguridad de todos los pasajeros, solo se permite el transporte de animales de asistencia debidamente certificados. Para mascotas pequeñas, consulta la disponibilidad de servicios especiales de carga climatizada."
  },
  {
    question: "¿Los niños pagan pasaje?",
    answer: "Niños menores de 5 años que no ocupen asiento viajan gratis. A partir de los 5 años deben pagar pasaje completo y ocupan su propio asiento con cinturón de seguridad."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-200">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <HelpCircle size={24} />
          </div>
          <h2 className="text-4xl font-black text-emerald-950 mb-4">Preguntas Frecuentes</h2>
          <p className="text-emerald-900/60 font-medium">Todo lo que necesitas saber antes de subir al bus.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button 
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-emerald-50/30 transition-colors"
              >
                <span className="font-bold text-emerald-950 pr-8">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`text-emerald-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 text-sm leading-relaxed border-t border-emerald-50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-emerald-950 rounded-2xl text-center text-white">
          <p className="text-sm">¿No encuentras lo que buscas?</p>
          <button className="mt-2 text-emerald-400 font-bold hover:text-emerald-300 transition-colors underline underline-offset-4">
            Habla con un ejecutivo por WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
