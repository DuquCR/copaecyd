import { NextRequest, NextResponse } from "next/server";
import { MOCK_EQUIPOS } from "@/lib/mock-data";

// When Google Sheets is configured, replace mock data with:
// import { getEquiposPorCategoria } from "@/lib/google-sheets";

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get("tipo") || "";
  const categoria = req.nextUrl.searchParams.get("categoria") || "";

  try {
    // TODO: Replace with Google Sheets when configured
    // const equipos = await getEquiposPorCategoria(tipo, categoria);

    const equipos = MOCK_EQUIPOS
      .filter((e) => e.tipo === tipo && e.categoria === categoria)
      .map((e) => e.nombre);

    return NextResponse.json({ equipos });
  } catch (error) {
    console.error("Error fetching equipos:", error);
    return NextResponse.json({ equipos: [] });
  }
}
