import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui";
import { communities } from "@/data/content";
export const metadata: Metadata = {
  title: "Comunidades",
  description:
    "Comunidades · Demo local con contenidos pendientes y muestras identificadas.",
  openGraph: {
    title: "Comunidades | Walter Duarte H.",
    description: "Demo local no publicada",
  },
};
export default function Page() {
  return (
    <main id="contenido" className="shell route-body">
      <PageHead
        title="Un territorio, cinco conversaciones"
        kicker="Comunidades"
        description="Espacios temáticos abiertos para consultar, aprender y compartir ideas."
      />
      <div className="community-grid">
        {communities.map((c) => (
          <Link
            className="community-card"
            key={c.slug}
            href={"/comunidades/" + c.slug}
          >
            <span className="community-mark">{c.mark}</span>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <span className="textlink">Explorar comunidad ↗</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
