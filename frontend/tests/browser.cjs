const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE_PATH ||
    "C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1105-1297-0_26.1105.1297.0_x64__3k8sg7r9htsxt/dependencies/node/node_modules/playwright",
);
const fs = require("fs");
const assert = require("assert/strict");
const base = process.env.DEMO_URL || "http://127.0.0.1:3000";
(async () => {
  fs.mkdirSync("evidencia", { recursive: true });
  const browser = await chromium.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [],
    external = [],
    checks = [],
    routes = new Set([
      "/",
      "/mi-historia",
      "/tolima",
      "/comunidades",
      "/ideas",
      "/actualidad",
      "/participa",
      "/herramientas",
      "/participa/liderazgo",
      "/participa/voluntariado",
      "/participa/protege-tus-derechos",
      "/participa/liderazgo/curso-demo",
      "/demo/administracion",
      "/contacto",
      "/transparencia",
      "/privacidad",
      "/terminos",
      "/accesibilidad",
    ]);
  page.on("pageerror", (e) => errors.push(e.message));
  context.on("request", (r) => {
    if (!r.url().startsWith(base) && !r.url().startsWith("data:"))
      external.push(r.url());
  });
  let failures = [];
  async function check(name, fn) {
    try {
      await fn();
      checks.push({ name, pass: true });
      console.log("PASS", name);
    } catch (e) {
      checks.push({ name, pass: false, error: e.message });
      failures.push(name);
      console.log("FAIL", name, e.message.slice(0, 700));
    }
    fs.writeFileSync(
      "evidencia/progreso.json",
      JSON.stringify(checks, null, 2),
    );
  }
  await check(
    "Mapa: 47 polígonos, hover sin selección, clic y teclado",
    async () => {
      await page.goto(base + "/tolima");
      await page.locator(".tolima-map path").first().waitFor();
      assert.equal(await page.locator(".tolima-map path").count(), 47);
      const before = await page.locator(".municipality-panel h3").innerText();
      const path = page.getByRole("button", {
        name: "Seleccionar MELGAR",
        exact: true,
      });
      await path.hover();
      assert.equal(
        await page.locator(".municipality-panel h3").innerText(),
        before,
      );
      await path.click();
      assert.notEqual(
        await page.locator(".municipality-panel h3").innerText(),
        before,
      );
      const second = page.getByRole("button", {
        name: "Seleccionar IBAGUÉ",
        exact: true,
      });
      await second.focus();
      await page.keyboard.press("Enter");
      assert.equal(await second.getAttribute("aria-pressed"), "true");
      await page
        .getByRole("button", { name: "Acercar mapa", exact: true })
        .click();
      assert.notEqual(
        await page.locator(".tolima-map").getAttribute("viewBox"),
        "0 0 740 880",
      );
      await page
        .getByRole("button", { name: "Restablecer mapa", exact: true })
        .click();
      await page.screenshot({
        path: "evidencia/mapa-escritorio.png",
        fullPage: true,
      });
      await page
        .locator(".explorer")
        .screenshot({ path: "evidencia/explorador.png" });
      await page
        .getByRole("button", { name: "Lista accesible", exact: true })
        .click();
      await page.getByLabel("Buscar municipio").fill("ibague");
      assert.equal(await page.locator(".municipality-list button").count(), 1);
      await page.getByLabel("Contenido disponible").selectOption("documented");
      assert.equal(await page.locator(".municipality-list button").count(), 0);
    },
  );
  await check("Biblioteca: búsqueda y estado vacío", async () => {
    await page.goto(base + "/herramientas");
    await page.getByLabel("Buscar recurso").fill("guía");
    assert.equal(await page.locator(".resource-card").count(), 1);
    await page.getByLabel("Estado", { exact: true }).selectOption("Disponible");
    assert.equal(await page.locator(".resource-card").count(), 0);
    await page.getByRole("button", { name: "Restablecer filtros" }).click();
    assert.equal(await page.locator(".resource-card").count(), 3);
  });
  await check("Ideas: filtros por municipio, año y tipo", async () => {
    await page.goto(base + "/ideas");
    await page.getByLabel("Municipio", { exact: true }).selectOption("73001");
    assert.equal(await page.locator(".resource-card").count(), 1);
    await page.getByLabel("Año", { exact: true }).selectOption("2025");
    assert.equal(await page.locator(".resource-card").count(), 0);
  });
  await check(
    "Agenda: vacío por defecto, calendario, mes y modo compartido",
    async () => {
      await page.goto(base + "/actualidad");
      assert.equal(await page.locator(".calendar-day a").count(), 0);
      await page
        .getByRole("button", { name: "Ver datos ficticios de prueba" })
        .click();
      assert.equal(await page.locator(".calendar-day a").count(), 3);
      await page.getByRole("button", { name: "Mes siguiente" }).click();
      assert.equal(await page.locator(".calendar-day a").count(), 0);
      await page.getByRole("button", { name: "Mes anterior" }).click();
      assert.equal(await page.locator(".calendar-day a").count(), 3);
      await page.getByRole("button", { name: "Lista", exact: true }).click();
      assert.equal(await page.locator(".event-card").count(), 3);
      await page
        .getByRole("link", { name: "Inicio", exact: true })
        .first()
        .click();
      assert.equal(await page.locator(".event-card").count(), 3);
    },
  );
  await check(
    "Curso: lecciones, respuesta y constancia impersonal",
    async () => {
      await page.goto(base + "/participa/liderazgo/curso-demo");
      await page.getByRole("button", { name: "Siguiente lección" }).click();
      await page.getByRole("button", { name: "Siguiente lección" }).click();
      await page.getByLabel("No, solo muestra estados temporales.").check();
      await page.getByRole("button", { name: "Comprobar respuesta" }).click();
      await page
        .getByRole("button", { name: "Ver constancia simulada" })
        .click();
      assert.equal(await page.locator(".certificate").count(), 1);
    },
  );
  await check(
    "Formulario: campos bloqueados, validación, confirmación y retiro",
    async () => {
      await page.goto(base + "/participa/voluntariado");
      assert.equal(await page.locator("fieldset input:enabled").count(), 0);
      assert.equal(
        await page.locator("input[type=checkbox]:checked").count(),
        0,
      );
      for (const name of [
        "Ver validación",
        "Simular confirmación",
        "Ver error",
        "Cancelar",
        "Simular retiro",
      ]) {
        await page.getByRole("button", { name, exact: true }).click();
        assert.ok(
          (await page.locator(".simulation-message").innerText()).length > 20,
        );
      }
      assert.deepEqual(
        await page.evaluate(() => ({
          local: localStorage.length,
          session: sessionStorage.length,
        })),
        { local: 0, session: 0 },
      );
      assert.equal((await context.cookies()).length, 0);
    },
  );
  await check(
    "Administración: cambio temporal y trazabilidad simulada",
    async () => {
      await page.goto(base + "/demo/administracion");
      await page
        .getByRole("button", { name: "Gestión editorial", exact: true })
        .click();
      await page
        .getByRole("button", { name: "En revisión", exact: true })
        .click();
      await page
        .getByRole("button", { name: "Historial editorial", exact: true })
        .click();
      assert.ok(
        (await page.locator(".admin-content").innerText()).includes(
          "En revisión:",
        ),
      );
      await page.reload();
      await page
        .getByRole("button", { name: "Gestión editorial", exact: true })
        .click();
      assert.ok(
        (await page.locator(".admin-content").innerText()).includes("Borrador"),
      );
    },
  );
  await check("Móvil: menú, Escape, selección táctil y foco", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/");
    await page.getByRole("button", { name: "Menú" }).click();
    assert.equal(await page.locator("#navegacion").isVisible(), true);
    await page.locator("#navegacion a").first().focus();
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#navegacion").isVisible(), false);
    assert.equal(
      await page
        .locator(".menu-toggle")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    await page.goto(base + "/tolima");
    await page
      .getByRole("button", { name: "Lista accesible", exact: true })
      .click();
    await page.locator(".municipality-list button").nth(2).click();
    assert.equal(
      await page
        .locator(".municipality-list button")
        .nth(2)
        .getAttribute("aria-pressed"),
      "true",
    );
    await page.screenshot({ path: "evidencia/mapa-movil.png", fullPage: true });
  });
  const municipalities = JSON.parse(
    fs.readFileSync("src/data/municipalities.json", "utf8"),
  );
  municipalities.forEach((m) => routes.add("/tolima/" + m.slug));
  for (const route of [...routes]) {
    await page.goto(base + route);
    for (const h of await page
      .locator('a[href^="/"]')
      .evaluateAll((a) => a.map((e) => e.getAttribute("href"))))
      routes.add(h.split("#")[0]);
  }
  await check("Todas las rutas y enlaces internos responden 200", async () => {
    for (const route of routes) {
      const response = await context.request.get(base + route);
      assert.equal(response.status(), 200, route);
    }
  });
  await check("Rutas inexistentes y electorales devuelven 404", async () => {
    for (const route of [
      "/electoral",
      "/campana",
      "/api/contacto",
      "/tolima/no-existe",
      "/comunidades/no-existe",
    ]) {
      const response = await context.request.get(base + route);
      assert.equal(response.status(), 404, route);
    }
  });
  const responsive = [];
  for (const width of [320, 360, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 1000 });
    for (const route of [
      "/",
      "/tolima",
      "/mi-historia",
      "/comunidades",
      "/herramientas",
      "/ideas",
      "/actualidad",
      "/participa",
      "/participa/liderazgo/curso-demo",
      "/demo/administracion",
      "/tolima/ibague",
      "/comunidades/empresa-innovacion",
    ]) {
      await page.goto(base + route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      responsive.push({ width, route, overflow });
      if (overflow) failures.push("overflow " + width + " " + route);
      if (
        (width === 390 || width === 1440) &&
        [
          "/",
          "/tolima",
          "/herramientas",
          "/comunidades/empresa-innovacion",
          "/demo/administracion",
        ].includes(route)
      ) {
        if (await page.locator(".explorer").count()) {
          await page.locator(".explorer").scrollIntoViewIfNeeded();
          await page.locator(".tolima-map path").first().waitFor();
        }
        await page.locator("footer").scrollIntoViewIfNeeded();
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
          path:
            "evidencia/" +
            (route === "/" ? "inicio" : route.replaceAll("/", "-").slice(1)) +
            "-" +
            width +
            ".png",
          fullPage: true,
        });
        if (route === "/")
          await page.screenshot({
            path: "evidencia/portada-" + width + ".png",
          });
      }
    }
  }
  await check("Sin errores de JavaScript ni peticiones externas", async () => {
    assert.deepEqual(errors, []);
    assert.deepEqual(external, []);
  });
  const report = {
    date: new Date().toISOString(),
    base,
    routes: [...routes],
    checks,
    responsive,
    errors,
    external,
    failures,
    pass: !failures.length,
  };
  fs.writeFileSync(
    "evidencia/verificacion-browser.json",
    JSON.stringify(report, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        pass: report.pass,
        routes: routes.size,
        checks: checks.length,
        responsive: responsive.length,
        failures,
        errors,
        external,
      },
      null,
      2,
    ),
  );
  await browser.close();
  process.exitCode = report.pass ? 0 : 1;
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
