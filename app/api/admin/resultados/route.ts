import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { updateSheetRow } from "@/lib/google-sheets";

export async function PUT(req: NextRequest) {
  try {
    // TODO: Uncomment when NextAuth is configured
    // const session = await getServerSession(authOptions);
    // if (!session || (session.user as any).role !== "admin") {
    //   return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    // }

    const { partidoIndex, golesLocal, golesVisitante } = await req.json();

    if (partidoIndex === undefined || golesLocal === undefined || golesVisitante === undefined) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Row in Sheets is partidoIndex + 2 (header row + 0-based index)
    const sheetRow = partidoIndex + 2;

    // TODO: Uncomment when Google Sheets is configured
    // await updateSheetRow(`Calendario!H${sheetRow}:J${sheetRow}`, [
    //   [golesLocal, golesVisitante, "Finalizado"],
    // ]);

    console.log(`Resultado guardado: partido ${partidoIndex}, ${golesLocal}-${golesVisitante}`);

    return NextResponse.json({ message: "Resultado guardado correctamente" });
  } catch (error) {
    console.error("Error saving result:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
