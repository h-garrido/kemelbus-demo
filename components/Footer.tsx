import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';
import logo from '@/app/assets/img/LOGO-OFICIAL.png';

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <Image
                src={logo}
                alt="KemelBus"
                style={{ height: '116px', width: 'auto' }}
                className="object-contain"
              />
            </div>
            <p className="footer-body">
              Conectamos Puerto Montt, Hornopirén y Chaitén con servicios de bus seguros y confiables en el corazón de la Patagonia Norte.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Rutas</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="footer-link">Puerto Montt → Hornopirén</li>
              <li className="footer-link">Puerto Montt → Chaitén</li>
              <li className="footer-link">Hornopirén → Chaitén</li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Links Útiles</h4>
            <ul className="space-y-3 text-sm">
              {/* <li><Link href="#" className="footer-link inline-block">Preguntas Frecuentes</Link></li> */}
              <li><Link href="#" className="footer-link inline-block">Nuestra Política de Seguridad</Link></li>
              <li><Link href="#" className="footer-link inline-block">Trabaja como Conductor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Oficinas de Venta</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={18} className="footer-icon mt-0.5 shrink-0" /> Puerto Montt — Terminal Municipal, Of. N°40
              </p>
              <p className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={18} className="footer-icon mt-0.5 shrink-0" /> Hornopirén — Terminal Municipal, Oficina N°03
              </p>
              <p className="flex items-start justify-center md:justify-start gap-3">
                <MapPin size={18} className="footer-icon mt-0.5 shrink-0" /> Chaitén — Agencia Green Patagonia Travel (Frente Copec)
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="footer-icon" /> +56 2 2987 6543
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="footer-icon" /> reservas@kemelbus.cl
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} BGS Projects SpA.</p>
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
