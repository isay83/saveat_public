import type { Metadata } from "next";
import SupportView from "@/features/support/SupportView";

export const metadata: Metadata = {
  title: "Soporte y Contacto",
  description: "¿Necesitas ayuda? Contáctanos.",
};

export default function SupportPage() {
  return <SupportView />;
}
