import fs from "node:fs";
import crypto from "node:crypto";
const raw = JSON.parse(
  fs
    .readFileSync("../docs/geografia/tolima-mgn2025-original.geojson", "utf8")
    .replace(/^\uFEFF/, ""),
);
const geo = JSON.parse(fs.readFileSync("public/geo/tolima.geojson", "utf8"));
const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const municipalities = raw.features
  .map((f) => ({
    code: f.properties.MPIO_CDPMP,
    name: f.properties.MPIO_CNMBRE,
    slug: slug(f.properties.MPIO_CNMBRE),
    year: f.properties.MPIO_NANO,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "es"));
if (
  municipalities.length !== 47 ||
  new Set(municipalities.map((m) => m.code)).size !== 47 ||
  new Set(municipalities.map((m) => m.slug)).size !== 47
)
  throw Error("Invalid municipalities");
let points = 0;
const coords = [];
for (const f of geo.features) {
  if (!municipalities.some((m) => m.code === f.properties.MPIO_CDPMP))
    throw Error("Code mismatch");
  const polygons =
    f.geometry.type === "MultiPolygon"
      ? f.geometry.coordinates
      : [f.geometry.coordinates];
  for (const polygon of polygons)
    for (const ring of polygon) {
      if (
        ring.length < 4 ||
        JSON.stringify(ring[0]) !== JSON.stringify(ring.at(-1))
      )
        throw Error("Invalid ring");
      for (const p of ring) {
        if (
          !p.every(Number.isFinite) ||
          p[0] < -77 ||
          p[0] > -73 ||
          p[1] < 2 ||
          p[1] > 6
        )
          throw Error("Invalid coordinate");
        coords.push(p);
        points++;
      }
    }
}
const project = ([x, y]) => [
  (x * Math.PI) / 180,
  Math.log(Math.tan(Math.PI / 4 + (y * Math.PI) / 360)),
];
const projected = coords.map(project),
  xs = projected.map((p) => p[0]),
  ys = projected.map((p) => p[1]);
const minX = Math.min(...xs),
  maxY = Math.max(...ys),
  scale = Math.min(
    680 / (Math.max(...xs) - minX),
    820 / (maxY - Math.min(...ys)),
  );
const path = (ring) =>
  ring
    .map((p, i) => {
      const [x, y] = project(p);
      return `${i ? "L" : "M"}${((x - minX) * scale + 30).toFixed(2)},${((maxY - y) * scale + 30).toFixed(2)}`;
    })
    .join("") + "Z";
const map = geo.features.map((f) => ({
  code: f.properties.MPIO_CDPMP,
  path: (f.geometry.type === "MultiPolygon"
    ? f.geometry.coordinates
    : [f.geometry.coordinates]
  )
    .flatMap((p) => p.map(path))
    .join(""),
}));
fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync(
  "src/data/municipalities.json",
  JSON.stringify(municipalities, null, 2),
);
fs.writeFileSync("public/geo/tolima-map.json", JSON.stringify(map));
const report = {
  source: "DANE MGN 2025 / Municipio (317)",
  date: "2026-11-10",
  features: 47,
  points,
  crs: "GeoJSON EPSG:4326; SVG projected Web Mercator",
  transform:
    "mapshaper weighted 3% keep-shapes, precision 0.00001; SVG rounded 0.01 units",
  sourceHash: crypto
    .createHash("sha256")
    .update(
      fs.readFileSync("../docs/geografia/tolima-mgn2025-original.geojson"),
    )
    .digest("hex"),
  years: [...new Set(municipalities.map((m) => m.year))],
  bytes: fs.statSync("public/geo/tolima-map.json").size,
};
fs.writeFileSync(
  "../docs/geografia/validacion.json",
  JSON.stringify(report, null, 2),
);
console.log(report);
