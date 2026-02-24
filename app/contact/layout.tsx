import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kemel Bus | Contacto',
  description: 'Contáctanos para consultas, cotizaciones especiales o sugerencias. Nuestro equipo te responderá a la brevedad.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
