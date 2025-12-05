"use client";
import React, { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false);

  // URL de tu API Node (ajusta según tu entorno)
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    // 1. Verificamos si ya respondió antes
    const hasAnswered = localStorage.getItem("saveat_survey_answered");
    if (!hasAnswered) {
      // Esperamos 2 segundos para no ser agresivos al entrar
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Marcamos como visto aunque no responda, para no molestar de nuevo
    localStorage.setItem("saveat_survey_answered", "true");
  };

  const handleVote = async (source: string) => {
    try {
      // 2. Enviamos la respuesta a tu Backend
      await fetch(`${API_URL}/analytics/survey`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source }),
      });

      // 3. Feedback visual y cierre
      <Alert variant="default">
        <Terminal />
        <AlertTitle>Gracias por ayudarnos a mejorar</AlertTitle>
        <AlertDescription>
          Tu respuesta se ha enviado correctamente.
        </AlertDescription>
      </Alert>;
      handleClose();
    } catch (error) {
      console.error("Error enviando encuesta", error);
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Queremos conocerte!
          </h2>
          <p className="text-gray-600">
            Ayúdanos a llegar a más personas. ¿Cómo te enteraste de Saveat?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleVote("Facebook")}
            className="p-3 border rounded-xl hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all font-medium text-gray-600"
          >
            Facebook
          </button>
          <button
            onClick={() => handleVote("Instagram")}
            className="p-3 border rounded-xl hover:bg-pink-50 hover:border-pink-500 hover:text-pink-600 transition-all font-medium text-gray-600"
          >
            Instagram
          </button>
          <button
            onClick={() => handleVote("TikTok")}
            className="p-3 border rounded-xl hover:bg-black hover:text-white transition-all font-medium text-gray-600"
          >
            TikTok
          </button>
          <button
            onClick={() => handleVote("Google")}
            className="p-3 border rounded-xl hover:bg-green-50 hover:border-green-500 hover:text-green-600 transition-all font-medium text-gray-600"
          >
            Google / Web
          </button>
          <button
            onClick={() => handleVote("Recomendación")}
            className="col-span-2 p-3 border rounded-xl hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-700 transition-all font-medium text-gray-600"
          >
            Recomendación de un amigo
          </button>
        </div>

        <button
          onClick={handleClose}
          className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
        >
          Prefiero no responder
        </button>
      </div>
    </div>
  );
}
