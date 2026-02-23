'use client';

import { useState } from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

const locations = [
  {
    id: 'puerto-montt',
    name: 'Terminal Puerto Montt',
    description: 'Oficina N°40, Terminal Municipal de Puerto Montt.',
    address: 'Av. Diego Portales 1001, Puerto Montt',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5027.402777454085!2d-72.94583660326745!3d-41.475844358431985!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96183bb236071c8f%3A0xe754f9e939fb411!2sTerminal%20Rodoviario%20de%20Buses%20de%20Puerto%20Montt!5e0!3m2!1ses!2sus!4v1771818672846!5m2!1ses!2sus',
    mapsLink: 'https://www.google.com/maps/place/Terminal+Rodoviario+de+Buses+de+Puerto+Montt/@-41.4758347,-72.9511363,17z/data=!4m14!1m7!3m6!1s0x96183bb236071c8f:0xe754f9e939fb411!2sTerminal+Rodoviario+de+Buses+de+Puerto+Montt!8m2!3d-41.4777311!4d-72.9503922!16s%2Fg%2F11clyt1rgm!3m5!1s0x96183bb236071c8f:0xe754f9e939fb411!8m2!3d-41.4777311!4d-72.9503922!16s%2Fg%2F11clyt1rgm?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'hornopiren',
    name: 'Terminal Hornopirén',
    description: 'Terminal de Buses de Hornopirén.',
    address: 'Hornopirén, Hualaihué, Los Lagos',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2966.591898303109!2d-72.4707!3d-41.9661!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96190e2cb875e759%3A0x530cdc97ca95f364!2sTerminal%20de%20Buses%2C%20Hornopir%C3%A9n!5e0!3m2!1ses-419!2scl!4v1771818845553!5m2!1ses-419!2scl',
    mapsLink: 'https://www.google.com/maps/place/Terminal+de+Buses,+Hornopir%C3%A9n/@-41.9661,-72.4707,17z/data=!4m14!1m7!3m6!1s0x96190e2cb875e759:0x530cdc97ca95f364!2sTerminal+de+Buses,+Hornopir%C3%A9n!8m2!3d-41.9659897!4d-72.4726247!16s%2Fg%2F11g6bl6myf!3m5!1s0x96190e2cb875e759:0x530cdc97ca95f364!8m2!3d-41.9659897!4d-72.4726247!16s%2Fg%2F11g6bl6myf?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: 'chaiten',
    name: 'Agencia Chaitén',
    description: 'Green Patagonia Travel — Agencia Kemelbus en Chaitén.',
    address: 'Frente Copec, Carretera Austral, Chaitén',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2921.8881429741873!2d-72.7124!3d-42.9174!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961f1d57a71aacaf%3A0x3c31014604d6d82f!2sGreen%20Patagonia%20Travel!5e0!3m2!1ses-419!2scl!4v1771818926716!5m2!1ses-419!2scl',
    mapsLink: 'https://www.google.com/maps/place/Green+Patagonia+Travel/@-42.9174,-72.7124,17z/data=!4m14!1m7!3m6!1s0x961f1d57a71aacaf:0x3c31014604d6d82f!2sGreen+Patagonia+Travel!8m2!3d-42.9174472!4d-72.7124525!16s%2Fg%2F11f3wsgm87!3m5!1s0x961f1d57a71aacaf:0x3c31014604d6d82f!8m2!3d-42.9174472!4d-72.7124525!16s%2Fg%2F11f3wsgm87?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D',
  },
];

const Map = () => {
  const [activeId, setActiveId] = useState('puerto-montt');
  const active = locations.find(l => l.id === activeId)!;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="map-card p-4 md:p-8">

          {/* Selector de ubicación */}
          <div className="flex flex-wrap gap-2 mb-6 px-4">
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setActiveId(loc.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeId === loc.id
                    ? 'floor-btn-active'
                    : 'floor-btn-inactive bg-gray-100'
                }`}
              >
                <MapPin className="w-4 h-4" />
                {loc.name}
              </button>
            ))}
          </div>

          {/* Info de la ubicación activa */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4">
            <div>
              <h3 className="route-region-title flex items-center gap-2">
                <MapPin className="icon-accent" /> {active.name}
              </h3>
              <p className="text-brand-muted text-sm mt-1">{active.description}</p>
              <p className="text-brand-muted text-xs mt-0.5">{active.address}</p>
            </div>
            <a
              href={active.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="back-link-light mt-4 md:mt-0 text-sm flex items-center gap-2 underline"
            >
              <ExternalLink className="w-4 h-4" />
              Abrir en Google Maps
            </a>
          </div>

          {/* Contenedor del Mapa */}
          <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
            <iframe
              key={active.id}
              src={active.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Map;
