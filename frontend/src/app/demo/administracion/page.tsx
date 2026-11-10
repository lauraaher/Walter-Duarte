import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { Admin } from "@/components/simulations";
export const metadata: Metadata = {
  title: "Administración demostrativa",
  description:
    "Administración demostrativa · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Administración demostrativa | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Administración de muestra"
        kicker="Demo / Solo estados visuales"
      />
      <Admin />
    </main>
  );
}
