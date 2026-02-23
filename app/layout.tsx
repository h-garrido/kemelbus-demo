import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/context/CartContext";

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
