import type { Metadata } from "next";
import TermsView from "@/features/legal/TermsView";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Lee nuestros términos y condiciones de uso.",
};

export default function TermsPage() {
  return <TermsView />;
}
