"use client";

import { usePathname } from "next/navigation";
import BotonWhatsApp from "@/components/tienda/BotonWhatsApp";
import BotonCarritoFlotante from "@/components/tienda/BotonCarritoFlotante";
import PopupNewsletter from "@/components/tienda/PopupNewsletter";
import BotonAdmin from "@/components/tienda/BotonAdmin";

export default function BotonesFlotantes() {
  const pathname = usePathname();

  // Dentro del panel de administracion no mostramos nada de la tienda
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <BotonAdmin />
      <BotonWhatsApp />
      <BotonCarritoFlotante />
      <PopupNewsletter />
    </>
  );
}