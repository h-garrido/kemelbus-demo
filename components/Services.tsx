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
    <section id="servicios" className="py-24 bg-emerald-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            ref={titleRef}
            className={`transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Más que solo viajes</h2>
            <h3 className="text-5xl font-black mb-8 leading-tight">Soluciones integrales de transporte nacional.</h3>
            <p className="text-emerald-100/60 text-lg mb-10">
              Contamos con una logística avanzada que nos permite no solo mover personas, sino también conectar los negocios de nuestros clientes a través de nuestro servicio de carga.
            </p>
            <button className="border-b-2 border-emerald-500 pb-2 font-bold hover:text-emerald-400 hover:border-emerald-400 transition-all duration-300 hover:translate-x-2">
              Explorar convenios para empresas
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div
              ref={card1Ref}
              className={`bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer group ${
                card1Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">{serviceList[0].icon}</div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">{serviceList[0].title}</h4>
              <p className="text-emerald-100/60 leading-relaxed">{serviceList[0].desc}</p>
            </div>
            
            <div
              ref={card2Ref}
              className={`bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-500 cursor-pointer group ${
                card2Visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-300">{serviceList[1].icon}</div>
              <h4 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">{serviceList[1].title}</h4>
              <p className="text-emerald-100/60 leading-relaxed">{serviceList[1].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

