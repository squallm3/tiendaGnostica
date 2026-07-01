import CarruselProducto from "./CarruselProducto";


type ProductoCardProps = {

  nombre: string;

  descripcion: string;

  precio: number;

  imagenes: string[];

};



export default function ProductoCard({

  nombre,

  descripcion,

  precio,

  imagenes,

}: ProductoCardProps) {


  return (


    <div

      className="
        border
        border-purple-500

        rounded-xl

        bg-black/40

        p-4

        overflow-hidden

      "

    >


      <CarruselProducto

        imagenes={imagenes}

      />



      <h3

        className="
          mt-5

          text-xl

          font-bold

          text-purple-100

        "

      >

        {nombre}


      </h3>




      <p

        className="
          mt-2

          text-purple-200

        "

      >

        {descripcion}


      </p>




      <p

        className="
          mt-3

          text-purple-400

          font-bold

        "

      >

        ${precio}


      </p>




      <button

        className="
          mt-4

          border
          border-purple-400

          px-4
          py-2

          rounded-lg

          text-purple-200

        "

      >

        VER DETALLE


      </button>



    </div>


  );

}