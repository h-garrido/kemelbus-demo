"use client";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";
import Map from "@/components/Map";

export default function ContactoPage() {
  return (
    <div className="bg-white">
      {/* Hero Simple para Contacto */}
      <section className="bg-emerald-950 pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic">
          Estamos para <span className="text-emerald-500">ayudarte</span>
        </h1>
        <p className="text-emerald-100/70 max-w-2xl mx-auto">
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
              <h2 className="text-2xl font-black text-emerald-950 mb-6">
                Canales Oficiales
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">
                      Call Center 24/7
                    </p>
                    <p className="text-gray-600 text-sm">+56 2 2987 6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">
                      Correo Electrónico
                    </p>
                    <p className="text-gray-600 text-sm">
                      contacto@translinea.cl
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">
                      Oficina Central
                    </p>
                    <p className="text-gray-600 text-sm">
                      Terminal Sur, Oficina 45, Estación Central, RM.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">
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
            <div className="bg-emerald-900 p-8 rounded-3xl text-white">
              <MessageSquare className="mb-4 text-emerald-400" size={32} />
              <h3 className="text-xl font-bold mb-2">¿Buscas tu pasaje?</h3>
              <p className="text-emerald-100/70 text-sm mb-6">
                Puedes descargar tu pasaje electrónico directamente con tu RUT y
                número de orden.
              </p>
              <button className="w-full bg-emerald-500 py-3 rounded-xl font-bold text-emerald-950 hover:bg-emerald-400 transition-colors">
                Ir a Mis Pasajes
              </button>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="juan@correo.com"
                      className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Motivo del Contacto
                  </label>
                  <select className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white">
                    <option>Información de Pasajes</option>
                    <option>Cotización Viaje Especial</option>
                    <option>Problemas con mi Equipaje</option>
                    <option>Felicitaciones o Sugerencias</option>
                    <option>Otros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-emerald-600 text-white px-12 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10"
                >
                  ENVIAR MENSAJE <Send size={18} />
                </button>
              </form>
            </div>
          </div>
          {/* Añadimos el mapa al final */}
          <Map />

          {/* Sección de cierre opcional */}
          <section className="pb-20 text-center">
            <p className="text-gray-400 text-sm italic">
              * Para objetos perdidos en el bus, por favor adjunta tu número de
              pasaje en el formulario.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}

