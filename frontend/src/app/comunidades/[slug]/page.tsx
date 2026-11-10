import Link from "next/link";
import { notFound } from "next/navigation";
import { communities } from "@/data/content";
import { PageHead, Empty } from "@/components/ui";
import { Catalog } from "@/components/catalog";
export const generateStaticParams = () =>
  communities.map((c) => ({ slug: c.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      communities.find((c) => c.slug === slug)?.short ||
      "Comunidad no encontrada",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = communities.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title={c.title}
        kicker={"Comunidad / " + c.mark}
        description={c.description}
      />
      <div className="community-banner">
        <span className="community-mark">{c.mark}</span>
        <h2>
          Conocer nos acerca.
          <br />
          Participar nos conecta.
        </h2>
        <p>Presentación editorial ampliada pendiente de aprobación.</p>
      </div>
      <section className="section">
        <h2>Recursos y material de consulta</h2>
        <Catalog initialTopic={c.slug} />
      </section>
      <div className="grid3">
        <Empty title="Artículos" />
        <Empty title="Actividades" />
        <Empty
          title="Vídeos"
          text="Material audiovisual autorizado pendiente. No se cargan reproductores externos."
        />
      </div>
      <div className="actions">
        <Link className="btn" href="/ideas">
          Explora ideas ciudadanas ↗
        </Link>
        <Link className="btn secondary" href="/comunidades">
          Todas las comunidades
        </Link>
      </div>
    </main>
  );
}
