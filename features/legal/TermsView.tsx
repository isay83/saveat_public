export default function TermsView() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Términos y Condiciones de Uso
      </h1>

      <div className="space-y-6 text-gray-600">
        <p className="text-sm text-gray-500">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Introducción
          </h2>
          <p>
            Bienvenido a Saveat. Estos términos y condiciones rigen el uso de
            nuestra plataforma web y los servicios asociados. Al acceder o
            utilizar Saveat, aceptas cumplir con estos términos. Nuestra misión
            es reducir el desperdicio de alimentos conectando excedentes de
            empresas con consumidores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Naturaleza de los Productos
          </h2>
          <p>
            Los productos ofrecidos en Saveat son &quot;mermas&quot; o
            excedentes de inventario de nuestros aliados comerciales. Esto
            significa que los productos pueden tener fechas de consumo
            preferente próximas, defectos estéticos menores en el empaque o ser
            excedentes de producción. Sin embargo, garantizamos que todos los
            productos son aptos para el consumo humano y cumplen con las
            normativas de seguridad alimentaria vigentes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Registro y Cuentas
          </h2>
          <p>
            Para realizar compras, debes registrarte y crear una cuenta. Eres
            responsable de mantener la confidencialidad de tu contraseña y de
            toda la actividad que ocurra bajo tu cuenta. Debes proporcionarnos
            información precisa y completa. Nos reservamos el derecho de
            suspender cuentas que violen nuestras políticas de uso justo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Límites de Compra
          </h2>
          <p>
            Para asegurar una distribución justa de los alimentos rescatados y
            evitar el acaparamiento o la reventa, Saveat implementa límites
            diarios de compra por usuario. Estos límites pueden variar y están
            sujetos a cambios sin previo aviso.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Pagos y Reembolsos
          </h2>
          <p>
            Los pagos se procesan de forma segura a través de Stripe. Debido a
            la naturaleza perecedera y de bajo costo de los productos, las
            ventas son finales. Solo se ofrecerán reembolsos en caso de que el
            producto entregado no sea apto para el consumo o haya un error en la
            entrega imputable a Saveat.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Modificaciones
          </h2>
          <p>
            Saveat se reserva el derecho de modificar estos términos en
            cualquier momento. Los cambios entrarán en vigor inmediatamente
            después de su publicación en la plataforma.
          </p>
        </section>
      </div>
    </div>
  );
}
