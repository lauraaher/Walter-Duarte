import Link from "next/link";
import { notFound } from "next/navigation";
import municipalities from "@/data/municipalities.json";
import { pendingTerritory } from "@/lib/content";
import { PageHead, Empty } from "@/components/ui";
export const generateStaticParams = () =>
  municipalities.map((m) => ({ slug: m.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      municipalities.find((m) => m.slug === slug)?.name ||
      "Municipio no encontrado",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = municipalities.find((m) => m.slug === slug);
  if (!m) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title={m.name}
        kicker={"Tolima / DIVIPOLA " + m.code}
        description={pendingTerritory}
      />
      <div className="municipal-hero">
        <div className="archive-placeholder">
          <span className="kicker">Archivo del territorio</span>
          <h2>{m.name}</h2>
          <p>Fotografía autorizada pendiente</p>
        </div>
        <div className="panel">
          <span className="tag">Dato geográfico oficial</span>
          <h2>Una ficha para conocer el territorio</h2>
          <dl>
            <div>
              <dt>Departamento</dt>
              <dd>TOLIMA · 73</dd>
            </div>
            <div>
              <dt>Municipio</dt>
              <dd>
                {m.name} · {m.code}
              </dd>
            </div>
            <div>
              <dt>Año del atributo</dt>
              <dd>{m.year}</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd>DANE · MGN 2025 / Municipio 317</dd>
            </div>
          </dl>
          <Link className="btn" href="/tolima">
            Volver al explorador
          </Link>
        </div>
      </div>
      <section className="section grid3">
        <Empty title="Trayectoria y memoria" text={pendingTerritory} />
        <Empty
          title="Actividades"
          text="No hay actividades documentadas ni publicadas para este municipio."
        />
        <Empty
          title="Galería y soportes"
          text="Fotografías, fecha, lugar, autor y permisos pendientes."
        />
      </section>
      <div className="actions">
        <Link className="btn secondary" href="/ideas">
          Consultar ideas
        </Link>
        <Link className="btn secondary" href="/comunidades">
          Explorar comunidades
        </Link>
      </div>
      <p className="map-attribution">
        Departamento Administrativo Nacional de Estadística — DANE:
        www.dane.gov.co · CC BY 4.0. Consulta 10/11/2026. Sin estadísticas ni
        hechos locales añadidos.
      </p>
    </main>
  );
}
