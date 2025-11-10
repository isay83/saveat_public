import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Este layout envolverá a todas las páginas dentro de la carpeta (main)
// Ej: /tienda, /carrito, /perfil
export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
