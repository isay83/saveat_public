import type { Metadata } from "next";
import ProfileView from "@/features/profile/ProfileView";

export const metadata: Metadata = {
  title: "Mi Perfil",
  description: "Administra tu información personal en Saveat.",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>
      {/* Renderizamos el Client Component que tiene la lógica */}
      <ProfileView />
    </div>
  );
}
