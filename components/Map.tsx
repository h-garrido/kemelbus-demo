import { MapPin, ExternalLink } from 'lucide-react';

const Map = () => {
  // Coordenadas aproximadas del Terminal Sur en Santiago, Chile
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.074780516629!2d-70.6811449!3d-33.4538889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c457f9227183%3A0x6b72a9e223b12345!2sTerminal%20Sur!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="map-card p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
            <div>
              <h3 className="route-region-title flex items-center gap-2">
                <MapPin className="icon-accent" /> Encuéntranos en el Terminal
              </h3>
              <p className="text-brand-muted text-sm mt-1">Av. Libertador Bernardo O'Higgins 3850, Estación Central.</p>
            </div>
            <a 
              href="https://maps.app.goo.gl/..." 
              target="_blank" 
              className="back-link-light mt-4 md:mt-0 text-sm flex items-center gap-2 underline"
            >
              Abrir en Google Maps
            </a>
          </div>

          {/* Contenedor del Mapa */}
          <div className="relative w-full h-[450px] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
            <iframe
              src={mapUrl}
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
