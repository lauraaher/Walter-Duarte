import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { FormPreview } from "@/components/simulations";
export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Contacto | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Contacto"
        description="Canales oficiales pendientes de validación. Esta vista no envía mensajes."
      />
      <FormPreview purpose="contacto general" />
    </main>
  );
}
