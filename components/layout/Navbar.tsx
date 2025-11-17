"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
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
    // Si el usuario está autenticado Y el carrito no se ha sincronizado
    if (isAuthenticated && !isInitialized) {
      syncCartWithApi();
    }
    // Si el usuario NO está autenticado, limpiamos el carrito
    if (!isAuthenticated) {
      useCartStore.getState().clearCart();
    }
  }, [isAuthenticated, isInitialized, syncCartWithApi]);

  const handleLogout = () => {
    localStorage.removeItem("saveat_token");
    localStorage.removeItem("saveat_user");
    setIsAuthenticated(false);
    // Limpia el carrito de Zustand
    useCartStore.getState().clearCart();
    router.push("/login");
    router.refresh(); // Forzamos un refresh para limpiar estados
  };

  // El componente se renderiza inmediatamente.
  // cartCount será 0 al inicio y se actualizará post-hidratación.

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/store" className="text-2xl font-bold text-green-700">
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

          <Link href="/cart" className="relative p-2">
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
              <Link href="/profile" className="p-2">
                <User className="text-gray-600 hover:text-green-700" />
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="bg-green-700 hover:bg-green-800"
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
