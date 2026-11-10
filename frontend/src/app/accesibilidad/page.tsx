import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Accesibilidad",
  description:
    "Accesibilidad · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Accesibilidad | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead title="Accesibilidad" kicker="Información / Demo local" />
      <div className="grid2">
        <div className="panel">
          <h2>En esta demo</h2>
          <p>
            La interfaz incluye navegación por teclado, foco visible, lista
            alternativa al mapa y reducción de movimiento.
          </p>
        </div>
        <div className="panel">
          <h2>Antes de publicar</h2>
          <p>
            Objetivo WCAG 2.2 AA. No se declara conformidad total; quedan
            pendientes auditoría especializada y pruebas con tecnologías de
            asistencia y usuarios.
          </p>
        </div>
      </div>
      <Link href="/contacto" className="textlink">
        Consultar estado del contacto →
      </Link>
    </main>
  );
}
