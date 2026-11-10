import Link from "next/link";
import { notFound } from "next/navigation";
import { rights } from "@/data/content";
import { PageHead, Empty } from "@/components/ui";
export const generateStaticParams = () => rights.map(([slug]) => ({ slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: rights.find((r) => r[0] === slug)?.[1] || "Ruta no encontrada",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = rights.find((r) => r[0] === slug);
  if (!r) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title={r[1]}
        kicker="Protección de derechos / Orientación abierta"
        description="Ruta de orientación en preparación. No se reciben denuncias ni información personal."
      />
      <div className="grid2">
        <Empty
          title="Canal oficial pendiente"
          text="Entidad, enlace, cobertura territorial y fecha de verificación pendientes. No se ofrecen destinos sin confirmar."
        />
        <Empty
          title="Material de orientación"
          text="Guías y revisión jurídica pendientes. No hay archivos disponibles ni asesoría individual en esta demo."
        />
      </div>
      <Link href="/participa/protege-tus-derechos" className="textlink">
        Volver a las rutas de orientación →
      </Link>
    </main>
  );
}
