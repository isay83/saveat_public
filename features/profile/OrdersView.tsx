"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils"; // Asegúrate de tener esta utilidad o usa Intl
import { Calendar, Package } from "lucide-react";

// Tipo para un pedido (basado en tu modelo Reservation)
interface Order {
  _id: string;
  product_name: string;
  quantity_reserved: number;
  unit: string;
  total_price: number;
  status: "pendiente" | "recogido" | "cancelado" | "expirado";
  pickup_deadline: string;
  createdAt: string;
  product_id?: {
    image_url?: string;
  };
}

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get<Order[]>("/users/orders");
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            Pendiente de Recoger
          </Badge>
        );
      case "recogido":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Recogido</Badge>
        );
      case "cancelado":
        return <Badge variant="destructive">Cancelado</Badge>;
      case "expirado":
        return <Badge variant="secondary">Expirado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">
          No tienes pedidos aún
        </h3>
        <p className="text-gray-500 mb-6">
          ¡Es un buen momento para rescatar algo delicioso!
        </p>
        <Button asChild className="bg-green-700 hover:bg-green-800">
          <Link href="/store">Ir a la Tienda</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order._id} className="overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* Imagen del producto (si existe) o placeholder */}
            <div className="relative w-full sm:w-32 h-32 bg-gray-200">
              <Image
                src={
                  order.product_id?.image_url ||
                  "https://placehold.co/200x200/e2e8f0/1e293b?text=Producto"
                }
                alt={order.product_name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {order.product_name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      Pedido el:{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

              <div className="flex justify-between items-end">
                <div className="text-sm text-gray-600">
                  <p>
                    Cantidad:{" "}
                    <span className="font-medium">
                      {order.quantity_reserved} {order.unit}
                    </span>
                  </p>
                  {order.status === "pendiente" && (
                    <p className="text-orange-600 font-medium mt-1">
                      Recoger antes de:{" "}
                      {new Date(order.pickup_deadline).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="text-xl font-bold text-green-700">
                  {/* Usa tu función formatCurrency o un simple toFixed */}$
                  {order.total_price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
