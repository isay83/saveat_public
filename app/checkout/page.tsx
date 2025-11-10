"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm"; // Crearemos este
import api from "@/lib/api";

// Carga Stripe.js con tu clave PÚBLICA
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // 1. Llama a tu backend para crear la "intención de pago"
    const createPaymentIntent = async () => {
      try {
        // Este endpoint calcula el total en el backend y crea el PI
        const { data } = await api.post("/checkout/create-payment-intent", {});
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error al crear Payment Intent", error);
      }
    };

    createPaymentIntent();
  }, []);

  if (!clientSecret) {
    return <div>Cargando...</div>; // Muestra un loader
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Completa tu Pago</h1>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm /> {/* Este es el formulario de tarjeta */}
      </Elements>
    </div>
  );
}
