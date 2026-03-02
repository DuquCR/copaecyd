import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";
// import { readSheet, updateSheetRow } from "@/lib/google-sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    // TODO: Uncomment when Stripe is configured
    // let event: Stripe.Event;
    // try {
    //   event = stripe.webhooks.constructEvent(
    //     body,
    //     sig,
    //     process.env.STRIPE_WEBHOOK_SECRET!
    //   );
    // } catch {
    //   return new Response("Firma inválida", { status: 400 });
    // }
    //
    // if (event.type === "checkout.session.completed") {
    //   const session = event.data.object as Stripe.Checkout.Session;
    //   const { nombreJugador, equipo } = session.metadata!;
    //
    //   // Find the row in Sheets and update payment status
    //   const rows = await readSheet("Jugadores!A:O");
    //   const rowIndex = rows.findIndex(
    //     (row, i) => i > 0 && row[0] === nombreJugador && row[1] === equipo && row[10] === "pendiente_pago"
    //   );
    //
    //   if (rowIndex > 0) {
    //     const sheetRow = rowIndex + 1;
    //     await updateSheetRow(`Jugadores!K${sheetRow}:N${sheetRow}`, [[
    //       "pagado",
    //       session.payment_intent as string,
    //       (session.amount_total! / 100).toFixed(2),
    //       new Date().toISOString(),
    //     ]]);
    //   }
    // }

    console.log("Webhook de Stripe recibido:", body.substring(0, 100));

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}
