"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true); // Estado de carga inicial

  useEffect(() => {
    // 1. Verificar si hay token
    const token = localStorage.getItem("saveat_token");

    if (token) {
      // 2. Si HAY token (usuario logueado), redirigir a la tienda
      router.replace("/store"); // 'replace' para que no pueda volver atrás con el botón 'Atrás'
    } else {
      // 3. Si NO hay token, permitir ver la página (Login/Register)
      queueMicrotask(() => setIsChecking(false));
    }
  }, [router]);

  // Mientras verificamos, mostramos un spinner o nada para evitar "fout" (flash of unstyled content)
  if (isChecking) {
    return null; // O un <Spinner />
  }

  // Si no está logueado, mostramos el contenido (el formulario)
  return <>{children}</>;
}
