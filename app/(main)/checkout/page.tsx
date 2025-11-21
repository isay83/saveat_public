"use client";

import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/features/checkout/CheckoutForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";

// 1. Carga la instancia de Stripe con tu clave PÚBLICA
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// Esta página TIENE que ser "use client" porque necesita
// llamar a la API (una acción del lado del cliente) para
// crear el Payment Intent ANTES de poder renderizar el formulario.
export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");

  // --- INICIO: NUEVOS HOOKS ---
  const router = useRouter();
  // Leemos los items y el estado de inicialización del store
  const items = useCartStore((state) => state.items);
  const isInitialized = useCartStore((state) => state.isInitialized);
  // --- FIN: NUEVOS HOOKS ---

  useEffect(() => {
    // 2. Al cargar la página, llama a tu backend para crear la intención de pago
    const createIntent = async () => {
      try {
        // Llama al endpoint que protegimos con 'protectUser'
        const { data } = await api.post("/checkout/create-payment-intent", {});
        // 3. Guarda el 'clientSecret' que nos devolvió la API
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error(error);
        toast.error("Error al iniciar el pago", {
          // --- MODIFICACIÓN: Mostrar el error real de la API ---
          description:
            "No pudimos conectar con el servidor de pagos. Por favor, intenta de nuevo.",
        });
        // Si la API falla (ej. carrito vacío), devolvemos al usuario
        router.push("/cart");
      }
    };

    // --- INICIO: LÓGICA DE GUARDA ---
    // Solo ejecutamos esto si el store de Zustand ya se inicializó
    if (isInitialized) {
      // Si el carrito está vacío, redirigimos
      if (items.length === 0) {
        toast.error("Tu carrito está vacío", {
          description: "Añade productos antes de proceder al pago.",
        });
        router.push("/cart"); // O a '/store'
      } else {
        // Si hay items, SÍ creamos el intento de pago
        createIntent();
      }
    }
    // --- FIN: LÓGICA DE GUARDA ---
  }, [isInitialized, items, router]);

  // Opciones para el <Elements> wrapper
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  // 4. Renderiza un loader mientras obtenemos el clientSecret
  if (!clientSecret || !isInitialized) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Cargando Pago</h1>
        <p>Preparando tu transacción de forma segura...</p>
        {/* Aquí iría un componente Spinner/Skeleton */}
        <div className="h-64 w-full bg-gray-100 animate-pulse rounded-lg mt-4"></div>
      </div>
    );
  }

  // 5. Una vez que tenemos el secret, renderizamos el formulario
  return (
    <AuthGuard>
      {/* Ruta protegida / SOLO USUARIOS */}
      <div className="container mx-auto py-12 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Completa tu Pago
        </h1>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </AuthGuard>
  );
}
