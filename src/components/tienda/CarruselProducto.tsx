"use client";

import Image from "next/image";
import { useState } from "react";


interface CarruselProductoProps {

  imagenes: string[];

}



export default function CarruselProducto({

  imagenes,

}: CarruselProductoProps) {


  const [indice, setIndice] = useState(0);



  function anterior() {

    setIndice(

      indice === 0

        ? imagenes.length - 1

        : indice - 1

    );

  }



  function siguiente() {

    setIndice(

      indice === imagenes.length - 1

        ? 0

        : indice + 1

    );

  }



  return (


    <div

      className="
        relative
        w-full
        aspect-[4/5]
        overflow-hidden
        rounded-xl
        bg-black
      "

    >


      <Image

        src={imagenes[indice]}

        alt="Producto"

        fill

        className="
          object-contain
        "

      />



      <button

        onClick={anterior}

        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2

          bg-black/60
          border
          border-purple-400

          rounded-full

          w-10
          h-10

          text-purple-200

        "

      >

        ‹

      </button>




      <button

        onClick={siguiente}

        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          bg-black/60
          border
          border-purple-400

          rounded-full

          w-10
          h-10

          text-purple-200

        "

      >

        ›

      </button>



    </div>


  );

}