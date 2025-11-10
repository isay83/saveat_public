"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore"; // Importa el store
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Tipo (simplificado, puedes expandirlo)
type Product = {
  _id: string;
  name: string;
  price: number;
  unit: string;
  quantity_available: number;
  image_url?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();

  // Obtenemos la función para añadir del store (que crearemos)
  const addItemToApi = useCartStore((state) => state.addItemToApi);

  const handleAddToCart = async () => {
    try {
      // 1. Llama a la función del store
      // Esta función se encargará de llamar a la API y actualizar el estado
      await addItemToApi(product);

      toast.success(`${product.name} se añadió a tu carrito.`);
    } catch (error: unknown) {
      // Hacemos una comprobación de tipo
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          // Si el error es 401 (No autorizado)
          toast.warning("Por favor, inicia sesión para añadir productos.");
          router.push("/login");
          return;
        }
      }

      // Error genérico
      toast.error("No se pudo añadir el producto. Intenta de nuevo.");
      console.error(error); // Logueamos el error completo
    }
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="p-0">
        <Image
          src={
            product.image_url ||
            "https://placehold.co/300x200/a3e635/14532d?text=Saveat"
          }
          alt={product.name}
          className="rounded-t-lg object-cover h-48 w-full"
          width={300}
          height={200}
        />
        <div className="p-4">
          <CardTitle className="text-lg h-14">{product.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-2xl font-bold text-green-700">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          {product.unit} | Quedan: {product.quantity_available}
        </p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className="w-full bg-green-700 hover:bg-green-800"
          onClick={handleAddToCart}
          disabled={product.quantity_available === 0} // Deshabilitar si no hay stock
        >
          {product.quantity_available === 0 ? "Agotado" : "Añadir al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
}
