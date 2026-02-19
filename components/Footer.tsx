import Link from 'next/link';
import { Bus, Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Bus className="h-8 w-8 footer-brand-icon" />
              <span className="text-2xl font-black text-white">KemelBus</span>
            </div>
            <p className="footer-body">
              Nos especializamos en mover personas, no solo vehículos. Tu seguridad y bienestar en cada trayecto son nuestra prioridad número uno.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Servicios</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="footer-link">Traslado de Personal</li>
              <li className="footer-link">Turismo y Giras</li>
              <li className="footer-link">Transporte para Eventos</li>
              <li className="footer-link">Traslados Aeropuerto</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Links Útiles</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#" className="footer-link inline-block">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="footer-link inline-block">Nuestra Política de Seguridad</Link></li>
              <li><Link href="#" className="footer-link inline-block">Trabaja como Conductor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Central de Reservas</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="footer-icon" /> Santiago, RM - Chile
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="footer-icon" /> +56 9 1234 5678
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="footer-icon" /> reservas@kemelbus.cl
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} KemelBus Chile SpA.</p>
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
