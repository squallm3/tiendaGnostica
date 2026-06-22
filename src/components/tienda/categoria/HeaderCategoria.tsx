import Image from "next/image";

interface HeaderCategoriaProps {
  titulo: string;
}


export default function HeaderCategoria({
  titulo,
}: HeaderCategoriaProps) {

  return (

    <section
      className="
        w-full
        rounded-2xl
        border-2
        border-purple-400
        shadow-[0_0_30px_rgba(168,85,247,0.5)]
        bg-black/70
        p-8
      "
    >

      <div
        className="
          flex
          items-center
          justify-center
          gap-6
        "
      >

        <Image
          src="/tienda/iconos/zorro.png"
          alt="Haikus"
          width={90}
          height={90}
        />


        <h1
          className="
            text-5xl
            font-bold
            text-purple-100
          "
        >

          Tienda de {titulo}

        </h1>


      </div>


    </section>

  );

}