import type { Metadata } from "next";
import OrdersView from "@/features/profile/OrdersView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Mis Pedidos",
  description: "Historial de tus compras en Saveat.",
};

export default function OrdersPage() {
  return (
    <AuthGuard>
      {" "}
      {/* Ruta protegida / SOLO USUARIOS */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center mb-8">
          <Link
            href="/profile"
            className="mr-4 text-gray-500 hover:text-green-700"
          >
            <ArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Mis Pedidos</h1>
        </div>
        <OrdersView />
      </div>
    </AuthGuard>
  );
}
