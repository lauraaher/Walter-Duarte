import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";
import { rights } from "@/data/content";
export const metadata: Metadata = {
  title: "Protege tus derechos",
  description:
    "Protege tus derechos · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Protege tus derechos | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Protege tus derechos"
        kicker="Orientación abierta / Sin registro"
        description="Explora las categorías de orientación. No se reciben denuncias, testimonios, archivos ni información de víctimas."
      />
      <div className="grid3">
        {rights.map(([slug, title], i) => (
          <Link
            className="panel action-card"
            href={"/participa/protege-tus-derechos/" + slug}
            key={slug}
          >
            <span className="kicker">0{i + 1} / Orientación</span>
            <h2>{title}</h2>
            <span className="textlink">Consultar estado de la ruta ↗</span>
          </Link>
        ))}
      </div>
      <p className="notice">
        Los canales y materiales específicos están pendientes de verificación.
        Esta demo no presenta destinos sin confirmar como canales oficiales.
      </p>
    </main>
  );
}
