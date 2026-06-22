import Image from "next/image";


export default function HeaderTienda() {


  return (

    <header
      className="
        relative
        w-full
        h-32

        bg-gradient-to-r
        from-black
        via-purple-950/40
        to-black

        border
        border-purple-500/70

        shadow-[0_0_40px_rgba(168,85,247,0.35)]

        flex
        items-center
        justify-between

        px-10

        overflow-hidden
      "
    >


      {/* MARCO INTERNO */}

      <div
        className="
          absolute
          inset-2

          border
          border-purple-400/30

          pointer-events-none
        "
      />



      {/* ESQUINAS ORNAMENTALES */}

      <div
        className="
          absolute
          top-0
          left-0

          w-12
          h-12

          border-t-2
          border-l-2

          border-purple-300
        "
      />

      <div
        className="
          absolute
          top-0
          right-0

          w-12
          h-12

          border-t-2
          border-r-2

          border-purple-300
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0

          w-12
          h-12

          border-b-2
          border-l-2

          border-purple-300
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0

          w-12
          h-12

          border-b-2
          border-r-2

          border-purple-300
        "
      />





      {/* MENU */}

      <button
        className="
          relative
          z-10

          text-4xl

          text-purple-300

          hover:text-purple-100
        "
      >

        ✦

      </button>





      {/* IDENTIDAD */}

      <div
        className="
          relative
          z-10

          flex
          items-center

          gap-6
        "
      >


        <Image
          src="/tienda/iconos/zorro.png"
          alt="Haikus Gnósticos"
          width={80}
          height={80}
        />



        <div
          className="
            flex
            flex-col
            items-center
          "
        >


          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <span
              className="
                text-purple-400
                text-xl
              "
            >
              ✦
            </span>


            <h1
              className="
                text-4xl

                font-bold

                tracking-[0.25em]

                text-purple-100
              "
            >

              HAÍKUS GNÓSTICOS

            </h1>


            <span
              className="
                text-purple-400
                text-xl
              "
            >
              ✦
            </span>


          </div>



          <p
            className="
              mt-2

              text-sm

              tracking-[0.35em]

              text-purple-400
            "
          >

            SISTEMA OPERATIVO DE LA GNOSIS

          </p>


        </div>


      </div>





      {/* CARRITO */}

      <button
        className="
          relative
          z-10

          text-4xl

          text-purple-300
        "
      >

        ✧

      </button>



    </header>


  );

}