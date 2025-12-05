import type { Metadata } from "next";
import LandingClient from "@/features/landing/LandingClient";
import SurveyModal from "@/components/survey/SurveyModal";

// 1. Exportamos la Metadata para ESTA página (Server Component)
export const metadata: Metadata = {
  title: "Saveat - Rescata alimentos, combate el desperdicio",
  description: "Página principal de Saveat, el banco de alimentos digital.",
};

// 2. Este es un Server Component. No usa "use client".
export default function HomePage() {
  // 3. Importa y renderiza el Client Component que tiene toda la lógica.
  return (
    <>
      <LandingClient />
      <SurveyModal />
    </>
  );
}
