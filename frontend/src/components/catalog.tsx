"use client";
import { useState } from "react";
import Link from "next/link";
import { communities, resources, documents } from "@/data/content";
import municipalities from "@/data/municipalities.json";
import { normalize } from "@/lib/content";
import { Empty, SampleNotice } from "./ui";
export function Catalog({
  ideas = false,
  initialTopic = "",
}: {
  ideas?: boolean;
  initialTopic?: string;
}) {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState(initialTopic);
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [year, setYear] = useState("");
  const [municipality, setMunicipality] = useState("");
  const source = ideas
    ? documents.map((d) => ({ ...d, format: d.type }))
    : resources.map((d) => ({ ...d, municipality: "" }));
  const filtered = source.filter(
    (r) =>
      normalize(r.title).includes(normalize(q)) &&
      (!topic || r.topic === topic) &&
      (!format || r.format === format) &&
      (!status || r.status === status) &&
      (!year || r.year === year) &&
      (!municipality || r.municipality === municipality),
  );
  return (
    <>
      <SampleNotice />
      <div className="fields">
        <label>
          Buscar {ideas ? "documento" : "recurso"}
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Título o palabra clave"
          />
        </label>
        <label>
          Temática
          <select
            aria-label="Temática"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Todas las temáticas</option>
            {communities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.short}
              </option>
            ))}
          </select>
        </label>
        <label>
          {ideas ? "Tipo documental" : "Formato"}
          <select
            aria-label={ideas ? "Tipo documental" : "Formato"}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Todos</option>
            {[...new Set(source.map((r) => r.format))].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label>
          Estado
          <select
            aria-label="Estado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos los estados</option>
            {["Por producir", "En revisión", "Disponible"].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        {ideas && (
          <>
            <label>
              Municipio
              <select
                aria-label="Municipio"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
              >
                <option value="">Todos</option>
                {municipalities.map((m) => (
                  <option key={m.code} value={m.code}>
                    {m.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Año
              <select
                aria-label="Año"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Todos</option>
                <option>2026</option>
                <option>2025</option>
              </select>
            </label>
          </>
        )}
      </div>
      <div className="results-bar">
        <p role="status">
          {filtered.length} muestras de {source.length}
        </p>
        <button
          className="textlink"
          onClick={() => {
            setQ("");
            setTopic("");
            setFormat("");
            setStatus("");
            setYear("");
            setMunicipality("");
          }}
        >
          Restablecer filtros ↺
        </button>
      </div>
      <div className="grid3">
        {filtered.map((r, i) => (
          <Link
            key={r.slug}
            className="resource-card"
            href={(ideas ? "/ideas/documentos/" : "/herramientas/") + r.slug}
          >
            <div className={"resource-cover cover-" + i}>
              <span>{r.format}</span>
              <strong>
                {ideas ? "Archivo de ideas" : "Biblioteca abierta"}
              </strong>
              <small>MUESTRA SINTÉTICA · SIN ARCHIVO</small>
            </div>
            <div className="card-copy">
              <span className="tag">{r.status}</span>
              <h3>{r.title}</h3>
              <p>
                {communities.find((c) => c.slug === r.topic)?.short} · {r.year}
              </p>
              <span className="textlink">Consultar ficha ↗</span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <Empty
          title="No hay coincidencias"
          text="Cambia los filtros o restablécelos para explorar las muestras."
        />
      )}
      {!ideas && (
        <p className="notice">
          60 recursos previstos en el plan editorial. CSV y archivos oficiales
          no disponibles; estas 3 muestras no completan ese catálogo.
        </p>
      )}
    </>
  );
}
