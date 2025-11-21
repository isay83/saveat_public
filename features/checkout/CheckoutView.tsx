"use client";

import { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/features/checkout/CheckoutForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Banknote } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutView() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingPaymentIntent, setIsLoadingPaymentIntent] = useState(false);

  // Ref para evitar llamadas duplicadas en Strict Mode
  const intentCreatedRef = useRef(false);

  const router = useRouter();
  const { items, isInitialized, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  useEffect(() => {
    if (total === 0) {
      setPaymentMethod("card");
    }
  }, [total]);

  // Iniciar pago con tarjeta o procesar gratis
  useEffect(() => {
    let isCancelled = false;

    const initCardPayment = async () => {
      // Condiciones para NO ejecutar:
      // 1. Store no listo
      // 2. Ya se canceló el efecto
      // 3. Ya estamos cargando un intent
      // 4. Ya tenemos un secret (y no ha cambiado nada relevante)
      // 5. El carrito está vacío
      if (
        !isInitialized ||
        isCancelled ||
        isLoadingPaymentIntent ||
        items.length === 0
      )
        return;

      // Si ya creamos un intento para estos items, no lo volvemos a hacer inmediatamente
      // (Esto ayuda en dev mode, pero en prod queremos permitir reintentos si falla)
      // if (intentCreatedRef.current) return;

      if (paymentMethod === "card") {
        setIsLoadingPaymentIntent(true);
        // intentCreatedRef.current = true;

        try {
          const { data } = await api.post(
            "/checkout/create-payment-intent",
            {}
          );

          if (isCancelled) return;

          if (data.isFree) {
            toast.success("¡Tu pedido gratuito ha sido confirmado!");
            clearCart();
            // Pequeño delay para asegurar que el toast se vea
            setTimeout(() => {
              window.location.href = "/order-confirmed"; // Forzamos recarga para limpiar estado completo
            }, 1000);
            return;
          }

          setClientSecret(data.clientSecret);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (isCancelled) return;
          console.error("Error initCardPayment:", error);

          // Si el error es porque ya se procesó (ej. conflicto de escritura),
          // podría ser que la orden gratis ya se creó.
          if (error.response?.status === 500 && total === 0) {
            // Opcional: Podríamos intentar verificar si la orden existe,
            // pero por seguridad mostramos error y pedimos reintentar.
          }

          const msg =
            error.response?.data?.message || "Error al iniciar el pago.";
          toast.error(msg);
        } finally {
          if (!isCancelled) setIsLoadingPaymentIntent(false);
        }
      } else {
        setClientSecret("");
      }
    };

    initCardPayment();

    return () => {
      isCancelled = true;
    };
    // Quitamos 'isLoadingPaymentIntent' de las dependencias para evitar bucles
  }, [isInitialized, items.length, paymentMethod, router, clearCart, total]);

  const handleCashPayment = async () => {
    if (!confirm("¿Confirmas que pagarás en efectivo al recoger tu pedido?"))
      return;

    setIsProcessing(true);
    try {
      await api.post("/checkout/cash-order", {});
      toast.success("¡Pedido reservado! Paga al recoger.");
      clearCart();
      router.push("/order-confirmed");
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar el pedido en efectivo.");
      setIsProcessing(false);
    }
  };

  if (!isInitialized) {
    return <div className="py-12 text-center">Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
        <Button onClick={() => router.push("/store")}>Ver Productos</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Selector de Método de Pago */}
      {total > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant={paymentMethod === "card" ? "default" : "outline"}
            className={`h-24 flex flex-col gap-2 ${
              paymentMethod === "card"
                ? "bg-green-700 text-white hover:bg-green-800"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <CreditCard size={32} />
            <span>Pagar con Tarjeta</span>
          </Button>
          <Button
            variant={paymentMethod === "cash" ? "default" : "outline"}
            className={`h-24 flex flex-col gap-2 ${
              paymentMethod === "cash"
                ? "bg-slate-700 text-white hover:bg-slate-800"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            <Banknote size={32} />
            <span>Pagar en Efectivo</span>
          </Button>
        </div>
      )}

      {/* Mensaje para productos gratis */}
      {total === 0 && (
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <p className="text-green-800 text-center font-medium">
              🎉 ¡Estos productos son gratuitos! Estamos procesando tu pedido...
            </p>
            {/* Spinner de carga si estamos procesando la orden gratis */}
            {isLoadingPaymentIntent && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Vista de Tarjeta */}
      {paymentMethod === "card" && total > 0 && (
        <>
          {isLoadingPaymentIntent ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600 mb-4">
                  Preparando formulario de pago...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                </div>
              </CardContent>
            </Card>
          ) : clientSecret ? (
            <Card>
              <CardHeader>
                <CardTitle>Datos de la Tarjeta</CardTitle>
              </CardHeader>
              <CardContent>
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret, appearance: { theme: "stripe" } }}
                >
                  <CheckoutForm />
                </Elements>
              </CardContent>
            </Card>
          ) : null}
        </>
      )}

      {/* Vista de Efectivo */}
      {paymentMethod === "cash" && total > 0 && (
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Banknote /> Confirmación de Pago en Efectivo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              Al confirmar, tus productos quedarán reservados. <br />
              Deberás pagar el total de <strong>${total.toFixed(2)}</strong> al
              momento de recoger tu pedido.
            </p>
            <Button
              size="lg"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white"
              onClick={handleCashPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Reservando..." : "Confirmar Reserva"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
