import Image from "next/image";

import ProductosDestacados from "@/components/tienda/home/ProductosDestacados";
import CategoriaHome from "@/components/tienda/home/CategoriaHome";
import BotonLoginGoogle from "@/components/tienda/BotonLoginGoogle";

export default function ShellTienda() {
  return (
    <main
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        text-white
      "
      style={{
        backgroundImage: "url('/tienda/wallpaper-desktop.png')",
      }}
    >
      <section
        className="
          bg-black/40
          p-8
        "
      >
        <div
          className="
            absolute
            top-6
            right-6
            flex
            flex-col
            items-end
            gap-3
          "
        >
          <BotonLoginGoogle />

          <Image
            src="/tienda/player-icon/20pers.png"
            alt="Jugador"
            width={60}
            height={60}
          />
        </div>

        {/* HERO + CATEGORIAS */}

        <div
          className="
            max-w-7xl
            mx-auto
            grid
            grid-cols-1
            lg:grid-cols-[1fr_1.2fr]
            gap-16
            items-center
            min-h-screen
          "
        >
          {/* IDENTIDAD */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              p-8
            "
          >
            <Image
              src="/tienda/iconos/zorro.png"
              alt="Logo"
              width={220}
              height={220}
            />

            <h1
              className="
                mt-8
                text-5xl
                font-bold
                text-purple-100
                leading-tight
              "
            >
              Tienda de los
              <br />
              Haikus Gnósticos
            </h1>

            <p
              className="
                mt-8
                text-2xl
                text-purple-300
              "
            >
              Sistema Operativo de la Gnosis
            </p>

            <div className="flex items-center gap-5 mt-10">
              <div className="h-px w-32 bg-purple-500" />
              <div className="text-purple-400">✦</div>
              <div className="h-px w-32 bg-purple-500" />
            </div>

            <p
              className="
                mt-10
                text-xl
                text-purple-300
              "
            >
              Explorá el mercado de la Escuela
            </p>
          </div>

          {/* CATEGORIAS */}

          <CategoriaHome />
        </div>

        {/* PRODUCTOS DESTACADOS */}

        <ProductosDestacados />

      </section>
    </main>
  );
}