import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
const read = (p) =>
  JSON.parse(fs.readFileSync(p, "utf8").replace(/^\uFEFF/, ""));
const municipalities = read("src/data/municipalities.json"),
  geo = read("public/geo/tolima.geojson"),
  shapes = read("public/geo/tolima-map.json"),
  original = read("../docs/geografia/tolima-mgn2025-original.geojson");
test("47 municipios únicos, oficiales, con rutas únicas", () => {
  assert.equal(municipalities.length, 47);
  for (const key of ["slug", "code"])
    assert.equal(new Set(municipalities.map((m) => m[key])).size, 47);
  for (const m of municipalities) {
    assert.match(m.code, /^73\d{3}$/);
    const source = original.features.find(
      (f) => f.properties.MPIO_CDPMP === m.code,
    );
    assert.equal(m.name, source.properties.MPIO_CNMBRE);
    assert.equal(m.year, source.properties.MPIO_NANO);
  }
});
test("47 geometrías y paths, anillos cerrados, coordenadas finitas y límites Tolima", () => {
  assert.equal(geo.features.length, 47);
  assert.equal(shapes.length, 47);
  assert.equal(new Set(shapes.map((s) => s.code)).size, 47);
  for (const f of geo.features) {
    assert.ok(municipalities.some((m) => m.code === f.properties.MPIO_CDPMP));
    assert.ok(["Polygon", "MultiPolygon"].includes(f.geometry.type));
    const polygons =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates]
        : f.geometry.coordinates;
    for (const polygon of polygons) {
      assert.ok(polygon.length);
      for (const ring of polygon) {
        assert.ok(ring.length >= 4);
        assert.deepEqual(ring[0], ring.at(-1));
        for (const [x, y] of ring) {
          assert.ok(Number.isFinite(x) && Number.isFinite(y));
          assert.ok(x > -77 && x < -73 && y > 2 && y < 6);
        }
      }
    }
  }
  for (const s of shapes) {
    assert.match(s.path, /^M/);
    assert.ok(!/NaN|undefined/.test(s.path));
  }
});
test("sin cruces propios estrictos en anillos simplificados", () => {
  const cross = (a, b, c) =>
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  let checked = 0;
  for (const f of geo.features) {
    const polygons =
      f.geometry.type === "Polygon"
        ? [f.geometry.coordinates]
        : f.geometry.coordinates;
    for (const polygon of polygons)
      for (const ring of polygon) {
        for (let i = 0; i < ring.length - 1; i++)
          for (let j = i + 2; j < ring.length - 1; j++) {
            if (i === 0 && j === ring.length - 2) continue;
            const a = ring[i],
              b = ring[i + 1],
              c = ring[j],
              d = ring[j + 1];
            const hit =
              cross(a, b, c) * cross(a, b, d) < -1e-18 &&
              cross(c, d, a) * cross(c, d, b) < -1e-18;
            assert.ok(!hit, "Cruce propio " + f.properties.MPIO_CDPMP);
            checked++;
          }
      }
  }
  assert.ok(checked > 10000);
});
test("logo original conservado byte a byte", () => {
  const hash = (p) =>
    crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
  assert.equal(
    hash("public/brand/logo-walter-original.jpg"),
    hash("../Recursos Graficos/logo walter.jpg"),
  );
});
test("sin rutas backend ni electorales y sin almacenamiento personal", () => {
  function walk(dir) {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .flatMap((f) =>
        f.isDirectory() ? walk(dir + "/" + f.name) : [dir + "/" + f.name],
      );
  }
  const files = walk("src");
  assert.ok(!files.some((p) => /\/api\/|route\.ts$|\/electoral\//.test(p)));
  for (const f of files.filter((f) => /\.tsx?$/.test(f))) {
    assert.doesNotMatch(
      fs.readFileSync(f, "utf8"),
      /localStorage|sessionStorage|indexedDB|document\.cookie|sendBeacon/,
    );
  }
});
