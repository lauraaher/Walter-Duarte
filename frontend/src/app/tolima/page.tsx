import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Territory } from "@/components/territory";
export const metadata: Metadata = {
  title: "Recorriendo el Tolima",
  description:
    "Recorriendo el Tolima · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Recorriendo el Tolima | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Recorriendo el Tolima"
        kicker="Territorio / 47 municipios"
        description="Explora la cartografía oficial y abre una ficha municipal. Las historias se incorporarán cuando estén documentadas."
      />
      <Territory />
    </main>
  );
}
