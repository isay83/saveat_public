export default function PrivacyView() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Política de Privacidad
      </h1>

      <div className="space-y-6 text-gray-600">
        <p>
          En Saveat, nos tomamos muy en serio tu privacidad. Esta política
          describe cómo recopilamos, usamos y protegemos tu información
          personal.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Información que Recopilamos
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Datos de Registro:</strong> Nombre, dirección de correo
              electrónico, contraseña (encriptada).
            </li>
            <li>
              <strong>Datos de Transacción:</strong> Historial de compras y
              detalles de pedidos. No almacenamos los datos completos de tu
              tarjeta de crédito; estos son procesados de forma segura por
              Stripe.
            </li>
            <li>
              <strong>Datos de Uso:</strong> Información sobre cómo interactúas
              con nuestra plataforma para mejorar el servicio.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Uso de la Información
          </h2>
          <p>Utilizamos tus datos para:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Procesar y gestionar tus pedidos.</li>
            <li>Comunicarnos contigo sobre el estado de tus compras.</li>
            <li>Mejorar nuestra plataforma y prevenir fraudes.</li>
            <li>Cumplir con obligaciones legales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Compartir Información
          </h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Solo
            compartimos datos con proveedores de servicios esenciales (como
            Stripe para pagos) que nos ayudan a operar la plataforma, y solo en
            la medida necesaria para realizar sus funciones.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Seguridad
          </h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger tus datos contra el acceso no autorizado, la pérdida o la
            alteración. Utilizamos conexiones cifradas (SSL) para proteger la
            transmisión de información confidencial.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Tus Derechos
          </h2>
          <p>
            Tienes derecho a acceder, corregir o eliminar tu información
            personal. Puedes gestionar la mayoría de tus datos directamente
            desde tu perfil o contactarnos a través de nuestro canal de soporte
            para ejercer tus derechos.
          </p>
        </section>
      </div>
    </div>
  );
}
