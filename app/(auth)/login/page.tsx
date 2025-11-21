import type { Metadata } from "next";
import LoginForm from "@/features/auth/LoginForm";
import Link from "next/link";
import GuestGuard from "@/components/auth/GuestGuard";

// 1. Metadata para la página de Login
export const metadata: Metadata = {
  title: "Iniciar Sesión",
};

// 2. Server Component
export default function LoginPage() {
  return (
    <GuestGuard>
      {/* Ruta protegida / SOLO PÚNLICO */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          {/* 3. Renderiza el Client Component con el formulario */}
          <LoginForm />
          <p className="mt-4 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-green-700 hover:underline"
            >
              Crea una aquí
            </Link>
          </p>
        </div>
      </div>
    </GuestGuard>
  );
}
