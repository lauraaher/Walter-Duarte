import Link from "next/link";
import { notFound } from "next/navigation";
import { events, news } from "@/data/content";
import { PageHead, SampleNotice, Empty } from "@/components/ui";
import { localDate } from "@/lib/content";
export const generateStaticParams = () => [
  ...events.map((e) => ({ kind: "eventos", slug: e.slug })),
  ...news.map((n) => ({ kind: "noticias", slug: n.slug })),
];
export async function generateMetadata({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}) {
  const { kind, slug } = await params;
  return {
    title:
      (kind === "eventos" ? events : news).find((e) => e.slug === slug)
        ?.title || "Contenido no encontrado",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ kind: string; slug: string }>;
}) {
  const { kind, slug } = await params;
  const item = (
    kind === "eventos" ? events : kind === "noticias" ? news : []
  ).find((e) => e.slug === slug);
  if (!item) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title={item.title}
        kicker={"Ficticio / No publicado / " + localDate(item.date)}
      />
      <SampleNotice />
      <div className="grid2">
        <div className="archive-placeholder">
          <h2>Espacio de {kind === "eventos" ? "encuentro" : "publicación"}</h2>
          <p>Imagen pendiente · Ejemplo sintético</p>
        </div>
        <div className="panel">
          <h2>Detalle de muestra</h2>
          <p>Fecha de ejemplo: {localDate(item.date)} · America/Bogota.</p>
          <p>
            Registro diseñado únicamente para probar navegación, orden y
            presentación. No corresponde a una actividad ni publicación de
            Walter Duarte.
          </p>
          <Empty
            title="Contenido y fuentes"
            text="Sin autor, lugar, participantes ni contenido real atribuido."
          />
          <Link href="/actualidad" className="textlink">
            Volver a agenda y noticias →
          </Link>
        </div>
      </div>
    </main>
  );
}
