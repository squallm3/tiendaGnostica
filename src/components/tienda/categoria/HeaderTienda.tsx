import Image from "next/image";


export default function HeaderTienda() {


  return (

    <header
      className="
        w-full
        h-24
        bg-black/80
        border
        border-purple-500
        rounded-xl
        flex
        items-center
        justify-between
        px-8
        text-purple-200
      "
    >


      {/* MENU CATEGORIAS */}

      <button
        className="
          text-4xl
          text-purple-400
        "
      >

        📖

      </button>



      {/* IDENTIDAD */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        <Image
          src="/tienda/iconos/zorro.png"
          alt="Haikus Gnósticos"
          width={70}
          height={70}
        />


        <div
          className="
            text-center
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-purple-100
            "
          >

            TIENDA DE HAÍKUS GNÓSTICOS

          </h1>


          <p
            className="
              text-sm
              text-purple-400
            "
          >

            Sistema Operativo de la Gnosis

          </p>


        </div>


      </div>




      {/* CARRITO */}

      <button
        className="
          text-3xl
          text-purple-400
        "
      >

        🛒

      </button>



    </header>

  );

}