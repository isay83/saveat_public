"use client";

import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCartStore(); // Para limpiar el carrito local al éxito
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js aún no se ha cargado.
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // 1. Confirma el pago con Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Nos quedamos en esta página, no redirigimos
    });

    // 2. Manejar el resultado
    if (error) {
      // Error de validación de tarjeta, fondos, etc.
      setErrorMessage(error.message || "Ocurrió un error inesperado.");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // ¡PAGO EXITOSO!
      toast.success("¡Pago Exitoso!", {
        description: "Tu pedido ha sido confirmado. Gracias por tu compra.",
      });

      // 3. Limpiamos el carrito local (Zustand)
      clearCart();

      // 4. Redirigimos a una página de "gracias"
      // (El webhook ya se encargó de crear la Reservation en el backend)
      router.push("/order-confirmed");
    } else {
      // Caso inesperado
      setIsLoading(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* 2. El componente de Stripe que renderiza el formulario de tarjeta */}
      <PaymentElement id="payment-element" />

      {/* 3. Botón de Pagar */}
      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full mt-6 bg-green-700 hover:bg-green-800 text-lg py-4 h-auto"
      >
        <span id="button-text">
          {isLoading ? "Procesando..." : "Pagar Ahora"}
        </span>
      </Button>

      {/* 4. Mostrar mensajes de error de pago */}
      {errorMessage && (
        <div
          id="payment-message"
          className="text-red-600 mt-4 text-center font-medium"
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
}
