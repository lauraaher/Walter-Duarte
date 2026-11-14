"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { navigation } from "@/data/content";
const DemoContext = createContext({ demo: false, now: 0, toggle: () => {} });
export const useDemo = () => useContext(DemoContext);
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [demo, setDemo] = useState(false);
  const [now, setNow] = useState(0);
  const menu = useRef<HTMLButtonElement>(null);
  return (
    <DemoContext.Provider
      value={{
        demo,
        now,
        toggle: () => {
          setNow(Date.now());
          setDemo(!demo);
        },
      }}
    >
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <div className="demo-strip">
        DEMO LOCAL · EXPECTATIVA <span>Sin registro ni captura de datos</span>
      </div>
      <header className="site-header">
        <div className="shell header-row">
          <Link
            href="/"
            aria-label="Walter Duarte · Inicio"
            onClick={() => setOpen(false)}
            className="logo"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/logo-walter-original.jpg`}
              width={130}
              height={70}
              alt="Walter Duarte"
              priority
              unoptimized
            />
          </Link>
          <button
            ref={menu}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="navegacion"
            onClick={() => setOpen(!open)}
          >
            {open ? "Cerrar ×" : "Menú ☰"}
          </button>
          <nav
            id="navegacion"
            className={open ? "is-open" : ""}
            aria-label="Principal"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                menu.current?.focus();
              }
            }}
          >
            {navigation.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  (href === "/" ? pathname === "/" : pathname.startsWith(href))
                    ? "page"
                    : undefined
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer>
        <div className="shell footer-grid">
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/logo-walter-original.jpg`}
              width={140}
              height={76}
              alt="Walter Duarte"
              unoptimized
              className="footer-logo"
            />
            <p>Contigo Vamos Con Toda</p>
            <small>Portal permanente · Identidad de demo</small>
          </div>
          <div>
            <span className="kicker">Explora</span>
            {navigation.slice(1, 5).map(([h, t]) => (
              <Link href={h} key={h}>
                {t}
              </Link>
            ))}
          </div>
          <div>
            <span className="kicker">Información</span>
            {[
              "contacto",
              "transparencia",
              "privacidad",
              "terminos",
              "accesibilidad",
            ].map((t) => (
              <Link href={"/" + t} key={t}>
                {
                  {
                    terminos: "Términos",
                    privacidad: "Privacidad",
                    accesibilidad: "Accesibilidad",
                    transparencia: "Transparencia",
                    contacto: "Contacto",
                  }[t]
                }
              </Link>
            ))}
          </div>
          <div>
            <span className="kicker">Entorno de revisión</span>
            <p>
              Contenidos pendientes y ejemplos identificados. Sin servicios de
              producción.
            </p>
            <Link href="/demo/administracion">
              Ver administración demostrativa →
            </Link>
          </div>
        </div>
        <div className="shell footer-bottom">
          Walter Duarte Hernández{" "}
          <span>Fase 1B · Revisión del propietario</span>
        </div>
      </footer>
    </DemoContext.Provider>
  );
}
export function DemoToggle() {
  const { demo, toggle } = useDemo();
  return (
    <button className="demo-toggle" aria-pressed={demo} onClick={toggle}>
      {demo ? "Ocultar datos ficticios" : "Ver datos ficticios de prueba"}{" "}
      <span>{demo ? "●" : "○"}</span>
    </button>
  );
}
