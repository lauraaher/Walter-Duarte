import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Catalog } from "@/components/catalog";
import { FormPreview } from "@/components/simulations";
export const metadata: Metadata = {
  title: "Ideas para el Tolima",
  description:
    "Ideas para el Tolima · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Ideas para el Tolima | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Ideas para el Tolima"
        kicker="Archivo de conocimiento"
        description="Explora documentos, temas y territorios. Ninguna muestra representa una propuesta real de Walter Duarte."
      />
      <Catalog ideas />
      <section className="section">
        <h2>De una idea a una conversación</h2>
        <div className="process">
          <span>01 · Presentación simulada</span>
          <span>02 · Revisión simulada</span>
          <span>03 · Respuesta pendiente</span>
        </div>
        <FormPreview purpose="recepción futura de propuestas ciudadanas" />
      </section>
    </main>
  );
}
