import Image from "next/image";


interface MercaderBannerProps {

  titulo?: string;
  imagen: string;

}


export default function MercaderBanner({

  titulo = "Mercader",
  imagen,

}: MercaderBannerProps) {


  return (

    <section
      className="
        w-full

        rounded-2xl

        border
        border-purple-400/60

        bg-black/60

        shadow-[0_0_30px_rgba(168,85,247,0.35)]

        p-8
      "
    >


      <div
        className="
          flex
          flex-col
          items-center
          gap-5
        "
      >


        <Image
          src={imagen}
          alt={titulo}
          width={500}
          height={500}
          className="object-contain"
        />



        <h2
          className="
            text-3xl

            font-bold

            text-purple-100
          "
        >

          {titulo}

        </h2>



        <p
          className="
            text-purple-300
            text-lg
          "
        >

          Explorá los objetos de la Escuela

        </p>


      </div>


    </section>

  );

}