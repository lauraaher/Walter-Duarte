import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { History } from "@/components/history";
export const metadata: Metadata = {
  title: "Mi historia",
  description:
    "Mi historia · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Mi historia | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead title="Mi historia" kicker="Memoria / Trayectoria / Fuentes" />
      <History />
    </main>
  );
}
