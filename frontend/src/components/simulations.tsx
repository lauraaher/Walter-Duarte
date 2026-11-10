"use client";
import Link from "next/link";
import { useState } from "react";
import { communities, lessons, resources, events, news } from "@/data/content";
import municipalities from "@/data/municipalities.json";
export function FormPreview({
  purpose = "participación cívica",
}: {
  purpose?: string;
}) {
  const [state, setState] = useState("inicio");
  const messages: Record<string, string> = {
    inicio:
      "Recorrido de prueba. No se reciben datos ni se crea una solicitud.",
    validation:
      "Validación simulada: faltan campos y autorización. Los controles permanecen deshabilitados.",
    confirmed:
      "Confirmación simulada: ejemplo visual de solicitud recibida. No se ha enviado ni guardado nada.",
    error: "Error simulado de servicio. No hay un servicio conectado.",
    cancelled: "Recorrido cancelado. No había datos para eliminar.",
    withdrawn: "Retiro simulado. No existe inscripción ni consentimiento real.",
  };
  return (
    <div className="panel form-preview">
      <span className="tag">Simulación · Sin envío</span>
      <h3>Explora el formulario</h3>
      <p>Finalidad futura: {purpose}. Esta vista utiliza ejemplos fijos.</p>
      <fieldset disabled>
        <legend>Campos de muestra, no editables</legend>
        <div className="fields">
          <label>
            Nombre
            <input value="Ejemplo impersonal" readOnly />
          </label>
          <label>
            Correo
            <input value="ejemplo@example.invalid" readOnly />
          </label>
        </div>
        <label className="consent">
          <input type="checkbox" checked={false} readOnly /> Representación de
          autorización informada, sin premarcar ni recopilar consentimiento.
        </label>
      </fieldset>
      <div className="actions">
        <button
          className="btn secondary"
          onClick={() => setState("validation")}
        >
          Ver validación
        </button>
        <button className="btn" onClick={() => setState("confirmed")}>
          Simular confirmación
        </button>
        <button className="btn secondary" onClick={() => setState("error")}>
          Ver error
        </button>
      </div>
      <p className={"simulation-message state-" + state} role="status">
        {messages[state]}
      </p>
      <div className="actions">
        <button className="textlink" onClick={() => setState("inicio")}>
          Volver al inicio
        </button>
        <button className="textlink" onClick={() => setState("cancelled")}>
          Cancelar
        </button>
        <button className="textlink" onClick={() => setState("withdrawn")}>
          Simular retiro
        </button>
      </div>
    </div>
  );
}
export function Course() {
  const [lesson, setLesson] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [certificate, setCertificate] = useState(false);
  return (
    <div className="course-layout">
      <aside className="panel">
        <span className="kicker">Curso de muestra</span>
        <h3>Explora la participación</h3>
        <p>Contenido sintético. Sin inscripción ni progreso guardado.</p>
        <div className="lesson-list">
          {lessons.map((l, i) => (
            <button
              key={l.title}
              aria-current={lesson === i ? "step" : undefined}
              onClick={() => setLesson(i)}
            >
              <span>0{i + 1}</span>
              {l.title}
            </button>
          ))}
        </div>
      </aside>
      <section className="panel lesson">
        <span className="kicker">
          Lección {lesson + 1} de {lessons.length} · Demostración
        </span>
        <h2>{lessons[lesson].title}</h2>
        <p>{lessons[lesson].text}</p>
        {lesson === 2 ? (
          <>
            <fieldset>
              <legend>¿Esta demo guarda tu progreso?</legend>
              {[
                "No, solo muestra estados temporales.",
                "Sí, crea un expediente personal.",
              ].map((a, i) => (
                <label className="quiz-option" key={a}>
                  <input
                    type="radio"
                    name="quiz"
                    value={String(i)}
                    checked={answer === String(i)}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setChecked(false);
                      setCertificate(false);
                    }}
                  />
                  {a}
                </label>
              ))}
            </fieldset>
            <button
              className="btn"
              disabled={!answer}
              onClick={() => setChecked(true)}
            >
              Comprobar respuesta
            </button>
            {checked && (
              <p role="status">
                {answer === "0"
                  ? "Correcto. El progreso desaparece al recargar."
                  : "Revisa la descripción: no se guarda progreso personal."}
              </p>
            )}
            {checked && answer === "0" && (
              <button
                className="btn secondary"
                onClick={() => setCertificate(true)}
              >
                Ver constancia simulada
              </button>
            )}
            {certificate && (
              <div className="certificate" role="status">
                <span className="kicker">Constancia interna · Simulación</span>
                <h3>Recorrido de demostración completado</h3>
                <p>
                  Sin destinatario. No acredita formación ni tiene validez
                  documental. No se expide ningún archivo.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="lesson-placeholder">
            <span>Material de aprendizaje</span>
            <p>Vídeo y recursos autorizados pendientes</p>
          </div>
        )}
        <div className="actions">
          <button
            className="btn secondary"
            disabled={lesson === 0}
            onClick={() => setLesson(lesson - 1)}
          >
            Anterior
          </button>
          <button
            className="btn"
            disabled={lesson === 2}
            onClick={() => setLesson(lesson + 1)}
          >
            Siguiente lección
          </button>
        </div>
        <Link href="/participa/liderazgo" className="textlink">
          Volver al catálogo
        </Link>
      </section>
    </div>
  );
}
const modules = [
  "Resumen",
  "Gestión editorial",
  "Noticias",
  "Eventos",
  "Municipios",
  "Recursos",
  "Comunidades",
  "Formación",
  "Roles y permisos",
  "Historial editorial",
  "Voluntarios y participantes",
];
export function Admin() {
  const [active, setActive] = useState("Resumen");
  const [status, setStatus] = useState("Borrador");
  const [history, setHistory] = useState<string[]>([
    "Inicio de sesión visual de demostración (sin autenticación).",
  ]);
  const [role, setRole] = useState("Editor");
  const change = (value: string) => {
    setStatus(value);
    setHistory((h) => [`${value}: cambio simulado en memoria.`, ...h]);
  };
  const rows: Record<string, { title: string; detail: string }[]> = {
    Noticias: news.map((n) => ({
      title: n.title,
      detail: "Ficticia · No publicada",
    })),
    Eventos: events.map((e) => ({
      title: e.title,
      detail: "Ficticio · No publicado",
    })),
    Municipios: municipalities.map((m) => ({
      title: m.name,
      detail: m.code + " · DANE",
    })),
    Recursos: resources.map((r) => ({
      title: r.title,
      detail: r.status + " · Sintético",
    })),
    Comunidades: communities.map((c) => ({
      title: c.short,
      detail: "Contenido pendiente",
    })),
    Formación: [
      { title: "Explora la participación", detail: "Curso sintético" },
    ],
  };
  return (
    <>
      <div className="admin-warning">
        <strong>Panel conceptual público · No es un sistema protegido</strong>
        <p>
          Sin autenticación, permisos efectivos ni escritura persistente. Todos
          los cambios se pierden al recargar.
        </p>
      </div>
      <div className="admin-layout">
        <aside className="admin-nav" aria-label="Módulos de administración">
          {modules.map((m) => (
            <button
              key={m}
              aria-pressed={active === m}
              onClick={() => setActive(m)}
            >
              {m}
            </button>
          ))}
        </aside>
        <section className="panel admin-content">
          <span className="kicker">Administración demostrativa</span>
          <h2>{active}</h2>
          {active === "Resumen" ? (
            <>
              <div className="admin-stats">
                <div>
                  <strong>47</strong>
                  <span>Municipios oficiales</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>Comunidades previstas</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>Publicaciones reales</span>
                </div>
              </div>
              <p>
                La estructura editorial está preparada para revisión. No hay
                personas registradas.
              </p>
              <button
                className="btn"
                onClick={() => setActive("Gestión editorial")}
              >
                Explorar flujo editorial
              </button>
            </>
          ) : active === "Gestión editorial" ? (
            <>
              <h3>Ficha de ejemplo impersonal</h3>
              <p>
                Estado visual: <strong>{status}</strong>
              </p>
              <div className="actions">
                {[
                  "Borrador",
                  "En revisión",
                  "Aprobado (simulado)",
                  "Archivado (simulado)",
                ].map((s) => (
                  <button
                    className="btn secondary"
                    key={s}
                    onClick={() => change(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p role="status">{history[0]}</p>
              <p className="notice">
                No publica contenido ni modifica las páginas públicas.
              </p>
            </>
          ) : active === "Roles y permisos" ? (
            <>
              <div className="fields">
                <label>
                  Representación de rol
                  <select
                    aria-label="Representación de rol"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Editor</option>
                    <option>Revisor</option>
                    <option>Administrador</option>
                  </select>
                </label>
              </div>
              <div className="permission-list">
                {[
                  "Preparar borradores",
                  "Revisar fuentes",
                  "Administrar accesos",
                ].map((p, i) => (
                  <p key={p}>
                    {p}:{" "}
                    <strong>
                      {role === "Administrador" ||
                      (role === "Editor" && i === 0) ||
                      (role === "Revisor" && i === 1)
                        ? "Representado"
                        : "No representado"}
                    </strong>
                  </p>
                ))}
              </div>
              <p>Esto no aplica autorización real.</p>
            </>
          ) : active === "Historial editorial" ? (
            <ol>
              {history.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ol>
          ) : active === "Voluntarios y participantes" ? (
            <p>
              No hay registros. La demo no recibe ni conserva información
              personal.
            </p>
          ) : (
            <div className="admin-records">
              {(rows[active] || []).map((r) => (
                <div key={r.title}>
                  <strong>{r.title}</strong>
                  <span>{r.detail}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
