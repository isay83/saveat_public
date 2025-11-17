import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold mb-2">Saveat</h5>
            <p className="text-sm">Rescatando alimentos, un bocado a la vez.</p>
          </div>
          <div>
            <h5 className="font-bold mb-2">Navegación</h5>
            <ul className="text-sm">
              <li>
                <Link href="/store" className="hover:text-green-700">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-700">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Legal</h5>
            <ul className="text-sm">
              <li>
                <Link href="/terms" className="hover:text-green-700">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-green-700">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-2">Contacto</h5>
            <ul className="text-sm">
              <li>
                <Link href="/faq" className="hover:text-green-700">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-green-700">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm">
          © {new Date().getFullYear()} Saveat. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
