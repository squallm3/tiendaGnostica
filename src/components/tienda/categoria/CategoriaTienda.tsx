import HeaderCategoria from "./HeaderCategoria";
import MercaderBanner from "./MercaderBanner";
import ProductoCard from "../ProductoCard";


export default function CategoriaTienda() {


  const productos = [


    {
      nombre: "Remera Haiku",

      descripcion:
        "Diseño oficial de la Escuela de los Haikus Gnósticos.",

      precio: 25000,

      imagenes: [
        "/tienda/mercader/remeras/01.jpg",
      ],

    },


    {
      nombre: "Remera Gnosis",

      descripcion:
        "Símbolo del sistema operativo espiritual.",

      precio: 25000,

      imagenes: [
        "/tienda/mercader/remeras/02.jpg",
      ],

    },


    {
      nombre: "Remera Lobo",

      descripcion:
        "Inspirada en la escuela del lobo.",

      precio: 28000,

      imagenes: [
        "/tienda/mercader/remeras/03.jpg",
      ],

    },


    {
      nombre: "Remera Escuela",

      descripcion:
        "Diseño especial de la colección.",

      precio: 30000,

      imagenes: [
        "/tienda/mercader/remeras/04.jpg",
      ],

    },


    {
      nombre: "Remera Gnosis Avanzada",

      descripcion:
        "Edición especial del mercader.",

      precio: 32000,

      imagenes: [
        "/tienda/mercader/remeras/05.jpg",
      ],

    },


  ];



  return (


    <main

      className="
        min-h-screen
        bg-black
        text-white
        p-6
      "

    >



      <section

        className="
          max-w-7xl
          mx-auto
        "

      >



        <HeaderCategoria

          titulo="Remeras"

        />



        <div className="mt-8">


          <MercaderBanner

            categoria="remeras"

          />


        </div>




        <div

          className="
            mt-10

            grid

            grid-cols-1

            md:grid-cols-3

            gap-6

          "

        >


          {productos.map((producto) => (


            <ProductoCard

              key={producto.nombre}

              nombre={producto.nombre}

              descripcion={producto.descripcion}

              precio={producto.precio}

              imagenes={producto.imagenes}

            />


          ))}


        </div>



      </section>


    </main>


  );

}