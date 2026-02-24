import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kemel Bus | Buscar Pasajes',
  description: 'Busca y compara disponibilidad de pasajes en las rutas Puerto Montt, Hornopirén y Chaitén.',
};

export default function BuscarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
