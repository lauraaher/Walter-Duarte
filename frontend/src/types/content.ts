/** Explicit editorial boundaries. Geography is official; samples never become publications. */
export type ContentKind = "official" | "pending" | "synthetic";
export type EditorialState = "Por producir" | "En revisión" | "Disponible";
export interface Municipality {
  code: string;
  name: string;
  slug: string;
  year: number;
}
export interface MapShape {
  code: string;
  path: string;
}
