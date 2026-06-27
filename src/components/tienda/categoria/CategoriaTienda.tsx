import HeaderCategoria from "./HeaderCategoria";
import MercaderBanner from "./MercaderBanner";


export default function CategoriaTienda() {


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



        <div
          className="
            mt-8
          "
        >

          <MercaderBanner
            categoria="remeras"
          />

        </div>



      </section>


    </main>

  );

}