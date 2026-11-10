import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Privacidad · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Privacidad | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead title="Privacidad" kicker="Información / Demo local" />
      <div className="grid2">
        <div className="panel">
          <h2>En esta demo</h2>
          <p>
            La demo no habilita captación ni almacenamiento de datos personales.
            Las búsquedas y estados se procesan temporalmente en memoria del
            navegador.
          </p>
        </div>
        <div className="panel">
          <h2>Antes de publicar</h2>
          <p>
            No hay cookies de seguimiento, analytics ni integraciones de
            terceros. Los formularios son no editables. La política legal para
            producción requiere aprobación independiente.
          </p>
        </div>
      </div>
      <Link href="/contacto" className="textlink">
        Consultar estado del contacto →
      </Link>
    </main>
  );
}
