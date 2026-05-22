import { getServiceDetails, getSeats, getRouteById, getRouteFares } from "@/app/db/services";
import SeatSelectionView from "@/components/SeatSelectionView";
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{
    servicio?: string;
    origen?: string;
    destino?: string;
    fecha?: string;
  }>;
}

export default async function SeleccionarAsientoPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const serviceId = params.servicio;
  const origenParam = params.origen;
  const destinoParam = params.destino;
  const fechaParam = params.fecha;

  const backUrl =
    origenParam && destinoParam && fechaParam
      ? `/buscar?origen=${origenParam}&destino=${destinoParam}&fecha=${fechaParam}`
      : '/buscar';

  if (!serviceId) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <p className="hero-subtitle mb-4">Servicio no especificado</p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">Volver al inicio</Link>
        </section>
      </div>
    );
  }

  const service = await getServiceDetails(serviceId);
  if (!service) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <p className="hero-subtitle mb-4">Servicio no encontrado</p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">Volver al inicio</Link>
        </section>
      </div>
    );
  }

  const [route, fares, seats] = await Promise.all([
    getRouteById(service.route_id),
    getRouteFares(service.route_id),
    getSeats(serviceId),
  ]);

  if (!route) {
    return (
      <div className="page-white min-h-screen">
        <section className="section-hero pt-32 pb-20 px-6 text-center">
          <p className="hero-subtitle mb-4">Ruta no encontrada</p>
          <Link href="/" className="btn-primary inline-block px-8 py-3">Volver al inicio</Link>
        </section>
      </div>
    );
  }

  return (
    <SeatSelectionView
      serviceId={serviceId}
      service={service}
      route={route}
      fares={fares}
      initialSeats={seats}
      backUrl={backUrl}
    />
  );
}
