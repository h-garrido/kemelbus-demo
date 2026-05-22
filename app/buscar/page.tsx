import { getAvailableServices, getCities } from '@/app/db/services';
import BusResultsList from '@/components/BusResultsList';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    origen?: string;
    destino?: string;
    fecha?: string;
  }>;
}

export default async function BuscarPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { origen, destino, fecha } = params;

  if (!origen || !destino || !fecha) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <p className="hero-subtitle mb-4">Parámetros de búsqueda inválidos o faltantes</p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">
            Volver al inicio
          </Link>
        </section>
      </div>
    );
  }

  // Cargar datos concurrentemente en el servidor
  const [cities, availableServices] = await Promise.all([
    getCities(),
    getAvailableServices(origen, destino, fecha),
  ]);

  const originCity = cities.find((c) => c.id === origen);
  const destCity = cities.find((c) => c.id === destino);

  const originName = originCity?.name || 'Origen';
  const destinationName = destCity?.name || 'Destino';

  return (
    <BusResultsList
      services={availableServices}
      origen={origen}
      destino={destino}
      fecha={fecha}
      originName={originName}
      destinationName={destinationName}
    />
  );
}
