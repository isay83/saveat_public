import type { Metadata } from "next";
import AuthGuard from "@/components/auth/AuthGuard";
import CheckoutView from "@/features/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Finalizar Compra",
  description: "Elige tu método de pago y completa tu pedido en Saveat.",
};

export default function CheckoutPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-12 px-4">
        {/* Título de la página */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Finalizar Compra
        </h1>
        <CheckoutView />
      </div>
    </AuthGuard>
  );
}
