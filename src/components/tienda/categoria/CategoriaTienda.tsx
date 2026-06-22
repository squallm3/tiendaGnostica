import HeaderTienda from "./HeaderTienda";
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


        <HeaderTienda />



        <div
          className="
            mt-8
          "
        >

          <MercaderBanner
            titulo="Mercader de Remeras"
            imagen="/tienda/mercader/remeras.png"
          />

        </div>


      </section>


    </main>

  );

}