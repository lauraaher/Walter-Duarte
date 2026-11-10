import Link from "next/link";
import { PageHead, SampleNotice } from "./ui";
export function DocumentDetail({
  title,
  format,
  status,
  year,
  topic,
}: {
  title: string;
  format: string;
  status: string;
  year: string;
  topic: string;
}) {
  return (
    <>
      <PageHead title={title} kicker="Archivo / Ficha de muestra" />
      <SampleNotice />
      <div className="document-layout">
        <div className="document-preview">
          <span>{format}</span>
          <h2>
            Vista previa
            <br />
            del documento
          </h2>
          <p>
            No existe un archivo de contenido. Esta superficie representa el
            futuro visor.
          </p>
          <span className="tag">Sintético · Sin descarga</span>
        </div>
        <aside className="panel">
          <h2>Ficha documental</h2>
          <dl>
            {[
              ["Estado", status + " (simulado)"],
              ["Formato", format],
              ["Año de muestra", year],
              ["Temática", topic],
              ["Fuente", "Fixture local impersonal"],
              ["Autor / licencia", "Pendientes; no atribuidos"],
              ["Versión / fecha de revisión", "Pendientes"],
              ["Responsable de revisión", "Por designar"],
              ["Acceso previsto", "Consulta abierta, sin registro"],
              ["Archivo", "No disponible"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="notice">
            No se ofrece descarga porque no hay un archivo real autorizado.
          </p>
          <Link className="textlink" href="/herramientas">
            Volver a la biblioteca →
          </Link>
          <Link className="textlink" href="/ideas">
            Volver a ideas →
          </Link>
        </aside>
      </div>
    </>
  );
}
