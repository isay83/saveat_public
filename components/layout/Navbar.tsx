"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  PackageCheck,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore"; // Asumimos que lo crearemos aquí
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Obtenemos los items y el estado de inicialización del store
  const items = useCartStore((state) => state.items);
  const isInitialized = useCartStore((state) => state.isInitialized);
  const syncCartWithApi = useCartStore((state) => state.syncCartWithApi);
  const usage = useCartStore((state) => state.usage); // <--- NUEVO
  const fetchUsage = useCartStore((state) => state.fetchUsage); // <--- NUEVO
  const cartCount = items.length; // O puedes sumar 'quantity'

  // Efecto SOLO para revisar el localStorage al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("saveat_token");
    startTransition(() => {
      setIsAuthenticated(!!token);
    });
  }, []);

  // Efecto para sincronizar el carrito (solo cuando cambia la autenticación)
  useEffect(() => {
    // Función para cargar los datos del usuario (carrito y límite)
    const fetchUserData = async () => {
      // Si el usuario está autenticado Y el carrito no se ha sincronizado
      if (!isInitialized) {
        await syncCartWithApi();
      } else {
        await fetchUsage();
      }
    };
    // Si el usuario NO está autenticado, limpiamos el carrito
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, isInitialized, syncCartWithApi, fetchUsage]);

  const handleLogout = () => {
    localStorage.removeItem("saveat_token");
    localStorage.removeItem("saveat_user");
    setIsAuthenticated(false);
    useCartStore.getState().clearCart(); // Esto resetea 'items' y 'usage'
    router.push("/login");
    router.refresh(); // Forzamos un refresh para limpiar estados
  };

  // El componente se renderiza inmediatamente.
  // cartCount será 0 al inicio y se actualizará post-hidratación.

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          href={isAuthenticated ? "/store" : "/"}
          className="text-2xl font-bold text-green-700"
        >
          Saveat
        </Link>

        {/* Links de Navegación (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/store" className="text-gray-600 hover:text-green-700">
            Tienda
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-green-700">
            Sobre Nosotros
          </Link>

          {/* --- MODIFICACIÓN: El contador ahora lee 'usage' desde el store --- */}
          {isAuthenticated && usage.limit > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600 p-2 bg-gray-100 rounded-md">
              <PackageCheck className="h-4 w-4 text-green-700" />
              <span>Límite:</span>
              <span className="font-bold">
                {usage.used} / {usage.limit}
              </span>
            </div>
          )}
          {/* --- FIN: NUEVO CONTADOR DE LÍMITE --- */}

          <Link href="/cart" className="relative p-2" title="Carrito">
            <ShoppingCart className="text-gray-600 hover:text-green-700" />
            {/* Solo mostramos el contador si es mayor a 0 */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              {/* --- NUEVO ENLACE --- */}
              <Link
                href="/profile/orders"
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Mis Pedidos"
              >
                <Package className="text-gray-600 hover:text-green-700" />
              </Link>
              {/* --- FIN --- */}
              <Link href="/profile" className="p-2" title="Perfil">
                <User className="text-gray-600 hover:text-green-700" />
              </Link>
              <Button
                className="cursor-pointer"
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="bg-green-700 hover:bg-green-800 cursor-pointer"
              asChild
            >
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
        </div>

        {/* Botón de Menú Móvil */}
        <div className="md:hidden flex items-center">
          <Link href="/cart" className="relative p-2 mr-2">
            <ShoppingCart className="text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-40">
          <Link href="/store" className="block p-4 border-t hover:bg-gray-50">
            Tienda
          </Link>
          <Link href="/about" className="block p-4 border-t hover:bg-gray-50">
            Sobre Nosotros
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="block p-4 border-t hover:bg-gray-50"
              >
                Mi Perfil
              </Link>
              {/* --- NUEVO ENLACE MÓVIL --- */}
              <Link
                href="/profile/orders"
                className="block p-4 border-t hover:bg-gray-50"
              >
                Mis Pedidos
              </Link>
              {/* --- FIN --- */}
              <button
                onClick={handleLogout}
                className="w-full text-left p-4 border-t text-red-600 hover:bg-gray-50"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="block p-4 border-t hover:bg-gray-50">
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
