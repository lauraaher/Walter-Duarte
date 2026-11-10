import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { FormPreview } from "@/components/simulations";
export const metadata: Metadata = {
  title: "Voluntariado general",
  description:
    "Voluntariado general · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Voluntariado general | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Voluntariado general"
        kicker="Participación cívica"
        description="Explora el futuro recorrido de participación. No hay convocatorias ni inscripciones reales."
      />
      <div className="grid2">
        <div>
          <h2>Conocer. Decidir. Participar.</h2>
          <div className="process vertical">
            <span>01 · Consultar la finalidad</span>
            <span>02 · Revisar condiciones</span>
            <span>03 · Confirmar la decisión</span>
          </div>
          <p className="notice">
            Finalidades, requisitos, responsable, retención y avisos legales
            pendientes de revisión.
          </p>
        </div>
        <FormPreview purpose="voluntariado cívico general" />
      </div>
    </main>
  );
}
