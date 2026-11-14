export const dynamicParams = false;
import { notFound } from "next/navigation";
import { resources, communities } from "@/data/content";
import { DocumentDetail } from "@/components/document-detail";
export const generateStaticParams = () =>
  resources.map((r) => ({ slug: r.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      resources.find((r) => r.slug === slug)?.title || "Recurso no encontrado",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = resources.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <DocumentDetail
        {...r}
        topic={communities.find((c) => c.slug === r.topic)!.short}
      />
    </main>
  );
}
