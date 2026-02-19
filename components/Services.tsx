'use client';

import { Truck, Map, ShieldCheck, Ticket } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Services = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  const { ref: card1Ref, isVisible: card1Visible } = useScrollReveal();
  const { ref: card2Ref, isVisible: card2Visible } = useScrollReveal();

  const serviceList = [
    {
      title: "Rutas Interregionales",
      desc: "Salidas diarias desde los principales terminales de Chile hacia el Norte y Sur.",
      icon: <Map className="w-10 h-10" />
    },
    {
      title: "Cargo & Encomiendas",
      desc: "Envío de paquetes y documentos a todo el país con entrega en 24 horas.",
      icon: <Truck className="w-10 h-10" />
    }
  ];

  return (
    <section id="servicios" className="section-dark-bg py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="section-label-dark mb-4">Más que solo viajes</h2>
            <h3 className="text-5xl font-black mb-8 leading-tight">Soluciones integrales de transporte nacional.</h3>
            <p className="hero-subtitle text-lg mb-10">
              Contamos con una logística avanzada que nos permite no solo mover personas, sino también conectar los negocios de nuestros clientes a través de nuestro servicio de carga.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div
              ref={card1Ref}
              className={`card-service-dark group ${
                card1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="icon-accent mb-6 group-hover:scale-110 transition-transform duration-300">{serviceList[0].icon}</div>
              <h4 className="card-service-title">{serviceList[0].title}</h4>
              <p className="card-service-body">{serviceList[0].desc}</p>
            </div>
            
            <div
              ref={card2Ref}
              className={`card-service-dark group ${
                card2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="icon-accent mb-6 group-hover:scale-110 transition-transform duration-300">{serviceList[1].icon}</div>
              <h4 className="card-service-title">{serviceList[1].title}</h4>
              <p className="card-service-body">{serviceList[1].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

