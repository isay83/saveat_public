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
import { useEffect, useState } from "react";
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

  // --- INICIO DE CORRECCIÓN ---
  // En lugar de crear un objeto, seleccionamos cada
  // valor del store de forma individual.
  // Esto rompe el bucle de renderizado infinito.
  const addItemToApi = useCartStore((state) => state.addItemToApi);
  const items = useCartStore((state) => state.items);
  const usage = useCartStore((state) => state.usage);
  // --- FIN DE CORRECCIÓN ---

  // Encontramos la cantidad *actual* de este item en el carrito
  const itemInCart = items.find((item) => item._id === product._id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  // Estado local para el selector de cantidad
  // Inicia con la cantidad del carrito si ya existe
  const [quantity, setQuantity] = useState(
    quantityInCart > 0 ? quantityInCart : 1
  );
  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza el estado local si el carrito cambia (ej. al recargar)
  useEffect(() => {
    setQuantity(quantityInCart > 0 ? quantityInCart : 1);
  }, [quantityInCart]);

  // --- LÓGICA DE BLOQUEO (BUG 2) ---

  // Límite restante *sin* contar este producto
  // Usamos 'usage.used' que ya incluye el carrito, pero le restamos
  // lo que *ya* está en el carrito de este item para no contarlo doble
  const usedExcludingThis = usage.used - quantityInCart;

  // El máximo que el usuario puede *seleccionar* en el contador
  const maxAllowedByLimit = usage.limit - usedExcludingThis;

  // El máximo real es el menor entre el stock y el límite
  // (Aseguramos que no sea negativo si el límite ya se excedió)
  const maxQuantity = Math.max(
    0,
    Math.min(product.quantity_available, maxAllowedByLimit)
  );

  // ¿Está el botón de "Añadir" deshabilitado?
  const isAddDisabled =
    isLoading ||
    quantity > maxQuantity || // No puede añadir más de lo permitido/disponible
    (quantity === 0 && quantityInCart === 0) || // No puede añadir 0
    (usage.limit > 0 && usage.remaining <= 0 && quantityInCart === 0); // Ya alcanzó el límite y no tiene este item

  // Funciones para el contador
  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => {
      const newQuantity = prev + amount;
      // Permite 0 para eliminar
      if (newQuantity < 0) return 0;
      if (newQuantity > maxQuantity) return maxQuantity;
      return newQuantity;
    });
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // 1. Llama a la función del store
      // Esta función se encargará de llamar a la API y actualizar el estado
      await addItemToApi(product, quantity);

      if (quantity > quantityInCart) {
        toast.success(`${product.name} actualizado en el carrito.`);
      } else if (quantity === 0) {
        toast.info(`${product.name} eliminado del carrito.`);
        setQuantity(1); // Resetea el contador a 1
      } else {
        toast.info(`${product.name} actualizado.`);
      }
    } catch (error) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (axiosError.response?.status === 401) {
        toast.warning("Por favor, inicia sesión para añadir productos.");
        router.push("/login");
      } else {
        // Muestra el error de la API (ej. "Límite diario excedido")
        toast.error(
          axiosError.response?.data?.message || "No se pudo añadir el producto."
        );
        // Resetea la cantidad a lo que está en el carrito
        setQuantity(quantityInCart > 0 ? quantityInCart : 1);
      }
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
        {/* Muestra si el límite está alcanzado */}
        {usage.limit > 0 && maxQuantity === 0 && quantityInCart === 0 && (
          <p className="text-sm text-red-600 font-medium pt-1">
            Límite diario alcanzado
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-center w-full gap-2">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            className="w-16 text-center"
            value={quantity}
            readOnly
            onChange={(e) => {
              // <-- Esta lógica es un fallback
              let val = parseInt(e.target.value, 10);
              if (isNaN(val) || val < 0) val = 0;
              if (val > maxQuantity) val = maxQuantity;
              setQuantity(val);
            }}
          />
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
            disabled={
              quantity >= product.quantity_available || quantity >= maxQuantity
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          className="w-full bg-green-700 hover:bg-green-800 cursor-pointer"
          onClick={handleAddToCart}
          disabled={isAddDisabled || quantity === quantityInCart} // Deshabilitar si no hay stock
        >
          {isLoading
            ? "Actualizando..."
            : quantity === 0 && quantityInCart > 0
            ? "Eliminar del carrito"
            : quantityInCart > 0 && quantity !== quantityInCart
            ? "Actualizar cantidad"
            : quantityInCart > 0
            ? "En el carrito"
            : "Añadir al Carrito"}
        </Button>
      </CardFooter>
    </Card>
  );
}
