"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import municipalities from "@/data/municipalities.json";
import { normalize, pendingTerritory } from "@/lib/content";
import type { MapShape as Shape } from "@/types/content";
export function Territory({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [selected, setSelected] = useState("73001");
  const [hover, setHover] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [availability, setAvailability] = useState("all");
  const [view, setView] = useState("map");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready) return;
    let active = true;
    fetch("/geo/tolima-map.json")
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((data: Shape[]) => {
        if (active) setShapes(data);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [ready, attempt]);
  const visible = municipalities.filter(
    (m) =>
      normalize(m.name).includes(normalize(query)) &&
      availability !== "documented",
  );
  const current = municipalities.find((m) => m.code === selected)!;
  const preview = municipalities.find((m) => m.code === hover);
  return (
    <div ref={root} className={"explorer " + (compact ? "compact" : "")}>
      <div className="explorer-tools">
        <div>
          <span className="tag">DANE · MGN 2025</span>
          <p>47 municipios. Cada lugar, una historia por documentar.</p>
        </div>
        <div className="tabs">
          <button aria-pressed={view === "map"} onClick={() => setView("map")}>
            Mapa
          </button>
          <button
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            Lista accesible
          </button>
        </div>
      </div>
      <div className="fields">
        <label>
          Buscar municipio
          <input
            type="search"
            placeholder="Nombre del municipio"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Contenido disponible
          <select
            aria-label="Contenido disponible"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="all">Todos los municipios</option>
            <option value="pending">Pendiente de documentación</option>
            <option value="documented">Con trayectoria documentada</option>
          </select>
        </label>
      </div>
      <div className="explorer-layout">
        <div className="map-stage" hidden={view !== "map"}>
          <div className="map-caption">
            <span>Departamento del Tolima</span>
            <strong aria-live="polite">{preview?.name || current.name}</strong>
            <small>
              {preview
                ? "Vista previa · clic para seleccionar"
                : "Selección activa"}
            </small>
          </div>
          {error ? (
            <div className="empty" role="alert">
              <p>No se pudo cargar el mapa local. La lista sigue disponible.</p>
              <button
                className="btn"
                onClick={() => {
                  setError(false);
                  setAttempt(attempt + 1);
                }}
              >
                Reintentar
              </button>
            </div>
          ) : !shapes.length ? (
            <p className="map-loading" role="status">
              Preparando cartografía local…
            </p>
          ) : (
            <svg
              viewBox={`${pan.x + 370 - 370 / zoom} ${pan.y + 440 - 440 / zoom} ${740 / zoom} ${880 / zoom}`}
              className="tolima-map"
              aria-label="Mapa interactivo de los 47 municipios del Tolima"
            >
              {shapes.map((s) => {
                const m = municipalities.find((m) => m.code === s.code)!;
                const active = visible.some((m) => m.code === s.code);
                return (
                  <path
                    key={s.code}
                    d={s.path}
                    role="button"
                    tabIndex={active ? 0 : -1}
                    aria-label={"Seleccionar " + m.name}
                    aria-pressed={selected === s.code}
                    aria-disabled={!active}
                    className={
                      (selected === s.code ? "selected " : "") +
                      (!active ? "filtered" : "")
                    }
                    onMouseEnter={() => setHover(s.code)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(s.code)}
                    onBlur={() => setHover(null)}
                    onClick={() => {
                      if (active) setSelected(s.code);
                    }}
                    onKeyDown={(e) => {
                      if (active && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setSelected(s.code);
                      }
                    }}
                  >
                    <title>{m.name}</title>
                  </path>
                );
              })}
            </svg>
          )}
          <div className="map-zoom" aria-label="Controles del mapa">
            <button
              aria-label="Acercar mapa"
              disabled={zoom >= 3}
              onClick={() => setZoom(Math.min(3, zoom + 0.5))}
            >
              +
            </button>
            <button
              aria-label="Alejar mapa"
              disabled={zoom <= 1}
              onClick={() => {
                setZoom(Math.max(1, zoom - 0.5));
                setPan({ x: 0, y: 0 });
              }}
            >
              −
            </button>
            <button
              aria-label="Restablecer mapa"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
            >
              ↺
            </button>
            {zoom > 1 && (
              <>
                <button
                  aria-label="Mover mapa al norte"
                  onClick={() =>
                    setPan((p) => ({ ...p, y: Math.max(-250, p.y - 80) }))
                  }
                >
                  ↑
                </button>
                <button
                  aria-label="Mover mapa al sur"
                  onClick={() =>
                    setPan((p) => ({ ...p, y: Math.min(250, p.y + 80) }))
                  }
                >
                  ↓
                </button>
                <button
                  aria-label="Mover mapa al oeste"
                  onClick={() =>
                    setPan((p) => ({ ...p, x: Math.max(-200, p.x - 80) }))
                  }
                >
                  ←
                </button>
                <button
                  aria-label="Mover mapa al este"
                  onClick={() =>
                    setPan((p) => ({ ...p, x: Math.min(200, p.x + 80) }))
                  }
                >
                  →
                </button>
              </>
            )}
          </div>
          <span className="map-north" aria-hidden="true">
            N ↑
          </span>
          <p className="map-help">
            Pasa el cursor para explorar. Selecciona un municipio para consultar
            su ficha.
          </p>
        </div>
        <div
          className="municipality-list"
          hidden={view !== "list"}
          aria-label="Municipios"
        >
          <p role="status">{visible.length} resultados</p>
          {visible.map((m) => (
            <button
              key={m.code}
              aria-pressed={selected === m.code}
              onClick={() => setSelected(m.code)}
            >
              <span>{m.name}</span>
              <small>
                {m.code} {selected === m.code ? "✓" : "→"}
              </small>
            </button>
          ))}
          {!visible.length && (
            <p>No hay municipios que coincidan. Prueba otro filtro.</p>
          )}
        </div>
        <aside
          className="municipality-panel"
          aria-label="Municipio seleccionado"
        >
          <span className="kicker">Municipio seleccionado</span>
          <h3>{current.name}</h3>
          <span className="tag">DIVIPOLA {current.code} · Dato oficial</span>
          <div className="municipality-photo">
            <span>Archivo territorial</span>
            <small>Fotografía autorizada pendiente</small>
          </div>
          <p>{pendingTerritory}</p>
          <dl>
            <div>
              <dt>Trayectoria</dt>
              <dd>Pendiente</dd>
            </div>
            <div>
              <dt>Actividades</dt>
              <dd>Sin publicaciones</dd>
            </div>
            <div>
              <dt>Contenido geográfico</dt>
              <dd>DANE · año {current.year}</dd>
            </div>
          </dl>
          <Link className="btn" href={"/tolima/" + current.slug}>
            Ver ficha municipal ↗
          </Link>
          <button
            className="textlink"
            onClick={() => {
              setQuery("");
              setAvailability("all");
              setView("list");
            }}
          >
            Ver los 47 municipios
          </button>
        </aside>
      </div>
      <p className="map-attribution">
        Departamento Administrativo Nacional de Estadística — DANE:{" "}
        <a href="https://www.dane.gov.co" target="_blank" rel="noreferrer">
          www.dane.gov.co
        </a>{" "}
        · MGN 2025 · CC BY 4.0 · Geometría simplificada para exploración, sin
        uso catastral. Consulta: 10/11/2026.
      </p>
    </div>
  );
}
