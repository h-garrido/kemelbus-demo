"use client";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";
import Map from "@/components/Map";

export default function ContactoPage() {
  return (
    <div className="bg-white">
      {/* Hero Simple para Contacto */}
      <section className="bg-emerald-950 pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 italic animate-[fadeInUp_0.6s_ease-out]">
          Estamos para <span className="text-emerald-500">ayudarte</span>
        </h1>
        <p className="text-emerald-100/70 max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out]">
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
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-950">
                      Call Center 24/7
                    </p>
                    <p className="text-gray-600 text-sm">+56 2 2987 6543</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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

                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-emerald-50 transition-all cursor-pointer group">
                  <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
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
            <div className="bg-emerald-900 p-8 rounded-3xl text-white shadow-xl">
              <MessageSquare className="mb-4 text-emerald-400 animate-pulse" size={32} />
              <h3 className="text-xl font-bold mb-2">¿Buscas tu pasaje?</h3>
              <p className="text-emerald-100/70 text-sm mb-6">
                Puedes descargar tu pasaje electrónico directamente con tu RUT y
                número de orden.
              </p>
              <button className="w-full bg-emerald-500 py-3 rounded-xl font-bold text-emerald-950 hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg">
                Ir a Mis Pasajes
              </button>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-emerald-100 shadow-xl">
              <h2 className="text-3xl font-black text-emerald-950 mb-2">Escríbenos</h2>
              <p className="text-gray-600 mb-8">Completa el formulario y te responderemos a la brevedad.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Juan Pérez"
                      required
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      placeholder="juan@correo.com"
                      required
                      className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                    Motivo del Contacto *
                  </label>
                  <select 
                    required
                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all cursor-pointer text-gray-700"
                  >
                    <option>Información de Pasajes</option>
                    <option>Cotización Viaje Especial</option>
                    <option>Problemas con mi Equipaje</option>
                    <option>Felicitaciones o Sugerencias</option>
                    <option>Otros</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-emerald-950 uppercase tracking-wide">
                    Mensaje *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    required
                    className="w-full p-4 rounded-xl bg-gray-50 border-2 border-gray-200 hover:border-emerald-300 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none placeholder:text-gray-400"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto bg-emerald-600 text-white px-12 py-5 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
                >
                  ENVIAR MENSAJE <Send size={18} className="group-hover:translate-x-1 transition-transform" />
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

