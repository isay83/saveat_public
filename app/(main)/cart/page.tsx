"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Importamos 'sonner' para notificaciones

export default function CartPage() {
  const { items, syncCartWithApi, removeItemFromApi, isInitialized } =
    useCartStore();
  const router = useRouter();

  // Sincronizar con el backend al cargar la página
  useEffect(() => {
    // --- CORRECCIÓN 5: Llamamos a la función de sincronización ---
    // Solo sincroniza si no se ha inicializado ya (ej. en el Navbar)
    if (!isInitialized) {
      syncCartWithApi();
    }
  }, [isInitialized, syncCartWithApi]); // Depende de la función del store

  const handleRemove = async (productId: string) => {
    try {
      // 1. Eliminar del backend (devuelve el stock)
      await removeItemFromApi(productId);
      toast.info("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar", error);
      toast.error("No se pudo eliminar el producto");
    }
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
      {/* Mostramos un loader simple mientras se inicializa/sincroniza */}
      {!isInitialized ? (
        <p>Cargando carrito...</p>
      ) : items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-4 p-4 border rounded-lg"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div>
                <p className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(item._id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
          <div className="text-right text-2xl font-bold mt-6">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              className="bg-green-700 hover:bg-green-800 text-lg px-8 py-4"
              onClick={() => router.push("/checkout")} // Ir a Pagar
            >
              Proceder al Pago
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
