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
        border-2
        border-purple-400
        shadow-[0_0_30px_rgba(168,85,247,0.5)]
        bg-black/70
        overflow-hidden
        p-6
      "
    >

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-6
        "
      >

        <Image
          src={imagen}
          alt={titulo}
          width={600}
          height={600}
          className="
            object-contain
          "
        />


        <h2
          className="
            text-4xl
            font-bold
            text-purple-100
            text-center
          "
        >

          {titulo}

        </h2>


      </div>

    </section>

  );

}