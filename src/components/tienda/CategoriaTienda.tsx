import Image from "next/image";


interface CategoriaTiendaProps {

  categoria: string;

}



export default function CategoriaTienda({

  categoria,

}: CategoriaTiendaProps) {



  const nombreCategoria =

    categoria.charAt(0).toUpperCase() +

    categoria.slice(1);



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





        <div

          className="
            border
            border-purple-500

            rounded-xl

            p-6

            bg-black/40
          "

        >



          <h1

            className="
              text-4xl
              font-bold
              text-purple-300
            "

          >

            Tienda de {nombreCategoria}


          </h1>




          <p

            className="
              mt-2
              text-purple-200
            "

          >

            Explorá la colección oficial de la Escuela.


          </p>



        </div>







        {/* ESCENA MERCADER */}



        <div

          className="
            mt-8

            border
            border-purple-500/50

            rounded-xl

            overflow-hidden

            bg-black/40
          "

        >



          <picture>


            <source

              media="(min-width:1024px)"

              srcSet={`/tienda/escenas/${categoria}_desktop.jpg`}

            />



            <source

              media="(min-width:640px)"

              srcSet={`/tienda/escenas/${categoria}_tablet.jpg`}

            />



            <Image

              src={`/tienda/escenas/${categoria}_mobile.jpg`}

              alt={`Escena ${nombreCategoria}`}

              width={600}

              height={800}

              className="
                w-full
                h-auto
                object-cover
              "

              priority

            />



          </picture>




        </div>






        {/* FUTURO CARRUSEL */}



        <div

          className="
            mt-8

            border
            border-purple-500/50

            rounded-xl

            min-h-[300px]

            flex
            items-center
            justify-center
          "

        >



          <span

            className="
              text-purple-300
            "

          >

            Carrusel de productos próximamente


          </span>



        </div>





      </section>



    </main>


  );

}