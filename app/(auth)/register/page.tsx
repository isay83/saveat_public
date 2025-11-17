import type { Metadata } from "next";
import RegisterForm from "@/features/auth/RegisterForm";
import Link from "next/link";

// 1. Metadata para la página de Login
export const metadata: Metadata = {
  title: "Crear Cuenta",
};

// 2. Server Component
export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {/* 3. Renderiza el Client Component con el formulario */}
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/login"
            className="font-medium text-green-700 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
