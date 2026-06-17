import Image from "next/image";

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
          min-h-screen
          bg-black/40
          p-8
          relative
        "
      >

        {/* PLAYER */}

        <div
          className="
            absolute
            top-6
            right-6
          "
        >

          <Image
            src="/tienda/player-icon/20pers.png"
            alt="Jugador"
            width={60}
            height={60}
          />

        </div>


        <div
          className="
            w-full
            max-w-6xl
            mx-auto
            min-h-screen
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            items-center
          "
        >


          {/* IDENTIDAD */}

          <div
            className="
              flex
              flex-col
              items-center
              text-center
              p-10
            "
          >

            <div className="mb-8">

              <Image
                src="/tienda/iconos/zorro.png"
                alt="Logo"
                width={220}
                height={220}
              />

            </div>


            <h1
              className="
                text-5xl
                font-bold
                leading-tight
                text-purple-100
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



            <div
              className="
                flex
                items-center
                gap-5
                mt-10
              "
            >

              <div className="h-px w-32 bg-purple-500" />

              <div className="text-purple-400 text-2xl">
                ✦
              </div>

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

          <div
            className="
              grid
              grid-cols-2
              gap-5
            "
          >


            {[
              ["👕", "Remeras"],
              ["🧥", "Hoodies"],
              ["👖", "Joggings"],
              ["📖", "Libros"],
              ["☕", "Accesorios"],
              ["🔮", "Artefactos"],
            ].map(([icon, title]) => (

              <button
                key={title}
                className="
                  rounded-2xl
                  border
                  border-purple-400
                  bg-black/40
                  p-8
                  text-purple-200
                  hover:bg-purple-900/40
                "
              >

                <div className="text-5xl">
                  {icon}
                </div>

                <div className="mt-4 text-xl font-bold">
                  {title}
                </div>

              </button>

            ))}


          </div>


        </div>


      </section>


    </main>
  );
}