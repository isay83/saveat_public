"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/features/checkout/CheckoutForm";
import api from "@/lib/api";
import { toast } from "sonner";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CreditCard, Banknote, CheckCircle, AlertCircle } from "lucide-react";

// Carga de Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutView() {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  // Estados de carga independientes
  const [isInitializingCard, setIsInitializingCard] = useState(false);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Estado para confirmación visual (reemplazo de window.confirm)
  const [showCashConfirmation, setShowCashConfirmation] = useState(false);

  const router = useRouter();
  const { items, isInitialized, clearCart } = useCartStore();

  // Calcular total
  const total = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  // 1. Efecto para detectar si es GRATIS (Total $0)
  // Si es gratis, no seleccionamos ni tarjeta ni efectivo, usamos un modo "free" implícito
  const isFreeOrder = total === 0;

  // 2. Efecto para cargar Stripe SOLO si es necesario
  useEffect(() => {
    let isCancelled = false;

    const fetchClientSecret = async () => {
      if (
        !isInitialized ||
        items.length === 0 ||
        isFreeOrder ||
        paymentMethod !== "card"
      )
        return;

      // Si ya tenemos un secret válido, no lo volvemos a pedir
      if (clientSecret) return;

      setIsInitializingCard(true);
      try {
        const { data } = await api.post("/checkout/create-payment-intent", {});
        if (!isCancelled) {
          setClientSecret(data.clientSecret);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error cargando Stripe:", error);
          toast.error("No se pudo cargar el formulario de pago.");
        }
      } finally {
        if (!isCancelled) setIsInitializingCard(false);
      }
    };

    fetchClientSecret();

    return () => {
      isCancelled = true;
    };
  }, [isInitialized, items.length, paymentMethod, isFreeOrder, clientSecret]);

  // --- MANEJADORES DE ACCIÓN (Manuales, no automáticos) ---

  // A. Confirmar Orden Gratuita
  const handleFreeOrder = async () => {
    setIsProcessingAction(true);
    try {
      // Reutilizamos el endpoint de payment-intent, el backend detectará $0
      const { data } = await api.post("/checkout/create-payment-intent", {});

      if (data.isFree) {
        toast.success("¡Orden gratuita confirmada!");
        clearCart();
        router.replace("/order-confirmed");
      } else {
        // Esto no debería pasar si el front dice que es $0
        toast.error("Hubo un problema al procesar la orden gratuita.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al confirmar la orden.");
    } finally {
      // No desactivamos el loading si fue éxito para evitar parpadeos antes del redirect
      // Pero si falló, sí lo desactivamos
      // setIsProcessingAction(false);
    }
  };

  // B. Confirmar Orden en Efectivo
  const handleCashOrder = async () => {
    setIsProcessingAction(true);
    try {
      await api.post("/checkout/cash-order", {});
      toast.success("¡Orden reservada! Paga al recoger.");
      clearCart();
      router.replace("/order-confirmed");
    } catch (error) {
      console.error(error);
      toast.error("No se pudo procesar la reserva en efectivo.");
      setIsProcessingAction(false); // Reactivar botón si falla
    }
  };

  // --- RENDERIZADO ---

  if (!isInitialized)
    return <div className="py-12 text-center">Cargando...</div>;
  if (items.length === 0) return null; // El AuthGuard o useEffect de página redirigirá

  return (
    <div className="max-w-3xl mx-auto">
      {/* SECCIÓN 1: Si es una orden GRATIS ($0) */}
      {isFreeOrder && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle /> Orden Gratuita
            </CardTitle>
            <CardDescription>
              Estos productos son una donación o tienen un costo de $0.00.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-sm text-gray-600">
              No necesitas ingresar datos de pago. Simplemente confirma tu
              pedido para reservarlo.
            </p>
            <Button
              size="lg"
              className="w-full bg-green-700 hover:bg-green-800 cursor-pointer"
              onClick={handleFreeOrder}
              disabled={isProcessingAction}
            >
              {isProcessingAction ? "Confirmando..." : "Confirmar Orden Gratis"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* SECCIÓN 2: Si es una orden DE PAGO (> $0) */}
      {!isFreeOrder && (
        <>
          {/* Selector de Método */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              className={`h-24 flex flex-col gap-2 cursor-pointer ${
                paymentMethod === "card"
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => {
                setPaymentMethod("card");
                setShowCashConfirmation(false);
              }}
              disabled={isProcessingAction}
            >
              <CreditCard size={32} />
              <span>Tarjeta</span>
            </Button>
            <Button
              variant={paymentMethod === "cash" ? "default" : "outline"}
              className={`h-24 flex flex-col gap-2 cursor-pointer ${
                paymentMethod === "cash"
                  ? "bg-slate-700 text-white hover:bg-slate-800"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setPaymentMethod("cash")}
              disabled={isProcessingAction}
            >
              <Banknote size={32} />
              <span>Efectivo</span>
            </Button>
          </div>

          {/* Área de Contenido Según Método */}
          <div className="min-h-[300px]">
            {/* CASO TARJETA */}
            {paymentMethod === "card" && (
              <>
                {isInitializingCard ? (
                  <Card>
                    <CardContent className="py-12 flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mb-4"></div>
                      <p className="text-gray-500">Conectando con Stripe...</p>
                    </CardContent>
                  </Card>
                ) : clientSecret ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pago Seguro con Tarjeta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Elements
                        stripe={stripePromise}
                        options={{
                          clientSecret,
                          appearance: { theme: "stripe" },
                        }}
                      >
                        <CheckoutForm />
                      </Elements>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-4 text-red-500">
                    Error al cargar el formulario. Recarga la página.
                  </div>
                )}
              </>
            )}

            {/* CASO EFECTIVO */}
            {paymentMethod === "cash" && (
              <Card className="border-dashed border-2 border-slate-300 bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-700">
                    <Banknote /> Pago en Efectivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showCashConfirmation ? (
                    // Paso 1: Información
                    <div className="text-center">
                      <p className="text-gray-600 mb-6">
                        Pagarás un total de <strong>${total.toFixed(2)}</strong>{" "}
                        al momento de recoger tu pedido.
                      </p>
                      <Button
                        variant="default"
                        className="w-full bg-slate-800 hover:bg-slate-900 cursor-pointer"
                        onClick={() => setShowCashConfirmation(true)}
                      >
                        Continuar
                      </Button>
                    </div>
                  ) : (
                    // Paso 2: Confirmación (Reemplazo de window.confirm)
                    <div className="text-center animate-in fade-in zoom-in duration-300">
                      <div className="flex justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-orange-500" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        ¿Confirmar reserva?
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Al confirmar, te comprometes a recoger y pagar tu pedido
                        dentro del horario establecido.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 cursor-pointer"
                          onClick={() => setShowCashConfirmation(false)}
                          disabled={isProcessingAction}
                        >
                          Cancelar
                        </Button>
                        <Button
                          className="flex-1 bg-green-700 hover:bg-green-800 cursor-pointer"
                          onClick={handleCashOrder}
                          disabled={isProcessingAction}
                        >
                          {isProcessingAction
                            ? "Procesando..."
                            : "Sí, Confirmar"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
