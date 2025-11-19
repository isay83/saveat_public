import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

// 1. Metadata para el título de la pestaña del navegador
export const metadata: Metadata = {
  title: "Pedido Confirmado",
  description: "¡Gracias por tu compra en Saveat!",
};

// 2. Este es un Server Component simple
export default function OrderConfirmedPage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-lg shadow-lg">
        {/* Icono de Éxito */}
        <CheckCircle className="h-24 w-24 text-green-600" />

        {/* Mensaje Principal */}
        <h1 className="mt-6 text-4xl font-bold text-gray-800">
          ¡Gracias por tu compra!
        </h1>

        {/* Mensaje Secundario */}
        <p className="mt-4 text-lg text-gray-600">
          Tu pedido ha sido confirmado exitosamente.
        </p>
        <p className="mt-2 text-gray-600 max-w-md">
          Hemos recibido tu pago y tu pedido estará listo para ser recogido
          dentro de la ventana de tiempo especificada. ¡Gracias por ayudar a
          reducir el desperdicio de alimentos!
        </p>

        {/* Acciones Siguientes */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-green-700 hover:bg-green-800 text-lg px-6 py-3"
          >
            <Link href="/profile/orders">Ver mis pedidos</Link>
          </Button>
          <Button variant="outline" asChild className="text-lg px-6 py-3">
            <Link href="/store">Seguir comprando</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
