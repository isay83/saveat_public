"use client"; // Los formularios son interactivos

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; // El cliente Axios que creamos
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });

      // ¡Éxito!
      localStorage.setItem("saveat_token", response.data.token);
      // Opcional: guardar 'user' en localStorage también
      localStorage.setItem("saveat_user", JSON.stringify(response.data.user));

      // Redirigir a la tienda
      router.push("/store");
    } catch (error) {
      console.error(error);
      toast.error("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800"
            >
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
