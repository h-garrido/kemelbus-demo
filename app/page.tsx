import Hero from '@/components/Hero';
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
      <section className="section-gray-bg py-24 text-center">
        <h2 className="section-title mb-4">¿Tienes dudas sobre tu viaje?</h2>
        <p className="text-gray-600 mb-8">Estamos disponibles 24/7 para ayudarte con tu reserva.</p>
        <button className="btn-primary px-10 py-4">
          Centro de Ayuda
        </button>
      </section>
    </main>
  );
}