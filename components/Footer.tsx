import Link from 'next/link';
import { Bus, Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Bus className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-black text-white uppercase italic">KemelBus</span>
            </div>
            <p className="text-sm text-emerald-200/60 leading-relaxed">
              Nos especializamos en mover personas, no solo vehículos. Tu seguridad y bienestar en cada trayecto son nuestra prioridad número uno.
            </p>
          </div>

          <div>
            <h4 className="text-emerald-400 font-bold mb-6 text-sm uppercase tracking-widest underline decoration-emerald-600 underline-offset-8">Servicios</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer">Traslado de Personal</li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer">Turismo y Giras</li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer">Transporte para Eventos</li>
              <li className="hover:text-white hover:translate-x-2 transition-all duration-200 cursor-pointer">Traslados Aeropuerto</li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-400 font-bold mb-6 text-sm uppercase tracking-widest underline decoration-emerald-600 underline-offset-8">Links Útiles</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-200">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-200">Nuestra Política de Seguridad</Link></li>
              <li><Link href="#" className="hover:text-white hover:translate-x-2 inline-block transition-all duration-200">Trabaja como Conductor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-400 font-bold mb-6 text-sm uppercase tracking-widest underline decoration-emerald-600 underline-offset-8">Central de Reservas</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-emerald-500" /> Santiago, RM - Chile
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-emerald-500" /> +56 9 1234 5678
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-emerald-500" /> reservas@translinea.cl
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} KemelBus Pasajeros Chile SpA.</p>
          <div className="flex gap-8">
            <Facebook size={20} className="hover:text-white hover:scale-125 transition-all duration-300 cursor-pointer" />
            <Instagram size={20} className="hover:text-white hover:scale-125 transition-all duration-300 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
