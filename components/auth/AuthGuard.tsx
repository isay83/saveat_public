"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Verificar si hay token
    const token = localStorage.getItem("saveat_token");

    if (!token) {
      // 2. Si no hay token, redirigir a login
      toast.error("Debes iniciar sesión para ver esta página.");
      router.push("/login");
    } else {
      // 3. Si hay token, permitir el acceso
      queueMicrotask(() => setIsAuthorized(true));
    }
  }, [router]);

  // Mientras verificamos, no mostramos nada (o un spinner)
  if (!isAuthorized) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  // Si está autorizado, mostramos la página protegida
  return <>{children}</>;
}
