import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Catalog } from "@/components/catalog";
export const metadata: Metadata = {
  title: "Biblioteca de herramientas",
  description:
    "Biblioteca de herramientas · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Biblioteca de herramientas | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Biblioteca de herramientas"
        kicker="Consultar / Aprender / Compartir"
        description="Una biblioteca en preparación. Explora sus formatos y filtros con muestras de diseño."
      />
      <Catalog />
    </main>
  );
}
