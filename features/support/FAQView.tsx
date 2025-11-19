"use client"; // El acordeón es interactivo

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQView() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
        Preguntas Frecuentes
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Todo lo que necesitas saber sobre cómo funciona Saveat.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            ¿Los alimentos son seguros para comer?
          </AccordionTrigger>
          <AccordionContent>
            ¡Sí, absolutamente! Todos los productos que ofrecemos son
            perfectamente aptos para el consumo. Son &quot;rescatados&quot;
            porque pueden tener fechas de consumo preferente cercanas, defectos
            en el empaque o ser excedentes de producción, pero nunca vendemos
            productos caducados o en mal estado.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            ¿Por qué hay un límite de compra diario?
          </AccordionTrigger>
          <AccordionContent>
            Saveat tiene una misión social. Los límites de compra (Reservation
            Limit) nos ayudan a garantizar que los alimentos rescatados lleguen
            a la mayor cantidad de familias posible y evitan la reventa
            comercial de productos que están destinados a apoyar a la comunidad.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>¿Cómo recojo mi pedido?</AccordionTrigger>
          <AccordionContent>
            Al finalizar tu compra, recibirás un correo de confirmación con los
            detalles. Actualmente, operamos con puntos de recolección
            específicos. Debes acudir al punto indicado dentro de la
            &quot;ventana de recolección&quot; mostrada en el detalle de tu
            producto (usualmente 24-48 horas).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            ¿Qué pasa si no recojo mi pedido a tiempo?
          </AccordionTrigger>
          <AccordionContent>
            Debido a que manejamos productos perecederos y con espacio limitado,
            si no recoges tu pedido dentro de la ventana establecida, este
            podría ser donado a una organización benéfica local y no podremos
            ofrecer un reembolso.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            Soy una empresa, ¿cómo puedo donar?
          </AccordionTrigger>
          <AccordionContent>
            ¡Nos encantaría colaborar contigo! Si tienes mermas o excedentes,
            por favor contáctanos a través de nuestra página de Soporte o
            escríbenos a aliados@saveat.com. Nos encargamos de la logística para
            que donar sea fácil y eficiente.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
