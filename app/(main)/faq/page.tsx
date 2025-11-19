import type { Metadata } from "next";
import FAQView from "@/features/support/FAQView";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description: "Respuestas a las dudas más comunes sobre Saveat.",
};

export default function FAQPage() {
  return <FAQView />;
}
