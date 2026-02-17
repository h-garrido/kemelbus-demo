"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Bus, Phone, MapPin, Users, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicio" },
    { name: "Nuestra Flota", href: "/flota" },
    { name: "Contacto", href: "/contact" },
  ];

  const { cart } = useCart();

  return (
    <header className="sticky top-0 w-full z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-emerald-950 text-emerald-50 py-2 px-6 hidden md:flex justify-between items-center text-xs">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-emerald-400" /> +56 2 2345 6789
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} className="text-emerald-400" /> Traslado de
            Personal y Turismo
          </span>
        </div>
        <div className="font-semibold tracking-wide uppercase">
          Servicio Profesional de Transporte de Pasajeros
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-emerald-700 p-2 rounded-full">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-extrabold text-emerald-950 tracking-tighter uppercase">
                  Kemel<span className="text-emerald-600">Bus</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-emerald-950 hover:text-emerald-600 font-bold transition-colors text-sm uppercase"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#reserva"
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full hover:bg-emerald-700 transition-all font-bold shadow-md"
              >
                RESERVAR VIAJE
              </Link>
              <Link
                href="/checkout"
                className="relative p-2 text-emerald-950 hover:text-emerald-600"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-emerald-950"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3 px-4 text-emerald-950 font-bold hover:bg-emerald-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
