"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function RequiereSesion({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, cargando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!cargando && !usuario) {
      router.replace("/");
    }
  }, [cargando, usuario, router]);

  if (cargando) {
    return (
      <main className="min-h-screen bg-black text-purple-200 flex items-center justify-center">
        Cargando...
      </main>
    );
  }

  if (!usuario) {
    return null;
  }

  return <>{children}</>;
}