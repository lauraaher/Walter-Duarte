import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, Empty } from "@/components/ui";

export const metadata: Metadata = {
  title: "Liderazgo comunitario",
  description:
    "Liderazgo comunitario · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Liderazgo comunitario | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Aprender para participar"
        kicker="Liderazgo comunitario / Aula"
        description="Una experiencia formativa de muestra. No hay inscripción, seguimiento personal ni certificación real."
      />
      <div className="resource-feature">
        <div>
          <span className="tag">Curso sintético · 3 lecciones</span>
          <h2>Explora la participación</h2>
          <p>
            Recorre una lección, una autoevaluación impersonal y una constancia
            simulada.
          </p>
          <Link href="/participa/liderazgo/curso-demo" className="btn">
            Entrar al curso de muestra ↗
          </Link>
        </div>
        <div className="lesson-placeholder">
          <span>El aula, abierta a explorar.</span>
          <p>Material de demostración</p>
        </div>
      </div>
      <section className="section">
        <Empty
          title="Catálogo formativo pendiente"
          text="Cursos, docentes, materiales y permisos deberán aprobarse antes de publicar formación real."
        />
      </section>
    </main>
  );
}
