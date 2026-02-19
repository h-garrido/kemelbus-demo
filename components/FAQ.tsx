"use client";
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-faq-bg py-24">
      <div className="max-w-3xl mx-auto px-6">
        
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="faq-icon-wrapper">
            <HelpCircle size={24} />
          </div>
          <h2 className="section-title mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-primary">Todo lo que necesitas saber antes de subir al bus.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const { ref, isVisible } = useScrollReveal();
            
            return (
              <div 
                key={index}
                ref={ref}
                className={`card-faq ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="faq-btn"
                >
                <span className="faq-question">{faq.question}</span>
                <ChevronDown 
                  size={20} 
                  className={`icon-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="faq-answer">
                  {faq.answer}
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="cta-contact-box mt-12">
          <p className="text-sm">¿No encuentras lo que buscas?</p>
          <button className="cta-link">
            Habla con un ejecutivo por WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
