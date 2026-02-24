import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kemel Bus | Seleccionar Asiento',
  description: 'Elige tu asiento preferido y agrega tu pasaje al carrito.',
};

export default function SeleccionarAsientoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
