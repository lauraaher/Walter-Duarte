import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Walter Duarte Hernández · Demo local",
    template: "%s | Walter Duarte H.",
  },
  description:
    "Demo local del portal territorial y ciudadano. Contenidos personales pendientes de documentación.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Walter Duarte Hernández",
    description: "Portal ciudadano · demo local no publicada",
    locale: "es_CO",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
