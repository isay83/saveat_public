import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Saveat", // %s será reemplazado por el título de cada página
    default: "Saveat - Rescata alimentos, combate el desperdicio",
  },
  description:
    "Únete a Saveat y obtén productos de alta calidad a un precio increíble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 'children' será tu Landing Page o el Layout (main) */}
        {children}
        {/* El Toaster es para las notificaciones (ej. "Producto añadido") */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
