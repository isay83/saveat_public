"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function SupportView() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías conectar con un servicio como EmailJS o crear un endpoint en tu API
    alert("Gracias por tu mensaje. Te contactaremos pronto.");
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Centro de Soporte</h1>
        <p className="text-gray-600 mt-2">
          Estamos aquí para ayudarte con cualquier duda o problema.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario de Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Envíanos un mensaje</CardTitle>
            <CardDescription>
              Te responderemos en menos de 24 horas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  placeholder="¿En qué podemos ayudarte?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntanos los detalles..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800"
              >
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Información de Contacto Directo */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full text-green-700">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Correo Electrónico</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Para dudas generales y soporte.
                </p>
                <a
                  href="mailto:hola@saveat.com"
                  className="text-green-700 font-medium hover:underline"
                >
                  hola@saveat.com
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-700">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Teléfono</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Lun - Vie, 9:00 AM - 6:00 PM
                </p>
                <a
                  href="tel:+525512345678"
                  className="text-blue-700 font-medium hover:underline"
                >
                  +52 (461) 1234 5678
                </a>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="p-3 bg-orange-100 rounded-full text-orange-700">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Oficinas Centrales</h3>
                <p className="text-sm text-gray-600">
                  Av. Reforma 123, Piso 5<br />
                  Ciudad de México, CDMX
                  <br />
                  06600, México
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
