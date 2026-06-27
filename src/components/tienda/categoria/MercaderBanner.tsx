import Image from "next/image";


interface MercaderBannerProps {

  categoria: string;

}



export default function MercaderBanner({

  categoria,

}: MercaderBannerProps) {


  return (

    <section
      className="
        relative

        w-full

        overflow-hidden

        rounded-2xl

        border
        border-purple-400/60

        bg-black/60

        shadow-[0_0_30px_rgba(168,85,247,0.35)]
      "
    >


      <picture>


        {/* DESKTOP */}

        <source
          media="(min-width: 1024px)"
          srcSet={`/tienda/escenas/${categoria}_desktop.jpg`}
        />



        {/* TABLET */}

        <source
          media="(min-width: 640px)"
          srcSet={`/tienda/escenas/${categoria}_tablet.jpg`}
        />



        {/* MOBILE */}

        <Image

          src={`/tienda/escenas/${categoria}_mobile.jpg`}

          alt={`Escena ${categoria}`}

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



    </section>

  );

}