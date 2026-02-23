"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Users, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import logo from "@/app/assets/img/LOGO-OFICIAL.png";

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
      <div className="topbar-bg py-2 px-6 hidden md:flex justify-between items-center text-xs">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <Phone size={14} className="topbar-icon" /> +56 2 2987 6543
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} className="topbar-icon" /> Puerto Montt · Hornopirén · Chaitén
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="navbar-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  alt="KemelBus"
                  style={{ height: '116px', width: 'auto' }}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="navbar-link relative group"
                >
                  {link.name}
                  <span className="navbar-link-indicator group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/#reserva"
                className="btn-primary px-6 py-2.5 shadow-md"
              >
                RESERVAR VIAJE
              </Link>
              <Link
                href="/checkout"
                className="icon-nav-link relative p-2 group"
              >
                <ShoppingCart size={24} className="group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="badge-cart absolute -top-1 -right-1 flex items-center justify-center animate-[bounce_1s_ease-in-out_3]">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="icon-nav-link"
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
                className="mobile-nav-link"
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
