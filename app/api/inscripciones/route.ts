import { NextRequest, NextResponse } from "next/server";
// import { appendToSheet } from "@/lib/google-sheets";
// import { stripe, INSCRIPTION_PRICE } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tipoInscripcion } = body;

    if (tipoInscripcion === "equipo") {
      const { nombreEquipo, categoria, tipo, responsable, telefonoResponsable, emailResponsable } = body;

      if (!nombreEquipo || !categoria || !tipo || !responsable || !telefonoResponsable) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }

      // TODO: Uncomment when Google Sheets is configured
      // await appendToSheet("Equipos!A:D", [
      //   [nombreEquipo, categoria, tipo, new Date().toISOString()]
      // ]);

      console.log("Inscripción de equipo:", { nombreEquipo, categoria, tipo, responsable });

      return NextResponse.json({
        message: `Equipo "${nombreEquipo}" inscrito correctamente en ${categoria} ${tipo}.`,
      });
    }

    if (tipoInscripcion === "jugador") {
      const {
        nombreJugador, equipo, categoria, tipo, fechaNacimiento,
        posicion, numeroPlayera, telefonoJugador, nombreTutor, telefonoTutor,
      } = body;

      if (!nombreJugador || !equipo || !categoria || !tipo || !fechaNacimiento || !posicion) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }

      // TODO: Uncomment when Google Sheets is configured
      // const sheetResult = await appendToSheet("Jugadores!A:J", [[
      //   nombreJugador, equipo, categoria, tipo, posicion,
      //   numeroPlayera, fechaNacimiento, telefonoJugador,
      //   nombreTutor, telefonoTutor,
      //   "pendiente_pago", "", "", "", new Date().toISOString(),
      // ]]);

      console.log("Inscripción de jugador:", { nombreJugador, equipo, categoria });

      // TODO: Uncomment when Stripe is configured
      // const session = await stripe.checkout.sessions.create({
      //   payment_method_types: ["card"],
      //   line_items: [{
      //     price_data: {
      //       currency: "mxn",
      //       product_data: {
      //         name: `Inscripción Copa ECYD - ${nombreJugador}`,
      //         description: `${equipo} | ${categoria} | ${tipo}`,
      //       },
      //       unit_amount: INSCRIPTION_PRICE,
      //     },
      //     quantity: 1,
      //   }],
      //   mode: "payment",
      //   success_url: `${process.env.NEXTAUTH_URL}/inscripciones/exito?session_id={CHECKOUT_SESSION_ID}`,
      //   cancel_url: `${process.env.NEXTAUTH_URL}/inscripciones/cancelado`,
      //   metadata: { nombreJugador, equipo, categoria, tipo },
      // });
      // return NextResponse.json({ checkoutUrl: session.url });

      return NextResponse.json({
        message: `Jugador "${nombreJugador}" inscrito. (Stripe deshabilitado en modo desarrollo)`,
      });
    }

    if (tipoInscripcion === "dt") {
      const { nombreDT, equipo, categoria, tipo, telefonoDT, emailDT } = body;

      if (!nombreDT || !equipo || !categoria || !tipo || !telefonoDT) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }

      // TODO: Uncomment when Google Sheets is configured
      // await appendToSheet("DTs!A:H", [[
      //   nombreDT, equipo, categoria, tipo, telefonoDT, emailDT,
      //   "pendiente_pago", "", "", new Date().toISOString(),
      // ]]);

      console.log("Inscripción de DT:", { nombreDT, equipo, categoria });

      // TODO: Stripe checkout for DT (same pattern as jugador)

      return NextResponse.json({
        message: `DT "${nombreDT}" inscrito. (Stripe deshabilitado en modo desarrollo)`,
      });
    }

    return NextResponse.json({ error: "Tipo de inscripción inválido" }, { status: 400 });
  } catch (error) {
    console.error("Error en inscripción:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
