"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { User, MapPin, Mail, Lock } from "lucide-react";
import { AxiosError } from "axios";

// Definimos el tipo de usuario para el perfil
interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  postal_code: string;
}

export default function ProfileView() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    postal_code: "",
  });

  // Cargar datos al montar
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get<UserProfile>("/users/profile");
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          postal_code: data.postal_code,
        });
      } catch (error: unknown) {
        console.error("Error al cargar perfil:", error);

        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            toast.error("Por favor, inicia sesión para ver tu perfil.");
            router.push("/login");
          }
        } else {
          toast.error("No se pudo cargar tu información.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // Manejar cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar actualización
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await api.put("/users/profile", formData);
      toast.success("Perfil actualizado correctamente.");
      // Opcional: Actualizar localStorage si guardas el nombre allí
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Tarjeta de Edición de Datos */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tus datos personales y de contacto.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">Nombre</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Tu nombre"
                    className="pl-8"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Apellidos</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Tus apellidos"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="pl-8 bg-gray-50"
                  value={formData.email}
                  disabled // El email no suele ser editable fácilmente
                />
              </div>
              <p className="text-xs text-muted-foreground">
                El correo electrónico no se puede cambiar.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postal_code">Código Postal</Label>
              <div className="relative">
                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="postal_code"
                  name="postal_code"
                  className="pl-8"
                  value={formData.postal_code}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-800"
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Tarjeta de Seguridad / Extras */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Seguridad</CardTitle>
            <CardDescription>
              Gestiona la seguridad de tu cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Lock className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Contraseña</p>
                  <p className="text-sm text-muted-foreground">
                    Last changed 3 months ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Aquí podrías añadir una tarjeta de "Mis Pedidos" recientes en el futuro */}
      </div>
    </div>
  );
}
