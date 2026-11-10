"use client";
import { useState } from "react";
import { historySections } from "@/data/content";
import { Empty } from "./ui";
export function History() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="history-intro">
        <div className="archive-placeholder">
          <span className="kicker">Archivo personal</span>
          <h2>
            Una historia
            <br />
            con sus fuentes.
          </h2>
          <p>Fotografía y presentación autorizadas pendientes.</p>
        </div>
        <div>
          <span className="kicker">Memoria documental</span>
          <h2>
            Cada etapa,
            <br />
            su contexto.
          </h2>
          <p>
            Explora la estructura de la trayectoria. Los hitos, fechas y
            soportes se incorporarán tras su revisión.
          </p>
          <span className="tag">Sin biografía publicada</span>
        </div>
      </div>
      <section className="section">
        <h2>Trayectoria, paso a paso</h2>
        <div className="timeline-controls" aria-label="Etapas de trayectoria">
          {historySections.map((s, i) => (
            <button
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              key={s}
            >
              <span>0{i + 1}</span>
              {s}
            </button>
          ))}
        </div>
        <div className="timeline-panel" aria-live="polite">
          <span className="kicker">Fecha pendiente de documentación</span>
          <h3>{historySections[active]}</h3>
          <p>
            Contenido y soportes de esta etapa pendientes de entrega y
            aprobación. Rol, organización, fechas, fuente y revisor pendientes.
            No se atribuyen cargos, títulos ni logros.
          </p>
        </div>
      </section>
      <div className="grid2">
        <Empty
          title="Galería documental"
          text="Imagen, fecha, lugar, autor, descripción y permiso de uso: pendientes."
        />
        <Empty
          title="Soportes y fuentes"
          text="CV, títulos, evidencias de trayectoria y documentos autorizados pendientes. No hay descargas."
        />
      </div>
      <section className="section">
        <h2>Preguntas frecuentes</h2>
        <details>
          <summary>¿Dónde puedo consultar la biografía?</summary>
          <p>
            La estructura está disponible, pero la biografía requiere contenido
            autorizado y soportes documentales.
          </p>
        </details>
        <details>
          <summary>¿Cómo se revisarán las fuentes?</summary>
          <p>
            Antes de publicar se deberán identificar procedencia, fecha,
            responsable editorial y autorizaciones.
          </p>
        </details>
      </section>
    </>
  );
}
