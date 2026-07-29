import RequiereSesion from "@/components/tienda/RequiereSesion";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequiereSesion>{children}</RequiereSesion>;
}