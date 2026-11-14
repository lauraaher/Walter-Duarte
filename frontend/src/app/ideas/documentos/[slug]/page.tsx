export const dynamicParams = false;
import { notFound } from "next/navigation";
import { documents, communities } from "@/data/content";
import { DocumentDetail } from "@/components/document-detail";
export const generateStaticParams = () =>
  documents.map((r) => ({ slug: r.slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      documents.find((r) => r.slug === slug)?.title ||
      "Documento no encontrado",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = documents.find((r) => r.slug === slug);
  if (!r) notFound();
  return (
    <main id="contenido" className="shell route-body">
      <DocumentDetail
        {...r}
        format={r.type}
        topic={communities.find((c) => c.slug === r.topic)!.short}
      />
    </main>
  );
}
