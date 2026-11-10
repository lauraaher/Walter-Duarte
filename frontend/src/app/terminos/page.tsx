import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Términos",
  description:
    "Términos · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Términos | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead title="Términos" kicker="Información / Demo local" />
      <div className="grid2">
        <div className="panel">
          <h2>En esta demo</h2>
          <p>
            Entorno local de revisión, sin servicios contratados ni publicación.
            Las muestras no son contenido real ni compromisos de Walter Duarte.
          </p>
        </div>
        <div className="panel">
          <h2>Antes de publicar</h2>
          <p>
            Condiciones definitivas, responsable, propiedad intelectual y usos
            del portal pendientes de revisión. Cartografía DANE bajo CC BY 4.0
            con atribución.
          </p>
        </div>
      </div>
      <Link href="/contacto" className="textlink">
        Consultar estado del contacto →
      </Link>
    </main>
  );
}
