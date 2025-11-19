import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart, Leaf, Users, TrendingUp } from "lucide-react";

export default function AboutView() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Puedes poner una imagen de fondo aquí si quieres */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Rescatando Comida,
            <br /> Alimentando Futuros
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-green-100">
            Somos el puente entre el excedente de alimentos y las mesas que lo
            necesitan. Juntos, convertimos el desperdicio en oportunidad.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              En Saveat, creemos que la comida buena no debería terminar en la
              basura. Nuestra misión es democratizar el acceso a alimentos de
              calidad rescatando las mermas de empresas y poniéndolas al alcance
              de la comunidad a precios justos.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              No solo vendemos comida; vendemos consciencia, sostenibilidad y
              apoyo mutuo.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-48 bg-green-100 rounded-2xl overflow-hidden relative">
                <Image
                  src="https://placehold.co/400x600/86efac/166534?text=Comunidad"
                  alt="Comunidad"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-32 bg-emerald-100 rounded-2xl overflow-hidden relative">
                <Image
                  src="https://placehold.co/400x400/bbf7d0/166534?text=Frutas"
                  alt="Frutas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="h-32 bg-teal-100 rounded-2xl overflow-hidden relative">
                <Image
                  src="https://placehold.co/400x400/99f6e4/115e59?text=Verduras"
                  alt="Verduras"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-48 bg-green-50 rounded-2xl overflow-hidden relative">
                <Image
                  src="https://placehold.co/400x600/dcfce7/14532d?text=Planeta"
                  alt="Planeta"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores (Iconos) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Lo Que Nos Mueve
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-4 bg-green-100 rounded-full mb-4 text-green-600">
                  <Leaf size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Sostenibilidad</h3>
                <p className="text-gray-600">
                  Reducimos la huella de carbono evitando que alimentos
                  perfectos sean desechados.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-4 bg-blue-100 rounded-full mb-4 text-blue-600">
                  <Users size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Comunidad</h3>
                <p className="text-gray-600">
                  Creamos una red de apoyo donde todos ganan: empresas, personas
                  y el planeta.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-4 bg-red-100 rounded-full mb-4 text-red-600">
                  <Heart size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Impacto Social</h3>
                <p className="text-gray-600">
                  Hacemos que la alimentación saludable sea accesible para todos
                  los bolsillos.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="p-4 bg-yellow-100 rounded-full mb-4 text-yellow-600">
                  <TrendingUp size={32} />
                </div>
                <h3 className="font-bold text-xl mb-2">Transparencia</h3>
                <p className="text-gray-600">
                  Gestionamos cada donación con integridad, asegurando que
                  llegue a su destino.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estadísticas / Impacto */}
      <section className="py-20 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Nuestro Impacto Hasta Hoy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2 text-green-300">
                +10 Ton
              </div>
              <div className="text-xl">Alimentos Rescatados</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-green-300">+500</div>
              <div className="text-xl">Familias Beneficiadas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-green-300">+50</div>
              <div className="text-xl">Empresas Aliadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          ¿Quieres ser parte del cambio?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ya sea comprando nuestros productos rescatados o donando como empresa,
          tu participación hace la diferencia.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-lg px-8"
          >
            <Link href="/tienda">Ir a la Tienda</Link>
          </Button>
          {/* Podrías tener una página para empresas en el futuro */}
          <Button asChild variant="outline" size="lg" className="text-lg px-8">
            <Link href="/register">Crear Cuenta</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
