import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Course } from "@/components/simulations";
export const metadata: Metadata = {
  title: "Curso de demostración",
  description:
    "Curso de demostración · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Curso de demostración | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Aula de demostración"
        kicker="Formación / Sin inscripción"
      />
      <Course />
    </main>
  );
}
