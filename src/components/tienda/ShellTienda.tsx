import Image from "next/image";

export default function ShellTienda() {

  const categorias = [
    {
      nombre: "Remeras",
      imagen: "/tienda/iconos/remera.png",
    },
    {
      nombre: "Hoodies",
      imagen: "/tienda/iconos/hoodie.png",
    },
    {
      nombre: "Joggings",
      imagen: "/tienda/iconos/joggings.png",
    },
    {
      nombre: "Libros",
      imagen: "/tienda/iconos/libro.png",
    },
    {
      nombre: "Accesorios",
      imagen: "/tienda/iconos/accesorios.png",
    },
    {
      nombre: "Artefactos",
      imagen: "/tienda/iconos/medallon.png",
    },
  ];


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
          flex
          items-center
          justify-center
        "
      >


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
            max-w-7xl
            grid
            grid-cols-1
            lg:grid-cols-[1fr_1.2fr]
            gap-16
            items-center
          "
        >



          {/* BLOQUE IDENTIDAD */}

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

              <div className="text-purple-400">
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




          {/* BLOQUE CATEGORIAS */}

          <div
            className="
              flex
              justify-center
            "
          >

            <div
              className="
                w-full
                max-w-3xl
                grid
                grid-cols-2
                md:grid-cols-3
                gap-6
              "
            >

              {categorias.map((categoria) => (

                <button
                  key={categoria.nombre}
                  className="
                    rounded-2xl
                    border
                    border-purple-400
                    bg-black/40
                    p-6
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-purple-200
                    hover:bg-purple-900/40
                  "
                >

                  <Image
                    src={categoria.imagen}
                    alt={categoria.nombre}
                    width={130}
                    height={130}
                    className="object-contain"
                  />


                  <span
                    className="
                      mt-4
                      text-lg
                      font-bold
                    "
                  >
                    {categoria.nombre}
                  </span>


                </button>

              ))}


            </div>


          </div>


        </div>


      </section>


    </main>

  );
}