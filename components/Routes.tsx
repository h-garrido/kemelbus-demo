import { MapPin, ArrowRight, Mountain, Palmtree, Waves } from 'lucide-react';

const destinations = [
  {
    region: "Zona Norte",
    cities: ["Antofagasta", "Iquique", "Calama", "Arica"],
    icon: <Palmtree className="text-orange-500" />,
    color: "border-orange-200 bg-orange-50"
  },
  {
    region: "Zona Central",
    cities: ["Santiago", "Viña del Mar", "Valparaíso", "Rancagua"],
    icon: <Waves className="text-blue-500" />,
    color: "border-blue-200 bg-blue-50"
  },
  {
    region: "Zona Sur",
    cities: ["Concepción", "Temuco", "Puerto Montt", "Pucón"],
    icon: <Mountain className="text-emerald-600" />,
    color: "border-emerald-200 bg-emerald-50"
  }
];

const Routes = () => {
  return (
    <section id="rutas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs mb-2">Cobertura Nacional</h2>
            <p className="text-4xl font-black text-emerald-950">Nuestros Destinos Principales</p>
          </div>
          <button className="flex items-center gap-2 text-emerald-700 font-bold hover:underline">
            Ver todas las paradas intermadias <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-3xl border-2 ${dest.color} transition-all hover:shadow-lg`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  {dest.icon}
                </div>
                <h3 className="text-2xl font-black text-emerald-950">{dest.region}</h3>
              </div>

              <ul className="space-y-4">
                {dest.cities.map((city, cIndex) => (
                  <li key={cIndex} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3 text-emerald-900 font-medium">
                      <MapPin size={16} className="text-emerald-500" />
                      {city}
                    </div>
                    <ArrowRight size={14} className="text-emerald-300 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-emerald-900/10">
                <p className="text-xs text-emerald-800/60 font-bold uppercase">Salidas diarias desde Terminal Sur</p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner de conectividad rápida */}
        <div className="mt-16 bg-emerald-950 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-2xl font-bold mb-2">¿Viajas desde Santiago?</h4>
            <p className="text-emerald-200/70">Salidas cada 30 minutos a los principales destinos del país.</p>
          </div>
          <div className="flex gap-4 relative z-10">
            <div className="text-center px-6 border-r border-emerald-800">
              <p className="text-3xl font-black text-emerald-400">45</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Terminales</p>
            </div>
            <div className="text-center px-6">
              <p className="text-3xl font-black text-emerald-400">120</p>
              <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Rutas Activas</p>
            </div>
          </div>
          {/* Decoración abstracta */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Routes;
