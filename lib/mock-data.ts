export const CATEGORIAS = {
  varonil: ["Sub-13", "Sub-15", "Sub-17"],
  femenil: ["Sub-13", "Sub-15", "Sub-17"],
};

export const MOCK_EQUIPOS = [
  { nombre: "Leones FC", categoria: "Sub-15", tipo: "Varonil" },
  { nombre: "Águilas Doradas", categoria: "Sub-15", tipo: "Varonil" },
  { nombre: "Panteras", categoria: "Sub-17", tipo: "Varonil" },
  { nombre: "Tigres del Sur", categoria: "Sub-13", tipo: "Varonil" },
  { nombre: "Estrellas", categoria: "Sub-15", tipo: "Femenil" },
  { nombre: "Mariposas FC", categoria: "Sub-17", tipo: "Femenil" },
];

export const MOCK_TABLA = [
  { equipo: "Leones FC", categoria: "Sub-15", tipo: "Varonil", pj: 3, pg: 2, pe: 1, pp: 0, gf: 7, gc: 2, dg: 5, pts: 7 },
  { equipo: "Águilas Doradas", categoria: "Sub-15", tipo: "Varonil", pj: 3, pg: 2, pe: 0, pp: 1, gf: 5, gc: 3, dg: 2, pts: 6 },
  { equipo: "Panteras", categoria: "Sub-17", tipo: "Varonil", pj: 3, pg: 1, pe: 1, pp: 1, gf: 4, gc: 4, dg: 0, pts: 4 },
  { equipo: "Tigres del Sur", categoria: "Sub-13", tipo: "Varonil", pj: 3, pg: 1, pe: 0, pp: 2, gf: 3, gc: 6, dg: -3, pts: 3 },
  { equipo: "Estrellas", categoria: "Sub-15", tipo: "Femenil", pj: 3, pg: 3, pe: 0, pp: 0, gf: 9, gc: 1, dg: 8, pts: 9 },
  { equipo: "Mariposas FC", categoria: "Sub-17", tipo: "Femenil", pj: 3, pg: 0, pe: 1, pp: 2, gf: 2, gc: 5, dg: -3, pts: 1 },
];

export const MOCK_CALENDARIO = [
  { fecha: "2026-06-15", hora: "09:00", local: "Leones FC", visitante: "Águilas Doradas", categoria: "Sub-15", tipo: "Varonil", cancha: "Campo 1", golesLocal: "3", golesVisitante: "1", estado: "Finalizado" },
  { fecha: "2026-06-15", hora: "11:00", local: "Panteras", visitante: "Tigres del Sur", categoria: "Sub-17", tipo: "Varonil", cancha: "Campo 2", golesLocal: "2", golesVisitante: "2", estado: "Finalizado" },
  { fecha: "2026-06-16", hora: "09:00", local: "Estrellas", visitante: "Mariposas FC", categoria: "Sub-15", tipo: "Femenil", cancha: "Campo 1", golesLocal: "4", golesVisitante: "0", estado: "Finalizado" },
  { fecha: "2026-06-17", hora: "10:00", local: "Leones FC", visitante: "Panteras", categoria: "Sub-15", tipo: "Varonil", cancha: "Campo 1", golesLocal: "", golesVisitante: "", estado: "Próximamente" },
  { fecha: "2026-06-18", hora: "09:00", local: "Águilas Doradas", visitante: "Tigres del Sur", categoria: "Sub-15", tipo: "Varonil", cancha: "Campo 2", golesLocal: "", golesVisitante: "", estado: "Próximamente" },
];

export const DOCUMENTOS = [
  { nombre: "Reglamento del Torneo", archivo: "/docs/reglamento.pdf", descripcion: "Reglas oficiales de la Copa ECYD Mérida 2026" },
  { nombre: "Términos y Condiciones", archivo: "/docs/terminos.pdf", descripcion: "Términos y condiciones de participación" },
  { nombre: "Convocatoria", archivo: "/docs/convocatoria.pdf", descripcion: "Convocatoria oficial del torneo" },
  { nombre: "Carta Responsiva", archivo: "/docs/carta-responsiva.pdf", descripcion: "Formato de carta responsiva para menores de edad" },
];
