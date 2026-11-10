export const navigation = [
  ["/", "Inicio"],
  ["/mi-historia", "Mi historia"],
  ["/tolima", "Recorriendo el Tolima"],
  ["/comunidades", "Comunidades"],
  ["/ideas", "Ideas para el Tolima"],
  ["/actualidad", "Agenda y noticias"],
  ["/participa", "Participa"],
] as const;
export const communities = [
  {
    slug: "empresa-innovacion",
    title:
      "Empresa, internacionalización, innovación e inteligencia artificial",
    short: "Empresa e innovación",
    mark: "01",
    description:
      "Un espacio temático para explorar conocimiento, empresa y transformación.",
  },
  {
    slug: "campo-ruralidad",
    title: "Campo, ruralidad y agroindustrialización",
    short: "Campo y ruralidad",
    mark: "02",
    description: "Una mirada al territorio rural y sus posibilidades.",
  },
  {
    slug: "mujeres-derechos",
    title: "Mujeres, derechos y oportunidades",
    short: "Mujeres y derechos",
    mark: "03",
    description: "Un espacio de consulta sobre derechos y oportunidades.",
  },
  {
    slug: "juventud-educacion",
    title: "Juventud, educación, emprendimiento y empleabilidad",
    short: "Juventud y educación",
    mark: "04",
    description: "Conocimiento para explorar caminos de aprendizaje.",
  },
  {
    slug: "liderazgo-control-social",
    title: "Liderazgo comunitario, veeduría y control social ambiental",
    short: "Liderazgo comunitario",
    mark: "05",
    description:
      "Herramientas para comprender la participación y el cuidado de lo común.",
  },
];
export const resources = [
  {
    slug: "guia-demo",
    title: "Guía de consulta · muestra de diseño",
    topic: "liderazgo-control-social",
    format: "PDF",
    status: "Por producir",
    kind: "Guía",
    year: "2026",
  },
  {
    slug: "ficha-demo",
    title: "Ficha de aprendizaje · muestra de diseño",
    topic: "empresa-innovacion",
    format: "Ficha",
    status: "En revisión",
    kind: "Ficha",
    year: "2026",
  },
  {
    slug: "video-demo",
    title: "Material audiovisual · muestra de diseño",
    topic: "campo-ruralidad",
    format: "Vídeo",
    status: "Por producir",
    kind: "Vídeo",
    year: "2025",
  },
];
export const documents = [
  {
    slug: "documento-demo",
    title: "Documento de consulta · ejemplo ficticio",
    topic: "liderazgo-control-social",
    municipality: "73001",
    type: "Documento",
    year: "2026",
    status: "En revisión",
  },
  {
    slug: "nota-demo",
    title: "Nota temática · ejemplo ficticio",
    topic: "campo-ruralidad",
    municipality: "73268",
    type: "Nota",
    year: "2025",
    status: "Por producir",
  },
];
export const events = [1, 2, 3].map((n) => ({
  slug: `evento-demo-${n}`,
  title: `Actividad ficticia de prueba ${n}`,
  date: `2026-12-${10 + n * 3}T10:00:00-05:00`,
  type: n === 2 ? "Encuentro" : "Taller",
  published: false,
  synthetic: true,
}));
export const news = [1, 2, 3].map((n) => ({
  slug: `noticia-demo-${n}`,
  title: `Publicación ficticia de prueba ${n}`,
  date: `2026-11-0${10 - n}T09:00:00-05:00`,
  published: false,
  synthetic: true,
}));
export const rights = [
  ["corrupcion", "Corrupción"],
  ["violencia-de-genero", "Violencia de género"],
  ["maltrato-infantil", "Maltrato infantil"],
  ["maltrato-animal", "Maltrato animal"],
  ["dano-ambiental", "Daño ambiental"],
  ["otros-conflictos", "Otros conflictos"],
] as const;
export const historySections = [
  "Identidad y origen",
  "Formación",
  "Experiencia profesional",
  "Servicio público",
  "Emprendimiento",
  "Actividad social",
  "Liderazgo",
  "Principios",
];
export const lessons = [
  {
    title: "Explora el espacio cívico",
    text: "Esta lección es una muestra impersonal de la interfaz. Los contenidos formativos deberán pasar revisión editorial antes de publicarse.",
  },
  {
    title: "Consulta y contrasta",
    text: "La interfaz de materiales permite distinguir documentos disponibles de contenidos pendientes. Aquí no existen archivos publicados.",
  },
  {
    title: "Autoevaluación",
    text: "Comprueba el recorrido de aprendizaje con una pregunta sobre esta demo.",
  },
];
