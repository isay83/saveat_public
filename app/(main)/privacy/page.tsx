import type { Metadata } from "next";
import PrivacyView from "@/features/legal/PrivacyView";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Cómo protegemos tus datos en Saveat.",
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
