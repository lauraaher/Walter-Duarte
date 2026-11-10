"use client";
import Link from "next/link";
import Image from "next/image";
import { communities, events, news } from "@/data/content";
import { localDate } from "@/lib/content";
import { DemoToggle, useDemo } from "./shell";
import { Empty, Heading, SampleNotice } from "./ui";
import { Territory } from "./territory";
export function Home() {
  const { demo, now } = useDemo();
  const upcoming = events
    .filter((e) => Date.parse(e.date) > now)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);
  return (
    <main id="contenido">
      <section className="hero shell">
        <div className="hero-copy">
          <span className="kicker">
            Walter Duarte Hernández · Portal permanente
          </span>
          <h1>
            Contigo Vamos
            <br />
            <em>Con Toda.</em>
          </h1>
          <p className="hero-lead">
            Un lugar para conocernos,
            <br />
            explorar el territorio y compartir ideas.
          </p>
          <div className="actions">
            <Link className="btn" href="/mi-historia">
              Conoce mi historia <span>↗</span>
            </Link>
            <Link className="btn secondary" href="/tolima">
              Explora el Tolima
            </Link>
          </div>
          <p className="hero-note">
            Presentación biográfica pendiente de aprobación.
          </p>
        </div>
        <div className="portrait">
          <Image
            src="/images/fotografia-inicio.png"
            alt="Persona de espaldas junto a un río, envuelta en una tela amarilla y vinotinto."
            fill
            sizes="(max-width: 600px) calc(100vw - 40px), 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            unoptimized
          />
        </div>
        <div className="hero-foot">
          <span>Identidad · Territorio · Comunidad</span>
          <a href="#agenda">Descubre el portal ↓</a>
        </div>
      </section>
      <div className="shell demo-switch-row">
        <DemoToggle />
      </div>
      <section id="agenda" className="section shell">
        <Heading
          title="Próximos encuentros"
          kicker="01 / Agenda"
          href="/actualidad"
          action="Ver agenda"
        />
        {demo ? (
          <>
            <SampleNotice />
            <div className="grid3">
              {upcoming.map((e) => (
                <Link
                  className="event-card"
                  href={"/actualidad/eventos/" + e.slug}
                  key={e.slug}
                >
                  <span className="event-date">{localDate(e.date)}</span>
                  <span className="tag">Ficticio · {e.type}</span>
                  <h3>{e.title}</h3>
                  <span className="textlink">Ver ejemplo ↗</span>
                </Link>
              ))}
            </div>
            {!upcoming.length && (
              <Empty
                title="Sin próximos ejemplos"
                text="Las fechas sintéticas ya pasaron. Consulta el calendario de diciembre de 2026."
              />
            )}
          </>
        ) : (
          <Empty
            title="Una agenda por construir"
            text="Aquí aparecerán los próximos encuentros cuando cuenten con información confirmada."
          />
        )}
      </section>
      <section className="section shell">
        <Heading
          title="Lo que viene, aquí"
          kicker="02 / Noticias"
          href="/actualidad#noticias"
          action="Ver noticias"
        />
        {demo ? (
          <>
            <SampleNotice />
            <div className="grid3">
              {[...news]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 3)
                .map((n) => (
                  <Link
                    className="news-card"
                    href={"/actualidad/noticias/" + n.slug}
                    key={n.slug}
                  >
                    <div className="news-cover">
                      Publicación de muestra <span>↗</span>
                    </div>
                    <div className="card-copy">
                      <span className="kicker">
                        {localDate(n.date)} · Ficticio
                      </span>
                      <h3>{n.title}</h3>
                    </div>
                  </Link>
                ))}
            </div>
          </>
        ) : (
          <Empty
            title="Noticias, con fuentes"
            text="No hay publicaciones aprobadas todavía. Cada noticia contará con fecha y procedencia."
          />
        )}
      </section>
      <section className="territory-band">
        <div className="shell section">
          <Heading
            title="El Tolima, municipio a municipio"
            kicker="03 / Territorio"
            href="/tolima"
            action="Explorar todo"
          />
          <Territory compact />
        </div>
      </section>
      <section className="section shell">
        <Heading
          title="Cinco conversaciones. Un territorio."
          kicker="04 / Comunidades"
          href="/comunidades"
          action="Ver comunidades"
        />
        <div className="community-grid">
          {communities.map((c) => (
            <Link
              className="community-card"
              key={c.slug}
              href={"/comunidades/" + c.slug}
            >
              <span className="community-mark">{c.mark}</span>
              <h3>{c.short}</h3>
              <p>{c.description}</p>
              <span className="textlink">Conocer comunidad ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section shell">
        <div className="resource-feature">
          <div>
            <span className="kicker">05 / Herramientas para consultar</span>
            <h2>
              El conocimiento
              <br />
              también nos acerca.
            </h2>
            <p>
              Explora la estructura de la biblioteca. Los recursos del plan
              editorial aún están por producir.
            </p>
            <Link className="btn" href="/herramientas">
              Abrir biblioteca ↗
            </Link>
          </div>
          <div
            className="book-stack"
            aria-label="Ilustración tipográfica de biblioteca, sin archivos disponibles"
          >
            <div>
              <span>Biblioteca</span>
              <strong>
                Ideas
                <br />& herramientas
              </strong>
              <small>VISTA DE DISEÑO · SIN DESCARGAS</small>
            </div>
            <span className="book-back" />
          </div>
        </div>
      </section>
      <section className="section shell">
        <Heading
          title="Hay muchas formas de participar"
          kicker="06 / Participación cívica"
        />
        <div className="grid3">
          {[
            [
              "/ideas",
              "Comparte una idea",
              "Recorre una propuesta ciudadana simulada.",
            ],
            [
              "/participa/liderazgo",
              "Aprende y participa",
              "Prueba el aula y una autoevaluación de muestra.",
            ],
            [
              "/participa/voluntariado",
              "Conoce el voluntariado",
              "Explora un flujo sin inscripciones reales.",
            ],
          ].map(([h, t, p]) => (
            <Link className="panel action-card" href={h} key={h}>
              <span className="arrow">↗</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell rights-feature">
        <span className="kicker">07 / Protección de derechos</span>
        <h2>
          Orientación abierta.
          <br />
          Tus derechos, siempre presentes.
        </h2>
        <p>
          Consulta las categorías de orientación. Esta demo no recibe denuncias
          ni información de víctimas.
        </p>
        <Link href="/participa/protege-tus-derechos" className="btn light">
          Explorar rutas de orientación ↗
        </Link>
      </section>
    </main>
  );
}
