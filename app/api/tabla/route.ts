import { NextRequest, NextResponse } from "next/server";
import { MOCK_TABLA } from "@/lib/mock-data";
// import { readSheet } from "@/lib/google-sheets";

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo") || "";
  const categoria = req.nextUrl.searchParams.get("categoria") || "";

  try {
    // TODO: Replace with Google Sheets when configured
    // const rows = await readSheet("Tabla!A:K");
    // const tabla = rows.slice(1).map(row => ({
    //   equipo: row[0], categoria: row[1], tipo: row[2] || "Varonil",
    //   pj: Number(row[3]), pg: Number(row[4]), pe: Number(row[5]),
    //   pp: Number(row[6]), gf: Number(row[7]), gc: Number(row[8]),
    //   dg: Number(row[9]), pts: Number(row[10]),
    // }));

    let tabla = MOCK_TABLA;

    if (tipo) tabla = tabla.filter((t) => t.tipo === tipo);
    if (categoria) tabla = tabla.filter((t) => t.categoria === categoria);

    return NextResponse.json({ tabla });
  } catch (error) {
    console.error("Error fetching tabla:", error);
    return NextResponse.json({ tabla: [] });
  }
}
