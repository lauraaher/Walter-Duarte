"use client";
import Link from "next/link";
import { useState } from "react";
import { events, news } from "@/data/content";
import { localDate, normalize } from "@/lib/content";
import { DemoToggle, useDemo } from "./shell";
import { Empty, SampleNotice } from "./ui";
export function Actuality() {
  const { demo } = useDemo();
  const [view, setView] = useState("calendar");
  const [month, setMonth] = useState(new Date("2026-12-01T12:00:00Z"));
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const filtered = (demo ? events : []).filter(
    (e) =>
      normalize(e.title).includes(normalize(query)) &&
      (!type || e.type === type),
  );
  const first = new Date(
    Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), 1),
  );
  const offset = (first.getUTCDay() + 6) % 7;
  const days = new Date(
    Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const prefix = month.toISOString().slice(0, 7);
  const shift = (n: number) =>
    setMonth(
      new Date(
        Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + n, 1, 12),
      ),
    );
  return (
    <>
      <DemoToggle />
      {demo && <SampleNotice />}
      <div className="fields">
        <label>
          Buscar actividad
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar en la agenda"
          />
        </label>
        <label>
          Tipo
          <select
            aria-label="Tipo de actividad"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Todos</option>
            <option>Taller</option>
            <option>Encuentro</option>
          </select>
        </label>
      </div>
      <div className="tabs">
        <button
          aria-pressed={view === "calendar"}
          onClick={() => setView("calendar")}
        >
          Calendario
        </button>
        <button aria-pressed={view === "list"} onClick={() => setView("list")}>
          Lista
        </button>
      </div>
      {view === "calendar" ? (
        <div className="calendar">
          <div className="calendar-heading">
            <button
              className="btn secondary"
              aria-label="Mes anterior"
              onClick={() => shift(-1)}
            >
              ←
            </button>
            <h2 aria-live="polite">
              {new Intl.DateTimeFormat("es-CO", {
                month: "long",
                year: "numeric",
                timeZone: "America/Bogota",
              }).format(month)}
            </h2>
            <button
              className="btn secondary"
              aria-label="Mes siguiente"
              onClick={() => shift(1)}
            >
              →
            </button>
          </div>
          <div className="calendar-grid">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <span className="weekday" key={d}>
                {d}
              </span>
            ))}
            {Array.from({ length: offset }, (_, i) => (
              <div className="blank-day" key={"b" + i} />
            ))}
            {Array.from({ length: days }, (_, i) => {
              const date = prefix + "-" + String(i + 1).padStart(2, "0");
              return (
                <div className="calendar-day" key={date}>
                  <span>{i + 1}</span>
                  {filtered
                    .filter((e) => e.date.startsWith(date))
                    .map((e) => (
                      <Link href={"/actualidad/eventos/" + e.slug} key={e.slug}>
                        <span className="desktop-event">{e.title}</span>
                        <span className="mobile-event">
                          Ver evento ficticio
                        </span>
                      </Link>
                    ))}
                </div>
              );
            })}
          </div>
          <p className="notice">
            America/Bogota ·{" "}
            {filtered.filter((e) => e.date.startsWith(prefix)).length}{" "}
            actividades de muestra este mes.
          </p>
        </div>
      ) : (
        <div className="grid3">
          {filtered.map((e) => (
            <Link
              className="event-card"
              href={"/actualidad/eventos/" + e.slug}
              key={e.slug}
            >
              <span className="kicker">{localDate(e.date)}</span>
              <h3>{e.title}</h3>
              <span className="tag">Ficticio · {e.type}</span>
            </Link>
          ))}
        </div>
      )}
      {!filtered.length && (
        <Empty
          title="Sin actividades publicadas"
          text="Activa los datos ficticios para probar diciembre de 2026; no representan una agenda real."
        />
      )}
      <section className="section" id="noticias">
        <h2>Noticias</h2>
        {demo ? (
          <div className="grid3">
            {news.map((n) => (
              <Link
                className="panel"
                href={"/actualidad/noticias/" + n.slug}
                key={n.slug}
              >
                <span className="kicker">Ficticio · {localDate(n.date)}</span>
                <h3>{n.title}</h3>
                <span className="textlink">Leer ejemplo ↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <Empty title="Sin noticias publicadas" />
        )}
      </section>
    </>
  );
}
