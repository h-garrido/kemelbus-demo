import { Users, Wind, Monitor, Coffee, Check } from 'lucide-react';

const fleetDetails = [
  {
    type: "Premium Suite",
    seats: "Salón Cama 180°",
    description: "Máximo descanso en el primer piso. Asientos de cuero totalmente reclinables.",
    amenities: ["Cargador USB", "Manta y Almohada", "Cenas abordo"],
  },
  {
    type: "Ejecutivo",
    seats: "Semi Cama",
    description: "Ubicados en el segundo piso con vista panorámica y climatización controlada.",
    amenities: ["WiFi Gratis", "Reposapiés", "Baño Químico"],
  }
];

const Fleet = () => {
  return (
    <section id="flota" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-emerald-600 font-bold tracking-[0.2em] uppercase text-sm mb-4">Nuestra Flota</h2>
          <p className="text-4xl md:text-5xl font-black text-emerald-950">Tecnología de Doble Piso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {fleetDetails.map((item, idx) => (
            <div key={idx} className="bg-emerald-50 rounded-[2rem] p-8 md:p-12 border border-emerald-100 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-black text-emerald-950">{item.type}</h3>
                  <p className="text-emerald-600 font-bold">{item.seats}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-emerald-700">
                  {idx === 0 ? <Coffee size={32} /> : <Monitor size={32} />}
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">{item.description}</p>
              
              <ul className="grid grid-cols-1 gap-4 mb-8">
                {item.amenities.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-emerald-900 font-medium bg-white/50 p-3 rounded-lg">
                    <Check size={18} className="text-emerald-500" /> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="h-48 bg-emerald-200 rounded-2xl flex items-center justify-center text-emerald-800 italic font-medium overflow-hidden">
                {/* Aquí pondrías una foto real del interior del bus */}
                [ Foto Interior {item.type} ]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
