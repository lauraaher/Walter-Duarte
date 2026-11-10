import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Participa",
  description:
    "Participa · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Participa | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Participar empieza por acercarnos"
        kicker="Participación cívica"
        description="Explora espacios de aprendizaje, ideas y voluntariado. Esta demo no realiza inscripciones."
      />
      <div className="grid3">
        {[
          [
            "/participa/liderazgo",
            "Aprende y lidera",
            "Recorre el aula de muestra.",
          ],
          [
            "/participa/voluntariado",
            "Voluntariado general",
            "Conoce un flujo de participación.",
          ],
          ["/ideas", "Comparte una idea", "Explora una propuesta simulada."],
        ].map(([h, t, d]) => (
          <Link className="panel action-card" key={h} href={h}>
            <span className="arrow">↗</span>
            <h2>{t}</h2>
            <p>{d}</p>
          </Link>
        ))}
      </div>
      <section className="rights-feature">
        <span className="kicker">Orientación abierta</span>
        <h2>Protege tus derechos</h2>
        <p>Sin registro ni recepción de denuncias.</p>
        <Link className="btn light" href="/participa/protege-tus-derechos">
          Ver rutas de orientación ↗
        </Link>
      </section>
    </main>
  );
}
