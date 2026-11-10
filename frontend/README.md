# WalterDuarteH.com · Demo local Fase 1B

Una única aplicación Next.js. Estado EXPECTATIVA. Sin backend de negocio, base de datos, captación, autenticación real ni módulos electorales. No publicar esta demo.

## Ejecución normal

Requisitos probados: Node 24.22.1 y pnpm 11.25.0 disponibles en PATH. Desde PowerShell:

```powershell
Set-Location -LiteralPath 'C:\Users\hernandezl\OneDrive - HITSS\Documentos\ChatGPT\Walter Duarte\frontend'
pnpm install --frozen-lockfile
pnpm dev
```

Abrir `http://127.0.0.1:3000`. Detener con **Ctrl+C** en la terminal donde se inició. El wrapper limita la escucha a loopback y desactiva la telemetría de Next. No necesita `.env`, credenciales ni servicios externos. La instalación descarga dependencias; el sitio ya instalado funciona con assets locales.

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

No ejecutar dev y start simultáneamente en el mismo puerto. `build` compila localmente; no despliega. `start` requiere una compilación previa.

## Runtime disponible en este equipo

Si Node/pnpm no están en PATH, se usó el runtime incluido en Codex:

```powershell
$runtime = 'C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt/dependencies'
Set-Location -LiteralPath 'C:\Users\hernandezl\OneDrive - HITSS\Documentos\ChatGPT\Walter Duarte\frontend'
& "$runtime/bin/fallback/pnpm.cmd" install --frozen-lockfile --store-dir .pnpm-store
& "$runtime/node/bin/node.exe" scripts/next.mjs dev
```

Para reproducir los comandos de verificación sin la comprobación automática de dependencias de pnpm:

```powershell
& "$runtime/node/bin/node.exe" node_modules/eslint/bin/eslint.js .
& "$runtime/node/bin/node.exe" node_modules/typescript/bin/tsc --noEmit
& "$runtime/node/bin/node.exe" --test --test-isolation=none tests/data.test.mjs
& "$runtime/node/bin/node.exe" scripts/next.mjs build
& "$runtime/node/bin/node.exe" scripts/next.mjs start
```

La ruta versionada del runtime puede cambiar al actualizar Codex. En otro equipo, instalar Node/pnpm compatibles y usar los comandos normales.

## Revisión en navegador

Con el servidor iniciado, `tests/browser.cjs` usa Playwright del runtime y Chrome instalado en este equipo. No es dependencia de la aplicación ni se descarga en visitas. Para otro entorno, proporcionar la ruta del módulo Playwright mediante `PLAYWRIGHT_MODULE_PATH` y adaptar el ejecutable de Chrome del script. Se puede elegir la URL con `DEMO_URL`.

```powershell
& "$runtime/node/bin/node.exe" tests/browser.cjs
```

Resultados en `evidencia/verificacion-browser.json`, capturas PNG y registro incremental. Pruebas: mapa, filtros, calendario, curso, formularios, administración, menú, rutas, ausencia de solicitudes externas y responsive 320/360/390/768/1280/1440. Las emulaciones no equivalen a dispositivos físicos ni a una auditoría completa WCAG.

## Qué recorrer

- Inicio y «Ver datos ficticios de prueba»: agenda/noticias vacías por defecto; modo ficticio compartido en memoria.
- Tolima: seleccionar municipio, zoom, lista, búsqueda sin tildes y ficha oficial.
- Biblioteca/Ideas: filtros reales sobre muestras sintéticas; no hay descargas.
- Mi historia y Comunidades: estructura documental con pendientes honestos.
- Liderazgo: cambiar lecciones, responder quiz y ver constancia simulada.
- Voluntariado/Contacto: campos bloqueados y estados sin envío.
- `/demo/administracion`: módulos y flujo editorial temporal, sin protección ni escritura real.

Arquitectura y alcance: `../docs/fase-1b.md`. Cartografía y licencia: `../docs/geografia/README.md`. Aprobación funcional G1B pendiente. No avanzar a fase 2 automáticamente.
