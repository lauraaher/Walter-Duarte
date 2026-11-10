import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Actuality } from "@/components/actuality";
export const metadata: Metadata = {
  title: "Agenda y noticias",
  description:
    "Agenda y noticias · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Agenda y noticias | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Agenda y noticias"
        kicker="Encuentros / Actualidad"
        description="Información confirmada cuando esté disponible. Prueba el calendario con un conjunto de datos ficticios opcional."
      />
      <Actuality />
    </main>
  );
}
