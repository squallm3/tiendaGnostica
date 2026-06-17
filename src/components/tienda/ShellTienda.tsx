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
          flex
          items-center
          justify-center
          p-8
          bg-black/40
        "
      >

        <div
          className="
            w-full
            max-w-6xl
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
          "
        >

          {/* BLOQUE IDENTIDAD */}

          <div
            className="
              rounded-2xl
              border
              border-purple-500/50
              bg-black/60
              backdrop-blur
              p-10
            "
          >

            <h1
              className="
                text-5xl
                font-bold
                text-purple-200
              "
            >
              Tienda de los
              <br />
              Haikus Gnósticos
            </h1>


            <p
              className="
                mt-8
                text-xl
                text-purple-300
              "
            >
              Sistema Operativo de la Gnosis
            </p>


          </div>


          {/* BLOQUE INVENTARIO */}

          <div
            className="
              rounded-2xl
              border
              border-purple-500/50
              bg-black/60
              backdrop-blur
              p-10
            "
          >

            <h2
              className="
                text-3xl
                text-purple-200
              "
            >
              Categorías
            </h2>


            <div
              className="
                mt-8
                grid
                grid-cols-2
                gap-5
              "
            >

              <button
                className="
                  rounded-xl
                  border
                  border-purple-400
                  p-6
                  text-purple-200
                  hover:bg-purple-900/40
                "
              >
                👕
                <br />
                Remeras
              </button>


              <button
                className="
                  rounded-xl
                  border
                  border-purple-400
                  p-6
                  text-purple-200
                  hover:bg-purple-900/40
                "
              >
                🧥
                <br />
                Hoodies
              </button>


              <button
                className="
                  rounded-xl
                  border
                  border-purple-400
                  p-6
                  text-purple-200
                  hover:bg-purple-900/40
                "
              >
                👖
                <br />
                Joggings
              </button>


              <button
                className="
                  rounded-xl
                  border
                  border-purple-400
                  p-6
                  text-purple-200
                  hover:bg-purple-900/40
                "
              >
                🔮
                <br />
                Artefactos
              </button>


            </div>


          </div>


        </div>


      </section>


    </main>
  );
}