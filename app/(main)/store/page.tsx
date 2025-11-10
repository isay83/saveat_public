import type { Metadata } from "next";
import ProductList from "@/features/products/ProductList";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Explora todos los productos disponibles en Saveat.",
};

// Esta página usa el layout de (main), por lo que tendrá el Navbar y Footer
export default function TiendaPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Pasamos los searchParams (para filtros/búsqueda futura)
  // Usamos Suspense para mostrar un 'fallback' mientras se cargan los productos
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Tienda</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductList searchParams={searchParams ?? {}} />
      </Suspense>
    </div>
  );
}

// Un Skeleton simple para el 'fallback' de Suspense
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg h-96 animate-pulse"
          ></div>
        ))}
    </div>
  );
}
