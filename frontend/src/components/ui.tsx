import Link from "next/link";
export function PageHead({
  title,
  kicker = "Walter Duarte Hernández",
  description,
}: {
  title: string;
  kicker?: string;
  description?: string;
}) {
  return (
    <>
      <div className="crumb">
        <Link href="/">Inicio</Link> / {title}
      </div>
      <div className="pagehead">
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </>
  );
}
export function Empty({
  title = "Contenido pendiente",
  text = "Aún no hay contenido autorizado para publicar.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="empty">
      <span className="empty-symbol" aria-hidden="true">
        —
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
export function Heading({
  title,
  kicker,
  href,
  action = "Explorar",
}: {
  title: string;
  kicker: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="heading">
      <div>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="textlink" href={href}>
          {action} ↗
        </Link>
      )}
    </div>
  );
}
export function SampleNotice() {
  return (
    <p className="notice">
      Muestras sintéticas, impersonales y no publicadas. No corresponden a
      hechos, actividades ni documentos de Walter Duarte.
    </p>
  );
}
