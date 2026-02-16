import { Truck, Map, ShieldCheck, Ticket } from 'lucide-react';

const Services = () => {
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
          <div>
            <h2 className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">Más que solo viajes</h2>
            <h3 className="text-5xl font-black mb-8 leading-tight">Soluciones integrales de transporte nacional.</h3>
            <p className="text-emerald-100/60 text-lg mb-10">
              Contamos con una logística avanzada que nos permite no solo mover personas, sino también conectar los negocios de nuestros clientes a través de nuestro servicio de carga.
            </p>
            <button className="border-b-2 border-emerald-500 pb-2 font-bold hover:text-emerald-400 transition-colors">
              Explorar convenios para empresas
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {serviceList.map((s, i) => (
              <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-emerald-500 mb-6">{s.icon}</div>
                <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
                <p className="text-emerald-100/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
