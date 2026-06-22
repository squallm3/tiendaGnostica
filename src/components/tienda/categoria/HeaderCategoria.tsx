import Image from "next/image";
import { BookOpen, ShoppingCart } from "lucide-react";


interface HeaderCategoriaProps {
  titulo: string;
}


export default function HeaderCategoria({
  titulo,
}: HeaderCategoriaProps) {


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

        px-8
        md:px-12

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



      {/* ESQUINAS */}

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





      {/* LIBRO */}

      <button
        className="
          relative
          z-10

          flex
          items-center
          justify-center

          w-14
          h-14

          rounded-xl

          border
          border-purple-400/40

          text-purple-300
        "
      >

        <BookOpen
          size={32}
          strokeWidth={1.5}
        />

      </button>





      {/* TITULO */}

      <div
        className="
          relative
          z-10

          flex
          items-center
          gap-4
        "
      >


        <span className="text-purple-400 text-xl">
          ✦
        </span>


        <div
          className="
            text-center
          "
        >

          <h1
            className="
              text-3xl
              md:text-4xl

              font-bold

              tracking-[0.2em]

              text-purple-100
            "
          >

            TIENDA DE {titulo.toUpperCase()}

          </h1>


          <p
            className="
              mt-2

              text-xs
              md:text-sm

              tracking-[0.3em]

              text-purple-400
            "
          >

            SISTEMA OPERATIVO DE LA GNOSIS

          </p>


        </div>



        <span className="text-purple-400 text-xl">
          ✦
        </span>


      </div>





      {/* CARRITO */}

      <button
        className="
          relative
          z-10

          flex
          items-center
          justify-center

          w-14
          h-14

          rounded-xl

          border
          border-purple-400/40

          text-purple-300
        "
      >

        <ShoppingCart
          size={32}
          strokeWidth={1.5}
        />

      </button>



    </header>

  );

}