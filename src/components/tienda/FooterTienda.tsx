export default function FooterTienda() {
  return (
    <footer
      className="
        mt-24
        border-t
        border-purple-500
        bg-black/60
        px-8
        py-12
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
        "
      >
        {/* COLUMNA IZQUIERDA - LINKS */}

        <div className="flex flex-col gap-6">
          <div className="border-b border-purple-700 pb-4">
            <h3 className="text-3xl font-bold text-purple-200">
              NOSOTROS
            </h3>
          </div>

          <div className="border-b border-purple-700 pb-4">
            <h3 className="text-3xl font-bold text-purple-200">
              POLÍTICA DE DEVOLUCIÓN
            </h3>
          </div>
        </div>

        {/* COLUMNA DERECHA - CONTACTO */}

        <div className="flex flex-col gap-8">
          {/* NEWSLETTER (pendiente de conectar a Mailchimp) */}

          <div className="flex items-center gap-4 border-b border-purple-700 pb-3">
            <input
              type="email"
              placeholder="Email"
              className="
                flex-1
                bg-transparent
                text-purple-100
                placeholder-purple-400
                outline-none
              "
            />
            <button className="text-purple-200 font-bold">
              Enviar
            </button>
          </div>

          {/* REDES */}

          <div className="flex flex-wrap gap-6 text-purple-200 underline">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Youtube</span>
            <span>Tiktok</span>
          </div>

          {/* CONTACTO */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-purple-400 uppercase tracking-wide">
                WhatsApp
              </p>
              <p className="text-purple-100 mt-1">Próximamente</p>
            </div>

            <div>
              <p className="text-purple-400 uppercase tracking-wide">
                Teléfono
              </p>
              <p className="text-purple-100 mt-1">Próximamente</p>
            </div>

            <div>
              <p className="text-purple-400 uppercase tracking-wide">
                Email
              </p>
              <p className="text-purple-100 mt-1">Próximamente</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="text-purple-400 uppercase tracking-wide">
              Dirección
            </p>
            <p className="text-purple-100 mt-1">Próximamente</p>
          </div>

          {/* MEDIOS DE PAGO */}

          <div>
            <p className="text-purple-400 uppercase tracking-wide text-sm mb-2">
              Medios de pago
            </p>
            <p className="text-purple-200 text-sm">
              Mercado Pago · Efectivo
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-purple-800">
        <p className="text-purple-500 text-xs text-center">
          Escuela de los Haikus Gnósticos — Sistema Operativo de la Gnosis
        </p>
      </div>
    </footer>
  );
}