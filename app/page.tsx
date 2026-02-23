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
    </main>
  );
}