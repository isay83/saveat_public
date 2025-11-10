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

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Evita la redirección automática
    });

    if (error) {
      toast.error("Error de Pago");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // ¡PAGO EXITOSO!
      toast.success("Tu pedido ha sido confirmado.");

      // Limpiamos el carrito local
      clearCart();

      // NOTA IMPORTANTE:
      // El backend (API) debe tener un WEBHOOK de Stripe
      // para confirmar el pedido, convertir el 'Cart' en 'Order'
      // y enviar el email de confirmación.
      // El cliente NUNCA confirma el pedido, solo el webhook.

      // Redirigir a una página de "gracias"
      window.location.href = "/orden-confirmada";
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        disabled={isLoading || !stripe}
        className="w-full mt-6 bg-green-700 hover:bg-green-800 text-lg py-4"
      >
        {isLoading ? "Procesando..." : "Pagar Ahora"}
      </Button>
    </form>
  );
}
