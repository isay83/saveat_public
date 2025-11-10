import api from "@/lib/api";
import ProductCard from "@/features/products/ProductCard";

// Tipo para el producto (debe coincidir con la API)
interface Product {
  _id: string;
  name: string;
  price: number;
  unit: string;
  quantity_available: number;
  image_url?: string;
}

// Tipo para los searchParams de Next.js
interface SearchParams {
  [key: string]: string | string[] | undefined;
}

// Este es un Server Component que hace el fetch de datos
async function getProducts(searchParams: SearchParams) {
  try {
    // Aquí puedes construir los params para la API (ej. /products?search=...&category=...)
    const { data } = await api.get("/products", {
      params: {
        search: searchParams?.search,
        category: searchParams?.category,
        page: searchParams?.page,
      },
    });
    return data.products; // Basado en tu API
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
}

// Este es el componente que renderiza la lista
export default async function ProductList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products: Product[] = await getProducts(searchParams);

  if (products.length === 0) {
    return <p>No hay productos disponibles por el momento.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
