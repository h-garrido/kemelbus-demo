import Hero from '@/components/Hero';
import SeatPicker from '@/components/SeatPicker';
import Services from '@/components/Services';
import Routes from '@/components/Routes';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Routes />
      <Testimonials />
      <FAQ />
      {/* Sección final de FAQ o Llamado a la acción */}
      <section className="py-24 bg-gray-50 text-center">
        <h2 className="text-3xl font-black text-emerald-950 mb-4">¿Tienes dudas sobre tu viaje?</h2>
        <p className="text-gray-600 mb-8">Estamos disponibles 24/7 para ayudarte con tu reserva.</p>
        <button className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all">
          Centro de Ayuda
        </button>
      </section>
    </main>
  );
}