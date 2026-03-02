import { NextResponse } from "next/server";
import { MOCK_CALENDARIO } from "@/lib/mock-data";
// import { readSheet } from "@/lib/google-sheets";

export async function GET() {
  try {
    // TODO: Replace with Google Sheets when configured
    // const rows = await readSheet("Calendario!A:J");
    // const partidos = rows.slice(1).map(row => ({
    //   fecha: row[0], hora: row[1], local: row[2], visitante: row[3],
    //   categoria: row[4], tipo: row[5] || "Varonil", cancha: row[6],
    //   golesLocal: row[7] || "", golesVisitante: row[8] || "",
    //   estado: row[9] || "Próximamente",
    // }));

    return NextResponse.json({ partidos: MOCK_CALENDARIO });
  } catch (error) {
    console.error("Error fetching calendario:", error);
    return NextResponse.json({ partidos: [] });
  }
}
