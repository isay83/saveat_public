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
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Para feedback visual

  // Obtenemos la función para añadir del store (que crearemos)
  const addItemToApi = useCartStore((state) => state.addItemToApi);

  // Funciones para el contador
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      // No permite bajar de 1 ni subir más del stock disponible
      if (newQuantity < 1) return 1;
      if (newQuantity > product.quantity_available)
        return product.quantity_available;
      return newQuantity;
    });
  };

  const handleAddToCart = async () => {
    try {
      // 1. Llama a la función del store
      // Esta función se encargará de llamar a la API y actualizar el estado
      await addItemToApi(product, quantity);

      toast.success(`${quantity} x ${product.name} se añadió a tu carrito.`);
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
    } finally {
      setIsLoading(false);
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
          loading="eager"
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
      <CardFooter className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-center w-full gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            className="w-16 text-center"
            value={quantity}
            readOnly
            onChange={(e) => {
              // Manejo manual por si escriben
              let val = parseInt(e.target.value, 10);
              if (isNaN(val) || val < 1) val = 1;
              if (val > product.quantity_available)
                val = product.quantity_available;
              setQuantity(val);
            }}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.quantity_available}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full bg-green-700 hover:bg-green-800"
          onClick={handleAddToCart}
          disabled={product.quantity_available === 0 || isLoading} // Deshabilitar si no hay stock
        >
          {isLoading
            ? "Añadiendo..."
            : product.quantity_available === 0
            ? "Agotado"
            : `Añadir ${quantity} al Carrito`}
        </Button>
      </CardFooter>
    </Card>
  );
}
