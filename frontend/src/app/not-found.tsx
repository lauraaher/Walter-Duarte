import Link from "next/link";
export default function NotFound() {
  return (
    <main id="contenido" className="shell section">
      <span className="kicker">404 · Página no disponible</span>
      <h1>Este camino aún no está abierto.</h1>
      <p>La dirección no corresponde a una página de la demo.</p>
      <Link href="/" className="btn">
        Volver al inicio
      </Link>
    </main>
  );
}
