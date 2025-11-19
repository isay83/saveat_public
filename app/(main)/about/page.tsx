import type { Metadata } from "next";
import AboutView from "@/features/about/AboutView";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la misión de Saveat: combatir el desperdicio de alimentos y apoyar a la comunidad.",
};

export default function AboutPage() {
  return <AboutView />;
}
