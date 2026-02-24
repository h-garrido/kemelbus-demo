import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Routes from '@/components/Routes';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Kemel Bus | Inicio',
  description: 'Conectamos Puerto Montt, Hornopirén y Chaitén con servicios de bus seguros y confiables en el corazón de la Patagonia Norte.',
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Routes />
      <Testimonials />
      <FAQ />
    </main>
  );
}