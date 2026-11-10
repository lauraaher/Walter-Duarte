import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Transparencia",
  description:
    "Transparencia · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Transparencia | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead title="Transparencia" kicker="Información / Demo local" />
      <div className="grid2">
        <div className="panel">
          <h2>En esta demo</h2>
          <p>
            Este portal se encuentra en expectativa. La demo separa información
            geográfica oficial, contenido editorial pendiente y ejemplos
            sintéticos.
          </p>
        </div>
        <div className="panel">
          <h2>Antes de publicar</h2>
          <p>
            Responsables editoriales, fuentes, autorizaciones y política de
            correcciones pendientes de publicación.
          </p>
        </div>
      </div>
      <Link href="/contacto" className="textlink">
        Consultar estado del contacto →
      </Link>
    </main>
  );
}
