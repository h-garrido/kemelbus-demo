import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kemel Bus | Checkout',
  description: 'Completa los datos de tus pasajeros y finaliza tu reserva de forma segura.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
