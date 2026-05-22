import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KemelBus | Venta de Pasajes de Bus en Chile",
  description: "Compra tus pasajes de bus en KemelBus de forma rápida y segura. Viaja a las principales ciudades de Chile con la mayor comodidad, seguridad y el mejor servicio a bordo.",
  keywords: ["KemelBus", "pasajes de bus", "buses Chile", "viajar en bus", "compra de pasajes", "viajes chile", "buses del sur"],
  authors: [{ name: "KemelBus" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased font-sans">
        {/* <TopBanner /> */}
        <CartProvider>
          <Navbar />
          {/* 'children' representa el contenido de tu page.tsx */}
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
