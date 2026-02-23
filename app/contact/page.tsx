"use client";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";
import Map from "@/components/Map";

export default function ContactoPage() {
  return (
    <div className="page-white">
      {/* Hero Simple para Contacto */}
      <section className="section-hero pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic animate-[fadeInUp_0.6s_ease-out]">
          Estamos para <span className="hero-accent">ayudarte</span>
        </h1>
        <p className="hero-subtitle max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
          ¿Tienes dudas sobre tu viaje, necesitas una cotización especial o
          quieres dejarnos una sugerencia? Nuestro equipo te responderá a la
          brevedad.
        </p>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Columna de Información de Contacto */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="route-region-title mb-6">
                Canales Oficiales
              </h2>
              <div className="space-y-6">
                <div className="contact-channel-item">
                  <div className="contact-icon-wrapper p-3">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">
                      Call Center 24/7
                    </p>
                    <p className="text-gray-600 text-sm">+56 2 2987 6543</p>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="contact-icon-wrapper p-3">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">
                      Correo Electrónico
                    </p>
                    <p className="text-gray-600 text-sm">
                      contacto@kemelbus.cl
                    </p>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="contact-icon-wrapper p-3">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">Oficinas de Venta</p>
                    <p className="text-gray-600 text-sm">
                      Puerto Montt: Terminal Municipal, Of. N°40<br />
                      Hornopirén: Terminal Municipal, Of. N°03<br />
                      Chaitén: Agencia Green Patagonia Travel (Frente Copec)
                    </p>
                  </div>
                </div>

                <div className="contact-channel-item">
                  <div className="contact-icon-wrapper p-3">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-brand-dark">
                      Horario de Atención
                    </p>
                    <p className="text-gray-600 text-sm">
                      Lunes a Domingo: 06:00 - 23:59
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner de Ayuda Rápida */}
            <div className="help-banner p-8">
              <MessageSquare className="help-banner-icon mb-4 animate-pulse" size={32} />
              <h3 className="text-xl font-bold mb-2">¿Buscas tu pasaje?</h3>
              <p className="hero-subtitle text-sm mb-6">
                Puedes descargar tu pasaje electrónico directamente con tu RUT y
                número de orden.
              </p>
              <button className="help-banner-btn w-full py-3">
                Ir a Mis Pasajes
              </button>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:col-span-2">
            <div className="contact-form-card p-8 md:p-12">
              <h2 className="section-title mb-2">Escríbenos</h2>
              <p className="text-gray-600 mb-8">Completa el formulario y te responderemos a la brevedad.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <label className="form-label">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      required
                      className="input-form w-full p-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="form-label">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      placeholder="juan@correo.com"
                      required
                      className="input-form w-full p-4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="form-label">
                    Motivo del Contacto *
                  </label>
                  <select 
                    required
                    className="input-form w-full p-4 cursor-pointer"
                  >
                    <option>Información de Pasajes</option>
                    <option>Cotización Viaje Especial</option>
                    <option>Problemas con mi Equipaje</option>
                    <option>Felicitaciones o Sugerencias</option>
                    <option>Otros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="form-label">
                    Mensaje *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    required
                    className="input-form w-full p-4 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto px-12 py-5 flex items-center justify-center gap-3"
                >
                  ENVIAR MENSAJE <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
          {/* Añadimos el mapa al final */}
          <div className="lg:col-span-3">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}

